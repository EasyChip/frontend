import Link from 'next/link'
import type { Metadata } from 'next'
import AutoPlayground from '@/components/demo/AutoPlayground'
import MetricsPanel from '@/components/demo/MetricsPanel'
import InvestorCTA from '@/components/demo/InvestorCTA'

export const metadata: Metadata = {
  title: 'EasyChip — Live Demo',
  description: 'See EasyChip generate formally verified RTL from a hardware prompt in real time.',
  robots: 'noindex', // private investor link
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-bg-base" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Dot grid background */}
      <div className="dot-grid fixed inset-0 opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2 text-text-primary font-bold text-lg tracking-tight">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-accent-start">
              <rect x="7" y="1" width="8" height="4" rx="1" fill="currentColor" opacity="0.9"/>
              <rect x="7" y="17" width="8" height="4" rx="1" fill="currentColor" opacity="0.9"/>
              <rect x="1" y="7" width="4" height="8" rx="1" fill="currentColor" opacity="0.9"/>
              <rect x="17" y="7" width="4" height="8" rx="1" fill="currentColor" opacity="0.9"/>
              <rect x="6" y="6" width="10" height="10" rx="2" fill="currentColor" opacity="0.4"/>
              <rect x="9" y="9" width="4" height="4" rx="1" fill="currentColor"/>
            </svg>
            EasyChip
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Investor Preview — Confidential
          </div>
        </div>

        {/* Headline */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            <span className="gradient-text-hero">Hardware design,</span>
            <br />
            <span className="text-text-primary">just prompt it.</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Watch EasyChip convert a hardware prompt into production-ready, formally verified Verilog — automatically.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* Left: live demo */}
          <AutoPlayground />

          {/* Right: metrics + CTA */}
          <div className="flex flex-col gap-4">
            <MetricsPanel />
            <InvestorCTA />
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-text-muted mt-12">
          This page is unlisted and intended for invited viewers.{' '}
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Visit the main site →
          </Link>
        </p>
      </div>
    </div>
  )
}
