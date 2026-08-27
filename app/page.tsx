import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Accent, Body, DefinitionRow, RowEnd } from '@/components/core/Type'
import { StatCard } from '@/components/lists/Cards'
import { SITE, CTA } from '@/lib/site'
import { COUNTS, ENGINES } from '@/lib/tools'

export const metadata: Metadata = {
  title: `${SITE.name} - ${SITE.descriptor}`,
  description: SITE.description,
  alternates: { canonical: '/' },
}

/** What the handoffs actually cost, from the architecture record. */
const HANDOFF_LOSS = [
  {
    index: '01',
    label: 'Context is rebuilt, not carried',
    body: 'Constraints, clock intent and waivers are re-authored by hand at each engine, because nothing downstream can read what the last tool knew.',
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

/**
 * The section's argument is reduction, so the data carries the transition
 * itself - a short "from" and "to" that can be set at display scale - with
 * the prose demoted to support underneath. Written as a paragraph pair, the
 * quantities that make the argument were buried at 12px.
 */
const CHANGES = [
  {
    dimension: 'Vendors',
    from: 'Six to ten',
    fromNote: 'Each with its own contract, format and support path.',
    to: 'One',
    toNote: 'One contract, one format, one support path.',
  },
  {
    dimension: 'Tools maintained',
    from: 'Around forty',
    to: 'Around fifteen',
    toNote: 'The rest arrive in the same binary.',
  },
  {
    dimension: 'Licensing',
    from: 'Licence servers',
    fromNote: 'Seat contention, and daemons that fail at 2 a.m.',
    to: 'Offline signed',
    toNote: 'No daemon, no checkout wait.',
  },
  {
    dimension: 'Handoffs',
    from: 'Manual',
    fromNote: 'Constraints and intent re-authored at every boundary.',
    to: 'Orchestrated',
    toNote: 'Context carried across all nine engines.',
  },
  {
    dimension: 'Reproducibility',
    from: 'Machine-dependent',
    fromNote: 'Teams re-verify work they have already done.',
    to: 'Bit-identical',
    toNote: 'Run to run, machine to machine.',
  },
  {
    dimension: 'Where the design lives',
    from: 'Someone else’s cloud',
    fromNote: 'Azure / AWS / custom servers.',
    to: 'Your own machine',
    toNote: 'Air-gapped teams fully supported.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero
        media="/media/chip-macro-2000.webp"
        priority
        top={<NavBar />}
        sub={
          <span className="label text-gray-3">9 Engines, 50 Tools, 1 Orchestrator</span>
        }
        jump={
          <Button href="/platform#suite" arrow>
            See the full suite
          </Button>
        }
        chapter={<Eyebrow bracket tone="muted">Chapter - 01</Eyebrow>}
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
          Prompt In
          <br />
          Silicon Out
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
            each other, rebuilding context the previous engine already had, and waiting on licence
            servers. A single team runs dozens of point tools from six to ten vendors, each with
            its own formats, scripts and failure modes.
          </Body>
          <p className="mt-8 max-w-[62ch] display-3 text-off-white">
            The bottleneck is not the silicon. It is the toolchain around it.
          </p>

          <div className="mt-14">
            {/* Names the list below, so it is a label rather than a kicker
                above a heading. The utility uppercases it. */}
            <Eyebrow tone="muted">Problems faced by engineers daily</Eyebrow>

            <div className="mt-7">
              {HANDOFF_LOSS.map((item) => (
                <DefinitionRow key={item.index} index={item.index} term={item.label}>
                  {item.body}
                </DefinitionRow>
              ))}
              <RowEnd />
            </div>
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
            EasyChip replaces the secondary tier of chip design - every tool that is not a core
            signoff engine - with a single suite written end to end, orchestrated from one place,
            with proprietary models attached to every engine of it.
          </Body>

          <div className="mt-14">
            <DefinitionRow index="01" term="We own the engines">
              {/* Template literal, not JSX text: a text node that wraps to the
                  next line loses its leading space, which ran "9" into
                  "engines". Interpolation keeps the spacing explicit. */}
              {`${COUNTS.suite} tools built in-house across all ${COUNTS.engines} engines, not wrappers over someone else’s software. Deterministic by default.`}
            </DefinitionRow>
            <DefinitionRow index="02" term="One orchestration layer">
              Escanor drives the whole flow from the customer&rsquo;s own machine. FlowBit manages
              the flow graph, Silicrate manages PDKs and IP.
            </DefinitionRow>
            <DefinitionRow index="03" term="AI across every engine">
              Proprietary models read the structured context the tools emit, so the assistant
              understands the design, not just the file in front of it.
            </DefinitionRow>
            <RowEnd />
          </div>
        </SectionBody>
      </Section>

      {/* ---------- What changes ----------
          One label column, not two. The nested 180px column pushed every row
          to a 360px indent and left the right third empty; the row's own
          dimension now sits in the section's column, and the from/to pair
          takes the full measure. */}
      <Section label="What changes" title="The same design, without the tax around it">
        <SectionBody>
          <div className="hidden gap-16 pb-3 md:grid md:grid-cols-2">
            <Eyebrow tone="muted">Today</Eyebrow>
            <Eyebrow tone="body">With EasyChip</Eyebrow>
          </div>

          {CHANGES.map((row) => (
            <ChangeRow key={row.dimension} {...row} />
          ))}
          <RowEnd />
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
            <StatCard value={String(COUNTS.suite)} label="Tools built" body="Across nine engines." />
            <StatCard value={String(COUNTS.engines)} label="Engines complete" body="End to end." />
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
                Packaging and distribution - Apptainer images, offline signed licences,
                reproducible builds - and the ML layer across the suite.
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

/**
 * One change, read as a transition rather than a table row.
 *
 * The "from" state sits at display scale in secondary, the "to" state at the
 * same scale in white. That brightness step is the whole device - no arrow,
 * no connector: a rule drawn between them only restated what the tonal shift
 * already says, and read as decoration. Support prose sits underneath so the
 * pair stays the thing you read first.
 */
function ChangeRow({
  dimension,
  from,
  fromNote,
  to,
  toNote,
}: {
  dimension: string
  from: string
  fromNote?: string
  to: string
  toNote?: string
}) {
  return (
    <div className="border-t border-[color:var(--hairline)] py-8">
      <p className="label text-gray-2">{dimension}</p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-baseline md:gap-16">
        <div>
          <p className="display-3 text-gray-2">{from}</p>
          {fromNote && (
            <p className="mt-2 max-w-[38ch] text-xs leading-relaxed text-gray-2">{fromNote}</p>
          )}
        </div>

        <div>
          <p className="display-3 text-white">{to}</p>
          {toNote && (
            <p className="mt-2 max-w-[38ch] text-xs leading-relaxed text-gray-3">{toNote}</p>
          )}
        </div>
      </div>
    </div>
  )
}
