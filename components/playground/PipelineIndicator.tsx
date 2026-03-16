'use client'

interface Props {
  status: 'idle' | 'loading' | 'pass' | 'fail'
  activeStage?: number
}

const STAGES = [
  { id: 'arch', label: 'Architect' },
  { id: 'gen', label: 'RTL Gen' },
  { id: 'sim', label: 'Simulate' },
  { id: 'dbg', label: 'Debug' },
  { id: 'fml', label: 'Formal' },
  { id: 'syn', label: 'Synthesize' },
]

export default function PipelineIndicator({ status, activeStage = 0 }: Props) {
  const getStageState = (index: number) => {
    if (status === 'idle') return 'idle'
    if (status === 'pass') return 'complete'
    if (status === 'fail') {
      if (index < activeStage) return 'complete'
      if (index === activeStage) return 'fail'
      return 'idle'
    }
    // loading
    if (index < activeStage) return 'complete'
    if (index === activeStage) return 'active'
    return 'idle'
  }

  return (
    <div className="glass-card rounded-xl px-4 py-3">
      <div className="flex items-center gap-1 overflow-x-auto">
        {STAGES.map((stage, i) => {
          const state = getStageState(i)
          return (
            <div key={stage.id} className="flex items-center gap-1 flex-shrink-0">
              {/* Stage pill */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  state === 'complete'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : state === 'active'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse-glow'
                    : state === 'fail'
                    ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                    : 'bg-white/5 text-text-muted border border-white/5'
                }`}
              >
                {state === 'complete' && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {state === 'active' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                )}
                {state === 'fail' && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
                {stage.label}
              </div>

              {/* Connector */}
              {i < STAGES.length - 1 && (
                <div className={`w-3 h-px flex-shrink-0 ${
                  state === 'complete' ? 'bg-emerald-500/40' : 'bg-white/8'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
