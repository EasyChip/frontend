import Link from 'next/link'

/** Quiet changelog strip (Interfere's "The Latest") - real items only. */
const ITEMS = [
  {
    date: 'Jul 2026',
    title: 'VisUPF goes open source',
    href: '/newsroom',
  },
  {
    date: 'In the works',
    title: 'First technical deep-dives: consolidation, CDC, local-first EDA',
    href: '/blog',
  },
]

export default function TheLatest() {
  return (
    <section className="border-t border-hair">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="editorial text-3xl md:text-4xl">The latest</h2>
          <Link
            href="/newsroom"
            className="shrink-0 text-sm font-medium text-brand-cyan hover:underline underline-offset-4"
          >
            Newsroom →
          </Link>
        </div>
        <div className="mt-8 divide-y divide-hair border-y border-hair">
          {ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-baseline gap-6 py-5 transition-colors hover:bg-surface-1/50"
            >
              <span className="eyebrow w-24 shrink-0 text-ink-3">{item.date}</span>
              <span className="text-lg text-ink transition-colors group-hover:text-brand-cyan">
                {item.title}
              </span>
              <span aria-hidden className="ml-auto text-ink-3 opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
