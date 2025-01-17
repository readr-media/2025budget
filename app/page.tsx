'use client'

import { useState, useEffect } from 'react'
import { db } from './utils/firebase/app'
import { collection, getDocs } from 'firebase/firestore'

type BudgetData = {
  ID: number
  time_place: string
  category: string
  full_name: string
  who: string
  action: string
  result: string
  content: string
  cost: number
  url: string
}

export default function Page() {
  const [viewData, setViewData] = useState<BudgetData[] | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'project-bucket-2025')
        )
        const data: BudgetData[] = querySnapshot.docs.map((doc) => ({
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
        }))
        setViewData(data)
      } catch (err) {
        console.error(err)
      }
    }

    init()
  }, [])

  return (
    <>
      <h1 className="text-gray-dark">Hello, Next.js!</h1>
      <pre>{JSON.stringify(viewData, null, 2)}</pre>
    </>
  )
}
