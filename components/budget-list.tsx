import { Noto_Sans_TC } from 'next/font/google'
import { BudgetListViewMode } from '@/types/budget'
import { useEffect, useState } from 'react'
import useInView from '@/hooks/use-in-view'
import Icon from './icon'
import BudgetListSwitch from './budget-list-switch'
import BudgetListInCategories from './budget-list-in-categories'
import BudgetListInSearch from './budget-list-in-search'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

export default function BudgetList() {
  const [showGoTop, setShowGoTop] = useState(false)
  const [viewMode, setViewMode] = useState<BudgetListViewMode>(
    BudgetListViewMode.Category
  )

  const { targetRef, isIntersecting } = useInView()

  useEffect(() => {
    if (isIntersecting === null) return
    setShowGoTop(isIntersecting)
  }, [isIntersecting])

  return (
    <>
      <section
        id="budget-list"
        className={`${notoSansTC.className} flex min-h-screen w-full flex-col pt-[108px] lg:pt-[125px]`}
        ref={targetRef}
      >
        <div className="mx-auto flex max-w-[500px] grow flex-col items-center px-[31px] sm:px-0 lg:max-w-[964px]">
          <h2 className="text-xl font-bold">
            這些是目前在立法院預算審議過程中，立委提出的刪減和凍結提案：
          </h2>
          <BudgetListSwitch
            mode={viewMode}
            onChange={(newViewMode) => setViewMode(newViewMode)}
          />
          {viewMode === BudgetListViewMode.Category ? (
            <BudgetListInCategories />
          ) : (
            <BudgetListInSearch />
          )}
        </div>
      </section>
      {showGoTop && (
        <a
          className="fixed bottom-[36px] right-[36px] flex size-[60px] flex-col items-center justify-center gap-[2px] rounded-full bg-black px-4 pb-[8px] pt-[6px]"
          href="#budget-list"
        >
          <Icon iconName="icon-go-up" size={{ width: 15, height: 12 }} />
          <span className="w-[28px] shrink-0 text-sm font-medium leading-[1.08] text-white">
            回到分類
          </span>
        </a>
      )}
    </>
  )
}
