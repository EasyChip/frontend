'use client'

import { useState, useEffect } from 'react'
import WaitlistModal from '@/components/landing/WaitlistModal'

export default function WaitlistProvider() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('ec:openWaitlist', handler)
    return () => window.removeEventListener('ec:openWaitlist', handler)
  }, [])

  return <WaitlistModal open={open} onClose={() => setOpen(false)} />
}
