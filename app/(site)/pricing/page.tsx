import type { Metadata } from 'next'
import Link from 'next/link'
import { PRICING_FAQ } from '@/lib/faq'
import { CTA } from '@/lib/site'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Faq from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import Reveal from '@/components/ui/Reveal'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing - plans for every kind of chip team',
  description:
    'From an individual designer to an IP-sensitive enterprise - the same platform, shaped for how you work. Talk to us.',
  alternates: { canonical: '/pricing' },
}

const tiers = [
  {
    name: 'Individual / Academic',
    idealFor: 'Solo designers, labs, students',
    highlight: false,
    points: [
      'VisUPF - free and open source',
      'Early access to tools as they open',
      'Real documentation, no paywall',
      'Community support',
    ],
    cta: { label: 'Get Early Access', href: CTA.secondary.href },
    deployment: 'Local desktop tools',
  },
  {
    name: 'Team / Startup',
    idealFor: 'Fabless startups & design teams',
    highlight: true,
    points: [
      'The live suite across your team',
      'One platform instead of a vendor sprawl',
      'FlowBit orchestration + Silicrate PDK management',
      'Direct line to the founding team',
    ],
    cta: { label: 'Book a Demo', href: CTA.primary.href },
    deployment: 'Local-first tools',
  },
  {
    name: 'Enterprise (Escanor)',
    idealFor: 'IP-sensitive orgs, foundry-NDA teams',
    highlight: false,
    points: [
      'The full platform on your infrastructure',
      'No data egress - hard invariant',
      'Built for isolated environments',
      'Deployment support & priority engineering',
    ],
    cta: { label: 'Book a Demo', href: CTA.primary.href },
    deployment: 'Your infrastructure (Escanor)',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 text-center md:pt-28">
          <p className="eyebrow mb-5 text-ink-3">Pricing</p>
          <h1 className="mx-auto max-w-3xl editorial text-5xl md:text-display-l">
            Plans for every kind of <span className="text-gradient">chip team.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            From an individual designer to an IP-sensitive enterprise - the same platform, shaped
            for how you work. We price by conversation while the platform is in early access:
            talk to us.
          </p>
        </div>
      </section>

      {/* ---------- Tiers ---------- */}
      <Section wide>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06}>
              <div
                className={
                  tier.highlight
                    ? 'relative h-full rounded-xl border border-brand-violet/50 bg-surface-1 p-8 shadow-glow-violet-sm'
                    : 'h-full rounded-xl border border-hair bg-surface-1 p-8'
                }
              >
                {tier.highlight && (
                  <span className="eyebrow absolute -top-3 left-8 rounded-full bg-brand-violet px-3 py-1 text-[0.6rem] text-white">
                    Most teams start here
                  </span>
                )}
                <h2 className="font-display text-xl font-medium text-ink">{tier.name}</h2>
                <p className="mt-1 text-sm text-ink-3">Ideal for: {tier.idealFor}</p>
                <p className="eyebrow mt-5 text-ink-3">Deployment</p>
                <p className="mt-1 text-sm font-medium text-ink-2">{tier.deployment}</p>
                <ul className="mt-6 space-y-3">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-cyan" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href={tier.cta.href}
                    variant={tier.highlight ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-3">
          Using EasyChip for research or coursework? Tell us - academic teams are a priority, not
          an afterthought. And{' '}
          <Link href="/tools/visupf" className="text-brand-cyan hover:underline underline-offset-4">
            VisUPF is free for everyone
          </Link>
          , no tier required.
        </p>

        {/* Compare what's included - qualitative, no dollar figures */}
        <details className="group mt-12 rounded-lg border border-hair bg-surface-1">
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 font-medium text-ink [&::-webkit-details-marker]:hidden">
            Compare what&apos;s included
            <span aria-hidden className="text-ink-3 transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="overflow-x-auto border-t border-hair">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="eyebrow px-6 py-4 text-ink-3">Included</th>
                  <th className="px-6 py-4 font-medium text-ink-2">Individual / Academic</th>
                  <th className="px-6 py-4">
                    <span className="font-display font-medium text-gradient">Team / Startup</span>
                  </th>
                  <th className="px-6 py-4 font-medium text-ink-2">Enterprise (Escanor)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['VisUPF (open source)', 'Included', 'Included', 'Included'],
                  ['Live tool suite', 'Early access', 'Full team access', 'Full platform'],
                  ['FlowBit orchestration + Silicrate PDK', '-', 'Included', 'Included'],
                  ['Escanor local deployment', '-', '-', 'Included - the point'],
                  ['Data leaves your infrastructure', 'Never (local tools)', 'Never (local tools)', 'Never - hard invariant'],
                  ['Support', 'Community', 'Direct line to founders', 'Deployment + priority engineering'],
                ].map(([row, a, b, c]) => (
                  <tr key={row} className="border-b border-hair last:border-0 hover:bg-surface-2/40">
                    <td className="px-6 py-3.5 font-medium text-ink">{row}</td>
                    <td className="px-6 py-3.5 text-ink-2">{a}</td>
                    <td className="border-x border-brand-violet/15 bg-brand-violet/[0.05] px-6 py-3.5 text-ink">{b}</td>
                    <td className="px-6 py-3.5 text-ink-2">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section eyebrow="Pricing questions" title="The short answers" className="border-t border-hair bg-base">
        <Faq items={PRICING_FAQ} />
      </Section>

      <CtaBand
        headline="Tell us how you work."
        sub="We'll show you what the platform looks like on your flow - and what it costs for your team."
      />
    </>
  )
}
