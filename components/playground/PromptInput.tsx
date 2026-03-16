'use client'

const EXAMPLES = [
  '4-bit synchronous up-counter with active-low reset',
  '8-bit LFSR with taps at positions 8, 6, 5, 4',
  'Parameterised FIFO with configurable depth and width',
  'SPI master controller supporting modes 0 and 1',
  '16-bit ALU with ADD, SUB, AND, OR, XOR operations',
]

const MAX_CHARS = 500

interface Props {
  value: string
  onChange: (v: string) => void
  onGenerate: () => void
  loading: boolean
}

export default function PromptInput({ value, onChange, onGenerate, loading }: Props) {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold gradient-text">Hardware specification</span>
        <span className="block text-xs text-text-muted mt-0.5">Describe the module behavior as a prompt.</span>
      </label>

      {/* Textarea with glow border on focus */}
      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Design a 4-bit synchronous up-counter with active-low reset and clock enable..."
          rows={7}
          className="w-full bg-bg-card border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted font-mono resize-none focus:outline-none focus:border-indigo-500/60 focus:shadow-lg focus:shadow-indigo-500/10 transition-all"
        />
        {/* Character counter */}
        <span className={`absolute bottom-3 right-3 text-xs font-mono transition-colors ${
          value.length > MAX_CHARS * 0.9 ? 'text-amber-400' : 'text-text-muted'
        }`}>
          {value.length}/{MAX_CHARS}
        </span>
      </div>

      {/* Example chips */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => onChange(ex)}
            className="text-xs bg-bg-card border border-white/8 text-text-muted hover:text-text-primary hover:border-indigo-500/40 hover:bg-indigo-500/5 px-3 py-1.5 rounded-full transition-all duration-200"
          >
            {ex.length > 30 ? ex.slice(0, 30) + '…' : ex}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        disabled={loading || !value.trim()}
        className="w-full shimmer-btn text-white font-bold py-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating…
          </>
        ) : (
          <>
            Generate RTL
            <kbd className="text-xs font-normal opacity-50 ml-1 bg-white/10 px-1.5 py-0.5 rounded">⌘↵</kbd>
          </>
        )}
      </button>
    </div>
  )
}
