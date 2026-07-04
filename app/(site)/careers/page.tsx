import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Build the platform that consolidates chip design. Open roles.',
  alternates: { canonical: '/careers' },
}

const reasons = [
  {
    title: 'A genuinely hard problem',
    body: 'EDA meets AI meets systems engineering - the kind of technical depth most startups only claim.',
  },
  {
    title: 'Real users, real silicon',
    body: 'Chip teams run what you ship. The feedback loop is engineers you can name, not dashboards.',
  },
  {
    title: 'Early enough to matter',
    body: 'Small team, big surface area. What you build becomes load-bearing - and so do you.',
  },
]

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-brand-cyan">Careers</p>
          <h1 className="max-w-3xl editorial text-5xl md:text-display-l">
            Build the platform that <span className="text-gradient">consolidates chip design.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            We&apos;re a small team replacing a forty-vendor toolchain with one. If that problem
            excites you, we want to hear from you.
          </p>
        </div>
      </section>

      <Section eyebrow="Why here" title="Three honest reasons">
        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="h-full rounded-lg border border-hair bg-surface-1 p-7">
              <h2 className="font-display text-lg font-semibold text-ink">{reason.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-2">{reason.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Open roles" title="Postings are being finalized" className="border-t border-hair bg-base">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
          Specific role listings land here soon. Impatient? Good - that&apos;s a signal.{' '}
          <Link href="/contact" className="text-brand-cyan hover:underline underline-offset-4">
            Write to us
          </Link>{' '}
          with what you want to build and proof you can build it.
        </p>
      </Section>

      <CtaBand
        headline="Don't wait for the job post."
        sub="Show us what you'd build. We hire for that."
        primaryLabel="Introduce yourself"
        primaryHref="/contact"
        secondaryLabel="See the platform"
        secondaryHref="/platform"
      />
    </>
  )
}
