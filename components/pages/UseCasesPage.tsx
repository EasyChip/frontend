'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { NavBar } from '@/components/ui/tubelight-navbar'
import Footer from '@/components/layout/Footer'
import { Workflow, Layers, Telescope, Map, Users, BookOpen } from 'lucide-react'

function openWaitlist() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ec:openWaitlist'))
  }
}

const NAV_ITEMS = [
  { name: 'How it works', url: '/#how-it-works', icon: Workflow  },
  { name: 'Features',     url: '/#features',     icon: Layers    },
  { name: 'Vision',       url: '/vision',        icon: Telescope },
  { name: 'Roadmap',      url: '/roadmap',       icon: Map       },
  { name: 'Use Cases',    url: '/use-cases',     icon: Users     },
  { name: 'Docs',         url: '#',              icon: BookOpen  },
]

const personas = [
  {
    id: 'startup',
    tag: 'HARDWARE STARTUPS',
    title: 'Building the next big chip without the chip team.',
    lead: 'You have an architecture. You don\'t have a 30-person silicon team or a $2M EDA budget.',
    sections: [
      {
        heading: 'The pain today',
        body: 'Chip design expertise is scarce and expensive. Contract design houses are slow and costly. Existing EDA tools require years of expertise to operate effectively. Most hardware startups are stuck in simulation, unable to close the loop to real silicon.',
      },
      {
        heading: 'What EasyChip gives you',
        body: 'Describe your module in plain English. Get synthesizable, verified RTL back in under a minute. Use that as the foundation for your FPGA prototype or ASIC tape-out. No Verilog expertise required — though EasyChip works just as well alongside experts who have it.',
      },
      {
        heading: 'What you unlock',
        body: 'Move from architecture idea to synthesizable implementation at software speed. Spend your design budget on what matters — architecture decisions, not manual RTL writing and debugging. Get to FPGA prototyping and eventually tape-out faster than any alternative path.',
      },
    ],
    examples: ['SoC peripherals', 'Custom accelerators', 'Interface controllers', 'RISC-V extensions'],
  },
  {
    id: 'ai',
    tag: 'AI COMPANIES',
    title: 'Your models need custom silicon. The traditional path is too slow.',
    lead: 'You\'ve outgrown what GPUs can give you. You need a chip designed around your workload.',
    sections: [
      {
        heading: 'The pain today',
        body: 'Custom inference accelerators require a specialized hardware team, months of design work, and either a full EDA stack or expensive design services. Most AI companies can\'t staff or afford this, so they overpay for general-purpose hardware that doesn\'t fit their models.',
      },
      {
        heading: 'What EasyChip gives you',
        body: 'Describe your compute requirements — matrix dimensions, dataflow patterns, memory bandwidth needs — in plain language. Get hardware that\'s designed around your model architecture, not around every model. The feedback loop between model design and hardware design becomes fast enough to actually iterate.',
      },
      {
        heading: 'What you unlock',
        body: 'Purpose-built inference hardware for your specific models. Lower power, lower latency, lower cost per inference than general-purpose alternatives — at a fraction of what a traditional hardware design project would cost.',
      },
    ],
    examples: ['Inference accelerators', 'Edge AI chips', 'Neural processing units', 'Memory controllers'],
  },
  {
    id: 'university',
    tag: 'UNIVERSITY RESEARCH',
    title: 'Novel architectures deserve real silicon, not just simulation.',
    lead: 'Your research is stuck in FPGA emulation or ModelSim. Tape-out should be accessible.',
    sections: [
      {
        heading: 'The pain today',
        body: 'Research labs have great ideas but limited paths to silicon. Commercial EDA tools are prohibitively expensive for academic budgets. Tape-out programs through chip design consortia have long lead times and limited support. Most architecture research never makes it to real silicon.',
      },
      {
        heading: 'What EasyChip gives you',
        body: 'Describe novel architectural elements in plain language, generate RTL, verify it formally, and target open PDKs for academic tape-out. EasyChip makes the mechanical parts of chip design fast enough that research teams can focus on the architecture questions, not the toolchain.',
      },
      {
        heading: 'What you unlock',
        body: 'Close the loop between novel computer architecture and real manufactured chips — at the budget and timeline scale of an academic lab. Publish results with real silicon data, not just RTL simulation. Support students who want hardware experience without spending years learning legacy EDA tools.',
      },
    ],
    examples: ['Novel ISA implementations', 'Neuromorphic circuits', 'Memory subsystems', 'Accelerator research'],
  },
  {
    id: 'enterprise',
    tag: 'ENTERPRISE FABLESS',
    title: 'A force multiplier for your existing design team.',
    lead: 'Your engineers already know the tools. EasyChip handles the first-pass work so they focus on what matters.',
    sections: [
      {
        heading: 'The pain today',
        body: 'Senior design engineers spend a significant portion of their time writing boilerplate RTL, debugging trivial verification failures, and iterating on first-pass implementations that could have been generated. This is expensive time that could be spent on architecture decisions, critical path analysis, and complex module design.',
      },
      {
        heading: 'What EasyChip gives you',
        body: 'An AI-powered RTL drafting layer that produces first-pass, lint-clean, verified implementations of standard modules. Your engineers review, refine, and integrate — not write from scratch. EasyChip acts as a highly productive junior engineer for every routine design task.',
      },
      {
        heading: 'What you unlock',
        body: 'Cut the first-pass design cycle for standard modules significantly. Reduce verification debug time with auto-generated testbenches. Allow senior engineers to focus on the 20% of the design that actually requires deep expertise — not the 80% that\'s mechanical repetition.',
      },
    ],
    examples: ['Bus interfaces', 'Standard peripherals', 'Glue logic', 'Protocol adapters'],
  },
]

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: prefersReduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function UseCasesPage() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      <NavBar items={NAV_ITEMS} onOpenWaitlist={openWaitlist} />
      <main className="pt-24">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)' }}
          />
          <div className="section-container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-label text-text-tertiary mb-4">Use Cases</p>
              <h1 className="text-display-1 text-text-primary mb-6">
                The chip design stack
                <br />
                <span style={{ color: 'var(--accent-amber)' }}>for everyone.</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                Silicon wasn&apos;t always locked behind million-dollar tool licenses and specialist teams.
                We&apos;re returning chip design to where it belongs — in the hands of engineers
                with good ideas.
              </p>
              {/* Persona anchor links */}
              <div className="flex flex-wrap justify-center gap-3">
                {personas.map(p => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    className="px-4 py-2 rounded-full text-xs font-semibold border transition-all hover:bg-white/5"
                    style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}
                  >
                    {p.tag}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Persona Deep Dives ───────────────────────────────── */}
        {personas.map((persona, pi) => (
          <section
            key={persona.id}
            id={persona.id}
            className={`py-20 px-4 ${pi % 2 === 1 ? 'bg-white/[0.015]' : ''}`}
          >
            <div className="section-container">
              <AnimatedSection className="mb-10">
                <p className="text-label text-text-tertiary mb-4">{persona.tag}</p>
                <h2 className="text-display-2 text-text-primary mb-3 max-w-2xl">{persona.title}</h2>
                <p className="text-lg text-text-secondary max-w-2xl">{persona.lead}</p>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                {persona.sections.map((sec, si) => (
                  <AnimatedSection
                    key={sec.heading}
                    delay={si * 0.1}
                    className="glass-1 rounded-2xl p-7 border border-white/8 flex flex-col"
                  >
                    <div
                      className="w-1 h-5 rounded-full mb-5"
                      style={{
                        background: si === 0
                          ? 'rgba(240,237,232,0.2)'
                          : si === 1
                          ? 'rgba(212,168,67,0.5)'
                          : 'rgba(52,211,153,0.5)',
                      }}
                    />
                    <h3 className="text-sm font-semibold text-text-primary mb-3">{sec.heading}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed flex-1">{sec.body}</p>
                  </AnimatedSection>
                ))}
              </div>

              {/* Example designs */}
              <AnimatedSection delay={0.3} className="flex flex-wrap gap-2">
                <span className="text-xs text-text-tertiary self-center mr-1">Example designs:</span>
                {persona.examples.map(ex => (
                  <span
                    key={ex}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{
                      borderColor: 'rgba(212,168,67,0.2)',
                      background: 'rgba(212,168,67,0.05)',
                      color: 'rgba(212,168,67,0.8)',
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </AnimatedSection>
            </div>
          </section>
        ))}

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 px-4">
          <div className="section-container">
            <AnimatedSection className="text-center">
              <p className="text-label text-text-tertiary mb-6">Get started</p>
              <h2 className="text-display-2 text-text-primary mb-5">
                Your hardware idea
                <br />
                <span style={{ color: 'var(--accent-amber)' }}>deserves to be real.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10">
                Whether you&apos;re a startup, a research lab, or an enterprise team — if you have a hardware
                problem, we want to help you solve it.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={openWaitlist}
                  className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
                  style={{ background: 'var(--accent-amber)', color: '#0a0a0a' }}
                >
                  Register for Early Access
                </button>
                <Link
                  href="/roadmap"
                  className="px-8 py-3.5 rounded-full font-semibold border text-sm transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}
                >
                  See the roadmap →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
