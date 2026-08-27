'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV, CTA, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Transparent top bar. It sits *inside* the hero frame rather than pinned to
 * the viewport - the page scrolls out from under it, which is what keeps the
 * full-bleed opening cinematic instead of chromed.
 *
 * The lockup stays small: 16px here, never enlarged as a graphic.
 */
export default function NavBar({ light = false }: { light?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  // #D4D4D4, not #A3A3A3: nav sits over photography, and grey-2 was validated
  // against flat ground only - it dropped to 3.46:1 over the wafer's bright field.
  const idle = light ? 'text-black/55' : 'text-gray-3'
  const strong = light ? 'text-black' : 'text-white'

  return (
    <header className="relative z-20 px-[var(--page-margin)] py-[22px]">
      <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between gap-8">
        <Link href="/" aria-label={`${SITE.name} home`} className="shrink-0">
          <Image
            src={light ? '/brand/logo-black.svg' : '/brand/logo.svg'}
            alt={SITE.name}
            width={112}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden items-center gap-[30px] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'label transition-colors duration-[120ms] ease-[var(--ease-out)]',
                isActive(item.href) ? strong : idle,
                light ? 'hover:text-black' : 'hover:text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={CTA.primary.href}
            className={cn(
              'label rounded-full px-[18px] py-2.5 transition-colors duration-[120ms] ease-[var(--ease-out)]',
              light
                ? 'bg-black text-white hover:bg-graphite'
                : 'bg-white text-black hover:bg-gray-3'
            )}
          >
            {CTA.primary.label}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={cn('label md:hidden', light ? 'text-black' : 'text-white')}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className={cn(
            'mx-auto mt-6 grid w-full max-w-[var(--page-max)] gap-1 border-t pt-6 md:hidden',
            light ? 'border-black/10' : 'border-[color:var(--hairline)]'
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'py-3 display-3',
                isActive(item.href) ? strong : idle
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={CTA.primary.href}
            onClick={() => setOpen(false)}
            className={cn(
              'label mt-4 inline-flex justify-center rounded-full px-[22px] py-3',
              light ? 'bg-black text-white' : 'bg-white text-black'
            )}
          >
            {CTA.primary.label}
          </Link>
        </nav>
      )}
    </header>
  )
}
