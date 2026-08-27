import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LIVE, getTool, getBucket, type BucketId } from '@/lib/tools'
import { SITE, CTA, VISUPF_DOWNLOAD } from '@/lib/site'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import StatusPill from '@/components/ui/StatusPill'
import ComparisonTable from '@/components/ui/ComparisonTable'
import CtaBand from '@/components/ui/CtaBand'
import Reveal from '@/components/ui/Reveal'
import { LiveToolCard } from '@/components/ui/ToolCard'
import { Download } from 'lucide-react'

export function generateStaticParams() {
  return LIVE.map((tool) => ({ slug: tool.slug! }))
}

export async function generateMetadata(props: PageProps<'/tools/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const tool = getTool(slug)
  if (!tool) return {}
  return {
    title: `${tool.name} - ${tool.category}`,
    description: tool.tagline,
    alternates: { canonical: `/tools/${tool.slug}` },
  }
}

export default async function ToolPage(props: PageProps<'/tools/[slug]'>) {
  const { slug } = await props.params
  const tool = getTool(slug)
  if (!tool) notFound()

  const bucket = tool.bucket !== 'platform' ? getBucket(tool.bucket as BucketId) : null
  const related = (tool.related ?? [])
    .map((s) => getTool(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: `EDA - ${tool.category}`,
    operatingSystem: 'Windows, Linux, macOS',
    description: tool.tagline,
    url: `${SITE.url}/tools/${tool.slug}`,
    publisher: { '@type': 'Organization', name: 'EasyChip', url: SITE.url },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-hair">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-24">
          <div className="flex items-center gap-3">
            <p className="eyebrow text-ink-3">{tool.category}</p>
            <StatusPill status="live" />
          </div>
          <h1 className="mt-4 editorial text-5xl md:text-display-l">{tool.name}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-2">{tool.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {tool.openSource ? (
              VISUPF_DOWNLOAD ? (
                <Button href={VISUPF_DOWNLOAD} size="lg">
                  <Download size={18} /> Download - free &amp; open source
                </Button>
              ) : (
                <Button href="#get-it" size="lg">
                  <Download size={18} /> Get {tool.name}
                </Button>
              )
            ) : (
              <Button href={CTA.primary.href} size="lg">
                {CTA.primary.label}
              </Button>
            )}
            <Button href="/tools" variant="secondary" size="lg">
              All tools
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- The problem it removes ---------- */}
      <Section title="The problem it removes">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-2">{tool.problem}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink">{tool.description}</p>
        </Reveal>
      </Section>

      {/* ---------- Capabilities ---------- */}
      <Section title="Capabilities" className="border-t border-hair bg-base">
        <div className="grid gap-5 md:grid-cols-2">
          {tool.capabilities?.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <div className="h-full rounded-lg border border-hair bg-surface-1 p-7">
                <h3 className="font-display text-lg font-medium text-ink">{cap.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{cap.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Benchmark comparison ---------- */}
      {tool.comparison && (
        <Section
          title={
            <>
              {tool.name} vs. the field
            </>
          }
          lede="Where this tool stands against the open-source path and the commercial incumbents - capability by capability."
        >
          <Reveal>
            <ComparisonTable comparison={tool.comparison} toolName={tool.name} />
            <p className="mt-3 text-xs text-ink-3">
              Qualitative capability comparison based on publicly documented behavior of the referenced
              tools. No performance figures are implied.
            </p>
          </Reveal>
        </Section>
      )}

      {/* ---------- Spec strip ---------- */}
      <section className="border-y border-hair bg-base">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {tool.specs?.map((spec) => (
                <span key={spec} className="eyebrow rounded-full bg-surface-2 px-3 py-1.5 text-xs text-ink-2">
                  {spec}
                </span>
              ))}
            </div>
            {tool.engines && tool.engines.length > 0 && (
              <p className="shrink-0 text-sm text-ink-3">
                Built on proven engines:{' '}
                <span className="font-medium text-ink-2">{tool.engines.join(' · ')}</span>
              </p>
            )}
          </div>
          {bucket && (
            <p className="mt-6 text-sm text-ink-3">
              Where it sits: stage{' '}
              <span className="font-medium text-ink-2">{tool.stage}</span> in the{' '}
              <Link
                href={`/tools#bucket-${bucket.id}`}
                className="font-medium text-brand-cyan hover:underline underline-offset-4"
              >
                {String(bucket.order).padStart(2, '0')} {bucket.name}
              </Link>{' '}
              bucket - one node in the platform flow.
            </p>
          )}
        </div>
      </section>

      {/* ---------- Open-source get-it block (VisUPF) ---------- */}
      {tool.openSource && (
        <Section id="get-it" title={`Get ${tool.name}`}>
          <Reveal>
            <div className="rounded-lg border border-brand-cyan/25 bg-surface-1 p-8">
              {VISUPF_DOWNLOAD ? (
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg text-ink">
                      {tool.name} is free and open source. Download it, run it locally, inspect what it
                      does with your design data.
                    </p>
                    {tool.openSource.license && (
                      <p className="mt-2 text-sm text-ink-3">License: {tool.openSource.license}</p>
                    )}
                  </div>
                  <Button href={VISUPF_DOWNLOAD} size="lg" className="shrink-0">
                    <Download size={18} /> Download {tool.name}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg text-ink">
                      {tool.name} is going open source - the release package is being finalized right now.
                    </p>
                    <p className="mt-2 text-sm text-ink-2">
                      Want it the moment it drops? Join early access and we&apos;ll email you the download
                      link.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <Button href={CTA.secondary.href} size="lg">
                      {CTA.secondary.label}
                    </Button>
                    <Button href="https://github.com/EasyChip" variant="secondary" size="lg">
                      GitHub
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ---------- Related tools ---------- */}
      {related.length > 0 && (
        <Section title="Related tools" className="border-t border-hair bg-base">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <LiveToolCard key={r.id} tool={r} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        headline={`See ${tool.name} on your designs.`}
        sub="Book a demo, or get early access to the platform."
      />
    </>
  )
}
