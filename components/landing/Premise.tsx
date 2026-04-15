'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Premise() {
  const { premise } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
      id="problem"
      style={{
        padding: '120px 24px',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease }}
        style={{ marginBottom: 48 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {premise.marker}
        </span>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--gray)',
            letterSpacing: '0.1em',
            marginLeft: 12,
            textTransform: 'uppercase',
          }}
        >
          {premise.label}
        </span>
      </motion.div>

      {premise.paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: i * 0.12, ease }}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
            lineHeight: 1.8,
            color: i === premise.paragraphs.length - 1 ? 'var(--amber)' : 'var(--gray)',
            fontWeight: i === premise.paragraphs.length - 1 ? 400 : 300,
            fontStyle: i === premise.paragraphs.length - 1 ? 'italic' : 'normal',
            marginBottom: 28,
          }}
        >
          {p}
        </motion.p>
      ))}
    </section>
  )
}
