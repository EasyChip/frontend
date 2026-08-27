'use client'

import Button from '@/components/core/Button'
import { Eyebrow, Headline, Body } from '@/components/core/Type'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="px-[var(--page-margin)] py-[120px]">
      <div className="section-grid mx-auto w-full max-w-[var(--page-max)]">
        <div>
          <Eyebrow tone="muted">Signal integrity fault</Eyebrow>
        </div>
        <div>
          <Headline level={1} className="max-w-[720px]">
            This page hit an unexpected state
          </Headline>
          <Body className="mt-7 max-w-[46ch] text-base">
            Nothing was lost. Rerun the request, or route back to a known-good page.
          </Body>
          {error.digest && <p className="meta mt-5 text-gray-2">ref: {error.digest}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={reset} variant="solid">
              Try again
            </Button>
            <Button href="/" variant="outline">
              Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
