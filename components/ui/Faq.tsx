export interface FaqItem {
  q: string
  a: string
}

/** Objection-handling accordion (build spec C4.5) — native <details>, zero JS. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-hair rounded-lg border border-hair bg-surface-1">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5 open:bg-surface-2/50">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="text-ink-3 transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
