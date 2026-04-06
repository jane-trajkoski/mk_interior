"use client"

import { useState, useCallback } from "react"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return
      setUploading(true)
      try {
        // For local dev without Vercel Blob, use a data URL fallback
        const reader = new FileReader()
        reader.onloadend = () => {
          onChange(reader.result as string)
          setUploading(false)
        }
        reader.readAsDataURL(file)
      } catch {
        setUploading(false)
      }
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <div>
      {label && <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>}
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border">
          <img src={value} alt="Upload preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onClick={() => {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "image/*"
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) handleFile(file)
            }
            input.click()
          }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Drop an image or click to upload
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
