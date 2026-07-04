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
          <p className="eyebrow mb-5 text-ink-3">Contact</p>
          <h1 className="mx-auto max-w-2xl editorial text-5xl md:text-display-l">
            Talk to <span className="text-gradient">the team.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-2">
            Book a demo, ask about Escanor, or explore a partnership. You&apos;ll hear back from a
            founder, not a funnel.
          </p>
        </div>
      </section>

      <Section eyebrow="Book a demo" title="Tell us how you work" id="demo">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <aside className="space-y-8">
            <div className="rounded-lg border border-hair bg-surface-1 p-7">
              <p className="eyebrow text-ink-3">Direct line</p>
              <p className="mt-4 font-display text-base font-medium text-ink">Rakshit Mishra</p>
              <p className="mt-0.5 text-sm text-ink-2">Founder & CEO</p>
              <div className="mt-4 space-y-1.5 text-sm">
                <p>
                  <ObfuscatedEmail user="rakshit" domain={CONTACT_EMAIL.domain} />
                </p>
                <p>
                  <a
                    href="tel:+918928263049"
                    className="text-ink-2 transition-colors hover:text-brand-cyan"
                  >
                    +91 8928263049
                  </a>
                </p>
              </div>
            </div>
            <div id="early-access" className="scroll-mt-28 rounded-lg border border-hair bg-surface-1 p-7">
              <p className="eyebrow text-ink-3">Get early access</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
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
        eyebrow="Or pick a time"
        title="Straight onto the calendar"
        lede="Grab a slot that works for you - the meeting comes with a live walkthrough of the platform."
        className="border-t border-hair bg-base"
      >
        <div className="h-[640px] overflow-hidden rounded-lg border border-hair bg-surface-1">
          <BookMeeting inline context="Website - Book a Demo" />
        </div>
      </Section>
    </>
  )
}
