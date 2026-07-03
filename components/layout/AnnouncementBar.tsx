'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { ANNOUNCEMENT } from '@/lib/site'

const STORAGE_KEY = `ec-announce-dismissed:${ANNOUNCEMENT.message}`

/** Thin, dismissible, one message + one link (build spec C1). */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== '1')
    } catch {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="relative z-50 border-b border-hair bg-surface-1">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center">
        <p className="text-xs text-ink-2 md:text-sm">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan align-middle" aria-hidden />
          {ANNOUNCEMENT.message}
          <Link
            href={ANNOUNCEMENT.href}
            className="ml-2 font-medium text-brand-cyan hover:underline underline-offset-4"
          >
            {ANNOUNCEMENT.linkLabel} →
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="absolute right-4 text-ink-3 transition-colors hover:text-ink"
          onClick={() => {
            try {
              localStorage.setItem(STORAGE_KEY, '1')
            } catch {}
            setVisible(false)
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
