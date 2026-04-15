'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { createClient } from '@/lib/supabase/client'

interface BookMeetingProps {
  context?: string // e.g. "FlowBit Demo", "General Discussion"
  inline?: boolean // true = full inline embed, false = just the button (modal)
}

export default function BookMeeting({ context, inline = false }: BookMeetingProps) {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const calLink = process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL?.replace('https://cal.com/', '') || 'rakshit-mishra-5x7tan'

  useEffect(() => {
    // Prefill from auth session if logged in
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || '')
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || '')
      }
    })
  }, [])

  useEffect(() => {
    (async () => {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#C8962E' } },
      })

      // Log booking event
      cal('on', {
        action: 'bookingSuccessful',
        callback: async () => {
          try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
              await supabase.from('tool_events').insert({
                user_id: user.id,
                tool: context || 'General',
                event_type: 'demo_request',
                metadata: { source: 'cal.com', context },
              })
            }
          } catch {
            // Silent fail — don't block UX for analytics
          }
        },
      })
    })()
  }, [context])

  if (inline) {
    return (
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        config={{
          name: userName,
          email: userEmail,
          ...(context ? { notes: `Context: ${context}` } : {}),
          theme: 'dark',
        }}
      />
    )
  }

  return null
}

export function BookMeetingButton({ context, label = 'Book a Meeting', style }: {
  context?: string; label?: string; style?: React.CSSProperties
}) {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const calLink = process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL?.replace('https://cal.com/', '') || 'rakshit-mishra-5x7tan'

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || '')
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || '')
      }
    })
  }, [])

  useEffect(() => {
    (async () => {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#C8962E' } },
      })
      cal('on', {
        action: 'bookingSuccessful',
        callback: async () => {
          try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
              await supabase.from('tool_events').insert({
                user_id: user.id,
                tool: context || 'General',
                event_type: 'demo_request',
                metadata: { source: 'cal.com', context },
              })
            }
          } catch { /* silent */ }
        },
      })
    })()
  }, [context])

  return (
    <button
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({
        name: userName,
        email: userEmail,
        notes: context ? `Context: ${context}` : undefined,
        theme: 'dark',
      })}
      style={{
        fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
        background: 'var(--amber)', color: '#0A0A0A',
        padding: '0.75rem 1.5rem', borderRadius: 2,
        border: 'none', cursor: 'pointer',
        letterSpacing: '0.08em',
        transition: 'opacity 0.2s',
        ...style,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
    >
      {label} →
    </button>
  )
}
