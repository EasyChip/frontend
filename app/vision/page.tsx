import type { Metadata } from 'next'
import VisionPage from '@/components/pages/VisionPage'

export const metadata: Metadata = {
  title: 'Vision — EasyChip',
  description: 'We\'re building the autopilot for silicon. Natural language to manufacturable chip — no EDA expertise required.',
}

export default function Vision() {
  return <VisionPage />
}
