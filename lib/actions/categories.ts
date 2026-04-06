"use server"

import { revalidateTag } from "next/cache"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { categorySchema } from "@/lib/data/schemas"

export async function createCategory(data: unknown) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  await db.insert(categories).values(parsed.data)
  revalidateTag("categories", "max")
  return { success: true }
}

export async function updateCategory(id: string, data: unknown) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  await db.update(categories).set(parsed.data).where(eq(categories.id, id))
  revalidateTag("categories", "max")
  return { success: true }
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id))
  revalidateTag("categories", "max")
  return { success: true }
}
