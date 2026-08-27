'use server'

import { createClient } from '@/lib/supabase/server'

export interface LeadResult {
  ok: boolean
  /** Names the problem and the recovery, never just "something went wrong". */
  message?: string
  /** Which field the message is about, so the error can be shown at its source. */
  field?: 'name' | 'email'
  /** Echoed back so a no-JS re-render restores what was typed. */
  values?: Record<string, string>
}


const MAX = { name: 120, email: 200, company: 160, role: 120, note: 2000 }

/**
 * Store an inbound lead.
 *
 * This is the only thing the database does on this site. There is no
 * authenticated area, no session and no user record - a lead is a row someone
 * chose to leave, and the team reaches out from there.
 *
 * The signature is `(prevState, formData)` because the form drives it through
 * `useActionState`, which is what makes the form work with JavaScript off: the
 * browser posts natively, this runs on the server, and the page re-renders
 * carrying the returned state. The previous version was a plain
 * `(formData)` handler wired to `onSubmit` on a form with no `action` and no
 * `method` - so a visitor with JS blocked issued a GET, watched the fields
 * clear, and lost the lead while it looked exactly like success.
 *
 * `values` is echoed back for the same reason: without it, a validation failure
 * on a no-JS submit would blank everything the visitor had typed.
 */
export async function submitLead(
  _prev: LeadResult | null,
  formData: FormData
): Promise<LeadResult> {
  const get = (k: string, limit: number) =>
    String(formData.get(k) ?? '').trim().slice(0, limit)

  const name = get('name', MAX.name)
  const email = get('email', MAX.email)
  const company = get('company', MAX.company)
  const role = get('role', MAX.role)
  const note = get('note', MAX.note)
  const intent = get('intent', 40) || 'demo'

  // Honeypot: a real person never fills a field they cannot see.
  if (get('website', 200)) return { ok: true }

  const values = { name, email, company, role, note }

  if (!name) {
    return {
      ok: false,
      field: 'name',
      values,
      message: 'Add your name so we know who is writing.',
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return {
      ok: false,
      field: 'email',
      values,
      message: 'That email address does not look right. Check it and try again.',
    }
  }

  const supabase = await createClient()
  if (!supabase) {
    return {
      ok: false,
      values,
      message:
        'The form is not connected on this deployment. Email founder@easychip.org and we will pick it up there.',
    }
  }

  const { error } = await supabase.from('leads').insert({
    name,
    email,
    company: company || null,
    role: role || null,
    note: note || null,
    intent,
  })

  if (error) {
    return {
      ok: false,
      values,
      message:
        'We could not save that. Try again, or email founder@easychip.org and we will pick it up there.',
    }
  }

  return { ok: true }
}
