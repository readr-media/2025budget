import Icon from './icon'
import NextLink from 'next/link'
import LatestNews from './latest-news'

export default function Landing() {
  return (
    <>
      <section className="flex h-svh flex-col items-center pt-[69px] lg:pt-[102px]">
        <h2 className="w-[320px] pb-6 pt-5 text-center text-2xl font-bold lg:pb-5 lg:pt-[100px]">
          中央政府【總預算案】審查監督平台
        </h2>
        <div className="w-[328px] pb-6 font-medium lg:w-[432px]">
          <p className="lg:text-base">
            114年中央政府總預算案審查，立委提出哪些刪減和建議？透過「隨機」和「分類」模式一目暸然。
          </p>
          <span className="text-xs text-text-gray lg:text-sm">
            （註：預算案「減列」為刪除；「凍結」為滿足立委提出的條件後可動用；「其他建議」為預算通過的附帶條件，法律名詞為主決議。平台資料來源為立法院議事錄，隨會議進度持續更新中，看資料範疇或詳細使用說明請點
          </span>
          <NextLink
            href={
              'https://docs.google.com/spreadsheets/d/1LTHdDPmihKQlUggj0PzITA44QGlQGgIUSR8D59hWZPI/edit?gid=1224248748#gid=1224248748'
            }
            className="text-xs text-text-gray underline lg:text-sm"
          >
            此連結
          </NextLink>
          <span className="text-xs text-text-gray lg:text-sm">。）</span>
        </div>
        <LatestNews />
        <NextLink href={'#random-ten'} className="pb-[72px]">
          <Icon
            iconName="icon-project-entry"
            size={{ width: 132, height: 84 }}
          />
        </NextLink>
      </section>
    </>
  )
}
