'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  amount?: number | 'all' | 'some'
  className?: string
  once?: boolean
}

export default function MotionWrapper({
  children,
  delay = 0,
  direction = 'up',
  amount = 0.2,
  className,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Before hydration: render children fully visible so SSR HTML is not invisible
  if (!mounted) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const yFrom = direction === 'down' ? -24 : direction === 'up' ? 24 : 0
  const xFrom = direction === 'right' ? -32 : direction === 'left' ? 32 : 0

  const hidden = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, y: yFrom, x: xFrom, filter: direction !== 'none' ? 'blur(8px)' : undefined }

  const visible = prefersReduced
    ? { opacity: 1, transition: { duration: 0.3, delay } }
    : {
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden, visible }}
    >
      {children}
    </motion.div>
  )
}
