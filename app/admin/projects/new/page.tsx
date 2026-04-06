export const dynamic = "force-dynamic"

import { getAllCategories } from "@/lib/data/repository"
import { createRoom } from "@/lib/actions/rooms"
import { NewRoomClient } from "./client"

export default async function NewRoomPage() {
  let categoriesList: Awaited<ReturnType<typeof getAllCategories>> = []
  try { categoriesList = await getAllCategories() } catch {}
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Create Room</h1>
      <NewRoomClient categories={categoriesList} createRoom={createRoom} />
    </div>
  )
}
