'use client'

import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BUCKETS, toolsByBucket } from '@/lib/tools'
import { SITE, CTA } from '@/lib/site'
import Button from '@/components/ui/Button'
import HeroVisual from '@/components/three/HeroVisual'

/** Headline words - last two carry the gradient. */
const WORDS: { text: string; gradient: boolean }[] = [
  { text: 'Chip', gradient: false },
  { text: 'Design', gradient: false },
  { text: 'Made', gradient: true },
  { text: 'Simpler', gradient: true },
]

function StaggeredHeadline({ reduce }: { reduce: boolean }) {
  return (
    <h1
      aria-label="Chip Design Made Simpler"
      className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-display-xl lg:mx-0"
    >
      {WORDS.map((word, i) => (
        <span key={word.text} aria-hidden className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className={`inline-block ${word.gradient ? 'text-gradient-full' : ''} ${i > 0 ? 'ml-[0.28em]' : ''}`}
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

/**
 * Home hero with orchestrated entrance (word-mask headline, deposit-in copy)
 * and a scroll-exit choreography: content drifts up and fades over the first
 * ~40% of scroll, the 3D visual dims as the section recedes.
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
          <motion.p
            className="eyebrow mb-6 text-brand-cyan"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            AI-native EDA platform
          </motion.p>

          <StaggeredHeadline reduce={reduce} />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl lg:mx-0">
              EasyChip consolidates the dozens of secondary EDA tools chip teams juggle into one
              platform - the cockpit above your signoff engines, not a replacement for them.
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
          </motion.div>
        </motion.div>

        {/* The signature: faceted crystal above the die grid */}
        <motion.div style={visualStyle} className="relative h-72 md:h-96 lg:h-[540px]">
          <HeroVisual />
        </motion.div>
      </div>

      {/* Pipeline strip - the journey as a powered bus */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 md:pb-24">
        <div className="relative">
          <div aria-hidden className="absolute inset-x-8 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="h-px w-full bg-hair" />
            <span
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-cyan shadow-[0_0_10px_2px_rgba(0,229,238,0.6)]"
              style={{ animation: 'signal-x 7s linear infinite' }}
            />
          </div>
          <div className="relative flex flex-wrap items-center justify-center gap-2 lg:justify-between">
            {BUCKETS.map((bucket) => {
              const live = toolsByBucket(bucket.id).filter((t) => t.status === 'live').length
              return (
                <Link
                  key={bucket.id}
                  href={`/tools#bucket-${bucket.id}`}
                  className="group relative rounded-md border border-hair bg-surface-1/90 px-5 py-3 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-line hover:bg-surface-2"
                >
                  <span className="flex items-center gap-2">
                    {live > 0 ? (
                      <span aria-hidden className="led-dot" />
                    ) : (
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line" />
                    )}
                    <span className="font-display text-sm font-semibold text-ink">{bucket.name}</span>
                  </span>
                  <span className="eyebrow mt-1 block text-[0.55rem] text-ink-3">
                    {live > 0 ? `${live} live` : 'in development'}
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
