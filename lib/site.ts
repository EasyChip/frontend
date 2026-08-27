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
    'Fifty EDA tools built in-house across all nine stages of chip design, orchestrated from one place and running on your own machines. Deterministic by default.',
  closingLine:
    'Any engineer should be able to go from idea to silicon without a $500,000 licence standing in the way.',
} as const

export const CTA = {
  primary: { label: 'Book a demo', href: '/contact' },
  secondary: { label: 'See the platform', href: '/platform' },
} as const

/** The floating news bar over the hero. One true message. */
export const NEWS = {
  message: 'VisUPF is free and open source',
  href: '/platform#suite',
} as const

export interface NavLink {
  label: string
  href: string
}

/** Seven public routes. There is no signed-in area on this site. */
export const NAV: NavLink[] = [
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

/** Obfuscated at render time — never a plain mailto in the HTML. */
export const CONTACT_EMAIL = { user: 'founder', domain: 'easychip.org' } as const

/**
 * Calendly booking. `null` until a real link is configured.
 *
 * Deliberately not defaulted to a guessed URL: embedding a Calendly link that
 * does not exist renders Calendly's own 404 page — their branding, their
 * cookie banner — inside ours, which is worse than showing nothing. When this
 * is null the booking surface says so plainly and points at the form instead.
 */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || null

/** Conferences where the team will be. Engineer-led, not booth-led. */
export const APPEARANCES = [
  { event: 'DVCon India', place: 'Bengaluru', when: 'September 2026' },
  { event: 'SEMICON India', place: 'Delhi', when: 'September 2026' },
] as const
