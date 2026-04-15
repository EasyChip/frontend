'use client'

import Hero from '@/components/landing/Hero'
import ProblemSection from '@/components/landing/ProblemSection'
import WhyNow from '@/components/landing/WhyNow'
import HowItWorks from '@/components/landing/HowItWorks'
import StackSection from '@/components/landing/StackSection'
import Contact from '@/components/landing/Contact'
import CTASection from '@/components/landing/CTASection'
import ModelComingSoon from '@/components/landing/ModelComingSoon'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <ProblemSection />
        <WhyNow />
        <HowItWorks />
        <StackSection />
        <Contact />
        <CTASection />
        <ModelComingSoon />
      </main>
      <Footer />
    </>
  )
}
