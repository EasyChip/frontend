import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
  className?: string
  /** Center the header block */
  center?: boolean
  /** Wider content (e.g. tool grids) */
  wide?: boolean
}

/** Standard page section: consistent rhythm (build spec §C, DESIGN §6). */
export default function Section({ id, eyebrow, title, lede, children, className, center, wide }: SectionProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className={cn('mx-auto px-6', wide ? 'max-w-7xl' : 'max-w-6xl')}>
        {(eyebrow || title || lede) && (
          <div className={cn('mb-14 max-w-3xl md:mb-20', center && 'mx-auto text-center')}>
            {eyebrow && <p className="eyebrow mb-4 text-ink-3">{eyebrow}</p>}
            {title && <h2 className="editorial text-4xl md:text-5xl">{title}</h2>}
            {lede && <p className="mt-5 text-lg font-light leading-relaxed text-ink-2">{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
