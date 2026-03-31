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

type StageStatus = 'done' | 'active' | 'planned' | 'end'

const stages: Array<{
  label: string
  desc: string
  status: StageStatus
  detail: string
}> = [
  {
    label: 'RTL Generation',
    desc: 'Synthesizable Verilog from plain English',
    status: 'done',
    detail: 'You describe your hardware module in natural language. EasyChip returns clean, synthesizable, lint-passing Verilog. No HDL knowledge required to get a first-pass implementation.',
  },
  {
    label: 'Formal Verification',
    desc: 'Automated correctness loop until it passes',
    status: 'done',
    detail: 'Every generated module runs through bounded model checking and simulation-based verification automatically. If it fails, the system regenerates. This loop runs until the design is provably correct.',
  },
  {
    label: 'Production Model',
    desc: 'Full-corpus training for complex real-world designs',
    status: 'active',
    detail: 'Training a model purpose-built for hardware on the largest available corpus of open-source HDL and EDA documentation. The result will handle designs significantly more complex than any existing tool.',
  },
  {
    label: 'Cloud API',
    desc: 'Hosted, scalable, metered access',
    status: 'planned',
    detail: 'A REST API for programmatic access. Integrate RTL generation and verification into your existing design automation pipelines. SDKs for Python and JavaScript. Metered usage, no seat licenses.',
  },
  {
    label: 'Logic Synthesis',
    desc: 'RTL → gate-level netlist automatically',
    status: 'planned',
    detail: 'Compile the verified RTL into a technology-mapped gate-level netlist using AI-guided synthesis. Optimize for area, power, or speed — or a balance — specified in plain language.',
  },
  {
    label: 'Place & Route',
    desc: 'Physical layout automation',
    status: 'planned',
    detail: 'The hardest layer in chip design. AI-assisted placement and routing of standard cells onto a die. Handles congestion, timing constraints, and metal rules without manual floorplanning.',
  },
  {
    label: 'Timing Closure',
    desc: 'Post-layout sign-off, automated',
    status: 'planned',
    detail: 'Iterative ECO-based timing closure driven by AI analysis of timing reports. Target: first-pass timing compliance without a human timing engineer reviewing every critical path.',
  },
  {
    label: 'Physical Verification',
    desc: 'DRC/LVS clean on first attempt',
    status: 'planned',
    detail: 'Design Rule Check and Layout vs. Schematic sign-off. AI-guided violation resolution. Goal is a first-attempt DRC-clean layout — currently the most common source of tape-out delays.',
  },
  {
    label: 'PDK Integration',
    desc: 'Foundry-native. SkyWater. GlobalFoundries.',
    status: 'planned',
    detail: 'Native support for open PDKs first (SkyWater 130nm, GlobalFoundries 180nm), with a path to commercial PDK integration. Designs that target real manufacturable processes from day one.',
  },
  {
    label: 'Full RTL → GDSII',
    desc: 'Natural language to tape-out package',
    status: 'end',
    detail: 'The end state: you describe a chip. You receive a manufacturable GDSII file, a verified netlist, timing reports, and full sign-off documentation. Tape-out ready. No silicon team required.',
  },
]

