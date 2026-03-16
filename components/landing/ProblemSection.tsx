'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'

const problems = [
  {
    number: '01',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="rgba(240,237,232,0.3)" strokeWidth="1.5" />
        <path d="M7 10h6M10 7v6" stroke="rgba(240,237,232,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Weeks, not minutes',
    description: 'Even simple designs take days including simulation setup, formal sign-off, and debug loops. Iteration speed is bottlenecked by tool complexity — not engineering intelligence.',
    stat: '~3 days',
    statLabel: 'avg for a simple counter',
  },
  {
    number: '02',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l7 14H3L10 3z" stroke="rgba(240,237,232,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8v4M10 13.5v1" stroke="rgba(240,237,232,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Manual verification fails',
    description: "Human-written testbenches miss corner cases. Formal violations go undetected until tapeout. A single respin costs $1.2M+ — and it&apos;s almost always a verification miss.",
    stat: '$1.2M+',
    statLabel: 'avg cost per respin',
  },
  {
    number: '03',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="rgba(240,237,232,0.3)" strokeWidth="1.5" />
        <path d="M7 10h6M10 7v6" stroke="rgba(240,237,232,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Tools locked behind paywalls',
    description: 'Synopsys, Cadence, and Siemens charge $50K–$500K per seat per year. Open-source alternatives exist but require deep config expertise most teams lack.',
    stat: '$500K/yr',
    statLabel: 'per seat for commercial EDA',
  },
]

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReduced = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.15, delayChildren: 0.1 } },
  }

  const cardVariant = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]} },
      }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-10">
          <p className="text-label text-text-tertiary mb-4">The Problem</p>
          <h2 className="text-display-2 text-text-primary mb-6">
            Writing Verilog is a{' '}
            <span className="text-text-secondary">50-year-old process.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            The hardware design industry is still stuck in 1977. Toolchains haven&apos;t kept up with the pace of silicon demand.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariant}
              className="glass-1 rounded-2xl p-6 border-l-2"
              style={{ borderLeftColor: 'rgba(212,168,67,0.4)' }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-4xl font-black font-mono leading-none text-text-primary" style={{ opacity: 0.06 }}>
                  {p.number}
                </span>
                <div className="mt-1">{p.icon}</div>
              </div>

              <h3 className="text-heading text-text-primary mb-3">{p.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">{p.description}</p>

              <div className="pt-4 border-t border-white/5">
                <span
                  className="text-2xl font-extrabold font-mono"
                  style={{ color: 'var(--accent-amber)' }}
                >
                  {p.stat}
                </span>
                <p className="text-xs text-text-tertiary mt-0.5">{p.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Transition headline */}
        <div className="text-center mt-20 mb-4">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px w-32" style={{ backgroundImage: 'linear-gradient(to right, transparent, rgba(212,168,67,0.4))' }} />
            <div className="h-px w-32" style={{ backgroundImage: 'linear-gradient(to left, transparent, rgba(212,168,67,0.4))' }} />
          </div>
          <p
            className="text-text-primary font-bold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            There&apos;s a better way.
          </p>
        </div>
      </div>
    </section>
  )
}
