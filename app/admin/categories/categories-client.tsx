"use client"

import { useState, useTransition } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

type Category = {
  id: string
  title: string
  slug: string
  image: string
  sort_order: number
  roomCount: number
}

type Props = {
  categories: Category[]
  createCategory: (data: unknown) => Promise<{ success?: boolean; error?: unknown }>
  updateCategory: (id: string, data: unknown) => Promise<{ success?: boolean; error?: unknown }>
  deleteCategory: (id: string) => Promise<{ success?: boolean; error?: string }>
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function CategoriesClient({ categories, createCategory, updateCategory, deleteCategory }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [isPending, startTransition] = useTransition()

  function openAdd() {
    setEditing(null)
    setTitle("")
    setSlug("")
    setSlugManuallyEdited(false)
    setDialogOpen(true)
  }

  function openEdit(cat: Category) {
    setEditing(cat)
    setTitle(cat.title)
    setSlug(cat.slug)
    setSlugManuallyEdited(true)
    setDialogOpen(true)
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugManuallyEdited) {
      setSlug(slugify(value))
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value)
    setSlugManuallyEdited(true)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !slug.trim()) return

    startTransition(async () => {
      const data = { title: title.trim(), slug: slug.trim() }
      const result = editing
        ? await updateCategory(editing.id, data)
        : await createCategory(data)

      if ("error" in result && result.error) {
        toast.error("Failed to save category")
        return
      }

      toast.success(editing ? "Category updated" : "Category created")
      setDialogOpen(false)
    })
  }

  function handleDelete(cat: Category) {
    startTransition(async () => {
      const result = await deleteCategory(cat.id)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success("Category deleted")
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
        <Button onClick={openAdd} size="sm">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No categories yet. Add one to get started.
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rooms</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr
                  key={cat.id}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{cat.title}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{cat.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.roomCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(cat)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-muted transition-colors"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        disabled={isPending}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="cat-title">
                Title
              </label>
              <input
                id="cat-title"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Living Rooms"
                required
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="cat-slug">
                Slug
              </label>
              <input
                id="cat-slug"
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g. living-rooms"
                required
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground">Used in URLs. Auto-generated from title.</p>
            </div>
            <DialogFooter>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving…" : editing ? "Save Changes" : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
