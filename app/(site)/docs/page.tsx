import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import WaitlistForm from '@/components/contact/WaitlistForm'

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Guides and references for the EasyChip toolset and Escanor.',
  alternates: { canonical: '/docs' },
}

const sections = [
  {
    title: 'Getting started',
    body: 'What EasyChip is, how access works, and your first run.',
    status: 'In progress',
  },
  {
    title: 'VisUPF (open source)',
    body: 'Install, first project, and power-intent authoring guide - shipping with the open-source release.',
    status: 'Shipping with release',
  },
  {
    title: 'Escanor',
    body: 'Install, local execution, and running the suite on your infrastructure.',
    status: 'In progress',
  },
  {
    title: 'Per-tool guides',
    body: 'Usage, inputs/outputs, and supported formats for every live tool.',
    status: 'In progress',
  },
]

export default function DocsPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <p className="eyebrow mb-5 text-ink-3">Docs</p>
          <h1 className="max-w-3xl editorial text-5xl md:text-display-l">
            Read first, <span className="text-gradient">then believe.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Engineers evaluate with documentation, not landing pages - we agree. The doc set below
            is being written alongside the tools; nothing here will be an empty tree.
          </p>
        </div>
      </section>

      <Section eyebrow="The plan" title="What's being written">
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title} className="rounded-lg border border-dashed border-hair bg-surface-1/60 p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-medium text-ink-2">{s.title}</h2>
                <span className="eyebrow shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-[0.6rem] text-ink-3">
                  {s.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink-3">
          Need something specific to evaluate the platform today?{' '}
          <Link href="/contact" className="text-brand-cyan hover:underline underline-offset-4">
            Ask us directly
          </Link>{' '}
          - we&apos;ll get you real answers instead of a placeholder page.
        </p>
        <div className="mt-12 max-w-xl">
          <p className="eyebrow mb-4 text-ink-3">Get notified as docs land</p>
          <WaitlistForm />
        </div>
      </Section>
    </>
  )
}
