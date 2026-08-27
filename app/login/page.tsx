'use client'

import { useState, useEffect, Suspense, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppHeader from '@/components/layout/AppHeader'

type AuthMode = 'oauth' | 'email-link' | 'email-password'

const inputClass =
  'w-full rounded-md border border-line bg-void px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand-cyan'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const errorParam = searchParams.get('error')

  const [mode, setMode] = useState<AuthMode>('oauth')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(
    errorParam === 'auth_callback_failed'
      ? 'Authentication failed. Please try again.'
      : errorParam === 'auth_unavailable'
        ? 'Sign-in is not configured on this deployment.'
        : ''
  )
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [fullName, setFullName] = useState('')
  const [configured, setConfigured] = useState(true)

  useEffect(() => {
    setError('')
  }, [mode])

  // Auth is an environment concern; say so plainly instead of throwing.
  useEffect(() => {
    setConfigured(Boolean(createClient()))
  }, [])

  const getRedirectUrl = () =>
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`

  const withClient = async (fn: (c: NonNullable<ReturnType<typeof createClient>>) => Promise<void>) => {
    const supabase = createClient()
    if (!supabase) {
      setError('Sign-in is not configured on this deployment.')
      setLoading(false)
      return
    }
    await fn(supabase)
  }

  const oauth = (provider: 'google' | 'linkedin_oidc', friendly: string) => async () => {
    setLoading(true)
    setError('')
    try {
      await withClient(async (supabase) => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: { redirectTo: getRedirectUrl() },
        })
        if (error) {
          setError(error.message)
          setLoading(false)
        }
      })
    } catch {
      setError(`Could not connect to ${friendly}.`)
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return setError('Enter the email address to send the link to.')
    setLoading(true)
    setError('')
    try {
      await withClient(async (supabase) => {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: getRedirectUrl() },
        })
        if (error) {
          setError(error.message)
          setLoading(false)
          return
        }
        setMagicLinkSent(true)
        setLoading(false)
      })
    } catch {
      setError('Could not send the sign-in link. Try again.')
      setLoading(false)
    }
  }

  const handleEmailPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return setError('Enter your email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (isRegister && !fullName.trim()) return setError('Enter your full name.')
    setLoading(true)
    setError('')

    try {
      await withClient(async (supabase) => {
        if (isRegister) {
          const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: { full_name: fullName.trim() },
              emailRedirectTo: getRedirectUrl(),
            },
          })
          if (error) {
            setError(error.message)
            setLoading(false)
            return
          }
          setMagicLinkSent(true)
          setLoading(false)
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })
          if (error) {
            setError(error.message)
            setLoading(false)
            return
          }
          router.push(redirectTo)
        }
      })
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  if (magicLinkSent) {
    return (
      <Shell>
        <div className="w-full max-w-md rounded-lg border border-brand-cyan/30 bg-surface-1 p-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Check your email</h1>
          <p className="mt-3 leading-relaxed text-ink-2">
            We sent a sign-in link to <span className="text-ink">{email}</span>. Open it on this
            device to continue.
          </p>
          <button
            type="button"
            onClick={() => {
              setMagicLinkSent(false)
              setMode('oauth')
            }}
            className="mt-6 text-sm text-ink-3 transition-colors hover:text-ink-2"
          >
            Use a different method
          </button>
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
        {/* Left: why this exists. Hidden on small screens where the form leads. */}
        <div className="hidden lg:block">
          <h1 className="editorial text-4xl">
            One platform for everything around signoff.
          </h1>
          <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-ink-2">
            Sign in to reach the tools, your saved context, and early access as it opens.
          </p>
          <p className="mt-8 text-sm text-ink-3">
            Not signed up yet?{' '}
            <Link href="/contact#early-access" className="text-brand-cyan hover:underline underline-offset-4">
              Request early access
            </Link>
            .
          </p>
        </div>

        {/* Right: the form */}
        <div className="w-full rounded-lg border border-hair bg-surface-1 p-7">
          <h2 className="font-display text-xl font-semibold text-ink lg:hidden">Sign in</h2>

          {!configured && (
            <p className="mb-5 rounded-md border border-warning/30 bg-warning/5 px-4 py-3 text-sm text-ink-2">
              Sign-in is not configured on this deployment. The rest of the site works normally.
            </p>
          )}

          <p aria-live="polite">
            {error && (
              <span className="mb-5 block rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                {error}
              </span>
            )}
          </p>

          {mode === 'oauth' && (
            <div className="flex flex-col gap-3">
              <OAuthButton
                onClick={oauth('google', 'Google')}
                loading={loading}
                disabled={!configured}
                icon={<GoogleIcon />}
                label="Continue with Google"
              />
              <OAuthButton
                onClick={oauth('linkedin_oidc', 'LinkedIn')}
                loading={loading}
                disabled={!configured}
                icon={<LinkedInIcon />}
                label="Continue with LinkedIn"
              />

              <div className="my-2 flex items-center gap-3">
                <span className="h-px flex-1 bg-hair" />
                <span className="eyebrow text-ink-3">or</span>
                <span className="h-px flex-1 bg-hair" />
              </div>

              <button
                type="button"
                onClick={() => setMode('email-link')}
                disabled={!configured}
                className="w-full rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-3 hover:bg-surface-2 disabled:opacity-50"
              >
                Sign in with an email link
              </button>
              <button
                type="button"
                onClick={() => setMode('email-password')}
                disabled={!configured}
                className="py-1 text-sm text-ink-3 transition-colors hover:text-ink-2 disabled:opacity-50"
              >
                Use a password instead
              </button>
            </div>
          )}

          {mode === 'email-link' && (
            <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
              <Field id="lg-email" label="Work email" type="email" value={email} onChange={setEmail} />
              <SubmitButton loading={loading} label="Send the link" />
              <BackButton onClick={() => setMode('oauth')} />
            </form>
          )}

          {mode === 'email-password' && (
            <form onSubmit={handleEmailPassword} className="flex flex-col gap-4">
              {isRegister && (
                <Field id="lg-name" label="Full name" type="text" value={fullName} onChange={setFullName} />
              )}
              <Field id="lg-email2" label="Work email" type="email" value={email} onChange={setEmail} />
              <Field
                id="lg-pass"
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                hint="At least 6 characters"
              />
              <SubmitButton loading={loading} label={isRegister ? 'Create account' : 'Sign in'} />
              <button
                type="button"
                onClick={() => setIsRegister((v) => !v)}
                className="py-1 text-sm text-ink-3 transition-colors hover:text-ink-2"
              >
                {isRegister ? 'Already have an account? Sign in' : 'Need an account? Create one'}
              </button>
              <BackButton onClick={() => setMode('oauth')} />
            </form>
          )}
        </div>
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-16">{children}</main>
      <footer className="border-t border-hair px-6 py-6 text-center">
        <p className="text-sm text-ink-3">© 2026 EasyChip</p>
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-void">
          <span className="eyebrow text-ink-3">Loading</span>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function OAuthButton({
  onClick,
  loading,
  disabled,
  icon,
  label,
}: {
  onClick: () => void
  loading: boolean
  disabled?: boolean
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.98] disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  )
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  hint,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
      {hint && <p className="mt-1.5 text-sm text-ink-3">{hint}</p>}
    </div>
  )
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="sheen inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-violet px-8 text-base font-medium text-white transition-all duration-200 hover:brightness-110 hover:shadow-glow-violet-sm active:scale-[0.98] disabled:opacity-60"
    >
      {loading ? 'Working…' : label}
    </button>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-1 text-sm text-ink-3 transition-colors hover:text-ink-2"
    >
      ← All sign-in options
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
