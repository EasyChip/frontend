import { WRAPPED_ENGINES } from '@/lib/faq'

const ITEMS = [...WRAPPED_ENGINES, 'Stella (ours)', 'SAC (ours)']

/**
 * Credibility strip: the proven engines the platform orchestrates,
 * as a slow marquee (build spec C4.1 stand-in until partner logos clear).
 * Real names only - no invented "trusted by" logos.
 */
export default function EnginesMarquee() {
  return (
    <section className="border-y border-hair bg-base py-6" aria-label="Engines EasyChip orchestrates">
      <p className="eyebrow mb-4 text-center text-ink-3">
        Orchestrating the engines the industry already trusts
      </p>
      <div className="group/marquee relative overflow-hidden">
        {/* edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {ITEMS.map((engine) => (
                <span
                  key={`${copy}-${engine}`}
                  className="mx-8 whitespace-nowrap font-mono text-sm text-ink-2"
                >
                  {engine}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
