'use client'
import { useEffect, useRef } from 'react'

const PIPELINE = [
  { label: 'NL Spec', active: true },
  { label: 'RTL Generation', active: true },
  { label: 'Logic Synthesis', active: false },
  { label: 'Place & Route', active: false },
  { label: 'GDSII', active: false },
]

const LIVE = [
  'Natural language → Verilog RTL',
  'Simulation-verified output',
  'Trained on 31,000+ real hardware files',
  '17/17 test suite passing',
]

const IN_PROGRESS = [
  'Logic synthesis (Yosys + SKY130)',
  'Cloud API for university labs',
  'Place & Route via OpenROAD',
  'Full RTL → GDSII pipeline',
]

export default function StackSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="roadmap" ref={ref} style={{ padding: '100px 48px', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            04 \u2014 The Roadmap
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 56,
          transitionDelay: '0.1s',
        }}>
          RTL is the entry point.<br />
          <span style={{ color: '#3B82F6' }}>GDSII is the destination.</span>
        </h2>

        {/* Pipeline */}
        <div className="reveal" style={{ marginBottom: 64, transitionDelay: '0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="pipeline">
            {PIPELINE.map((stage, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  flex: 1,
                  padding: '12px 16px',
                  textAlign: 'center',
                  background: stage.active ? 'rgba(59,130,246,0.15)' : '#18181B',
                  border: `1px solid ${stage.active ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: i === 0 ? '8px 0 0 8px' : i === PIPELINE.length - 1 ? '0 8px 8px 0' : '0',
                  borderLeft: i > 0 ? 'none' : undefined,
                  fontFamily: 'var(--mono)', fontSize: 11,
                  color: stage.active ? '#3B82F6' : 'var(--gray)',
                  fontWeight: stage.active ? 600 : 400,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}>
                  {stage.active && <span style={{ color: '#10B981', marginRight: 6 }}>&bull;</span>}
                  {stage.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="roadmap-cols">
          <div className="reveal" style={{
            background: '#18181B', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: 28, transitionDelay: '0.3s',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#10B981', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              ● Live now
            </div>
            {LIVE.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#10B981', fontFamily: 'var(--mono)', fontSize: 14, marginTop: 1 }}>✓</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="reveal" style={{
            background: '#18181B', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: 28, transitionDelay: '0.4s',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#3B82F6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              ◎ In progress
            </div>
            {IN_PROGRESS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#3B82F6', fontFamily: 'var(--mono)', fontSize: 14, marginTop: 1 }}>◎</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 24, transitionDelay: '0.5s' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.04em' }}>
            Currently in Phase 12 of a 20-phase technical roadmap.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          section { padding: 60px 24px !important; }
          .roadmap-cols { grid-template-columns: 1fr !important; }
          .pipeline { flex-direction: column; }
          .pipeline > div { width: 100%; }
          .pipeline > div > div { border-radius: 6px !important; border-left: 1px solid rgba(255,255,255,0.08) !important; border-top: none !important; }
          .pipeline > div:first-child > div { border-top: 1px solid rgba(255,255,255,0.08) !important; }
        }
      `}</style>
    </section>
  )
}
