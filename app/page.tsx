'use client'

import dynamic from 'next/dynamic'
import { Workflow, Layers, BookOpen, Telescope, Map, Users } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import FeatureStrip from '@/components/landing/FeatureStrip'
import TechSection from '@/components/landing/TechSection'
import CTASection from '@/components/landing/CTASection'

// Below-fold sections lazy loaded
const ProblemSection = dynamic(() => import('@/components/landing/ProblemSection'))
const SocialProofSection = dynamic(() => import('@/components/landing/SocialProofSection'))
const ComparisonSection = dynamic(() => import('@/components/landing/ComparisonSection'))
const SiliconJourney = dynamic(() => import('@/components/landing/SiliconJourney'))
const PersonaSection = dynamic(() => import('@/components/landing/PersonaSection'))
const WhyNow = dynamic(() => import('@/components/landing/WhyNow'))

function openWaitlist() {
  window.dispatchEvent(new CustomEvent('ec:openWaitlist'))
}

const NAV_ITEMS = [
  { name: 'How it works', url: '/#how-it-works', icon: Workflow,  sectionId: 'how-it-works' },
  { name: 'Features',     url: '/#features',     icon: Layers,    sectionId: 'features'     },
  { name: 'Vision',       url: '/vision',        icon: Telescope                            },
  { name: 'Roadmap',      url: '/roadmap',       icon: Map                                  },
  { name: 'Use Cases',    url: '/use-cases',     icon: Users                                },
  { name: 'Docs',         url: '#',              icon: BookOpen                             },
]

export default function HomePage() {
  return (
    <>
      <NavBar items={NAV_ITEMS} onOpenWaitlist={openWaitlist} />
      <main>
        <Hero onOpenWaitlist={openWaitlist} />
        <ProblemSection />
        <HowItWorks />
        <FeatureStrip />
        <SiliconJourney />
        <TechSection />
        <PersonaSection />
        <WhyNow />
        <SocialProofSection />
        <ComparisonSection />
        <CTASection onOpenWaitlist={openWaitlist} />
      </main>
      <Footer />
    </>
  )
}
