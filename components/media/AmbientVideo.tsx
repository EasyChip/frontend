'use client'

import { useEffect, useRef } from 'react'

interface AmbientVideoProps {
  src: string
  /** Shown before the first frame decodes, and instead of it when motion is off. */
  poster: string
}

/**
 * A silent looping excerpt that starts on its own. Fills its nearest positioned
 * ancestor, so the caller owns the aspect ratio.
 *
 * There is deliberately no `autoplay` attribute. Playback is started from an
 * effect only after `prefers-reduced-motion` has been asked, which makes the
 * reduced-motion branch and the no-JavaScript branch the same branch: both
 * land on the poster, which is a real frame of the demo rather than an empty
 * box. The global `transition-duration: 0.01ms` override in globals.css cannot
 * do this job - it governs transitions, and a playing video is neither a
 * transition nor an animation, so a media query alone would have left the
 * motion running for exactly the people who asked for none.
 *
 * The listener stays mounted rather than reading the query once: a visitor can
 * turn reduced motion on while the page is open, and on that change the loop
 * has to stop, not wait for a reload.
 *
 * `aria-hidden` and `tabIndex={-1}` because the control that wraps this owns
 * the accessible name and the keyboard stop; without it, a screen reader meets
 * an unlabelled media element inside an already-labelled link.
 */
export default function AmbientVideo({ src, poster }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      if (query.matches) {
        el.pause()
        el.currentTime = 0
        return
      }
      // Rejects when the browser blocks playback - iOS low power mode, a
      // per-site autoplay block. The poster is already correct in that case,
      // so there is nothing to recover and nothing to report.
      void el.play().catch(() => {})
    }

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
