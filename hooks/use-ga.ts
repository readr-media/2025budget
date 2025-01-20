'use client'

import gtag from '@/components/gtag'
import { useEffect } from 'react'

export default function useGA() {
  useEffect(() => {
    gtag.init()
    gtag.sendGAPageView('/')
  }, [])
}
