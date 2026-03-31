'use client'

import { useRouter } from 'next/navigation'
import { usePlaygroundStore } from '@/stores/playground-store'
import { createClient } from '@/lib/supabase/client'

export default function ComingSoonModal() {
  const router = useRouter()
  const { comingSoonModalOpen, setComingSoonModalOpen } = usePlaygroundStore()

  if (!comingSoonModalOpen) return null

  const handleReturn = () => {
    setComingSoonModalOpen(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setComingSoonModalOpen(false)
    router.push('/login')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleReturn()
      }}
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid #222222',
          borderRadius: 8,
          maxWidth: 420,
          width: '90%',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <img
          src="/logo.png"
          alt="EasyChip"
          style={{ height: 32, margin: '0 auto 28px' }}
        />

        {/* Title */}
        <h2
          style={{
            color: '#FAFAFA',
            fontSize: 18,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            margin: '0 0 16px',
          }}
        >
          The AI model is not yet live.
        </h2>

        {/* Description */}
        <p
          style={{
            color: '#888888',
            fontSize: 13,
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.6,
            margin: '0 0 8px',
          }}
        >
          We&apos;re training on 31,000+ verified RTL samples. The model will be
          available in Q3 2026 beta.
        </p>

        <p
          style={{
            color: '#555555',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            margin: '0 0 32px',
          }}
        >
          You&apos;ll be the first to know.
        </p>

        {/* Buttons */}
        <button
          onClick={handleReturn}
          style={{
            width: '100%',
            padding: '12px 0',
            background: '#FAFAFA',
            color: '#0A0A0A',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 200ms ease',
            marginBottom: 10,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Return to Playground
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px 0',
            background: 'transparent',
            color: '#888888',
            border: '1px solid #222222',
            borderRadius: 8,
            fontSize: 13,
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'border-color 200ms ease, color 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#333333'
            e.currentTarget.style.color = '#FAFAFA'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#222222'
            e.currentTarget.style.color = '#888888'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
