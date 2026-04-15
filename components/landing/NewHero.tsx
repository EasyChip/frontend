'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'
import SiliconTrace from './SiliconTrace'
import { useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function TypedTagline({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(text)
      setShowCursor(false)
      return
    }

    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setTimeout(() => setShowCursor(false), 1500)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [text, prefersReduced])

  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', color: 'var(--amber)', letterSpacing: '0.05em' }}>
      {displayed}
      {showCursor && <span className="animate-blink" style={{ color: 'var(--amber)' }}>▌</span>}
    </span>
  )
}

export default function NewHero() {
  const { hero } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  const handleWaitlist = () => {
    window.dispatchEvent(new CustomEvent('ec:openWaitlist'))
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        paddingTop: 80,
      }}
    >
      <SiliconTrace />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--amber)',
            marginBottom: 32,
          }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          style={{
            fontFamily: 'var(--display, var(--sans))',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--white)',
            fontWeight: 200,
            marginBottom: 24,
          }}
        >
          {hero.headline.before}{' '}
          <span style={{ fontWeight: 600 }}>{hero.headline.emphasis}</span>{' '}
          {hero.headline.after}
        </motion.h1>

        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            lineHeight: 1.7,
            color: 'var(--gray)',
            maxWidth: 640,
            margin: '0 auto 40px',
            fontWeight: 300,
          }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}
        >
          <button className="btn-primary" onClick={handleWaitlist}>
            {hero.primaryCta}
          </button>
          <a className="btn-ghost" href={hero.scrollTo}>
            {hero.secondaryCta}
          </a>
        </motion.div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease }}
        >
          <TypedTagline text={hero.tagline} />
        </motion.div>
      </div>

      {/* Gradient fade at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(transparent, var(--bg))',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
