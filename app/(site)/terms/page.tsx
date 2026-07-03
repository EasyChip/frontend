import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import ObfuscatedEmail from '@/components/layout/ObfuscatedEmail'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: "The terms for using EasyChip's website and products.",
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service">
      <div className="max-w-3xl space-y-6 leading-relaxed text-ink-2">
        <p className="rounded-md border border-warning/30 bg-warning/5 px-5 py-4 text-sm">
          Formal terms of service are being finalized with counsel and will replace this interim
          notice before public launch.
        </p>
        <p>Until then, the working principles:</p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <span className="text-ink">This website</span> is provided for information about
            EasyChip and its tools; content may change as the platform evolves.
          </li>
          <li>
            <span className="text-ink">Your IP stays yours.</span> Nothing you design with
            EasyChip tools grants us any rights to your designs - and with Escanor, your design
            data never reaches us at all.
          </li>
          <li>
            <span className="text-ink">Open-source tools</span> (like VisUPF) ship under their own
            licence, included with each release.
          </li>
          <li>
            <span className="text-ink">Questions</span> about usage or licensing:{' '}
            <ObfuscatedEmail user={CONTACT_EMAIL.user} domain={CONTACT_EMAIL.domain} />.
          </li>
        </ul>
      </div>
    </Section>
  )
}
