'use client'

import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Describe',
    body: 'Type a hardware specification in plain English. No HDL knowledge needed.',
  },
  {
    num: '02',
    title: 'Generate',
    body: 'EasyChip produces synthesisable Verilog with a self-checking testbench in under 30 seconds.',
  },
  {
    num: '03',
    title: 'Verify + Synthesise',
    body: 'Simulation, formal verification, and Yosys synthesis run automatically. Output is tape-out ready.',
  },
]

export default function HowItWorks() {
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
    <section ref={sectionRef} id="how-it-works" className="section-pad">
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
          02 — How it works
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
            marginBottom: 64,
          }}
        >
          Three steps. No EDA licence required.
        </h2>

        {/* Steps with connecting line */}
        <div style={{ position: 'relative', maxWidth: 560 }}>
          {/* Vertical connecting line */}
          <div
            className="reveal"
            style={{
              position: 'absolute',
              left: 19,
              top: 32,
              bottom: 32,
              width: 1,
              background: 'linear-gradient(to bottom, var(--teal), rgba(0,229,195,0.1))',
              transformOrigin: 'top',
              animation: 'connect-grow 1.2s ease forwards',
              animationDelay: '0.4s',
              opacity: 0,
            }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="reveal"
              style={{
                display: 'flex',
                gap: 28,
                marginBottom: i < STEPS.length - 1 ? 40 : 0,
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              {/* Number circle */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  border: '1px solid var(--teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--teal)',
                  background: 'rgba(0,229,195,0.04)',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {step.num}
                </div>
              </div>

              {/* Content */}
              <div style={{ paddingTop: 6 }}>
                <div style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'var(--white)',
                  marginBottom: 6,
                  letterSpacing: '-0.01em',
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'var(--gray)',
                  lineHeight: 1.6,
                }}>
                  {step.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes connect-grow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
