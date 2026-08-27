import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Accent, Body, DefinitionRow, RowEnd } from '@/components/core/Type'
import { StatCard } from '@/components/lists/Cards'
import { CTA } from '@/lib/site'
import { ENGINES, ORCHESTRATION, COUNTS } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'The platform',
  description:
    'Fifty tools across nine engines, from spec and architecture through physical verification and signoff. Deterministic, local-first, orchestrated from one place.',
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
        chapter={<Eyebrow bracket tone="muted">Chapter - 02</Eyebrow>}
        actions={
          <Button href={CTA.primary.href} variant="solid">
            {CTA.primary.label}
          </Button>
        }
      >
        <Headline level={1}>
          Nine engines,
          <br />
          one shared context
        </Headline>
      </Hero>

      {/* ---------- Orchestration ---------- */}
      <Section
        label="Orchestration"
        title={
          <span className="text-gray-2">
            The layer that <Accent>drives every engine below it</Accent>.
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
            <RowEnd />
          </div>
        </SectionBody>
      </Section>

      {/* ---------- The suite ---------- */}
      <Section
        id="suite"
        label="The suite"
        title={
          <span className="text-gray-2">
            Every tool below is <Accent>written by us</Accent>. All nine engines are complete end to
            end.
          </span>
        }
      >
        <SectionBody>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard value={String(COUNTS.suite)} label="Tools built" />
            <StatCard value={String(COUNTS.engines)} label="Engines" />
            <StatCard value={String(COUNTS.live)} label="Live today" />
          </div>

          <ol className="mt-14">
            {ENGINES.map((engine) => (
              <li
                key={engine.id}
                className="grid gap-4 border-t border-[color:var(--hairline)] py-8 md:grid-cols-[180px_1fr] md:gap-8"
              >
                <div>
                  <Eyebrow tone="muted">Engine {engine.id}</Eyebrow>
                </div>
                <div>
                  <h3 className="display-3 text-off-white">{engine.name}</h3>
                  <p className="mt-2 max-w-[56ch] text-xs text-gray-2">{engine.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {engine.tools.map((tool) => (
                      <li key={tool.name}>
                        <span
                          className="label inline-flex items-center rounded-full border border-[color:var(--hairline)] px-4 py-2 text-gray-2"
                          title={tool.note}
                        >
                          {tool.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <RowEnd />

          <p className="mt-8 max-w-[62ch] text-xs text-gray-2">
            Every tool listed is written and functional. Five are public and demo-able on your own
            machine today; the rest release with the design-partner beta.
          </p>
        </SectionBody>
      </Section>

      {/* ---------- Determinism ---------- */}
      {/* The one light section on the site. In a system with no hue, value
          inversion is the only large move available - spending it once, on the
          claim engineers cared about most, is what keeps the monochrome
          reading as a decision rather than a setting. */}
      <Section
        light
        label="Determinism"
        title="If a rerun is not bit-identical, the result cannot be trusted at signoff"
      >
        <SectionBody>
          <Body light className="max-w-[62ch] text-base">
            This came back from engineers more often than any feature request. A team that cannot
            reproduce a result re-verifies work it has already done, and pays for the same run
            twice.
          </Body>
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
            <RowEnd light />
          </div>
        </SectionBody>
      </Section>
    </>
  )
}
