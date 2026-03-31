'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlaygroundStore } from '@/stores/playground-store'

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { setProfile } = usePlaygroundStore()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/login')
        return
      }
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data)
        })
    })

    console.log(
      '%c⬡ EasyChip %c Natural Language to Silicon',
      'color: #fff; font-weight: bold; font-size: 14px;',
      'color: #888; font-size: 12px;'
    )
  }, [router, setProfile])

  return <>{children}</>
}
