import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import VideoWindow from '@/components/media/VideoWindow'
import { Eyebrow, Headline, Accent, Body, DefinitionRow, RowEnd } from '@/components/core/Type'
import { CTA } from '@/lib/site'
import { COUNTS } from '@/lib/tools'
import { FEATURES, FEATURE_WINDOW_TITLE } from '@/lib/features'

export const metadata: Metadata = {
  title: 'Intelligence',
  description:
    'Models attached to every engine in the flow, running on your own hardware. No third-party frontier model ever sees the design.',
  alternates: { canonical: '/intelligence' },
}

export default function IntelligencePage() {
  return (
    <>
      {/* The IP guarantee moved here from the light band below, which now
          carries the feature story instead. It is a cleared brand commitment in
          PRODUCT.md and it appeared nowhere else in visible copy, so letting it
          go with the section it lived in would have deleted it from the site. */}
      <Hero
        media="/media/signal-field-2000.webp"
        priority
        minHeight="min-h-[460px] md:min-h-[520px]"
        top={<NavBar />}
        sub="No third-party frontier model ever sees your design. The models that touch IP are ours, and they run on your hardware."
        chapter={<Eyebrow bracket tone="muted">Chapter - 03</Eyebrow>}
      >
        <Headline level={1}>
          Intelligence on
          <br />
          your local server
        </Headline>
      </Hero>

      {/* ---------- The features ----------
          The second of the site's two light sections. The rule is semantic,
          not positional: the inverted band carries the page's central claim.
          On /platform that is determinism; here it is what the orchestrator
          actually removes from an engineer's day, and each claim is answered by
          a recording of the session that backs it.

          Ordered the way the films are, which is the order the work happens.
          Numbering is legitimate here for the reason it usually is not: this is
          one design carried end to end, not five features dressed as a sequence.

          The windows are still, not autoplaying. One loop on the home hero draws
          the eye; five on one page is noise, and each of these is a minute of
          real content that deserves the theater rather than a muted loop. Nothing
          is fetched until a window is clicked. */}
      <Section
        light
        label="The features"
        title={
          <span className="text-black/60">
            Where the orchestrator <Accent inverse>saves you time</Accent>
          </span>
        }
      >
        <SectionBody>
          <Body light className="max-w-[62ch] text-base">
            Five parts of one run, in the order they happen. One design, the tinytapeout regfile on
            sky130hd, carried from a brief through to a closed formal proof. Each claim below is
            answered by a recording of the session that earned it.
          </Body>

          {/* One gutter, not two. SectionBody already spends 180px + 32px on the
              section's own label column, and putting the index in a second one
              inside it pushed the prose to x=467 of a 1536 viewport: thirty per
              cent of the screen was indent, and the column that was left ran two
              hundred pixels shorter than the window beside it. The numeral now
              sits beside the claim on one baseline - beside, not stacked above,
              which is the one thing both DESIGN.md and the craft floor refuse -
              and the row spends the width it recovers on the window.

              items-center, because a claim and a 16:9 frame are different heights
              and top-aligning them hangs the prose off the ceiling. */}
          <ol className="mt-14">
            {FEATURES.map((feature) => (
              <li
                key={feature.index}
                className="grid gap-10 border-t border-black/12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14"
              >
                <div>
                  <div className="flex items-baseline gap-4">
                    {/* black/45 on #F2F2F2 measures ~5.4:1. It reads as an
                        enumerator rather than a second heading, which is the
                        whole job: the claim beside it has to stay the thing you
                        read first. */}
                    <span className="label-sm shrink-0 text-black/45">{feature.index}</span>
                    <h3 className="display-3 text-black">{feature.claim}</h3>
                  </div>

                  <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-black/70">
                    {feature.lead}
                  </p>
                  <p className="mt-5 max-w-[46ch] leading-relaxed text-black/70">{feature.body}</p>

                  {/* The run's own numbers, on a rule rather than in boxes. Three
                      cards here would be the card kit doing what proximity and a
                      hairline already do. */}
                  <dl className="mt-9 grid grid-cols-3 gap-x-6 gap-y-5 border-t border-black/12 pt-6">
                    {feature.evidence.map((item) => (
                      <div key={item.label}>
                        <dt className="display-3 text-black">{item.figure}</dt>
                        <dd className="label-sm mt-1 text-black/55">{item.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <VideoWindow
                  light
                  src={feature.video}
                  poster={feature.poster}
                  title={FEATURE_WINDOW_TITLE}
                  duration={feature.duration}
                  label={feature.label}
                  caption="Watch the run"
                />
              </li>
            ))}
          </ol>
          <RowEnd light />
        </SectionBody>
      </Section>

      {/* ---------- Why it works here ---------- */}
      <Section
        label="Why it works"
        title="An assistant bolted onto a text editor sees one file at a time"
      >
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            Ours sits on top of {COUNTS.suite} tools that already produce structured,
            machine-readable context about the design - netlists, clock domains, constraints, power
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
              All nine engines, built and functional. The design-partner beta ships deterministic
              only, with no AI in the initial release.
            </DefinitionRow>
            <DefinitionRow index="In build" term="The ML layer">
              The models and the shared context they run on, across the suite. This is the layer
              currently being built.
            </DefinitionRow>
            <RowEnd />
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
