import Link from 'next/link'
import { BUCKETS, toolsByBucket, TOOL_COUNTS } from '@/lib/tools'
import { WRAPPED_ENGINES } from '@/lib/faq'

/**
 * The consolidation map - the flagship diagram.
 *
 * Every quantity here is read from the tool registry, not drawn by hand: the
 * width of a stage is its share of the platform, and the lit portion of its
 * meter is how much of that stage is live today. A stage carrying twelve tools
 * is visibly larger than one carrying three, and a stage with nothing live
 * reads as unlit. Five identical rounded rectangles could not say any of that.
 *
 * Faceted geometry, one prism hue per stage, hairline structure. The argument
 * is the shape: one cockpit above five stages, above the engines that sign off.
 */

const STAGE_HUES = ['#00E5EE', '#0196E8', '#4E55FC', '#7C08F5', '#C400FE'] as const

/** Angled top-right corner - the cut-crystal facet, in CSS rather than SVG. */
const FACET = 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'

const COCKPIT = [
  { name: 'Escanor', href: '/escanor', note: 'local-first orchestration' },
  { name: 'FlowBit', href: '/tools/flowbit', note: 'reproducible flows' },
  { name: 'Silicrate', href: '/tools/silicrate', note: 'managed PDK substrate' },
]

export default function ConsolidationMap() {
  const stages = BUCKETS.map((bucket, i) => {
    const tools = toolsByBucket(bucket.id)
    const live = tools.filter((t) => t.status === 'live').length
    return {
      ...bucket,
      hue: STAGE_HUES[i % STAGE_HUES.length],
      total: tools.length,
      live,
      share: live / tools.length,
    }
  })

  return (
    <figure className="mx-auto max-w-6xl">
      <div className="rounded-lg border border-hair bg-base p-4 md:p-6">
        {/* ---- Layer 1: the cockpit ---- */}
        <div className="rounded-md border border-brand-violet/40 bg-surface-1 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-base font-semibold text-ink">The Cockpit</p>
            <p className="text-sm text-ink-2">One context across every stage below</p>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {COCKPIT.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md border border-hair bg-void px-3 py-2.5 transition-colors hover:border-brand-violet/50 hover:bg-surface-1"
              >
                <span className="block font-display text-sm font-semibold text-ink">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-sm text-ink-3">{item.note}</span>
              </Link>
            ))}
          </div>
        </div>

        <Connector />

        {/* ---- Layer 2: the five stages, sized by the data ---- */}
        <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {stages.map((stage) => (
            <li
              key={stage.id}
              className="lg:min-w-0"
              style={{ flexGrow: stage.total, flexBasis: 0 }}
            >
              <Link
                href={`/tools#bucket-${stage.id}`}
                className="group relative flex h-full flex-col border border-hair bg-surface-1 p-4 transition-colors hover:border-line hover:bg-surface-2"
                style={{ clipPath: FACET, ['--hue' as string]: stage.hue }}
              >
                {/* stage hue cap */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: stage.hue, opacity: stage.live > 0 ? 1 : 0.3 }}
                />

                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-ink-3">
                    {String(stage.order).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg font-semibold text-ink">{stage.name}</span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-ink-2">{stage.tagline}</p>

                {/* Coverage meter: filled segments are live, outlines are not.
                    This is the honest-status doctrine drawn to scale. */}
                <div className="mt-4">
                  <div
                    aria-hidden
                    className="flex h-1.5 gap-px overflow-hidden rounded-full bg-void"
                  >
                    {Array.from({ length: stage.total }).map((_, i) => (
                      <span
                        key={i}
                        className="flex-1"
                        style={{
                          background: i < stage.live ? stage.hue : 'var(--color-hair)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm">
                    {stage.live > 0 ? (
                      <span style={{ color: stage.hue }}>{stage.live} live</span>
                    ) : (
                      <span className="text-ink-3">None live yet</span>
                    )}
                    <span className="text-ink-3"> · {stage.total} tools</span>
                  </p>
                </div>

                <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-3">
                  {stage.stages.map((s) => s.split(' ')[0]).join(' · ')}
                </p>
              </Link>
            </li>
          ))}
        </ol>

        <Connector />

        {/* ---- Layer 3: the engines, orchestrated not replaced ---- */}
        <div className="rounded-md border border-hair bg-surface-1 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-base font-semibold text-ink">
              Deterministic engines
            </p>
            <p className="text-sm text-ink-2">Orchestrated, never replaced</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {WRAPPED_ENGINES.map((engine) => (
              <span
                key={engine}
                className="rounded-full bg-surface-2 px-3 py-1.5 text-sm text-ink-2"
              >
                {engine}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-hair px-3 py-1.5 text-sm text-ink-3">
              + your existing signoff flow
            </span>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-sm text-ink-3">
        Stage width is its share of the {TOOL_COUNTS.total}-tool registry; filled segments are
        live today ({TOOL_COUNTS.live} of {TOOL_COUNTS.total}). Counts are derived from the public
        registry, so this diagram cannot drift from what actually ships.
      </figcaption>
    </figure>
  )
}

/** Static hairline between layers. One motif per section - no pulse here. */
function Connector() {
  return (
    <div aria-hidden className="flex justify-center py-3">
      <span className="h-6 w-px bg-line" />
    </div>
  )
}
