'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'


const rows = [
  { label: 'Setup time', traditional: '1–3 days + licenses', easychip: 'Zero — start in browser' },
  { label: 'Cost per seat', traditional: '$50K–$500K/year', easychip: 'Free during beta' },
  { label: 'Verification', traditional: 'Manual testbenches', easychip: 'Automated BMC + simulation' },
  { label: 'Iteration speed', traditional: '3 days per design', easychip: 'Under 30 seconds' },
  { label: 'Expertise required', traditional: 'Years of HDL training', easychip: 'Plain English + intent' },
  { label: 'Customization', traditional: 'Scripting + EDA APIs', easychip: 'Open-weight fine-tuning' },
]

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-14 px-4">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-label text-text-tertiary mb-4">The Difference</p>
          <h2 className="text-display-2 text-text-primary mb-4">
            Traditional EDA vs{' '}
            <span className="text-text-secondary">EasyChip</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Legacy tools weren&apos;t designed for the pace of modern silicon. We were.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-3xl mx-auto">
          {/* Header row */}
          <div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="px-4 py-2" />
              <div
                className="px-4 py-2 rounded-xl text-center text-label text-text-tertiary"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                Traditional EDA
              </div>
              <div
                className="px-4 py-2 rounded-xl text-center text-label"
                style={{
                  color: 'var(--accent-amber)',
                  background: 'rgba(212,168,67,0.06)',
                  border: '1px solid rgba(212,168,67,0.2)',
                }}
              >
                EasyChip
              </div>
            </div>
          </div>

          {/* Data rows */}
          <div ref={ref} className="space-y-2">
            {rows.map((row, i) => (
              <motion.div
                key={row.label}
                className="grid grid-cols-3 gap-3"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]}}
              >
                {/* Label */}
                <div className="flex items-center px-4 py-3.5">
                  <span className="text-sm font-medium text-text-secondary">{row.label}</span>
                </div>

                {/* Traditional */}
                <div
                  className="flex items-center px-4 py-3.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 mr-2" style={{ opacity: 0.3 }}>
                    <path d="M3 3l8 8M11 3L3 11" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-xs text-text-tertiary">{row.traditional}</span>
                </div>

                {/* EasyChip */}
                <div
                  className="flex items-center px-4 py-3.5 rounded-xl"
                  style={{ background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(212,168,67,0.12)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 mr-2">
                    <path d="M2 7l4 4 6-6" stroke="var(--accent-amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs" style={{ color: 'var(--text-accent)' }}>{row.easychip}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-lg text-text-secondary mb-6">
            Ready to leave Synopsys at home?
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
            className="btn-primary"
          >
            Register for Early Access →
          </button>
        </div>
      </div>
    </section>
  )
}
