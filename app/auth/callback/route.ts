import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Check if this is a first-time user who needs onboarding
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()

        // If no profile or name not set, send to onboarding
        if (!profile?.full_name) {
          const forwardedHost = request.headers.get('x-forwarded-host')
          const isLocalEnv = process.env.NODE_ENV === 'development'
          if (isLocalEnv) {
            return NextResponse.redirect(`${origin}/onboarding`)
          } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}/onboarding`)
          } else {
            return NextResponse.redirect(`${origin}/onboarding`)
          }
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Auth code exchange failed — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
