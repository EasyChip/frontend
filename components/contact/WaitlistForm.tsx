'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { FORMSPREE_ID } from '@/lib/site'

/** Early-access capture — the secondary CTA target sitewide. */
export default function WaitlistForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="rounded-md border border-brand-cyan/30 bg-surface-1 px-5 py-4 text-ink">
        You&apos;re on the list. We&apos;ll email you when early access opens — VisUPF download link
        included the moment it ships.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input type="hidden" name="form" value="early-access" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="wl-email" className="sr-only">
          Work email
        </label>
        <input
          id="wl-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="h-12 w-full rounded-md border border-line bg-surface-1 px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand-cyan"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-md border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-ink-3 hover:bg-surface-2 disabled:opacity-60"
        >
          {status === 'sending' ? 'Joining…' : 'Join the list'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-error">That didn&apos;t send — check your email address and try again.</p>
      )}
      <p className="text-xs text-ink-3">
        Early access members get launches first — starting with the VisUPF open-source release. By
        submitting, you agree to our{' '}
        <Link href="/privacy" className="text-brand-cyan hover:underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
