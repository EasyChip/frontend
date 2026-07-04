/**
 * Site-wide constants: navigation, CTAs, footer, external links.
 * Copy source: internal/content/02_positioning + 03_global_ui_copy (never deployed).
 */

export const SITE = {
  name: 'EasyChip',
  url: 'https://www.easychip.org',
  h1: 'Chip Design Made Simpler',
  tagline: 'Prompt In. Silicon Out',
  positioning: 'The cockpit for chip design - not the engine.',
  region: 'Built in India, for chip teams worldwide.',
  elevator:
    'EasyChip is an AI-native platform that consolidates the dozens of secondary EDA tools chip teams juggle into one - the cockpit above your signoff engines, not a replacement for them.',
  description:
    'One platform for everything around chip signoff. Consolidate your secondary EDA toolchain - the cockpit above your signoff engines.',
} as const

export const CTA = {
  primary: { label: 'Book a Demo', href: '/contact' },
  secondary: { label: 'Get Early Access', href: '/contact#early-access' },
} as const

/** Announcement bar - single true message (VisUPF open-source launch). */
export const ANNOUNCEMENT = {
  message: 'VisUPF is now free and open source',
  linkLabel: 'Get it',
  href: '/tools/visupf',
} as const

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface NavItem {
  label: string
  href?: string
  children?: NavLink[]
}

/** Top navigation (build spec C2; Security intentionally out of nav until facts land). */
export const NAV: NavItem[] = [
  {
    label: 'Platform',
    children: [
      { label: 'The Suite', href: '/platform', description: 'Every tool, one cockpit' },
      { label: 'Escanor', href: '/escanor', description: 'Local-first - your IP never leaves' },
      { label: 'Vision', href: '/vision', description: 'Where this is going' },
    ],
  },
  { label: 'Tools', href: '/tools' },
  { label: 'Escanor', href: '/escanor' },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    children: [
      { label: 'Docs', href: '/docs', description: 'Guides and references' },
      { label: 'Blog', href: '/blog', description: 'EDA deep-dives and thesis' },
      { label: 'Newsroom', href: '/newsroom', description: 'Announcements and milestones' },
      { label: 'Events', href: '/events', description: 'Where to meet us' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About', href: '/about', description: 'The team and the thesis' },
      { label: 'Careers', href: '/careers', description: 'Build the platform' },
      { label: 'Contact', href: '/contact', description: 'Talk to the team' },
    ],
  },
]

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Tools', href: '/tools' },
      { label: 'Escanor', href: '/escanor' },
      { label: 'Vision', href: '/vision' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Newsroom', href: '/newsroom' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
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

/** Only links that exist today. LinkedIn company page + X: pending (CONTENT_TODO). */
export const SOCIALS = {
  github: 'https://github.com/EasyChip',
} as const

/** Obfuscated at render time - never a plain mailto in the HTML. */
export const CONTACT_EMAIL = { user: 'founder', domain: 'easychip.org' } as const

/** Cal.com booking (env-driven, personal link as fallback until team link exists). */
export const CALCOM_URL =
  process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL || 'https://cal.com/rakshit-mishra-5x7tan'

/** Formspree endpoint id (waitlist + contact forms) - carried over from the previous site. */
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mlgpjjbl'

/**
 * VisUPF open-source tarball. Set to the served path (e.g.
 * '/downloads/visupf-x.y.z.tar.gz') once the release file is dropped into
 * public/downloads/. While null, the download block renders a
 * "packaging in progress" state instead of a dead link.
 */
export const VISUPF_DOWNLOAD: string | null = null
