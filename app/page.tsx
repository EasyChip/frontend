import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import NewsBar from '@/components/chrome/NewsBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Accent, Body, DefinitionRow } from '@/components/core/Type'
import { StatCard, CompareRow } from '@/components/lists/Cards'
import { SITE, CTA, NEWS } from '@/lib/site'
import { COUNTS, STAGES } from '@/lib/tools'

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.descriptor}`,
  description: SITE.description,
  alternates: { canonical: '/' },
}

/** What the handoffs actually cost, from the architecture record. */
const HANDOFF_LOSS = [
  {
    index: '01',
    label: 'Context is rebuilt, not carried',
    body: 'Constraints, clock intent and waivers are re-authored by hand at each stage, because nothing downstream can read what the last tool knew.',
  },
  {
    index: '02',
    label: 'Failures point backwards, slowly',
    body: 'A timing or CDC violation found late tells you a rule was broken. It does not tell you which decision, six weeks earlier, broke it.',
  },
  {
    index: '03',
    label: 'Results are not reproducible',
    body: 'Re-running the same flow on a different machine can produce a different answer, so teams re-verify work they have already done.',
  },
]

const CHANGES = [
  {
    dimension: 'Vendors',
    today: 'Six to ten for the secondary tier, each with its own contract, format and support path.',
    with: 'One.',
  },
  {
    dimension: 'Tools maintained',
    today: 'Around forty.',
    with: 'Around fifteen.',
  },
  {
    dimension: 'Licensing',
    today: 'Licence servers, seat contention, daemons that fail at 2 a.m.',
    with: 'Offline signed licences. No daemon.',
  },
  {
    dimension: 'Handoffs',
    today: 'Manual. Constraints and intent re-authored at each boundary.',
    with: 'Orchestrated. Context carried across all nine stages.',
  },
  {
    dimension: 'Reproducibility',
    today: 'Machine-dependent. Teams re-verify work already done.',
    with: 'Bit-identical, run to run.',
  },
  {
    dimension: 'Where the design lives',
    today: 'Increasingly, someone else’s cloud.',
    with: 'The customer’s own machine. Air-gap supported.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero
        media="/media/chip-macro-2000.webp"
        priority
        top={
          <>
            <NavBar />
            <NewsBar href={NEWS.href}>{NEWS.message}</NewsBar>
          </>
        }
        sub="Fifty tools across all nine stages of chip design, built in-house and run from one place."
        chapter={<Eyebrow bracket tone="muted">Chapter — 01</Eyebrow>}
        actions={
          <>
            <Button href={CTA.primary.href} variant="solid">
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="outline">
              {CTA.secondary.label}
            </Button>
          </>
        }
      >
        <Headline level={1}>
          The tools chip design
          <br />
          actually runs on
        </Headline>
      </Hero>

      {/* ---------- The problem ---------- */}
      <Section
        label="The problem"
        title={
          <span className="text-gray-2">
            A chip takes twelve to twenty-four months.{' '}
            <Accent>Very little of that is design.</Accent>
          </span>
        }
      >
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            Engineering time goes into moving data between tools that were never built to talk to
            each other, rebuilding context the last stage already had, and waiting on licence
            servers. A single team runs dozens of point tools from six to ten vendors, each with
            its own formats, scripts and failure modes.
          </Body>
          <p className="mt-8 max-w-[62ch] display-3 text-off-white">
            The bottleneck is not the silicon. It is the toolchain around it.
          </p>

          <div className="mt-14">
            {HANDOFF_LOSS.map((item) => (
              <DefinitionRow key={item.index} index={item.index} term={item.label}>
                {item.body}
              </DefinitionRow>
            ))}
            <div className="border-t border-[color:var(--hairline)]" />
          </div>

          <p className="mt-10 text-xs text-gray-2">
            Fix the handoffs and you do not save a step. You save the loop.
          </p>
        </SectionBody>
      </Section>

      {/* ---------- The suite ---------- */}
      <Section
        label="What we built"
        title={
          <span className="text-gray-2">
            One platform. <Accent>Fifty tools.</Accent> One shared context.
          </span>
        }
      >
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            EasyChip replaces the secondary tier of chip design — every tool that is not a core
            signoff engine — with a single suite written end to end, orchestrated from one place,
            with proprietary models attached to every stage of it.
          </Body>

          <div className="mt-14">
            <DefinitionRow index="01" term="We own the engines">
              {COUNTS.suite} tools built in-house across all {COUNTS.stages} stages, not wrappers
              over someone else&rsquo;s software. Deterministic by default.
            </DefinitionRow>
            <DefinitionRow index="02" term="One orchestration layer">
              Escanor drives the whole flow from the customer&rsquo;s own machine. FlowBit manages
              the flow graph, Silicrate manages PDKs and IP.
            </DefinitionRow>
            <DefinitionRow index="03" term="AI across every stage">
              Proprietary models read the structured context the tools emit, so the assistant
              understands the design, not just the file in front of it.
            </DefinitionRow>
            <div className="border-t border-[color:var(--hairline)]" />
          </div>

          <div className="mt-14 border-t border-[color:var(--hairline)] pt-10">
            <p className="max-w-[52ch] display-2 text-off-white">{SITE.positioning}</p>
            <Body className="mt-6 max-w-[62ch]">
              We are not trying to displace the core signoff engines. We are taking the forty tools
              around them — the ones nobody consolidated, nobody modernised and nobody put AI into
              — and making them one product.
            </Body>
            <div className="mt-8">
              <Button href="/platform" arrow>
                See all nine stages
              </Button>
            </div>
          </div>
        </SectionBody>
      </Section>

      {/* ---------- What changes ---------- */}
      <Section label="What changes" title="The same design, without the tax around it">
        <SectionBody>
          <div className="grid gap-4 pb-2 md:grid-cols-[180px_1fr_1fr] md:gap-8">
            <span />
            <Eyebrow tone="muted">Today</Eyebrow>
            <Eyebrow tone="body">With EasyChip</Eyebrow>
          </div>
          {CHANGES.map((row) => (
            <CompareRow
              key={row.dimension}
              dimension={row.dimension}
              today={row.today}
              withEasyChip={row.with}
            />
          ))}
          <div className="border-t border-[color:var(--hairline)]" />
          <p className="mt-10 max-w-[62ch] text-xs text-gray-2">
            None of this is a faster simulator. It is the removal of everything between one design
            decision and the next.
          </p>
        </SectionBody>
      </Section>

      {/* ---------- Where we are ---------- */}
      <Section
        label="Where we are"
        title={
          <span className="text-gray-2">
            The suite is built. <Accent>We are hardening it for delivery.</Accent>
          </span>
        }
      >
        <SectionBody>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard value={String(COUNTS.suite)} label="Tools built" body="Across nine stages." />
            <StatCard value={String(COUNTS.stages)} label="Stages complete" body="End to end." />
            <StatCard value="41" label="Engineers surveyed" body="CAD/EDA and RTL design roles." />
            <StatCard
              value={String(COUNTS.live)}
              label="Live today"
              body="Public and demo-able on your own machine."
            />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <Eyebrow tone="body">Shipped</Eyebrow>
              <Body className="mt-4 text-xs">
                Every tool in the end-to-end suite is written and functional. Escanor, FlowBit,
                LintBit, RegMap and VisUPF are live today.
              </Body>
            </div>
            <div>
              <Eyebrow tone="muted">In build</Eyebrow>
              <Body className="mt-4 text-xs">
                Packaging and distribution — Apptainer images, offline signed licences,
                reproducible builds — and the ML layer across the suite.
              </Body>
            </div>
            <div>
              <Eyebrow tone="muted">Next</Eyebrow>
              <Body className="mt-4 text-xs">
                First beta to design partners, deterministic only, with no AI in the initial
                release.
              </Body>
            </div>
          </div>
        </SectionBody>
      </Section>

      {/* ---------- Close ---------- */}
      <Section label="Talk to us" title="Demos run on your machine, against your own RTL">
        <SectionBody>
          <Body className="max-w-[58ch] text-base">
            Nothing is uploaded. That is what makes the first meeting possible at all.
          </Body>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={CTA.primary.href} variant="solid">
              {CTA.primary.label}
            </Button>
            <Button href="/intelligence" variant="outline">
              How the AI layer works
            </Button>
          </div>
        </SectionBody>
      </Section>
    </>
  )
}
