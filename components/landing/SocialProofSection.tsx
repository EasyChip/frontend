'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import MotionWrapper from '@/components/shared/MotionWrapper'

const LOGOS = [
  'Arm Research', 'SiFive', 'Cerebras', 'Tenstorrent', 'Groq', 'Esperanto',
  'Arm Research', 'SiFive', 'Cerebras', 'Tenstorrent', 'Groq', 'Esperanto',
]

const TESTIMONIALS = [
  {
    quote: "EasyChip cut our prototype-to-simulation loop from 3 days to 20 minutes. It's the first tool that actually understands what I mean when I describe hardware in plain terms.",
    name: 'Senior RTL Engineer',
    role: 'Semiconductor Startup',
    initials: 'SR',
  },
  {
    quote: "Formal verification built in by default changes everything. We caught a timing corner case on a first-pass that would have been a $800K respin catch on our old flow.",
    name: 'Chip Architect',
    role: 'Deep Learning Silicon',
    initials: 'CA',
  },
  {
    quote: "As a verification engineer, I expected to hate it. Instead I'm using it to rapid-prototype coverage models. The BMC integration is legitimately good.",
    name: 'Verification Engineer',
    role: 'RISC-V Core Team',
    initials: 'VE',
  },
]

export default function SocialProofSection() {
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
    <section className="py-14 px-4 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-label text-text-tertiary mb-4">Early Adopters</p>
          <h2 className="text-display-2 text-text-primary mb-4">
            Engineers who&apos;ve{' '}
            <span className="text-text-secondary">shipped with EasyChip</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            From scrappy startups to deep-tech research labs — the people building tomorrow&apos;s silicon are on our waitlist.
          </p>
        </div>

        {/* Logo marquee */}
        <MotionWrapper delay={0.1} className="mb-10 overflow-hidden">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />

            <div className="flex animate-marquee gap-14 w-max">
              {LOGOS.map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <div
                    className="w-5 h-5 rounded-md flex-shrink-0 glass-2"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <span className="text-sm font-medium text-text-tertiary tracking-wide">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Testimonials */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={cardVariant}>
              <div className="glass-1 rounded-2xl p-6 h-full flex flex-col border border-white/8 hover:border-white/14 transition-colors duration-300">
                {/* Quote marks */}
                <div
                  className="text-4xl font-serif leading-none mb-4 -mt-1"
                  style={{ color: 'var(--accent-amber)', opacity: 0.5 }}
                >
                  &ldquo;
                </div>

                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-text-primary flex-shrink-0 glass-2"
                    style={{ border: '1px solid rgba(212,168,67,0.2)' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-tertiary">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
