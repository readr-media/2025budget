'use client'

import SingleBudget from '@/components/single-budget'
import SingleBudgetReaction from '@/components/single-budget-reaction'
import { SITE_URL } from '@/constants/config'
import useGA from '@/hooks/use-ga'
import { BudgetData } from '@/types/budget'
import { db } from '@/utils/firebase/app'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const budgetParamName = 'id'

export default function ClientPage() {
  useGA()

  const [budgetItem, setBudgetItem] = useState<BudgetData | null>(null)
  const [loadingFailed, setLoadingFailed] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const budgetId = parseInt(searchParams.get(budgetParamName) ?? '')

  useEffect(() => {
    const init = async () => {
      const q = query(
        collection(db, 'project-bucket-2025'),
        where('ID', '==', budgetId)
      )
      const querySnapshot = await getDocs(q)
      const list: BudgetData[] = querySnapshot.docs.map((doc) => ({
        ID: doc.data().ID,
        time_place: doc.data().time_place,
        category: doc.data().category,
        full_name: doc.data().full_name,
        who: doc.data().who,
        action: doc.data().action,
        result: doc.data().result,
        content: doc.data().content,
        cost: doc.data().cost,
        url: doc.data().url,
        totalReaction: doc.data().totalReaction,
        reaction: doc.data().reaction,
      }))

      const budgetItem = list[0]
      if (budgetItem) {
        setBudgetItem(budgetItem)
      } else {
        setLoadingFailed(true)
      }
    }

    if (budgetId) {
      init()
    } else {
      setLoadingFailed(true)
    }
  }, [budgetId, router])

  useEffect(() => {
    if (loadingFailed) {
      setTimeout(() => {
        router.push('/#budget-list')
      }, 2000)
    }
  }, [loadingFailed, router])

  return (
    <div className="flex min-h-screen flex-col px-[31px] pt-[69px] lg:px-0 lg:pt-[101px]">
      {budgetItem ? (
        <div className="pb-10 pt-7 lg:mx-auto lg:w-[964px] lg:pb-[137px] lg:pt-[93px]">
          <a
            className="leading-[1.2] underline"
            href={`${SITE_URL}/#budget-list`}
          >
            {'< 回到分類'}
          </a>
          <div className="mt-4 lg:mt-[48px]">
            <SingleBudget budgetItem={budgetItem} />
          </div>
          <SingleBudgetReaction item={budgetItem} />
        </div>
      ) : (
        <div className="flex size-full grow items-center justify-center font-bold">
          {loadingFailed ? '查無預算案，即將導回分類...' : '載入中...'}
        </div>
      )}
    </div>
  )
}
