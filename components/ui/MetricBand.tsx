import CountUp from '@/components/ui/CountUp'

export interface Metric {
  value: string
  label: string
}

/**
 * 3-4 hard numbers, big type (build spec C4.2), counting up on view.
 * Every number must be true-by-derivation or labeled via `caveat`.
 */
export default function MetricBand({ metrics, caveat }: { metrics: Metric[]; caveat?: string }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hair bg-hair md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="relative bg-surface-1 px-6 py-8 text-center">
            {/* measurement tick rail */}
            <div
              aria-hidden
              className="absolute inset-x-6 top-3 h-1 opacity-40"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, var(--color-line) 0 1px, transparent 1px 10px)',
              }}
            />
            <div className="font-display text-4xl font-bold md:text-5xl">
              <CountUp value={m.value} className="text-gradient tabular-nums" />
            </div>
            <div className="eyebrow mt-3 text-ink-3">{m.label}</div>
          </div>
        ))}
      </div>
      {caveat && <p className="mt-3 text-right text-xs text-ink-3">{caveat}</p>}
    </div>
  )
}
