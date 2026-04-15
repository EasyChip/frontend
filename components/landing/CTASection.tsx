'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

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
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--amber-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(9,9,11,0.6))',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#C8962E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
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
          We&apos;re onboarding university labs, research teams, and fabless startups for our private beta. Drop your email or book a meeting with us.
        </p>
        <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', transitionDelay: '0.3s' }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
            style={{
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
              background: 'var(--amber)', color: '#0A0A0A',
              padding: '0.75rem 1.5rem', borderRadius: 2,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 32px var(--amber-glow)',
              transition: 'opacity 0.2s',
              letterSpacing: '0.08em',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Join Waitlist →
          </button>
          <Link href="/book" style={{
            fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
            background: 'transparent', color: 'var(--white)',
            padding: '0.75rem 1.5rem', borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
            transition: 'border-color 0.2s',
            letterSpacing: '0.08em', textDecoration: 'none',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962E' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            Book a Meeting →
          </Link>
        </div>
        <div className="reveal" style={{ marginTop: 24, transitionDelay: '0.4s' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--gray)' }}>
            Or reach out directly &mdash;{' '}
            <a href="mailto:f20220056@goa.bits-pilani.ac.in"
              style={{ color: '#C8962E', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
            >
              f20220056@goa.bits-pilani.ac.in
            </a>
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { section { padding: 80px 24px !important; } }`}</style>
    </section>
  )
}
