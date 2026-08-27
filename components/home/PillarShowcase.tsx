import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

/**
 * Three product pillars, each illustrated with a hand-built, clearly-labeled
 * illustrative UI surface in the site's own dark ramp (Interfere-style
 * product-truth cards - no abstract art, no fake screenshots).
 */

function CardShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-hair bg-[#060913] shadow-[0_24px_80px_-40px_rgba(78,85,252,0.4)]">
      <div className="flex items-center gap-2 border-b border-hair px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-brand-magenta/60" />
        <span className="h-2 w-2 rounded-full bg-brand-violet/60" />
        <span className="h-2 w-2 rounded-full bg-brand-cyan/60" />
        <span className="eyebrow ml-2 text-xs text-ink-3">{title}</span>
      </div>
      <div className="p-5">{children}</div>
      <p className="border-t border-hair px-5 py-2 text-xs text-ink-3">Illustrative interface</p>
    </div>
  )
}

/** Pillar 01 - a LintBit-style diagnostic panel. */
function LintCard() {
  return (
    <CardShell title="lintbit - fifo_ctrl.sv">
      <div className="space-y-3 font-mono text-sm leading-6">
        <div className="flex items-start gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
          <div className="min-w-0">
            <p className="text-ink">blocking assignment inside sequential block</p>
            <p className="text-ink-3">fifo_ctrl.sv:142 · rule W-1024</p>
          </div>
          <span className="eyebrow ml-auto shrink-0 rounded-full bg-brand-cyan/15 px-2 py-0.5 text-xs text-brand-cyan">
            Fix available
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-error" />
          <div className="min-w-0">
            <p className="text-ink">latch inferred from incomplete case</p>
            <p className="text-ink-3">fifo_ctrl.sv:96 · rule E-0207</p>
          </div>
          <span className="eyebrow ml-auto shrink-0 rounded-full bg-brand-cyan/15 px-2 py-0.5 text-xs text-brand-cyan">
            Fix available
          </span>
        </div>
        <div className="rounded-md border border-hair bg-surface-1 px-3 py-2 text-ink-2">
          <span className="text-brand-cyan">→</span> caught while typing, not at signoff
        </div>
      </div>
    </CardShell>
  )
}

/** Pillar 02 - an SAC-style timing report. */
function TimingCard() {
  const paths = [
    { path: 'clk_core → u_alu/acc_r', slack: '+0.142 ns', ok: true, width: '82%' },
    { path: 'clk_core → u_lsu/tag_r', slack: '+0.031 ns', ok: true, width: '46%' },
    { path: 'clk_io → u_sync/meta_r', slack: '-0.018 ns', ok: false, width: '12%' },
  ]
  return (
    <CardShell title="sac - report_timing --format json">
      <div className="space-y-3 font-mono text-sm">
        {paths.map((p) => (
          <div key={p.path}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-ink-2">{p.path}</span>
              <span className={p.ok ? 'shrink-0 text-success' : 'shrink-0 text-error'}>{p.slack}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className={cn('h-full rounded-full', p.ok ? 'bg-brand-cyan/70' : 'bg-error/80')}
                style={{ width: p.width }}
              />
            </div>
          </div>
        ))}
        <div className="rounded-md border border-hair bg-surface-1 px-3 py-2 text-ink-2">
          <span className="text-brand-cyan">→</span> timing as queryable data, not log soup
        </div>
      </div>
    </CardShell>
  )
}

/** Pillar 03 - a FlowBit-style local flow graph. */
function FlowCard() {
  const nodes = ['synth', 'place', 'cts', 'route', 'sta']
  return (
    <CardShell title="flowbit - tapeout.fb · local">
      <div className="flex items-center justify-between gap-1 py-2">
        {nodes.map((node, i) => (
          <div key={node} className="flex min-w-0 items-center gap-1">
            <div
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-md border px-2.5 py-2 font-mono text-xs',
                i < 3 ? 'border-brand-cyan/30 bg-brand-cyan/[0.07] text-ink' : 'border-hair bg-surface-1 text-ink-2'
              )}
            >
              {i < 3 ? (
                <span aria-hidden className="led-dot" />
              ) : (
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line" />
              )}
              {node}
            </div>
            {i < nodes.length - 1 && <span aria-hidden className="text-ink-3/60">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 font-mono text-sm">
        <div className="flex justify-between text-ink-2">
          <span>network egress</span>
          <span className="text-brand-cyan">0 bytes</span>
        </div>
        <div className="flex justify-between text-ink-2">
          <span>rerun from failed node</span>
          <span className="text-success">deterministic</span>
        </div>
      </div>
    </CardShell>
  )
}

const PILLARS = [
  {
    marker: '01',
    eyebrow: 'Check',
    title: 'Catch issues before your silicon does.',
    body: 'Linting, constraints, and power intent verified the moment they exist - in your editor, in your CI, with fixes attached. Problems found at typing speed instead of signoff speed.',
    link: { label: 'Explore the Verify stage', href: '/tools#bucket-verify' },
    Card: LintCard,
  },
  {
    marker: '02',
    eyebrow: 'Implement',
    title: 'Understand what your silicon is doing.',
    body: 'Synthesis, timing, and physical flow as structured data you can query and automate - one shared context from spec to GDSII instead of forty disconnected logs.',
    link: { label: 'Explore the Implement stage', href: '/tools#bucket-implement' },
    Card: TimingCard,
  },
  {
    marker: '03',
    eyebrow: 'Own',
    title: 'Own the whole flow, on your machines.',
    body: 'Every tool composes into reproducible local flows. No data egress, no cloud round-trip - the most IP-sensitive teams get the most capable tooling.',
    link: { label: 'Explore Escanor', href: '/escanor' },
    Card: FlowCard,
  },
]

export default function PillarShowcase() {
  return (
    <section className="border-t border-hair bg-base">
      <div className="mx-auto max-w-7xl space-y-24 px-6 py-24 md:space-y-32 md:py-32">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.marker}
            className={cn(
              'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
              i % 2 === 1 && 'lg:[&>*:first-child]:order-2'
            )}
          >
            <Reveal>
              <p className="eyebrow text-ink-3">
                <span className="mr-3 text-brand-cyan">{pillar.marker}</span>
                {pillar.eyebrow}
              </p>
              <h3 className="editorial-title mt-4 text-3xl md:text-5xl">{pillar.title}</h3>
              <p className="mt-5 max-w-lg text-lg font-light leading-relaxed text-ink-2">{pillar.body}</p>
              <Link
                href={pillar.link.href}
                className="mt-6 inline-block text-sm font-medium text-brand-cyan hover:underline underline-offset-4"
              >
                {pillar.link.label} →
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <pillar.Card />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}
