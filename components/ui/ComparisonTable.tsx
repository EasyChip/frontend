import type { Comparison } from '@/lib/tools'

/**
 * Qualitative benchmark: EasyChip vs. open-source alternative vs. commercial
 * incumbent. Capability comparison - no invented figures.
 *
 * This is the strongest proof artifact on a tool page, so it has to be
 * readable everywhere. Below md it stacks into one card per capability;
 * from md up it is a real table. It no longer forces a 640px horizontal
 * scroller onto phones, and the EasyChip column header is solid ink rather
 * than gradient text - the product name was the least legible thing on it.
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
    <>
      {/* Stacked, below md */}
      <div className="space-y-4 md:hidden">
        {comparison.rows.map((row) => (
          <div key={row.dimension} className="rounded-lg border border-hair bg-surface-1 p-5">
            <p className="font-medium text-ink">{row.dimension}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="relative rounded-md border border-brand-cyan/15 bg-brand-cyan/[0.045] p-3">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-md bg-brand-cyan"
                />
                <dt className="eyebrow text-ink-3">{toolName}</dt>
                <dd className="mt-1 font-medium text-brand-cyan">{row.easychip}</dd>
              </div>
              <div className="px-3">
                <dt className="eyebrow text-ink-3">{comparison.ossName}</dt>
                <dd className="mt-1 text-ink-2">{row.oss}</dd>
              </div>
              <div className="px-3">
                <dt className="eyebrow text-ink-3">{comparison.commercialName}</dt>
                <dd className="mt-1 text-ink-2">{row.commercial}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* Table, md and up */}
      <div className="hidden overflow-x-auto rounded-lg border border-hair bg-surface-1 md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="eyebrow px-5 py-4 text-ink-3">Capability</th>
              <th className={`${usCell} relative py-4`}>
                {/* cyan rail cap - a hairline accent, not a gradient moment */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-cyan" />
                <span className="font-display text-base font-semibold text-ink">{toolName}</span>
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
    </>
  )
}
