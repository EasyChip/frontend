import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabaseEnv, warnMissingSupabaseEnv } from './env'

const PROTECTED_PATHS = ['/dashboard', '/onboarding', '/admin']

const isProtected = (pathname: string) =>
  PROTECTED_PATHS.some((p) => pathname.startsWith(p))

const redirectToLogin = (request: NextRequest, pathname: string) => {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('redirect', pathname)
  return NextResponse.redirect(url)
}

/**
 * Admin allowlist, server-only and environment-driven.
 * `ADMIN_EMAILS` is a comma-separated list; it carries no NEXT_PUBLIC prefix,
 * so it is never inlined into a client bundle.
 */
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // No Supabase configured: fail closed, never throw. Protected routes bounce
  // to /login (which renders a branded configuration notice); everything else
  // passes through untouched. A thrown error here would escape every React
  // error boundary and render a raw 500.
  if (!hasSupabaseEnv) {
    warnMissingSupabaseEnv('auth middleware')
    if (isProtected(pathname)) return redirectToLogin(request, pathname)
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Network or service failure: treat as unauthenticated rather than 500.
    if (isProtected(pathname)) return redirectToLogin(request, pathname)
    return supabaseResponse
  }

  // Authenticated users have no business on /login
  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (!user && isProtected(pathname)) return redirectToLogin(request, pathname)

  // Admin routes - allowlist only
  if (user && pathname.startsWith('/admin')) {
    const allowed = adminEmails()
    const email = (user.email ?? '').toLowerCase()
    if (!allowed.includes(email)) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
