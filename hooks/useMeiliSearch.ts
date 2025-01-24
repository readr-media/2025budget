import { type BudgetData } from '@/types/budget'
import { MeiliSearch } from 'meilisearch'
import {
  useEffect,
  useState,
  useCallback,
  useDeferredValue,
  useMemo,
} from 'react'
import { debounce } from 'lodash'
const client = new MeiliSearch({
  host: 'https://edge.meilisearch.com',
  apiKey: '0d07631b4784739bfd1f1960db8c51f5880084918c4757d7d0bc8ca97b16b538',
})

const DEBOUNCE_TIME = 500
export type MeiliSearchResults = Omit<BudgetData, 'totalReaction' | 'reaction'>

export function useMeiliSearch(
  indexName: string,
  initialQuery: string = '',
  limit: number = 20
) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<MeiliSearchResults[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const deferredQuery = useDeferredValue(searchQuery)
  const shouldLoadMore = totalPages > 0 && currentPage < totalPages

  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true)
      const offset = (currentPage - 1) * limit
      try {
        const index = client.index(indexName)
        const { hits, estimatedTotalHits } = await index.search(query, {
          limit,
          offset,
        })
        const totalPages = Math.ceil(estimatedTotalHits / limit)
        if (currentPage === 1) {
          setSearchResults(hits as BudgetData[])
        } else {
          setSearchResults((searchResults) =>
            searchResults.concat(hits as BudgetData[])
          )
        }

        setTotalPages(totalPages)
        setError(null)
      } catch (err) {
        console.error('Error searching Meilisearch:', err)
        setSearchResults([])
        setError('Failed to fetch search results.')
      } finally {
        setIsLoading(false)
      }
    },
    [currentPage, indexName, limit]
  )
  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, DEBOUNCE_TIME),
    [handleSearch]
  )
  const loadmore = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1)
  }, [])
  useEffect(() => {
    if (deferredQuery.trim() !== '') {
      debouncedHandleSearch(deferredQuery)
    } else {
      setSearchResults([])
      setTotalPages(0)
    }
  }, [debouncedHandleSearch, deferredQuery])

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    totalPages,
    isLoading,
    error,
    handleSearch,
    currentPage,
    setCurrentPage,
    loadmore,
    shouldLoadMore,
  }
}
