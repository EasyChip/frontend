'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const stages = [
  {
    id: 'rtl',
    step: '01',
    label: 'RTL Generation',
    desc: 'Synthesizable Verilog from a plain English description.',
    status: 'done',
  },
  {
    id: 'verify',
    step: '02',
    label: 'Formal Verification',
    desc: 'Automated bounded model checking and simulation until correct.',
    status: 'done',
  },
  {
    id: 'train',
    step: '03',
    label: 'Production Model',
    desc: 'Full-corpus training for real-world complex designs.',
    status: 'active',
  },
  {
    id: 'api',
    step: '04',
    label: 'Cloud API',
    desc: 'Hosted, scalable, metered access for teams and pipelines.',
    status: 'planned',
  },
  {
    id: 'synth',
    step: '05',
    label: 'Logic Synthesis',
    desc: 'RTL compiled down to a technology-mapped gate-level netlist.',
    status: 'planned',
  },
  {
    id: 'pr',
    step: '06',
    label: 'Place & Route',
    desc: 'Physical placement and wiring of standard cells on die.',
    status: 'planned',
  },
  {
    id: 'timing',
    step: '07',
    label: 'Timing Closure',
    desc: 'Post-layout timing sign-off without manual ECO iterations.',
    status: 'planned',
  },
  {
    id: 'drc',
    step: '08',
    label: 'Physical Verification',
    desc: 'DRC/LVS clean — no manual violation resolution.',
    status: 'planned',
  },
  {
    id: 'pdk',
    step: '09',
    label: 'PDK Integration',
    desc: 'Foundry-native targets: SkyWater, GlobalFoundries, TSMC.',
    status: 'planned',
  },
  {
    id: 'gdsii',
    step: '10',
    label: 'Full RTL → GDSII',
    desc: 'Natural language to a manufacturable tape-out package.',
    status: 'end',
  },
]

type StageStatus = 'done' | 'active' | 'planned' | 'end'

const statusConfig: Record<StageStatus, {
  badge: string
  badgeBg: string
  border: string
  bg: string
  stepColor: string
  titleColor: string
}> = {
  done: {
    badge: 'Complete',
    badgeBg: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20',
    border: 'border-emerald-400/15',
    bg: 'bg-emerald-400/[0.025]',
    stepColor: 'text-emerald-400/60',
    titleColor: 'text-text-primary',
  },
  active: {
    badge: 'In Progress',
    badgeBg: 'bg-amber-400/10 text-amber-400 border border-amber-400/25',
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/[0.04]',
    stepColor: 'text-amber-400/70',
    titleColor: 'text-text-primary',
  },
  planned: {
    badge: 'Planned',
    badgeBg: 'bg-white/5 text-text-tertiary border border-white/10',
    border: 'border-white/8',
    bg: 'bg-white/[0.015]',
    stepColor: 'text-white/20',
    titleColor: 'text-text-secondary/60',
  },
  end: {
    badge: 'End Goal',
    badgeBg: 'bg-amber-400/12 text-amber-400 border border-amber-400/30',
    border: 'border-amber-400/35',
    bg: 'bg-amber-400/[0.05]',
    stepColor: 'text-amber-400/80',
    titleColor: 'text-text-primary',
  },
}

const doneCount = stages.filter(s => s.status === 'done').length

export default function SiliconJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(212,168,67,0.05) 0%, transparent 65%)' }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-label text-text-tertiary mb-4">The Vision</p>
          <h2 className="text-display-2 text-text-primary mb-5">
            RTL is just
            <br />
            <span className="text-text-secondary">the beginning.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            We&apos;re building the full stack — from your first prompt to a manufacturable chip file.
            No EDA licenses. No manual toolchains. No silicon team required.
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto mb-16">
          <div className="flex justify-between text-xs text-text-tertiary mb-2">
            <span>{doneCount} of {stages.length} stages complete</span>
            <span style={{ color: 'var(--accent-amber)' }}>Live now →</span>
          </div>
          <div className="h-1 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #d4a843, #f0c060)' }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(doneCount / stages.length) * 100}%` } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Grid: 5 cols × 2 rows */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          {stages.map((stage, i) => {
            const cfg = statusConfig[stage.status as StageStatus]
            const isActive = stage.status === 'active'
            const isEnd = stage.status === 'end'

            return (
              <motion.div
                key={stage.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all ${cfg.border} ${cfg.bg} ${
                  isEnd ? 'lg:col-span-1' : ''
                }`}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: prefersReduced ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Active pulse ring */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: '0 0 0 1px rgba(212,168,67,0.15), 0 4px 24px rgba(212,168,67,0.08)' }}
                  />
                )}
                {isEnd && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: '0 0 0 1px rgba(212,168,67,0.2), 0 8px 32px rgba(212,168,67,0.1)' }}
                  />
                )}

                {/* Step number */}
                <p className={`text-xs font-mono font-bold tracking-widest mb-3 ${cfg.stepColor}`}>
                  {stage.step}
                </p>

                {/* Status badge */}
                <span className={`self-start text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full mb-4 ${cfg.badgeBg} ${
                  isActive ? 'animate-pulse' : ''
                }`}>
                  {cfg.badge}
                </span>

                {/* Title */}
                <h3 className={`text-sm font-semibold leading-snug mb-2 ${cfg.titleColor}`}>
                  {stage.label}
                </h3>

                {/* Description */}
                <p className={`text-xs leading-relaxed mt-auto pt-2 ${
                  stage.status === 'planned' ? 'text-text-tertiary/60' : 'text-text-tertiary'
                }`}>
                  {stage.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.7 }}
        >
          <p className="text-text-tertiary text-sm mb-5">
            We&apos;re live with RTL. The rest of the stack is in motion.
          </p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-amber)' }}
          >
            See the full roadmap
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
