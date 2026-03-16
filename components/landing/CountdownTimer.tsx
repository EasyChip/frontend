'use client'

import { useEffect, useState, useRef } from 'react'

const LAUNCH_DATE = new Date('2026-04-28T00:00:00Z')

function getTimeLeft() {
  const now = Date.now()
  const diff = LAUNCH_DATE.getTime() - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function FlipDigit({ value, label }: { value: number; label: string }) {
  const prevValue = useRef(value)
  const [flipping, setFlipping] = useState(false)
  const displayStr = String(value).padStart(2, '0')

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlipping(true)
      const t = setTimeout(() => setFlipping(false), 400)
      prevValue.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center text-xl font-extrabold text-text-primary font-mono border border-white/8 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(8px)',
          perspective: '200px',
        }}
      >
        {flipping && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'rgba(212,168,67,0.1)' }}
          />
        )}
        <span
          style={{
            display: 'inline-block',
            animation: flipping ? 'digit-flip 0.4s ease-in-out' : 'none',
          }}
        >
          {displayStr}
        </span>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-black/30 pointer-events-none" />
      </div>
      <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-mono">{label}</span>
    </div>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) return null

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-label text-text-tertiary">Full launch in</p>
      <div className="flex items-end gap-2">
        <FlipDigit value={time.days} label="days" />
        <span className="text-text-tertiary text-lg font-bold pb-4 leading-none">:</span>
        <FlipDigit value={time.hours} label="hrs" />
        <span className="text-text-tertiary text-lg font-bold pb-4 leading-none">:</span>
        <FlipDigit value={time.minutes} label="min" />
        <span className="text-text-tertiary text-lg font-bold pb-4 leading-none">:</span>
        <FlipDigit value={time.seconds} label="sec" />
      </div>
    </div>
  )
}
