'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { createClient } from '@/lib/supabase/client'
import { CALCOM_URL } from '@/lib/site'

interface BookMeetingProps {
  context?: string // e.g. "FlowBit Demo", "General Discussion"
  inline?: boolean // true = full inline embed
}

type EmbedState = 'loading' | 'ready' | 'failed'

const calLinkFrom = (url: string) => url.replace('https://cal.com/', '')

/**
 * Cal.com booking embed.
 *
 * Two rules hold here, both learned the hard way:
 *  1. The Supabase prefill is strictly optional. It is a convenience for
 *     signed-in visitors and must never be able to unmount the calendar -
 *     a missing env var used to throw here and delete the booking widget
 *     from the public contact page.
 *  2. There is always a reachable fallback. If the embed script fails, is
 *     blocked, or JS is off, the visitor still gets a working link.
 */
export default function BookMeeting({ context, inline = false }: BookMeetingProps) {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [state, setState] = useState<EmbedState>('loading')

  const calLink = calLinkFrom(CALCOM_URL)

  // Optional prefill. Every failure path is swallowed on purpose.
  useEffect(() => {
    let cancelled = false
    try {
      const supabase = createClient()
      if (!supabase) return
      supabase.auth
        .getUser()
        .then(({ data: { user } }) => {
          if (cancelled || !user) return
          setUserEmail(user.email || '')
          setUserName(user.user_metadata?.full_name || user.user_metadata?.name || '')
        })
        .catch(() => {})
    } catch {
      // Prefill is a nicety; the calendar renders regardless.
    }
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const cal = await getCalApi()
        if (cancelled) return
        cal('ui', {
          theme: 'dark',
          styles: { branding: { brandColor: '#7C08F5' } },
        })
        setState('ready')

        cal('on', {
          action: 'bookingSuccessful',
          callback: async () => {
            try {
              const supabase = createClient()
              if (!supabase) return
              const {
                data: { user },
              } = await supabase.auth.getUser()
              if (!user) return
              await supabase.from('tool_events').insert({
                user_id: user.id,
                tool: context || 'General',
                event_type: 'demo_request',
                metadata: { source: 'cal.com', context },
              })
            } catch {
              // Analytics must never block the booking.
            }
          },
        })
      } catch {
        if (!cancelled) setState('failed')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [context])

  if (!inline) return null

  if (state === 'failed') {
    return <BookingFallback calUrl={CALCOM_URL} />
  }

  return (
    <div className="relative h-full w-full">
      {state === 'loading' && (
        <div
          aria-hidden
          className="skeleton absolute inset-0 flex items-center justify-center rounded-lg"
        >
          <span className="eyebrow text-ink-3">Loading calendar</span>
        </div>
      )}

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

      {/* No JS, no embed - still a working path to the same calendar. */}
      <noscript>
        <BookingFallback calUrl={CALCOM_URL} />
      </noscript>
    </div>
  )
}

/** Shown when the embed cannot load. Same destination, no dependencies. */
function BookingFallback({ calUrl }: { calUrl: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border border-hair bg-surface-1 p-8 text-center">
      <p className="text-ink-2">The calendar could not load here.</p>
      <a
        href={calUrl}
        target="_blank"
        rel="noreferrer"
        className="sheen inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-brand-violet px-8 text-base font-medium text-white transition-all duration-200 hover:brightness-110 hover:shadow-glow-violet-sm active:scale-[0.98]"
      >
        Open the booking page
      </a>
      <p className="text-sm text-ink-3">It opens in a new tab.</p>
    </div>
  )
}
