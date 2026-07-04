import type { Comparison } from '@/lib/tools'

/**
 * Qualitative benchmark table: EasyChip vs. open-source alternative vs.
 * commercial incumbent. The EasyChip column carries a cyan glow rail.
 * Capability comparison - no invented figures.
 */
export default function ComparisonTable({
  comparison,
  toolName,
}: {
  comparison: Comparison
  toolName: string
}) {
  const usCell = 'border-x border-brand-cyan/15 bg-brand-cyan/[0.045] px-5'
  return (
    <div className="overflow-x-auto rounded-lg border border-hair bg-surface-1">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="eyebrow px-5 py-4 text-ink-3">Capability</th>
            <th className={`${usCell} relative py-4`}>
              {/* glow rail cap */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ backgroundImage: 'var(--gradient-text)' }}
              />
              <span className="font-display text-base font-medium text-gradient">{toolName}</span>
            </th>
            <th className="px-5 py-4 font-medium text-ink-2">{comparison.ossName}</th>
            <th className="px-5 py-4 font-medium text-ink-2">{comparison.commercialName}</th>
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((row) => (
            <tr
              key={row.dimension}
              className="border-b border-hair transition-colors last:border-0 hover:bg-surface-2/40"
            >
              <td className="px-5 py-3.5 font-medium text-ink">{row.dimension}</td>
              <td className={`${usCell} py-3.5 font-medium text-brand-cyan`}>{row.easychip}</td>
              <td className="px-5 py-3.5 text-ink-2">{row.oss}</td>
              <td className="px-5 py-3.5 text-ink-2">{row.commercial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
