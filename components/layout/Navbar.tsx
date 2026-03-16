'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function openWaitlist() {
  window.dispatchEvent(new CustomEvent('ec:openWaitlist'))
}

interface Props {
  onOpenWaitlist?: () => void
}

export default function Navbar({ onOpenWaitlist }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const handleWaitlist = onOpenWaitlist ?? openWaitlist

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* Floating pill — centered */}
      <nav
        className={`flex items-center gap-4 px-4 py-2.5 rounded-full transition-all duration-300 border border-white/8 ${
          scrolled ? 'glass-1 shadow-xl shadow-black/30' : 'glass-0'
        }`}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-text-primary font-bold text-sm tracking-tight flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="EasyChip" width={20} height={20} style={{ imageRendering: 'crisp-edges' }} />
          EasyChip
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-5 flex-1 justify-center">
          <Link href="/#how-it-works" className="text-label text-text-secondary hover:text-text-primary transition-colors">
            How it works
          </Link>
          <Link href="/#features" className="text-label text-text-secondary hover:text-text-primary transition-colors">
            Features
          </Link>
          <a href="#" className="text-label text-text-secondary hover:text-text-primary transition-colors">
            Docs
          </a>
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleWaitlist}
            className="hidden md:inline-flex items-center justify-center font-mono font-semibold uppercase tracking-[0.12em] rounded-full cursor-pointer transition-opacity hover:opacity-85"
            style={{
              fontSize: '0.65rem',
              padding: '0.5rem 1rem',
              background: 'var(--text-primary)',
              color: 'var(--bg-void)',
            }}
          >
            Early Access
          </button>

          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-0.5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3l12 12M15 3L3 15"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 5h14M2 9h14M2 13h14"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-14 left-0 w-64 glass-1 rounded-2xl border border-white/8 px-4 py-4 space-y-1 animate-slide-down shadow-xl shadow-black/40">
          <Link
            href="/#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="block text-text-secondary hover:text-text-primary text-sm py-2.5 transition-colors border-b border-white/5"
          >
            How it works
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="block text-text-secondary hover:text-text-primary text-sm py-2.5 transition-colors border-b border-white/5"
          >
            Features
          </Link>
          <a href="#" className="block text-text-secondary hover:text-text-primary text-sm py-2.5 transition-colors border-b border-white/5">
            Docs
          </a>
          <div className="pt-2">
            <button
              onClick={() => { setMobileOpen(false); handleWaitlist() }}
              className="btn-primary w-full"
            >
              Get early access
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
