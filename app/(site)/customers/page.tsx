import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Customers',
  description: 'How chip teams use EasyChip.',
  alternates: { canonical: '/customers' },
  robots: { index: false, follow: true },
}

export default function CustomersPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-ink-3">Customers</p>
          <h1 className="max-w-3xl editorial text-5xl md:text-display-l">
            Real teams, real flows - <span className="text-gradient">stories coming.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            We publish design-partner stories only with permission and only when they&apos;re true -
            no invented customers, no anonymous hype. The first case studies will appear here as
            partners go on the record.
          </p>
        </div>
      </section>

      <Section eyebrow="In the meantime" title="Become the first story">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
          Design partners get deep engineering attention, direct access to the founding team, and a
          platform shaped around their flow. If that sounds like a trade worth making, let&apos;s
          talk.
        </p>
      </Section>

      <CtaBand headline="Partner with us early." sub="The best time to shape the platform is before everyone else uses it." />
    </>
  )
}
