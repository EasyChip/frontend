import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Section from '@/components/core/Section'
import { Eyebrow, Headline } from '@/components/core/Type'
import ObfuscatedEmail from '@/components/chrome/ObfuscatedEmail'
import { CONTACT_EMAIL, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply to this website.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <NavBar />

      <section className="px-[var(--page-margin)] pb-14 pt-16 md:pt-20">
        <div className="section-grid mx-auto w-full max-w-[var(--page-max)]">
          <div>
            <Eyebrow tone="muted">Legal</Eyebrow>
          </div>
          <div>
            <Headline level={1} className="max-w-[820px]">
              Terms of Service
            </Headline>
          </div>
        </div>
      </section>

      <Section label="Interim notice">
        <div className="section-grid">
          <div aria-hidden className="hidden md:block" />
          <div className="max-w-[68ch] space-y-6 text-gray-2">
            <p className="rounded-sm border border-[color:var(--hairline)] bg-near-black px-5 py-4 text-xs">
              Binding terms are being finalised with counsel and will replace this interim notice before public launch.
            </p>
            <p>
              This site describes EasyChip and its products. It does not itself provide the
              software, and using it creates no licence to any EasyChip tool.
            </p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <span className="text-off-white">Accuracy:</span> product status on this site is
                stated as precisely as we can. Anything described as built or in build is not a
                commitment to a delivery date.
              </li>
              <li>
                <span className="text-off-white">Forward-looking statements:</span> roadmap,
                market sizing and pricing shown here are projections and plans, not guarantees.
              </li>
              <li>
                <span className="text-off-white">Trademarks:</span> Cadence, Synopsys, Siemens and
                other names appear for identification only. No affiliation or endorsement is
                implied.
              </li>
              <li>
                <span className="text-off-white">Open source:</span> VisUPF is distributed under
                its own licence, which governs that software rather than these terms.
              </li>
            </ul>
            <p className="text-xs">
              Questions about this notice reach us at{' '}
              <ObfuscatedEmail
                user={CONTACT_EMAIL.user}
                domain={CONTACT_EMAIL.domain}
                className="text-off-white underline underline-offset-4"
              />
              .
            </p>
            <p className="label text-gray-2">{SITE.legalName} · {SITE.location}</p>
          </div>
        </div>
      </Section>
    </>
  )
}
