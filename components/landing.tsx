import Icon from './icon'
import { Noto_Sans_TC } from 'next/font/google'
import NextLink from 'next/link'
import LatestNews from './latest-news'
import { useComponentStore } from '@/lib/store'
import useInView from '@/hooks/use-in-view'
import { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

export default function Landing() {
  const { targetRef, isIntersecting } = useInView()
  const { setCurrentComponent } = useComponentStore()

  useEffect(() => {
    if (isIntersecting) {
      setCurrentComponent('RandomTen')
    }
  }, [isIntersecting, setCurrentComponent])

  return (
    <>
      <section className="flex h-svh flex-col items-center pt-[68px]">
        <h2 className="pb-6 pt-8 text-center text-4xl font-bold lg:pt-[100px]">
          中央政府【總預算案】審查監督平台
        </h2>
        <p className="w-[328px] pb-6 text-sm font-medium">
          114
          年中央政府總預算案審查，立委提出哪些刪減和建議？透過「隨機」和「分類」模式一目暸然。
          <br></br>
          <span className="text-xs">
            （註：預算案「減列」為刪除；「凍結」為滿足立委提出的條件後可動用；「其他建議」為預算通過的附帶條件，法律名詞為主決議。平台資料來源為立法院議事錄，隨會議進度持續更新中，看資料範疇或詳細使用說明請點
          </span>
          <NextLink
            href={
              'https://docs.google.com/spreadsheets/d/1LTHdDPmihKQlUggj0PzITA44QGlQGgIUSR8D59hWZPI/edit?gid=1224248748#gid=1224248748'
            }
            className="text-xs text-custom-blue"
          >
            此連結
          </NextLink>
          。）
        </p>
        <LatestNews />
        <button
          className="pb-[72px]"
          onClick={() => setCurrentComponent('RandomTen')}
        >
          <Icon
            iconName="icon-project-entry"
            size={{ width: 200, height: 126 }}
          />
        </button>
        <Dialog>
          <DialogTrigger>credit</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <ul className={`${notoSansTC.className} text-sm font-bold`}>
                  <li>記者：李又如</li>
                  <li>設計：曾立宇</li>
                  <li>工程：李文瀚、鄧宇哲、陳柏維、簡信昌</li>
                  <li>資料處理：李又如、劉怡馨、陳珮瑜</li>
                  <li>
                    資料合作：
                    <NextLink
                      href={'https://openfun.tw/'}
                      className="text-custom-blue"
                    >
                      歐噴有限公司
                    </NextLink>
                  </li>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
      <div ref={targetRef} className="sr-only"></div>
    </>
  )
}
