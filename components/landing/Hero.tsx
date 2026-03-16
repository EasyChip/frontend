'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SpotCounter = dynamic(() => import('./SpotCounter'), { ssr: false })
const CountdownTimer = dynamic(() => import('./CountdownTimer'), { ssr: false })

const CODE_PREVIEW = `module counter_4bit (
    input  wire clk,
    input  wire rst_n,
    input  wire en,
    output reg  [3:0] count,
    output wire overflow
);
    assign overflow = (count == 4'hF) & en;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) count <= 4'h0;
        else if (en)  count <= count + 1'b1;
    end
endmodule`

const STATS = [
  { value: '10K+', label: 'Designs' },
  { value: '94%', label: 'First-Pass' },
  { value: '<30s', label: 'Generation' },
  { value: '100%', label: 'Verified' },
]

interface Props {
  onOpenWaitlist?: () => void
}

export default function Hero({ onOpenWaitlist }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 pt-20 pb-8">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.4 }} />

      {/* Very subtle amber glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(212,168,67,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-base))' }}
      />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Content */}
          <div>
            {/* Amber label badge */}
            <div className="flex items-center gap-2 mb-8">
              <div className="inline-flex items-center gap-2 glass-1 px-3 py-1.5 rounded-full border border-white/8">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--accent-amber)' }}
                />
                <span className="text-label" style={{ color: 'var(--accent-amber)' }}>Now in closed beta</span>
                <span className="text-text-tertiary">·</span>
                <span className="text-label text-text-tertiary">April 28 launch</span>
              </div>
            </div>

            {/* H1 */}
            <h1 className="text-display-1 mb-6">
              <span className="block text-text-primary">Prompt In.</span>
              <span className="block text-text-primary">Silicon Out.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-text-secondary leading-relaxed mb-2 max-w-xl">
              EasyChip converts hardware prompts into production-ready, formally verified Verilog/SystemVerilog RTL — automatically.
            </p>
            <p className="text-sm text-text-tertiary mb-10">
              No manual Verilog. No testbenches. No respin.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button onClick={onOpenWaitlist} className="btn-primary">
                Join Waitlist →
              </button>
              <Link href="/playground" className="btn-ghost">
                Try Playground →
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-start gap-6 mb-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div
                    className="text-2xl font-extrabold font-mono leading-none mb-0.5 whitespace-nowrap"
                    style={{ color: 'var(--accent-amber)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Countdown */}
            <div className="mb-3">
              <CountdownTimer />
            </div>

            {/* Spot Counter */}
            <SpotCounter />
          </div>

          {/* Right: Code window */}
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
            >
              <CodeWindow />
            </motion.div>
          ) : (
            <div>
              <CodeWindow />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CodeWindow() {
  return (
    <div className="relative rounded-2xl overflow-hidden glass-1 border border-white/8 shadow-2xl shadow-black/60">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-xs text-text-tertiary font-mono">easychip — rtl generation</span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-white/5 px-2">
        <div
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-text-primary border-b-2"
          style={{ borderBottomColor: 'var(--accent-amber)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="rgba(212,168,67,0.3)" stroke="rgba(212,168,67,0.6)" strokeWidth="0.5"/>
          </svg>
          rtl
        </div>
        <div className="px-4 py-2 text-xs text-text-tertiary">testbench</div>
        <div className="px-4 py-2 text-xs text-text-tertiary">logs</div>
      </div>

      {/* Code with line numbers */}
      <div className="flex overflow-x-auto" style={{ background: 'rgba(4,8,16,0.8)' }}>
        {/* Line numbers */}
        <div
          className="select-none py-5 pl-4 pr-3 text-xs font-mono leading-relaxed text-right flex-shrink-0 border-r border-white/5"
          style={{ color: 'rgba(240,237,232,0.18)' }}
        >
          {CODE_PREVIEW.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code */}
        <pre className="p-5 text-xs font-mono text-green-400 leading-relaxed flex-1 min-w-0">
          <code>{CODE_PREVIEW}</code>
          <span className="cursor-blink" style={{ color: 'var(--accent-amber)' }}>█</span>
        </pre>
      </div>

      {/* PASS badge footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.6)" strokeWidth="1"/>
            <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PASS · 1 attempt · formal verified
        </span>
        <span className="text-xs text-text-tertiary font-mono">14 lines</span>
      </div>
    </div>
  )
}
