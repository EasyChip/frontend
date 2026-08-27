import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BUCKETS,
  TOOLS,
  FUTURE_TRACKS,
  toolsByBucket,
} from '@/lib/tools'
import { LiveToolCard, DevToolTile, FutureTrackTile } from '@/components/ui/ToolCard'
import ToolFinder from '@/components/tools/ToolFinder'
import Reveal from '@/components/ui/Reveal'
import CtaBand from '@/components/ui/CtaBand'
import StatusPill from '@/components/ui/StatusPill'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'EDA Tools - RTL to GDSII and beyond',
  description:
    'The full EasyChip toolset across five stages - Design, Verify, Implement, Sign Off, Advance. What is live today and what is coming next.',
  alternates: { canonical: '/tools' },
}

export default function ToolsPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-hair">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center md:pb-20 md:pt-28">
          <h1 className="mx-auto max-w-3xl editorial text-5xl md:text-display-l">
            Every stage of silicon. <span className="text-gradient">One platform.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Five stages cover the journey from spec to GDSII to 3D-IC - with analog and RF ahead.
            Live tools ship deep; everything else is labeled honestly.
          </p>
          <div className="mt-8">
            <ToolFinder tools={TOOLS} />
          </div>

          {/* Bucket jump nav */}
          <nav aria-label="Tool stages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {BUCKETS.map((bucket) => (
              <a
                key={bucket.id}
                href={`#bucket-${bucket.id}`}
                className="eyebrow rounded-full border border-hair px-4 py-2 text-ink-2 transition-colors hover:border-line hover:text-ink"
              >
                {String(bucket.order).padStart(2, '0')} · {bucket.name}
              </a>
            ))}
            <a
              href="#platform-layer"
              className="eyebrow rounded-full border border-brand-violet/40 bg-brand-violet/10 px-4 py-2 text-[#C79BFF] transition-colors hover:border-brand-violet/70"
            >
              The Cockpit
            </a>
          </nav>
        </div>
      </section>

      {/* ---------- The five buckets ---------- */}
      {BUCKETS.map((bucket, i) => {
        const tools = toolsByBucket(bucket.id)
        const live = tools.filter((t) => t.status === 'live')
        const inDev = tools.filter((t) => t.status === 'in-development')

        return (
          <section
            key={bucket.id}
            id={`bucket-${bucket.id}`}
            className={cn('scroll-mt-24 border-t border-hair', i % 2 === 0 ? 'bg-base' : 'bg-void')}
          >
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
              <Reveal>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="editorial-title w-fit text-3xl md:text-4xl">
                      <span className="mr-3 font-mono text-xl font-normal text-brand-cyan">
                        {String(bucket.order).padStart(2, '0')}
                      </span>
                      {bucket.name}
                    </h2>
                    {/* Status caption sits under the heading, not above it:
                        it reports what is live, which the heading cannot. */}
                    <p className="mt-3 flex items-center gap-3 text-sm text-ink-2">
                      {live.length > 0 ? (
                        <span aria-hidden className="led-dot" />
                      ) : (
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line" />
                      )}
                      {live.length > 0
                        ? `${live.length} live · ${bucket.tagline}`
                        : `In development · ${bucket.tagline}`}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-ink-2">{bucket.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {bucket.stages.map((stage) => (
                      <span
                        key={stage}
                        className="eyebrow rounded-full bg-surface-2 px-3 py-1.5 text-xs text-ink-3"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Live tools - rich cards. Columns follow the data: a bucket
                  with one live tool gets one column, not a card marooned in
                  two-thirds of empty row. */}
              {live.length > 0 && (
                <div
                  className={cn(
                    'mt-12 grid gap-5',
                    live.length === 1 && 'max-w-md',
                    live.length === 2 && 'md:grid-cols-2',
                    live.length >= 3 && 'md:grid-cols-2 xl:grid-cols-3'
                  )}
                >

                  {live.map((tool, j) => (
                    <Reveal key={tool.id} delay={j * 0.06}>
                      <LiveToolCard tool={tool} />
                    </Reveal>
                  ))}
                </div>
              )}

              {/* In development - names only, by design */}
              {inDev.length > 0 && (
                <div className="mt-10">
                  <p className="eyebrow mb-4 text-ink-3">
                    In development{' '}
                    <span className="text-ink-3/60">· names only until they ship - honest status, always</span>
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {inDev.map((tool) => (
                      <DevToolTile key={tool.id} tool={tool} />
                    ))}
                    {bucket.id === 'advance' &&
                      FUTURE_TRACKS.map((track) => <FutureTrackTile key={track.name} name={track.name} />)}
                  </div>
                </div>
              )}
            </div>
          </section>
        )
      })}

      {/* ---------- The Platform layer / Cockpit ---------- */}
      <section id="platform-layer" className="scroll-mt-24 border-t border-hair bg-void">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="editorial-title w-fit text-3xl md:text-4xl">The Cockpit</h2>
              <p className="mt-3 text-sm text-ink-2">The layer above the stages</p>
              <p className="mt-6 text-lg leading-relaxed text-ink-2">
                Cross-cutting infrastructure that turns fifty tools into one platform: local-first
                orchestration, reproducible flows, and a managed PDK substrate. This is what makes
                the suite a suite.
              </p>
            </div>
          </Reveal>

          {/* Escanor banner */}
          <Reveal>
            <Link
              href="/escanor"
              className="group mt-12 flex flex-col gap-4 rounded-lg border border-brand-violet/30 bg-gradient-to-r from-brand-violet/10 via-surface-1 to-surface-1 p-8 transition-all hover:border-brand-violet/60 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-medium text-ink">Escanor</h3>
                  <StatusPill status="in-development" />
                </div>
                <p className="mt-2 max-w-xl text-ink-2">
                  The local-first CLI agent that drives every tool on this page - entirely on your
                  infrastructure. Your RTL and PDKs never leave.
                </p>
              </div>
              <span className="shrink-0 font-medium text-brand-cyan group-hover:underline underline-offset-4">
                Why local-first wins →
              </span>
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {toolsByBucket('platform')
              .filter((t) => t.status === 'live')
              .map((tool, j) => (
                <Reveal key={tool.id} delay={j * 0.06}>
                  <LiveToolCard tool={tool} />
                </Reveal>
              ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {toolsByBucket('platform')
              .filter((t) => t.status === 'in-development')
              .map((tool) => (
                <DevToolTile key={tool.id} tool={tool} />
              ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Pick a stage. We'll show you the cockpit."
        sub="See the live tools on your own designs, or run everything locally with Escanor."
      />
    </>
  )
}
