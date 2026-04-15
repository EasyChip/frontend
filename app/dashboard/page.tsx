'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

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
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/login'); return }

      setUserEmail(user.email || '')

      // Check onboarding
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

      // Load recent events
      const { data: eventsData } = await supabase
        .from('tool_events')
        .select('id, tool, event_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      setEvents(eventsData || [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <DashboardSkeleton />

  const displayName = profile?.full_name || userEmail.split('@')[0] || 'there'
  const interests = profile?.interest_areas || []

  const founderEmails = [
    'f20220056@goa.bits-pilani.ac.in',
    'f20220687@goa.bits-pilani.ac.in',
  ]
  const isFounder = founderEmails.includes(userEmail)

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', fontFamily: 'var(--font-sans)',
      color: '#FAFAFA', paddingTop: 60,
    }}>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        {/* Top actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 24 }}>
          {isFounder && (
            <Link href="/admin/events" style={{ fontSize: 13, color: '#C8962E', textDecoration: 'none', transition: 'opacity 0.2s', fontFamily: 'var(--font-mono)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Admin</Link>
          )}
          <button onClick={handleLogout} style={{
            background: 'none', border: '1px solid #1C1C1C', borderRadius: 6,
            color: '#888888', padding: '6px 14px', fontSize: 12, cursor: 'pointer',
            fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#EF4444'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C1C'}
          >Sign out</button>
        </div>
        {/* Greeting */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>
            Welcome back, <span style={{ color: '#C8962E' }}>{displayName}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#555555', margin: 0 }}>
            {profile?.company && `${profile.company}`}
            {profile?.company && profile?.role && ' · '}
            {profile?.role && `${profile.role}`}
            {!profile?.company && !profile?.role && userEmail}
          </p>
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          {/* Prioritize tools user expressed interest in */}
          {(interests.includes('FlowBit') || interests.length === 0) && (
            <QuickCard
              title="FlowBit"
              description="Visual workflow orchestrator for semiconductor design. Request a demo to see it in action."
              cta="Request Demo"
              href="/tools/flowbit"
              badge="Proprietary"
            />
          )}
          {(interests.includes('VisUPF') || interests.length === 0) && (
            <QuickCard
              title="VisUPF"
              description="Open-source UPF authoring tool. Download the package and start designing power intent."
              cta="Download"
              href="/tools/visupf"
              badge="Open Source"
            />
          )}
          <QuickCard
            title="Book a Meeting"
            description="Schedule a call with the founding team to discuss your use case and requirements."
            cta="Book now"
            href="/book"
          />
        </div>

        {/* Two-column: Profile + Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Profile card */}
          <div style={{
            background: '#111111', border: '1px solid #1C1C1C', borderRadius: 12,
            padding: '24px',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Your Profile
              <Link href="/onboarding" style={{
                fontSize: 12, color: '#555555', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#C8962E'}
                onMouseLeave={e => e.currentTarget.style.color = '#555555'}
              >Edit</Link>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ProfileRow label="Name" value={profile?.full_name} />
              <ProfileRow label="Email" value={userEmail} />
              <ProfileRow label="Company" value={profile?.company} />
              <ProfileRow label="Role" value={profile?.role} />
              <ProfileRow label="Organization" value={profile?.company_stage} />
              {interests.length > 0 && (
                <div>
                  <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>Interests</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                    {interests.map(i => (
                      <span key={i} style={{
                        padding: '3px 10px', borderRadius: 4, fontSize: 12,
                        background: 'rgba(200,150,46,0.08)', color: '#C8962E',
                        border: '1px solid rgba(200,150,46,0.15)',
                      }}>{i}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity card */}
          <div style={{
            background: '#111111', border: '1px solid #1C1C1C', borderRadius: 12,
            padding: '24px',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>
              Your Activity
            </h3>
            {events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <p style={{ fontSize: 14, color: '#555555', margin: '0 0 12px' }}>
                  No activity yet
                </p>
                <p style={{ fontSize: 12, color: '#555555', margin: 0 }}>
                  Download a tool or request a demo to get started.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {events.map(event => (
                  <div key={event.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 12px', background: '#0A0A0A', borderRadius: 6,
                    border: '1px solid #1C1C1C',
                  }}>
                    <div>
                      <span style={{
                        fontSize: 12, color: '#C8962E', fontFamily: 'var(--font-mono)',
                        marginRight: 8,
                      }}>{event.tool}</span>
                      <span style={{ fontSize: 13, color: '#888888' }}>
                        {event.event_type === 'download' ? 'Downloaded' :
                         event.event_type === 'demo_request' ? 'Requested demo' :
                         event.event_type === 'page_view' ? 'Viewed' : event.event_type}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: '#555555', fontFamily: 'var(--font-mono)' }}>
                      {new Date(event.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function QuickCard({ title, description, cta, href, badge }: {
  title: string; description: string; cta: string; href: string; badge?: string
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#111111', border: '1px solid #1C1C1C', borderRadius: 12,
        padding: '24px', transition: 'border-color 0.2s', cursor: 'pointer',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#C8962E'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C1C'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <h4 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: '#FAFAFA' }}>{title}</h4>
          {badge && (
            <span style={{
              padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600,
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
              background: badge === 'Open Source' ? 'rgba(34,197,94,0.1)' : 'rgba(200,150,46,0.1)',
              color: badge === 'Open Source' ? '#22C55E' : '#C8962E',
              border: `1px solid ${badge === 'Open Source' ? 'rgba(34,197,94,0.2)' : 'rgba(200,150,46,0.2)'}`,
            }}>{badge}</span>
          )}
        </div>
        <p style={{ fontSize: 13, color: '#555555', margin: '0 0 16px', lineHeight: 1.5, flex: 1 }}>
          {description}
        </p>
        <span style={{ fontSize: 13, color: '#C8962E', fontFamily: 'var(--font-mono)' }}>
          {cta} →
        </span>
      </div>
    </Link>
  )
}

function ProfileRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>{label}</span>
      <p style={{ fontSize: 14, color: value ? '#FAFAFA' : '#555555', margin: '2px 0 0' }}>
        {value || '—'}
      </p>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`@keyframes sk-pulse { 0%, 100% { opacity: 0.06; } 50% { opacity: 0.12; } }`}</style>
      <div style={{ height: 56, borderBottom: '1px solid #1C1C1C', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 4, background: '#FAFAFA', animation: 'sk-pulse 1.5s ease infinite' }} />
        <div style={{ width: 80, height: 18, borderRadius: 4, background: '#FAFAFA', animation: 'sk-pulse 1.5s ease infinite' }} />
      </div>
      <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px' }}>
        <div style={{ width: 300, height: 32, borderRadius: 6, background: '#FAFAFA', animation: 'sk-pulse 1.5s ease infinite', marginBottom: 40 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ height: 160, borderRadius: 12, background: '#FAFAFA', animation: 'sk-pulse 1.5s ease infinite' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
