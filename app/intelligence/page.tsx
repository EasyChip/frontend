import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Accent, Body, DefinitionRow } from '@/components/core/Type'
import { CTA } from '@/lib/site'
import { COUNTS } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Intelligence',
  description:
    'Models attached to every engine in the flow, running on your own hardware. No third-party frontier model ever sees the design.',
  alternates: { canonical: '/intelligence' },
}

const PRINCIPLES = [
  {
    index: '01',
    label: 'Models per tool, not one for all',
    body: 'Each engine has a model trained on its own domain and its own deterministic feedback, so the advice is specific rather than generic.',
  },
  {
    index: '02',
    label: 'Frontier models at the surface only',
    body: 'The CLI uses frontier models for natural-language intent and explanation. Routing, redaction and egress stay under our control.',
  },
  {
    index: '03',
    label: 'Advisory is never signoff',
    body: 'AI output is architecturally separated from deterministic results. It is labelled, it is auditable, and it never enters a CI gate by default.',
  },
]

export default function IntelligencePage() {
  return (
    <>
      <Hero
        media="/media/signal-field-2000.webp"
        priority
        minHeight="min-h-[460px] md:min-h-[520px]"
        top={<NavBar />}
        sub="Models that understand the design, not just the file in front of them."
        chapter={<Eyebrow bracket tone="muted">Chapter — 03</Eyebrow>}
      >
        <Headline level={1}>
          Intelligence that
          <br />
          never sees the cloud
        </Headline>
      </Hero>

      {/* ---------- The guarantee ---------- */}
      <Section
        label="The guarantee"
        title={
          <span className="text-gray-2">
            <Accent>No third-party frontier model ever sees your design.</Accent> The models that
            touch IP are ours, and they run on your hardware.
          </span>
        }
      >
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            IP-sensitive teams will not send RTL to a cloud service, whatever the model behind it.
            That is not a preference we accommodate — it is the precondition the whole architecture
            was built around.
          </Body>
          <Body className="mt-6 max-w-[62ch] text-base">
            Frontier models are used where they are safe to use: at the interface, for
            natural-language intent and explanation. They never receive the design. Everything
            that reads your RTL, constraints, power intent or netlists is proprietary and local.
          </Body>

          <div className="mt-12">
            {PRINCIPLES.map((p) => (
              <DefinitionRow key={p.index} index={p.index} term={p.label}>
                {p.body}
              </DefinitionRow>
            ))}
            <div className="border-t border-[color:var(--hairline)]" />
          </div>
        </SectionBody>
      </Section>

      {/* ---------- Why it works here ---------- */}
      <Section
        label="Why it works"
        title="An assistant bolted onto a text editor sees one file at a time"
      >
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            Ours sits on top of {COUNTS.suite} engines that already produce structured,
            machine-readable context about the design — netlists, clock domains, constraints, power
            intent, timing outcomes. The models act on that context rather than on raw text.
          </Body>
          <p className="mt-10 max-w-[52ch] display-2 text-off-white">
            Every deterministic run is training signal.
          </p>
          <Body className="mt-6 max-w-[62ch]">
            Because the suite is ours end to end, every run produces a labelled, reproducible
            outcome the models can learn from. A wrapper over someone else&rsquo;s software never
            gets that.
          </Body>
        </SectionBody>
      </Section>

      {/* ---------- Status, honestly ---------- */}
      <Section label="Status" title="What is live, and what is not">
        <SectionBody>
          <div>
            <DefinitionRow index="Now" term="The deterministic suite">
              All nine stages, built and functional. The design-partner beta ships deterministic
              only, with no AI in the initial release.
            </DefinitionRow>
            <DefinitionRow index="In build" term="The ML layer">
              The models and the shared context they run on, across the suite. This is the layer
              currently being built.
            </DefinitionRow>
            <div className="border-t border-[color:var(--hairline)]" />
          </div>
          <Body className="mt-10 max-w-[62ch] text-xs">
            We would rather ship a deterministic tool an engineer can trust than an AI feature they
            have to check. The order is deliberate.
          </Body>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={CTA.primary.href} variant="solid">
              {CTA.primary.label}
            </Button>
            <Button href="/platform" variant="outline">
              See the suite
            </Button>
          </div>
        </SectionBody>
      </Section>
    </>
  )
}
