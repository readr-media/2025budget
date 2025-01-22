'use client'

import BudgetList from '@/components/budget-list'
import Landing from '@/components/landing'
import RandomTen from '@/components/random-ten'
import useGA from '@/hooks/use-ga'
import { useState } from 'react'

export default function Page() {
  const [playIndex, setPlayIndex] = useState(0)

  useGA()

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <div className="h-svh snap-center">
        <Landing />
      </div>
      <div className="h-svh snap-center">
        <RandomTen key={playIndex} />
      </div>
      <div className="h-svh snap-start overflow-auto">
        <BudgetList playAgain={() => setPlayIndex(playIndex + 1)} />
      </div>
    </div>
  )
}
