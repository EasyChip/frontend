import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import ContactForm from '@/components/contact/ContactForm'
import WaitlistForm from '@/components/contact/WaitlistForm'
import BookMeeting from '@/components/booking/BookMeeting'
import ObfuscatedEmail from '@/components/layout/ObfuscatedEmail'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact - book a demo',
  description: 'Book a demo or talk to the team about tools, Escanor, or a partnership.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-hair">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 text-center md:pt-28">
          <h1 className="mx-auto max-w-2xl editorial text-5xl md:text-display-l">
            Talk to <span className="text-gradient">the team.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-2">
            Book a demo, ask about Escanor, or explore a partnership. You&apos;ll hear back from a
            founder, not a funnel.
          </p>
        </div>
      </section>

      <Section title="Tell us how you work" id="demo">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <aside className="space-y-8">
            <div className="rounded-lg border border-hair bg-surface-1 p-7">
              <p className="font-display text-lg font-semibold text-ink">Direct line</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Skip the form. This reaches the founding team.
              </p>
              <p className="mt-4 text-base">
                <ObfuscatedEmail user={CONTACT_EMAIL.user} domain={CONTACT_EMAIL.domain} />
              </p>
            </div>
            <div id="early-access" className="scroll-mt-28 rounded-lg border border-hair bg-surface-1 p-7">
              <p className="font-display text-lg font-semibold text-ink">Get early access</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Not ready for a demo? Join the early-access list - launches land in your inbox
                first.
              </p>
              <div className="mt-4">
                <WaitlistForm />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        title="Straight onto the calendar"
        lede="Grab a slot that works for you - the meeting comes with a live walkthrough of the platform."
        className="border-t border-hair bg-base"
      >
        <div className="h-[70dvh] min-h-[520px] overflow-hidden rounded-lg border border-hair bg-surface-1 md:h-[640px]">
          <BookMeeting inline context="Website - Book a Demo" />
        </div>
      </Section>
    </>
  )
}
