import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import ObfuscatedEmail from '@/components/layout/ObfuscatedEmail'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <Section title="Privacy Policy" titleAs="h1">
      <div className="max-w-3xl space-y-6 leading-relaxed text-ink-2">
        <p className="rounded-md border border-warning/30 bg-warning/5 px-5 py-4 text-sm">
          The formal privacy policy (DPDP Act + GDPR aligned) is being finalized with counsel and
          will replace this interim notice before public launch.
        </p>
        <p>In the meantime, here is plainly what happens with your data on this site today:</p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <span className="text-ink">What we collect:</span> only what you submit through our
            forms - name, work email, company, role, team size, interest, and how you heard about
            us.
          </li>
          <li>
            <span className="text-ink">Why:</span> to respond to demo requests and, if you opted
            in, to email you about EasyChip early access and launches. Nothing else.
          </li>
          <li>
            <span className="text-ink">Processing:</span> form submissions are processed by
            Formspree and delivered to our team inbox. Meeting bookings are processed by Cal.com.
            The site is hosted on Vercel.
          </li>
          <li>
            <span className="text-ink">Analytics:</span> none. This site currently runs no
            analytics or tracking pixels.
          </li>
          <li>
            <span className="text-ink">Your rights:</span> want your data corrected or deleted?
            One email and it&apos;s done:{' '}
            <ObfuscatedEmail user={CONTACT_EMAIL.user} domain={CONTACT_EMAIL.domain} />.
          </li>
        </ul>
      </div>
    </Section>
  )
}
