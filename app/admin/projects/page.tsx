export const dynamic = "force-dynamic"

import Link from "next/link"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getAllRooms, getAllCategories } from "@/lib/data/repository"
import { deleteRoom } from "@/lib/actions/rooms"
import { DeleteButton } from "./delete-button"

export default async function AdminProjectsPage() {
  let roomsList: Awaited<ReturnType<typeof getAllRooms>> = []
  let categoriesList: Awaited<ReturnType<typeof getAllCategories>> = []
  try {
    ;[roomsList, categoriesList] = await Promise.all([getAllRooms(), getAllCategories()])
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Room
        </Link>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium text-foreground">Categories</h2>
          <Link
            href="/admin/categories"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Manage →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className="px-3 py-1.5 bg-background border border-border rounded-md text-sm text-foreground"
            >
              {cat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomsList.map((room) => {
          const firstImage = (room.images as { src: string; alt: string }[])?.[0]
          const category = categoriesList.find((c) => c.id === room.category_id)
          return (
            <div
              key={room.id}
              className="bg-background border border-border rounded-lg overflow-hidden group"
            >
              {firstImage && (
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={firstImage.src}
                    alt={firstImage.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{category?.title}</p>
                <h3 className="text-sm font-medium text-foreground mb-3">{room.title}</h3>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${room.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </Link>
                  <DeleteButton id={room.id} action={deleteRoom} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
