export const dynamic = "force-dynamic"

import Link from "next/link"
import { db } from "@/lib/db"
import { rooms, categories, contactSubmissions } from "@/lib/db/schema"
import { count, eq } from "drizzle-orm"
import { FolderKanban, Layers, MessageSquare, FileText, Puzzle, Settings } from "lucide-react"

async function getStats() {
  try {
    const [roomCount] = await db.select({ value: count() }).from(rooms)
    const [categoryCount] = await db.select({ value: count() }).from(categories)
    const [unreadCount] = await db
      .select({ value: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "unread"))
    return {
      rooms: roomCount.value,
      categories: categoryCount.value,
      unread: unreadCount.value,
    }
  } catch {
    return { rooms: 0, categories: 0, unread: 0 }
  }
}

const quickLinks = [
  { href: "/admin/pages", label: "Edit Pages", icon: FileText, description: "Hero, Philosophy, About" },
  { href: "/admin/projects", label: "Manage Projects", icon: FolderKanban, description: "Rooms & categories" },
  { href: "/admin/components", label: "Edit Components", icon: Puzzle, description: "Services, Process, Testimonials" },
  { href: "/admin/settings", label: "Settings", icon: Settings, description: "Contact info, social links" },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, description: "Contact submissions" },
]

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.rooms}</p>
              <p className="text-sm text-muted-foreground">Rooms</p>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.categories}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.unread}</p>
              <p className="text-sm text-muted-foreground">Unread Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="text-lg font-medium text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="bg-background border border-border rounded-lg p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
