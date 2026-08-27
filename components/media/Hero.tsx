import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroProps {
  /** The statement. Short noun phrase, two lines, no period. */
  children: React.ReactNode
  /** One plain factual sentence. */
  sub?: React.ReactNode
  /** Mono marker anchored bottom-right. Every route carries one, in sequence. */
  chapter?: React.ReactNode
  /** Chrome that sits inside the frame: nav, and the news bar on home. */
  top?: React.ReactNode
  /** Primary action, under the sub-line. */
  actions?: React.ReactNode
  /**
   * Desaturated macro hardware photography. Omit for a plate hero: the same
   * frame, chrome and anchoring, on the raised panel tone. Used where no
   * photograph exists rather than repeating one — the device stays consistent
   * across every route, which is what makes it a signature.
   */
  media?: string
  mediaAlt?: string
  minHeight?: string
  priority?: boolean
}

/**
 * Full-bleed hero: photography under a top-to-bottom scrim, chrome inside the
 * frame, statement anchored bottom-left, chapter marker bottom-right.
 *
 * The image is the frame's own background, so it bleeds behind the nav and
 * news bar at every width — the chrome sits *on* the photograph, never above
 * a band of empty ground.
 *
 * 20px radius: a full-bleed frame, the largest corner in the system.
 */
export default function Hero({
  children,
  sub,
  chapter,
  top,
  actions,
  media,
  mediaAlt = '',
  minHeight = 'min-h-[620px] md:min-h-[680px]',
  priority = false,
}: HeroProps) {
  return (
    <div className="px-[var(--page-margin)] pt-3">
      <section
        className={cn(
          'relative isolate flex flex-col overflow-hidden rounded-lg',
          media ? 'bg-near-black' : 'border border-[color:var(--hairline)] bg-near-black',
          minHeight
        )}
      >
        {media && (
          <div aria-hidden className="absolute inset-0 -z-10">
            <Image
              src={media}
              alt={mediaAlt}
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover"
            />
            <div className="scrim absolute inset-0" />
          </div>
        )}

        {top}

        <div className="flex-1" />

        <div className="px-[var(--page-margin)] pb-11">
          <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-wrap items-end gap-10">
            <div className="min-w-[280px] flex-1">
              {children}

              <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
                <div className="max-w-[380px]">
                  {sub && <p className="text-xs leading-relaxed text-gray-2">{sub}</p>}
                  {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
                </div>
                {chapter}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
