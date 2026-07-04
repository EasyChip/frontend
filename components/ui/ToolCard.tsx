import Link from 'next/link'
import type { Tool } from '@/lib/tools'
import StatusPill from '@/components/ui/StatusPill'
import GlowCard from '@/components/ui/GlowCard'

/** Rich card for live tools - probe spotlight + border-beam, links to the tool page. */
export function LiveToolCard({ tool }: { tool: Tool }) {
  return (
    <GlowCard className="h-full border border-hair bg-surface-1 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="relative flex h-full flex-col p-6">
        {/* corner via - pin-1 marker */}
        <span
          aria-hidden
          className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-line transition-colors duration-200 group-hover/glow:bg-brand-cyan"
        />
        <div className="flex items-start justify-between gap-3 pr-5">
          <span className="eyebrow text-ink-3">{tool.category}</span>
          <StatusPill status="live" />
        </div>
        <h3 className="mt-4 w-fit font-display text-xl font-medium tracking-tight text-ink">
          <Link href={`/tools/${tool.slug}`} className="after:absolute after:inset-0">
            {tool.name}
          </Link>
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">{tool.tagline}</p>
        <span className="mt-auto pt-5 text-sm font-medium text-brand-cyan opacity-0 transition-all duration-200 group-hover/glow:translate-x-0.5 group-hover/glow:opacity-100">
          Explore {tool.name} →
        </span>
      </div>
    </GlowCard>
  )
}

/** Compact tile for in-development tools - name + category only, probe shimmer on hover. */
export function DevToolTile({ tool }: { tool: Tool }) {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-md border border-hair bg-surface-1/60 px-4 py-3 transition-colors duration-200 hover:border-line hover:bg-surface-1">
      <div className="min-w-0">
        <span className="block truncate font-display text-sm font-medium text-ink-2 transition-colors group-hover:text-ink">
          {tool.name}
        </span>
        <span className="eyebrow text-[0.6rem] text-ink-3">{tool.category}</span>
      </div>
      <StatusPill status="in-development" />
    </div>
  )
}

/** Muted tile for future tracks (Analog / RF) - honest roadmap state. */
export function FutureTrackTile({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-hair bg-transparent px-4 py-3">
      <span className="font-display text-sm font-medium text-ink-3">{name}</span>
      <StatusPill status="roadmap" />
    </div>
  )
}
