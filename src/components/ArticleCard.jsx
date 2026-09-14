import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

/**
 * @param {{ article: import('../lib/articles').ArticleMeta }} props
 */
export default function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className={`group flex flex-col gap-2 rounded-3xl bg-gradient-to-br ${article.accent} p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`}
    >
      <span className="text-2xl transition group-hover:scale-110" aria-hidden="true">
        {article.emoji}
      </span>
      <span className="line-clamp-3 text-sm font-bold leading-snug text-slate-700">
        {article.title}
      </span>
      <p className="line-clamp-2 text-[11px] leading-tight text-slate-600/85">{article.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <span className="rounded-full bg-white/75 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
          {article.category}
        </span>
        <span className="ml-auto flex items-center gap-0.5 text-[10px] font-semibold text-pink-500 opacity-0 transition group-hover:opacity-100">
          <Sparkles size={11} />
          読む
        </span>
      </div>
    </Link>
  )
}
