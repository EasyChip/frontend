import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  title?: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
  className?: string
  /** Center the header block */
  center?: boolean
  /** Wider content (e.g. tool grids) */
  wide?: boolean
  /**
   * Heading level for the title. Defaults to h2 because a Section is normally
   * one part of a page. Pages whose entire content is a single Section - the
   * legal pages - pass "h1" so the document outline starts at level 1.
   */
  titleAs?: 'h1' | 'h2'
}

/**
 * Standard page section: the rhythm every page composes from.
 *
 * No eyebrow. A mono kicker restating the section is a label the heading
 * already carries - and 12 pages were using it to announce their own name.
 * Mono stays a brand voice for status, categories, specs and data, where it
 * labels something the reader cannot otherwise know.
 *
 * The header-to-content gap is deliberately smaller than the gap between
 * sections, so a heading reads as attached to its content rather than
 * floating between two of them.
 */
export default function Section({
  id,
  title,
  lede,
  children,
  className,
  center,
  wide,
  titleAs: Heading = 'h2',
}: SectionProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className={cn('mx-auto px-6', wide ? 'max-w-7xl' : 'max-w-6xl')}>
        {(title || lede) && (
          <div className={cn('mb-10 max-w-3xl md:mb-14', center && 'mx-auto text-center')}>
            {title && <Heading className="editorial-title text-4xl md:text-5xl">{title}</Heading>}
            {lede && <p className="mt-5 text-lg font-light leading-relaxed text-ink-2">{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
