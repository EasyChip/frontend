'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { FORMSPREE_ID } from '@/lib/site'

const INTERESTS = ['Tools', 'Escanor (local-first)', 'Partnership'] as const

const inputClass =
  'w-full rounded-md border border-line bg-surface-1 px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand-cyan'

/* Native selects ship an OS chevron that ignores the theme. Reset the
   appearance and draw our own in the palette. */
const selectClass = `${inputClass} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7590' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
}

/**
 * Qualifying demo-request form → Formspree.
 *
 * Field labels are readable body text, not muted mono. They were previously
 * `.eyebrow text-ink-3` - 11px uppercase at #6B7590, under 4.5:1 - which put
 * the least legible treatment on the site's highest-stakes surface. Mono is a
 * brand voice for status and data, not for telling someone what to type.
 */
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
      <div
        role="status"
        className="rounded-lg border border-brand-cyan/30 bg-surface-1 p-8 text-center"
      >
        <p className="font-display text-xl font-semibold text-ink">
          Thanks - we&apos;ll be in touch.
        </p>
        <p className="mt-2 text-ink-2">Want to skip the queue? Book a time directly below.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="form" value="demo-request" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="cf-name" label="Name">
          <input id="cf-name" name="name" required autoComplete="name" className={inputClass} />
        </Field>
        <Field id="cf-email" label="Work email">
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field id="cf-company" label="Company">
          <input
            id="cf-company"
            name="company"
            required
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
        <Field id="cf-role" label="Role" optional>
          <input id="cf-role" name="role" className={inputClass} />
        </Field>
        <Field id="cf-teamsize" label="Team size" optional>
          <select
            id="cf-teamsize"
            name="team_size"
            className={selectClass}
            style={chevron}
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            <option>Just me</option>
            <option>2-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>200+</option>
          </select>
        </Field>
        <Field id="cf-interest" label="Interested in">
          <select
            id="cf-interest"
            name="interest"
            className={selectClass}
            style={chevron}
            defaultValue={INTERESTS[0]}
          >
            {INTERESTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="cf-source" label="How did you hear about us?" optional>
        <input id="cf-source" name="heard_from" className={inputClass} />
      </Field>

      <p aria-live="polite" className="min-h-0">
        {status === 'error' && (
          <span className="text-sm text-error">
            That didn&apos;t send. Check the work email address and try again - or email us
            directly from the card above.
          </span>
        )}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="sheen inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-brand-violet px-8 text-base font-medium text-white transition-all duration-200 hover:brightness-110 hover:shadow-glow-violet-sm active:scale-[0.98] disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Request a demo'}
        </button>
        {/* Reassurance belongs next to the decision, not three screens above it. */}
        <p className="text-sm text-ink-2">You&apos;ll hear back from a founder, not a funnel.</p>
      </div>

      <p className="text-sm text-ink-3">
        By submitting, you agree to our{' '}
        <Link href="/privacy" className="text-brand-cyan hover:underline underline-offset-4">
          Privacy Policy
        </Link>
        . We&apos;ll only email you about EasyChip.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-2">
        {label}
        {optional && <span className="ml-2 font-normal text-ink-3">optional</span>}
      </label>
      {children}
    </div>
  )
}
