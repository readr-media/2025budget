import { useMeiliSearch } from '@/hooks/useMeiliSearch'
import { Input } from './ui/input'
import DesktopSearchResult from './desktop-search-result'
import MobileSearchResult from './mobile-search-result'
import { useMemo } from 'react'

export default function BudgetListInSearch() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setCurrentPage,
    loadmore,
    isLoading,
    shouldLoadMore,
  } = useMeiliSearch('budget-2025', '')

  const hintText = useMemo(() => {
    if (isLoading) return '搜尋中...'
    if (!searchQuery) return '請輸入搜尋關鍵字'
    if (!searchResults.length) return '無搜尋結果，請修改搜尋關鍵字'
  }, [isLoading, searchQuery, searchResults.length])

  return (
    <div className="mt-4 flex w-full grow flex-col items-center lg:mt-10">
      <Input
        className="h-7 w-[189px] bg-white text-center"
        type="text"
        placeholder="搜尋"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setCurrentPage(1)
        }}
      />
      <p className="mt-7 lg:mt-9">
        想隨機看不同提案內容？
        <a href={'#random-ten'} className="text-custom-blue underline">
          點我跳轉
        </a>
      </p>
      {searchResults.length ? (
        <>
          <DesktopSearchResult
            list={searchResults}
            loadMore={loadmore}
            shouldLoadMore={shouldLoadMore}
          />
          <MobileSearchResult
            list={searchResults}
            loadMore={loadmore}
            shouldLoadMore={shouldLoadMore}
          />
        </>
      ) : (
        <div className="flex grow items-center justify-center font-bold">
          {hintText}
        </div>
      )}
    </div>
  )
}
