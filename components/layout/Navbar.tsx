'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Problem', href: '#problem' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: 'mailto:f20220056@goa.bits-pilani.ac.in' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 60,
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        background: scrolled ? 'rgba(9,9,11,0.9)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? '#1C1C1C' : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <div style={{ flex: 1 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="EasyChip" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: 'var(--white)', letterSpacing: '0.02em' }}>
            EasyChip
          </span>
        </Link>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop">
        {links.map(l => (
          <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
        ))}
        <a
          href="/login"
          style={{
            fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
            background: 'var(--amber)', color: '#0A0A0A',
            padding: '7px 14px', borderRadius: 2, border: 'none', cursor: 'pointer',
            transition: 'opacity 0.2s', letterSpacing: '0.08em', whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Try Playground →
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
        aria-label="Toggle menu"
      >
        <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ display: 'block', height: 1.5, background: 'var(--white)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
          <span style={{ display: 'block', height: 1.5, background: 'var(--white)', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', height: 1.5, background: 'var(--white)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
        </div>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0,
          background: 'rgba(9,9,11,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 24px 32px',
          display: 'flex', flexDirection: 'column', gap: 20,
          zIndex: 99,
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--gray)', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600,
              background: '#C8962E', color: '#0A0A0A',
              padding: '12px 20px', borderRadius: 6, border: 'none', cursor: 'pointer',
              textAlign: 'left', textDecoration: 'none', display: 'block',
            }}
          >
            Try Playground →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </nav>
  )
}
