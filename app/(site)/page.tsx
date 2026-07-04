import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { LIVE, TOOL_COUNTS } from '@/lib/tools'
import { HOME_FAQ } from '@/lib/faq'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import { LiveToolCard } from '@/components/ui/ToolCard'
import HomeHero from '@/components/home/HomeHero'
import EnginesMarquee from '@/components/home/EnginesMarquee'
import NarrativeStatement from '@/components/home/NarrativeStatement'
import PillarShowcase from '@/components/home/PillarShowcase'
import TheLatest from '@/components/home/TheLatest'

export const metadata: Metadata = {
  title: { absolute: 'EasyChip - AI-native EDA platform' },
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

      {/* ---------- 3. Live tool grid ---------- */}
      <Section
        eyebrow="Live today"
        title={`${TOOL_COUNTS.live} tools you can put to work now`}
        lede="Not a roadmap - shipped. Every tool below is live, local-first, and built to compose."
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

      {/* ---------- 5. Vision teaser ---------- */}
      <section className="border-t border-hair bg-base">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="eyebrow text-ink-3">Where this is going</p>
            <blockquote className="editorial mx-auto mt-6 max-w-3xl text-3xl text-ink md:text-4xl">
              Silicon should be as easy to create as software. One discipline throughout:{' '}
              <span className="text-gradient">AI proposes, deterministic engines verify.</span>
            </blockquote>
            <div className="mt-9">
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
