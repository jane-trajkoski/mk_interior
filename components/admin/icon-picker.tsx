"use client"

import { iconMap, iconNames } from "@/lib/data/icons"

interface IconPickerProps {
  value: string
  onChange: (name: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">Icon</label>
      <div className="grid grid-cols-6 gap-2">
        {iconNames.map((name) => {
          const Icon = iconMap[name]
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`flex flex-col items-center gap-1 p-2 rounded-md border text-xs transition-colors ${
                value === name
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
              title={name}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate w-full text-center text-[10px]">{name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
