'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/login')
      } else {
        setAuthenticated(true)
      }
      setLoading(false)
    })
  }, [router])

  if (loading) return <LoadingSkeleton />
  if (!authenticated) return null
  return <>{children}</>
}

function LoadingSkeleton() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
      `}</style>

      {/* Top bar skeleton */}
      <div
        style={{
          height: 48,
          borderBottom: '1px solid #222222',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 16,
        }}
      >
        <SkeletonBlock width={100} height={20} />
        <div style={{ flex: 1 }} />
        <SkeletonBlock width={32} height={32} borderRadius={16} />
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar skeleton */}
        <div
          style={{
            width: 260,
            borderRight: '1px solid #222222',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <SkeletonBlock width="100%" height={36} />
          <SkeletonBlock width="80%" height={28} />
          <SkeletonBlock width="90%" height={28} />
          <SkeletonBlock width="70%" height={28} />
          <SkeletonBlock width="85%" height={28} />
        </div>

        {/* Main content skeleton */}
        <div style={{ flex: 1, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SkeletonBlock width="40%" height={24} />
          <SkeletonBlock width="100%" height={140} />
          <div style={{ display: 'flex', gap: 16 }}>
            <SkeletonBlock width="50%" height={100} />
            <SkeletonBlock width="50%" height={100} />
          </div>
          <SkeletonBlock width="100%" height={200} />
        </div>
      </div>
    </div>
  )
}

function SkeletonBlock({
  width,
  height,
  borderRadius = 6,
}: {
  width: number | string
  height: number
  borderRadius?: number
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: '#FAFAFA',
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
      }}
    />
  )
}
