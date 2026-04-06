"use client"

import { RoomForm } from "@/components/admin/room-form"

export function NewRoomClient({
  categories,
  createRoom,
}: {
  categories: { id: string; title: string }[]
  createRoom: (data: unknown) => Promise<{ success?: boolean; error?: unknown }>
}) {
  return <RoomForm categories={categories} onSubmit={createRoom} />
}
