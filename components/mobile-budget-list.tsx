import useInView from '@/hooks/use-in-view'
import { BudgetData } from '@/types/budget'
import { useEffect } from 'react'

export default function MobileBudgetList({
  list,
  loadMore,
}: {
  list: BudgetData[]
  loadMore: () => void
}) {
  const { targetRef, isIntersecting: shouldStartLoadMore } = useInView()

  useEffect(() => {
    if (shouldStartLoadMore) {
      loadMore()
    }
  }, [loadMore, shouldStartLoadMore])

  return (
    <ul className="mt-10 lg:hidden">
      {list.map((item, i) => (
        <li
          className="flex flex-col border-t border-black lg:hidden"
          key={item.ID}
          ref={i === list.length - 1 ? targetRef : undefined}
        >
          <div className="border-b border-border-gray py-3">
            <div className="flex items-center gap-6 text-custom-red">
              <div className="text-sm font-bold">編號</div>
              <div>{item.ID}</div>
            </div>
          </div>
          <div className="flex justify-between border-b border-border-gray py-3">
            <div className="flex w-1/5 max-w-[120px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">部會</div>
              <div className="">{item.full_name}</div>
            </div>
            <div className="flex w-[34.8%] max-w-[208.8px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">審議日期（階段）</div>
              <div className="pr-4">{item.time_place}</div>
            </div>
            <div className="flex w-[30.5%] max-w-[183px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">提案人（連署）</div>
              <div className="pr-[10px]">{item.who}</div>
            </div>
          </div>
          <div className="flex justify-between gap-2 border-b border-border-gray py-3">
            <div className="flex w-1/5 max-w-[120px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">提案</div>
              <div className="">{item.action}</div>
            </div>
            <div className="flex w-[34.8%] max-w-[208.8px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">審議結果</div>
              <div className="pr-4">{item.result}</div>
            </div>
            <div className="flex w-[30.5%] max-w-[183px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">預算金額</div>
              <div className="pr-[10px]">{item.cost}</div>
            </div>
          </div>
          <div className="border-b border-border-gray py-4">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold">提案內容</div>
              <div className="">{item.content}</div>
            </div>
          </div>
          <div className="flex gap-2 border-b border-border-gray pb-5 pt-4">
            <div className="flex w-[118px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">關心數</div>
              <div className="">{item.totalReaction}</div>
            </div>
            <div className="flex w-[70px] shrink-0 flex-col gap-[9px]">
              <div className="text-sm font-bold">我關心這個</div>
              <div className="">O</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
