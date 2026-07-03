'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  /** Display value, e.g. "51", "9", "100%", "5" - numeric prefix animates, suffix rides along */
  value: string
  className?: string
  durationMs?: number
}

/** Mono count-up with settle - runs once when scrolled into view. */
export default function CountUp({ value, className, durationMs = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  const [display, setDisplay] = useState(target === null || reduce ? value : `0${suffix}`)

  useEffect(() => {
    if (target === null || reduce) {
      setDisplay(value)
      return
    }
    if (!inView) return

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(`${Math.round(eased * target)}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, suffix, value, durationMs, reduce])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
