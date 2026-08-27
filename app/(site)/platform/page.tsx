import type { Metadata } from 'next'
import Link from 'next/link'
import { TOOL_COUNTS } from '@/lib/tools'
import { PLATFORM_FAQ } from '@/lib/faq'
import Section from '@/components/ui/Section'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import Reveal from '@/components/ui/Reveal'
import ConsolidationMap from '@/components/platform/ConsolidationMap'
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
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
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
        title="The suite sits above your engines"
        lede="One platform layer orchestrating five stages of tooling - on top of the deterministic engines that actually sign off silicon. Every number below is read from the tool registry."
        center
        wide
      >
        <Reveal>
          <ConsolidationMap />
        </Reveal>
      </Section>

      {/* ---------- We wrap, we don't rebuild ---------- */}
      <Section
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
      <Section title="Fair questions" className="border-t border-hair bg-base">
        <Faq items={PLATFORM_FAQ} />
      </Section>

      <CtaBand />
    </>
  )
}
