import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Where to meet EasyChip - conferences, workshops, and talks.',
  alternates: { canonical: '/events' },
}

export default function EventsPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-brand-cyan">Events</p>
          <h1 className="max-w-3xl editorial text-5xl md:text-display-l">
            Meet <span className="text-gradient">EasyChip.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Talks, booths, and workshops - published here once they&apos;re confirmed, not before.
            The upcoming calendar is being locked in now.
          </p>
        </div>
      </section>

      <Section eyebrow="Can't wait?" title="Meet us anyway">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
          You don&apos;t need a conference floor - book a call and we&apos;ll bring the demo to
          you. If you&apos;d like us at your meetup, university, or team offsite, say the word.
        </p>
      </Section>

      <CtaBand headline="The demo travels well." sub="Book a time - we'll meet you where you are." />
    </>
  )
}
