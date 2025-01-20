'use client'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ShareButton as ReadrShareButton } from '@readr-media/share-button'
import { useEffect, useState } from 'react'

export default function ShareButton() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <div className="size-[21px] sm:size-7">
      {isMounted && <ReadrShareButton pathColor="black" direction="vertical" />}
    </div>
  )
}
