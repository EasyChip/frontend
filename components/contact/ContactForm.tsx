'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { FORMSPREE_ID } from '@/lib/site'

const INTERESTS = ['Tools', 'Escanor (local-first)', 'Partnership'] as const

const inputClass =
  'w-full rounded-md border border-line bg-surface-1 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand-cyan'

/** Qualifying demo-request form (build spec D14) → Formspree. */
export default function ContactForm() {
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
      <div className="rounded-lg border border-brand-cyan/30 bg-surface-1 p-8 text-center">
        <p className="font-display text-xl font-medium text-ink">Thanks - we&apos;ll be in touch.</p>
        <p className="mt-2 text-ink-2">
          Want to skip the queue? Book a time directly below.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="form" value="demo-request" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="eyebrow mb-2 block text-ink-3">
            Name
          </label>
          <input id="cf-name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className="eyebrow mb-2 block text-ink-3">
            Work email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-company" className="eyebrow mb-2 block text-ink-3">
            Company
          </label>
          <input id="cf-company" name="company" required autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-role" className="eyebrow mb-2 block text-ink-3">
            Role
          </label>
          <input id="cf-role" name="role" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-teamsize" className="eyebrow mb-2 block text-ink-3">
            Team size
          </label>
          <select id="cf-teamsize" name="team_size" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>Just me</option>
            <option>2-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>200+</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-interest" className="eyebrow mb-2 block text-ink-3">
            Interested in
          </label>
          <select id="cf-interest" name="interest" className={inputClass} defaultValue={INTERESTS[0]}>
            {INTERESTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-source" className="eyebrow mb-2 block text-ink-3">
          How did you hear about us?
        </label>
        <input id="cf-source" name="heard_from" className={inputClass} />
      </div>

      {status === 'error' && (
        <p className="text-sm text-error">That didn&apos;t send - check your email address and try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-brand-violet px-7 text-base font-medium text-white transition-all hover:shadow-glow-violet-sm hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Request a demo'}
      </button>
      <p className="text-xs text-ink-3">
        By submitting, you agree to our{' '}
        <Link href="/privacy" className="text-brand-cyan hover:underline underline-offset-4">
          Privacy Policy
        </Link>
        . We&apos;ll only email you about EasyChip.
      </p>
    </form>
  )
}
