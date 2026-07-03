import Link from 'next/link'
import type { Tool } from '@/lib/tools'
import StatusPill from '@/components/ui/StatusPill'

/** Rich card for live tools — links to the tool page. */
export function LiveToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-lg border border-hair bg-surface-1 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-line hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow text-ink-3">{tool.category}</span>
        <StatusPill status="live" />
      </div>
      <h3 className="gradient-underline mt-4 w-fit font-display text-xl font-semibold text-ink">
        {tool.name}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-2">{tool.tagline}</p>
      <span className="mt-auto pt-5 text-sm font-medium text-brand-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Explore {tool.name} →
      </span>
    </Link>
  )
}

/** Compact tile for in-development tools — name + category only, no link. */
export function DevToolTile({ tool }: { tool: Tool }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-hair bg-surface-1/60 px-4 py-3">
      <div className="min-w-0">
        <span className="block truncate font-display text-sm font-semibold text-ink-2">
          {tool.name}
        </span>
        <span className="eyebrow text-[0.6rem] text-ink-3">{tool.category}</span>
      </div>
      <StatusPill status="in-development" />
    </div>
  )
}

/** Muted tile for future tracks (Analog / RF) — honest roadmap state. */
export function FutureTrackTile({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-hair bg-transparent px-4 py-3">
      <span className="font-display text-sm font-semibold text-ink-3">{name}</span>
      <StatusPill status="roadmap" />
    </div>
  )
}
