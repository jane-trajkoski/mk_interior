import { notFound } from "next/navigation"
import { getRoomBySlug, rooms } from "@/lib/rooms-data"
import { RoomDetailClient } from "./room-detail-client"

interface RoomPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }))
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params
  const room = getRoomBySlug(slug)

  if (!room) {
    return {
      title: "Room Not Found | MK Interiors",
    }
  }

  return {
    title: `${room.title} | MK Interiors`,
    description: room.description,
  }
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params
  const room = getRoomBySlug(slug)

  if (!room) {
    notFound()
  }

  return <RoomDetailClient room={room} />
}
