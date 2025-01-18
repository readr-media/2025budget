import { BudgetData } from '@/types/budget'

const item = {
  ID: 1,
  action: '其他建議',
  category: '原民會',
  content:
    '原住民族委員會為深化民族教育內涵，促進原住民族族語、教育及文化推廣，提升大眾傳播媒體及其他公共領域原住民族史觀、文化、藝術能見度之目標，近年每年均編列「原住民族教育推展」媒體政策及業務宣導費，其預算數自111年度之475萬2千元逐年增加至113年度之1,560萬元，增加1,084萬8千元(增加約2.28倍)；且「原住民族教育推展」之媒體政策及業務宣導費占該項費用整體預算經費之比率，由111年度30.77%增至113年度60.34%，呈上升之勢。原住民族委員會賡續於114年度預算案「原住民族教育推展」工作計畫編列媒體政策及業務宣導費2,120萬元，包括辦理「原住民族教育協調與發展」及「原住民族文化維護與發展」等相關工作，預計辦理內容與113年度預算相近，惟該媒體政策及業務宣傳經費卻較113年度預算數1,560萬元增加35.90%，且較112年度決算數1,122萬5元增加88.86%，爰請原住民族委員會於2月內，向立法院內政委員會提出書面報告，說明預算相關運用規劃。【208】',
  cost: 21200000,
  full_name: '原住民族委員會',
  result: '通過',
  time_place: '2024-01-01（教文委員會）',
  url: 'https://ppg.ly.gov.tw/ppg/sittings/2024112160/details?meetingDate=113/11/25&meetingTime=09:00-17:30&departmentCode=null',
  who: '李柏毅（王美惠、張宏陸）',
}

export default function BudgetList() {
  return (
    <section
      id="budget-list"
      className="min-h-screen w-full pt-[108px] lg:pt-[125px]"
    >
      <div className="mx-auto flex max-w-[500px] flex-col items-center px-[31px] sm:px-0 lg:max-w-[964px]">
        <h2 className="text-xl font-bold">
          這些是目前在立法院預算審議過程中，立委提出的刪減和凍結提案：
        </h2>
        <div className="mt-4 flex flex-wrap gap-2 lg:mt-8 lg:w-[730px] lg:gap-3">
          <CategoryButton text="全部" isActive={true} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
          <CategoryButton text="內政部" isActive={false} />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3 lg:gap-1">
          <SubCategoryButton text="中央警察大學" isActive={false} />
          <SubCategoryButton text="中央警察大學" isActive={true} />
          <SubCategoryButton text="中央警察大學" isActive={false} />
          <SubCategoryButton text="中央警察大學" isActive={false} />
          <SubCategoryButton text="中央警察大學" isActive={false} />
          <SubCategoryButton text="中央警察大學" isActive={false} />
          <SubCategoryButton text="中央警察大學" isActive={false} />
          <SubCategoryButton text="中央警察大學" isActive={false} />
        </div>
        <p className="mt-7 lg:mt-9">
          想隨機看不同提案內容？
          <a href="#random-ten" className="text-custom-blue underline">
            點我跳轉
          </a>
        </p>
        <DesktopBudgetTable list={[item, item]} />
        <ul className="mt-10">
          <MobileBudgetItem item={item} />
          <MobileBudgetItem item={item} />
        </ul>
      </div>
    </section>
  )
}

const CategoryButton = ({
  text,
  isActive,
}: {
  text: string
  isActive: boolean
}) => {
  return (
    <button
      className={`shrink-0 rounded-[4px] border border-black p-1 lg:p-[10px] ${isActive ? 'bg-custom-blue text-white' : ''}`}
    >
      {text}
    </button>
  )
}

const SubCategoryButton = ({
  text,
  isActive,
}: {
  text: string
  isActive: boolean
}) => {
  return (
    <button
      className={`lg:p-[10px] ${isActive ? 'text-custom-blue' : 'text-text-gray'}`}
    >
      {text}
    </button>
  )
}

const DesktopBudgetTable = ({ list }: { list: BudgetData[] }) => {
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
        {list.map((item) => (
          <tr className="border-t border-black py-4">
            <td className="py-4 align-top">{item.ID}</td>
            <td className="py-4 pr-[28px] align-top">{item.full_name}</td>
            <td className="pr-21px py-4 pr-[21px] align-top">
              {item.time_place}
            </td>
            <td className="py-4 pr-[14px] align-top">{item.who}</td>
            <td className="py-4 align-top">{item.action}</td>
            <td className="py-4 align-top">{item.result}</td>
            <td className="py-4 pr-[23px] align-top">{item.content}</td>
            <td className="py-4 align-top">{item.cost}</td>
            <td className="py-4 align-top">999999</td>
            <td className="py-4 align-top">⭐</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const MobileBudgetItem = ({ item }: { item: BudgetData }) => {
  return (
    <li className="flex flex-col border-t border-black lg:hidden">
      <div className="border-border-gray border-b py-3">
        <div className="flex gap-6 text-custom-red">
          <div className="text-sm font-bold">編號</div>
          <div>{item.ID}</div>
        </div>
      </div>
      <div className="border-border-gray flex justify-between border-b py-3">
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
      <div className="border-border-gray flex justify-between gap-2 border-b py-3">
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
      <div className="border-border-gray border-b py-4">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-bold">提案內容</div>
          <div className="">{item.content}</div>
        </div>
      </div>
      <div className="border-border-gray flex gap-2 border-b pb-5 pt-4">
        <div className="flex w-[118px] shrink-0 flex-col gap-4">
          <div className="text-sm font-bold">關心數</div>
          <div className="">99999</div>
        </div>
        <div className="flex w-[70px] shrink-0 flex-col gap-[9px]">
          <div className="text-sm font-bold">我關心這個</div>
          <div className="">O</div>
        </div>
      </div>
    </li>
  )
}
