'use client'

import { useEffect, useRef } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf: number

    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })
      lenisRef.current = lenis

      function animate(time: number) {
        lenis.raf(time)
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenisRef.current?.destroy()
    }
  }, [])

  return <>{children}</>
}
