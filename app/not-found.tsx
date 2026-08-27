import NavBar from '@/components/chrome/NavBar'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Body } from '@/components/core/Type'
import { NAV } from '@/lib/site'

export default function NotFound() {
  return (
    <>
      <NavBar />
      <section className="px-[var(--page-margin)] py-[120px]">
        <div className="section-grid mx-auto w-full max-w-[var(--page-max)]">
          <div>
            <Eyebrow tone="muted">404 — open net</Eyebrow>
          </div>
          <div>
            <Headline level={1} className="max-w-[720px]">
              This trace does not route
            </Headline>
            <Body className="mt-7 max-w-[46ch] text-base">
              The page moved or never existed. Here is the way back.
            </Body>
            <nav aria-label="Recovery" className="mt-10 flex flex-wrap gap-3">
              <Button href="/" variant="solid">
                Home
              </Button>
              {NAV.map((item) => (
                <Button key={item.href} href={item.href} variant="outline">
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}
