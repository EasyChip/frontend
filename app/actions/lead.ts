'use server'

import { createClient } from '@/lib/supabase/server'

export interface LeadResult {
  ok: boolean
  /** Names the problem and the recovery, never just "something went wrong". */
  message?: string
}

const MAX = { name: 120, email: 200, company: 160, role: 120, note: 2000 }

/**
 * Store an inbound lead.
 *
 * This is the only thing the database does on this site. There is no
 * authenticated area, no session and no user record — a lead is a row someone
 * chose to leave, and the team reaches out from there.
 */
export async function submitLead(formData: FormData): Promise<LeadResult> {
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

  if (!name) return { ok: false, message: 'Add your name so we know who is writing.' }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: 'That email address does not look right. Check it and try again.' }
  }

  const supabase = await createClient()
  if (!supabase) {
    return {
      ok: false,
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
      message:
        'We could not save that. Try again, or email founder@easychip.org and we will pick it up there.',
    }
  }

  return { ok: true }
}
