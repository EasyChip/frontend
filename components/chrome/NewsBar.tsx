'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * The floating white announcement bar over the hero photography.
 *
 * It carries the one true current message. This is the single place in the
 * system that uses a shadow — `--shadow-bar` exists only to lift white off
 * dark photography, and nothing else casts one.
 */
export default function NewsBar({
  label = 'Latest',
  children,
  action = 'Read',
  href,
}: {
  label?: string
  children: React.ReactNode
  action?: string
  href: string
}) {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="px-[var(--page-margin)]">
      <div
        className="mx-auto flex w-full max-w-[var(--page-max)] items-center gap-4 rounded-sm bg-white px-4 py-3 text-black sm:gap-5"
        style={{ boxShadow: 'var(--shadow-bar)' }}
      >
        <span className="label inline-flex shrink-0 items-center gap-2">
          <span aria-hidden className="inline-block h-[11px] w-[11px] rounded-full border border-black" />
          <span className="hidden sm:inline">{label}</span>
        </span>

        <Link href={href} className="min-w-0 flex-1 truncate text-xs hover:underline">
          {children}
        </Link>

        <Link
          href={href}
          className="label shrink-0 text-black underline underline-offset-[3px]"
        >
          {action}
        </Link>

        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="shrink-0 leading-none text-black/60 transition-colors hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  )
}
