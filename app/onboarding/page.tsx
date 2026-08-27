'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppHeader from '@/components/layout/AppHeader'
import { LIVE } from '@/lib/tools'
import { cn } from '@/lib/utils'

const COMPANY_STAGES = ['Academia', 'Startup', 'Mid-size', 'Enterprise'] as const

/**
 * Interest options come from the live tool registry, plus the two cross-cutting
 * answers. Offering four hardcoded names out of a fifty-four-tool platform
 * argued against the breadth thesis at the exact moment someone was telling us
 * what they wanted.
 */
const INTEREST_OPTIONS = [
  ...LIVE.map((t) => t.name),
  'Escanor (local-first)',
  'Full RTL-to-GDS flow',
  'Still exploring',
]

const inputClass =
  'w-full rounded-md border border-line bg-void px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand-cyan'

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

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) {
      router.replace('/login')
      return
    }
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        if (!user) {
          router.replace('/login')
          return
        }
        const meta = user.user_metadata
        if (meta?.full_name || meta?.name) setFullName(meta.full_name || meta.name)
        setPageLoading(false)
      })
      .catch(() => router.replace('/login'))
  }, [router])

  const toggleInterest = (item: string) =>
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) return setError('Enter your name so we know who we are talking to.')
    setLoading(true)
    setError('')

    const supabase = createClient()
    if (!supabase) {
      setError('Your session is unavailable. Sign in again.')
      setLoading(false)
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }

      const payload = {
        full_name: fullName.trim(),
        company: company.trim() || null,
        role: role.trim() || null,
        company_stage: companyStage || null,
        interest_areas: interests.length > 0 ? interests : null,
        primary_use_case: useCase.trim() || null,
        onboarding_complete: true,
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', user.id)

      if (updateError) {
        // Profile row may not exist yet - insert instead.
        if (updateError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ id: user.id, ...payload })
          if (insertError) {
            setError(insertError.message)
            setLoading(false)
            return
          }
        } else {
          setError(updateError.message)
          setLoading(false)
          return
        }
      }

      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    const supabase = createClient()
    if (supabase) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('profiles').update({ onboarding_complete: true }).eq('id', user.id)
        }
      } catch {
        // Skipping must never block the route change.
      }
    }
    router.push('/dashboard')
  }

  if (pageLoading) {
    return (
      <div className="flex min-h-dvh flex-col">
        <AppHeader />
        <main className="flex flex-1 items-center justify-center px-6">
          <span className="eyebrow text-ink-3">Loading</span>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="flex flex-1 justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-xl">
          <h1 className="editorial-title text-3xl">Tell us how you work</h1>
          <p className="mt-3 leading-relaxed text-ink-2">
            This shapes what we show you first, and what we tell you about as tools go live.
            Only your name is required.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <p aria-live="polite">
              {error && (
                <span className="block rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                  {error}
                </span>
              )}
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="ob-name" className="mb-2 block text-sm font-medium text-ink-2">
                  Full name
                </label>
                <input
                  id="ob-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ob-company" className="mb-2 block text-sm font-medium text-ink-2">
                  Company or institution
                  <span className="ml-2 font-normal text-ink-3">optional</span>
                </label>
                <input
                  id="ob-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ob-role" className="mb-2 block text-sm font-medium text-ink-2">
                  Role
                  <span className="ml-2 font-normal text-ink-3">optional</span>
                </label>
                <input
                  id="ob-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Verification lead, PD engineer…"
                  className={inputClass}
                />
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium text-ink-2">
                Where you work
                <span className="ml-2 font-normal text-ink-3">optional</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {COMPANY_STAGES.map((stage) => (
                  <Choice
                    key={stage}
                    selected={companyStage === stage}
                    onClick={() => setCompanyStage(companyStage === stage ? '' : stage)}
                  >
                    {stage}
                  </Choice>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-sm font-medium text-ink-2">
                What you want to reach first
                <span className="ml-2 font-normal text-ink-3">optional, pick any</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((item) => (
                  <Choice
                    key={item}
                    selected={interests.includes(item)}
                    onClick={() => toggleInterest(item)}
                  >
                    {item}
                  </Choice>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="ob-usecase" className="mb-2 block text-sm font-medium text-ink-2">
                What are you trying to get done?
                <span className="ml-2 font-normal text-ink-3">optional</span>
              </label>
              <textarea
                id="ob-usecase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                rows={3}
                className={cn(inputClass, 'resize-y')}
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={loading}
                className="sheen inline-flex h-12 items-center justify-center rounded-full bg-brand-violet px-8 text-base font-medium text-white transition-all duration-200 hover:brightness-110 hover:shadow-glow-violet-sm active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? 'Saving…' : 'Continue'}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-ink-3 transition-colors hover:text-ink-2"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'rounded-full border px-4 py-2 text-sm transition-colors',
        selected
          ? 'border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan'
          : 'border-hair text-ink-2 hover:border-line hover:text-ink'
      )}
    >
      {children}
    </button>
  )
}
