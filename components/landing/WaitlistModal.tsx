'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'

const FORMSPREE_ID = 'mlgpjjbl'

interface Props {
  open: boolean
  onClose: () => void
}

export default function WaitlistModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setTimeout(() => { setEmail(''); setStatus('idle') }, 300)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const backdropVariant: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }

  const cardVariant: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.97, y: 16 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]} },
        exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.2 } },
      }

  const contentVariant: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          {/* Backdrop — full-screen strong blur */}
          <div className="absolute inset-0 bg-black/75" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
            style={{ background: 'rgba(12,15,17,0.96)', backdropFilter: 'blur(40px)' }}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header amber glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent-amber), transparent)' }}
            />

            <div className="p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-white/5"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3l10 10M13 3L3 13"/>
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    variants={contentVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center py-4"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.3)' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5 9-9" stroke="var(--accent-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">You&apos;re on the list!</h3>
                    <p className="text-text-tertiary text-xs">We&apos;ll email you when early access opens.</p>
                    <button
                      onClick={onClose}
                      className="mt-6 text-sm text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    variants={contentVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-label border mb-6"
                      style={{
                        color: 'var(--accent-amber)',
                        background: 'rgba(212,168,67,0.06)',
                        borderColor: 'rgba(212,168,67,0.2)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-amber)' }} />
                      Early Access — Limited spots
                    </div>

                    <h2 className="text-2xl font-extrabold text-text-primary mb-2">
                      Register for Early Access
                    </h2>
                    <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                      Be among the first engineers to generate formally verified RTL with EasyChip. We&apos;re onboarding in batches.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <input
                          ref={inputRef}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none transition-all"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.08)',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = 'rgba(212,168,67,0.4)' }}
                          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'loading' || !email.trim()}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-bg-void/30 border-t-bg-void rounded-full animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          'Register for Early Access →'
                        )}
                      </button>
                      {status === 'error' && (
                        <p className="text-xs text-red-400 text-center">
                          Something went wrong. Please try again.
                        </p>
                      )}
                    </form>

                    <p className="text-[11px] text-text-tertiary text-center mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
