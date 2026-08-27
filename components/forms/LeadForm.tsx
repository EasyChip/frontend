'use client'

import { useState, type FormEvent } from 'react'
import { submitLead } from '@/app/actions/lead'
import Button from '@/components/core/Button'
import { Eyebrow } from '@/components/core/Type'

const field =
  'w-full rounded-sm border border-[color:var(--hairline)] bg-graphite px-4 py-3 text-off-white outline-none transition-colors duration-[120ms] ease-[var(--ease-out)] placeholder:text-gray-2 focus:border-white'

/**
 * The one form on the site. It takes enough to have a useful first
 * conversation and nothing more — no qualification quiz, no team-size
 * dropdown nobody reads.
 */
export default function LeadForm({ intent = 'demo' }: { intent?: 'demo' | 'contact' }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setMessage('')
    const data = new FormData(e.currentTarget)
    data.set('intent', intent)
    const result = await submitLead(data)
    if (result.ok) {
      setStatus('sent')
      return
    }
    setStatus('error')
    setMessage(result.message ?? 'That did not send. Try again.')
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-md border border-[color:var(--hairline)] bg-near-black p-8"
      >
        <Eyebrow tone="muted">Received</Eyebrow>
        <p className="mt-4 display-3 text-off-white">
          We have it. A founder replies to these, usually within a day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="lf-name" name="name" label="Name" autoComplete="name" required />
        <Field
          id="lf-email"
          name="email"
          label="Work email"
          type="email"
          autoComplete="email"
          required
        />
        <Field id="lf-company" name="company" label="Company" autoComplete="organization" optional />
        <Field id="lf-role" name="role" label="Role" placeholder="Verification lead, CAD…" optional />
      </div>

      <div>
        <label htmlFor="lf-note" className="label mb-2.5 block text-gray-2">
          What are you working on?
          <span className="ml-2 normal-case tracking-normal text-gray-2">optional</span>
        </label>
        <textarea id="lf-note" name="note" rows={4} className={`${field} resize-y`} />
      </div>

      <p aria-live="polite">
        {status === 'error' && <span className="text-xs text-white">{message}</span>}
      </p>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" variant="solid" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send'}
        </Button>
        <span className="text-xs text-gray-2">
          Goes straight to the founders. No sequence, no CRM drip.
        </span>
      </div>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  required,
  optional,
}: {
  id: string
  name: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2.5 block text-gray-2">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal">optional</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className={field}
      />
    </div>
  )
}
