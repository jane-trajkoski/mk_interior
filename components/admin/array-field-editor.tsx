"use client"

import { Plus, Trash2, GripVertical } from "lucide-react"

interface ArrayFieldEditorProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, update: (item: T) => void) => React.ReactNode
  createItem: () => T
  label?: string
}

export function ArrayFieldEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  label,
}: ArrayFieldEditorProps<T>) {
  const addItem = () => onChange([...items, createItem()])

  const removeItem = (index: number) => {
    const next = [...items]
    next.splice(index, 1)
    onChange(next)
  }

  const updateItem = (index: number, item: T) => {
    const next = [...items]
    next[index] = item
    onChange(next)
  }

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    onChange(next)
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-md border border-border">
            <div className="flex flex-col gap-0.5 pt-2">
              <button
                type="button"
                onClick={() => moveItem(index, index - 1)}
                disabled={index === 0}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <GripVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">{renderItem(item, index, (updated) => updateItem(index, updated))}</div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="mt-2 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add item
      </button>
    </div>
  )
}
