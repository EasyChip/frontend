'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/**
 * 2px hairline under the navbar tracking page scroll.
 * Solid cyan, not the prism gradient: sitewide chrome must not spend the
 * once-per-view gradient before a page has drawn anything.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.4 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand-cyan"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  )
}
