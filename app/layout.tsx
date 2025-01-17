import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className="border-black bg-background-gray border-[3px]">
        <main>{children}</main>
      </body>
    </html>
  )
}
