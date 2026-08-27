'use client'

import { useEffect, useState } from 'react'

/**
 * Renders the address only after mount, so the plain string never appears in
 * the served HTML for a scraper to lift. Before mount it shows the readable
 * `user [at] domain` form - which is still a usable address for a human with
 * JavaScript off, rather than a blank.
 */
export default function ObfuscatedEmail({
  user,
  domain,
  className,
}: {
  user: string
  domain: string
  className?: string
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <span className={className}>
        {user} [at] {domain}
      </span>
    )
  }

  return (
    <a href={`mailto:${user}@${domain}`} className={className}>
      {user}@{domain}
    </a>
  )
}
