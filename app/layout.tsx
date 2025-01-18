import '@/styles/globals.css'

import { Noto_Serif } from 'next/font/google'
const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

import Icon from '../components/icon'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant" className={notoSerif.className}>
      <body className="border-[3px] border-black bg-background-gray">
        <header className="fixed left-0 top-0 z-10 w-full bg-background-gray py-5 pl-5 pr-6">
          <div className="flex flex-row justify-between">
            <Icon iconName="logo" size={{ width: 92, height: 28 }} />
            <Icon iconName="icon-share" size={{ width: 20, height: 20 }} />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
