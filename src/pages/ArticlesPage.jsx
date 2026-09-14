import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { toolHomeLinkProps } from '../constants/paths'
import { ARTICLES } from '../lib/articles'
import ArticleCard from '../components/ArticleCard'
import ArticleToolCta from '../components/ArticleToolCta'
import { useEffect } from 'react'

export default function ArticlesPage() {
  useEffect(() => {
    document.title = 'お役立ちコラム一覧｜持ち物リストチェッカー'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        '旅行の持ち物・パッキング・防犯・機内ルールなど、準備に役立つコラム10本。忘れ物ゼロの旅へ。',
      )
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[600px] items-center justify-between px-4 py-3">
          <Link
            {...toolHomeLinkProps()}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            ツールへ
          </Link>
          <span className="flex items-center gap-1 text-sm font-bold text-slate-700">
            <BookOpen size={18} className="text-pink-500" />
            お役立ちコラム
          </span>
          <span className="w-16" aria-hidden="true" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[600px] flex-1 space-y-8 px-4 py-6 pb-8">
        <div className="text-center">
          <span className="text-4xl" aria-hidden="true">
            📚
          </span>
          <h1 className="mt-2 text-xl font-bold text-slate-700">旅行準備お役立ちコラム</h1>
          <p className="mt-2 text-sm text-slate-500">
            パッキングから帰宅後の片付けまで、ポップにわかりやすくお届けします♪
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <ArticleToolCta />
      </main>
    </div>
  )
}
