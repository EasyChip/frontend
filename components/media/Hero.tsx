import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroProps {
  /** The statement. Short noun phrase, two lines, no period. */
  children: React.ReactNode
  /** One plain factual sentence. */
  sub?: React.ReactNode
  /** Mono marker anchored bottom-right. Every route carries one, in sequence. */
  chapter?: React.ReactNode
  /** Optional link sitting above the chapter marker, in the same corner. */
  jump?: React.ReactNode
  /** Chrome that sits inside the frame: nav, and the news bar on home. */
  top?: React.ReactNode
  /** Primary action, under the sub-line. */
  actions?: React.ReactNode
  /**
   * Desaturated macro hardware photography. Omit for a plate hero: the same
   * frame, chrome and anchoring, on the raised panel tone. Used where no
   * photograph exists rather than repeating one - the device stays consistent
   * across every route, which is what makes it a signature.
   */
  media?: string
  mediaAlt?: string
  /**
   * Invert the plate to the light ground. Only meaningful without `media` -
   * a photograph carries its own ground. The plate becomes #F2F2F2 and every
   * child that reads the ground (nav, statement, sub, chapter, actions) has to
   * be passed its own light branch by the route; the hero cannot reach into
   * them. Meeting the black section below, the cut is the boundary, so the
   * hairline is dropped.
   */
  light?: boolean
  minHeight?: string
  priority?: boolean
}

/**
 * Full-bleed hero: photography under a top-to-bottom scrim, chrome inside the
 * frame, statement anchored bottom-left, chapter marker bottom-right.
 *
 * The image is the frame's own background, so it bleeds behind the nav and
 * news bar at every width - the chrome sits *on* the photograph, never above
 * a band of empty ground.
 *
 * 20px radius: a full-bleed frame, the largest corner in the system.
 */
export default function Hero({
  children,
  sub,
  chapter,
  jump,
  top,
  actions,
  media,
  mediaAlt = '',
  light = false,
  minHeight = 'min-h-[620px] md:min-h-[680px]',
  priority = false,
}: HeroProps) {
  return (
    <div>
      <section
        className={cn(
          // Edge to edge, no inset and no radius: the photograph is the page's
          // ground for its full width, not a framed picture sitting on it.
          // Inner content still holds the page margin and max width, so the
          // statement stays on the same grid as every section below it.
          'relative isolate flex flex-col overflow-hidden',
          media
            ? 'bg-near-black'
            : light
              ? 'bg-off-white text-black'
              : 'border-b border-[color:var(--hairline)] bg-near-black',
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
                  {sub && (
                    <p
                      className={cn(
                        'text-xs leading-relaxed',
                        light ? 'text-black/70' : 'text-gray-2'
                      )}
                    >
                      {sub}
                    </p>
                  )}
                  {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  {jump}
                  {chapter}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
