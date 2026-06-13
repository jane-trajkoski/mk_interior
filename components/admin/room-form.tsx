"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ImageUpload } from "./image-upload"
import { ColorSwatchEditor } from "./color-swatch-editor"
import { Plus, Trash2 } from "lucide-react"
import { toErrorMessage } from "@/lib/debug" // TEMP: instrumentation

interface RoomImage {
  src: string
  alt: string
}

interface ColorSwatch {
  name: string
  color: string
}

interface RoomFormData {
  id?: string
  slug: string
  title: string
  category_id: string
  description: string
  images: RoomImage[]
  colors: ColorSwatch[]
  sort_order: number
}

interface RoomFormProps {
  initialData?: RoomFormData
  categories: { id: string; title: string }[]
  onSubmit: (data: RoomFormData) => Promise<{ success?: boolean; error?: unknown }>
}

export function RoomForm({ initialData, categories, onSubmit }: RoomFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<RoomFormData>(
    initialData ?? {
      slug: "",
      title: "",
      category_id: "",
      description: "",
      images: [{ src: "", alt: "" }],
      colors: [],
      sort_order: 0,
    }
  )

  const updateField = <K extends keyof RoomFormData>(field: K, value: RoomFormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const updateImage = (index: number, field: keyof RoomImage, value: string) => {
    const next = [...data.images]
    next[index] = { ...next[index], [field]: value }
    updateField("images", next)
  }

  const addImage = () => updateField("images", [...data.images, { src: "", alt: "" }])
  const removeImage = (index: number) => {
    const next = [...data.images]
    next.splice(index, 1)
    updateField("images", next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await onSubmit(data)
      if (result.success) {
        toast.success(initialData ? "Room updated" : "Room created")
        router.push("/admin/projects")
        router.refresh()
      } else {
        // TEMP: surface the real server-side error instead of a generic message
        const msg =
          typeof result.error === "string"
            ? result.error
            : `Validation error: ${JSON.stringify(result.error)}`
        toast.error(msg, { duration: 15000 })
      }
    } catch (err) {
      // TEMP: framework-level rejections (origin/CSRF, body size, network) land here
      toast.error(`Save failed: ${toErrorMessage(err)}`, { duration: 15000 })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Slug</label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
        <select
          value={data.category_id}
          onChange={(e) => updateField("category_id", e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          required
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Images</label>
        <div className="space-y-3">
          {data.images.map((img, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border border-border">
              <div className="flex-1 space-y-2">
                <ImageUpload value={img.src} onChange={(url) => updateImage(i, "src", url)} />
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => updateImage(i, "alt", e.target.value)}
                  placeholder="Alt text"
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {data.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="mt-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addImage}
          className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80"
        >
          <Plus className="w-4 h-4" /> Add image
        </button>
      </div>

      <ColorSwatchEditor colors={data.colors} onChange={(colors) => updateField("colors", colors)} />

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Sort Order</label>
        <input
          type="number"
          value={data.sort_order}
          onChange={(e) => updateField("sort_order", parseInt(e.target.value) || 0)}
          className="w-24 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : initialData ? "Update Room" : "Create Room"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-border text-sm rounded-md hover:bg-muted transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
