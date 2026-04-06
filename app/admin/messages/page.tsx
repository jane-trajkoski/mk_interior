"use client"

import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { getSubmissions, updateSubmissionStatus, deleteSubmission } from "@/lib/actions/messages"
import { Mail, MailOpen, Archive, Trash2, X } from "lucide-react"

interface Submission {
  id: number
  name: string
  email: string
  phone: string | null
  project_type: string | null
  message: string
  status: string
  created_at: Date | null
}

function StatusDot({ status }: { status: string }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        status === "unread"
          ? "bg-primary"
          : status === "archived"
          ? "bg-muted-foreground"
          : "bg-transparent"
      }`}
    />
  )
}

export default function AdminMessagesPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [selected, setSelected] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getSubmissions(filter)
    setSubmissions(data as Submission[])
    setLoading(false)
  }, [filter])

  useEffect(() => {
    load()
  }, [load])

  async function openMessage(submission: Submission) {
    setSelected(submission)
    if (submission.status === "unread") {
      await updateSubmissionStatus(submission.id, "read")
      load()
    }
  }

  async function handleStatusChange(id: number, status: "unread" | "read" | "archived") {
    await updateSubmissionStatus(id, status)
    toast.success(`Marked as ${status}`)
    setSelected(null)
    load()
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this message?")) return
    await deleteSubmission(id)
    toast.success("Deleted")
    setSelected(null)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Messages</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(["all", "unread", "archived"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No messages found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground p-3 w-8" />
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Email</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => openMessage(sub)}
                  className={`border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                    sub.status === "unread" ? "font-medium" : ""
                  }`}
                >
                  <td className="p-3"><StatusDot status={sub.status} /></td>
                  <td className="p-3 text-sm">{sub.name}</td>
                  <td className="p-3 text-sm text-muted-foreground">{sub.email}</td>
                  <td className="p-3 text-sm text-muted-foreground">{sub.project_type || "—"}</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Sheet */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-background border-l border-border shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Message Details</h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
                <p className="text-sm text-foreground">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                  <p className="text-sm text-foreground">{selected.phone}</p>
                </div>
              )}
              {selected.project_type && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Project Type</p>
                  <p className="text-sm text-foreground">{selected.project_type}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Message</p>
                <p className="text-sm text-foreground whitespace-pre-wrap mt-1">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Received</p>
                <p className="text-sm text-foreground">
                  {selected.created_at ? new Date(selected.created_at).toLocaleString() : "—"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-border">
              {selected.status !== "unread" && (
                <button onClick={() => handleStatusChange(selected.id, "unread")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted">
                  <Mail className="w-3 h-3" /> Mark Unread
                </button>
              )}
              {selected.status !== "read" && selected.status !== "archived" && (
                <button onClick={() => handleStatusChange(selected.id, "read")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted">
                  <MailOpen className="w-3 h-3" /> Mark Read
                </button>
              )}
              {selected.status !== "archived" && (
                <button onClick={() => handleStatusChange(selected.id, "archived")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted">
                  <Archive className="w-3 h-3" /> Archive
                </button>
              )}
              <button onClick={() => handleDelete(selected.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md text-destructive hover:bg-destructive/10 ml-auto">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
