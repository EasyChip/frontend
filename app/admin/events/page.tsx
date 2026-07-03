import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface ToolEvent {
  id: number
  user_id: string
  tool: string
  event_type: string
  metadata: Record<string, unknown> | null
  created_at: string
  profiles: { full_name: string | null; company: string | null } | null
}

export const dynamic = 'force-dynamic'

export default async function AdminEventsPage() {
  const supabase = await createClient()

  // Verify this is a founder (middleware already gates this, but double-check)
  const { data: { user } } = await supabase.auth.getUser()
  const founderEmails = [
    'f20220056@goa.bits-pilani.ac.in',
    'f20220687@goa.bits-pilani.ac.in',
  ]
  if (!user || !founderEmails.includes(user.email ?? '')) {
    return (
      <div style={{ minHeight: '100vh', background: '#04060F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF4D6D', fontFamily: 'var(--font-mono)' }}>
        Access denied.
      </div>
    )
  }

  // Fetch events with profile data using service role would be ideal,
  // but we're using the user's session here. Since founders have their own
  // events only via RLS, we'll query tool_events without joins for now.
  // For full admin view, we'd need a server action with service role.
  const { data: events, error } = await supabase
    .from('tool_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div style={{
      minHeight: '100vh', background: '#04060F', fontFamily: 'var(--font-sans)',
      color: '#F5F7FA', paddingTop: 60,
    }}>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
            Funnel Events
          </h1>
          <Link href="/dashboard" style={{ fontSize: 13, color: '#6B7590', textDecoration: 'none' }}>
            ← Dashboard
          </Link>
        </div>
        <p style={{ fontSize: 14, color: '#6B7590', margin: '0 0 32px' }}>
          Recent tool downloads, demo requests, and page views.
        </p>

        {error && (
          <div style={{
            padding: '12px 16px', background: 'rgba(255,77,109,0.08)',
            border: '1px solid rgba(255,77,109,0.2)', borderRadius: 8,
            fontSize: 13, color: '#FF4D6D', marginBottom: 24,
          }}>
            Error loading events: {error.message}
            <br />
            <span style={{ fontSize: 12, color: '#A7B0C6' }}>
              Note: Full admin view requires service role key. Currently showing events visible to your session.
            </span>
          </div>
        )}

        {(!events || events.length === 0) ? (
          <div style={{
            padding: '48px', textAlign: 'center', background: '#0D1120',
            border: '1px solid #1E2740', borderRadius: 12,
          }}>
            <p style={{ fontSize: 16, color: '#6B7590', margin: '0 0 8px' }}>No events yet</p>
            <p style={{ fontSize: 13, color: '#6B7590', margin: 0 }}>
              Events will appear here as users download tools and request demos.
            </p>
          </div>
        ) : (
          <div style={{
            border: '1px solid #1E2740', borderRadius: 10, overflow: 'hidden',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 1fr 120px 180px',
              padding: '12px 16px', background: '#0D1120',
              borderBottom: '1px solid #1E2740',
              fontSize: 11, fontFamily: 'var(--font-mono)', color: '#6B7590',
            }}>
              <span>ID</span>
              <span>Tool</span>
              <span>Event</span>
              <span>User</span>
              <span>Time</span>
            </div>
            {/* Rows */}
            {(events as ToolEvent[]).map((event, i) => (
              <div key={event.id} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 1fr 120px 180px',
                padding: '10px 16px',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                borderBottom: '1px solid #1E2740',
                fontSize: 13,
              }}>
                <span style={{ color: '#6B7590', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                  #{event.id}
                </span>
                <span style={{ color: '#00E5EE', fontFamily: 'var(--font-mono)' }}>
                  {event.tool}
                </span>
                <span style={{ color: '#F5F7FA' }}>
                  {event.event_type === 'download' ? '⬇ Download' :
                   event.event_type === 'demo_request' ? '📅 Demo Request' :
                   event.event_type === 'page_view' ? '👁 Page View' : event.event_type}
                </span>
                <span style={{ color: '#A7B0C6', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  {event.user_id?.slice(0, 8)}...
                </span>
                <span style={{ color: '#6B7590', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  {new Date(event.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