const statusConfig: Record<StageStatus, { dot: string; badge: string; badgeColor: string }> = {
  done:    { dot: 'bg-emerald-400',              badge: 'COMPLETE',    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  active:  { dot: 'bg-amber-400 animate-pulse',  badge: 'IN PROGRESS', badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20'     },
  planned: { dot: 'bg-white/20',                 badge: 'PLANNED',     badgeColor: 'text-text-tertiary bg-white/5 border-white/10'           },
  end:     { dot: 'bg-amber-400',                badge: 'END GOAL',    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/25'      },
}

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

export default function RoadmapPage() {
  const prefersReduced = useReducedMotion()
  const stagesRef = useRef<HTMLDivElement>(null)
  const stagesInView = useInView(stagesRef, { once: true, amount: 0.05 })

  const doneCount = stages.filter(s => s.status === 'done').length
  const totalCount = stages.length

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
              <p className="text-label text-text-tertiary mb-4">The Roadmap</p>
              <h1 className="text-display-1 text-text-primary mb-6">
                From RTL to tape-out.
                <br />
                <span style={{ color: 'var(--accent-amber)' }}>One pipeline.</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                We started with the hardest part — making AI generate correct hardware. 
                Now we&apos;re building the rest of the stack. One layer at a time.
              </p>

              {/* Progress bar */}
              <div className="max-w-sm mx-auto mb-10">
                <div className="flex justify-between text-xs text-text-tertiary mb-2">
                  <span>{doneCount} stages complete</span>
                  <span>{totalCount} total</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--accent-amber)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(doneCount / totalCount) * 100}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={openWaitlist}
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
                  style={{ background: 'var(--accent-amber)', color: '#0a0a0a' }}
                >
                  Register for Early Access
                </button>
                <Link
                  href="/vision"
                  className="px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}
                >
                  See the full vision →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="section-container max-w-3xl">
            <AnimatedSection className="text-center mb-14">
              <p className="text-label text-text-tertiary mb-4">The Stack</p>
              <h2 className="text-display-2 text-text-primary mb-5">
                Every layer.
                <br />
                <span className="text-text-secondary">Every stage.</span>
              </h2>
            </AnimatedSection>

            <div ref={stagesRef} className="space-y-0">
              {stages.map((stage, i) => {
                const cfg = statusConfig[stage.status]
                const isLast = i === stages.length - 1
                return (
                  <motion.div
                    key={stage.label}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
                    animate={stagesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: prefersReduced ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Timeline column */}
                    <div className="flex flex-col items-center flex-shrink-0 w-6">
                      <div
                        className={`w-4 h-4 rounded-full mt-4 flex-shrink-0 ${cfg.dot}`}
                        style={
                          stage.status === 'end'
                            ? { boxShadow: '0 0 14px rgba(212,168,67,0.5)' }
                            : stage.status === 'done'
                            ? { boxShadow: '0 0 8px rgba(52,211,153,0.3)' }
                            : undefined
                        }
                      />
                      {!isLast && (
                        <div
                          className="w-px flex-1 my-1"
                          style={{
                            background:
                              stage.status === 'done'
                                ? 'rgba(52,211,153,0.2)'
                                : stage.status === 'active'
                                ? 'rgba(212,168,67,0.2)'
                                : 'rgba(255,255,255,0.06)',
                            minHeight: 20,
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 mb-3 p-6 rounded-2xl border transition-all ${
                        stage.status === 'done'
                          ? 'border-emerald-400/15 bg-emerald-400/[0.02]'
                          : stage.status === 'active'
                          ? 'border-amber-400/25 bg-amber-400/[0.04]'
                          : stage.status === 'end'
                          ? 'border-amber-400/35 bg-amber-400/[0.05]'
                          : 'border-white/6 bg-white/[0.01]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                        <div>
                          <h3 className={`text-heading font-semibold mb-0.5 ${
                            stage.status === 'planned' ? 'text-text-secondary/70' : 'text-text-primary'
                          }`}>{stage.label}</h3>
                          <p className="text-sm text-text-tertiary">{stage.desc}</p>
                        </div>
                        <span
                          className={`text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full border flex-shrink-0 ${cfg.badgeColor}`}
                        >
                          {cfg.badge}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        stage.status === 'planned' ? 'text-text-tertiary/80' : 'text-text-secondary'
                      }`}>{stage.detail}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 px-4">
          <div className="section-container">
            <AnimatedSection className="text-center">
              <p className="text-label text-text-tertiary mb-6">Be part of it</p>
              <h2 className="text-display-2 text-text-primary mb-5">
                We&apos;re building this
                <br />
                <span style={{ color: 'var(--accent-amber)' }}>with our early users.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10">
                Join the waitlist and help shape the roadmap. Early access partners get direct input
                on what we build next.
              </p>
              <button
                onClick={openWaitlist}
                className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
                style={{ background: 'var(--accent-amber)', color: '#0a0a0a' }}
              >
                Register for Early Access
              </button>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
