"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteButton({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<{ success?: boolean }>
}) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this?")) return
    const result = await action(id)
    if (result.success) {
      toast.success("Deleted")
      router.refresh()
    } else {
      toast.error("Failed to delete")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md text-destructive hover:bg-destructive/10 transition-colors"
    >
      <Trash2 className="w-3 h-3" /> Delete
    </button>
  )
}
