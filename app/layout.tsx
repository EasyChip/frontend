import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import WaitlistProvider from '@/components/layout/WaitlistProvider'
import CustomCursor from '@/components/shared/CustomCursor'

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
  title: 'EasyChip — Natural Language to Silicon',
  description: 'Describe a hardware module in plain English. EasyChip generates verified, synthesisable Verilog — ready for tape-out.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${ibmPlexMono.variable} ${ibmPlexSans.variable}`}>
      <body>
        <CustomCursor />
        {children}
        <WaitlistProvider />
      </body>
    </html>
  )
}
