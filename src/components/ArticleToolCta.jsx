import { Link } from 'react-router-dom'
import { Luggage } from 'lucide-react'
import { toolHomeLinkProps } from '../constants/paths'

export default function ArticleToolCta() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-sky-400 to-blue-400 p-5 text-center text-white shadow-md">
      <p className="mb-1 text-sm font-bold">🧳 読んだ内容をそのまま使おう！</p>
      <p className="mb-4 text-xs text-white/90">
        テンプレートから持ち物リストを作成して、チェックしながら準備できます♪
      </p>
      <Link
        {...toolHomeLinkProps()}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-sky-600 shadow-sm transition hover:bg-sky-50 active:scale-95"
      >
        <Luggage size={18} />
        持ち物チェックリストを使う
      </Link>
    </div>
  )
}
