import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import WaitlistProvider from '@/components/layout/WaitlistProvider'
import CustomCursor from '@/components/shared/CustomCursor'
import Navbar from '@/components/layout/Navbar'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://easychip.vercel.app'),
  title: 'EasyChip — Natural Language to Silicon',
  description: 'AI-native EDA platform that converts plain English hardware specs into verified, synthesizable Verilog. Open-source stack. No $150K licence required.',
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'EasyChip — Natural Language to Silicon',
    description: 'AI-native EDA platform that converts plain English hardware specs into verified, synthesizable Verilog. Open-source stack. No $150K licence required.',
    url: 'https://easychip.vercel.app',
    siteName: 'EasyChip',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyChip — Natural Language to Silicon',
    description: 'AI-native EDA platform that converts plain English hardware specs into verified, synthesizable Verilog.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${ibmPlexMono.variable} ${ibmPlexSans.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <WaitlistProvider />
      </body>
    </html>
  )
}
