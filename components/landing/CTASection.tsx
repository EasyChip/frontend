'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface Props {
  onOpenWaitlist?: () => void
}

export default function CTASection({ onOpenWaitlist }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [-30, 30])

  return (
    <section ref={ref} className="relative overflow-hidden py-0" id="cta">
      <div
        className="relative px-4 py-20 text-center"
        style={{ background: 'var(--bg-raised)' }}
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

        {/* Amber glow at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(212,168,67,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Ghost text behind CTA */}
        <motion.div
          className="cta-ghost-text absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ y: ghostY }}
          aria-hidden="true"
        >
          SILICON
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-label text-text-tertiary mb-6">Get Started</p>

          <h2 className="text-display-1 text-text-primary mb-6 leading-[1.0]">
            Ready to design your
            <br />
            first chip?
          </h2>

          <p className="text-xl text-text-secondary mb-3 max-w-md mx-auto leading-relaxed">
            Ship synthesizable RTL without writing a single line of Verilog.
          </p>
          <p className="text-sm text-text-tertiary mb-10">
            Spots are limited — early access opens in batches.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onOpenWaitlist} className="btn-primary">
              Join the waitlist →
            </button>
            <a href="/playground" className="btn-ghost">
              Try the demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
