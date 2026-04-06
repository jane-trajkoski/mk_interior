"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { updateContent } from "@/lib/actions/content"
import { ImageUpload } from "@/components/admin/image-upload"
import type { HeroContent, PhilosophyContent, AboutContent } from "@/lib/types/content"

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  )
}

function HeroTab() {
  const [data, setData] = useState<HeroContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/hero").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("hero", data)
    setSaving(false)
    if (result.success) toast.success("Hero saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Tagline</label>
        <input type="text" value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Headline</label>
        <input type="text" value={data.headline} onChange={(e) => setData({ ...data, headline: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subtitle</label>
        <textarea value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} rows={3} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CTA Text</label>
        <input type="text" value={data.ctaText} onChange={(e) => setData({ ...data, ctaText: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <ImageUpload label="Background Image" value={data.backgroundImage} onChange={(url) => setData({ ...data, backgroundImage: url })} />
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

function PhilosophyTab() {
  const [data, setData] = useState<PhilosophyContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/philosophy").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  const updateFeature = (index: number, field: "title" | "subtitle", value: string) => {
    const features = [...data.features]
    features[index] = { ...features[index], [field]: value }
    setData({ ...data, features })
  }

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("philosophy", data)
    setSaving(false)
    if (result.success) toast.success("Philosophy saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={4} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <ImageUpload label="Image" value={data.image} onChange={(url) => setData({ ...data, image: url })} />
      <div>
        <label className="block text-sm font-medium mb-2">Features</label>
        <div className="space-y-3">
          {data.features.map((f, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-md border border-border">
              <input type="text" value={f.title} onChange={(e) => updateFeature(i, "title", e.target.value)} placeholder="Title" className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" value={f.subtitle} onChange={(e) => updateFeature(i, "subtitle", e.target.value)} placeholder="Subtitle" className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

function AboutTab() {
  const [data, setData] = useState<AboutContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/about").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  const updateParagraph = (key: "introParagraphs" | "approachParagraphs", index: number, value: string) => {
    const arr = [...data[key]]
    arr[index] = value
    setData({ ...data, [key]: arr })
  }

  const updateValue = (index: number, field: "title" | "description", value: string) => {
    const values = [...data.values]
    values[index] = { ...values[index], [field]: value }
    setData({ ...data, values })
  }

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("about", data)
    setSaving(false)
    if (result.success) toast.success("About saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Hero Tagline</label>
        <input type="text" value={data.heroTagline} onChange={(e) => setData({ ...data, heroTagline: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Hero Title</label>
        <input type="text" value={data.heroTitle} onChange={(e) => setData({ ...data, heroTitle: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Intro Paragraphs</label>
        {data.introParagraphs.map((p, i) => (
          <textarea key={i} value={p} onChange={(e) => updateParagraph("introParagraphs", i, e.target.value)} rows={3} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-2" />
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Values</label>
        <div className="space-y-3">
          {data.values.map((v, i) => (
            <div key={i} className="p-3 bg-muted/50 rounded-md border border-border space-y-2">
              <input type="text" value={v.title} onChange={(e) => updateValue(i, "title", e.target.value)} placeholder="Title" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" value={v.description} onChange={(e) => updateValue(i, "description", e.target.value)} placeholder="Description" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Approach Paragraphs</label>
        {data.approachParagraphs.map((p, i) => (
          <textarea key={i} value={p} onChange={(e) => updateParagraph("approachParagraphs", i, e.target.value)} rows={3} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-2" />
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CTA Title</label>
        <input type="text" value={data.ctaTitle} onChange={(e) => setData({ ...data, ctaTitle: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CTA Description</label>
        <input type="text" value={data.ctaDescription} onChange={(e) => setData({ ...data, ctaDescription: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

export default function AdminPagesPage() {
  const [tab, setTab] = useState<"hero" | "philosophy" | "about">("hero")

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Pages</h1>
      <div className="flex gap-2 mb-6">
        <TabButton active={tab === "hero"} onClick={() => setTab("hero")}>Hero</TabButton>
        <TabButton active={tab === "philosophy"} onClick={() => setTab("philosophy")}>Philosophy</TabButton>
        <TabButton active={tab === "about"} onClick={() => setTab("about")}>About</TabButton>
      </div>
      <div className="bg-background border border-border rounded-lg p-6">
        {tab === "hero" && <HeroTab />}
        {tab === "philosophy" && <PhilosophyTab />}
        {tab === "about" && <AboutTab />}
      </div>
    </div>
  )
}
