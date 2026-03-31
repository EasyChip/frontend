'use client'

import { useEffect, useRef } from 'react'

export default function CTASection() {
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
    <>
      {/* CTA Section */}
      <section
        ref={sectionRef}
        id="cta"
        style={{
          padding: '8rem 0 6rem',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="section-container">
          <h2
            className="reveal"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 300,
              color: 'var(--white)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Built in India.
            <br />For the world&apos;s chip engineers.
          </h2>

          <p
            className="reveal"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--gray)',
              letterSpacing: '0.06em',
              marginBottom: 40,
              transitionDelay: '0.1s',
            }}
          >
            University labs · Fabless startups · Research teams
          </p>

          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))} className="btn-primary" style={{ fontSize: 13 }}>
              Register for Early Access →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 0',
      }}>
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)' }}>
            © 2026 EasyChip — BITS Pilani
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray)' }}>
            Rakshit Mishra · f20220056@goa.bits-pilani.ac.in
          </span>
        </div>
      </footer>
    </>
  )
}
