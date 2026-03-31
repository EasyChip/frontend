'use client'

import { useEffect, useRef } from 'react'

const LIVE = [
  'Natural language → Verilog RTL',
  'Simulation-verified output',
  'Training on 31K+ real hardware files',
]

const IN_PROGRESS = [
  'Logic synthesis (Yosys + SKY130)',
  'Cloud API for university labs',
  'Place & Route via OpenROAD',
  'Full RTL → GDSII pipeline',
]

export default function StackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left')
    if (!els) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="stack" className="section-pad">
      <div className="section-container">
        {/* Section label */}
        <div
          className="reveal-left"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--teal)',
            marginBottom: 24,
          }}
        >
          03 — The stack
        </div>

        {/* Headline */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 300,
            color: 'var(--white)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}
        >
          RTL is the entry point.
          <br />GDSII is the destination.
        </h2>

        {/* Progress bar */}
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--gray)',
            marginBottom: 10,
            letterSpacing: '0.06em',
          }}>
            Phase 12 of 20
          </div>
          <div style={{
            height: 3,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 2,
            maxWidth: 400,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: '60%',
              background: 'var(--teal)',
              borderRadius: 2,
              transition: 'width 1s ease',
            }} />
          </div>
        </div>

        {/* Two columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          maxWidth: 640,
        }}>
          {/* Live now */}
          <div className="reveal">
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gray)',
              marginBottom: 16,
            }}>
              Live now
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {LIVE.map(item => (
                <li key={item} style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  color: 'var(--white)',
                  marginBottom: 10,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  lineHeight: 1.4,
                }}>
                  <span style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* In progress */}
          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gray)',
              marginBottom: 16,
            }}>
              In progress
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {IN_PROGRESS.map(item => (
                <li key={item} style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  color: 'var(--gray)',
                  marginBottom: 10,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  lineHeight: 1.4,
                }}>
                  <span style={{ color: 'var(--gray)', flexShrink: 0, marginTop: 1 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #stack > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
