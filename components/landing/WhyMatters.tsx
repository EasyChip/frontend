'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function WhyMatters() {
  const { whyMatters } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
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
        style={{ marginBottom: 64 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {whyMatters.marker}
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
          {whyMatters.label}
        </span>
      </motion.div>

      {whyMatters.reasons.map((reason, i) => (
        <motion.div
          key={i}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease }}
          style={{ marginBottom: i < whyMatters.reasons.length - 1 ? 56 : 0 }}
        >
          <blockquote
            style={{
              fontFamily: 'var(--display, var(--sans))',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
              fontWeight: 400,
              color: 'var(--amber)',
              fontStyle: 'italic',
              margin: '0 0 16px 0',
              paddingLeft: 20,
              borderLeft: '2px solid var(--amber)',
              lineHeight: 1.4,
            }}
          >
            {reason.quote}
          </blockquote>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--gray)',
              fontWeight: 300,
              paddingLeft: 22,
            }}
          >
            {reason.body}
          </p>
        </motion.div>
      ))}
    </section>
  )
}
