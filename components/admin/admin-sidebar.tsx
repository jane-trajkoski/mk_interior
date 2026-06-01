"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Tag,
  Puzzle,
  Settings,
  MessageSquare,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/components", label: "Components", icon: Puzzle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
]

export function AdminSidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-background min-h-screen p-4 flex flex-col">
      <div className="mb-8 px-3">
        <h2 className="text-lg font-semibold text-foreground">MK Admin</h2>
        <p className="text-xs text-muted-foreground">Content Management</p>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.label === "Messages" && unreadCount > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="pt-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View Site
        </Link>
      </div>
    </aside>
  )
}
