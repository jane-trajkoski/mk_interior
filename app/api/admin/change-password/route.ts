import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { adminUsers } from "@/lib/db/schema"
import { verifySession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { currentPassword, newPassword } = await req.json()

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 })
  }

  const users = await db.select().from(adminUsers)
  const adminName = session.name as string

  const user = users.find((u) => u.name === adminName) ?? users[0]
  if (!user) {
    return NextResponse.json({ error: "Admin user not found" }, { status: 404 })
  }

  const valid = await bcrypt.compare(currentPassword, user.password_hash)
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
  }

  const newHash = await bcrypt.hash(newPassword, 10)
  const { eq } = await import("drizzle-orm")
  await db.update(adminUsers).set({ password_hash: newHash }).where(eq(adminUsers.id, user.id))

  return NextResponse.json({ success: true })
}
