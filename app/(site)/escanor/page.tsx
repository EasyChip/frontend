import type { Metadata } from 'next'
import Link from 'next/link'
import { ESCANOR_FAQ } from '@/lib/faq'
import { CTA } from '@/lib/site'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import Reveal from '@/components/ui/Reveal'
import StatusPill from '@/components/ui/StatusPill'
import Terminal from '@/components/escanor/Terminal'
import { ShieldCheck, HardDrive, Plug, WifiOff } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Escanor — local-first EDA',
  description:
    'Run EasyChip entirely on your own infrastructure. Your RTL and PDKs never leave. Built for IP-sensitive teams.',
  alternates: { canonical: '/escanor' },
}

const guarantees = [
  {
    icon: HardDrive,
    title: 'Runs entirely on your infrastructure',
    body: 'Escanor is a local-first CLI orchestrator. The tools, the design state, and the intelligence all execute on hardware you control.',
  },
  {
    icon: ShieldCheck,
    title: 'No data egress',
    body: 'Zero design-data exfiltration is a hard invariant across the platform — nothing about your RTL, constraints, or PDKs is sent out.',
  },
  {
    icon: WifiOff,
    title: 'Built for isolated environments',
    body: 'Designed for the networks chip IP actually lives on — including environments that never touch the public internet.',
  },
  {
    icon: Plug,
    title: 'Works with your existing flow',
    body: 'Escanor drives the EasyChip suite alongside the flow you already run. Adoption is an addition, not a migration.',
  },
]

export default function EscanorPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-hair">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(124,8,245,0.5) 0%, rgba(196,0,254,0.25) 50%, transparent 78%)',
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-20 md:pb-24 md:pt-28 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <p className="eyebrow text-[#C79BFF]">Local-first</p>
              <StatusPill status="in-development" />
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-display-l">
              Your IP <span className="text-gradient">never leaves</span> your infrastructure.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              Escanor runs EasyChip entirely on your own hardware — a local-first orchestrator for
              teams whose RTL and PDKs can&apos;t go to the cloud. Early access is opening.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={CTA.secondary.href} size="lg">
                Request early access
              </Button>
              <Button href={CTA.primary.href} variant="secondary" size="lg">
                {CTA.primary.label}
              </Button>
            </div>
          </div>
          <Terminal />
        </div>
      </section>

      {/* ---------- The problem ---------- */}
      <Section eyebrow="The problem" title="Cloud AI tools ask for the one thing you can't give">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-2">
            Most AI-EDA tools require shipping your RTL and PDKs to someone else&apos;s cloud. For
            teams under foundry NDAs, defense and aerospace constraints, or with IP that simply
            can&apos;t leave the building, that&apos;s a hard no — so they miss out on modern
            tooling entirely.
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink">
            Escanor exists so the most IP-sensitive teams get the most capable tooling — without a
            single byte of design data leaving their control.
          </p>
        </Reveal>
      </Section>

      {/* ---------- Guarantees ---------- */}
      <Section
        eyebrow="How Escanor is different"
        title="Local-first as a hard invariant"
        className="border-t border-hair bg-base"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {guarantees.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="flex h-full gap-5 rounded-lg border border-hair bg-surface-1 p-7">
                <g.icon size={22} className="mt-1 shrink-0 text-brand-cyan" aria-hidden />
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{g.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{g.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Comparison ---------- */}
      <Section
        eyebrow="Side by side"
        title={
          <>
            Escanor vs. <span className="text-gradient">cloud-only AI-EDA</span>
          </>
        }
      >
        <Reveal>
          <div className="overflow-x-auto rounded-lg border border-hair bg-surface-1">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="eyebrow px-5 py-4 text-ink-3">Dimension</th>
                  <th className="px-5 py-4">
                    <span className="font-display text-base font-semibold text-gradient">
                      Escanor (local-first)
                    </span>
                  </th>
                  <th className="px-5 py-4 font-medium text-ink-2">Cloud-only AI-EDA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Data residency', 'Your infrastructure, always', 'Off-site vendor cloud'],
                  ['RTL / PDK handling', 'Never leaves your machines', 'Uploaded to run'],
                  ['Connectivity requirement', 'Built for isolated networks', 'Requires connectivity'],
                  ['Integration', 'Wraps the flow you already run', 'Varies by vendor'],
                  ['Who controls the environment', 'You do', 'The vendor does'],
                ].map(([dim, esc, cloud]) => (
                  <tr key={dim} className="border-b border-hair last:border-0">
                    <td className="px-5 py-3.5 font-medium text-ink">{dim}</td>
                    <td className="px-5 py-3.5 text-brand-cyan">{esc}</td>
                    <td className="px-5 py-3.5 text-ink-2">{cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* ---------- Who it's for ---------- */}
      <Section eyebrow="Who it's for" title="Built for the teams with the most to protect" className="border-t border-hair bg-base">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { title: 'Foundry-NDA teams', body: 'PDKs under NDA can’t touch third-party clouds. With Escanor they never have to.' },
            { title: 'Defense & aerospace', body: 'Programs with strict data-handling constraints get modern tooling inside their own perimeter.' },
            { title: 'IP vendors', body: 'When the design is the product, data egress is an existential risk — so there is none.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-lg border border-hair bg-surface-1 p-7">
                <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-3">
          Security details and the full data-handling model live in our{' '}
          <Link href="/security" className="text-brand-cyan hover:underline underline-offset-4">
            Security &amp; Trust Center
          </Link>
          .
        </p>
      </Section>

      {/* ---------- FAQ + CTA ---------- */}
      <Section eyebrow="Fair questions" title="Asked by every IP-sensitive buyer">
        <Faq items={ESCANOR_FAQ} />
      </Section>

      <CtaBand
        headline="Bring the platform to your infrastructure."
        sub="Request early access to Escanor, or talk to us about your environment."
        primaryLabel="Request early access"
        primaryHref={CTA.secondary.href}
        secondaryLabel={CTA.primary.label}
        secondaryHref={CTA.primary.href}
      />
    </>
  )
}
