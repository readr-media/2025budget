import { useMeiliSearch } from '@/hooks/useMeiliSearch'
import { Input } from './ui/input'
import DesktopSearchResult from './desktop-search-result'
import MobileSearchResult from './mobile-search-result'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

export default function BudgetListInSearch() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useMeiliSearch('budget-2025', '')

  return (
    <div className="mt-4 flex w-full grow flex-col items-center lg:mt-10">
      <Input
        className="h-7 w-[189px] bg-white text-center"
        type="text"
        placeholder="搜尋"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <p className="mt-7 lg:mt-9">
        想隨機看不同提案內容？
        <a href={'#random-ten'} className="text-custom-blue underline">
          點我跳轉
        </a>
      </p>
      {searchResults.length ? (
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
        <div className="flex grow items-center justify-center font-bold">
          無搜尋結果，請修改搜尋關鍵字
        </div>
      )}
    </div>
  )
}
