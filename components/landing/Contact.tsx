'use client'
import { useEffect, useRef } from 'react'

const CONTACTS = [
  {
    initials: 'RM',
    name: 'Rakshit Mishra',
    role: 'Co-founder & CEO',
    phone: '+91 8928263049',
    email: 'f20220056@goa.bits-pilani.ac.in',
    linkedin: 'https://www.linkedin.com/in/rakshitmishra9695/',
  },
  {
    initials: 'PP',
    name: 'Parth Parekh',
    role: 'Co-founder & CTO',
    phone: '+91 9920657980',
    email: 'f20220687@goa.bits-pilani.ac.in',
    linkedin: 'https://www.linkedin.com/in/parth-parekh-131820357/',
  },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 48px', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            06 — Contact
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 24,
          transitionDelay: '0.1s',
        }}>
          Get in touch.<br />
          <span style={{ color: '#C8962E' }}>We&apos;d love to hear from you.</span>
        </h2>
        <p className="reveal" style={{
          fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--gray)',
          lineHeight: 1.75, maxWidth: 560, marginBottom: 64,
          transitionDelay: '0.2s',
        }}>
          Whether you&apos;re interested in EasyChip, want to collaborate, or just want to say hello — reach out to us directly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' }} className="contact-grid">
          {CONTACTS.map((c, i) => (
            <div key={i} className="reveal" style={{
              background: '#18181B',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 32,
              transition: 'border-color 0.25s, box-shadow 0.25s',
              transitionDelay: `${i * 0.12}s`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.boxShadow = '0 0 32px #C8962E22' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Avatar */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#C8962E22',
                border: '2px solid #C8962E44',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700,
                color: '#C8962E', marginBottom: 20,
              }}>
                {c.initials}
              </div>

              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#C8962E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                {c.role}
              </div>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 20 }}>
                {c.name}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Phone */}
                <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--gray)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C8962E' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {c.phone}
                </a>

                {/* Email */}
                <a href={`mailto:${c.email}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--gray)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C8962E' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  {c.email}
                </a>

                {/* LinkedIn */}
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--gray)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C8962E' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
