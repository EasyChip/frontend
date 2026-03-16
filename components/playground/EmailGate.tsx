'use client'

import { useState } from 'react'

const FORMSPREE_ID = 'mlgpjjbl'

interface Props {
  onUnlock: () => void
}

export default function EmailGate({ onUnlock }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'playground-gate' }),
      })
      if (res.ok) {
        localStorage.setItem('ec_unlocked', 'true')
        // increment waitlist count
        const v = localStorage.getItem('ec_submissions')
        localStorage.setItem('ec_submissions', String((v ? parseInt(v, 10) : 0) + 1))
        onUnlock()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl overflow-hidden">
      {/* Blur backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      {/* Card */}
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl border border-white/10 p-7 shadow-2xl"
        style={{ background: 'rgba(10,12,20,0.92)', backdropFilter: 'blur(24px)' }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)' }}
        />

        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h3 className="text-lg font-bold text-text-primary mb-1.5">Your RTL is ready</h3>
        <p className="text-sm text-text-secondary mb-5 leading-relaxed">
          Enter your email to reveal the generated code. Free, no sign-up required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-indigo-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            className="w-full shimmer-btn text-white font-semibold py-2.5 rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {status === 'loading' ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Unlocking…
              </>
            ) : (
              'Reveal RTL →'
            )}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-400 text-center">Something went wrong. Please try again.</p>
          )}
        </form>

        <p className="text-[11px] text-text-muted text-center mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
