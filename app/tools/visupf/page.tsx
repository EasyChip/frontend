'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'

const FEATURES = [
  {
    title: 'Structured UPF Authoring',
    description: 'Define power domains, supply nets, isolation strategies, and retention rules through a structured interface — not raw text. Syntax errors become impossible.',
  },
  {
    title: 'Real-Time Validation',
    description: 'Catch incomplete power strategies, missing supply connections, and conflicting isolation rules as you type. Fix power-intent bugs before they reach simulation.',
  },
  {
    title: 'Visual Power Architecture',
    description: 'See your power domain hierarchy, supply network, and shutdown sequences rendered as interactive diagrams. Understand complex power intent at a glance.',
  },
]

const COMPARISON = [
  { aspect: 'Authoring', visupf: 'Structured UI with auto-complete', status_quo: 'Hand-written UPF in a text editor' },
  { aspect: 'Validation', visupf: 'Real-time, inline error checking', status_quo: 'Errors surface during simulation or synthesis' },
  { aspect: 'Visualization', visupf: 'Interactive power domain diagrams', status_quo: 'Mental model or manual Visio drawings' },
  { aspect: 'Learning curve', visupf: 'Guided, self-documenting', status_quo: 'IEEE 1801 spec + tribal knowledge' },
  { aspect: 'Cost', visupf: 'Free, open source', status_quo: 'Vendor-locked or manual effort' },
]

const UPF_EXAMPLE = `# ── Power domain definition ──
create_power_domain PD_TOP \\
  -include_scope
create_power_domain PD_CPU \\
  -elements {cpu_core}

# ── Supply network ──
create_supply_net VDD  -domain PD_TOP
create_supply_net VSS  -domain PD_TOP
create_supply_set SS_CPU \\
  -function {power VDD} \\
  -function {ground VSS}

# ── Isolation strategy ──
set_isolation iso_cpu \\
  -domain PD_CPU \\
  -isolation_power_net VDD \\
  -clamp_value 0`

function VisUPFContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [downloadTriggered, setDownloadTriggered] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
    })
  }, [])

  // Auto-trigger download if user came back from login with action=download
  useEffect(() => {
    if (action === 'download' && isLoggedIn && !downloadTriggered) {
      setDownloadTriggered(true)
      handleDownload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, isLoggedIn])

  const handleDownload = async () => {
    if (!isLoggedIn) {
      router.push('/login?redirect=' + encodeURIComponent('/tools/visupf?action=download'))
      return
    }

    // Log the download event
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('tool_events').insert({
          user_id: user.id,
          tool: 'VisUPF',
          event_type: 'download',
          metadata: { version: '0.1.0-beta' },
        })
      }
    } catch { /* silent */ }

    // For now, show coming soon since no package is uploaded yet
    alert('VisUPF package is being prepared. You will be notified when it is ready for download.')
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(34,197,94,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start',
        }} className="visupf-hero-grid">
          {/* Left: copy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Link href="/tools" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555555',
                textDecoration: 'none', letterSpacing: '0.08em',
              }}>Tools</Link>
              <span style={{ color: '#555555' }}>/</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22C55E',
                letterSpacing: '0.08em',
              }}>VisUPF</span>
              <span style={{
                padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                background: 'rgba(34,197,94,0.1)', color: '#22C55E',
                border: '1px solid rgba(34,197,94,0.2)', marginLeft: 4,
              }}>Open Source</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300,
              lineHeight: 1.1, letterSpacing: '-0.03em',
              margin: '0 0 20px',
            }}>
              Visual UPF authoring for power-aware design.
            </h1>
            <p style={{
              fontSize: 17, color: '#888888', lineHeight: 1.7,
              margin: '0 0 32px',
            }}>
              Author, validate, and visualize IEEE 1801 (UPF) power intent through a structured interface.
              Catch errors before they reach your EDA tool chain.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={handleDownload} style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                background: '#22C55E', color: '#0A0A0A', padding: '14px 28px',
                borderRadius: 2, border: 'none', cursor: 'pointer',
                letterSpacing: '0.08em', transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Download VisUPF →</button>
              <a href="https://github.com/EasyChip" target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                  background: '#0A0A0A', color: '#888888', padding: '14px 28px',
                  borderRadius: 2, border: '1px solid #1C1C1C', cursor: 'pointer',
                  letterSpacing: '0.08em', textDecoration: 'none',
                  transition: 'border-color 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#22C55E'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C1C'}
              >View on GitHub →</a>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 16, fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>
              <span>v0.1.0-beta</span>
              <span>·</span>
              <span>MIT License</span>
            </div>
          </div>

          {/* Right: UPF code snippet */}
          <div style={{
            background: '#111111', border: '1px solid #1C1C1C', borderRadius: 10,
            padding: '20px', overflow: 'auto', position: 'relative',
          }}>
            <div style={{
              display: 'flex', gap: 6, marginBottom: 14,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', opacity: 0.6 }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C8962E', opacity: 0.6 }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E', opacity: 0.6 }} />
            </div>
            <pre style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7,
              color: '#888888', margin: 0, whiteSpace: 'pre-wrap',
            }}>
              {UPF_EXAMPLE.split('\n').map((line, i) => (
                <span key={i}>
                  {line.startsWith('#') ? (
                    <span style={{ color: '#555555' }}>{line}</span>
                  ) : line.includes('create_') || line.includes('set_') ? (
                    <>
                      <span style={{ color: '#C8962E' }}>{line.split(' ')[0]}</span>
                      <span style={{ color: '#FAFAFA' }}>{' ' + line.split(' ').slice(1).join(' ')}</span>
                    </>
                  ) : (
                    <span style={{ color: '#FAFAFA' }}>{line}</span>
                  )}
                  {'\n'}
                </span>
              ))}
            </pre>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22C55E',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>What it does</span>
        <h2 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0 32px', letterSpacing: '-0.02em' }}>
          Power intent, done right.
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
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22C55E',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Why it&apos;s different</span>
        <h2 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0 32px', letterSpacing: '-0.02em' }}>
          VisUPF vs. the status quo.
        </h2>
        <div style={{
          border: '1px solid #1C1C1C', borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            padding: '14px 20px', background: '#111111',
            borderBottom: '1px solid #1C1C1C',
          }}>
            <span style={{ fontSize: 12, color: '#555555', fontFamily: 'var(--font-mono)' }}>Aspect</span>
            <span style={{ fontSize: 12, color: '#22C55E', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>VisUPF</span>
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
              <span style={{ fontSize: 13, color: '#FAFAFA' }}>{row.visupf}</span>
              <span style={{ fontSize: 13, color: '#555555' }}>{row.status_quo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22C55E',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>How it works</span>
        <h2 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0 32px', letterSpacing: '-0.02em' }}>
          From intent to validated UPF.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { step: '01', title: 'Define power domains', desc: 'Specify your design hierarchy and which blocks belong to each power domain. VisUPF maps your RTL structure automatically.' },
            { step: '02', title: 'Configure strategies', desc: 'Set isolation, retention, level shifting, and supply network rules through guided forms. Every field is validated against IEEE 1801.' },
            { step: '03', title: 'Export & integrate', desc: 'Generate clean, tool-compatible UPF. Drop it into your synthesis and verification flow. VisUPF outputs standard-compliant UPF 2.1+.' },
          ].map(s => (
            <div key={s.step} style={{
              padding: '24px', background: '#111111', border: '1px solid #1C1C1C',
              borderRadius: 10,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700,
                color: 'rgba(34,197,94,0.15)', display: 'block', marginBottom: 12,
              }}>{s.step}</span>
              <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px', color: '#FAFAFA' }}>{s.title}</h4>
              <p style={{ fontSize: 14, color: '#888888', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section style={{
        padding: '80px 48px 100px', textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Start authoring power intent today.
          </h2>
          <p style={{ fontSize: 15, color: '#888888', margin: '0 0 28px' }}>
            Free, open source, MIT licensed.
          </p>
          <button onClick={handleDownload} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
            background: '#22C55E', color: '#0A0A0A', padding: '14px 28px',
            borderRadius: 2, border: 'none', cursor: 'pointer',
            letterSpacing: '0.08em', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Download VisUPF →</button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .visupf-hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default function VisUPFPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#555555', fontFamily: 'var(--font-mono)', fontSize: 14 }}>Loading...</div>
      </div>
    }>
      <VisUPFContent />
    </Suspense>
  )
}
