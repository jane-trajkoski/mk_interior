export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { getCategoryById as getDbCategory, getRoomsByCategoryId as getDbRooms } from "@/lib/data/repository"
import { getCategoryById as getLocalCategory, getRoomsByCategoryId as getLocalRooms } from "@/lib/rooms-data"
import { normalizeSlugParam } from "@/lib/utils"
import { CategoryClient } from "./category-client"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug: rawSlug } = await params
  const slug = normalizeSlugParam(rawSlug)
  let category: { title: string } | null = null
  try {
    category = await getDbCategory(slug)
  } catch {}
  if (!category) {
    const local = getLocalCategory(slug)
    if (local) category = local
  }
  if (!category) return { title: "Category Not Found | MK Interiors" }
  return {
    title: `${category.title} | MK Interiors`,
    description: `Explore our ${category.title.toLowerCase()} projects — carefully crafted interiors by MK Interiors.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug: rawSlug } = await params
  const slug = normalizeSlugParam(rawSlug)

  // Try DB first
  try {
    const category = await getDbCategory(slug)
    if (category) {
      const roomsList = await getDbRooms(slug)
      return (
        <CategoryClient
          category={{ id: category.id, title: category.title, categoryLabel: category.title }}
          rooms={roomsList.map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            category: r.category_id,
            description: r.description,
            images: r.images as { src: string; alt: string }[],
            colors: r.colors as { name: string; color: string }[],
          }))}
        />
      )
    }
  } catch {}

  // Fallback to local data
  const category = getLocalCategory(slug)
  if (!category) notFound()
  const rooms = getLocalRooms(slug)
  return <CategoryClient category={category} rooms={rooms} />
}
