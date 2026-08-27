import { cn } from '@/lib/utils'

/**
 * Hero laptop: the EasyChip cockpit as an illustrative dashboard inside a
 * laptop frame - same product-truth language as the pillar cards, honest
 * label included. Pure HTML/CSS, server-rendered.
 */

const FLOW_NODES = [
  { name: 'lint', done: true },
  { name: 'synth', done: true },
  { name: 'place', done: true },
  { name: 'route', done: false },
  { name: 'sta', done: false },
]

const LINT_ROWS = [
  { severity: 'bg-warning', text: 'blocking assignment in seq block', loc: 'fifo_ctrl.sv:142' },
  { severity: 'bg-error', text: 'latch inferred from incomplete case', loc: 'fifo_ctrl.sv:96' },
]

const TIMING_ROWS = [
  { path: 'clk_core → u_alu/acc_r', slack: '+0.142', ok: true, width: '82%' },
  { path: 'clk_io → u_sync/meta_r', slack: '-0.018', ok: false, width: '12%' },
]

export default function CockpitLaptop() {
  return (
    <figure className="relative mx-auto w-full max-w-2xl">
      {/* screen */}
      <div className="relative rounded-t-xl border border-line bg-[#0A0E1C] p-2 pb-0 shadow-[0_32px_90px_-30px_rgba(78,85,252,0.45)]">
        <div className="overflow-hidden rounded-t-lg border border-hair border-b-0 bg-[#060913]">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-hair px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-brand-magenta/60" />
            <span className="h-2 w-2 rounded-full bg-brand-violet/60" />
            <span className="h-2 w-2 rounded-full bg-brand-cyan/60" />
            <span className="eyebrow ml-2 text-xs text-ink-3">easychip cockpit - tapeout.fb</span>
            <span className="eyebrow ml-auto flex items-center gap-1.5 rounded-full bg-brand-cyan/10 px-2 py-0.5 text-xs text-brand-cyan">
              <span aria-hidden className="led-dot" /> local · 0 B egress
            </span>
          </div>

          {/* flow strip */}
          <div className="flex items-center gap-1 overflow-x-auto border-b border-hair px-4 py-3">
            {FLOW_NODES.map((node, i) => (
              <div key={node.name} className="flex items-center gap-1">
                <span
                  className={cn(
                    'flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-xs',
                    node.done
                      ? 'border-brand-cyan/30 bg-brand-cyan/[0.07] text-ink'
                      : 'border-hair bg-surface-1 text-ink-2'
                  )}
                >
                  {node.done ? (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-brand-cyan" />
                  ) : (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
                  )}
                  {node.name}
                </span>
                {i < FLOW_NODES.length - 1 && (
                  <span aria-hidden className="text-xs text-ink-3/60">
                    →
                  </span>
                )}
              </div>
            ))}
            <span className="ml-auto hidden font-mono text-xs text-ink-3 sm:block">run #128</span>
          </div>

          {/* panels */}
          <div className="grid gap-px bg-hair sm:grid-cols-2">
            <div className="bg-[#060913] p-4">
              <p className="eyebrow mb-3 text-xs text-ink-3">lint · 2 open</p>
              <div className="space-y-2.5">
                {LINT_ROWS.map((row) => (
                  <div key={row.loc} className="flex items-start gap-2 font-mono text-xs leading-4">
                    <span aria-hidden className={cn('mt-1 h-1 w-1 shrink-0 rounded-full', row.severity)} />
                    <span className="min-w-0">
                      <span className="block truncate text-ink-2">{row.text}</span>
                      <span className="text-ink-3">{row.loc}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#060913] p-4">
              <p className="eyebrow mb-3 text-xs text-ink-3">timing · worst paths</p>
              <div className="space-y-2.5">
                {TIMING_ROWS.map((row) => (
                  <div key={row.path} className="font-mono text-xs">
                    <div className="flex justify-between gap-2">
                      <span className="truncate text-ink-2">{row.path}</span>
                      <span className={row.ok ? 'shrink-0 text-success' : 'shrink-0 text-error'}>
                        {row.slack}
                      </span>
                    </div>
                    <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className={cn('h-full rounded-full', row.ok ? 'bg-brand-cyan/70' : 'bg-error/80')}
                        style={{ width: row.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* deck */}
      <div className="relative mx-auto h-3.5 rounded-b-xl border border-t-0 border-line bg-gradient-to-b from-surface-2 to-[#0A0E1C]">
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-[#04060F]"
        />
      </div>

      <figcaption className="mt-3 text-center text-xs text-ink-3">
        Illustrative interface
      </figcaption>
    </figure>
  )
}
