import { cn } from '@/lib/utils'

export type PillStatus = 'live' | 'in-development' | 'roadmap'

const styles: Record<PillStatus, string> = {
  // DESIGN §6 status pills
  live: 'bg-brand-cyan/15 text-brand-cyan',
  'in-development': 'bg-brand-violet/20 text-[#C79BFF]',
  roadmap: 'bg-surface-2 text-ink-3',
}

const labels: Record<PillStatus, string> = {
  live: 'Live',
  'in-development': 'In Development',
  roadmap: 'Roadmap',
}

export default function StatusPill({ status, className }: { status: PillStatus; className?: string }) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem]',
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  )
}
