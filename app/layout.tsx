import type { Metadata, Viewport } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Variable fonts - the full weight axis is loaded so light display weights work.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.easychip.org'),
  title: {
    default: 'EasyChip - AI-native EDA platform',
    template: '%s - EasyChip',
  },
  description:
    'One platform for everything around chip signoff. Consolidate your secondary EDA toolchain - the cockpit above your signoff engines.',
  applicationName: 'EasyChip',
  alternates: {
    canonical: './',
  },
  openGraph: {
    siteName: 'EasyChip',
    type: 'website',
    url: 'https://www.easychip.org',
    images: [{ url: '/brand/banner.png', width: 1983, height: 793, alt: 'EasyChip - Prompt In. Silicon Out' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#04060F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh bg-void text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
