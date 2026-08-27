import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Card: #141414 fill, 1px hairline, 10px radius, no shadow.
 * Mono index, mono title, grey body. That is the whole anatomy.
 */
export function StatCard({
  index,
  value,
  label,
  body,
  light = false,
  className,
}: {
  index?: string
  value?: string
  label?: string
  body?: string
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid content-start gap-3.5 rounded-md border px-[22px] pb-[26px] pt-6',
        light ? 'border-black/12 bg-transparent' : 'border-[color:var(--hairline)] bg-near-black',
        className
      )}
    >
      {index && <span className="label-sm text-gray-2">{index}</span>}
      {value && (
        <span className={cn('display-2', light ? 'text-black' : 'text-off-white')}>
          {value}
        </span>
      )}
      {label && (
        <span className={cn('label', light ? 'text-black' : 'text-off-white')}>{label}</span>
      )}
      {body && (
        <span className={cn('text-xs leading-relaxed', light ? 'text-black/70' : 'text-gray-2')}>
          {body}
        </span>
      )}
    </div>
  )
}

/**
 * Hairline-ruled index row: mono meta, title, mono action.
 * Rows tint 3% white on hover — the system's only row feedback.
 */
export function ListRow({
  meta,
  title,
  action,
  href,
  light = false,
}: {
  meta: string
  title: React.ReactNode
  action?: string
  href?: string
  light?: boolean
}) {
  const inner = (
    <>
      <span
        className={cn(
          'meta whitespace-nowrap uppercase',
          light ? 'text-black/65' : 'text-gray-2'
        )}
      >
        {meta}
      </span>
      <span className={cn('font-medium', light ? 'text-black' : 'text-off-white')}>{title}</span>
      {action && (
        <span
          className={cn(
            'label whitespace-nowrap transition-colors duration-[120ms] ease-[var(--ease-out)]',
            light ? 'text-black/65 group-hover:text-black' : 'text-gray-2 group-hover:text-white'
          )}
        >
          {action} ↗
        </span>
      )}
    </>
  )

  const classes = cn(
    'group grid items-baseline gap-6 border-t py-5 transition-colors duration-[120ms] ease-[var(--ease-out)]',
    'grid-cols-1 md:grid-cols-[180px_1fr_auto]',
    light
      ? 'border-black/12 hover:bg-black/[0.03]'
      : 'border-[color:var(--hairline)] hover:bg-white/[0.03]'
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    )
  }
  return <div className={classes}>{inner}</div>
}

/**
 * Comparison row for the before/after table. Two columns of plain fact,
 * with the EasyChip side lifted to white — emphasis by brightness.
 */
export function CompareRow({
  dimension,
  today,
  withEasyChip,
}: {
  dimension: string
  today: string
  withEasyChip: string
}) {
  return (
    <div className="grid gap-4 border-t border-[color:var(--hairline)] py-6 md:grid-cols-[180px_1fr_1fr] md:gap-8">
      <span className="label text-gray-2">{dimension}</span>
      <span className="text-xs leading-relaxed text-gray-2">{today}</span>
      <span className="text-xs leading-relaxed text-white">{withEasyChip}</span>
    </div>
  )
}
