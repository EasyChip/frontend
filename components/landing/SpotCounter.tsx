'use client'

import { useEffect, useState } from 'react'

const SEED_COUNT = 312

export default function SpotCounter() {
  const [count, setCount] = useState(SEED_COUNT)

  useEffect(() => {
    const v = localStorage.getItem('ec_submissions')
    setCount(SEED_COUNT + (v ? parseInt(v, 10) : 0))
  }, [])

  const filled = Math.min(count, 1000)
  const pct = (filled / 1000) * 100

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <span className="text-text-primary font-semibold">{count.toLocaleString()}</span> engineers on the waitlist
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden w-full">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            transition: 'width 0.8s ease',
          }}
        />
      </div>
      <p className="text-[11px] text-amber-400/70">{1000 - filled} of 1,000 early access spots remain</p>
    </div>
  )
}
