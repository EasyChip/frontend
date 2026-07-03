'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NAV, CTA, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Sticky top nav (build spec C2): transparent over the void, blur on scroll.
 * One primary CTA (Book a Demo) + one utility link (Log In).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled || mobileOpen
          ? 'border-b border-hair bg-void/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Main">
        {/* Mark + name */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Image src="/brand/logo.png" alt="" width={32} height={22} className="h-6 w-auto" priority />
          <span className="font-display text-lg font-bold tracking-tight text-ink">EasyChip</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  {item.label}
                  <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-72 rounded-lg border border-hair bg-surface-1 p-2 shadow-xl shadow-black/40">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
                      >
                        <span className="block text-sm font-medium text-ink">{child.label}</span>
                        {child.description && (
                          <span className="mt-0.5 block text-xs text-ink-3">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm transition-colors hover:text-ink',
                  pathname === item.href ? 'text-ink' : 'text-ink-2'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                    style={{ backgroundImage: 'var(--gradient-text)' }}
                  />
                )}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-2 py-2 text-sm text-ink-2 transition-colors hover:text-ink">
            Log In
          </Link>
          <Link
            href={CTA.primary.href}
            className="inline-flex h-9 items-center rounded-md bg-brand-violet px-4 text-sm font-medium text-white transition-all hover:shadow-glow-violet-sm hover:brightness-110"
          >
            {CTA.primary.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile full-screen menu, CTA pinned */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-void/95 backdrop-blur-xl lg:hidden">
          <div className="flex-1 space-y-6 px-6 py-8">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="eyebrow mb-3 text-ink-3">{item.label}</p>
                  <div className="space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2.5 text-lg font-medium text-ink hover:bg-surface-1"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block rounded-md px-3 py-2.5 text-lg font-medium text-ink hover:bg-surface-1"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link href="/login" className="block rounded-md px-3 py-2.5 text-lg font-medium text-ink-2 hover:bg-surface-1">
              Log In
            </Link>
          </div>
          <div className="sticky bottom-0 border-t border-hair bg-void/95 p-6">
            <Link
              href={CTA.primary.href}
              className="flex h-12 w-full items-center justify-center rounded-md bg-brand-violet text-base font-medium text-white"
            >
              {CTA.primary.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
