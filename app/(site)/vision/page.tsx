import type { Metadata } from 'next'
import { CTA } from '@/lib/site'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import CtaBand from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Vision - where EasyChip is going',
  description:
    'Silicon should be as easy to create as software. Our direction for AI-native chip design - AI proposes, deterministic engines verify.',
  alternates: { canonical: '/vision' },
}

const direction = [
  {
    phase: 'Today',
    title: 'The live suite deepens',
    body: 'Nine tools live across design, verification, implementation, and the platform layer - with the verification and implementation stages filling in around them.',
    state: 'now' as const,
  },
  {
    phase: 'Next',
    title: 'Spec → GDSII completes',
    body: 'The implementation and signoff stages close the loop: floorplanning through routing, timing, power integrity, and physical verification as one connected flow.',
    state: 'direction' as const,
  },
  {
    phase: 'Then',
    title: 'Beyond the single die',
    body: '3D-IC and advanced packaging join the platform, followed by analog and RF design flows.',
    state: 'direction' as const,
  },
  {
    phase: 'The horizon',
    title: 'Intent to silicon',
    body: 'An AI-native path from what you mean to what gets manufactured - with deterministic verification gating every step.',
    state: 'direction' as const,
  },
]

export default function VisionPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-hair">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,229,238,0.45) 0%, rgba(124,8,245,0.3) 55%, transparent 80%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
          <p className="eyebrow mb-5 text-brand-cyan">Where this is going</p>
          <h1 className="mx-auto max-w-3xl editorial text-5xl md:text-display-l">
            Silicon should be as easy to create <span className="text-gradient">as software.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            The suite is here today. Our direction: an AI-native path from intent to working
            silicon. What follows is direction, not shipped product - we label the difference,
            always.
          </p>
        </div>
      </section>

      {/* ---------- The principle ---------- */}
      <Section eyebrow="The principle" title="AI proposes. Deterministic engines verify." center>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink-2">
            One discipline runs through everything we build: no output is trusted until a
            deterministic engine has checked it. Lint proves the RTL. Formal proves the
            constraints. Timing proves the paths. That discipline is what separates an AI-native
            flow from a chatbot writing Verilog - and it&apos;s non-negotiable at every stage,
            today and at the horizon.
          </p>
        </Reveal>
      </Section>

      {/* ---------- Live demo note (IP-disciplined) ---------- */}
      <section className="border-y border-hair bg-base">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <Reveal>
            <p className="eyebrow text-[#C79BFF]">The demo</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold md:text-3xl">
              We run this live in demos - not on the public internet.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink-2">
              The intent-to-RTL pipeline is real and working - and it&apos;s core IP, so we
              don&apos;t expose it on a public page. Book a demo and we&apos;ll run it on a spec
              you choose, live.
            </p>
            <div className="mt-7">
              <Button href={CTA.primary.href} size="lg">
                See it live - {CTA.primary.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Direction timeline ---------- */}
      <Section
        eyebrow="Direction"
        title="The road, coarsely"
        lede="No dates, no promises dressed as plans - just the order in which the platform grows."
      >
        <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {direction.map((item, i) => (
            <Reveal key={item.phase} delay={i * 0.06}>
              <li className="h-full rounded-lg border border-hair bg-surface-1 p-7">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-brand-cyan">{item.phase}</span>
                  {item.state === 'now' ? (
                    <span className="eyebrow rounded-full bg-brand-cyan/15 px-2.5 py-1 text-[0.6rem] text-brand-cyan">
                      Shipping
                    </span>
                  ) : (
                    <span className="eyebrow rounded-full bg-surface-2 px-2.5 py-1 text-[0.6rem] text-ink-3">
                      Direction
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        headline="Follow the build."
        sub="Early access members hear about every launch first."
        primaryLabel={CTA.secondary.label}
        primaryHref={CTA.secondary.href}
        secondaryLabel={CTA.primary.label}
        secondaryHref={CTA.primary.href}
      />
    </>
  )
}
