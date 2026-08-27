import { cn } from '@/lib/utils'
import { Eyebrow, Headline } from '@/components/core/Type'

interface SectionProps {
  id?: string
  /** The mono label that names this section in the 180px column. */
  label?: string
  title?: React.ReactNode
  children?: React.ReactNode
  /** Invert to the light ground. Used sparingly, as a hard cut in the scroll. */
  light?: boolean
  className?: string
}

/**
 * The layout signature of the system: a 180px mono label column beside a
 * content column, on every section, with 120px of vertical rhythm.
 *
 * The label is a wayfinding column, not a kicker above the heading — it sits
 * *beside* the statement and names the section the way a margin note names a
 * paragraph. Below 900px the column collapses and the label sits above,
 * because a 180px column has nowhere to go on a phone.
 */
export default function Section({
  id,
  label,
  title,
  children,
  light = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'px-[var(--page-margin)] py-[96px] md:py-[120px]',
        light ? 'bg-off-white text-black' : 'text-off-white',
        className
      )}
    >
      <div className="mx-auto w-full max-w-[var(--page-max)]">
        {(label || title) && (
          <div className="section-grid mb-12 md:mb-14">
            <div>
              {label && <Eyebrow tone={light ? 'inverse' : 'muted'}>{label}</Eyebrow>}
            </div>
            {title && (
              <Headline level={2} inverse={light} className="max-w-[820px]">
                {title}
              </Headline>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/** Content aligned to the section's content column, below a label/title block. */
export function SectionBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('section-grid', className)}>
      <div aria-hidden className="hidden md:block" />
      {/* min-w-0: a grid track sizes to its widest child by default, so an
          overflow-x-auto table inside would widen the page instead of
          scrolling within itself. */}
      <div className="min-w-0">{children}</div>
    </div>
  )
}
