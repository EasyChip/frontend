import type { Metadata } from 'next'
import NavBar from '@/components/chrome/NavBar'
import Hero from '@/components/media/Hero'
import Section, { SectionBody } from '@/components/core/Section'
import Button from '@/components/core/Button'
import { Eyebrow, Headline, Accent, Body } from '@/components/core/Type'
import { StatCard, ListRow } from '@/components/lists/Cards'
import { SITE, CTA, APPEARANCES } from '@/lib/site'
import { COUNTS } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'Two founders, fifty production tools, no outside capital. EasyChip Private Limited, Bengaluru.',
  alternates: { canonical: '/company' },
}

const FOUNDERS = [
  {
    name: 'Rakshit Mishra',
    role: 'Co-founder & CEO',
    body: 'Product and frontend. Owns customer development, industry validation, and every conversation that has put a build in front of a practising engineer.',
    linkedin: 'https://www.linkedin.com/in/rakshitmishra9695/',
  },
  {
    name: 'Parth Parekh',
    role: 'Co-founder & CTO',
    body: 'Backend, infrastructure and AI systems. Owns the orchestration layer, the delivery pipeline, and the ML layer now being built across the suite.',
    linkedin: 'https://www.linkedin.com/in/parth-parekh-131820357/',
  },
]

const FINDINGS = [
  {
    index: '01',
    label: 'Determinism before features',
    body: 'If a rerun is not bit-identical, the result cannot be trusted at signoff. This came back more often than any feature request.',
  },
  {
    index: '02',
    label: 'Licence servers are a daily tax',
    body: 'Seat contention, daemon failures and checkout waits cost hours a week. An offline signed licence was described as a reason to switch on its own.',
  },
  {
    index: '03',
    label: 'Nothing leaves the building',
    body: 'IP-sensitive teams will not send RTL to a cloud service. Local-first is the precondition for the conversation.',
  },
  {
    index: '04',
    label: 'Tool sprawl is the hidden cost',
    body: 'Every additional vendor is another format, another script, another support path. Consolidation was valued independently of price.',
  },
]

const MARKET = [
  ['EDA software', '$15.4B', '9.4%', '$26.5B'],
  ['Semiconductor IP', '$8.2B', '9.5%', '$14.2B'],
  ['Custom chip design', '$5.9B', '10.6%', '$10.8B'],
  ['AI chip design acceleration', '$1.8B', '38.0%', '$13.3B'],
]

const ROADMAP = [
  ['Month 3', 'Escanor beta deployed on design-partner hardware'],
  ['Month 6', 'CDCBit wedge live with the first paying teams'],
  ['Month 9–12', 'ML layer live across the priority tools'],
  ['Month 18', 'Full suite plus AI layer, fifteen to twenty tools contracted'],
]

