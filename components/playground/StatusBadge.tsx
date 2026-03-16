interface Props {
  status: 'pass' | 'fail' | 'loading' | 'error'
  attempts?: number
}

export default function StatusBadge({ status, attempts }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* Main badge */}
      <span
        className={`inline-flex items-center gap-2 text-sm font-mono font-bold px-4 py-1.5 rounded-full border transition-all ${
          status === 'pass'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
            : status === 'fail' || status === 'error'
            ? 'bg-red-500/10 text-red-400 border-red-500/30 shadow-lg shadow-red-500/10'
            : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 animate-pulse-glow'
        }`}
      >
        {status === 'pass' && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6.5" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.6)" strokeWidth="1"/>
            <path d="M4 7l2 2 4-3.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {(status === 'fail' || status === 'error') && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6.5" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/>
            <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {status === 'loading' && (
          <span className="w-3 h-3 border-2 border-indigo-400/40 border-t-indigo-400 rounded-full animate-spin" />
        )}
        {status === 'pass' ? 'PASS' : status === 'loading' ? 'Running…' : status === 'error' ? 'ERROR' : 'FAIL'}
      </span>

      {/* Attempts pill */}
      {attempts !== undefined && status !== 'loading' && (
        <span className="text-xs text-text-muted bg-white/5 border border-white/8 px-2.5 py-1 rounded-full font-mono">
          {attempts} attempt{attempts !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  )
}
