'use client'

import NewHero from '@/components/landing/NewHero'
import Premise from '@/components/landing/Premise'
import TwoPaths from '@/components/landing/TwoPaths'
import BuildToday from '@/components/landing/BuildToday'
import ImagineTomorrow from '@/components/landing/ImagineTomorrow'
import WhyMatters from '@/components/landing/WhyMatters'
import Founders from '@/components/landing/Founders'
import Horizon from '@/components/landing/Horizon'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <main>
        <NewHero />
        <Premise />
        <TwoPaths />
        <BuildToday />
        <ImagineTomorrow />
        <WhyMatters />
        <Founders />
        <Horizon />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
