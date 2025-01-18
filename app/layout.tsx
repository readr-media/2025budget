import '@/styles/globals.css'
import { Noto_Sans_TC } from 'next/font/google'

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="border-black bg-background-gray border-[3px]">
        <main>{children}</main>
      </body>
    </html>
  )
}
