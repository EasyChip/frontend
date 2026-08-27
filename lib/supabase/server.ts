import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabaseEnv, warnMissingSupabaseEnv } from './env'

/**
 * Server Supabase client, or `null` when the environment is not configured.
 * Callers must handle `null` rather than relying on a throw.
 */
export async function createClient() {
  if (!hasSupabaseEnv) {
    warnMissingSupabaseEnv('the server client')
    return null
  }

  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Component - ignore
        }
      },
    },
  })
}
