'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { content } from '@/lib/content'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function FinalCTA() {
  const { finalCta } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  const handleWaitlist = () => {
    window.dispatchEvent(new CustomEvent('ec:openWaitlist'))
  }

  return (
    <section
      id="contact"
      style={{
        padding: '120px 24px',
        textAlign: 'center',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <motion.h2
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease }}
        style={{
          fontFamily: 'var(--display, var(--sans))',
          fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          fontWeight: 200,
          color: 'var(--white)',
          letterSpacing: '-0.03em',
          marginBottom: 16,
        }}
      >
        {finalCta.headline}
      </motion.h2>

      <motion.p
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: 'var(--gray)',
          fontWeight: 300,
          marginBottom: 40,
        }}
      >
        {finalCta.sub}
      </motion.p>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <button className="btn-primary" onClick={handleWaitlist}>
          {finalCta.primaryCta}
        </button>
        <a className="btn-ghost" href={finalCta.secondaryHref} style={{ textDecoration: 'none' }}>
          {finalCta.secondaryCta}
        </a>
      </motion.div>
    </section>
  )
}
