'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const tailwinds = [
  {
    id: 'llm',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'LLMs finally understand hardware',
    body: 'Code-specialized language models can now generate structurally valid, synthesizable Verilog for most common hardware patterns. This was not possible at sufficient quality before 2023. The capability threshold was just crossed.',
    tag: 'AI CAPABILITY',
  },
  {
    id: 'oss',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    title: 'Open-source EDA reached production quality',
    body: 'The full RTL-to-GDSII toolchain — simulation, formal verification, synthesis, place & route, physical verification — is now available open-source. We can build the AI layer without acquiring $10M in EDA licenses.',
    tag: 'EDA MATURITY',
  },
  {
    id: 'silicon',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2.5 5.5H19l-4.5 3.5 2 6L11 13.5 5.5 17l2-6L3 7.5h5.5L11 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Custom silicon demand is exploding',
    body: 'Every major AI company is building custom chips. The demand for chip design talent exceeds supply by a wide margin. Organizations are willing to pay for automation because the alternative is years of waiting for scarce expertise.',
    tag: 'MARKET PULL',
  },
]

export default function WhyNow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Top divider glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

      <div className="section-container relative z-10">
        <div className="text-center mb-14">
          <p className="text-label text-text-tertiary mb-4">Why Now</p>
          <h2 className="text-display-2 text-text-primary mb-5">
            Three forces converging
            <br />
            <span className="text-text-secondary">at the same moment.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            EasyChip is only possible because of what happened in the last two years.
            The window to build this is open — and it won&apos;t stay open forever.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {tailwinds.map((t, i) => (
            <motion.div
              key={t.id}
              className="glass-1 rounded-2xl p-8 border border-white/8 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: prefersReduced ? 0 : i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tag */}
              <p className="text-label text-text-tertiary mb-4">{t.tag}</p>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: 'rgba(212,168,67,0.07)',
                  border: '1px solid rgba(212,168,67,0.18)',
                  color: 'var(--accent-amber)',
                }}
              >
                {t.icon}
              </div>

              <h3 className="text-heading text-text-primary mb-3">{t.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{t.body}</p>

              {/* Bottom accent line */}
              <div
                className="mt-6 h-px w-12 rounded-full"
                style={{ background: 'rgba(212,168,67,0.4)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
