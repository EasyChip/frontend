import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_COLUMNS, SOCIALS, SITE, CONTACT_EMAIL } from '@/lib/site'
import ObfuscatedEmail from '@/components/layout/ObfuscatedEmail'

/** Deep footer (build spec C5). */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hair bg-void">
      {/* top bus trace with vias at column positions */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0">
        <div className="mx-auto flex max-w-7xl justify-between px-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="-mt-[3px] h-[7px] w-[7px] rounded-full border border-line bg-void"
            />
          ))}
        </div>
      </div>
      {/* ghost wordmark watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[11rem] font-medium leading-none tracking-tight text-white/[0.02]"
      >
        EASYCHIP
      </span>
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand block */}
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
              <Image src="/brand/logo.png" alt="" width={32} height={22} className="h-6 w-auto" />
              <span className="font-display text-lg font-medium text-ink">EasyChip</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">{SITE.positioning}</p>
            <p className="eyebrow mt-6 text-ink-3">{SITE.tagline}</p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-4 text-ink-3">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-2 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hair pt-8 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} EasyChip · {SITE.region}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <ObfuscatedEmail user={CONTACT_EMAIL.user} domain={CONTACT_EMAIL.domain} />
          </div>
        </div>
      </div>
    </footer>
  )
}
