import type { Metadata } from 'next'
import Link from 'next/link'
import { BUCKETS, toolsByBucket, TOOL_COUNTS } from '@/lib/tools'
import { PLATFORM_FAQ, WRAPPED_ENGINES } from '@/lib/faq'
import Section from '@/components/ui/Section'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import StatusPill from '@/components/ui/StatusPill'

export const metadata: Metadata = {
  title: 'The Suite - one platform for everything around signoff',
  description:
    'Linting, constraints, power intent, verification, implementation, signoff and 3D-IC - the fragmented EDA toolchain, consolidated into one platform above your signoff engines.',
  alternates: { canonical: '/platform' },
}

export default function PlatformPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-hair">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,229,238,0.45) 0%, rgba(124,8,245,0.28) 50%, transparent 78%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
          <p className="eyebrow mb-5 text-ink-3">The Suite</p>
          <h1 className="mx-auto max-w-3xl editorial text-5xl md:text-display-l">
            Everything around signoff, <span className="text-gradient">in one platform.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Chip teams juggle dozens of secondary tools between the big signoff engines. EasyChip
            consolidates them - {TOOL_COUNTS.total} tools across five stages, one shared context,
            one cockpit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/tools" size="lg">
              Explore the toolset
            </Button>
            <Button href="/escanor" variant="secondary" size="lg">
              Run it locally
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- The consolidation map (signature diagram) ---------- */}
      <Section
        eyebrow="The consolidation map"
        title={
          <>
            The suite sits <span className="text-gradient">above</span> your engines
          </>
        }
        lede="One platform layer orchestrating five stages of tooling - on top of the deterministic engines that actually sign off silicon."
        center
        wide
      >
        <Reveal>
          <div className="mx-auto max-w-5xl">
            {/* Layer 1 - the cockpit */}
            <div className="rounded-lg border border-brand-violet/40 bg-gradient-to-r from-brand-violet/15 via-surface-1 to-brand-cyan/10 p-5 text-center">
              <p className="eyebrow text-[#C79BFF]">The Cockpit - cross-cutting platform</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-lg font-medium">
                <Link href="/escanor" className="text-ink transition-colors hover:text-brand-cyan">
                  Escanor
                </Link>
                <Link href="/tools/flowbit" className="text-ink transition-colors hover:text-brand-cyan">
                  FlowBit
                </Link>
                <Link href="/tools/silicrate" className="text-ink transition-colors hover:text-brand-cyan">
                  Silicrate
                </Link>
              </div>
              <p className="mt-2 text-xs text-ink-3">
                local-first orchestration · reproducible flows · managed PDK substrate
              </p>
            </div>

            <svg aria-hidden className="mx-auto block h-8 w-1 overflow-visible" viewBox="0 0 2 32">
              <line x1="1" y1="0" x2="1" y2="32" stroke="rgba(0,229,238,0.35)" strokeWidth="2" />
              <line
                x1="1" y1="0" x2="1" y2="32"
                stroke="#00E5EE" strokeWidth="2" strokeLinecap="round"
                strokeDasharray="3 21"
                style={{ animation: 'trace-pulse 1.4s linear infinite' }}
              />
            </svg>

            {/* Layer 2 - five stage facets */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {BUCKETS.map((bucket) => {
                const tools = toolsByBucket(bucket.id)
                const liveCount = tools.filter((t) => t.status === 'live').length
                return (
                  <Link
                    key={bucket.id}
                    href={`/tools#bucket-${bucket.id}`}
                    className="group rounded-lg border border-hair bg-surface-1 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-line hover:bg-surface-2"
                  >
                    <p className="eyebrow text-brand-cyan">{String(bucket.order).padStart(2, '0')}</p>
                    <p className="mt-1.5 font-display text-lg font-medium text-ink">{bucket.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-3">{bucket.tagline}</p>
                    <p className="eyebrow mt-3 text-[0.6rem] text-ink-3">
                      {tools.length} tools{liveCount > 0 ? ` · ${liveCount} live` : ''}
                    </p>
                  </Link>
                )
              })}
            </div>

            <svg aria-hidden className="mx-auto block h-8 w-1 overflow-visible" viewBox="0 0 2 32">
              <line x1="1" y1="0" x2="1" y2="32" stroke="rgba(0,229,238,0.2)" strokeWidth="2" />
              <line
                x1="1" y1="0" x2="1" y2="32"
                stroke="#7C08F5" strokeWidth="2" strokeLinecap="round"
                strokeDasharray="3 21"
                style={{ animation: 'trace-pulse 1.4s linear infinite', animationDelay: '0.7s' }}
              />
            </svg>

            {/* Layer 3 - the engines */}
            <div className="rounded-lg border border-hair bg-base p-5 text-center">
              <p className="eyebrow text-ink-3">Deterministic engines - orchestrated, never replaced</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {WRAPPED_ENGINES.map((engine) => (
                  <span key={engine} className="eyebrow rounded-full bg-surface-2 px-3 py-1.5 text-[0.65rem] text-ink-2">
                    {engine}
                  </span>
                ))}
                <span className="eyebrow rounded-full border border-hair px-3 py-1.5 text-[0.65rem] text-ink-3">
                  + your existing signoff flow
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------- We wrap, we don't rebuild ---------- */}
      <Section
        eyebrow="We wrap, we don't rebuild"
        title="Keep the engines the industry trusts"
        lede="EasyChip orchestrates industry-standard engines rather than reinventing them. You keep the tools already trusted for signoff - EasyChip owns the layer above: integration, context, and developer experience."
        className="border-t border-hair bg-base"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'One context across every tool',
              body: 'Today each tool is its own island - its own setup, its own outputs, its own mental model. In EasyChip, every tool reads and writes shared design state, so results compound instead of scattering.',
            },
            {
              title: 'One vendor instead of forty',
              body: 'The secondary toolchain today means dozens of vendor relationships, licences, and support contracts. A bundle collapses that into one - with one consistent interface over it.',
            },
            {
              title: 'Non-threatening by design',
              body: "We don't compete with your signoff engines - we make everything around them coherent. That means adopting EasyChip is an addition to your flow, not a bet-the-company migration.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-lg border border-hair bg-surface-1 p-7">
                <h3 className="font-display text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Escanor callout ---------- */}
      <section className="border-t border-hair">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <Link
              href="/escanor"
              className="group flex flex-col gap-4 rounded-lg border border-brand-violet/30 bg-gradient-to-r from-brand-violet/10 via-surface-1 to-surface-1 p-8 transition-all hover:border-brand-violet/60 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-medium text-ink">
                    Need it on your own infrastructure?
                  </h3>
                  <StatusPill status="in-development" />
                </div>
                <p className="mt-2 max-w-xl text-ink-2">
                  Escanor runs the whole platform locally - no data egress, built for teams whose IP
                  can&apos;t leave the building.
                </p>
              </div>
              <span className="shrink-0 font-medium text-brand-cyan group-hover:underline underline-offset-4">
                Explore Escanor →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Section eyebrow="Objections, answered" title="Fair questions" className="border-t border-hair bg-base">
        <Faq items={PLATFORM_FAQ} />
      </Section>

      <CtaBand />
    </>
  )
}
