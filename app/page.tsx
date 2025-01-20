'use client'

import BudgetList from '@/components/budget-list'
import Landing from '@/components/landing'
import RandomTen from '@/components/random-ten'

export default function Page() {
  return (
    <>
      <Landing />
      <RandomTen />
      <BudgetList />
    </>
  )
}
