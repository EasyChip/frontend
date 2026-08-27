'use client'

import Link from 'next/link'

/** Branded route error boundary with retry. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl font-semibold md:text-4xl">
        This page hit an <span className="text-gradient">unexpected state.</span>
      </h1>
      <p className="eyebrow mt-4 text-error">Signal integrity fault</p>
      <p className="mt-4 max-w-md text-ink-2">
        Nothing was lost - rerun the request or route back to a known-good page.
      </p>
      {error.digest && <p className="eyebrow mt-3 text-ink-3">ref: {error.digest}</p>}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="sheen inline-flex h-11 items-center rounded-full bg-brand-violet px-6 text-sm font-medium text-white transition-all duration-200 hover:shadow-glow-violet-sm hover:brightness-110 active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-ink-3 hover:bg-surface-2"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
