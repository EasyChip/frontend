'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Renders a contact email only after hydration so it never appears
 * as plain text or a mailto: in the served HTML (anti-scraper,
 * build spec C5). Includes a copy-to-clipboard microinteraction.
 */
export default function ObfuscatedEmail({ user, domain }: { user: string; domain: string }) {
  const [href, setHref] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHref(`${user}@${domain}`)
  }, [user, domain])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  if (!href) {
    return (
      <span className="text-ink-3">
        {user} [at] {domain.replace('.', ' [dot] ')}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2">
      <a href={`mailto:${href}`} className="text-ink-2 transition-colors hover:text-brand-cyan">
        {href}
      </a>
      <button
        type="button"
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        onClick={() => {
          navigator.clipboard?.writeText(href).then(() => setCopied(true))
        }}
        className={
          copied
            ? 'text-success transition-colors'
            : 'text-ink-3 transition-colors hover:text-brand-cyan'
        }
      >
        {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </span>
  )
}
