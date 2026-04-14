import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { adminUsers } from "@/lib/db/schema"
import { createSession } from "@/lib/auth"

const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 })
  }

  const { password } = await req.json()

  // Check against DB admin users
  try {
    const users = await db.select().from(adminUsers)
    for (const user of users) {
      if (await bcrypt.compare(password, user.password_hash)) {
        await createSession(user.name)
        return NextResponse.json({ success: true })
      }
    }
  } catch {
    // DB not available — continue to env var fallback
  }

  // Fallback to env var (useful when adminUsers table is empty or DB unavailable)
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminPassword && password === adminPassword) {
    await createSession("Admin")
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 })
}
