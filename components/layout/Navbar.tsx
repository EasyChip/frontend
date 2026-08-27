'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NAV, CTA, SITE, type NavItem } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Sticky top nav: transparent over the void, blur on scroll.
 * One primary CTA (Book a Demo) + one utility link (Log In).
 *
 * The dropdowns are state-driven disclosures, not hover-only CSS. They were
 * previously opened by `group-hover`/`group-focus-within` on a container that
 * was `visibility: hidden` at rest - and a hidden subtree cannot take focus,
 * so `focus-within` could never fire and ten destinations were unreachable by
 * keyboard. Hover now layers on top of the same state rather than replacing it.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Parent-aware active matching: /tools/lintbit keeps "Tools" lit
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const isGroupActive = (item: NavItem) =>
    Boolean(item.children?.some((c) => isActive(c.href)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Escape closes; click outside dismisses
  useEffect(() => {
    if (!openMenu) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(
          `[data-menu-trigger="${openMenu}"]`
        )
        trigger?.focus()
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [openMenu])

  // Focus leaving the whole group closes it (tabbing past the last item)
  const onGroupBlur = useCallback((e: React.FocusEvent<HTMLDivElement>, label: string) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setOpenMenu((current) => (current === label ? null : current))
  }, [])

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
          <span className="font-display text-lg font-semibold tracking-tight text-ink">EasyChip</span>
        </Link>

        {/* Desktop links */}
        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                item={item}
                open={openMenu === item.label}
                active={isGroupActive(item)}
                isActive={isActive}
                onToggle={() =>
                  setOpenMenu((current) => (current === item.label ? null : item.label))
                }
                onHoverOpen={() => setOpenMenu(item.label)}
                onHoverClose={() => setOpenMenu((c) => (c === item.label ? null : c))}
                onBlur={(e) => onGroupBlur(e, item.label)}
                onNavigate={() => setOpenMenu(null)}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                aria-current={isActive(item.href!) ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm transition-colors hover:text-ink',
                  isActive(item.href!) ? 'text-ink' : 'text-ink-2'
                )}
              >
                {item.label}
                {isActive(item.href!) && <ActiveRail />}
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
            className="sheen inline-flex h-9 items-center rounded-full bg-brand-violet px-5 text-sm font-medium text-white transition-all hover:shadow-glow-violet-sm hover:brightness-110"
          >
            {CTA.primary.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu. Anchored to the header's own bottom edge rather than a
          fixed 4rem offset, so the announcement bar can never push it up over
          the nav's close button. */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-t border-hair bg-void/95 backdrop-blur-xl lg:hidden"
        >
          <div className="flex-1 space-y-6 px-6 py-8">
            {NAV.map((item, gi) =>
              item.children ? (
                <div
                  key={item.label}
                  className="animate-fade-up"
                  style={{ animationDelay: `${gi * 70}ms` }}
                >
                  <p className="eyebrow mb-3 text-ink-3">{item.label}</p>
                  <div className="space-y-1">
                    {item.children.map((child, ci) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={isActive(child.href) ? 'page' : undefined}
                        className="animate-fade-up block rounded-md px-3 py-2.5 text-lg font-medium text-ink hover:bg-surface-1"
                        style={{ animationDelay: `${gi * 70 + ci * 40}ms` }}
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
                  aria-current={isActive(item.href!) ? 'page' : undefined}
                  className="animate-fade-up block rounded-md px-3 py-2.5 text-lg font-medium text-ink hover:bg-surface-1"
                  style={{ animationDelay: `${gi * 70}ms` }}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/login"
              className="animate-fade-up block rounded-md px-3 py-2.5 text-lg font-medium text-ink-2 hover:bg-surface-1"
              style={{ animationDelay: `${NAV.length * 70}ms` }}
            >
              Log In
            </Link>
          </div>
          <div className="sticky bottom-0 border-t border-hair bg-void/95 p-6">
            <Link
              href={CTA.primary.href}
              className="flex h-12 w-full items-center justify-center rounded-full bg-brand-violet text-base font-medium text-white"
            >
              {CTA.primary.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

/** Active-route rail. Solid cyan: the prism gradient is spent once per view. */
function ActiveRail() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-cyan"
    />
  )
}

function NavDropdown({
  item,
  open,
  active,
  isActive,
  onToggle,
  onHoverOpen,
  onHoverClose,
  onBlur,
  onNavigate,
}: {
  item: NavItem
  open: boolean
  active: boolean
  isActive: (href: string) => boolean
  onToggle: () => void
  onHoverOpen: () => void
  onHoverClose: () => void
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void
  onNavigate: () => void
}) {
  const panelId = useId()

  return (
    <div
      className="relative"
      onMouseEnter={onHoverOpen}
      onMouseLeave={onHoverClose}
      onBlur={onBlur}
    >
      <button
        type="button"
        data-menu-trigger={item.label}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          'relative flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors hover:text-ink',
          active || open ? 'text-ink' : 'text-ink-2'
        )}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
        {active && <ActiveRail />}
      </button>

      {open && (
        <div id={panelId} className="absolute left-0 top-full pt-2">
          <div className="w-72 rounded-lg border border-hair bg-surface-1 p-2 shadow-xl shadow-black/40">
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                aria-current={isActive(child.href) ? 'page' : undefined}
                className="block rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
              >
                <span className="block text-sm font-medium text-ink">{child.label}</span>
                {child.description && (
                  <span className="mt-0.5 block text-sm text-ink-2">{child.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
