import { formatCost } from '@/lib/budget-data'
import { BudgetData } from '@/types/budget'

export default function SingleBudget({
  budgetItem,
}: {
  budgetItem: BudgetData
}) {
  return (
    <>
      <DesktopBudgetItem item={budgetItem} />
      <MobileBudgetItem item={budgetItem} />
    </>
  )
}

const DesktopBudgetItem = ({ item }: { item: BudgetData }) => {
  return (
    <>
      <table className="hidden w-[964px] table-fixed lg:table">
        <thead>
          <tr>
            <th className="w-[71px] pb-3 text-left text-custom-red">編號</th>
            <th className="w-[119px] pb-3 text-left">部會</th>
            <th className="w-[222px] pb-3 text-left">{'審議日期(階段)'}</th>
            <th className="w-[175px] pb-3 text-left">{'提案人(連署)'}</th>
            <th className="w-[85px] pb-3 text-left">提案</th>
            <th className="w-[77px] pb-3 text-left">審議結果</th>
            <th className="w-[101px] pb-3 text-left"></th>
            <th className="w-[114px] pb-3 text-left">預算金額</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-black py-4">
            <td className="py-4 pr-[26px] align-top text-custom-red">
              {item.ID}
            </td>
            <td className="py-4 pr-[19px] align-top">{item.full_name}</td>
            <td className="py-4 pr-[13px] align-top">{item.time_place}</td>
            <td className="py-4 pr-[31px] align-top">{item.who}</td>
            <td className="py-4 align-top">{item.action}</td>
            <td className="py-4 align-top">{item.result}</td>
            <td className="py-4 align-top">
              <a className="underline" href={item.url} target="_blank">
                資料來源
              </a>
            </td>
            <td className="py-4 pr-[19px] align-top">{item.cost}</td>
          </tr>
        </tbody>
      </table>
      <table className="hidden w-[964px] table-fixed lg:table">
        <thead>
          <tr>
            <th className="w-[242px] pb-3 text-left">提案內容</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-black py-4">
            <td className="relative mr-[23px] whitespace-pre text-wrap py-4 align-top">
              {item.content}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const MobileBudgetItem = ({ item }: { item: BudgetData }) => {
  return (
    <li className="flex flex-col border-t border-black lg:hidden">
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
      <div className="py-4">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-bold">提案內容</div>
          <div className="relative whitespace-pre text-wrap">
            {item.content}
          </div>
        </div>
      </div>
    </li>
  )
}
