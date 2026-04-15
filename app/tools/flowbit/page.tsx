'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const FEATURES = [
  {
    title: 'Visual Flow Definition',
    description: 'Define multi-step EDA workflows through a drag-and-drop canvas. See dependencies, parallelism, and critical paths at a glance — no scripting required.',
  },
  {
    title: 'Real-Time Execution Monitoring',
    description: 'Watch your flow execute step by step. Get live status on each stage, automatic error detection, and instant notifications when jobs complete or fail.',
  },
  {
    title: 'Team Collaboration',
    description: 'Share flows across your organization. Version control built in. Review, comment, and approve flow changes before they hit production runs.',
  },
]

const COMPARISON = [
  { aspect: 'Flow definition', flowbit: 'Visual canvas with drag-and-drop', status_quo: 'Makefiles, Tcl scripts, shell scripts' },
  { aspect: 'Execution visibility', flowbit: 'Live dashboard with step-by-step status', status_quo: 'Log files, manual monitoring' },
  { aspect: 'Error handling', flowbit: 'Automatic retry, fallback paths, alerts', status_quo: 'Manual re-run, grep through logs' },
  { aspect: 'Collaboration', flowbit: 'Shared flows, version control, review', status_quo: 'Email scripts, shared drives' },
  { aspect: 'Onboarding time', flowbit: 'Hours — visual, self-documenting', status_quo: 'Weeks — tribal knowledge, undocumented' },
]

export default function FlowBitPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
    })
  }, [])

  const handleRequestDemo = () => {
    if (isLoggedIn) {
      router.push('/book?context=FlowBit')
    } else {
      router.push('/login?redirect=' + encodeURIComponent('/book?context=FlowBit'))
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', fontFamily: 'var(--font-sans)',
      color: '#FAFAFA',
    }}>
      {/* Hero */}
      <section style={{
        padding: '140px 48px 80px', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(200,150,46,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Link href="/tools" style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555555',
              textDecoration: 'none', letterSpacing: '0.08em',
            }}>Tools</Link>
            <span style={{ color: '#555555' }}>/</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8962E',
              letterSpacing: '0.08em',
            }}>FlowBit</span>
            <span style={{
              padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600,
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
              background: 'rgba(200,150,46,0.1)', color: '#C8962E',
              border: '1px solid rgba(200,150,46,0.2)', marginLeft: 4,
            }}>Proprietary</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300,
            lineHeight: 1.08, letterSpacing: '-0.03em',
            margin: '0 0 20px', maxWidth: 600,
          }}>
            Visual workflow orchestration for semiconductor design.
          </h1>
          <p style={{
            fontSize: 17, color: '#888888', lineHeight: 1.7,
            maxWidth: 560, margin: '0 0 36px',
          }}>
            Replace fragile Makefile-based flows with an interactive, visual orchestrator.
            Define, execute, and monitor multi-step EDA workflows — from RTL through signoff.
          </p>
          <button onClick={handleRequestDemo} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
            background: '#C8962E', color: '#0A0A0A', padding: '14px 28px',
            borderRadius: 2, border: 'none', cursor: 'pointer',
            letterSpacing: '0.08em', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Request a Demo →</button>
        </div>
      </section>

      {/* What it does */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8962E',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>What it does</span>
        <h2 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0 32px', letterSpacing: '-0.02em' }}>
          EDA workflow orchestration, reimagined.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              padding: '24px', background: '#111111', border: '1px solid #1C1C1C',
              borderRadius: 10,
            }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 10px', color: '#FAFAFA' }}>{f.title}</h4>
              <p style={{ fontSize: 14, color: '#888888', lineHeight: 1.65, margin: 0 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it's different */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8962E',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Why it&apos;s different</span>
        <h2 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0 32px', letterSpacing: '-0.02em' }}>
          FlowBit vs. the status quo.
        </h2>
        <div style={{
          border: '1px solid #1C1C1C', borderRadius: 10, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            padding: '14px 20px', background: '#111111',
            borderBottom: '1px solid #1C1C1C',
          }}>
            <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>Aspect</span>
            <span style={{ fontSize: 12, color: '#C8962E', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>FlowBit</span>
            <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>Status Quo</span>
          </div>
          {COMPARISON.map((row, i) => (
            <div key={row.aspect} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '14px 20px',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              borderBottom: i < COMPARISON.length - 1 ? '1px solid #1C1C1C' : 'none',
            }}>
              <span style={{ fontSize: 13, color: '#888888', fontWeight: 500 }}>{row.aspect}</span>
              <span style={{ fontSize: 13, color: '#FAFAFA' }}>{row.flowbit}</span>
              <span style={{ fontSize: 13, color: '#555555' }}>{row.status_quo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8962E',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>How it works</span>
        <h2 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0 32px', letterSpacing: '-0.02em' }}>
          Three steps to production.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { step: '01', title: 'Define your flow', desc: 'Drag and drop EDA stages onto the canvas. Connect them to define dependencies and parallelism.' },
            { step: '02', title: 'Configure & execute', desc: 'Set tool parameters, resource constraints, and environment variables. Hit run — FlowBit handles the rest.' },
            { step: '03', title: 'Monitor & iterate', desc: 'Watch real-time progress. Review results inline. Adjust and re-run failed stages without restarting the entire flow.' },
          ].map(s => (
            <div key={s.step} style={{
              padding: '24px', background: '#111111', border: '1px solid #1C1C1C',
              borderRadius: 10,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700,
                color: 'rgba(200,150,46,0.15)', display: 'block', marginBottom: 12,
              }}>{s.step}</span>
              <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px', color: '#FAFAFA' }}>{s.title}</h4>
              <p style={{ fontSize: 14, color: '#888888', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section style={{
        padding: '80px 48px', textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,150,46,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Ready to see FlowBit in action?
          </h2>
          <p style={{ fontSize: 15, color: '#888888', margin: '0 0 28px' }}>
            Book a 30-minute demo with the founding team.
          </p>
          <button onClick={handleRequestDemo} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
            background: '#C8962E', color: '#0A0A0A', padding: '14px 28px',
            borderRadius: 2, border: 'none', cursor: 'pointer',
            letterSpacing: '0.08em', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Request a Demo →</button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
