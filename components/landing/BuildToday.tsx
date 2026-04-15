'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function ToolCard({
  tool,
  index,
  shouldAnimate,
}: {
  tool: (typeof content.buildToday.tools)[0]
  index: number
  shouldAnimate: boolean
}) {
  const isComingSoon = !tool.href
  const handleClick = () => {
    if (isComingSoon) {
      window.dispatchEvent(new CustomEvent('ec:openWaitlist'))
    }
  }

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease }}
      style={{
        flex: '1 1 300px',
        padding: '32px',
        background: 'var(--bg1)',
        borderRadius: 12,
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'border-color 0.3s ease',
      }}
      whileHover={{ borderColor: 'var(--amber)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3
          style={{
            fontFamily: 'var(--display, var(--sans))',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
          }}
        >
          {tool.name}
        </h3>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: tool.badge === 'Open Source' ? 'var(--green)' : 'var(--amber)',
            border: `1px solid ${tool.badge === 'Open Source' ? 'var(--green)' : 'var(--amber)'}`,
            padding: '4px 10px',
            borderRadius: 4,
            opacity: 0.8,
          }}
        >
          {tool.badge}
        </span>
      </div>

      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '1.05rem',
          fontWeight: 400,
          color: 'var(--white)',
          lineHeight: 1.4,
        }}
      >
        {tool.tagline}
      </p>

      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.9rem',
          fontWeight: 300,
          color: 'var(--gray)',
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {tool.description}
      </p>

      {isComingSoon ? (
        <button
          className="btn-ghost"
          onClick={handleClick}
          style={{ alignSelf: 'flex-start', marginTop: 8 }}
        >
          {tool.cta}
        </button>
      ) : (
        <a
          href={tool.href}
          className="btn-ghost"
          style={{ alignSelf: 'flex-start', marginTop: 8, textDecoration: 'none' }}
        >
          {tool.cta}
        </a>
      )}
    </motion.div>
  )
}

export default function BuildToday() {
  const { buildToday } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
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
        style={{ marginBottom: 56 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {buildToday.marker}
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
          {buildToday.label}
        </span>
      </motion.div>

      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {buildToday.tools.map((tool, i) => (
          <ToolCard key={tool.name} tool={tool} index={i} shouldAnimate={shouldAnimate} />
        ))}
      </div>
    </section>
  )
}
