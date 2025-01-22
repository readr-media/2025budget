import { Noto_Sans_TC } from 'next/font/google'
import {
  BudgetData,
  BudgetListViewMode,
  CategoryData,
  CategoryItem,
} from '@/types/budget'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import DesktopBudgetTable from './desktop-budget-table'
import MobileBudgetList from './mobile-budget-list'
import BudgetListControl from './budget-list-control'
import useInView from '@/hooks/use-in-view'
import Icon from './icon'
import MobileSearchResult from './mobile-search-result'
import DesktopSearchResult from './desktop-search-result'
import { useMeiliSearch } from '@/hooks/useMeiliSearch'
import { Input } from './ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import BudgetListSwitch from './budget-list-switch'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

const ITEMS_PER_PAGE = 10

export default function BudgetList() {
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([])
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentSubCategory, setCurrentSubCategory] = useState('')
  const [list, setList] = useState<BudgetData[]>([])
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null) // For pagination
  const [showGoTop, setShowGoTop] = useState(false)
  const [viewMode, setViewMode] = useState<BudgetListViewMode>(
    BudgetListViewMode.Category
  )

  const { targetRef, isIntersecting } = useInView()
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useMeiliSearch('budget-2025', '')

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
    if (isIntersecting === null) return
    setShowGoTop(isIntersecting)
  }, [isIntersecting])

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
      <section
        id="budget-list"
        className={`${notoSansTC.className} min-h-screen w-full pt-[108px] lg:pt-[125px]`}
        ref={targetRef}
      >
        <div className="mx-auto flex max-w-[500px] flex-col items-center px-[31px] sm:px-0 lg:max-w-[964px]">
          <h2 className="text-xl font-bold">
            這些是目前在立法院預算審議過程中，立委提出的刪減和凍結提案：
          </h2>
          <BudgetListSwitch
            mode={viewMode}
            onChange={(newViewMode) => setViewMode(newViewMode)}
          />
          {viewMode === BudgetListViewMode.Category ? (
            <BudgetListControl
              currentCategory={currentCategory}
              categories={categories}
              currentSubCategory={currentSubCategory}
              subCategories={subCategories}
              onChangeCategory={onChangeCategory}
              onChangeSubCategory={setCurrentSubCategory}
            />
          ) : (
            <Input
              className="mt-5 w-full lg:w-1/3"
              type="text"
              placeholder="搜尋"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <p className="mt-7 lg:mt-9">
            想隨機看不同提案內容？
            <a href={'#random-ten'} className="text-custom-blue underline">
              點我跳轉
            </a>
          </p>
          {viewMode === BudgetListViewMode.Category ? (
            <>
              <DesktopBudgetTable list={list} loadMore={fetchNextBudgetList} />
              <MobileBudgetList list={list} loadMore={fetchNextBudgetList} />
            </>
          ) : searchResults.length ? (
            <>
              <DesktopSearchResult list={searchResults} />
              <MobileSearchResult list={searchResults} />
              <Pagination className="relative py-3">
                <PaginationContent>
                  <PaginationItem className={currentPage === 1 ? 'hidden' : ''}>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem className={currentPage === 1 ? 'hidden' : ''}>
                    <PaginationLink href="#">
                      {currentPage - 1 === 0 ? null : currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      {currentPage + 1 > totalPages ? null : currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {totalPages > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <div>無搜尋結果</div>
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
