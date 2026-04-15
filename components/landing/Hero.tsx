'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const Terminal = dynamic(() => import('./Terminal'), { ssr: false })

const STATS = [
  { value: 'Phase 1 → 2', label: '20-phase roadmap' },
  { value: '31,000+', label: 'RTL training files' },
  { value: '17/17', label: 'tests passing', green: true },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 48px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '30%',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(ellipse, rgba(200,150,46,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">

        {/* Left column */}
        <div>
          {/* Overline badge */}
          <div className="reveal" style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(200,150,46,0.3)',
              borderRadius: 100, padding: '6px 14px',
              fontFamily: 'var(--mono)', fontSize: 11,
              color: '#C8962E', letterSpacing: '0.08em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8962E', display: 'inline-block', animation: 'blink 1.5s ease-in-out infinite' }} />
              AI-Native EDA
            </span>
          </div>

          {/* Headline */}
          <h1 className="reveal" style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--white)',
            marginBottom: 28,
            transitionDelay: '0.1s',
          }}>
            Natural Language<br />
            to <span style={{ color: '#C8962E', fontStyle: 'italic' }}>Silicon.</span>
          </h1>

          {/* Subheadline */}
          <p className="reveal" style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--gray)',
            lineHeight: 1.7,
            maxWidth: '52ch',
            marginBottom: 36,
            transitionDelay: '0.2s',
          }}>
            Describe a hardware module in plain English. EasyChip generates verified, synthesizable Verilog &mdash; ready for tape-out.
          </p>

          {/* CTA buttons */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48, flexWrap: 'wrap', transitionDelay: '0.3s' }}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
              style={{
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
                background: 'var(--amber)', color: '#0A0A0A',
                padding: '0.75rem 1.5rem', borderRadius: 2,
                border: 'none', cursor: 'pointer',
                transition: 'opacity 0.2s',
                letterSpacing: '0.08em',
                boxShadow: '0 0 20px var(--amber-glow)',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Join Waitlist →
            </button>
            <a href="#how-it-works"
              style={{
                fontFamily: 'var(--mono)', fontSize: 11,
                color: 'var(--gray)', border: '1px solid var(--border)',
                padding: '0.75rem 1.5rem', borderRadius: 2,
                textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
                letterSpacing: '0.08em',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--white)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--gray)' }}
            >
              See how it works &darr;
            </a>
          </div>

          {/* Stats bar */}
          <div className="reveal" style={{
            display: 'flex', gap: 32, flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 24,
            transitionDelay: '0.4s',
          }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700,
                  color: s.green ? '#22C55E' : 'var(--white)',
                  letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {s.green && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />}
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray)', letterSpacing: '0.08em', marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Terminal */}
        <div className="reveal hero-terminal" style={{ transitionDelay: '0.2s' }}>
          <Terminal />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 0 !important; }
          section { padding: 100px 24px 60px !important; }
          .hero-terminal { display: none; }
        }
      `}</style>
    </section>
  )
}
