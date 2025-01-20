'use client'

import BudgetList from '@/components/budget-list'
import Landing from '@/components/landing'
import RandomTen from '@/components/random-ten'
import { useComponentStore } from '@/lib/store'

export type ComponentKey = 'Landing' | 'RandomTen' | 'BudgetList'

export default function Page() {
  const { currentComponent } = useComponentStore()
  const componentsMap: Record<ComponentKey, JSX.Element> = {
    Landing: <Landing />,
    RandomTen: <RandomTen />,
    BudgetList: <BudgetList />,
  }

  return <>{componentsMap[currentComponent]}</>
}
