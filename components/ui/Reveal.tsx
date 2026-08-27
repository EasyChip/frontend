import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  /** Stagger order within a group */
  delay?: number
  className?: string
}

/**
 * "Deposit" reveal: fade + rise + blur-settle as the block scrolls in.
 *
 * CSS-only and server-rendered. It used to be a framer-motion client component
 * whose `initial` state shipped `opacity: 0` into the server HTML - so every
 * section it wrapped was invisible until hydration, and stayed invisible if JS
 * never ran. The declared state is now the finished state; the animation is a
 * progressive enhancement that only exists where scroll-linked timelines are
 * supported and the visitor has not asked for reduced motion.
 *
 * This also takes a client component off every page that used it.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <div
      className={cn('reveal-on-view', className)}
      style={delay ? ({ '--reveal-offset': `${Math.min(delay * 60, 30)}%` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
