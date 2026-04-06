export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { getRoomById, getAllCategories } from "@/lib/data/repository"
import { updateRoom } from "@/lib/actions/rooms"
import { EditRoomClient } from "./client"

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [room, categoriesList] = await Promise.all([getRoomById(id), getAllCategories()])
  if (!room) notFound()

  async function handleUpdate(data: unknown) {
    "use server"
    return updateRoom(id, data)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Edit Room</h1>
      <EditRoomClient
        room={{
          ...room,
          images: room.images as { src: string; alt: string }[],
          colors: room.colors as { name: string; color: string }[],
        }}
        categories={categoriesList}
        updateRoom={handleUpdate}
      />
    </div>
  )
}
