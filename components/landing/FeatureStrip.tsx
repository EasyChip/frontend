'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function FeatureStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReduced = useReducedMotion()

  const cardVariant = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]} },
      }

  return (
    <section id="features" className="py-20 px-4">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-label text-text-tertiary mb-4">Capabilities</p>
          <h2 className="text-display-2 text-text-primary mb-4">
            Everything you need
            <br />
            <span className="text-text-secondary">to ship hardware</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            From hardware prompt to synthesizable, formally verified RTL — the full pipeline in one tool.
          </p>
        </div>

        {/* Bento grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-12 gap-4 auto-rows-min"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1 } } }}
        >
          {/* NL→RTL — col-span-7, tall */}
          <motion.div
            variants={cardVariant}
            className="col-span-12 lg:col-span-7 glass-1 rounded-2xl p-8 min-h-[280px] relative overflow-hidden border border-white/8 hover:border-white/14 transition-colors duration-300"
          >
            <div className="w-9 h-9 rounded-xl glass-2 flex items-center justify-center mb-4" style={{ borderColor: 'rgba(212,168,67,0.2)', border: '1px solid' }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M3 10h14M10 3l7 7-7 7" stroke="var(--accent-amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-heading text-text-primary mb-2">NL → RTL</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-sm">
              Describe your hardware in a prompt. Get synthesizable Verilog/SystemVerilog back in seconds.
            </p>
            {/* Mini demo snippet */}
            <div className="rounded-xl overflow-hidden border border-white/6" style={{ background: 'rgba(4,8,16,0.8)' }}>
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-red-500/50" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <span className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-text-tertiary ml-2 font-mono">output.v</span>
              </div>
              <pre className="p-4 text-[11px] font-mono text-green-400 leading-relaxed">
                <span className="text-text-tertiary">{`// "4-bit counter with active-low reset"`}</span>{`
module counter_4bit(
  input clk, rst_n, en,
  output reg [3:0] count
);
  always @(posedge clk)
    if (!rst_n) count <= 0;
    else if (en) count <= count + 1;
endmodule`}
                <span className="cursor-blink" style={{ color: 'var(--accent-amber)' }}>█</span>
              </pre>
            </div>
          </motion.div>

          {/* Formal Verification — col-span-5, tall */}
          <motion.div
            variants={cardVariant}
            className="col-span-12 lg:col-span-5 glass-1 rounded-2xl p-8 min-h-[280px] relative overflow-hidden border border-white/8 hover:border-white/14 transition-colors duration-300"
          >
            <div className="w-9 h-9 rounded-xl glass-2 flex items-center justify-center mb-4" style={{ border: '1px solid rgba(212,168,67,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="var(--accent-amber)" strokeWidth="1.8"/>
                <path d="M7 10l2 2 4-4" stroke="var(--accent-amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-heading text-text-primary mb-2">Formal Verification</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Every design passes SymbiYosys bounded model checking automatically.
            </p>
            {/* Arc stat */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                  <circle
                    cx="40" cy="40" r="32"
                    fill="none"
                    stroke="var(--accent-amber)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="201"
                    strokeDashoffset={isInView ? "12" : "201"}
                    style={{ transition: prefersReduced ? 'none' : 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1) 0.5s' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-extrabold" style={{ color: 'var(--accent-amber)' }}>94%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">First-pass rate</div>
                <div className="text-xs text-text-tertiary mt-0.5">across all design types</div>
              </div>
            </div>
          </motion.div>

          {/* Multi-Agent — col-span-4 */}
          <motion.div
            variants={cardVariant}
            className="col-span-12 sm:col-span-4 glass-1 rounded-2xl p-7 border border-white/8 hover:border-white/14 transition-colors duration-300 flex flex-col"
          >
            <div className="w-9 h-9 rounded-xl glass-2 flex items-center justify-center mb-4" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="5" width="5" height="5" rx="1.5" stroke="var(--text-secondary)" strokeWidth="1.8"/>
                <rect x="13" y="5" width="5" height="5" rx="1.5" stroke="var(--text-secondary)" strokeWidth="1.8"/>
                <rect x="7.5" y="12" width="5" height="5" rx="1.5" stroke="var(--text-secondary)" strokeWidth="1.8"/>
                <path d="M7 7.5h6M4.5 10v2.5h5M15.5 10v2.5h-5" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-heading text-text-primary mb-2">Multi-Agent</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Architect → RTL Gen → Verifier agents collaborate in parallel. Each specialist does one thing perfectly.
            </p>
          </motion.div>

          {/* Speed — col-span-4 */}
          <motion.div
            variants={cardVariant}
            className="col-span-12 sm:col-span-4 glass-1 rounded-2xl px-7 pb-7 pt-10 border border-white/8 hover:border-white/14 transition-colors duration-300 flex flex-col"
          >
            <div
              className="text-6xl font-black font-mono mb-3 leading-none"
              style={{ color: 'var(--accent-amber)' }}
            >
              &lt;30s
            </div>
            <h3 className="text-heading text-text-primary mb-2">Avg Generation</h3>
            <p className="text-sm text-text-secondary leading-relaxed">From prompt to verified Verilog</p>
          </motion.div>

          {/* Open Weights — col-span-4 */}
          <motion.div
            variants={cardVariant}
            className="col-span-12 sm:col-span-4 glass-1 rounded-2xl p-7 border border-white/8 hover:border-white/14 transition-colors duration-300 flex flex-col"
          >
            <div className="w-9 h-9 rounded-xl glass-2 flex items-center justify-center mb-4" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4 4h12v8H4z" stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M7 16h6M10 12v4" stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M7 7.5l1.5 1.5L12 5.5" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-heading text-text-primary mb-2">Open Weights</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Fine-tuned open-weight models you can run locally, audit, or retrain on your own RTL data.
            </p>
          </motion.div>

          {/* Self-Improving — col-span-12, short banner */}
          <motion.div
            variants={cardVariant}
            className="col-span-12 glass-1 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6 border border-white/8 hover:border-white/14 transition-colors duration-300"
          >
            <div className="flex-1">
              <div className="w-9 h-9 rounded-xl glass-2 flex items-center justify-center mb-3" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v3M10 14v3M3 10h3M14 10h3" stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="10" cy="10" r="3" stroke="var(--text-secondary)" strokeWidth="1.8"/>
                </svg>
              </div>
              <h3 className="text-heading text-text-primary mb-2">Self-Improving Pipeline</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                The model improves automatically through simulation-guided training and formal feedback loops. Every verified design makes the next one better.
              </p>
            </div>
            {/* Animated loss curve */}
            <div className="relative flex-shrink-0 w-48 h-24">
              <svg viewBox="0 0 192 96" className="w-full h-full">
                <defs>
                  <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(240,237,232,0.15)" stopOpacity="1"/>
                    <stop offset="100%" stopColor="rgba(240,237,232,0)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="24" x2="192" y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="0" y1="48" x2="192" y2="48" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="0" y1="72" x2="192" y2="72" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <path
                  d="M0,80 C20,70 40,50 70,35 C100,20 130,18 160,15 L192,13 L192,96 L0,96Z"
                  fill="url(#lossGrad)"
                />
                <path
                  d="M0,80 C20,70 40,50 70,35 C100,20 130,18 160,15 L192,13"
                  fill="none"
                  stroke="rgba(240,237,232,0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="300"
                  strokeDashoffset={isInView ? 0 : 300}
                  style={{ transition: prefersReduced ? 'none' : 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.8s' }}
                />
                <text x="4" y="90" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="monospace">Epoch 0</text>
                <text x="150" y="90" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="monospace">100</text>
                <text x="4" y="20" fontSize="9" fill="var(--accent-amber)" fontFamily="monospace">↓ Loss</text>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
