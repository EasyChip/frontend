'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Button from '@/components/core/Button'
import { Eyebrow } from '@/components/core/Type'
import { CALENDLY_URL } from '@/lib/site'

/**
 * Calendly inline embed, themed to the monochrome system.
 *
 * Two failure modes are handled, because both have bitten this site before:
 *
 * 1. No link configured. The embed is not rendered at all - a guessed Calendly
 *    URL renders *their* 404 page, branding and cookie banner included, inside
 *    ours. An honest absence beats a foreign error page.
 * 2. The script is blocked, slow, or JavaScript is off. A visitor still gets a
 *    working path to the same calendar rather than an empty rectangle at the
 *    end of the funnel.
 */
export default function Calendly() {
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading')
  // "Loading" is only ever true of a browser that is running our JavaScript.
  // Rendered unconditionally it also reaches the visitor who has none, who
  // then reads LOADING CALENDAR stacked above the <noscript> notice saying the
  // calendar could not load - two contradictory answers to the same question.
  const [scripting, setScripting] = useState(false)

  useEffect(() => {
    setScripting(true)
    if (!CALENDLY_URL) return
    const timer = setTimeout(() => {
      setState((s) => (s === 'ready' ? s : 'failed'))
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  if (!CALENDLY_URL) return <NotConfigured />

  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    background_color: '141414',
    text_color: 'F2F2F2',
    primary_color: 'FFFFFF',
  })

  if (state === 'failed') return <Fallback url={CALENDLY_URL} />

  return (
    // No border, radius or fill of our own. Calendly draws its own bordered
    // card inside the iframe, so a hairline here would sit a hundred pixels
    // outside a hairline of theirs.
    <div className="relative min-h-[900px] w-full md:min-h-[700px]">
      {scripting && state === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="label text-gray-2">Loading calendar</span>
        </div>
      )}

      <div
        // Both heights are measured against the real widget, not chosen. Below
        // md it lays out stacked and needs 900px: at 700 the timezone selector
        // is cut off with no way to scroll to it, and at 1040 the widget drops
        // the calendar pane altogether - its layout keys off container height
        // as well as width, so more room is not safely better.
        className="calendly-inline-widget h-[900px] w-full md:h-[700px]"
        data-url={`${CALENDLY_URL}?${params.toString()}`}
      />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setState('ready')}
        onError={() => setState('failed')}
      />

      <noscript>
        <Fallback url={CALENDLY_URL} />
      </noscript>
    </div>
  )
}

/** No booking link set. Say so, and route the visitor to what does work. */
function NotConfigured() {
  return (
    <div className="rounded-md border border-[color:var(--hairline)] bg-near-black p-10">
      <Eyebrow tone="muted">Not yet open</Eyebrow>
      <p className="mt-4 max-w-[46ch] display-3 text-off-white">
        Self-serve booking opens here shortly.
      </p>
      <p className="mt-4 max-w-[46ch] text-xs text-gray-2">
        Until then the form below is the fastest route - it reaches the founders directly, and we
        reply with times.
      </p>
    </div>
  )
}

/** The link exists but the embed could not load. */
function Fallback({ url }: { url: string }) {
  return (
    <div className="flex min-h-[320px] flex-col items-start justify-center gap-5 rounded-md border border-[color:var(--hairline)] bg-near-black p-10">
      <p className="display-3 text-off-white">The calendar could not load here.</p>
      <p className="max-w-[40ch] text-xs text-gray-2">
        The booking page works on its own, and the form below reaches us just as well.
      </p>
      <Button href={url} variant="solid" arrow>
        Open the booking page
      </Button>
    </div>
  )
}
