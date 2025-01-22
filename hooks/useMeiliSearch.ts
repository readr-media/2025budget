import { type BudgetData } from '@/types/budget'
import { MeiliSearch } from 'meilisearch'
import { useEffect, useState, useCallback, useDeferredValue } from 'react'

const client = new MeiliSearch({
  host: 'https://edge.meilisearch.com',
  apiKey: '0d07631b4784739bfd1f1960db8c51f5880084918c4757d7d0bc8ca97b16b538',
})

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
  const [totalResults, setTotalResults] = useState(0)
  const deferredQuery = useDeferredValue(searchQuery)
  const totalPages = Math.ceil(totalResults / limit)

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query)
      setIsLoading(true)
      const offset = (currentPage - 1) * limit
      try {
        const index = client.index(indexName)
        const { hits, estimatedTotalHits } = await index.search(query, {
          limit,
          offset,
        })
        setSearchResults(hits as BudgetData[])
        setTotalResults(estimatedTotalHits)
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

  useEffect(() => {
    if (deferredQuery.trim() !== '') {
      handleSearch(deferredQuery)
    } else {
      setSearchResults([])
      setTotalResults(0)
    }
  }, [handleSearch, deferredQuery])

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
  }
}
