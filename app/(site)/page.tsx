import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE, CTA } from '@/lib/site'
import { BUCKETS, LIVE, TOOL_COUNTS, toolsByBucket } from '@/lib/tools'
import { HOME_FAQ } from '@/lib/faq'
import { WRAPPED_ENGINES } from '@/lib/faq'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import MetricBand from '@/components/ui/MetricBand'
import { LiveToolCard } from '@/components/ui/ToolCard'

export const metadata: Metadata = {
  title: 'EasyChip — AI-native EDA platform',
  description: SITE.description,
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EasyChip',
  url: SITE.url,
  logo: `${SITE.url}/brand/logo-tile.png`,
  description: SITE.elevator,
  sameAs: ['https://github.com/EasyChip'],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- 1. Hero ---------- */}
      <section className="relative overflow-hidden">
        {/* the one prism moment on this view (rule of one) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[1100px] -translate-x-1/2 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 55% 42% at 50% 0%, rgba(0,229,238,0.5) 0%, rgba(78,85,252,0.35) 45%, rgba(196,0,254,0.15) 70%, transparent 82%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 text-center md:pb-28 md:pt-36">
          <p className="eyebrow mb-6 text-brand-cyan">AI-native EDA platform</p>
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-display-xl">
            Chip Design <span className="text-gradient-full">Made Simpler</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">
            EasyChip consolidates the dozens of secondary EDA tools chip teams juggle into one
            platform — the cockpit above your signoff engines, not a replacement for them.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={CTA.primary.href} size="lg">
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="secondary" size="lg">
              {CTA.secondary.label}
            </Button>
          </div>
          <p className="eyebrow mt-10 text-ink-3">{SITE.tagline}</p>

          {/* Flow strip — the journey in one line */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {BUCKETS.map((bucket, i) => {
              const live = toolsByBucket(bucket.id).filter((t) => t.status === 'live').length
              return (
                <div key={bucket.id} className="flex items-center gap-2">
                  <Link
                    href={`/tools#bucket-${bucket.id}`}
                    className="group rounded-md border border-hair bg-surface-1/70 px-4 py-2.5 backdrop-blur transition-colors hover:border-line hover:bg-surface-2"
                  >
                    <span className="block font-display text-sm font-semibold text-ink">
                      {bucket.name}
                    </span>
                    <span className="eyebrow text-[0.55rem] text-ink-3">
                      {live > 0 ? `${live} live` : 'in development'}
                    </span>
                  </Link>
                  {i < BUCKETS.length - 1 && (
                    <span aria-hidden className="text-ink-3/50">
                      →
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- 2. The problem ---------- */}
      <Section
        eyebrow="The problem"
        title="The work between the engines is where teams lose weeks"
        className="border-t border-hair bg-base"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-2">
              A modern chip team runs forty-plus tools from a handful of vendors just to get to
              signoff — linting here, CDC there, register maps in a spreadsheet, PDKs wrangled by
              hand. Every tool is its own island, its own licence, its own context.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              The signoff engines aren&apos;t the bottleneck. Everything <em>around</em> them is.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hair bg-hair">
              <div className="bg-surface-1 p-6">
                <p className="eyebrow text-ink-3">Today</p>
                <p className="mt-2 font-display text-2xl font-bold text-ink">A tool sprawl</p>
                <p className="mt-2 text-sm text-ink-2">
                  Dozens of point tools, disconnected contexts, licences everywhere.
                </p>
              </div>
              <div className="bg-surface-1 p-6">
                <p className="eyebrow text-brand-cyan">With EasyChip</p>
                <p className="mt-2 font-display text-2xl font-bold text-gradient">One cockpit</p>
                <p className="mt-2 text-sm text-ink-2">
                  One platform, one shared design context, engines orchestrated underneath.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- 3. The platform in one view ---------- */}
      <Section
        eyebrow="The platform, in one view"
        title={
          <>
            One suite, <span className="text-gradient">above the engines you trust</span>
          </>
        }
        lede={
          <>
            EasyChip sits above proven engines — {WRAPPED_ENGINES.slice(0, 4).join(', ')} and more —
            and unifies the secondary toolchain into a single cockpit.
          </>
        }
        center
      >
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <div className="w-full rounded-lg border border-brand-violet/40 bg-gradient-to-r from-brand-violet/15 via-surface-1 to-brand-cyan/10 px-6 py-4 text-center">
              <span className="font-display font-semibold text-ink">EasyChip — the cockpit</span>
              <span className="eyebrow ml-3 text-[0.6rem] text-ink-3">Escanor · FlowBit · Silicrate</span>
            </div>
            <div aria-hidden className="h-6 w-px bg-gradient-to-b from-brand-violet/60 to-brand-cyan/40" />
            <div className="grid w-full grid-cols-5 gap-2">
              {BUCKETS.map((b) => (
                <div key={b.id} className="rounded-md border border-hair bg-surface-1 py-3 text-center">
                  <span className="font-display text-xs font-semibold text-ink md:text-sm">{b.name}</span>
                </div>
              ))}
            </div>
            <div aria-hidden className="h-6 w-px bg-gradient-to-b from-brand-cyan/40 to-hair" />
            <div className="w-full rounded-lg border border-hair bg-base px-6 py-4 text-center">
              <span className="eyebrow text-ink-3">Your deterministic signoff engines — untouched</span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button href="/platform" variant="secondary">
              How the suite fits together
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ---------- 4. Live tool grid ---------- */}
      <Section
        eyebrow="Live today"
        title={`${TOOL_COUNTS.live} tools you can put to work now`}
        lede="Not a roadmap — shipped. Breadth is the point: every tool below is live, local-first, and built to compose."
        className="border-t border-hair bg-base"
        wide
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {LIVE.map((tool, i) => (
            <Reveal key={tool.id} delay={(i % 3) * 0.05}>
              <LiveToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/tools" variant="secondary" size="lg">
            See all {TOOL_COUNTS.total} tools — and what&apos;s next
          </Button>
        </div>
      </Section>

      {/* ---------- 5. Escanor highlight ---------- */}
      <section className="border-t border-hair">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="rounded-xl border border-brand-violet/30 bg-gradient-to-br from-brand-violet/15 via-surface-1 to-void p-10 md:p-14">
              <p className="eyebrow text-[#C79BFF]">Escanor — local-first</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
                Your IP never leaves your infrastructure.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
                Escanor runs EasyChip entirely on your own hardware — no data egress, no cloud
                round-trip. Built for teams under foundry NDAs and IP that can&apos;t leave the
                building.
              </p>
              <div className="mt-8">
                <Button href="/escanor">Explore Escanor</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 6. Metric band (derived, labeled) ---------- */}
      <div className="mx-auto max-w-6xl px-6 pb-4">
        <MetricBand
          metrics={[
            { value: String(TOOL_COUNTS.total), label: 'Tools, one platform' },
            { value: String(TOOL_COUNTS.live), label: 'Live today' },
            { value: '5', label: 'Stages, spec → 3D-IC' },
            { value: '100%', label: 'Local-first by design' },
          ]}
          caveat="Derived from the public tool registry. Local-first: every EasyChip tool is built to run on your infrastructure."
        />
      </div>

      {/* ---------- 7. How it works ---------- */}
      <Section eyebrow="How it works" title="Four steps, no rip-and-replace" center>
        <ol className="mx-auto grid max-w-5xl gap-5 md:grid-cols-4">
          {[
            { step: '01', title: 'Connect', body: 'Point EasyChip at your existing flow — it wraps what you already run.' },
            { step: '02', title: 'Run', body: 'Linting, constraints, power intent, registers, timing and more — one place.' },
            { step: '03', title: 'Trust', body: 'Every result is checked by deterministic engines before you rely on it.' },
            { step: '04', title: 'Stay local', body: 'Deploy with Escanor if your IP can’t leave. Nothing ever egresses.' },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 0.06}>
              <li className="h-full rounded-lg border border-hair bg-surface-1 p-6 text-left">
                <span className="eyebrow text-brand-cyan">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------- 8. Vision teaser ---------- */}
      <section className="border-t border-hair bg-base">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <Reveal>
            <p className="eyebrow text-ink-3">Where this is going</p>
            <blockquote className="mx-auto mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              Silicon should be as easy to create as software. We&apos;re building toward an
              AI-native path from intent to silicon — with one discipline throughout:{' '}
              <span className="text-gradient">AI proposes, deterministic engines verify.</span>
            </blockquote>
            <div className="mt-8">
              <Button href="/vision" variant="ghost">
                Read the vision →
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 9. FAQ ---------- */}
      <Section eyebrow="Fair questions" title="Before you ask">
        <Faq items={HOME_FAQ} />
      </Section>

      {/* ---------- 10. CTA band ---------- */}
      <CtaBand />
    </>
  )
}
