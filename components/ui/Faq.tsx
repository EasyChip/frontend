'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

export interface FaqItem {
  q: string
  a: string
}

/** Objection-handling accordion - smooth height, accessible, one open at a time. */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className="divide-y divide-hair rounded-lg border border-hair bg-surface-1">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`
        return (
          <div key={item.q} className={cn('px-6 transition-colors', isOpen && 'bg-surface-2/50')}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-medium text-ink"
              >
                {item.q}
                <span
                  aria-hidden
                  className={cn(
                    'text-ink-3 transition-transform duration-300',
                    isOpen && 'rotate-45 text-brand-cyan'
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-body"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div>
                <p className="max-w-3xl pb-5 leading-relaxed text-ink-2">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
