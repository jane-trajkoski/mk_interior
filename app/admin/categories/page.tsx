export const dynamic = "force-dynamic"

import { getAllCategories, getRoomCountByCategoryId } from "@/lib/data/repository"
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/categories"
import { CategoriesClient } from "./categories-client"

export default async function AdminCategoriesPage() {
  let categories: Awaited<ReturnType<typeof getAllCategories>> = []
  try {
    categories = await getAllCategories()
  } catch {}

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => ({
      ...cat,
      roomCount: await getRoomCountByCategoryId(cat.id).catch(() => 0),
    }))
  )

  return (
    <CategoriesClient
      categories={categoriesWithCounts}
      createCategory={createCategory}
      updateCategory={updateCategory}
      deleteCategory={deleteCategory}
    />
  )
}
