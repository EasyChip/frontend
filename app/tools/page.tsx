'use client'

import Link from 'next/link'

const tools = [
  {
    name: 'FlowBit',
    slug: 'flowbit',
    badge: 'Proprietary',
    badgeColor: '#C8962E',
    tagline: 'Visual workflow orchestration for semiconductor design.',
    description: 'Replace fragile Makefile-based flows with an interactive, visual orchestrator. FlowBit lets design teams define, execute, and monitor multi-step EDA workflows — from RTL through signoff — without scripting.',
    cta: 'Request a Demo',
  },
  {
    name: 'VisUPF',
    slug: 'visupf',
    badge: 'Open Source',
    badgeColor: '#22C55E',
    tagline: 'Visual UPF authoring for power-aware design.',
    description: 'Author, validate, and visualize Unified Power Format specifications through a structured interface. Catch power-intent errors before they reach the tool chain.',
    cta: 'Download VisUPF',
  },
]

export default function ToolsPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', fontFamily: 'var(--font-sans)',
      color: '#FAFAFA',
    }}>
      {/* Hero */}
      <section style={{
        padding: '140px 48px 80px', textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(200,150,46,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8962E',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>EasyChip Tools</span>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300,
            lineHeight: 1.1, letterSpacing: '-0.03em',
            margin: '16px 0 20px',
          }}>
            Production-grade EDA tools.
          </h1>
          <p style={{
            fontSize: 17, color: '#888888', lineHeight: 1.7,
            maxWidth: 560, margin: '0 auto',
          }}>
            Purpose-built tools for semiconductor design teams. From open-source utilities
            to proprietary orchestration — each tool solves a specific, painful problem.
          </p>
        </div>
      </section>

      {/* Tool cards */}
      <section style={{ padding: '0 48px 120px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 24 }}>
          {tools.map(tool => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#111111', border: '1px solid #1C1C1C', borderRadius: 12,
                padding: '32px 28px', transition: 'border-color 0.3s, transform 0.3s',
                cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962E'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1C1C1C'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: '#FAFAFA' }}>
                    {tool.name}
                  </h3>
                  <span style={{
                    padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                    fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                    background: `${tool.badgeColor}15`, color: tool.badgeColor,
                    border: `1px solid ${tool.badgeColor}30`,
                  }}>{tool.badge}</span>
                </div>
                <p style={{
                  fontSize: 15, color: '#C8962E', margin: '0 0 12px',
                  fontFamily: 'var(--font-mono)', fontWeight: 500,
                }}>{tool.tagline}</p>
                <p style={{
                  fontSize: 14, color: '#888888', lineHeight: 1.7, margin: '0 0 24px', flex: 1,
                }}>{tool.description}</p>
                <span style={{
                  fontSize: 13, color: '#C8962E', fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}>{tool.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (max-width: 480px) {
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
