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
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className={cn('mx-auto px-6', wide ? 'max-w-7xl' : 'max-w-6xl')}>
        {(eyebrow || title || lede) && (
          <div className={cn('mb-12 max-w-3xl md:mb-16', center && 'mx-auto text-center')}>
            {eyebrow && <p className="eyebrow mb-4 text-brand-cyan">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>}
            {lede && <p className="mt-4 text-lg leading-relaxed text-ink-2">{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
