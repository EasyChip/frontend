/**
 * Supabase environment, resolved once and checked rather than asserted.
 *
 * These vars are inlined at build time by Next, so they must be read as whole
 * `process.env.X` expressions - never destructured or accessed dynamically.
 *
 * The previous code used non-null assertions, which turned a missing key into
 * a thrown error inside `createServerClient`. In middleware that throw lands
 * outside every React error boundary, so one unset var produced a raw,
 * unbranded 500 on /login, /onboarding and /dashboard - and took the public
 * /contact booking widget down with it. Nothing here throws.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const SUPABASE_URL = url ?? ''
export const SUPABASE_ANON_KEY = anonKey ?? ''

/** True only when both values are present and non-empty. */
export const hasSupabaseEnv = Boolean(url && anonKey)

/** One-time warning so a misconfigured deploy is loud in logs, not in the UI. */
export function warnMissingSupabaseEnv(where: string) {
  if (hasSupabaseEnv) return
  console.warn(
    `[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set - ${where} is running without auth. Copy .env.example to .env.local to enable it.`
  )
}
