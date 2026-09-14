import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

/** 全ページ共通：メインを伸ばしフッターを画面最下部に配置 */
export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Outlet />
      <Footer />
    </div>
  )
}
