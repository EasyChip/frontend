import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Accent, Body, DefinitionRow } from '@/components/core/Type'
import { StatCard } from '@/components/lists/Cards'
import { CTA } from '@/lib/site'
import { STAGES, ORCHESTRATION, COUNTS, WEDGE } from '@/lib/tools'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'The platform',
  description:
    'Fifty tools across nine stages, from spec and architecture through physical verification and signoff. Deterministic, local-first, orchestrated from one place.',
  alternates: { canonical: '/platform' },
}

const DETERMINISM = [
  { label: 'Bit-identical reruns', body: 'The same input produces the same result, on every machine, every run.' },
  { label: 'Offline signed licences', body: 'No licence server, no daemon, no seat contention.' },
  { label: 'Nothing leaves the network', body: 'Air-gapped teams are fully supported. No telemetry.' },
]

export default function PlatformPage() {
  return (
    <>
      <Hero
        media="/media/wafer-2000.webp"
        priority
        minHeight="min-h-[460px] md:min-h-[520px]"
        top={<NavBar />}
        sub="One suite from spec and architecture through physical verification and signoff."
        chapter={<Eyebrow bracket tone="muted">Chapter — 02</Eyebrow>}
      >
        <Headline level={1}>
          Nine stages,
          <br />
          one shared context
        </Headline>
      </Hero>

      {/* ---------- Orchestration ---------- */}
      <Section
        label="Orchestration"
        title={
          <span className="text-gray-2">
            The layer that <Accent>drives every stage below it</Accent>.
          </span>
        }
      >
        <SectionBody>
          <div>
            {ORCHESTRATION.map((tool) => (
              <DefinitionRow
                key={tool.name}
                index={tool.status === 'live' ? 'Live' : 'Built'}
                term={tool.name}
              >
                {tool.note}
              </DefinitionRow>
            ))}
            <div className="border-t border-[color:var(--hairline)]" />
          </div>
          <Body className="mt-10 max-w-[62ch] text-xs">
            Escanor runs the flow on the customer&rsquo;s own hardware. It is not a cloud service
            with a local option — local is the only mode there is.
          </Body>
        </SectionBody>
      </Section>

      {/* ---------- The suite ---------- */}
      <Section
        id="suite"
        label="The suite"
        title={
          <span className="text-gray-2">
            Every tool below is <Accent>written by us</Accent>. All nine stages are complete end to
            end.
          </span>
        }
      >
        <SectionBody>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard value={String(COUNTS.suite)} label="Tools built" />
            <StatCard value={String(COUNTS.stages)} label="Stages" />
            <StatCard value={String(COUNTS.live)} label="Live today" />
          </div>

          <ol className="mt-14">
            {STAGES.map((stage) => (
              <li
                key={stage.id}
                className="grid gap-4 border-t border-[color:var(--hairline)] py-8 md:grid-cols-[180px_1fr] md:gap-8"
              >
                <div>
                  <Eyebrow tone="muted">Stage {stage.id}</Eyebrow>
                </div>
                <div>
                  <h3 className="display-3 text-off-white">{stage.name}</h3>
                  <p className="mt-2 max-w-[56ch] text-xs text-gray-2">{stage.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {stage.tools.map((tool) => (
                      <li key={tool.name}>
                        <span
                          className={cn(
                            'label inline-flex items-center gap-2 rounded-full border px-4 py-2',
                            tool.status === 'live'
                              ? 'border-transparent bg-white text-black'
                              : 'border-[color:var(--hairline)] text-gray-2'
                          )}
                          title={tool.note}
                        >
                          {tool.name}
                          {tool.status === 'live' && (
                            <span className="normal-case tracking-normal">live</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t border-[color:var(--hairline)]" />

          <p className="mt-8 max-w-[62ch] text-xs text-gray-2">
            Filled marks are live today — public and demo-able on your own machine. The rest are
            written and functional, releasing with the design-partner beta.
          </p>
        </SectionBody>
      </Section>

      {/* ---------- Determinism ---------- */}
      {/* The one light section on the site. In a system with no hue, value
          inversion is the only large move available — spending it once, on the
          claim engineers cared about most, is what keeps the monochrome
          reading as a decision rather than a setting. */}
      <Section
        light
        label="Determinism"
        title="If a rerun is not bit-identical, the result cannot be trusted at signoff"
      >
        <SectionBody>
          <p className="max-w-[62ch] leading-relaxed text-black/70">
            This came back from engineers more often than any feature request. A team that cannot
            reproduce a result re-verifies work it has already done, and pays for the same run
            twice.
          </p>
          <div className="mt-12">
            {DETERMINISM.map((item, i) => (
              <DefinitionRow
                key={item.label}
                light
                index={String(i + 1).padStart(2, '0')}
                term={item.label}
              >
                {item.body}
              </DefinitionRow>
            ))}
            <div className="border-t border-black/12" />
          </div>
        </SectionBody>
      </Section>

      {/* ---------- The wedge ---------- */}
      <Section label="Where teams start" title="One tool, then the tier">
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            A chip team does not swap forty tools in one procurement cycle. It swaps one, discovers
            the rest are already in the same binary, and consolidates from there.
          </Body>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            <StatCard
              index="Phase 01 · Wedge"
              value="$40K"
              label="Per team, per year"
              body={`${WEDGE.tool} plus the Escanor CLI. ${WEDGE.note}`}
            />
            <StatCard
              index="Phase 02 · Bundle"
              value="$50–150K"
              label="Per team, per year"
              body="Fifteen to twenty tools in a single contract. The vendor count for the secondary tier drops from six-plus to one."
            />
            <StatCard
              index="Phase 03 · Full suite"
              value="$100K+"
              label="Per full bundle"
              body="All fifty tools plus the AI layer. Single procurement, single support path."
            />
          </div>

          <div className="mt-10">
            <Button href={CTA.primary.href} variant="solid">
              {CTA.primary.label}
            </Button>
          </div>
        </SectionBody>
      </Section>
    </>
  )
}
