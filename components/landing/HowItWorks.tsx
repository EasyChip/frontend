'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Describe',
    description: 'Type your hardware specification as a prompt — no HDL knowledge required.',
    example: '"Design a 4-bit synchronous up-counter with active-low reset and clock enable."',
    tag: 'Prompt',
  },
  {
    number: '02',
    title: 'Generate',
    description: "EasyChip's multi-agent pipeline architects, generates, and refines synthesizable Verilog RTL and a self-checking testbench.",
    example: '✓ RTL + testbench generated in < 30 seconds.',
    tag: 'AI Pipeline',
  },
  {
    number: '03',
    title: 'Verify',
    description: 'Simulation, formal BMC verification, and synthesis checks run automatically. Bugs are fixed in an agentic loop.',
    example: '✓ PASS — 1 attempt · formal verified · ready to synthesize.',
    tag: 'Auto-Verified',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReduced = useReducedMotion()

  return (
    <section id="how-it-works" className="py-14 px-4">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-label text-text-tertiary mb-4">How It Works</p>
          <h2 className="text-display-2 text-text-primary mb-4">
            From description to silicon
            <br />
            <span className="text-text-secondary">in three steps</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            No Verilog expertise required. EasyChip handles the full design pipeline from your prompt to verified RTL.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px overflow-hidden">
            <motion.div
              className="h-full rounded-full origin-left"
              style={{ background: 'rgba(255,255,255,0.12)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: prefersReduced ? 0 : 1.2, delay: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]}}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="glass-1 p-7 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]}}
            >
              {/* Step number + tag */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-6xl font-black font-mono leading-none text-text-primary" style={{ opacity: 0.06 }}>
                  {step.number}
                </span>
                <span
                  className="text-label px-2.5 py-1 rounded-full border mt-1"
                  style={{
                    color: 'var(--accent-amber)',
                    background: 'rgba(212,168,67,0.08)',
                    borderColor: 'rgba(212,168,67,0.2)',
                  }}
                >
                  {step.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-5 text-sm">{step.description}</p>

              <div className="bg-bg-void/60 border border-white/5 rounded-lg px-4 py-3">
                <p className="text-xs font-mono text-emerald-400 leading-relaxed italic">{step.example}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
