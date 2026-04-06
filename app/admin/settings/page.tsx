"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { updateContent } from "@/lib/actions/content"
import { ImageUpload } from "@/components/admin/image-upload"
import type { ContactContent, SocialLinksContent, SiteSettingsContent } from "@/lib/types/content"

function SettingsCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <h2 className="text-lg font-medium text-foreground mb-4">{title}</h2>
      {children}
    </div>
  )
}

function ContactInfoCard() {
  const [data, setData] = useState<ContactContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/contact")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) return <SettingsCard title="Contact Info"><p className="text-sm text-muted-foreground">Loading...</p></SettingsCard>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("contact", data)
    setSaving(false)
    if (result.success) toast.success("Contact info saved")
    else toast.error("Failed to save")
  }

  return (
    <SettingsCard title="Contact Info">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Location Text</label>
          <input
            type="text"
            value={data.locationText}
            onChange={(e) => setData({ ...data, locationText: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Section Tagline</label>
          <input
            type="text"
            value={data.sectionTagline}
            onChange={(e) => setData({ ...data, sectionTagline: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Section Title</label>
          <input
            type="text"
            value={data.sectionTitle}
            onChange={(e) => setData({ ...data, sectionTitle: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Section Subtitle</label>
          <textarea
            value={data.sectionSubtitle}
            onChange={(e) => setData({ ...data, sectionSubtitle: e.target.value })}
            rows={2}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </SettingsCard>
  )
}

function SocialLinksCard() {
  const [data, setData] = useState<SocialLinksContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/social-links")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) return <SettingsCard title="Social Links"><p className="text-sm text-muted-foreground">Loading...</p></SettingsCard>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("social-links", data)
    setSaving(false)
    if (result.success) toast.success("Social links saved")
    else toast.error("Failed to save")
  }

  return (
    <SettingsCard title="Social Links">
      <div className="space-y-4">
        {(["instagram", "facebook", "linkedin", "tiktok"] as const).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-foreground mb-1 capitalize">{key}</label>
            <input
              type="text"
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
              placeholder={`https://${key}.com/...`}
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </SettingsCard>
  )
}

function SiteSettingsCard() {
  const [data, setData] = useState<SiteSettingsContent | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content/site-settings")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) return <SettingsCard title="Site Metadata"><p className="text-sm text-muted-foreground">Loading...</p></SettingsCard>

  async function save() {
    if (!data) return
    setSaving(true)
    const result = await updateContent("site-settings", data)
    setSaving(false)
    if (result.success) toast.success("Site settings saved")
    else toast.error("Failed to save")
  }

  return (
    <SettingsCard title="Site Metadata">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ImageUpload label="Logo (Light)" value={data.logoLight} onChange={(url) => setData({ ...data, logoLight: url })} />
          <ImageUpload label="Logo (Dark)" value={data.logoDark} onChange={(url) => setData({ ...data, logoDark: url })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Meta Title</label>
          <input
            type="text"
            value={data.metaTitle}
            onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Meta Description</label>
          <textarea
            value={data.metaDescription}
            onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
            rows={3}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </SettingsCard>
  )
}

function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleChangePassword() {
    setError("")
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Password changed successfully")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setError(data.error || "Failed to change password")
      }
    } catch {
      setError("Something went wrong")
    }
    setSaving(false)
  }

  return (
    <SettingsCard title="Change Password">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          onClick={handleChangePassword}
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Changing..." : "Change Password"}
        </button>
      </div>
    </SettingsCard>
  )
}

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Settings</h1>
      <div className="grid gap-6 max-w-2xl">
        <ContactInfoCard />
        <SocialLinksCard />
        <SiteSettingsCard />
        <ChangePasswordCard />
      </div>
    </div>
  )
}
