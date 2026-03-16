const metrics = [
  { value: '94%', label: 'First-pass formal verification rate', color: 'text-emerald-400' },
  { value: '<30s', label: 'Average generation time', color: 'text-indigo-400' },
  { value: '10K+', label: 'RTL designs generated', color: 'text-violet-400' },
  { value: 'Open', label: 'Weights — self-hostable', color: 'text-cyan-400' },
]

export default function MetricsPanel() {
  return (
    <div
      className="rounded-2xl border border-white/10 p-6 h-full flex flex-col gap-4"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}
    >
      <div className="mb-2">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Why EasyChip</p>
        <h3 className="text-lg font-bold text-text-primary">By the numbers</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/5 p-4 flex flex-col gap-1"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <span className={`text-2xl font-extrabold ${m.color}`}>{m.value}</span>
            <span className="text-xs text-text-muted leading-snug">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5">
        <p className="text-xs text-text-muted leading-relaxed">
          Multi-agent pipeline: Architect → RTL Gen → Simulate → Debug → Formal verify → Synthesize.
          Each stage powered by domain-fine-tuned models.
        </p>
      </div>
    </div>
  )
}
