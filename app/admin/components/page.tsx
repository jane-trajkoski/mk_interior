"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { updateContent } from "@/lib/actions/content"
import { ArrayFieldEditor } from "@/components/admin/array-field-editor"
import { IconPicker } from "@/components/admin/icon-picker"
import { ImageUpload } from "@/components/admin/image-upload"
import type {
  ServicesContent,
  ProcessStepsContent,
  TestimonialsContent,
  MoodboardsContent,
  BeforeAfterContent,
} from "@/lib/types/content"

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

function ServicesTab() {
  const [data, setData] = useState<ServicesContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/services").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("services", data)
    setSaving(false)
    if (result.success) toast.success("Services saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Section Tagline</label>
          <input type="text" value={data.sectionTagline} onChange={(e) => setData({ ...data, sectionTagline: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Section Title</label>
          <input type="text" value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <ArrayFieldEditor
        label="Services"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        createItem={() => ({ title: "", description: "", iconName: "Home" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" rows={2} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <IconPicker value={item.iconName} onChange={(iconName) => update({ ...item, iconName })} />
          </div>
        )}
      />
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

function ProcessTab() {
  const [data, setData] = useState<ProcessStepsContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/process-steps").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("process-steps", data)
    setSaving(false)
    if (result.success) toast.success("Process saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Section Subtitle</label>
        <textarea value={data.sectionSubtitle} onChange={(e) => setData({ ...data, sectionSubtitle: e.target.value })} rows={2} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <ArrayFieldEditor
        label="Steps"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        createItem={() => ({ number: "", title: "", description: "", iconName: "MessageSquare" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={item.number} onChange={(e) => update({ ...item, number: e.target.value })} placeholder="Number (01)" className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <textarea value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" rows={2} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <IconPicker value={item.iconName} onChange={(iconName) => update({ ...item, iconName })} />
          </div>
        )}
      />
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

function TestimonialsTab() {
  const [data, setData] = useState<TestimonialsContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/testimonials").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("testimonials", data)
    setSaving(false)
    if (result.success) toast.success("Testimonials saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <ArrayFieldEditor
        label="Testimonials"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        createItem={() => ({ id: Date.now(), quote: "", author: "", location: "" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <textarea value={item.quote} onChange={(e) => update({ ...item, quote: e.target.value })} placeholder="Quote" rows={3} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={item.author} onChange={(e) => update({ ...item, author: e.target.value })} placeholder="Author" className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" value={item.location} onChange={(e) => update({ ...item, location: e.target.value })} placeholder="Location / Project" className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        )}
      />
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

function MoodboardsTab() {
  const [data, setData] = useState<MoodboardsContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/moodboards").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("moodboards", data)
    setSaving(false)
    if (result.success) toast.success("Moodboards saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Section Title</label>
        <input type="text" value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Section Description</label>
        <textarea value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} rows={2} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <ArrayFieldEditor
        label="Moodboards"
        items={data.items}
        onChange={(items) => setData({ ...data, items })}
        createItem={() => ({ id: "", title: "", style: "" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <input type="text" value={item.id} onChange={(e) => update({ ...item, id: e.target.value })} placeholder="ID (slug)" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="text" value={item.style} onChange={(e) => update({ ...item, style: e.target.value })} placeholder="Style description" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        )}
      />
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

function BeforeAfterTab() {
  const [data, setData] = useState<BeforeAfterContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/before-after").then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("before-after", data)
    setSaving(false)
    if (result.success) toast.success("Before/After saved")
    else toast.error("Failed to save")
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subtitle</label>
        <input type="text" value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ImageUpload label="Before Image" value={data.beforeImage} onChange={(url) => setData({ ...data, beforeImage: url })} />
        <ImageUpload label="After Image" value={data.afterImage} onChange={(url) => setData({ ...data, afterImage: url })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Before Label</label>
          <input type="text" value={data.beforeLabel} onChange={(e) => setData({ ...data, beforeLabel: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">After Label</label>
          <input type="text" value={data.afterLabel} onChange={(e) => setData({ ...data, afterLabel: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

type TabName = "services" | "process" | "testimonials" | "moodboards" | "before-after"

export default function AdminComponentsPage() {
  const [tab, setTab] = useState<TabName>("services")

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Components</h1>
      <div className="flex gap-2 mb-6 flex-wrap">
        <TabButton active={tab === "services"} onClick={() => setTab("services")}>Services</TabButton>
        <TabButton active={tab === "process"} onClick={() => setTab("process")}>Process</TabButton>
        <TabButton active={tab === "testimonials"} onClick={() => setTab("testimonials")}>Testimonials</TabButton>
        <TabButton active={tab === "moodboards"} onClick={() => setTab("moodboards")}>Moodboards</TabButton>
        <TabButton active={tab === "before-after"} onClick={() => setTab("before-after")}>Before/After</TabButton>
      </div>
      <div className="bg-background border border-border rounded-lg p-6">
        {tab === "services" && <ServicesTab />}
        {tab === "process" && <ProcessTab />}
        {tab === "testimonials" && <TestimonialsTab />}
        {tab === "moodboards" && <MoodboardsTab />}
        {tab === "before-after" && <BeforeAfterTab />}
      </div>
    </div>
  )
}
