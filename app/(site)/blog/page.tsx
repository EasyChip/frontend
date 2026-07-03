import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import WaitlistForm from '@/components/contact/WaitlistForm'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Deep-dives on EDA, chip design, and building an AI-native toolchain.',
  alternates: { canonical: '/blog' },
}

const upcoming = [
  {
    tag: 'Thesis',
    title: 'Why chip teams run 40 tools to tape out one design — and what that costs',
  },
  {
    tag: 'Technical',
    title: 'CDC analysis: what actually matters, and where the money goes',
  },
  {
    tag: 'Thesis',
    title: 'Local-first EDA: keeping your RTL and PDKs off the cloud',
  },
  {
    tag: 'Technical',
    title: 'UPF power intent, authored not hand-written',
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-brand-cyan">Blog</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold md:text-display-l">
            Writing that <span className="text-gradient">earns its keep.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Technical deep-dives, the consolidation thesis, and build-in-public notes. The first
            posts are being written now — here&apos;s what&apos;s on the desk.
          </p>
        </div>
      </section>

      <Section eyebrow="In the works" title="First up">
        <div className="grid gap-4 md:grid-cols-2">
          {upcoming.map((post) => (
            <div key={post.title} className="rounded-lg border border-dashed border-hair bg-surface-1/60 p-7">
              <span className="eyebrow text-ink-3">{post.tag} · Coming soon</span>
              <h2 className="mt-3 font-display text-lg font-semibold text-ink-2">{post.title}</h2>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-xl">
          <p className="eyebrow mb-4 text-brand-cyan">Don&apos;t refresh — subscribe</p>
          <WaitlistForm />
        </div>
      </Section>
    </>
  )
}
