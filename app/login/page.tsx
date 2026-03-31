'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import CircuitBackground from '@/components/ui/CircuitBackground'

type Tab = 'login' | 'register'

const POSITIONS = ['Student', 'Professor', 'Engineer', 'Researcher', 'Startup Founder'] as const

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [position, setPosition] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const clearErrors = () => setErrors({})

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    clearErrors()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setErrors({ form: error.message })
        setLoading(false)
        return
      }

      const onboarded = localStorage.getItem('easychip_onboarded')
      router.push(onboarded ? '/playground' : '/welcome')
    } catch {
      setErrors({ form: 'An unexpected error occurred.' })
      setLoading(false)
    }
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    clearErrors()

    const newErrors: Record<string, string> = {}
    if (!fullName.trim()) newErrors.fullName = 'Full name is required.'
    if (!position) newErrors.position = 'Please select a position.'
    if (!email.trim()) newErrors.email = 'Email is required.'
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            position,
          },
        },
      })

      if (error) {
        setErrors({ form: error.message })
        setLoading(false)
        return
      }

      if (data.user && phone.trim()) {
        await supabase
          .from('profiles')
          .update({ phone: phone.trim() })
          .eq('id', data.user.id)
      }

      const onboarded = localStorage.getItem('easychip_onboarded')
      router.push(onboarded ? '/playground' : '/welcome')
    } catch {
      setErrors({ form: 'An unexpected error occurred.' })
      setLoading(false)
    }
  }

  const switchTab = (t: Tab) => {
    setTab(t)
    clearErrors()
  }

  return (
    <>
      <style>{`
        @keyframes pulse-auth {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <CircuitBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          fontFamily: 'var(--font-sans)',
          color: '#FAFAFA',
        }}
      >
        {/* Left — visual side (hidden on mobile) */}
        <div
          style={{
            flex: '0 0 60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px',
          }}
          className="login-left-panel"
        >
          <div style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <img src="/logo.png" alt="EasyChip" style={{ width: 40 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#C8962E',
                  letterSpacing: '-0.01em',
                }}
              >
                EasyChip
              </span>
            </div>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#FAFAFA',
              }}
            >
              Natural Language
              <br />
              <span style={{ color: '#C8962E' }}>to Silicon.</span>
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: '#888888',
                margin: 0,
                maxWidth: 400,
              }}
            >
              Design hardware with plain English. EasyChip transforms your ideas into
              synthesizable RTL — no Verilog expertise required.
            </p>
          </div>
        </div>

        {/* Right — auth card */}
        <div
          style={{
            flex: '1 1 40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            minHeight: '100vh',
          }}
        >
          {/* Card */}
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              border: '1px solid #1C1C1C',
              borderRadius: 16,
              background: '#111111',
              padding: '40px 32px 32px',
              boxShadow: '0 0 60px rgba(200,150,46,0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* Logo + Brand (mobile only shows this, desktop shows left panel) */}
            <div style={{ textAlign: 'center', marginBottom: 28 }} className="login-card-brand">
              <img
                src="/logo.png"
                alt="EasyChip"
                style={{ width: 48, margin: '0 auto 12px', display: 'block' }}
              />
              <h1
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#C8962E',
                  margin: '0 0 6px',
                  letterSpacing: '-0.01em',
                }}
              >
                EasyChip
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: '#555555',
                  margin: 0,
                }}
              >
                Natural Language to Silicon.
              </p>
            </div>

            {/* Tab Toggle */}
            <div
              style={{
                display: 'flex',
                gap: 24,
                borderBottom: '1px solid #1C1C1C',
                marginBottom: 24,
              }}
            >
              {(['login', 'register'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: tab === t ? '#FAFAFA' : '#555555',
                    fontSize: 14,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    paddingBottom: 10,
                    borderBottom: tab === t ? '2px solid #C8962E' : '2px solid transparent',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {t === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>

            {/* Form Error */}
            {errors.form && (
              <p style={{ color: '#EF4444', fontSize: 13, margin: '0 0 16px' }}>
                {errors.form}
              </p>
            )}

            {/* Login Form */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                  placeholder="you@example.com"
                />
                <Field
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  error={errors.password}
                  placeholder="••••••••"
                />
                <SubmitButton loading={loading} />
              </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={setFullName}
                  error={errors.fullName}
                  placeholder="Jane Doe"
                />
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                  placeholder="you@example.com"
                />
                <Field
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  error={errors.password}
                  placeholder="••••••••"
                />
                <Field
                  label="Phone (optional)"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                />
                {/* Position Dropdown */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: '#888888',
                      marginBottom: 6,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Position
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#0A0A0A',
                      border: `1px solid ${errors.position ? '#EF4444' : '#1C1C1C'}`,
                      borderRadius: 6,
                      color: position ? '#FAFAFA' : '#555555',
                      fontSize: 14,
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => {
                      if (!errors.position) e.currentTarget.style.borderColor = '#C8962E'
                    }}
                    onBlur={(e) => {
                      if (!errors.position) e.currentTarget.style.borderColor = '#1C1C1C'
                    }}
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {POSITIONS.map((p) => (
                      <option key={p} value={p} style={{ background: '#0A0A0A', color: '#FAFAFA' }}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p style={{ color: '#EF4444', fontSize: 12, margin: '4px 0 0' }}>
                      {errors.position}
                    </p>
                  )}
                </div>
                <SubmitButton loading={loading} />
              </form>
            )}
          </div>

          {/* Demo Notice */}
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              marginTop: 16,
              padding: '14px 20px',
              border: '1px solid #1C1C1C',
              borderRadius: 10,
              background: 'rgba(17, 17, 17, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontSize: 12,
              lineHeight: 1.6,
              color: '#555555',
              fontFamily: 'var(--font-sans)',
            }}
          >
            This is an early preview of the EasyChip Playground. The AI model is not yet
            live — this demo showcases the product experience. Beta access begins Q3 2026.
          </div>

          {/* Footer */}
          <p
            style={{
              marginTop: 24,
              fontSize: 12,
              color: '#555555',
              fontFamily: 'var(--font-mono)',
            }}
          >
            © 2026 EasyChip — BITS Pilani
          </p>
        </div>
      </div>

      {/* Responsive: hide left panel on mobile, show card brand on mobile */}
      <style>{`
        .login-left-panel {
          display: flex !important;
        }
        .login-card-brand {
          display: none !important;
        }
        @media (max-width: 768px) {
          .login-left-panel {
            display: none !important;
          }
          .login-card-brand {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}

/* ─── Reusable Components ─────────────────────────────────────────────── */

function Field({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 13,
          color: '#888888',
          marginBottom: 6,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px',
          background: '#0A0A0A',
          border: `1px solid ${error ? '#EF4444' : '#1C1C1C'}`,
          borderRadius: 6,
          color: '#FAFAFA',
          fontSize: 14,
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#C8962E'
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#1C1C1C'
        }}
      />
      {error && (
        <p style={{ color: '#EF4444', fontSize: 12, margin: '4px 0 0' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: '100%',
        padding: '12px 0',
        background: loading ? '#555555' : '#C8962E',
        color: '#0A0A0A',
        border: 'none',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'opacity 0.2s',
        marginTop: 8,
        animation: loading ? 'pulse-auth 1.5s ease-in-out infinite' : 'none',
      }}
    >
      {loading ? 'Authenticating...' : 'Continue →'}
    </button>
  )
}
