import useInView from '@/hooks/use-in-view'
import { BudgetData } from '@/types/budget'
import { useEffect } from 'react'

export default function DesktopBudgetTable({
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
          <th className="w-[73px] pb-3 text-left">關心數</th>
          <th className="w-[82px] pb-3">我關心這個</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, i) => (
          <tr
            key={item.ID}
            className="border-t border-black py-4"
            ref={i === list.length - 1 ? targetRef : undefined}
          >
            <td className="py-4 align-top">{item.ID}</td>
            <td className="py-4 pr-[28px] align-top">{item.full_name}</td>
            <td className="py-4 pr-[21px] align-top">{item.time_place}</td>
            <td className="py-4 pr-[14px] align-top">{item.who}</td>
            <td className="py-4 align-top">{item.action}</td>
            <td className="py-4 align-top">{item.result}</td>
            <td className="py-4 pr-[23px] align-top">{item.content}</td>
            <td className="py-4 align-top">{item.cost}</td>
            <td className="py-4 align-top">{item.totalReaction}</td>
            <td className="py-4 align-top">⭐</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
