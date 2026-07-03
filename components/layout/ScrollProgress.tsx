'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/** 2px prism hairline under the navbar tracking page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.4 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
      style={{
        scaleX: reduce ? scrollYProgress : scaleX,
        backgroundImage: 'var(--gradient-brand)',
      }}
    />
  )
}
