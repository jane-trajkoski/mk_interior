export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { getRoomBySlug as getDbRoom } from "@/lib/data/repository"
import { getRoomBySlug as getLocalRoom } from "@/lib/rooms-data"
import { RoomDetailClient } from "./room-detail-client"

interface RoomPageProps {
  params: Promise<{ slug: string }>
}

async function findRoom(slug: string) {
  try {
    const room = await getDbRoom(slug)
    if (room) {
      return {
        id: room.id,
        slug: room.slug,
        title: room.title,
        category: room.category_id,
        description: room.description,
        images: room.images as { src: string; alt: string }[],
        colors: room.colors as { name: string; color: string }[],
      }
    }
  } catch {}
  // Fallback to local data
  return getLocalRoom(slug) ?? null
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params
  const room = await findRoom(slug)
  if (!room) return { title: "Room Not Found | MK Interiors" }
  return { title: `${room.title} | MK Interiors`, description: room.description }
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params
  const room = await findRoom(slug)
  if (!room) notFound()
  return <RoomDetailClient room={room} />
}
