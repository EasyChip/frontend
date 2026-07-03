import type { Comparison } from '@/lib/tools'

/**
 * Qualitative benchmark table: EasyChip vs. open-source alternative vs.
 * commercial incumbent. Capability comparison — no invented figures.
 */
export default function ComparisonTable({
  comparison,
  toolName,
}: {
  comparison: Comparison
  toolName: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-hair bg-surface-1">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="eyebrow px-5 py-4 text-ink-3">Capability</th>
            <th className="px-5 py-4">
              <span className="font-display text-base font-semibold text-gradient">{toolName}</span>
            </th>
            <th className="px-5 py-4 font-medium text-ink-2">{comparison.ossName}</th>
            <th className="px-5 py-4 font-medium text-ink-2">{comparison.commercialName}</th>
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((row) => (
            <tr key={row.dimension} className="border-b border-hair last:border-0">
              <td className="px-5 py-3.5 font-medium text-ink">{row.dimension}</td>
              <td className="px-5 py-3.5 text-brand-cyan">{row.easychip}</td>
              <td className="px-5 py-3.5 text-ink-2">{row.oss}</td>
              <td className="px-5 py-3.5 text-ink-2">{row.commercial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
