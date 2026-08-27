import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'EasyChip announcements: launches, partnerships, and product milestones.',
  alternates: { canonical: '/newsroom' },
}

const items = [
  {
    date: 'July 2026',
    title: 'VisUPF goes open source',
    body: 'Our visual UPF authoring and low-power static-check tool is going free and open source. The release package is being finalized - early-access members get the download link first.',
    href: '/tools/visupf',
    linkLabel: 'About VisUPF',
  },
]

export default function NewsroomPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <h1 className="max-w-3xl editorial text-5xl md:text-display-l">
            Milestones, <span className="text-gradient">as they happen.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Only what&apos;s real: launches, partnerships, and wins - announced when they&apos;re
            won, not when they&apos;re wished for.
          </p>
        </div>
      </section>

      <Section title="Latest">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-lg border border-hair bg-surface-1 p-7">
              <p className="eyebrow text-ink-3">{item.date}</p>
              <h2 className="mt-2 font-display text-xl font-medium text-ink">{item.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{item.body}</p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-brand-cyan hover:underline underline-offset-4"
              >
                {item.linkLabel} →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-3">
          Press inquiries:{' '}
          <Link href="/contact" className="text-brand-cyan hover:underline underline-offset-4">
            contact the team
          </Link>
          . Logo pack and boilerplate available on request.
        </p>
      </Section>

      <CtaBand
        headline="Hear it first."
        sub="Early-access members get every announcement before this page does."
      />
    </>
  )
}
