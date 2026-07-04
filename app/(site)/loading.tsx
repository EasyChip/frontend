/** Route-transition skeleton - shimmer placeholders in the page's own rhythm. */
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      {/* hero placeholder */}
      <div className="mx-auto max-w-3xl space-y-5 text-center" aria-hidden>
        <div className="skeleton mx-auto h-3 w-40" />
        <div className="skeleton mx-auto h-12 w-full max-w-xl" />
        <div className="skeleton mx-auto h-12 w-3/4 max-w-md" />
        <div className="skeleton mx-auto h-4 w-full max-w-lg" />
        <div className="mx-auto flex max-w-xs justify-center gap-4 pt-4">
          <div className="skeleton h-11 w-36 rounded-md" />
          <div className="skeleton h-11 w-36 rounded-md" />
        </div>
      </div>
      {/* card grid placeholder */}
      <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-hair bg-surface-1 p-6">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton mt-4 h-6 w-32" />
            <div className="skeleton mt-4 h-3.5 w-full" />
            <div className="skeleton mt-2 h-3.5 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
