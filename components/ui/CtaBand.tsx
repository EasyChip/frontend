import Button from '@/components/ui/Button'
import { CTA } from '@/lib/site'

interface CtaBandProps {
  headline?: string
  sub?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

/** Full-width closer - ends every page (build spec C4.6). */
export default function CtaBand({
  headline = 'Stop stitching your toolchain together.',
  sub = 'See the platform, or run it on your own infrastructure.',
  primaryLabel = CTA.primary.label,
  primaryHref = CTA.primary.href,
  secondaryLabel = CTA.secondary.label,
  secondaryHref = CTA.secondary.href,
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-t border-hair bg-base">
      {/* drifting chevron light streak - ambient, one per view */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-40 opacity-[0.06]"
        style={{
          backgroundImage: 'var(--gradient-brand)',
          animation: 'streak-drift 14s linear infinite',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold md:text-4xl">
          {headline}
        </h2>
        {sub && <p className="mx-auto mt-4 max-w-xl text-lg text-ink-2">{sub}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={primaryHref} size="lg">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="secondary" size="lg">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
