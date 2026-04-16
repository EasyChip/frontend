import type { Metadata, Viewport } from 'next'
import EasyChipWordmark from '@/components/EasyChipWordmark'
import CardTabs from './CardTabs'

// TODO: Add a 512×512 apple-touch-icon.png so founders can "Add to Home Screen" on iOS for one-tap access at the event

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0A0A0A',
}

export const metadata: Metadata = {
  title: 'EasyChip — Event Card',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function CardPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-bg-void overflow-hidden">
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,150,46,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center min-h-screen max-w-[480px] mx-auto px-6">
        {/* Header */}
        <header className="pt-12 pb-6">
          <EasyChipWordmark size={28} showTagline />
        </header>

        <CardTabs />

        {/* Footer */}
        <footer className="mt-auto pb-8 pt-6 text-center">
          <p className="text-[12px] font-display text-white/40">
            Rakshit Mishra&ensp;·&ensp;Parth Parekh
          </p>
        </footer>
      </div>
    </div>
  )
}
