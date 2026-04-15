'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'
import { useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function TerminalDemo() {
  const { imagineTomorrow } = content
  const prefersReduced = useReducedMotion()
  const [phase, setPhase] = useState(0) // 0=idle, 1=prompt typing, 2=output, 3=status
  const [promptText, setPromptText] = useState('')
  const [visibleLines, setVisibleLines] = useState(0)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    if (prefersReduced) {
      setPromptText(imagineTomorrow.prompt)
      setVisibleLines(imagineTomorrow.outputLines.length)
      setShowStatus(true)
      return
    }

    // Phase 1: type prompt
    const startDelay = setTimeout(() => {
      setPhase(1)
      let i = 0
      const typeTimer = setInterval(() => {
        i++
        setPromptText(imagineTomorrow.prompt.slice(0, i))
        if (i >= imagineTomorrow.prompt.length) {
          clearInterval(typeTimer)
          // Phase 2: output lines
          setTimeout(() => {
            setPhase(2)
            let line = 0
            const lineTimer = setInterval(() => {
              line++
              setVisibleLines(line)
              if (line >= imagineTomorrow.outputLines.length) {
                clearInterval(lineTimer)
                // Phase 3: status
                setTimeout(() => {
                  setPhase(3)
                  setShowStatus(true)
                }, 400)
              }
            }, 120)
          }, 600)
        }
      }, 25)
    }, 800)

    return () => clearTimeout(startDelay)
  }, [imagineTomorrow, prefersReduced])

  return (
    <div
      style={{
        background: '#0D0D0D',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        fontFamily: 'var(--mono)',
        fontSize: '0.8rem',
        lineHeight: 1.7,
        maxWidth: 640,
        margin: '0 auto',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
        <span style={{ marginLeft: 12, color: 'var(--gray)', fontSize: '0.7rem' }}>easychip</span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '20px 16px' }}>
        {/* Prompt */}
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'var(--amber)' }}>→ </span>
          <span style={{ color: 'var(--gray)' }}>{promptText}</span>
          {phase === 1 && <span className="animate-blink" style={{ color: 'var(--amber)' }}>▌</span>}
        </div>

        {/* Output */}
        {visibleLines > 0 && (
          <div style={{ marginBottom: 16, color: '#666' }}>
            {imagineTomorrow.outputLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{ color: 'var(--gray)', opacity: 0.7 }}>{line}</div>
            ))}
          </div>
        )}

        {/* Status */}
        {showStatus && (
          <div
            style={{
              color: 'var(--green)',
              borderTop: '1px solid var(--border)',
              paddingTop: 12,
              fontSize: '0.75rem',
            }}
          >
            ✓ {imagineTomorrow.statusLine}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ImagineTomorrow() {
  const { imagineTomorrow } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
      style={{
        padding: '120px 24px',
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: 24 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {imagineTomorrow.marker}
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
          {imagineTomorrow.label}
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
          textAlign: 'center',
          marginBottom: 56,
          letterSpacing: '-0.02em',
        }}
      >
        {imagineTomorrow.description}
      </motion.h2>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        <TerminalDemo />
      </motion.div>

      <motion.p
        initial={shouldAnimate ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.8rem',
          color: 'var(--gray)',
          textAlign: 'center',
          marginTop: 32,
          fontStyle: 'italic',
        }}
      >
        {imagineTomorrow.note}
      </motion.p>
    </section>
  )
}
