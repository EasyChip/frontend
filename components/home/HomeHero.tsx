'use client'

import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BUCKETS, toolsByBucket } from '@/lib/tools'
import { SITE, CTA } from '@/lib/site'
import Button from '@/components/ui/Button'
import CockpitLaptop from '@/components/home/CockpitLaptop'

/** Prism ramp distributed across the five flow stages. */
const STAGE_HUES = ['#00E5EE', '#0196E8', '#4E55FC', '#7C08F5', '#C400FE'] as const

/**
 * Headline words. Exactly one carries the gradient - one word, one ramp,
 * no restart across a wrap. See DESIGN.md > The One Word Rule.
 */
const WORDS: { text: string; gradient: boolean }[] = [
  { text: 'Chip', gradient: false },
  { text: 'Design', gradient: false },
  { text: 'Made', gradient: false },
  { text: 'Simpler', gradient: true },
]

/**
 * The headline renders as real, readable text with no JS involved. The rise
 * comes from @starting-style on `.reveal-word`, whose declared state is the
 * final one - so no-JS, background-tab, and unsupported-browser all show the
 * finished headline rather than an empty box.
 */
function Headline() {
  return (
    <h1 className="editorial mx-auto max-w-4xl text-6xl md:text-display-xl lg:mx-0">
      {WORDS.map((word, i) => (
        // The space between words is a real text node, not a margin, so the
        // headline reads as four words to a screen reader rather than one.
        <span key={word.text}>
          {i > 0 ? ' ' : ''}
          <span className="inline-block overflow-hidden pb-1.5 align-bottom">
            <span
              className={`reveal-word ${word.gradient ? 'text-gradient-full' : ''}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              {word.text}
            </span>
          </span>
        </span>
      ))}
    </h1>
  )
}

/**
 * Home hero. Scroll-exit choreography only: content drifts up and fades over
 * the first ~40% of scroll, the visual dims as the section recedes. Entrance
 * is CSS, deliberately - motion values here would gate first paint on JS.
 */
export default function HomeHero() {
  const reduce = useReducedMotion() ?? false
  const { scrollY } = useScroll()

  const contentOpacity = useTransform(scrollY, [0, 460], [1, 0])
  const contentY = useTransform(scrollY, [0, 460], [0, -32])
  const visualOpacity = useTransform(scrollY, [0, 640], [1, 0.25])

  const contentStyle = reduce ? undefined : { opacity: contentOpacity, y: contentY }
  const visualStyle = reduce ? undefined : { opacity: visualOpacity }

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-16 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-24">
        <motion.div style={contentStyle} className="relative z-10 text-center lg:text-left">
          <Headline />

          <div className="reveal-rise" style={{ transitionDelay: '460ms' }}>
            <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-ink-2 md:text-xl lg:mx-0">
              One platform for everything around signoff - the cockpit above the engines you
              trust, not a replacement for them.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button href={CTA.primary.href} size="lg">
                {CTA.primary.label}
              </Button>
              <Button href={CTA.secondary.href} variant="secondary" size="lg">
                {CTA.secondary.label}
              </Button>
            </div>
            <p className="eyebrow mt-10 text-ink-3">{SITE.tagline}</p>
          </div>
        </motion.div>

        {/* The laptop: the cockpit, shown as a product surface */}
        <motion.div style={visualStyle} className="relative flex items-center justify-center">
          <CockpitLaptop />
        </motion.div>
      </div>

      {/* The flow - five stages on one bus. Each stage carries its own hue from
          the prism ramp, live stages are powered on, one signal travels the
          trace. This is the moat, drawn - so the trace is drawn at every width,
          vertical on small screens and horizontal from lg up. */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <p className="eyebrow mb-10 text-center text-ink-3">
          One flow · <span className="text-ink-2">spec to 3D-IC</span>
        </p>

        <div className="relative">
          {/* vertical trace + traveling signal (below lg) */}
          <div aria-hidden className="absolute bottom-6 left-[1.125rem] top-6 w-px lg:hidden">
            <div
              className="h-full w-px"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,229,238,0.35) 0%, rgba(1,150,232,0.35) 25%, rgba(78,85,252,0.35) 50%, rgba(124,8,245,0.35) 75%, rgba(196,0,254,0.35) 100%)',
              }}
            />
            <span
              className="absolute left-1/2 h-14 w-px -translate-x-1/2 rounded-full"
              style={{
                background: 'linear-gradient(180deg, transparent, #00E5EE)',
                boxShadow: '0 0 14px 1px rgba(0,229,238,0.45)',
                animation: 'signal-y 9s linear infinite',
              }}
            />
          </div>

          {/* horizontal trace + traveling signal (lg and up) */}
          <div aria-hidden className="absolute inset-x-12 top-[1.125rem] hidden lg:block">
            <div
              className="h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(0,229,238,0.35) 10%, rgba(1,150,232,0.35) 30%, rgba(78,85,252,0.35) 50%, rgba(124,8,245,0.35) 72%, rgba(196,0,254,0.35) 90%, transparent 100%)',
              }}
            />
            <span
              className="absolute top-1/2 h-px w-14 -translate-y-1/2 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #00E5EE)',
                boxShadow: '0 0 14px 1px rgba(0,229,238,0.45)',
                animation: 'signal-x 9s linear infinite',
              }}
            />
          </div>

          <div className="relative flex flex-col gap-6 lg:grid lg:grid-cols-5 lg:gap-y-10">
            {BUCKETS.map((bucket, i) => {
              const live = toolsByBucket(bucket.id).filter((t) => t.status === 'live').length
              const hue = STAGE_HUES[i % STAGE_HUES.length]
              return (
                <Link
                  key={bucket.id}
                  href={`/tools#bucket-${bucket.id}`}
                  className="group relative flex items-center gap-4 lg:flex-col lg:gap-3"
                  style={{ '--hue': hue } as React.CSSProperties}
                >
                  {/* via node - ring in the stage hue, LED core when live */}
                  <span
                    aria-hidden
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--hue)_30%,transparent)] bg-void transition-all duration-300 group-hover:border-[color:var(--hue)] group-hover:shadow-[0_0_20px_-4px_var(--hue)]"
                  >
                    {live > 0 ? (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: hue, boxShadow: `0 0 10px 2px ${hue}55` }}
                      />
                    ) : (
                      <span
                        className="h-2 w-2 rounded-full border opacity-70"
                        style={{ borderColor: hue }}
                      />
                    )}
                  </span>

                  <span className="flex flex-1 items-baseline gap-2 lg:flex-none lg:justify-center">
                    <span className="font-mono text-xs text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-light text-ink-2 transition-colors group-hover:text-ink">
                      {bucket.name}
                    </span>
                  </span>

                  <span
                    className="font-mono text-xs uppercase tracking-[0.08em]"
                    style={live > 0 ? { color: hue, opacity: 0.85 } : undefined}
                  >
                    {live > 0 ? (
                      `${live} live`
                    ) : (
                      <span className="text-ink-3">in development</span>
                    )}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
