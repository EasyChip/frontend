import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Security & Trust',
  description:
    "How EasyChip handles your IP and data, our residency model, and Escanor's local-first guarantees.",
  alternates: { canonical: '/security' },
  robots: { index: false, follow: true },
}

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-brand-cyan">Security &amp; Trust</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold md:text-display-l">
            How EasyChip <span className="text-gradient">handles your IP.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            The short version: with Escanor, your designs never leave your infrastructure. The full
            trust center - data-handling model, subprocessors, and compliance posture - is being
            finalized and will live on this page.
          </p>
        </div>
      </section>

      <Section eyebrow="What we can say today" title="The architecture is the guarantee">
        <div className="max-w-3xl space-y-6">
          <div className="rounded-lg border border-hair bg-surface-1 p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Local-first by design</h2>
            <p className="mt-2 leading-relaxed text-ink-2">
              Every EasyChip tool is built to run on your infrastructure. With Escanor, zero
              design-data exfiltration is a hard invariant - your RTL, constraints, and PDKs are
              processed on machines you control.
            </p>
          </div>
          <div className="rounded-lg border border-hair bg-surface-1 p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Honest compliance posture</h2>
            <p className="mt-2 leading-relaxed text-ink-2">
              We don&apos;t claim certifications we don&apos;t hold. As formal audits and
              certifications progress, their real status will be published here - not before.
            </p>
          </div>
          <div className="rounded-lg border border-hair bg-surface-1 p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Questions we&apos;ll answer directly</h2>
            <p className="mt-2 leading-relaxed text-ink-2">
              Evaluating EasyChip for an IP-sensitive environment?{' '}
              <Link href="/contact" className="text-brand-cyan hover:underline underline-offset-4">
                Talk to us
              </Link>{' '}
              - we&apos;ll walk your security team through the model in detail.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Bring your security team."
        sub="We'd rather answer hard questions early than easy ones late."
      />
    </>
  )
}
