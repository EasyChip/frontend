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
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--teal-glow) 0%, transparent 70%)',
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
          fontFamily: 'var(--sans)', fontWeight: 300,
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
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
        <div className="reveal" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', transitionDelay: '0.3s' }}>
          <a
            href="/login"
            style={{
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
              background: 'var(--teal)', color: '#080C12',
              padding: '0.75rem 1.5rem', borderRadius: 2,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 32px var(--teal-glow)',
              transition: 'opacity 0.2s',
              letterSpacing: '0.08em',
              textDecoration: 'none', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Try the Playground →
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
            style={{
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
              background: 'transparent', color: 'var(--gray)',
              padding: '0.75rem 1.5rem', borderRadius: 2,
              border: '1px solid var(--border)', cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
              letterSpacing: '0.08em',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--white)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--gray)' }}
          >
            Join Waitlist
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
