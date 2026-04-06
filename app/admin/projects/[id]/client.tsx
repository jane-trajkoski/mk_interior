"use client"

import { RoomForm } from "@/components/admin/room-form"

interface RoomData {
  id: string
  slug: string
  title: string
  category_id: string
  description: string
  images: { src: string; alt: string }[]
  colors: { name: string; color: string }[]
  sort_order: number
}

export function EditRoomClient({
  room,
  categories,
  updateRoom,
}: {
  room: RoomData
  categories: { id: string; title: string }[]
  updateRoom: (data: unknown) => Promise<{ success?: boolean; error?: unknown }>
}) {
  return <RoomForm initialData={room} categories={categories} onSubmit={updateRoom} />
}
