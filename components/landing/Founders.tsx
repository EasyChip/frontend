'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Founders() {
  const { founders } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
      id="team"
      style={{
        padding: '120px 24px',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease }}
        style={{ marginBottom: 16 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {founders.marker}
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
          {founders.label}
        </span>
      </motion.div>

      <motion.h2
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        style={{
          fontFamily: 'var(--display, var(--sans))',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 200,
          color: 'var(--white)',
          letterSpacing: '-0.02em',
          marginBottom: 12,
        }}
      >
        {founders.headline}
      </motion.h2>

      <motion.p
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: 'var(--gray)',
          fontWeight: 300,
          marginBottom: 56,
          maxWidth: 560,
        }}
      >
        {founders.subtitle}
      </motion.p>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {founders.people.map((person, i) => (
          <motion.div
            key={person.name}
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease }}
            style={{
              flex: '1 1 360px',
              padding: '32px',
              background: 'var(--bg1)',
              borderRadius: 12,
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--bg)',
                }}
              >
                {person.initials}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: 'var(--white)',
                    marginBottom: 2,
                  }}
                >
                  {person.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.7rem',
                    color: 'var(--amber)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {person.role}
                </p>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--gray)',
                fontWeight: 300,
                marginBottom: 20,
              }}
            >
              {person.bio}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: 'var(--gray)',
              }}
            >
              <a
                href={`mailto:${person.email}`}
                style={{ color: 'var(--gray)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray)')}
              >
                {person.email}
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--gray)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray)')}
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
