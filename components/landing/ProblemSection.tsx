'use client'

import { useEffect, useRef } from 'react'

const PROBLEMS = [
  {
    num: '01',
    title: 'The cost wall',
    body: 'Commercial EDA licenses start at $50K/year per seat. University labs and startups are structurally locked out.',
  },
  {
    num: '02',
    title: 'The translation gap',
    body: 'Every hardware spec gets re-typed into Verilog by hand. A process unchanged since 1977.',
  },
  {
    num: '03',
    title: 'Verification fails silently',
    body: 'Human-written testbenches miss corner cases. A single missed bug costs $1.2M+ at tape-out.',
  },
]

export default function ProblemSection() {
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
    <section ref={sectionRef} id="problem" className="section-pad">
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
          01 — The Problem
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
            maxWidth: 600,
            marginBottom: 56,
          }}
        >
          EDA tools cost $150,000 a year.
          <br />India has 20% of the world&apos;s chip engineers.
        </h2>

        {/* Three items */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
        }}>
          {PROBLEMS.map((p, i) => (
            <div
              key={p.num}
              className="reveal"
              style={{
                padding: '32px',
                border: '1px solid var(--border)',
                borderRadius: 2,
                background: 'var(--bg1)',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--teal)',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}>
                {p.num}
              </div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: 15,
                fontWeight: 400,
                color: 'var(--white)',
                marginBottom: 10,
                letterSpacing: '-0.01em',
              }}>
                {p.title}
              </div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: 14,
                fontWeight: 300,
                color: 'var(--gray)',
                lineHeight: 1.6,
              }}>
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #problem > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
