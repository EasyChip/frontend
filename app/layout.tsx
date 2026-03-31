import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'
import WaitlistProvider from '@/components/layout/WaitlistProvider'
import CustomCursor from '@/components/shared/CustomCursor'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
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
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${manrope.variable}`}>
      <body>
        <CustomCursor />
        {children}
        <WaitlistProvider />
      </body>
    </html>
  )
}
