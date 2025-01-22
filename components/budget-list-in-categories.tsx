import { useCallback, useEffect, useMemo, useState } from 'react'
import DesktopBudgetTable from './desktop-budget-table'
import MobileBudgetList from './mobile-budget-list'
import { BudgetData, CategoryData, CategoryItem } from '@/types/budget'
import BudgetListControl from './budget-list-control'
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '@/utils/firebase/app'

const ITEMS_PER_PAGE = 20

export default function BudgetListInCategories() {
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([])
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentSubCategory, setCurrentSubCategory] = useState('')
  const [list, setList] = useState<BudgetData[]>([])
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null) // For pagination

  const categories = useMemo(() => {
    if (!categoryItems.length) return []
    return categoryItems.map((categoryItem) => Object.keys(categoryItem)[0])
  }, [categoryItems])

  const subCategories = useMemo(() => {
    if (!categoryItems.length || !currentCategory) return []
    return (
      categoryItems.find(
        (categoryItem) => Object.keys(categoryItem)[0] === currentCategory
      )?.[currentCategory] ?? []
    )
  }, [categoryItems, currentCategory])

  const onChangeCategory = (newCategory: string) => {
    if (!categoryItems.length) return
    const newSubCategory =
      categoryItems.find(
        (categoryItem) => Object.keys(categoryItem)[0] === newCategory
      )?.[newCategory][0] ?? ''
    setCurrentCategory(newCategory)
    setCurrentSubCategory(newSubCategory)
  }

  const fetchBudgetList = useCallback(
    async (mainCategory: string, subCategory: string) => {
      const q = query(
        collection(db, 'project-bucket-2025'),
        where('category', '==', mainCategory),
        where('full_name', '==', subCategory),
        orderBy('totalReaction', 'desc'),
        orderBy('ID', 'asc'),
        limit(ITEMS_PER_PAGE)
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
      }))
      setList(list)
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    },
    []
  )

  const fetchNextBudgetList = useCallback(async () => {
    if (!lastDoc) return

    const q = query(
      collection(db, 'project-bucket-2025'),
      where('category', '==', currentCategory),
      where('full_name', '==', currentSubCategory),
      orderBy('totalReaction', 'desc'),
      orderBy('ID', 'asc'),
      startAfter(lastDoc),
      limit(ITEMS_PER_PAGE)
    )

    const querySnapshot = await getDocs(q)
    const newList: BudgetData[] = querySnapshot.docs.map((doc) => ({
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
    }))

    setList((list) => {
      const newFilterdList = newList.filter((item) =>
        list.find((listItem) => listItem.ID !== item.ID)
      )
      return list.concat(newFilterdList)
    })
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
  }, [currentCategory, currentSubCategory, lastDoc])

  useEffect(() => {
    if (currentCategory && currentSubCategory) {
      setLastDoc(null)
      fetchBudgetList(currentCategory, currentSubCategory)
    }
  }, [currentCategory, currentSubCategory, fetchBudgetList])

  useEffect(() => {
    const init = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'project-bucket-2025-categories')
        )
        const categoryData: CategoryData[] = querySnapshot.docs.map((doc) => {
          return {
            items: {
              ...doc.data().items,
            },
          }
        })

        const categoryItemsObj = categoryData[0].items
        const categoryItems = Object.entries(categoryItemsObj)
          .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
          .map((arr) => arr[1])
        const firstCategoryObj = categoryItems[0]
        const firstCategory = Object.keys(firstCategoryObj)[0]
        const firstSubCategory = firstCategoryObj[firstCategory][0]
        setCategoryItems(categoryItems)
        setCurrentCategory(firstCategory)
        setCurrentSubCategory(firstSubCategory)
      } catch (err) {
        console.error(err)
      }
    }

    init()
  }, [])

  return (
    <>
      <BudgetListControl
        currentCategory={currentCategory}
        categories={categories}
        currentSubCategory={currentSubCategory}
        subCategories={subCategories}
        onChangeCategory={onChangeCategory}
        onChangeSubCategory={setCurrentSubCategory}
      />
      <p className="mt-7 lg:mt-9">
        想隨機看不同提案內容？
        <a href={'#random-ten'} className="text-custom-blue underline">
          點我跳轉
        </a>
      </p>
      <DesktopBudgetTable list={list} loadMore={fetchNextBudgetList} />
      <MobileBudgetList list={list} loadMore={fetchNextBudgetList} />
    </>
  )
}
