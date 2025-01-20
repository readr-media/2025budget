'use client'

import BudgetList from '@/components/budget-list'
import Landing from '@/components/landing'
import RandomTen from '@/components/random-ten'

export default function Page() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <div className="h-svh snap-center">
        <Landing />
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
