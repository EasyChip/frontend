export default function InvestorCTA() {
  return (
    <div
      className="rounded-2xl border border-white/10 p-6"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L11 7h5l-4 3 1.5 5L9 12l-4.5 3L6 10 2 7h5z" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-1">Interested in backing EasyChip?</h4>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            We&apos;re building the infrastructure layer for AI-native hardware design. Raising a pre-seed round.
          </p>
          <a
            href="mailto:founders@easychip.ai?subject=EasyChip%20Investment%20Inquiry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Get in touch
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
