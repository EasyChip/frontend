/**
 * Site-wide constants: identity, navigation, CTAs, external links.
 * Product truth lives in PRODUCT.md; this file is its shipping surface.
 */

export const SITE = {
  name: 'EasyChip',
  legalName: 'EasyChip Private Limited',
  location: 'Bengaluru, India',
  url: 'https://www.easychip.org',
  descriptor: 'AI-native EDA',
  tagline: 'Prompt In. Silicon Out.',
  positioning: 'The cockpit, not the engine.',
  description:
    'Fifty EDA tools built in-house across all nine engines of chip design, orchestrated from one place and running on your own machines. Deterministic by default.',
  closingLine:
    'Any engineer should be able to go from idea to silicon without a $500,000 licence standing in the way.',
} as const

export const CTA = {
  primary: { label: 'Book a demo', href: '/contact' },
  secondary: { label: 'See the platform', href: '/platform' },
} as const

export interface NavLink {
  label: string
  href: string
}

/**
 * Seven public routes. There is no signed-in area on this site.
 *
 * Home is listed explicitly even though the lockup already links there: the
 * lockup reads as a mark before it reads as a control, and a reader deep in
 * /platform should not have to guess that it is clickable.
 */
export const NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Platform', href: '/platform' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Intelligence', href: '/intelligence' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/company' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export const SOCIALS = {
  github: 'https://github.com/EasyChip',
} as const

/** Obfuscated at render time - never a plain mailto in the HTML. */
export const CONTACT_EMAIL = { user: 'founder', domain: 'easychip.org' } as const

/**
 * The office, as one source of truth for the map, the address block and the
 * directions link - so a move never leaves a stale pin beside a fresh address.
 *
 * `mapQuery` is the registered place name, not the postal address. Measured,
 * not assumed: the full street address renders the right neighbourhood with no
 * marker at all, because Google does not geocode this layout to a point. The
 * place name resolves to a listing whose own info card reads back "First
 * Floor, 104/1, Aishwarya Cr...", so the pin is both present and correct.
 */
export const OFFICE = {
  name: 'BITS Pilani WILP Smart Manufacturing Competency Centre',
  short: 'SMCC, Bengaluru',
  lines: [
    'First Floor, 104/1, Aishwarya Crystal Layout',
    'Singasandra, Bengaluru',
    'Karnataka 560068',
  ],
  mapQuery: 'BITS Pilani, WILP, Smart Manufacturing Competency Centre, Singasandra, Bengaluru',
  note: 'EasyChip works out of the SMCC under the BITS Pilani MoU for co-development and resource sharing.',
} as const

/**
 * Calendly booking. `null` until a real link is configured.
 *
 * Deliberately not defaulted to a guessed URL: embedding a Calendly link that
 * does not exist renders Calendly's own 404 page - their branding, their
 * cookie banner - inside ours, which is worse than showing nothing. When this
 * is null the booking surface says so plainly and points at the form instead.
 */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || null

/** Conferences where the team will be. Engineer-led, not booth-led. */
export const APPEARANCES = [
  { event: 'DVCon India', place: 'Bengaluru', when: 'September 2026' },
  { event: 'SEMICON India', place: 'Delhi', when: 'September 2026' },
] as const
