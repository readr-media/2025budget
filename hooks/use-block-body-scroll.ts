import { useEffect } from 'react'

export default function useBlockBodyScroll() {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])
}
