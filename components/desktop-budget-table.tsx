import useInView from '@/hooks/use-in-view'
import { useUserReactionStore } from '@/lib/store'
import { BudgetData } from '@/types/budget'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { Reaction } from './random-ten'
import ReactionButton from './reaction-button'

export default function DesktopBudgetTable({
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
    <table className="mt-[71px] hidden w-[964px] table-fixed lg:table">
      <thead>
        <tr>
          <th className="w-[71px] pb-3 text-left">編號</th>
          <th className="w-[94px] pb-3 text-left">部會</th>
          <th className="w-[92px] pb-3 pr-[27px]">
            審議日期
            <br />
            {'(階段)'}
          </th>
          <th className="w-[86px] pb-3 pr-[22px]">
            提案人
            <br />
            {'(連署)'}
          </th>
          <th className="w-[63px] pb-3 pr-[29px]">提案</th>
          <th className="w-[74px] text-wrap pb-3 pr-[40px]">審議結果</th>
          <th className="w-[245px] pb-3 text-left">提案內容</th>
          <th className="w-[90px] pb-3 text-left">預算金額</th>
          <th className="w-[73px] pb-3 text-center">關心數</th>
          <th className="w-[82px] pb-3">我關心這個</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, i) => (
          <DesktopBudgetRow
            key={item.ID}
            item={item}
            ref={i === list.length - 1 ? targetRef : undefined}
            reaction={targetReactions[item.ID]}
          />
        ))}
      </tbody>
    </table>
  )
}

const DesktopBudgetRow = forwardRef(
  (
    { item, reaction }: { item: BudgetData; reaction?: Reaction },
    ref: ForwardedRef<HTMLTableRowElement>
  ) => {
    const [isExpanding, setIsExpanding] = useState(false)
    return (
      <tr className="border-t border-black py-4" ref={ref}>
        <td className="py-4 align-top">{item.ID}</td>
        <td className="py-4 pr-[28px] align-top">{item.full_name}</td>
        <td className="py-4 pr-[21px] align-top">{item.time_place}</td>
        <td className="py-4 pr-[14px] align-top">{item.who}</td>
        <td className="py-4 align-top">{item.action}</td>
        <td className="py-4 align-top">{item.result}</td>
        <td
          className={`cursor-pointer pr-[23px] align-top ${isExpanding ? 'py-4' : 'my-4 line-clamp-3 overflow-hidden'}`}
          onClick={() => {
            setIsExpanding(!isExpanding)
          }}
        >
          {item.content}
        </td>
        <td className="py-4 pr-[19px] align-top">{item.cost}</td>
        <td className="py-4 text-center align-top">
          {item.totalReaction +
            (!!reaction && reaction !== 'indifferent' ? 1 : 0)}
        </td>
        <td className="py-4 text-center align-top">
          <ReactionButton reaction={reaction} itemId={item.ID} />
        </td>
      </tr>
    )
  }
)
DesktopBudgetRow.displayName = 'DesktopBudgetRow'
