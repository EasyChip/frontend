'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const personas = [
  {
    id: 'startup',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Hardware Startups',
    subtitle: 'Building the next big chip without a chip team',
    problem: 'You have the architecture in your head. You lack a 30-person silicon team and a $2M EDA budget.',
    unlock: 'Go from idea to synthesizable RTL — and eventually tape-out — at software speed and software cost.',
    tag: 'FPGA · ASIC · SoC',
  },
  {
    id: 'ai',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'AI Companies',
    subtitle: 'Outgrowing GPUs, building custom silicon',
    problem: 'Your models need a custom inference accelerator. The traditional path is 18 months and a team you don\'t have.',
    unlock: 'Describe your compute requirements in plain language. Get a hardware implementation that actually fits the model.',
    tag: 'Inference · Accelerators · Edge AI',
  },
  {
    id: 'university',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 6V10C18 14 14.5 17.5 10 18C5.5 17.5 2 14 2 10V6L10 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'University Research',
    subtitle: 'Novel architectures deserve real silicon',
    problem: 'You have a novel computer architecture. You\'re stuck in simulation because taping out costs more than your grant.',
    unlock: 'Take your research from HDL to real silicon on open PDKs. Close the loop between theory and fabrication.',
    tag: 'Architecture · Neuromorphic · RISC-V',
  },
  {
    id: 'enterprise',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    title: 'Fabless Teams',
    subtitle: 'A force multiplier for your existing design team',
    problem: 'Your team already has Cadence and Synopsys. But 60% of your design cycle is iteration, not creation.',
    unlock: 'AI-generated first-pass designs your engineers review and refine — not create from scratch. Cut your cycle in half.',
    tag: 'Enterprise · Fabless · VLSI',
  },
]

export default function PersonaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReduced = useReducedMotion()

  const cardVariant = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
      }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-14">
          <p className="text-label text-text-tertiary mb-4">Who It&apos;s For</p>
          <h2 className="text-display-2 text-text-primary mb-5">
            Built for everyone
            <br />
            <span className="text-text-secondary">locked out of silicon.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Chip design has always been reserved for the well-funded and the expert. We&apos;re ending that.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1 } } }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {personas.map((p) => (
            <motion.div
              key={p.id}
              variants={cardVariant}
              className="glass-1 rounded-2xl p-8 border border-white/8 hover:border-white/14 transition-colors duration-300 flex flex-col"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                style={{
                  background: 'rgba(212,168,67,0.08)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  color: 'var(--accent-amber)',
                }}
              >
                {p.icon}
              </div>

              {/* Tag */}
              <p className="text-label text-text-tertiary mb-3">{p.tag}</p>

              {/* Title */}
              <h3 className="text-heading text-text-primary mb-1">{p.title}</h3>
              <p className="text-sm text-text-secondary mb-5">{p.subtitle}</p>

              {/* Problem */}
              <div className="flex-1 space-y-3">
                <div className="flex gap-3">
                  <div className="w-1 flex-shrink-0 rounded-full mt-1" style={{ background: 'rgba(240,237,232,0.15)', minHeight: 16 }} />
                  <p className="text-sm text-text-secondary leading-relaxed">{p.problem}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 flex-shrink-0 rounded-full mt-1" style={{ background: 'rgba(212,168,67,0.5)', minHeight: 16 }} />
                  <p className="text-sm text-text-primary leading-relaxed">{p.unlock}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.5 }}
        >
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-amber)' }}
          >
            See all use cases in depth
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
