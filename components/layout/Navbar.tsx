'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 60,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(8,12,18,0.85)',
        borderBottom: `1px solid rgba(255,255,255,${scrolled ? 0.15 : 0.07})`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <Link
          href="/"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            textDecoration: 'none',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="EasyChip" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--white)',
            letterSpacing: '0.02em',
          }}>
            EasyChip
          </span>
        </Link>
      </div>

      {/* Right: desktop */}
      <div className="nav-right-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="mailto:f20220056@goa.bits-pilani.ac.in" className="nav-contact">
          Contact
        </a>
        <button onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))} className="nav-cta">
          Register for Early Access →
        </button>
      </div>

      {/* Right: mobile — CTA only */}
      <div className="nav-right-mobile" style={{ display: 'none' }}>
        <button onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))} className="nav-cta">
          Register for Early Access →
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-right-desktop { display: none !important; }
          .nav-right-mobile  { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </nav>
  )
}
