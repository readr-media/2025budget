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
            <th className="w-[87px] pb-3 text-left">分類</th>
            <th className="w-[103px] pb-3 text-left">部會</th>
            <th className="w-[151px] pb-3 text-left">{'審議日期(階段)'}</th>
            <th className="w-[175px] pb-3 text-left">{'提案人(連署)'}</th>
            <th className="w-[85px] pb-3 text-left">提案</th>
            <th className="w-[224px] pb-3 text-left">審議結果</th>
            <th className="w-[66px] pb-3 text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-black py-4">
            <td className="py-4 pr-[26px] align-top text-custom-red">
              {item.ID}
            </td>
            <td className="py-4 pr-[38px] align-top">{item.category}</td>
            <td className="py-4 pr-[32px] align-top">{item.full_name}</td>
            <td className="py-4 pr-[23px] align-top">{item.time_place}</td>
            <td className="py-4 pr-[31px] align-top">{item.who}</td>
            <td className="py-4 align-top">{item.action}</td>
            <td className="py-4 align-top">{item.result}</td>
            <td className="py-4 align-top">
              <a className="underline" href={item.url} target="_blank">
                資料來源
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="mt-[44px] hidden w-[964px] table-fixed lg:table">
        <thead>
          <tr>
            <th className="w-[242px] pb-3 text-left">提案內容</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-black py-4">
            <td className="relative mr-[23px] whitespace-pre text-wrap py-4 align-top text-[14px]">
              {item.content}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="mt-[32px] hidden w-[964px] table-fixed lg:table">
        <thead>
          <tr>
            <th className="w-[244px] pb-3 text-left text-custom-red">
              預算金額
            </th>
            <th className="w-[244px] pb-3 text-left text-custom-red">
              減列金額
            </th>
            <th className="w-[476px] pb-3 text-left text-custom-red">
              凍結金額
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-black py-4">
            <td className="py-4 pr-[26px] align-top text-custom-red">
              {item.cost}
            </td>
            <td className="py-4 pr-[26px] align-top text-custom-red">
              {item.deleted}
            </td>
            <td className="py-4 pr-[26px] align-top text-custom-red">
              {item.frozen}
            </td>
          </tr>
        </tbody>
      </table>
      {item.item && (
        <>
          <table className="mt-[32px] hidden w-[964px] table-fixed lg:table">
            <thead>
              <tr>
                <th className="w-[488px] pb-3 text-left">科目/計畫</th>
                <th className="w-[476px] pb-3 text-left">
                  計畫說明
                  {item.budget_url && (
                    <a
                      href={item.budget_url}
                      target="_blank"
                      className="ml-4 text-[14px] font-normal text-custom-blue underline"
                    >
                      預算書連結
                    </a>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black py-4">
                <td className="relative mr-[23px] whitespace-pre text-wrap py-4 align-top">
                  {item.item}
                </td>
                <td className="relative mr-[23px] whitespace-pre text-wrap py-4 align-top text-[14px]">
                  {item.item_note}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="mt-[32px] hidden w-[964px] table-fixed lg:table">
            <thead>
              <tr>
                <th className="w-[239px] pb-3 text-left">上年度決算</th>
                <th className="w-[249px] pb-3 text-left">上年度法定預算</th>
                <th className="w-[476px] pb-3 text-left">與上年度比較</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black py-4">
                <td className="py-4 align-top">{item.last_cost}</td>
                <td className="py-4 align-top">{item.last_budget}</td>
                <td className="py-4 pr-[19px] align-top">{item.budget_diff}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
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
        <div className="flex w-[88px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">分類</div>
          <div className="">{item.category}</div>
        </div>
        <div className="flex w-[240px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">部會</div>
          <div className="">{item.full_name}</div>
        </div>
      </div>
      <div className="flex justify-between border-b border-border-gray py-3">
        <div className="flex w-[140px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">審議日期（階段）</div>
          <div className="pr-[52px]">{item.time_place}</div>
        </div>
        <div className="flex w-[188px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">提案人（連署）</div>
          <div className="pr-[10px]">{item.who}</div>
        </div>
      </div>
      <div className="flex justify-between border-b border-border-gray py-3">
        <div className="flex w-[77px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">提案</div>
          <div className="">{item.action}</div>
        </div>
        <div className="flex w-[195px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">審議結果</div>
          <div className="pr-4">{item.result}</div>
        </div>
        <div className="flex w-[58px] shrink-0 flex-col justify-between gap-4">
          <div className="text-sm font-bold"></div>
          <div className="">
            <a className="text-sm underline" href={item.url} target="_blank">
              資料來源
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-border-gray py-4">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-bold">提案內容</div>
          <div className="relative whitespace-pre text-wrap text-[14px]">
            {item.content}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between py-3 text-custom-red ${item.item ? 'border-b border-border-gray' : ''}`}
      >
        <div className="flex w-[109px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">預算金額</div>
          <div className="">{formatCost(item.cost)}</div>
        </div>
        <div className="flex w-[135px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">減列金額</div>
          <div className="pr-4">{formatCost(item.deleted)}</div>
        </div>
        <div className="flex w-[84px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">凍結金額</div>
          <div className="pr-4">{formatCost(item.frozen)}</div>
        </div>
      </div>
      {item.item && (
        <>
          <div className="py-4">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold">科目/計畫</div>
              <div className="relative whitespace-pre text-wrap">
                {item.item}
              </div>
            </div>
          </div>
          <div className="border-b border-border-gray py-4">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold">
                計畫說明
                {item.budget_url && (
                  <a
                    href={item.budget_url}
                    target="_blank"
                    className="ml-6 text-[14px] font-normal text-custom-blue underline"
                  >
                    預算書連結
                  </a>
                )}
              </div>
              <div className="relative whitespace-pre text-wrap text-[14px]">
                {item.item_note}
              </div>
            </div>
          </div>
          <div className="flex justify-between py-3">
            <div className="flex w-[109px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">上年度決算</div>
              <div className="">{formatCost(item.last_cost)}</div>
            </div>
            <div className="flex w-[135px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">上年度法定預算</div>
              <div className="pr-4">{formatCost(item.last_budget)}</div>
            </div>
            <div className="flex w-[84px] shrink-0 flex-col gap-4">
              <div className="text-sm font-bold">與上年度比較</div>
              <div
                className="pr-4"
                dangerouslySetInnerHTML={{
                  __html: item.budget_diff
                    ? item.budget_diff
                        .split(' ')
                        .map((str, i) => {
                          if (i == 0) return formatCost(str)
                          return str
                        })
                        .join('<br/>')
                    : '',
                }}
              />
            </div>
          </div>
        </>
      )}
    </li>
  )
}
