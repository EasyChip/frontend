import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { BUCKETS, LIVE, TOOL_COUNTS } from '@/lib/tools'
import { HOME_FAQ } from '@/lib/faq'
import { WRAPPED_ENGINES } from '@/lib/faq'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import MetricBand from '@/components/ui/MetricBand'
import { LiveToolCard } from '@/components/ui/ToolCard'
import HomeHero from '@/components/home/HomeHero'
import EnginesMarquee from '@/components/home/EnginesMarquee'
import NarrativeStatement from '@/components/home/NarrativeStatement'
import PillarShowcase from '@/components/home/PillarShowcase'
import TheLatest from '@/components/home/TheLatest'

export const metadata: Metadata = {
  title: 'EasyChip - AI-native EDA platform',
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

      {/* ---------- 1. Hero - the Prism Die (orchestrated client hero) ---------- */}
      <HomeHero />

      {/* ---------- 1b. Engines credibility strip ---------- */}
      <EnginesMarquee />

      {/* ---------- 2. Narrative statement ---------- */}
      <NarrativeStatement />

      {/* ---------- 2b. Product pillars, illustrated ---------- */}
      <PillarShowcase />

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
            EasyChip sits above proven engines - {WRAPPED_ENGINES.slice(0, 4).join(', ')} and more -
            and unifies the secondary toolchain into a single cockpit.
          </>
        }
        center
      >
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <div className="w-full rounded-lg border border-brand-violet/40 bg-gradient-to-r from-brand-violet/15 via-surface-1 to-brand-cyan/10 px-6 py-4 text-center">
              <span className="font-display font-semibold text-ink">EasyChip - the cockpit</span>
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
              <span className="eyebrow text-ink-3">Your deterministic signoff engines - untouched</span>
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
        lede="Not a roadmap - shipped. Breadth is the point: every tool below is live, local-first, and built to compose."
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
            See all {TOOL_COUNTS.total} tools - and what&apos;s next
          </Button>
        </div>
      </Section>

      {/* ---------- 5. Escanor highlight ---------- */}
      <section className="border-t border-hair">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="rounded-xl border border-brand-violet/30 bg-gradient-to-br from-brand-violet/15 via-surface-1 to-void p-10 md:p-14">
              <p className="eyebrow text-[#C79BFF]">Escanor - local-first</p>
              <h2 className="editorial mt-4 max-w-2xl text-4xl md:text-5xl">
                Secure by design. <em className="text-gradient">Local by default.</em>
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
                Escanor runs EasyChip entirely on your own hardware - no data egress, no cloud
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

      {/* ---------- 8. Vision teaser ---------- */}
      <section className="border-t border-hair bg-base">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <Reveal>
            <p className="eyebrow text-ink-3">Where this is going</p>
            <blockquote className="mx-auto mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              Silicon should be as easy to create as software. We&apos;re building toward an
              AI-native path from intent to silicon - with one discipline throughout:{' '}
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

      {/* ---------- The Latest ---------- */}
      <TheLatest />

      {/* ---------- 9. FAQ ---------- */}
      <Section eyebrow="Fair questions" title="Before you ask">
        <Faq items={HOME_FAQ} />
      </Section>

      {/* ---------- 10. CTA band ---------- */}
      <CtaBand />
    </>
  )
}
