import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** ルート変更時にウィンドウスクロールを先頭へ戻す */
export default function ScrollToTop() {
  const { pathname, key } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, key])

  return null
}
