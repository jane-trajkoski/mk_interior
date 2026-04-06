"use client"

import { Plus, Trash2 } from "lucide-react"

interface ColorSwatch {
  name: string
  color: string
}

interface ColorSwatchEditorProps {
  colors: ColorSwatch[]
  onChange: (colors: ColorSwatch[]) => void
}

export function ColorSwatchEditor({ colors, onChange }: ColorSwatchEditorProps) {
  const addColor = () => onChange([...colors, { name: "", color: "#000000" }])

  const removeColor = (index: number) => {
    const next = [...colors]
    next.splice(index, 1)
    onChange(next)
  }

  const updateColor = (index: number, field: keyof ColorSwatch, value: string) => {
    const next = [...colors]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Color Palette</label>
      <div className="space-y-2">
        {colors.map((swatch, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="color"
              value={swatch.color}
              onChange={(e) => updateColor(index, "color", e.target.value)}
              className="w-10 h-10 rounded border border-border cursor-pointer"
            />
            <input
              type="text"
              value={swatch.name}
              onChange={(e) => updateColor(index, "name", e.target.value)}
              placeholder="Color name"
              className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              value={swatch.color}
              onChange={(e) => updateColor(index, "color", e.target.value)}
              placeholder="#hex"
              className="w-24 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => removeColor(index)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addColor}
        className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add color
      </button>
    </div>
  )
}
