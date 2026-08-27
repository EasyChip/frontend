import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Body } from '@/components/core/Type'
import LeadForm from '@/components/forms/LeadForm'
import Calendly from '@/components/forms/Calendly'
import ObfuscatedEmail from '@/components/chrome/ObfuscatedEmail'
import { CONTACT_EMAIL, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Demos run on your own machine, against your own RTL. Nothing is uploaded. Book a time or leave your details.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <Hero
        minHeight="min-h-[420px] md:min-h-[460px]"
        top={<NavBar />}
        sub="Nothing is uploaded. That is what makes the first meeting possible at all."
        chapter={<Eyebrow bracket tone="muted">Chapter — 05</Eyebrow>}
        actions={
          <>
            <Button href="#book" variant="solid">
              Book a time
            </Button>
            <Button href="#write" variant="outline">
              Leave your details
            </Button>
          </>
        }
      >
        <Headline level={1} className="max-w-[900px]">
          Demos run on your machine,
          <br />
          against your own RTL
        </Headline>
      </Hero>

      {/* ---------- Book ---------- */}
      <Section id="book" label="Book a time" title="Pick a slot">
        <SectionBody>
          <Body className="mb-8 max-w-[52ch] text-xs">
            Thirty minutes with a founder. Bring a design you care about, or just questions.
          </Body>
          <Calendly />
        </SectionBody>
      </Section>

      {/* ---------- Write ---------- */}
      <Section id="write" label="Or write" title="Leave your details and we will come to you">
        <SectionBody>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <LeadForm intent="demo" />

            <aside className="grid content-start gap-8">
              <div className="rounded-md border border-[color:var(--hairline)] bg-near-black p-7">
                <Eyebrow tone="muted">Direct</Eyebrow>
                <p className="mt-4 text-xs leading-relaxed text-gray-2">
                  Skip the form. This reaches the founding team.
                </p>
                <p className="mt-4">
                  <ObfuscatedEmail
                    user={CONTACT_EMAIL.user}
                    domain={CONTACT_EMAIL.domain}
                    className="text-off-white underline underline-offset-4 transition-colors hover:text-white"
                  />
                </p>
              </div>

              <div className="rounded-md border border-[color:var(--hairline)] p-7">
                <Eyebrow tone="muted">Where we are</Eyebrow>
                <p className="mt-4 text-xs leading-relaxed text-gray-2">
                  {SITE.legalName}
                  <br />
                  {SITE.location}
                </p>
              </div>
            </aside>
          </div>
        </SectionBody>
      </Section>
    </>
  )
}
