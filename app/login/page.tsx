'use client'

import { useState, FormEvent, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import CircuitBackground from '@/components/ui/CircuitBackground'
import Image from 'next/image'

type AuthMode = 'oauth' | 'email-link' | 'email-password'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const errorParam = searchParams.get('error')

  const [mode, setMode] = useState<AuthMode>('oauth')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(errorParam === 'auth_callback_failed' ? 'Authentication failed. Please try again.' : '')
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [fullName, setFullName] = useState('')

  // Clear error on mode change
  useEffect(() => { setError('') }, [mode])

  const getRedirectUrl = () => {
    const origin = window.location.origin
    return `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: getRedirectUrl() },
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      }
    } catch {
      setError('Failed to connect to Google.')
      setLoading(false)
    }
  }

  const handleLinkedInLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: { redirectTo: getRedirectUrl() },
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      }
    } catch {
      setError('Failed to connect to LinkedIn.')
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { setError('Email is required.'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
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
    } catch {
      setError('Failed to send magic link.')
      setLoading(false)
    }
  }

  const handleEmailPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { setError('Email is required.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (isRegister && !fullName.trim()) { setError('Full name is required.'); return }
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: getRedirectUrl(),
          },
        })
        if (error) { setError(error.message); setLoading(false); return }
        setMagicLinkSent(true)
        setLoading(false)
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (error) { setError(error.message); setLoading(false); return }
        router.push(redirectTo)
      }
    } catch {
      setError('An unexpected error occurred.')
      setLoading(false)
    }
  }

  // Magic link sent confirmation
  if (magicLinkSent) {
    return (
      <>
        <CircuitBackground />
        <div style={{
          position: 'relative', zIndex: 1, minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-sans)', color: '#FAFAFA', paddingTop: 60,
        }}>
          <div style={{
            maxWidth: 420, width: '100%', padding: '48px 32px',
            background: '#111111', border: '1px solid #1C1C1C',
            borderRadius: 16, textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✉</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px' }}>Check your email</h2>
            <p style={{ fontSize: 14, color: '#888888', lineHeight: 1.6, margin: '0 0 24px' }}>
              We sent a {isRegister ? 'confirmation' : 'sign-in'} link to <strong style={{ color: '#C8962E' }}>{email}</strong>.
              Click the link to continue.
            </p>
            <button
              onClick={() => { setMagicLinkSent(false); setEmail(''); setMode('oauth') }}
              style={{
                background: 'none', border: '1px solid #1C1C1C', borderRadius: 8,
                color: '#888888', padding: '10px 24px', fontSize: 13, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#C8962E'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C1C'}
            >
              ← Back to login
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @keyframes pulse-auth { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>

      <CircuitBackground />

      <div style={{
        position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex',
        fontFamily: 'var(--font-sans)', color: '#FAFAFA', paddingTop: 60,
      }}>
        {/* Left — visual side */}
        <div style={{
          flex: '0 0 55%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '64px',
        }} className="login-left-panel">
          <div style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <Image src="/logo.png" alt="EasyChip" width={40} height={40} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600,
                color: '#C8962E', letterSpacing: '-0.01em',
              }}>EasyChip</span>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, margin: '0 0 16px', color: '#FAFAFA' }}>
              Prompt In.<br /><span style={{ color: '#C8962E' }}>Silicon Out.</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#888888', margin: 0, maxWidth: 400 }}>
              AI-native EDA platform. Sign in to access tools, book demos,
              and track your semiconductor design workflow.
            </p>
          </div>
        </div>

        {/* Right — auth card */}
        <div style={{
          flex: '1 1 45%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '32px 24px',
          minHeight: '100vh',
        }}>
          <div style={{
            width: '100%', maxWidth: 420, border: '1px solid #1C1C1C',
            borderRadius: 16, background: '#111111', padding: '36px 32px 28px',
            boxShadow: '0 0 60px rgba(200,150,46,0.05)',
          }}>
            {/* Mobile brand */}
            <div style={{ textAlign: 'center', marginBottom: 24 }} className="login-card-brand">
              <Image src="/logo.png" alt="EasyChip" width={44} height={44} style={{ margin: '0 auto 10px', display: 'block' }} />
              <h1 style={{
                fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600,
                color: '#C8962E', margin: '0 0 4px', letterSpacing: '-0.01em',
              }}>EasyChip</h1>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#555555', margin: 0 }}>
                Prompt In. Silicon Out.
              </p>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px' }}>Welcome</h3>
            <p style={{ fontSize: 13, color: '#555555', margin: '0 0 24px' }}>
              Sign in to continue to EasyChip
            </p>

            {/* Error */}
            {error && (
              <div style={{
                padding: '10px 14px', background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8,
                fontSize: 13, color: '#EF4444', marginBottom: 16,
              }}>{error}</div>
            )}

            {/* OAuth Buttons */}
            {mode === 'oauth' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <OAuthButton
                  onClick={handleGoogleLogin}
                  loading={loading}
                  icon={<GoogleIcon />}
                  label="Continue with Google"
                />
                <OAuthButton
                  onClick={handleLinkedInLogin}
                  loading={loading}
                  icon={<LinkedInIcon />}
                  label="Continue with LinkedIn"
                />

                {/* Divider */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0',
                }}>
                  <div style={{ flex: 1, height: 1, background: '#1C1C1C' }} />
                  <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>or</span>
                  <div style={{ flex: 1, height: 1, background: '#1C1C1C' }} />
                </div>

                {/* Email options */}
                <button
                  onClick={() => setMode('email-link')}
                  style={{
                    width: '100%', padding: '11px 0', background: 'transparent',
                    border: '1px solid #1C1C1C', borderRadius: 8, color: '#FAFAFA',
                    fontSize: 14, fontFamily: 'var(--font-sans)', cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#C8962E'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C1C'}
                >
                  Sign in with email link
                </button>
                <button
                  onClick={() => setMode('email-password')}
                  style={{
                    background: 'none', border: 'none', color: '#555555',
                    fontSize: 12, cursor: 'pointer', padding: '4px 0',
                    fontFamily: 'var(--font-sans)', textAlign: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#888888'}
                  onMouseLeave={e => e.currentTarget.style.color = '#555555'}
                >
                  Use email & password instead
                </button>
              </div>
            )}

            {/* Email Magic Link */}
            {mode === 'email-link' && (
              <form onSubmit={handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 13, color: '#888888', margin: 0 }}>
                  Enter your email and we&apos;ll send you a sign-in link.
                </p>
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                <SubmitButton loading={loading} label="Send magic link" />
                <BackButton onClick={() => setMode('oauth')} />
              </form>
            )}

            {/* Email + Password */}
            {mode === 'email-password' && (
              <form onSubmit={handleEmailPassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Toggle login/register */}
                <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #1C1C1C', marginBottom: 4 }}>
                  {(['Sign in', 'Register'] as const).map((t) => (
                    <button key={t} type="button"
                      onClick={() => { setIsRegister(t === 'Register'); setError('') }}
                      style={{
                        background: 'none', border: 'none', paddingBottom: 8,
                        borderBottom: (t === 'Register') === isRegister ? '2px solid #C8962E' : '2px solid transparent',
                        color: (t === 'Register') === isRegister ? '#FAFAFA' : '#555555',
                        fontSize: 13, fontFamily: 'var(--font-sans)', cursor: 'pointer',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                    >{t}</button>
                  ))}
                </div>

                {isRegister && (
                  <Field label="Full Name" type="text" value={fullName} onChange={setFullName} placeholder="Jane Doe" />
                )}
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
                <SubmitButton loading={loading} label={isRegister ? 'Create account' : 'Sign in'} />
                <BackButton onClick={() => setMode('oauth')} />
              </form>
            )}
          </div>

          {/* Notice */}
          <div style={{
            width: '100%', maxWidth: 420, marginTop: 16, padding: '12px 20px',
            border: '1px solid #1C1C1C', borderRadius: 10,
            background: 'rgba(17, 17, 17, 0.8)', fontSize: 12, lineHeight: 1.6,
            color: '#555555', fontFamily: 'var(--font-sans)',
          }}>
            EasyChip is building an AI-native EDA platform. The AI model is not yet
            live — we&apos;re training and validating now. Beta access begins Q3 2026.
          </div>

          <p style={{ marginTop: 20, fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>
            © 2026 EasyChip — BITS Pilani
          </p>
        </div>
      </div>

      <style>{`
        .login-left-panel { display: flex !important; }
        .login-card-brand { display: none !important; }
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
          .login-card-brand { display: block !important; }
        }
      `}</style>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#555555', fontFamily: 'var(--font-mono)', fontSize: 14 }}>Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function OAuthButton({ onClick, loading, icon, label }: {
  onClick: () => void; loading: boolean; icon: React.ReactNode; label: string
}) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      width: '100%', padding: '11px 0', background: '#FAFAFA', border: 'none',
      borderRadius: 8, color: '#0A0A0A', fontSize: 14, fontWeight: 500,
      fontFamily: 'var(--font-sans)', cursor: loading ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      transition: 'opacity 0.2s',
      opacity: loading ? 0.6 : 1,
    }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
      onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = '1' }}
    >
      {icon}
      {label}
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function Field({ label, type, value, onChange, placeholder }: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, color: '#888888', marginBottom: 6, fontFamily: 'var(--font-sans)' }}>
        {label}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 12px', background: '#0A0A0A',
          border: '1px solid #1C1C1C', borderRadius: 6, color: '#FAFAFA',
          fontSize: 14, fontFamily: 'var(--font-sans)', outline: 'none',
          transition: 'border-color 0.2s', boxSizing: 'border-box',
        }}
        onFocus={e => e.currentTarget.style.borderColor = '#C8962E'}
        onBlur={e => e.currentTarget.style.borderColor = '#1C1C1C'}
      />
    </div>
  )
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: '100%', padding: '12px 0', background: loading ? '#555555' : '#C8962E',
      color: '#0A0A0A', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
      fontFamily: 'var(--font-mono)', cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'opacity 0.2s', marginTop: 4,
      animation: loading ? 'pulse-auth 1.5s ease-in-out infinite' : 'none',
    }}>
      {loading ? 'Please wait...' : `${label} →`}
    </button>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      background: 'none', border: 'none', color: '#555555', fontSize: 12,
      cursor: 'pointer', padding: '4px 0', fontFamily: 'var(--font-sans)',
      textAlign: 'center', transition: 'color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.color = '#888888'}
      onMouseLeave={e => e.currentTarget.style.color = '#555555'}
    >
      ← Back to all sign-in options
    </button>
  )
}
