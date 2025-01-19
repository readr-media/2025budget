import Icon from './icon'
import { Noto_Sans_TC } from 'next/font/google'
import NextLink from 'next/link'
import LatestNews from './latest-news'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

export default function Landing() {
  return (
    <section className="h-[calc(100vh-68px)] pt-[68px]">
      <div className="flex flex-col items-center">
        <h2 className="pb-6 pt-10 text-4xl font-bold lg:pt-[100px]">
          一起【審預算】
        </h2>
        <p className="w-[328px] pb-11 text-base font-medium">
          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        </p>
        <LatestNews />
        <a href="#random-ten" className="pb-[72px]">
          <Icon
            iconName="icon-project-entry"
            size={{ width: 200, height: 126 }}
          />
        </a>
        <ul className={`${notoSansTC.className} text-sm font-bold`}>
          <li>記者：李又如</li>
          <li>設計：曾立宇</li>
          <li>工程：李文瀚、鄧宇哲、陳柏維、簡信昌</li>
          <li>資料處理：李又如、劉怡馨、陳珮瑜</li>
          <li>
            資料合作：
            <NextLink href={'https://openfun.tw/'}>歐噴有限公司</NextLink>
          </li>
        </ul>
      </div>
    </section>
  )
}
