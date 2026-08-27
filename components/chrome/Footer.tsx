import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_COLUMNS, SOCIALS, SITE, CONTACT_EMAIL } from '@/lib/site'
import ObfuscatedEmail from '@/components/chrome/ObfuscatedEmail'

/**
 * Footer. Hairline rule, the lockup at 18px, mono columns, and the closing
 * line the company actually ends every room with.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--hairline)] px-[var(--page-margin)] py-[64px]">
      <div className="mx-auto w-full max-w-[var(--page-max)]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" aria-label={`${SITE.name} home`}>
              <Image
                src="/brand/logo.svg"
                alt={SITE.name}
                width={72}
                height={18}
                className="h-[18px] w-auto"
              />
            </Link>
            <p className="label mt-5 text-gray-2">{SITE.tagline}</p>
            <p className="mt-5 max-w-[34ch] text-xs leading-relaxed text-gray-2">
              {SITE.positioning}
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="label text-gray-2">{col.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-gray-2 transition-colors duration-[120ms] ease-[var(--ease-out)] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-[color:var(--hairline)] pt-8">
          <p className="max-w-[52ch] display-3 text-gray-2">{SITE.closingLine}</p>

          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
            <p className="label text-gray-2">
              © 2026 {SITE.legalName} · {SITE.location}
            </p>
            <div className="flex flex-wrap items-baseline gap-6">
              <ObfuscatedEmail
                user={CONTACT_EMAIL.user}
                domain={CONTACT_EMAIL.domain}
                className="label text-gray-2 transition-colors hover:text-white"
              />
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
                className="label text-gray-2 transition-colors hover:text-white"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
