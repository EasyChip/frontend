'use client'

import { cn } from '@/lib/utils'

interface Props {
  color?: string
  size?: string
  className?: string
  animate?: boolean
  opacity?: number
}

export default function GlowOrb({
  color = 'rgba(91,106,240,0.25)',
  size = '600px',
  className,
  animate = false,
  opacity = 1,
}: Props) {
  return (
    <div
      className={cn(
        'absolute rounded-full pointer-events-none',
        animate && 'animate-glow-pulse',
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        opacity,
      }}
    />
  )
}
