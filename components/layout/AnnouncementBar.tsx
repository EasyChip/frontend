'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const LAUNCH_DATE = new Date('2026-04-28T00:00:00Z')

function getCountdownText() {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return `${days}d ${hours}h`
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true)
  const [countdown, setCountdown] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  const messages = [
    <>
      Full launch in{' '}
      <span className="font-semibold text-text-primary">{countdown}</span>.{' '}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
        className="underline underline-offset-2 hover:text-text-primary transition-colors ml-1"
        style={{ color: 'var(--accent-amber)' }}
      >
        Join the waitlist →
      </button>
    </>,
    <>
      <span className="font-semibold text-text-primary">Formal BMC</span> verification built-in.{' '}
      <span>Every design, every time.</span>
    </>,
    <>
      <span className="font-semibold text-text-primary">Open-weight models</span> coming soon.{' '}
      <span>Run EasyChip on your own hardware.</span>
    </>,
  ]

  useEffect(() => {
    const isDismissed = localStorage.getItem('ec_bar_dismissed') === '1'
    setDismissed(isDismissed)

    setCountdown(getCountdownText() ?? '')
    const countId = setInterval(() => setCountdown(getCountdownText() ?? ''), 60000)
    return () => clearInterval(countId)
  }, [])

  useEffect(() => {
    if (dismissed) return
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % messages.length), 5000)
    return () => clearInterval(id)
  }, [dismissed, messages.length])

  const dismiss = () => {
    localStorage.setItem('ec_bar_dismissed', '1')
    setDismissed(true)
  }

  if (dismissed || !countdown) return null

  return (
    <div
      className="relative flex items-center justify-center gap-2 px-4 py-2 text-xs text-text-secondary font-medium overflow-hidden"
      style={{
        background: 'rgba(212,168,67,0.06)',
        borderBottom: '1px solid rgba(212,168,67,0.15)',
      }}
    >
      {/* Amber dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
        style={{ backgroundColor: 'var(--accent-amber)' }}
      />

      <AnimatePresence mode="wait">
        <motion.span
          key={msgIndex}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-1"
        >
          {messages[msgIndex]}
        </motion.span>
      </AnimatePresence>

      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors p-0.5"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 2l8 8M10 2L2 10"/>
        </svg>
      </button>
    </div>
  )
}
