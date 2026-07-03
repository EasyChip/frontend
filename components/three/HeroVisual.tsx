'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useInView, useReducedMotion } from 'framer-motion'

/** Static poster — SSR placeholder, reduced-motion and WebGL-failure fallback. */
function Poster() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(78,85,252,0.28) 0%, rgba(0,229,238,0.12) 45%, transparent 75%)',
        }}
      />
      <Image
        src="/brand/logo.png"
        alt=""
        width={480}
        height={320}
        priority
        className="relative w-2/3 max-w-sm opacity-95 drop-shadow-[0_0_60px_rgba(78,85,252,0.45)]"
      />
    </div>
  )
}

const PrismDie = dynamic(() => import('@/components/three/PrismDie'), {
  ssr: false,
  loading: () => <Poster />,
})

/**
 * Lazy WebGL mount: renders the poster until in view, pauses the frameloop
 * when scrolled away or the tab is hidden, and never loads three.js for
 * reduced-motion users.
 */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '200px' })
  const reduce = useReducedMotion()
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div ref={ref} className="relative h-full w-full" aria-hidden>
      {reduce ? <Poster /> : <PrismDie active={inView && tabVisible} />}
      {/* soft edge fade into the void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-void) 0%, transparent 14%, transparent 82%, var(--color-void) 100%), linear-gradient(to right, var(--color-void) 0%, transparent 12%, transparent 88%, var(--color-void) 100%)',
        }}
      />
    </div>
  )
}
