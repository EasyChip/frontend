import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'

/**
 * Header for the signed-in area.
 *
 * The app routes previously shipped no logo and no route back to the site -
 * crossing from / to /login read as being handed to a different product. They
 * also reserved 60-80px of top padding for a nav that never rendered. This is
 * that nav, on the same primitives as the marketing header.
 */
export default function AppHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <Image src="/brand/logo.png" alt="" width={32} height={22} className="h-6 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            EasyChip
          </span>
        </Link>
        {children}
      </div>
    </header>
  )
}
