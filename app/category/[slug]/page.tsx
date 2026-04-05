import { notFound } from "next/navigation"
import { getCategoryById, getRoomsByCategoryId, categories } from "@/lib/rooms-data"
import { CategoryClient } from "./category-client"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.id,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryById(slug)

  if (!category) {
    return {
      title: "Category Not Found | MK Interiors",
    }
  }

  return {
    title: `${category.title} | MK Interiors`,
    description: `Explore our ${category.title.toLowerCase()} projects — carefully crafted interiors by MK Interiors.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryById(slug)

  if (!category) {
    notFound()
  }

  const rooms = getRoomsByCategoryId(slug)

  return <CategoryClient category={category} rooms={rooms} />
}
