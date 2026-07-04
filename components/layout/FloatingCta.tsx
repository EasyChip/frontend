'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CTA } from '@/lib/site'

/** Mobile-only floating primary CTA - appears after scrolling past the hero. */
export default function FloatingCta() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-4 bottom-4 z-40 lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={CTA.primary.href}
            className="flex h-12 w-full items-center justify-center rounded-md bg-brand-violet text-base font-medium text-white shadow-[0_8px_32px_rgba(124,8,245,0.45)]"
          >
            {CTA.primary.label}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
