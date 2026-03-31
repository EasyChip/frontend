'use client'
import { useEffect, useRef } from 'react'

const PROBLEMS = [
  {
    num: '01',
    title: 'The cost wall',
    body: 'A single Synopsys Design Compiler seat costs $50K+/year. A university VLSI lab needs 5\u201310 seats. The entire annual budget of most Indian EE departments is less than one EDA licence.',
  },
  {
    num: '02',
    title: 'The manual bottleneck',
    body: 'Every hardware specification gets translated to Verilog by hand \u2014 a process that consumes 40% of design cycle time and has barely changed in decades.',
  },
  {
    num: '03',
    title: 'Verification fails silently',
    body: 'Human-written testbenches miss corner cases. A single undetected bug that reaches tape-out costs $1.2M+ to fix \u2014 more than most Indian startups raise in a seed round.',
  },
]

export default function ProblemSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="problem" ref={ref} style={{ padding: '100px 48px', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            01 \u2014 The Problem
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 64,
          transitionDelay: '0.1s',
        }}>
          India has 20% of the world&apos;s chip designers.<br />
          <span style={{ color: '#C8962E' }}>They can&apos;t afford the tools.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="problem-grid">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="reveal" style={{
              background: '#18181B',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '3px solid #C8962E',
              borderRadius: 10,
              padding: 28,
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.25s, box-shadow 0.25s',
              transitionDelay: `${i * 0.1}s`,
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(200,150,46,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 64, fontWeight: 300, color: 'rgba(200,150,46,0.06)', position: 'absolute', top: -10, right: 16, lineHeight: 1, userSelect: 'none' }}>
                {p.num}
              </div>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)', lineHeight: 1.7 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          section { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  )
}
