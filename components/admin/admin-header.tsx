"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"

export function AdminHeader() {
  const router = useRouter()
  const [adminName, setAdminName] = useState("")

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((data) => setAdminName(data.name ?? ""))
      .catch(() => {})
  }, [])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        {adminName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{adminName}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  )
}
