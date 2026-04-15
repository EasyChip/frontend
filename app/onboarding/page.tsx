'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import CircuitBackground from '@/components/ui/CircuitBackground'

const COMPANY_STAGES = ['Academia', 'Startup', 'Mid-size', 'Enterprise'] as const
const INTEREST_OPTIONS = ['FlowBit', 'VisUPF', 'RTL-to-GDS workflow', 'Just exploring'] as const

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')

  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [companyStage, setCompanyStage] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [useCase, setUseCase] = useState('')

  // Prefill from auth metadata
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.replace('/login'); return }
      const meta = user.user_metadata
      if (meta?.full_name || meta?.name) setFullName(meta.full_name || meta.name)
      setPageLoading(false)
    })
  }, [router])

  const toggleInterest = (item: string) => {
    setInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) { setError('Please enter your name.'); return }
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/login'); return }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          company: company.trim() || null,
          role: role.trim() || null,
          company_stage: companyStage || null,
          interest_areas: interests.length > 0 ? interests : null,
          primary_use_case: useCase.trim() || null,
          onboarding_complete: true,
        })
        .eq('id', user.id)

      if (updateError) {
        // If profile doesn't exist yet (race condition), insert it
        if (updateError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              full_name: fullName.trim(),
              company: company.trim() || null,
              role: role.trim() || null,
              company_stage: companyStage || null,
              interest_areas: interests.length > 0 ? interests : null,
              primary_use_case: useCase.trim() || null,
              onboarding_complete: true,
            })
          if (insertError) { setError(insertError.message); setLoading(false); return }
        } else {
          setError(updateError.message); setLoading(false); return
        }
      }

      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ onboarding_complete: true }).eq('id', user.id)
    }
    router.push('/dashboard')
  }

  if (pageLoading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0A0A0A', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ color: '#555555', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <>
      <CircuitBackground />
      <div style={{
        position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '32px 16px',
        fontFamily: 'var(--font-sans)', color: '#FAFAFA', paddingTop: 80,
      }}>
        <div style={{
          width: '100%', maxWidth: 520, background: '#111111',
          border: '1px solid #1C1C1C', borderRadius: 16,
          padding: '40px 32px 32px',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 6px' }}>
              Complete your profile
            </h2>
            <p style={{ fontSize: 13, color: '#555555', margin: 0 }}>
              Help us personalize your experience. Takes 30 seconds.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8,
              fontSize: 13, color: '#EF4444', marginBottom: 16,
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Full Name */}
            <InputField label="Full name *" value={fullName} onChange={setFullName} placeholder="Rakshit Mishra" />

            {/* Company */}
            <InputField label="Company / Institution" value={company} onChange={setCompany} placeholder="BITS Pilani, Synopsys, etc." />

            {/* Role */}
            <InputField label="Role" value={role} onChange={setRole} placeholder="Design Engineer, Student, VP Engineering..." />

            {/* Company Stage */}
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#888888', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>
                Organization type
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {COMPANY_STAGES.map(stage => (
                  <button key={stage} type="button" onClick={() => setCompanyStage(companyStage === stage ? '' : stage)}
                    style={{
                      padding: '8px 16px', borderRadius: 6, fontSize: 13,
                      fontFamily: 'var(--font-sans)', cursor: 'pointer',
                      border: companyStage === stage ? '1px solid #C8962E' : '1px solid #1C1C1C',
                      background: companyStage === stage ? 'rgba(200,150,46,0.1)' : 'transparent',
                      color: companyStage === stage ? '#C8962E' : '#888888',
                      transition: 'all 0.2s',
                    }}
                  >{stage}</button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#888888', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>
                What are you interested in?
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {INTEREST_OPTIONS.map(item => (
                  <button key={item} type="button" onClick={() => toggleInterest(item)}
                    style={{
                      padding: '8px 16px', borderRadius: 6, fontSize: 13,
                      fontFamily: 'var(--font-sans)', cursor: 'pointer',
                      border: interests.includes(item) ? '1px solid #C8962E' : '1px solid #1C1C1C',
                      background: interests.includes(item) ? 'rgba(200,150,46,0.1)' : 'transparent',
                      color: interests.includes(item) ? '#C8962E' : '#888888',
                      transition: 'all 0.2s',
                    }}
                  >{item}</button>
                ))}
              </div>
            </div>

            {/* Use Case */}
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#888888', marginBottom: 6, fontFamily: 'var(--font-sans)' }}>
                Primary use case (optional)
              </label>
              <textarea value={useCase} onChange={e => setUseCase(e.target.value)}
                placeholder="What problem are you trying to solve?"
                rows={3}
                style={{
                  width: '100%', padding: '10px 12px', background: '#0A0A0A',
                  border: '1px solid #1C1C1C', borderRadius: 6, color: '#FAFAFA',
                  fontSize: 14, fontFamily: 'var(--font-sans)', outline: 'none',
                  resize: 'vertical', transition: 'border-color 0.2s', boxSizing: 'border-box',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#C8962E'}
                onBlur={e => e.currentTarget.style.borderColor = '#1C1C1C'}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button type="submit" disabled={loading} style={{
                flex: 1, padding: '12px 0', background: loading ? '#555555' : '#C8962E',
                color: '#0A0A0A', border: 'none', borderRadius: 8, fontSize: 14,
                fontWeight: 600, fontFamily: 'var(--font-mono)',
                cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s',
              }}>
                {loading ? 'Saving...' : 'Continue →'}
              </button>
              <button type="button" onClick={handleSkip} style={{
                padding: '12px 24px', background: 'transparent',
                border: '1px solid #1C1C1C', borderRadius: 8, color: '#555555',
                fontSize: 13, fontFamily: 'var(--font-sans)', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#888888'; e.currentTarget.style.color = '#888888' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1C1C1C'; e.currentTarget.style.color = '#555555' }}
              >Skip</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function InputField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, color: '#888888', marginBottom: 6, fontFamily: 'var(--font-sans)' }}>
        {label}
      </label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
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
