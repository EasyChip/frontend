'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Subtle inertial scroll (Lenis, low lerp). Disabled for reduced-motion users. */
export default function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    let raf = 0
    let destroyed = false
    let cleanup: (() => void) | undefined

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return
      const lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      })
      const loop = (time: number) => {
        lenis.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      cleanup = () => {
        cancelAnimationFrame(raf)
        lenis.destroy()
      }
    })

    return () => {
      destroyed = true
      cleanup?.()
    }
  }, [reduce])

  return null
}
