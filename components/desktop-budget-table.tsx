import useInView from '@/hooks/use-in-view'
import { useUserReactionStore } from '@/lib/store'
import { BudgetData } from '@/types/budget'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { Reaction } from './random-ten'
import ReactionButton from './reaction-button'
import Icon from './icon'

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
          <th className="w-[76px] pb-3 text-left text-custom-red">編號</th>
          <th className="w-[73px] pb-3 text-left">部會</th>
          <th className="w-[100px] pb-3 pr-4">
            審議日期
            <br />
            {'(階段)'}
          </th>
          <th className="w-[81px] pb-3 pr-[22px]">
            提案人
            <br />
            {'(連署)'}
          </th>
          <th className="w-[49px] pb-3 pr-4">提案</th>
          <th className="w-[60px] text-wrap pb-3 pr-[27px]">審議結果</th>
          <th className="w-[88px] pb-3"></th>
          <th className="w-[242px] pb-3 text-left">提案內容</th>
          <th className="w-[87px] pb-3 text-center">
            預算
            <br />
            金額
          </th>
          <th className="w-[67px] pb-3 text-center">關心數</th>
          <th className="w-[60px] pb-3">我關心這個</th>
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
        <td className="py-4 align-top text-custom-red">
          <span>{item.ID}</span>
          <a
            className="mt-2 block"
            href={`/proposal?id=${item.ID}`}
            target="_blank"
          >
            <Icon iconName="icon-open" size={{ width: 20, height: 20 }} />
          </a>
        </td>
        <td className="py-4 pr-[28px] align-top">{item.full_name}</td>
        <td className="py-4 pr-[21px] align-top">{item.time_place}</td>
        <td className="py-4 pr-[14px] align-top">{item.who}</td>
        <td className="py-4 align-top">{item.action}</td>
        <td className="py-4 align-top">{item.result}</td>
        <td className="py-4 align-top">
          <a className="underline" href={item.url} target="_blank">
            資料來源
          </a>
        </td>
        <td
          className={`relative mr-[23px] cursor-pointer whitespace-pre text-wrap align-top ${isExpanding ? 'py-4' : 'my-4 line-clamp-3 overflow-hidden'}`}
          onClick={() => {
            setIsExpanding(!isExpanding)
          }}
        >
          {item.content}{' '}
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
