/**
 * Route-transition skeleton.
 *
 * Deliberately structure-neutral: it previously drew a centred hero and a
 * six-card grid on every route, so /privacy and /contact flashed a layout they
 * never adopt. A skeleton that guesses wrong is worse than one that only
 * reserves rhythm.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="max-w-3xl space-y-5" aria-hidden>
        <div className="skeleton h-12 w-full max-w-xl" />
        <div className="skeleton h-4 w-full max-w-lg" />
        <div className="skeleton h-4 w-3/4 max-w-md" />
      </div>
      <div className="mt-14 space-y-3 md:mt-20" aria-hidden>
        <div className="skeleton h-4 w-full max-w-2xl" />
        <div className="skeleton h-4 w-full max-w-xl" />
        <div className="skeleton h-4 w-2/3 max-w-lg" />
      </div>
    </div>
  )
}
