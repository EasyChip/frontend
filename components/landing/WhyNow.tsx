'use client'
import { useEffect, useRef } from 'react'

const SHIFTS = [
  {
    num: '01',
    title: 'Open-source EDA reached production quality.',
    body: 'Yosys, OpenROAD, and the SKY130 PDK mean the synthesis-to-GDSII pipeline no longer requires a $150K/yr licence. The infrastructure layer is finally free.',
  },
  {
    num: '02',
    title: 'LLMs can generate hardware.',
    body: 'Foundation models now produce compilable, synthesizable Verilog. EasyChip fine-tunes on 31,000+ real RTL files to go from "compiles" to "correct and verified."',
  },
  {
    num: '03',
    title: 'India Semiconductor Mission is creating buyers.',
    body: "The government is investing \u20B976,000 crore into semiconductor self-reliance. University labs, C-DAC, ISRO, and DRDO need tools they can actually access. That market didn't exist 3 years ago.",
  },
]

export default function WhyNow() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="why-now" ref={ref} style={{ padding: '100px 48px', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            02 \u2014 Why Now
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 72,
          transitionDelay: '0.1s',
        }}>
          Three tectonic shifts.<br />
          <span style={{ color: '#00E5C3' }}>One window of opportunity.</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {SHIFTS.map((s, i) => (
            <div key={i} className="reveal" style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: 32,
              padding: '36px 0',
              borderBottom: i < SHIFTS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              alignItems: 'start',
              transitionDelay: `${i * 0.12}s`,
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#00E5C3', letterSpacing: '0.08em', paddingTop: 4 }}>
                {s.num}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 700, color: 'var(--white)', marginBottom: 12, lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--gray)', lineHeight: 1.75, maxWidth: '72ch' }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          section { padding: 60px 24px !important; }
          div[style*="grid-template-columns: 80px"] { grid-template-columns: 48px 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
