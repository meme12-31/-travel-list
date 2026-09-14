import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { ARTICLES } from '../lib/articles'

export default function ArticlesSection() {
  const count = ARTICLES.length

  return (
    <section aria-labelledby="articles-section-title">
      <Link
        to="/articles"
        className="group flex flex-col gap-3 rounded-3xl border border-pink-200/80 bg-gradient-to-br from-pink-50 via-white to-sky-50 p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md active:scale-[0.99]"
      >
        <p className="flex items-center gap-1 text-xs font-semibold text-pink-400">
          <Sparkles size={14} aria-hidden="true" />
          お役立ちコラム
        </p>

        <div className="flex items-start gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-pink-400 shadow-sm ring-1 ring-pink-100 transition group-hover:scale-105"
            aria-hidden="true"
          >
            <BookOpen size={24} strokeWidth={2.25} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="articles-section-title" className="text-lg font-bold text-slate-700">
              📚 旅行準備のヒント10選
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              パッキング・防犯・機内ルールなど、忘れ物ゼロのための読み物が{count}本♪
            </p>
          </div>
        </div>

        <span className="flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-200 bg-sky-50/90 py-2.5 text-sm font-semibold text-sky-600 transition group-hover:bg-sky-100 group-hover:text-sky-700">
          <BookOpen size={18} aria-hidden="true" />
          記事一覧を見る
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </section>
  )
}
