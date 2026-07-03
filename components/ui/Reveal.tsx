'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Stagger order within a group */
  delay?: number
  className?: string
}

/**
 * "Deposit" reveal: fade + 12px rise + blur-settle (DESIGN §8).
 * Honors prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
