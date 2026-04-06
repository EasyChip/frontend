'use client'
import { useEffect, useRef } from 'react'

const FOUNDERS = [
  {
    initials: 'RM',
    name: 'Rakshit Mishra',
    role: 'Co-founder & CEO',
    bio: 'Final-year student at BITS Pilani Goa. Background spanning embedded systems, edge AI, industrial automation, and chip design. Focused on go-to-market, fundraising, and product strategy.',
    linkedin: 'https://www.linkedin.com/in/rakshitmishra9695/',
    color: '#C8962E',
  },
  {
    initials: 'PP',
    name: 'Parth Parekh',
    role: 'Co-founder & CTO',
    bio: "BITS Pilani. Leading EasyChip's core AI and RTL generation engine. Focused on model architecture, training infrastructure, and verification pipeline.",
    linkedin: 'https://www.linkedin.com/in/parth-parekh-131820357/',
    color: '#C8962E',
  },
]

export default function Team() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="team" ref={ref} style={{ padding: '100px 48px', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            05 — The Team
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 64,
          transitionDelay: '0.1s',
        }}>
          Built at BITS Pilani.<br />
          <span style={{ color: '#C8962E' }}>For the world&apos;s chip engineers.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' }} className="team-grid">
          {FOUNDERS.map((f, i) => (
            <div key={i} className="reveal" style={{
              background: '#18181B',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 32,
              transition: 'border-color 0.25s, box-shadow 0.25s',
              transitionDelay: `${i * 0.12}s`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.boxShadow = `0 0 32px ${f.color}22` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Avatar */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `${f.color}22`,
                border: `2px solid ${f.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700,
                color: f.color, marginBottom: 20,
              }}>
                {f.initials}
              </div>

              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: f.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                {f.role}
              </div>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
                {f.name}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)', lineHeight: 1.75, marginBottom: 20 }}>
                {f.bio}
              </p>

              <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: f.color, textDecoration: 'none', letterSpacing: '0.06em' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn →
              </a>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .team-grid { grid-template-columns: 1fr !important; }
          section { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  )
}
