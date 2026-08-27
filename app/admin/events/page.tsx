import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AppHeader from '@/components/layout/AppHeader'

interface ToolEvent {
  id: number
  user_id: string
  tool: string
  event_type: string
  metadata: Record<string, unknown> | null
  created_at: string
}

export const dynamic = 'force-dynamic'

/**
 * Admin allowlist, server-only. `ADMIN_EMAILS` is a comma-separated list with
 * no NEXT_PUBLIC prefix, so it never reaches a client bundle. Middleware gates
 * this route already; this is the second lock.
 */
function isAllowed(email: string | undefined) {
  const allowed = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return Boolean(email && allowed.includes(email.toLowerCase()))
}

const EVENT_LABELS: Record<string, string> = {
  download: 'Download',
  demo_request: 'Demo request',
  page_view: 'Page view',
}

export default async function AdminEventsPage() {
  const supabase = await createClient()

  if (!supabase) {
    return (
      <Shell>
        <p className="rounded-md border border-warning/30 bg-warning/5 px-4 py-3 text-ink-2">
          Admin is unavailable: this deployment has no database configured.
        </p>
      </Shell>
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!isAllowed(user?.email)) {
    return (
      <Shell>
        <p className="rounded-md border border-error/30 bg-error/5 px-4 py-3 text-error">
          Access denied.
        </p>
      </Shell>
    )
  }

  const { data: events, error } = await supabase
    .from('tool_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  const rows = (events ?? []) as ToolEvent[]

  return (
    <Shell>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="editorial-title text-3xl">Funnel events</h1>
        <Link
          href="/dashboard"
          className="text-sm text-ink-2 transition-colors hover:text-ink"
        >
          ← Dashboard
        </Link>
      </div>
      <p className="mt-2 text-ink-2">Recent tool downloads, demo requests, and page views.</p>

      {error && (
        <div className="mt-6 rounded-md border border-error/30 bg-error/5 px-4 py-3">
          <p className="text-sm text-error">Could not load events: {error.message}</p>
          <p className="mt-1 text-sm text-ink-2">
            A full admin view needs a service-role key; this shows what your session can read.
          </p>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-hair p-12 text-center">
          <p className="text-ink-2">No events yet.</p>
          <p className="mt-2 text-sm text-ink-3">
            Events appear here as people download tools and request demos.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-hair bg-surface-1">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="eyebrow px-4 py-3 text-ink-3">ID</th>
                <th className="eyebrow px-4 py-3 text-ink-3">Tool</th>
                <th className="eyebrow px-4 py-3 text-ink-3">Event</th>
                <th className="eyebrow px-4 py-3 text-ink-3">User</th>
                <th className="eyebrow px-4 py-3 text-ink-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-hair transition-colors last:border-0 hover:bg-surface-2/40"
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink-3">#{event.id}</td>
                  <td className="px-4 py-3 font-mono text-brand-cyan">{event.tool}</td>
                  <td className="px-4 py-3 text-ink">
                    {EVENT_LABELS[event.event_type] ?? event.event_type}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-2">
                    {event.user_id?.slice(0, 8)}…
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-3">
                    <time dateTime={event.created_at}>
                      {new Date(event.created_at).toLocaleString()}
                    </time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">{children}</main>
    </div>
  )
}
