import type { Metadata } from 'next'
import RoadmapPage from '@/components/pages/RoadmapPage'

export const metadata: Metadata = {
  title: 'Roadmap — EasyChip',
  description: 'From RTL to full RTL→GDSII automation. See where we are and where we\'re going.',
}

export default function Roadmap() {
  return <RoadmapPage />
}
