import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import { SITE } from '@/lib/site'
import Footer from '@/components/chrome/Footer'
import './globals.css'

/* Two registers only. Archivo 300 carries every statement; IBM Plex Mono
   carries every label, index and date. No third face, and never a serif. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.descriptor}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: './' },
  openGraph: {
    siteName: SITE.name,
    type: 'website',
    url: SITE.url,
    images: [{ url: '/brand/logo-2000.png', width: 2000, height: 502, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-black text-off-white antialiased">
        {/*
          DIRECTION CONTRACT - EasyChip v3
          THESIS: Fifty EDA tools, owned end to end, shown as one instrument rather than a
            catalogue. Refuses the AI-EDA category page: no accent hue, no gradient hero,
            no feature-card triptych.
          OWN-WORLD: Strictly monochrome. #0B0B0B ground, #141414 cards, hairline rules at
            14% white. Archivo 300 statements over IBM Plex Mono uppercase labels. A 180px
            label column runs beside content on every section. Desaturated macro hardware
            photography under a 15%→85% scrim. Radii 4/10/20/pill. No shadow but the news bar.
          STORY: An investor or chip lead learns the suite exists and is built, that it runs
            on their own machine and reruns bit-identically, and books a demo.
          FIRST VIEWPORT: Full-bleed die macro, 20px frame. Nav transparent inside the frame,
            white news bar floating below it. Headline anchored bottom-left at display-1,
            chapter marker bottom-right. Primary action sits under the sub-line, left.
          FORM: Brief-pinned world from public/v3_revamp; no direction roll per new-work §3
            ("a user- or brief-pinned direction beats the roll, always").
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
            review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
        */}
        <div className="flex min-h-dvh flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
</body>
    </html>
  )
}
