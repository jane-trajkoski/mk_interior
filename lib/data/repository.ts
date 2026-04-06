import { db } from "@/lib/db"
import { content, rooms, categories } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import type { ContentMap, ContentKey } from "@/lib/types/content"

export function getContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  return unstable_cache(
    async () => {
      const row = await db.select().from(content).where(eq(content.key, key)).limit(1)
      return row[0]?.data as ContentMap[K]
    },
    [key],
    { tags: [key] }
  )()
}

export async function setContent<K extends ContentKey>(key: K, data: ContentMap[K]) {
  await db
    .insert(content)
    .values({ key, data })
    .onConflictDoUpdate({ target: content.key, set: { data, updated_at: new Date() } })
}

export async function getAllRooms() {
  return unstable_cache(
    async () => {
      return db.select().from(rooms).orderBy(asc(rooms.sort_order))
    },
    ["all-rooms"],
    { tags: ["rooms"] }
  )()
}

export async function getRoomById(id: string) {
  const result = await db.select().from(rooms).where(eq(rooms.id, id)).limit(1)
  return result[0] ?? null
}

export async function getRoomBySlug(slug: string) {
  const result = await db.select().from(rooms).where(eq(rooms.slug, slug)).limit(1)
  return result[0] ?? null
}

export async function getRoomsByCategoryId(categoryId: string) {
  return db.select().from(rooms).where(eq(rooms.category_id, categoryId)).orderBy(asc(rooms.sort_order))
}

export async function getAllCategories() {
  return unstable_cache(
    async () => {
      return db.select().from(categories).orderBy(asc(categories.sort_order))
    },
    ["all-categories"],
    { tags: ["categories"] }
  )()
}

export async function getCategoryById(id: string) {
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1)
  return result[0] ?? null
}
