import useInView from '@/hooks/use-in-view'
import { BudgetData } from '@/types/budget'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { Reaction } from './random-ten'
import ReactionButton from './reaction-button'
import { useUserReactionStore } from '@/lib/store'
import Icon from './icon'
import { SITE_PATH } from '@/constants/config'

const formatCost = (cost: number | string) => {
  if (!cost) {
    return cost
  }
  const numberCost = typeof cost === 'number' ? cost : parseInt(cost)
  return numberCost.toLocaleString()
}

export default function MobileBudgetList({
  list,
  loadMore,
}: {
  list: BudgetData[]
  loadMore: () => void
}) {
  const targetReactions = useUserReactionStore((state) => state.targetReactions)
  const { targetRef, isIntersecting: shouldStartLoadMore } = useInView()

  useEffect(() => {
    if (shouldStartLoadMore) {
      loadMore()
    }
  }, [loadMore, shouldStartLoadMore])

  return (
    <ul className="mt-10 lg:hidden">
      {list.map((item, i) => (
        <MobileBudgetItem
          key={item.ID}
          item={item}
          ref={i === list.length - 1 ? targetRef : undefined}
          reaction={targetReactions[item.ID]}
        />
      ))}
    </ul>
  )
}

const MobileBudgetItem = forwardRef(
  (
    { item, reaction }: { item: BudgetData; reaction?: Reaction },
    ref: ForwardedRef<HTMLLIElement>
  ) => {
    const [isExpanding, setIsExpanding] = useState(false)
    return (
      <li className="flex flex-col border-t border-black lg:hidden" ref={ref}>
        <div className="flex items-center justify-between border-b border-border-gray py-3">
          <div className="flex items-center gap-6 text-custom-red">
            <div className="text-sm font-bold">編號</div>
            <div>{item.ID}</div>
          </div>
          <a href={`/${SITE_PATH}/proposal?id=${item.ID}`} target="_blank">
            <Icon iconName="icon-open" size={{ width: 20, height: 20 }} />
          </a>
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
        <div className="flex justify-between border-b border-border-gray py-3">
          <div className="flex w-[23%] max-w-[138px] shrink-0 flex-col gap-4">
            <div className="text-sm font-bold">提案</div>
            <div className="">{item.action}</div>
          </div>
          <div className="flex w-[29%] max-w-[174px] shrink-0 flex-col gap-4">
            <div className="text-sm font-bold">審議結果</div>
            <div className="pr-4">{item.result}</div>
          </div>
          <div className="flex w-[30%] max-w-[180px] shrink-0 flex-col gap-4">
            <div className="text-sm font-bold">預算金額</div>
            <div className="pr-[10px]">{formatCost(item.cost)}</div>
          </div>
          <div className="flex w-14 shrink-0 flex-col gap-4">
            <a className="text-sm underline" href={item.url} target="_blank">
              資料來源
            </a>
          </div>
        </div>
        <div className="border-b border-border-gray py-4">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-bold">提案內容</div>
            <div
              className={`relative whitespace-pre text-wrap ${isExpanding ? '' : 'line-clamp-3 overflow-hidden'}`}
              onClick={() => {
                setIsExpanding(!isExpanding)
              }}
            >
              {item.content}
              {isExpanding ? (
                <span className="whitespace-nowrap text-right font-bold text-custom-blue">
                  [<span className="underline">收合</span>]
                </span>
              ) : (
                <span className="absolute bottom-0 right-0 bg-gradient-to-r from-transparent from-0% to-background-gray to-15% pb-px pl-[17px]">
                  ......
                  <span className="font-bold text-custom-blue">
                    [<span className="underline">更多</span>]
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 border-b border-border-gray pb-5 pt-4">
          <div className="flex w-[118px] shrink-0 flex-col gap-4">
            <div className="text-sm font-bold">關心數</div>
            <div className="">
              {item.totalReaction +
                (!!reaction && reaction !== 'indifferent' ? 1 : 0)}
            </div>
          </div>
          <div className="flex w-[70px] shrink-0 flex-col gap-[9px]">
            <div className="text-sm font-bold">我關心這個</div>
            <div className="text-center">
              <ReactionButton reaction={reaction} itemId={item.ID} />
            </div>
          </div>
        </div>
      </li>
    )
  }
)
MobileBudgetItem.displayName = 'MobileBudgetItem'
