import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabaseEnv, warnMissingSupabaseEnv } from './env'

/**
 * Browser Supabase client, or `null` when the environment is not configured.
 *
 * Callers must handle `null`. That is the point: auth is an enhancement on
 * public surfaces (see BookMeeting's prefill), and a missing key should never
 * be able to unmount a page.
 */
export function createClient() {
  if (!hasSupabaseEnv) {
    warnMissingSupabaseEnv('the browser client')
    return null
  }
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
