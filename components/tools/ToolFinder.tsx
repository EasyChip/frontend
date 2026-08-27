'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import type { Tool } from '@/lib/tools'
import StatusPill from '@/components/ui/StatusPill'

/**
 * Client-side quick finder over the full registry. The bucket sections
 * below remain server-rendered HTML - this only enhances navigation.
 * Keyboard: "/" or Ctrl/Cmd+K focuses the field.
 */
export default function ToolFinder({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setQuery('')
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.bucket.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, tools])

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-md border border-line bg-surface-1 px-4 focus-within:border-brand-cyan">
        <Search size={16} className="shrink-0 text-ink-3" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a tool - linting, CDC, timing, DRC…"
          aria-label="Search tools"
          className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
        />
        <kbd
          aria-hidden
          className="eyebrow hidden shrink-0 rounded border border-hair bg-surface-2 px-2 py-1 text-xs text-ink-3 md:block"
        >
          /
        </kbd>
      </div>

      {query.trim().length >= 2 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-hair bg-surface-1 shadow-xl shadow-black/50">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-ink-3">
              No tools match that yet. Clear the search to browse all buckets.
            </p>
          ) : (
            <ul>
              {results.map((tool) => {
                const row = (
                  <span className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">{tool.name}</span>
                      <span className="eyebrow text-xs text-ink-3">{tool.category}</span>
                    </span>
                    <StatusPill status={tool.status} />
                  </span>
                )
                return (
                  <li key={tool.id} className="border-b border-hair last:border-0">
                    {tool.slug ? (
                      <Link href={`/tools/${tool.slug}`} className="block transition-colors hover:bg-surface-2">
                        {row}
                      </Link>
                    ) : (
                      <Link href={`#bucket-${tool.bucket}`} className="block transition-colors hover:bg-surface-2">
                        {row}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
