'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        color: '#FAFAFA',
        padding: '24px',
      }}
    >
      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          border: '1px solid #222222',
          borderRadius: 8,
          background: '#111111',
          padding: '40px 32px 32px',
        }}
      >
        {/* Logo + Tagline */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src="/logo.png"
            alt="EasyChip"
            style={{ height: 40, margin: '0 auto 12px' }}
          />
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: '#888888',
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
            borderBottom: '1px solid #222222',
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
                color: tab === t ? '#FAFAFA' : '#888888',
                fontSize: 14,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                paddingBottom: 10,
                borderBottom: tab === t ? '2px solid #FAFAFA' : '2px solid transparent',
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
                  border: `1px solid ${errors.position ? '#EF4444' : '#222222'}`,
                  borderRadius: 6,
                  color: position ? '#FAFAFA' : '#888888',
                  fontSize: 14,
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  if (!errors.position) e.currentTarget.style.borderColor = '#333333'
                }}
                onBlur={(e) => {
                  if (!errors.position) e.currentTarget.style.borderColor = '#222222'
                }}
              >
                <option value="" disabled>
                  Select your role
                </option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p} style={{ background: '#111111', color: '#FAFAFA' }}>
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
          padding: '16px 20px',
          border: '1px solid #222222',
          borderRadius: 8,
          background: '#111111',
          fontSize: 12,
          lineHeight: 1.6,
          color: '#888888',
          fontFamily: 'var(--font-sans)',
        }}
      >
        This is an early preview of the EasyChip Playground. The AI model is not yet
        live — this demo showcases the product experience. Beta access begins Q3 2026.
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: 32,
          fontSize: 12,
          color: '#888888',
          fontFamily: 'var(--font-mono)',
        }}
      >
        © 2026 EasyChip — BITS Pilani
      </p>
    </div>
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
          border: `1px solid ${error ? '#EF4444' : '#222222'}`,
          borderRadius: 6,
          color: '#FAFAFA',
          fontSize: 14,
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#333333'
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#222222'
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
        background: loading ? '#888888' : '#FAFAFA',
        color: '#0A0A0A',
        border: 'none',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'opacity 0.2s',
        marginTop: 8,
        animation: loading ? 'pulse-auth 1.5s ease-in-out infinite' : 'none',
      }}
    >
      <style>{`
        @keyframes pulse-auth {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
      {loading ? 'Authenticating...' : 'Continue →'}
    </button>
  )
}
