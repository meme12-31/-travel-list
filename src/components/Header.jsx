import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, FolderOpen, Luggage } from 'lucide-react'

/**
 * アプリヘッダー・ナビゲーション
 *
 * @param {{
 *   view: 'home' | 'editor',
 *   savedCount: number,
 *   onHome: () => void,
 *   onOpenMyList: () => void,
 * }} props
 */
export default function Header({ view, savedCount, onHome, onOpenMyList }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[600px] items-center justify-between px-4 py-3">
        {view === 'editor' ? (
          <button
            type="button"
            onClick={onHome}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 active:scale-95"
            aria-label="テンプレート選択に戻る"
          >
            <ArrowLeft size={18} />
            もどる
          </button>
        ) : (
          <button
            type="button"
            onClick={onHome}
            className="flex items-center gap-2 text-slate-700"
            aria-label="ホーム"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-400 text-white shadow-sm">
              <Luggage size={18} />
            </span>
            <span className="text-sm font-bold">持ち物チェッカー</span>
          </button>
        )}

        <div className="flex items-center gap-1">
          <Link
            to="/articles"
            className="flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-semibold text-pink-600 transition hover:bg-pink-50 active:scale-95"
            aria-label="お役立ちコラム"
          >
            <BookOpen size={18} />
            <span className="hidden sm:inline">コラム</span>
          </Link>
          <button
            type="button"
            onClick={onOpenMyList}
            className="relative flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 active:scale-95"
            aria-label="保存済みマイリストを開く"
          >
            <FolderOpen size={18} />
            <span className="hidden sm:inline">マイリスト</span>
            {savedCount > 0 && (
              <span className="ml-0.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] leading-none text-white">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
