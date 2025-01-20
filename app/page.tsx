'use client'

import BudgetList from '@/components/budget-list'
import Landing from '@/components/landing'
import RandomTen from '@/components/random-ten'
import useGA from '@/hooks/use-ga'

export default function Page() {
  useGA()

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <div className="h-svh snap-center">
        <Landing />
      </div>
      <div className="h-svh snap-center">
        <RandomTen />
      </div>
      <div className="snap-center">
        <BudgetList />
      </div>
      <div className="h-svh snap-center">
        <RandomTen />
      </div>
      <div className="snap-start">
        <BudgetList />
      </div>
    </div>
  )
}
