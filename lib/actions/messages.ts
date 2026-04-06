"use server"

import { db } from "@/lib/db"
import { contactSubmissions } from "@/lib/db/schema"
import { eq, desc, count } from "drizzle-orm"

export async function getSubmissions(filter?: "all" | "unread" | "archived") {
  if (filter === "unread") {
    return db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "unread"))
      .orderBy(desc(contactSubmissions.created_at))
  }
  if (filter === "archived") {
    return db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "archived"))
      .orderBy(desc(contactSubmissions.created_at))
  }
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.created_at))
}

export async function updateSubmissionStatus(id: number, status: "unread" | "read" | "archived") {
  await db
    .update(contactSubmissions)
    .set({ status })
    .where(eq(contactSubmissions.id, id))
  return { success: true }
}

export async function deleteSubmission(id: number) {
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id))
  return { success: true }
}

export async function getUnreadCount() {
  const [result] = await db
    .select({ value: count() })
    .from(contactSubmissions)
    .where(eq(contactSubmissions.status, "unread"))
  return result.value
}
