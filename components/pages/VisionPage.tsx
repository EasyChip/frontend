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

const pipelineStages = [
  { label: 'Natural Language Prompt',   desc: 'You describe what you want in plain English.',                      status: 'input'   },
  { label: 'RTL Generation',            desc: 'Synthesizable Verilog generated from your description.',            status: 'done'    },
  { label: 'Formal Verification',       desc: 'Automated loop: generate, verify, regenerate until correct.',      status: 'done'    },
  { label: 'Logic Synthesis',           desc: 'RTL compiled to a gate-level netlist.',                             status: 'planned' },
  { label: 'Place & Route',             desc: 'Cells placed and wired on the physical die.',                       status: 'planned' },
  { label: 'Timing Closure',            desc: 'Post-layout timing sign-off automated.',                            status: 'planned' },
  { label: 'Physical Verification',     desc: 'DRC/LVS checking with zero manual intervention.',                   status: 'planned' },
  { label: 'GDSII Tape-Out Package',    desc: 'A manufacturable file ready to send to a foundry.',                 status: 'end'     },
]

const moatPoints = [
  {
    title: 'Verification in the loop',
    body: 'We don\'t just generate. We verify. Every output runs through a formal checking pipeline before it\'s returned. This is the critical difference between a toy and a production tool.',
  },
  {
    title: 'Self-improving with every design',
    body: 'Each successful generation is feedback into the next iteration. The system gets better the more it\'s used — a compound advantage that grows over time.',
  },
  {
    title: 'AI-native, not AI-bolted-on',
    body: 'We didn\'t take a 1980s EDA tool and add a chat interface. We rebuilt the design flow from the ground up with AI as the primary actor, not the assistant.',
  },
  {
    title: 'Open PDK compatibility',
    body: 'Targeting SkyWater, GlobalFoundries, and TSMC-compatible open PDKs first — making tape-out accessible to organizations that couldn\'t previously afford foundry-grade tooling.',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-label text-text-tertiary mb-4">{children}</p>
}

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: prefersReduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function VisionPage() {
  const prefersReduced = useReducedMotion()
  const pipelineRef = useRef<HTMLDivElement>(null)
  const pipelineInView = useInView(pipelineRef, { once: true, amount: 0.1 })
  const moatRef = useRef<HTMLDivElement>(null)
  const moatInView = useInView(moatRef, { once: true, amount: 0.1 })

  return (
    <>
      <NavBar items={NAV_ITEMS} onOpenWaitlist={openWaitlist} />
      <main className="pt-24">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)' }}
          />
          <div className="section-container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Our Vision</SectionLabel>
              <h1 className="text-display-1 text-text-primary mb-6">
                We&apos;re building the
                <br />
                <span style={{ color: 'var(--accent-amber)' }}>autopilot for silicon.</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                Chip design has been locked behind years of expertise, millions in tool licenses,
                and specialist teams most organizations can&apos;t afford. We&apos;re changing that — 
                completely and permanently.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={openWaitlist}
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
                  style={{ background: 'var(--accent-amber)', color: '#0a0a0a' }}
                >
                  Register for Early Access
                </button>
                <Link
                  href="/roadmap"
                  className="px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}
                >
                  See the roadmap →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── The Problem ─────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="section-container">
            <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel>The Problem</SectionLabel>
                <h2 className="text-display-2 text-text-primary mb-6">
                  The bar to silicon
                  <br />
                  <span className="text-text-secondary">is impossibly high.</span>
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Modern chip design requires expertise in HDLs, EDA toolchains that cost millions per seat,
                    and years of domain knowledge just to produce a first draft. For most organizations,
                    this is an insurmountable barrier.
                  </p>
                  <p>
                    The result: only a handful of well-funded companies can build custom silicon. 
                    Every startup with a hardware idea, every researcher with a novel architecture,
                    every AI company that needs a custom inference chip — all of them are locked out.
                  </p>
                  <p>
                    We think that&apos;s wrong. And fixable.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Average design cycle for a new ASIC', value: 'Months of iteration' },
                  { label: 'EDA toolchain cost for full RTL→GDSII', value: 'Enterprise-only pricing' },
                  { label: 'Engineers who can tape out from scratch', value: 'Severely scarce worldwide' },
                  { label: 'Organizations locked out of custom silicon', value: 'The vast majority' },
                ].map((item, i) => (
                  <AnimatedSection
                    key={i}
                    delay={i * 0.1}
                    className="glass-1 rounded-xl p-5 border border-white/8"
                  >
                    <p className="text-text-primary font-semibold text-sm mb-2 leading-tight">{item.value}</p>
                    <p className="text-xs text-text-tertiary leading-snug">{item.label}</p>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── The Approach ────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="section-container">
            <AnimatedSection className="text-center mb-14">
              <SectionLabel>The Approach</SectionLabel>
              <h2 className="text-display-2 text-text-primary mb-5">
                AI-native from day one.
                <br />
                <span className="text-text-secondary">Not AI bolted onto the 1980s.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                We didn&apos;t wrap a chat interface around Cadence Virtuoso. We rebuilt the entire design 
                flow with AI as the primary actor — from the first prompt to the final tape-out file.
              </p>
            </AnimatedSection>

            {/* Full Pipeline */}
            <div ref={pipelineRef} className="space-y-2 max-w-2xl mx-auto">
              {pipelineStages.map((stage, i) => {
                const isDone = stage.status === 'done'
                const isInput = stage.status === 'input'
                const isEnd = stage.status === 'end'
                return (
                  <motion.div
                    key={stage.label}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: prefersReduced ? 0 : -20 }}
                    animate={pipelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Timeline line */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isInput ? 'bg-blue-400' :
                          isDone ? 'bg-emerald-400' :
                          isEnd ? 'bg-amber-400' : 'bg-white/20'
                        }`}
                        style={isEnd ? { boxShadow: '0 0 10px rgba(212,168,67,0.5)' } : undefined}
                      />
                      {i < pipelineStages.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{
                            height: 28,
                            background: isDone ? 'rgba(52,211,153,0.3)' : isInput ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.06)',
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pb-4 rounded-xl px-4 py-3 border transition-all ${
                        isInput ? 'border-blue-400/20 bg-blue-400/[0.03]' :
                        isDone ? 'border-emerald-400/20 bg-emerald-400/[0.03]' :
                        isEnd ? 'border-amber-400/30 bg-amber-400/[0.05]' :
                        'border-white/6 bg-white/[0.015]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-sm font-semibold ${
                          stage.status === 'planned' ? 'text-text-secondary/60' : 'text-text-primary'
                        }`}>{stage.label}</p>
                        <span className={`text-[9px] font-mono tracking-widest flex-shrink-0 ${
                          isInput ? 'text-blue-400' :
                          isDone ? 'text-emerald-400' :
                          isEnd ? 'text-amber-400' : 'text-text-tertiary'
                        }`}>
                          {isInput ? 'YOU' : isDone ? 'LIVE' : isEnd ? 'END GOAL' : 'PLANNED'}
                        </span>
                      </div>
                      <p className="text-xs text-text-tertiary leading-relaxed">{stage.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── The Moat ────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="section-container">
            <AnimatedSection className="text-center mb-14">
              <SectionLabel>Why It&apos;s Different</SectionLabel>
              <h2 className="text-display-2 text-text-primary mb-5">
                Generation is table stakes.
                <br />
                <span className="text-text-secondary">Verification is the moat.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Any model can hallucinate Verilog. We verify it. That&apos;s the difference between 
                a demo and a tool engineers actually trust.
              </p>
            </AnimatedSection>

            <div ref={moatRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moatPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  className="glass-1 rounded-2xl p-8 border border-white/8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={moatInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: prefersReduced ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-1 h-6 rounded-full mb-5"
                    style={{ background: 'rgba(212,168,67,0.6)' }}
                  />
                  <h3 className="text-heading text-text-primary mb-3">{point.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{point.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Now ─────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="section-container">
            <AnimatedSection className="text-center mb-14">
              <SectionLabel>Why Now</SectionLabel>
              <h2 className="text-display-2 text-text-primary mb-5">
                The window is open.
                <br />
                <span className="text-text-secondary">It won&apos;t stay that way.</span>
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: 'AI CAPABILITY',
                  title: 'LLMs can now generate hardware',
                  body: 'Code-specialized models crossed the threshold for synthesizable Verilog generation recently. The quality required for production use is achievable today in a way that simply wasn\'t true before.',
                },
                {
                  label: 'EDA MATURITY',
                  title: 'Open-source EDA is production-ready',
                  body: 'The full RTL-to-GDSII open toolchain — simulation, synthesis, place & route, verification — matured enough to build on top of. We don\'t need to acquire or build the EDA layer.',
                },
                {
                  label: 'MARKET PULL',
                  title: 'Demand for custom silicon is exploding',
                  body: 'Every company training large AI models wants custom inference hardware. The demand for chip design talent vastly exceeds supply. Automation is not a nice-to-have — it\'s a necessity.',
                },
              ].map((item, i) => (
                <AnimatedSection
                  key={item.label}
                  delay={i * 0.12}
                  className="glass-1 rounded-2xl p-8 border border-white/8 flex flex-col"
                >
                  <p className="text-label text-text-tertiary mb-5">{item.label}</p>
                  <h3 className="text-heading text-text-primary mb-3">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">{item.body}</p>
                  <div className="mt-6 h-px w-12 rounded-full" style={{ background: 'rgba(212,168,67,0.4)' }} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vision CTA ──────────────────────────────────────── */}
        <section className="py-24 px-4">
          <div className="section-container">
            <AnimatedSection className="text-center">
              <p className="text-label text-text-tertiary mb-6">Join the journey</p>
              <h2 className="text-display-2 text-text-primary mb-5">
                Be part of the next era
                <br />
                <span style={{ color: 'var(--accent-amber)' }}>of hardware engineering.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10">
                We&apos;re building with a small group of early partners. If you have a hardware problem
                you can&apos;t solve with current tools, we want to talk.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={openWaitlist}
                  className="px-8 py-3.5 rounded-full font-semibold transition-all text-sm"
                  style={{ background: 'var(--accent-amber)', color: '#0a0a0a' }}
                >
                  Register for Early Access
                </button>
                <Link
                  href="/use-cases"
                  className="px-8 py-3.5 rounded-full font-semibold border text-sm transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}
                >
                  See use cases →
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
