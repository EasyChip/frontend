import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      {/* the trace dead-ends */}
      <svg aria-hidden viewBox="0 0 280 40" className="mb-6 w-64 overflow-visible">
        <path
          d="M0 20 H120 V8 H200 V20 H236"
          fill="none"
          stroke="rgba(0,229,238,0.4)"
          strokeWidth="1.5"
        />
        <circle cx="120" cy="20" r="2.5" fill="#0196E8" />
        <circle cx="200" cy="8" r="2.5" fill="#4E55FC" />
        {/* dead-end via */}
        <g stroke="#FF4D6D" strokeWidth="2" strokeLinecap="round">
          <circle cx="248" cy="20" r="7" fill="none" opacity="0.6" />
          <line x1="244" y1="16" x2="252" y2="24" />
          <line x1="252" y1="16" x2="244" y2="24" />
        </g>
      </svg>
      <h1 className="font-display text-4xl font-semibold md:text-5xl">
        This trace <span className="text-gradient">doesn&apos;t route.</span>
      </h1>
      <p className="eyebrow mt-4 text-brand-cyan">404 · Open net</p>
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
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-3 hover:bg-surface-2"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
