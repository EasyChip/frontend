'use client'

import { useRef, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

/**
 * "Probe" surface: cursor-tracking spotlight + orbiting border-beam on hover.
 * Pure CSS driven by --spot-x/--spot-y; zero re-renders on pointermove.
 */
export default function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn('border-beam spotlight group/glow relative rounded-lg', className)}
    >
      {children}
    </div>
  )
}