export default function CompanyPage() {
  return (
    <>
      <Hero
        light
        minHeight="min-h-[420px] md:min-h-[460px]"
        top={<NavBar light />}
        sub="EasyChip Private Limited, Bengaluru. Pre-seed, and building."
        chapter={
          <Eyebrow bracket tone="inverse" className="text-black/65">
            Chapter - 04
          </Eyebrow>
        }
        actions={
          <>
            <Button href={CTA.primary.href} variant="solid" light>
              {CTA.primary.label}
            </Button>
            <Button href="/platform" variant="outline" light>
              See the suite
            </Button>
          </>
        }
      >
        <Headline level={1} inverse className="max-w-[940px]">
          Fifty production tools,
          <br />
          built by two people
        </Headline>
      </Hero>

      {/* ---------- Thesis ---------- */}
      <Section label="Why we exist">
        <div className="section-grid">
          <div aria-hidden className="hidden md:block" />
          <div className="grid gap-8 md:grid-cols-2">
            <Body className="text-base">
              We met at BITS Pilani Goa doing device-physics research on Cadence and Sentaurus
              TCAD. The tools were slow enough that the workaround became the company.
            </Body>
            <Body className="text-base">
              India holds roughly a fifth of the world&rsquo;s chip design engineers and owns none
              of the tools they design with. Three vendors hold 74% of the market. That is a
              structural monopoly, not a competitive one.
            </Body>
          </div>
        </div>
      </Section>

      {/* ---------- Founders ---------- */}
      <Section label="Team" title="Two founders who hit this problem before they named it">
        <SectionBody>
          <div className="grid gap-3 md:grid-cols-2">
            {FOUNDERS.map((person) => (
              <div
                key={person.name}
                className="rounded-md border border-[color:var(--hairline)] bg-near-black p-7"
              >
                <Eyebrow tone="muted">{person.role}</Eyebrow>
                <h3 className="mt-4 display-3 text-off-white">{person.name}</h3>
                <p className="mt-3 max-w-[46ch] text-xs leading-relaxed text-gray-2">
                  {person.body}
                </p>
                <div className="mt-6">
                  <Button href={person.linkedin} arrow>
                    LinkedIn
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            <StatCard
              label="Incubation"
              body="BITS Pilani SMCC WILP - a two-year MoU for co-development and resource sharing toward MVP development. Workspace, stipend and mentors. No equity taken."
            />
            <StatCard
              label="Capital raised"
              value="₹0"
              body="The suite was built without outside capital. That number is the argument."
            />
            <StatCard
              label="Deliberately narrow"
              body="We do not attempt the core signoff engines, and we say so in every room."
            />
          </div>
        </SectionBody>
      </Section>

      {/* ---------- Validation ---------- */}
      <Section
        label="Validation"
        title={
          <span className="text-gray-2">
            Forty-one engineers told us <Accent>the same four things</Accent>.
          </span>
        }
      >
        <SectionBody>
          <Body className="max-w-[62ch] text-base">
            Surveys across CAD/EDA and RTL design roles, plus five to six sessions where we put a
            working build in front of a practising engineer and watched them use it.
          </Body>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {FINDINGS.map((f) => (
              <StatCard key={f.index} index={f.index} label={f.label} body={f.body} />
            ))}
          </div>

          <div className="mt-10 rounded-md border border-[color:var(--hairline)] p-7">
            <Eyebrow tone="muted">What this does and does not prove</Eyebrow>
            <Body className="mt-4 max-w-[70ch] text-xs">
              This validates the infrastructure thesis - determinism, licensing, locality,
              consolidation. It does not yet validate our physical-design and reliability roadmap.
              That is precisely what the design-partner beta is scoped to test.
            </Body>
          </div>
        </SectionBody>
      </Section>

      {/* ---------- Market ---------- */}
      <Section label="Market" title="A $34.4B market, and the fastest-growing line in it is ours">
        <SectionBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[color:var(--hairline)]">
                  <th className="label py-4 pr-6 font-medium text-gray-2">Segment</th>
                  <th className="label py-4 pr-6 font-medium text-gray-2">2024</th>
                  <th className="label py-4 pr-6 font-medium text-gray-2">CAGR</th>
                  <th className="label py-4 font-medium text-gray-2">2030</th>
                </tr>
              </thead>
              <tbody>
                {MARKET.map(([segment, y1, cagr, y2]) => (
                  <tr key={segment} className="border-b border-[color:var(--hairline)]">
                    <td className="py-4 pr-6 text-xs text-off-white">{segment}</td>
                    <td className="meta py-4 pr-6 text-gray-2">{y1}</td>
                    <td className="meta py-4 pr-6 text-gray-2">{cagr}</td>
                    <td className="meta py-4 text-gray-2">{y2}</td>
                  </tr>
                ))}
                <tr>
                  <td className="label py-5 pr-6 text-off-white">Total addressable</td>
                  <td className="meta py-5 pr-6 text-white">$34.4B</td>
                  <td className="meta py-5 pr-6 text-white">12.3%</td>
                  <td className="meta py-5 text-white">$69B</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            <StatCard
              value="$12.1B"
              label="Serviceable market"
              body="The secondary tool tier plus AI-accelerated design - the part we can sell into without displacing a core signoff engine."
            />
            <StatCard
              value="500–800"
              label="Teams we can reach"
              body="Global fabless startups, IP vendors and design service houses running full custom flows, plus 130+ DPIIT semiconductor startups in India."
            />
          </div>

          <Body className="mt-10 max-w-[70ch] text-xs">
            Core signoff is a fortress - decades of foundry certification and customer trust sit
            behind it. The tier next to it carries most of the tool count and a large share of the
            licence spend, with none of that certification lock-in. That is the part a new entrant
            can actually take, and the part nobody has made AI-native.
          </Body>
        </SectionBody>
      </Section>

      {/* ---------- Roadmap ---------- */}
      <Section label="What is next" title="The next eighteen months">
        <SectionBody>
          {ROADMAP.map(([when, what]) => (
            <ListRow key={when} meta={when} title={what} />
          ))}
          <div className="border-t border-[color:var(--hairline)]" />
        </SectionBody>
      </Section>

      {/* ---------- Where to find us ---------- */}
      <Section label="In person" title="Engineer-led, not booth-led">
        <SectionBody>
          {APPEARANCES.map((a) => (
            <ListRow key={a.event} meta={a.when} title={`${a.event} · ${a.place}`} />
          ))}
          <div className="border-t border-[color:var(--hairline)]" />

          <div className="mt-12">
            <p className="max-w-[52ch] display-2 text-off-white">{SITE.closingLine}</p>
            <div className="mt-8">
              <Button href={CTA.primary.href} variant="solid">
                {CTA.primary.label}
              </Button>
            </div>
          </div>
        </SectionBody>
      </Section>
    </>
  )
}
