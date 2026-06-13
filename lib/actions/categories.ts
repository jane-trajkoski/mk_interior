"use server"

import { revalidateTag } from "next/cache"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { categorySchema } from "@/lib/data/schemas"
import { getRoomCountByCategoryId } from "@/lib/data/repository"
import { logActionError, toErrorMessage } from "@/lib/debug" // TEMP: instrumentation

export async function createCategory(data: unknown) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  try {
    const id = parsed.data.id || parsed.data.slug
    await db.insert(categories).values({ ...parsed.data, id })
    revalidateTag("categories", "max")
    return { success: true }
  } catch (err) {
    logActionError("createCategory", err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}

export async function updateCategory(id: string, data: unknown) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  try {
    await db.update(categories).set(parsed.data).where(eq(categories.id, id))
    revalidateTag("categories", "max")
    return { success: true }
  } catch (err) {
    logActionError("updateCategory", err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}

export async function deleteCategory(id: string) {
  try {
    const roomCount = await getRoomCountByCategoryId(id)
    if (roomCount > 0) {
      return { error: `Cannot delete — ${roomCount} room${roomCount === 1 ? "" : "s"} are assigned to this category.` }
    }

    await db.delete(categories).where(eq(categories.id, id))
    revalidateTag("categories", "max")
    return { success: true }
  } catch (err) {
    logActionError("deleteCategory", err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}
