'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Horizon() {
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
      style={{
        padding: '160px 24px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: 400,
      }}
    >
      {/* The amber horizon line */}
      <motion.div
        initial={shouldAnimate ? { scaleX: 0, opacity: 0 } : false}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease }}
        style={{
          width: '80%',
          maxWidth: 600,
          height: 1,
          background: 'var(--amber)',
          marginBottom: 48,
          transformOrigin: 'center',
        }}
        aria-hidden="true"
      />

      <motion.p
        initial={shouldAnimate ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, delay: 0.5, ease }}
        style={{
          fontFamily: 'var(--display, var(--sans))',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.01em',
          textAlign: 'center',
        }}
      >
        {content.horizon.line}
      </motion.p>
    </section>
  )
}
