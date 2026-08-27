'use client'

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
 * The lockup stays small: 28px here, never enlarged as a graphic.
 *
 * The mobile menu is a native `<details>`, not React state, and that is
 * deliberate. This is a client component, but `<details>` toggles in the
 * browser with no JavaScript at all - so a visitor on a managed machine with
 * scripts blocked still has navigation. The previous version was a `<button>`
 * driven by `useState`, which at 390px left those visitors with a dead control
 * and no way to reach any other page.
 */
export default function NavBar({ light = false }: { light?: boolean }) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  // #D4D4D4, not #A3A3A3: nav sits over photography, and grey-2 was validated
  // against flat ground only - it dropped to 3.46:1 over the wafer's bright field.
  const idle = light ? 'text-black/55' : 'text-gray-3'
  const strong = light ? 'text-black' : 'text-white'

  return (
    <header className="relative z-20 px-[var(--page-margin)] py-[22px]">
      <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between gap-8">
        {/* relative z-20: the mobile sheet below is a positioned descendant of
            this header, so without an explicit layer it paints over the lockup
            and the Close control - the two things that must stay reachable
            while the menu is open. */}
        <Link href="/" aria-label={`${SITE.name} home`} className="relative z-20 shrink-0">
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

        {/* Mobile - native disclosure, works with scripts off */}
        <details className="group md:hidden">
          <summary
            // list-none + the ::-webkit-details-marker reset in globals.css
            // remove the default triangle; min-h/px give the 44px touch target
            // the bare 11px label never had.
            className={cn(
              'label relative z-20 flex cursor-pointer list-none items-center px-2 py-3.5 select-none',
              light ? 'text-black' : 'text-white'
            )}
          >
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>

          {/* Fixed, not absolute, and that is not a style choice: this panel
              lives inside Hero, which clips with overflow-hidden. Absolute
              positioning let the shorter light heroes (420px on /company and
              /contact) cut the CTA pill in half, while the 460px /platform hero
              happened to fit and looked correct. Fixed escapes every clipping
              ancestor and cannot be sized wrong by the hero above it.

              It overlays rather than pushing the hero down: pushing put the
              panel's CTA and the hero's own BOOK A DEMO on screen together -
              two identical white pills, same destination, 440px apart. The
              header stays at z-20 above this z-10 sheet, so the lockup and the
              Close control remain visible and clickable over it. */}
          <nav
            aria-label="Main"
            className={cn(
              'fixed inset-0 z-10 overflow-y-auto px-[var(--page-margin)] pt-[88px] pb-10',
              light ? 'bg-off-white' : 'bg-black'
            )}
          >
            <div className="mx-auto grid w-full max-w-[var(--page-max)] gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn('py-3 display-3', isActive(item.href) ? strong : idle)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={CTA.primary.href}
                className={cn(
                  'label mt-4 inline-flex justify-center rounded-full px-[22px] py-3',
                  light ? 'bg-black text-white' : 'bg-white text-black'
                )}
              >
                {CTA.primary.label}
              </Link>
            </div>
          </nav>
        </details>
      </div>
    </header>
  )
}
