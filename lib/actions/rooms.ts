"use server"

import { revalidateTag } from "next/cache"
import { db } from "@/lib/db"
import { rooms } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { roomSchema } from "@/lib/data/schemas"
import { nanoid } from "@/lib/utils"

export async function createRoom(data: unknown) {
  const parsed = roomSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  const id = parsed.data.id || nanoid()
  await db.insert(rooms).values({ ...parsed.data, id })
  revalidateTag("rooms", "max")
  return { success: true, id }
}

export async function updateRoom(id: string, data: unknown) {
  const parsed = roomSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  await db.update(rooms).set(parsed.data).where(eq(rooms.id, id))
  revalidateTag("rooms", "max")
  return { success: true }
}

export async function deleteRoom(id: string) {
  await db.delete(rooms).where(eq(rooms.id, id))
  revalidateTag("rooms", "max")
  return { success: true }
}
