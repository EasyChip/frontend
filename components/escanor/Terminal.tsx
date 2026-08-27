'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Illustrative Escanor session - clearly labeled, no real tool output.
 * Types once when scrolled into view; renders instantly for reduced motion.
 */

type Line = { text: string; kind: 'cmd' | 'ok' | 'run' | 'note' }

const SCRIPT: Line[] = [
  { text: '$ escanor run lint --local', kind: 'cmd' },
  { text: '✓ analysis complete - results on this machine only', kind: 'ok' },
  { text: '$ escanor flow tapeout.fb', kind: 'cmd' },
  { text: '▸ synth ✓   timing ✓   power-intent ✓   drc …', kind: 'run' },
  { text: '0 bytes left this network.', kind: 'note' },
]

const lineClass: Record<Line['kind'], string> = {
  cmd: 'text-ink',
  ok: 'text-success',
  run: 'text-ink-2',
  note: 'text-brand-cyan',
}

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0) // total chars revealed

  const totalChars = SCRIPT.reduce((n, l) => n + l.text.length, 0)

  useEffect(() => {
    if (!inView || reduce) return
    if (progress >= totalChars) return
    const t = setTimeout(() => setProgress((p) => p + 1), 28)
    return () => clearTimeout(t)
  }, [inView, progress, reduce, totalChars])

  const done = reduce ? totalChars : progress
  let used = 0

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-hair bg-[#060913] shadow-[0_24px_80px_-32px_rgba(78,85,252,0.35)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-magenta/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-violet/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan/70" />
        <span className="eyebrow ml-3 text-xs text-ink-3">escanor - local session</span>
      </div>
      <div className="min-h-[190px] px-5 py-4 font-mono text-sm leading-7">
        {SCRIPT.map((line, i) => {
          const start = used
          used += line.text.length
          const visible = Math.max(0, Math.min(line.text.length, done - start))
          if (visible === 0 && !(reduce || inView)) return null
          const isTyping = visible > 0 && visible < line.text.length
          if (visible === 0) return null
          return (
            <p key={i} className={lineClass[line.kind]}>
              {line.text.slice(0, visible)}
              {isTyping && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-brand-cyan"
                  style={{ animation: 'caret-blink 1s step-end infinite' }}
                />
              )}
            </p>
          )
        })}
        {done >= totalChars && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-brand-cyan"
            style={{ animation: 'caret-blink 1s step-end infinite' }}
          />
        )}
      </div>
      <p className="border-t border-hair px-5 py-2.5 text-xs text-ink-3">
        Illustrative session - not actual tool output.
      </p>
    </div>
  )
}
