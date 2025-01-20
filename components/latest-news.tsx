import { Noto_Sans_TC } from 'next/font/google'
import Icon from './icon'
import { useEffect, useState } from 'react'
import { LATEST_NEWS_JSON_URL } from '@/constants/config'
import { News } from '@/types/budget'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

export default function LatestNews() {
  const [news, setNews] = useState<News[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentNews = news[currentIndex]

  const hideLeftArrow = currentIndex === 0 || !news.length
  const hideRightArrow = currentIndex === news.length - 1 || !news.length

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(LATEST_NEWS_JSON_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }
        const data: News[] = await response.json()
        data.sort(
          (a, b) =>
            new Date(b.date_time).getTime() - new Date(a.date_time).getTime()
        )
        setNews(data)
      } catch (error) {
        console.error('fetch latest news failed')
      }
    }
    init()
  }, [])

  if (!currentNews) {
    return (
      <div className="mb-[24px] flex h-[180px] shrink-0 flex-col items-center justify-center">
        最新進度載入中...
      </div>
    )
  }

  return (
    <>
      <p className="pb-3 text-xl font-bold">{`[最新進度]`}</p>
      <div className="flex flex-row items-center gap-2 pb-4">
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={hideLeftArrow}
          className={`${hideLeftArrow ? 'opacity-0' : ''}`}
        >
          <Icon
            iconName="icon-triangle-left"
            size={{ width: 16, height: 16 }}
            className="size-4"
          />
        </button>
        <p className={`${notoSansTC.className} text-base font-bold`}>
          {formatDate(currentNews.date_time)}
        </p>
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={hideRightArrow}
          className={`${hideRightArrow ? 'opacity-0' : ''}`}
        >
          <Icon
            iconName="icon-triangle-right"
            size={{ width: 16, height: 16 }}
            className="size-4"
          />
        </button>
      </div>
      <div className="mb-6 h-[100px] w-[252px] bg-white p-[10px]">
        <pre className="size-full overflow-scroll text-wrap text-[15px] leading-[20px]">
          {currentNews.content}
        </pre>
      </div>
    </>
  )
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  // Extract year, month, day, and time
  const year = date.getFullYear().toString() // Get the last 3 digits of the year
  const month = date.getMonth() + 1 // Months are zero-based
  const day = date.getDate()
  const time = date.toTimeString().slice(0, 5) // Get 'HH:MM'

  return `${year}/${month}/${day} ${time}`
}
