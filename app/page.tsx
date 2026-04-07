'use client'

import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import ProblemSection from '@/components/landing/ProblemSection'
import WhyNow from '@/components/landing/WhyNow'
import HowItWorks from '@/components/landing/HowItWorks'
import StackSection from '@/components/landing/StackSection'
import Team from '@/components/landing/Team'
import Contact from '@/components/landing/Contact'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WhyNow />
        <HowItWorks />
        <StackSection />
        <Team />
        <Contact />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
