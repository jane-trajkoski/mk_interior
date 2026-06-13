"use server"

import { revalidateTag } from "next/cache"
import { db } from "@/lib/db"
import { rooms } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { roomSchema } from "@/lib/data/schemas"
import { nanoid } from "@/lib/utils"
import { logActionError, toErrorMessage } from "@/lib/debug" // TEMP: instrumentation

export async function createRoom(data: unknown) {
  const parsed = roomSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  try {
    const id = parsed.data.id || nanoid()
    await db.insert(rooms).values({ ...parsed.data, id })
    revalidateTag("rooms", "max")
    return { success: true, id }
  } catch (err) {
    logActionError("createRoom", err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}

export async function updateRoom(id: string, data: unknown) {
  const parsed = roomSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  try {
    await db.update(rooms).set(parsed.data).where(eq(rooms.id, id))
    revalidateTag("rooms", "max")
    return { success: true }
  } catch (err) {
    logActionError("updateRoom", err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}

export async function deleteRoom(id: string) {
  try {
    await db.delete(rooms).where(eq(rooms.id, id))
    revalidateTag("rooms", "max")
    return { success: true }
  } catch (err) {
    logActionError("deleteRoom", err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}
