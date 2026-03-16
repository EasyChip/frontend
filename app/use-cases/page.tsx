import type { Metadata } from 'next'
import UseCasesPage from '@/components/pages/UseCasesPage'

export const metadata: Metadata = {
  title: 'Use Cases — EasyChip',
  description: 'EasyChip for hardware startups, AI companies, university research, and enterprise fabless teams.',
}

export default function UseCases() {
  return <UseCasesPage />
}
