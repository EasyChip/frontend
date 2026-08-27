'use client'

import { useActionState } from 'react'
import { submitLead, type LeadResult } from '@/app/actions/lead'
import Button from '@/components/core/Button'
import { Eyebrow } from '@/components/core/Type'

/**
 * The state a freshly-rendered form starts in.
 *
 * Defined here, not beside the action: a `'use server'` module may only export
 * async functions, so a plain `export const` in that file makes every POST to
 * the route return 500. The `LeadResult` type is fine to import from there
 * because types are erased before the rule applies.
 */
const IDLE: LeadResult = { ok: false }

const field =
  'w-full rounded-sm border border-[color:var(--hairline)] bg-graphite px-4 py-3 text-off-white outline-none transition-colors duration-[120ms] ease-[var(--ease-out)] placeholder:text-gray-2 focus:border-white'

/**
 * The one form on the site. It takes enough to have a useful first
 * conversation and nothing more - no qualification quiz, no team-size
 * dropdown nobody reads.
 *
 * Driven by `useActionState` rather than an `onSubmit` handler, and that is the
 * load-bearing choice: `<form action={...}>` posts natively, so the form works
 * with JavaScript blocked. It previously carried `onSubmit` on a form with no
 * `action` and no `method` - with JS off, SEND issued a GET, the page reloaded
 * with empty fields, and the lead was silently discarded while looking exactly
 * like success. The audience is engineers on managed corporate machines, which
 * is precisely where that fails.
 */
export default function LeadForm({ intent = 'demo' }: { intent?: 'demo' | 'contact' }) {
  const [state, formAction, pending] = useActionState(submitLead, IDLE)

  if (state.ok) {
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

  // Restores what was typed when a validation failure round-trips the server
  // without JavaScript. With JS the browser keeps the values itself.
  const v = state.values ?? {}

  return (
    <form action={formAction} className="grid content-start gap-5">
      <input type="hidden" name="intent" value={intent} />

      {/* Honeypot - hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="lf-name"
          name="name"
          label="Name"
          autoComplete="name"
          required
          defaultValue={v.name}
          invalid={state.field === 'name'}
        />
        <Field
          id="lf-email"
          name="email"
          label="Work email"
          type="email"
          autoComplete="email"
          required
          defaultValue={v.email}
          invalid={state.field === 'email'}
        />
        <Field
          id="lf-company"
          name="company"
          label="Company"
          autoComplete="organization"
          optional
          defaultValue={v.company}
        />
        <Field
          id="lf-role"
          name="role"
          label="Role"
          placeholder="Verification lead, CAD…"
          optional
          defaultValue={v.role}
        />
      </div>

      <div>
        <label htmlFor="lf-note" className="label mb-2.5 block text-gray-2">
          What are you working on?
          <span className="ml-2 normal-case tracking-normal text-gray-2">optional</span>
        </label>
        <textarea
          id="lf-note"
          name="note"
          rows={4}
          defaultValue={v.note}
          className={`${field} resize-y`}
        />
      </div>

      <p aria-live="polite">
        {state.message && <span className="text-xs text-white">{state.message}</span>}
      </p>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" variant="solid" disabled={pending}>
          {pending ? 'Sending' : 'Send'}
        </Button>
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
  defaultValue,
  invalid,
}: {
  id: string
  name: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
  required?: boolean
  optional?: boolean
  defaultValue?: string
  invalid?: boolean
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
        defaultValue={defaultValue}
        aria-invalid={invalid || undefined}
        // No red: the system has no hue. A field that failed validation is
        // marked by lifting its border to white, the same escalation the focus
        // state uses, which is the only emphasis this palette has.
        className={`${field} ${invalid ? 'border-white' : ''}`}
      />
    </div>
  )
}
