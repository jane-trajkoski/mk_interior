import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { content } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  try {
    const row = await db.select().from(content).where(eq(content.key, key)).limit(1)
    if (!row[0]) return NextResponse.json(null)
    return NextResponse.json(row[0].data)
  } catch {
    return NextResponse.json(null)
  }
}
