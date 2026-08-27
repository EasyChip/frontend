import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Section from '@/components/core/Section'
import { Eyebrow, Headline } from '@/components/core/Type'
import ObfuscatedEmail from '@/components/chrome/ObfuscatedEmail'
import { CONTACT_EMAIL, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we handle the details you leave with us.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
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
              Privacy Policy
            </Headline>
          </div>
        </div>
      </section>

      <Section label="Interim notice">
        <div className="section-grid">
          <div aria-hidden className="hidden md:block" />
          <div className="max-w-[68ch] space-y-6 text-gray-2">
            <p className="rounded-sm border border-[color:var(--hairline)] bg-near-black px-5 py-4 text-xs">
              The formal privacy policy, aligned to the DPDP Act and GDPR, is being finalised with counsel and will replace this interim notice before public launch.
            </p>
            <p>Here is plainly what happens with your data on this site today.</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <span className="text-off-white">What we collect:</span> only what you submit
                through the contact form — name, work email, and optionally company, role and a
                note about what you are working on.
              </li>
              <li>
                <span className="text-off-white">Why:</span> to reply to you and, if it is
                relevant, to arrange a demo. Nothing else.
              </li>
              <li>
                <span className="text-off-white">Where it goes:</span> a database we control. It
                is not sold, not shared with advertisers, and not fed into any marketing sequence.
              </li>
              <li>
                <span className="text-off-white">Analytics:</span> this site runs no advertising
                trackers and no third-party analytics profiling.
              </li>
              <li>
                <span className="text-off-white">Your design data:</span> nothing about EasyChip
                demos touches this site. Demos run on your own hardware and upload nothing.
              </li>
              <li>
                <span className="text-off-white">Removal:</span> ask us and we delete your record.
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
