'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AppHeader from '@/components/layout/AppHeader'
import StatusPill from '@/components/ui/StatusPill'
import { LIVE, type Tool } from '@/lib/tools'
import { CTA } from '@/lib/site'

interface Profile {
  id: string
  full_name: string | null
  company: string | null
  role: string | null
  company_stage: string | null
  interest_areas: string[] | null
  primary_use_case: string | null
  avatar_url: string | null
  onboarding_complete: boolean
  /** Optional column; when absent the admin entry simply does not render. */
  is_admin?: boolean | null
}

interface ToolEvent {
  id: number
  tool: string
  event_type: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [events, setEvents] = useState<ToolEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      if (!supabase) {
        router.replace('/login')
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }

      setUserEmail(user.email || '')

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData && !profileData.onboarding_complete) {
        router.replace('/onboarding')
        return
      }

      setProfile(profileData)

      const { data: eventsData } = await supabase
        .from('tool_events')
        .select('id, tool, event_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      setEvents(eventsData || [])
      setLoading(false)
    }
    load().catch(() => router.replace('/login'))
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    if (supabase) await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <DashboardSkeleton />

  const displayName = profile?.full_name || userEmail.split('@')[0] || 'there'
  const interests = profile?.interest_areas || []

  // Surface the tools this person actually asked about; fall back to the
  // whole live suite rather than an arbitrary two.
  const picked = LIVE.filter((t) => interests.includes(t.name))
  const suggested: Tool[] = picked.length > 0 ? picked : LIVE

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader>
        <div className="flex items-center gap-3">
          {profile?.is_admin && (
            <Link
              href="/admin/events"
              className="text-sm text-ink-2 transition-colors hover:text-ink"
            >
              Admin
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </AppHeader>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <h1 className="editorial-title text-3xl">
          Welcome back, <span className="text-brand-cyan">{displayName}</span>
        </h1>
        <p className="mt-2 text-ink-2">
          {[profile?.company, profile?.role].filter(Boolean).join(' · ') || userEmail}
        </p>

        {/* Live tools */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-ink">Live and ready to use</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {suggested.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col rounded-lg border border-hair bg-surface-1 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-line hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="eyebrow text-ink-3">{tool.category}</span>
                  <StatusPill status="live" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{tool.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Profile + activity */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-hair bg-surface-1 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Your profile</h2>
              <Link
                href="/onboarding"
                className="text-sm text-brand-cyan transition-colors hover:underline underline-offset-4"
              >
                Edit
              </Link>
            </div>
            <dl className="mt-5 space-y-4">
              <ProfileRow label="Name" value={profile?.full_name} />
              <ProfileRow label="Email" value={userEmail} />
              <ProfileRow label="Company" value={profile?.company} />
              <ProfileRow label="Role" value={profile?.role} />
              <ProfileRow label="Organization" value={profile?.company_stage} />
            </dl>
            {interests.length > 0 && (
              <div className="mt-5">
                <p className="text-sm text-ink-3">Interests</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {interests.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-brand-cyan/15 bg-brand-cyan/10 px-3 py-1 text-sm text-brand-cyan"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-hair bg-surface-1 p-6">
            <h2 className="font-display text-lg font-semibold text-ink">Your activity</h2>
            {events.length === 0 ? (
              <div className="mt-5 rounded-md border border-dashed border-hair p-6 text-center">
                <p className="text-ink-2">Nothing here yet.</p>
                <p className="mt-2 text-sm text-ink-3">
                  Demo requests and tool activity will show up here as you use the platform.
                </p>
                <Link
                  href={CTA.primary.href}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-ink-3 hover:bg-surface-2"
                >
                  {CTA.primary.label}
                </Link>
              </div>
            ) : (
              <ul className="mt-5 space-y-3">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-baseline justify-between gap-4 border-b border-hair pb-3 last:border-0"
                  >
                    <span className="text-sm text-ink">
                      {event.tool}
                      <span className="text-ink-3"> · {event.event_type.replace(/_/g, ' ')}</span>
                    </span>
                    <time
                      dateTime={event.created_at}
                      className="shrink-0 font-mono text-xs text-ink-3"
                    >
                      {new Date(event.created_at).toLocaleDateString()}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-ink-3">{label}</dt>
      <dd className="text-right text-sm text-ink">{value || <span className="text-ink-3">—</span>}</dd>
    </div>
  )
}

/** Matches the real page: header, greeting, then the two content bands. */
function DashboardSkeleton() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="skeleton h-9 w-72" />
        <div className="skeleton mt-3 h-5 w-48" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-40" />
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="skeleton h-72" />
          <div className="skeleton h-72" />
        </div>
      </main>
    </div>
  )
}
