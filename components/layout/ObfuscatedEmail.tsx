'use client'

import { useEffect, useState } from 'react'

/**
 * Renders a contact email only after hydration so it never appears
 * as plain text or a mailto: in the served HTML (anti-scraper,
 * build spec C5).
 */
export default function ObfuscatedEmail({ user, domain }: { user: string; domain: string }) {
  const [href, setHref] = useState<string | null>(null)

  useEffect(() => {
    setHref(`${user}@${domain}`)
  }, [user, domain])

  if (!href) {
    return (
      <span className="text-ink-3">
        {user} [at] {domain.replace('.', ' [dot] ')}
      </span>
    )
  }

  return (
    <a href={`mailto:${href}`} className="text-ink-2 transition-colors hover:text-brand-cyan">
      {href}
    </a>
  )
}
