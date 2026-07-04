import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'About - the team and the thesis',
  description: "Why we're consolidating the EDA toolchain, and the team building it.",
  alternates: { canonical: '/about' },
}

const team = [
  {
    name: 'Rakshit Mishra',
    role: 'Co-founder & CEO',
    initials: 'RM',
  },
  {
    name: 'Parth Parekh',
    role: 'Co-founder & CTO',
    initials: 'PP',
  },
  {
    name: 'Sohil Khan',
    role: 'Co-founder & COO · Head of AI Research',
    initials: 'SK',
  },
]

const values = [
  {
    title: 'AI proposes, deterministic engines verify',
    body: 'No output is trusted until a deterministic engine has checked it. Rigor is the product.',
  },
  {
    title: 'Breadth over point solutions',
    body: 'The toolchain is the problem, so the platform is the answer - one context, not another island.',
  },
  {
    title: 'Your IP stays yours',
    body: 'Local-first is a hard invariant, not a deployment option we upsell.',
  },
  {
    title: 'Honest status labels',
    body: 'Live means live. In development means in development. Every claim on this site is labeled.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-ink-3">About</p>
          <h1 className="max-w-3xl editorial text-5xl md:text-display-l">
            The cockpit for chip design, <span className="text-gradient">built by chip designers.</span>
          </h1>
        </div>
      </section>

      <Section eyebrow="Origin" title="It started with waiting">
        <Reveal>
          <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-2">
            <p>
              EasyChip started with a shared frustration. Working on neuromorphic and
              ferroelectric-capacitor research, our founders spent more time waiting on slow,
              fragmented tool cycles than actually designing.
            </p>
            <p>
              The insight: the big signoff engines weren&apos;t the bottleneck -{' '}
              <span className="text-ink">everything around them was.</span> The linting, the
              constraints, the register maps, the power intent, the PDK wrangling; dozens of
              disconnected tools with dozens of disconnected contexts.
            </p>
            <p>
              EasyChip is the platform we wished we&apos;d had: one cockpit for the secondary
              toolchain, built AI-native from the start - with deterministic engines verifying
              every step.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="The team" title="Founders" className="border-t border-hair bg-base">
        <div className="grid gap-5 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
          {team.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.06}>
              <div className="rounded-lg border border-hair bg-surface-1 p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-prism font-display text-lg font-medium text-white">
                  {person.initials}
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-ink">{person.name}</h3>
                <p className="mt-1 text-sm text-ink-2">{person.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-3">
          Full team profiles - including advisors and the engineers behind the tools - are on the
          way.
        </p>
      </Section>

      <Section eyebrow="How we work" title="Four principles, applied daily">
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.05}>
              <div className="h-full rounded-lg border border-hair bg-surface-1 p-7">
                <h3 className="font-display text-lg font-medium text-ink">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-t border-hair bg-base">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <p className="eyebrow text-ink-3">{SITE.region}</p>
        </div>
      </section>

      <CtaBand
        headline="The thesis is simple: one cockpit."
        sub="See it on your flow, or follow the build from the inside."
      />
    </>
  )
}
