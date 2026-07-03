import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-brand-cyan">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
        This trace <span className="text-gradient">doesn&apos;t route.</span>
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">
        The page you&apos;re after moved or never existed. Here&apos;s the way back.
      </p>
      <nav className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="Recovery">
        {[
          { label: 'Home', href: '/' },
          { label: 'Platform', href: '/platform' },
          { label: 'Tools', href: '/tools' },
          { label: 'Contact', href: '/contact' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
