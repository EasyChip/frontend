'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function PathColumn({
  data,
  side,
  shouldAnimate,
}: {
  data: typeof content.twoPaths.left
  side: 'left' | 'right'
  shouldAnimate: boolean
}) {
  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, x: side === 'left' ? -40 : 40 } : false}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease }}
      style={{
        flex: 1,
        minWidth: 280,
        padding: '40px 32px',
        background: 'var(--bg1)',
        borderRadius: 12,
        border: '1px solid var(--border)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '2.5rem',
          fontWeight: 200,
          color: 'var(--amber)',
          opacity: 0.3,
          display: 'block',
          marginBottom: 16,
        }}
      >
        {data.number}
      </span>
      <h3
        style={{
          fontFamily: 'var(--display, var(--sans))',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 600,
          color: 'var(--white)',
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}
      >
        {data.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '1rem',
          lineHeight: 1.7,
          color: 'var(--gray)',
          fontWeight: 300,
          marginBottom: 24,
        }}
      >
        {data.description}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {data.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              color: 'var(--gray)',
              padding: '8px 0',
              borderTop: '1px solid var(--border)',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ color: 'var(--amber)', marginRight: 8 }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function TwoPaths() {
  const { twoPaths } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
      id="how-it-works"
      style={{
        padding: '120px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {twoPaths.marker}
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
          {twoPaths.label}
        </span>
      </motion.div>

      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        <PathColumn data={twoPaths.left} side="left" shouldAnimate={shouldAnimate} />

        {/* Amber divider line (desktop only) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '15%',
            bottom: '15%',
            width: 1,
            background: 'linear-gradient(transparent, var(--amber), transparent)',
            opacity: 0.3,
          }}
          aria-hidden="true"
        />

        <PathColumn data={twoPaths.right} side="right" shouldAnimate={shouldAnimate} />
      </div>

      {/* Merge line */}
      <motion.div
        initial={shouldAnimate ? { scaleX: 0 } : false}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, delay: 0.3, ease }}
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--amber), transparent)',
          marginTop: 64,
          transformOrigin: 'center',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
