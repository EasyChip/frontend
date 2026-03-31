'use client'
import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Describe',
    body: 'Type a hardware specification in plain English. "Design a UART transmitter, 8N1, 9600 baud." No HDL knowledge needed.',
    icon: '✏️',
  },
  {
    num: '02',
    title: 'Generate',
    body: 'EasyChip produces synthesizable Verilog with a self-checking testbench. Targeting under 30 seconds per module.',
    icon: '⚡',
  },
  {
    num: '03',
    title: 'Verify & Synthesize',
    body: 'Simulation, formal checks, and Yosys synthesis run automatically. Output is verified against SKY130 PDK.',
    icon: '✓',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={ref} style={{ padding: '100px 48px', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            03 \u2014 How It Works
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 72,
          transitionDelay: '0.1s',
        }}>
          Three steps.<br />
          <span style={{ color: '#3B82F6' }}>No EDA licence required.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, position: 'relative' }} className="steps-grid">
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: 40, left: '16.67%', right: '16.67%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(59,130,246,0.4), transparent)',
            zIndex: 0,
          }} className="steps-line" />

          {STEPS.map((s, i) => (
            <div key={i} className="reveal" style={{
              padding: '0 28px',
              borderRight: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              position: 'relative', zIndex: 1,
              transitionDelay: `${i * 0.12}s`,
            }}>
              {/* Step number circle */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#3B82F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: '#fff',
                marginBottom: 24, boxShadow: '0 0 20px rgba(59,130,246,0.4)',
              }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)', lineHeight: 1.75 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .steps-line { display: none; }
          section { padding: 60px 24px !important; }
          div[style*="borderRight"] { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 32px !important; margin-bottom: 32px; }
        }
      `}</style>
    </section>
  )
}
