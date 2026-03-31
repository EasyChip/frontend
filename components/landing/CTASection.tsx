'use client'
import { useEffect, useRef } from 'react'

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="early-access" ref={ref} style={{
      padding: '120px 48px',
      position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Glow background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(9,9,11,0.6))',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#00E5C3', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Private Beta
          </span>
        </div>
        <h2 className="reveal" style={{
          fontFamily: 'var(--sans)', fontWeight: 800,
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          color: 'var(--white)', marginBottom: 20,
          transitionDelay: '0.1s',
        }}>
          Get early access.
        </h2>
        <p className="reveal" style={{
          fontFamily: 'var(--sans)', fontSize: 17,
          color: 'var(--gray)', lineHeight: 1.7, marginBottom: 40,
          transitionDelay: '0.2s',
        }}>
          We&apos;re onboarding university labs, research teams, and fabless startups for our private beta. Drop your email and we&apos;ll reach out.
        </p>
        <div className="reveal" style={{ transitionDelay: '0.3s' }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
            style={{
              fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700,
              background: '#00E5C3', color: '#080C12',
              padding: '16px 36px', borderRadius: 10,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 40px rgba(59,130,246,0.4)',
              transition: 'opacity 0.2s, transform 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Register for Early Access &rarr;
          </button>
        </div>
        <div className="reveal" style={{ marginTop: 24, transitionDelay: '0.4s' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)' }}>
            Or reach out directly &mdash;{' '}
            <a href="mailto:f20220056@goa.bits-pilani.ac.in"
              style={{ color: '#00E5C3', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
            >
              f20220056@goa.bits-pilani.ac.in / f20220687@goa.bits-pilani.ac.in
            </a>
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { section { padding: 80px 24px !important; } }`}</style>
    </section>
  )
}
