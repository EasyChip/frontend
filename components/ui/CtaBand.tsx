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
      {/* No ambient streak. It ran on 14 pages, spent a gradient moment before
          the page had drawn one, and at desktop read as banding rather than
          light. The band earns its weight from the tonal step and the hairline. */}
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <h2 className="editorial-title mx-auto max-w-2xl text-4xl md:text-5xl">
          {headline}
        </h2>
        {sub && <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink-2">{sub}</p>}
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
