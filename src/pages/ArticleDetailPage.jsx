import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Tag } from 'lucide-react'
import { toolHomeLinkProps } from '../constants/paths'
import { getArticleBySlug } from '../lib/articles'
import { getArticleHtmlBySlug } from '../lib/article-content/travel-articles'
import ArticleToolCta from '../components/ArticleToolCta'

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const article = slug ? getArticleBySlug(slug) : undefined
  const html = slug ? getArticleHtmlBySlug(slug) : undefined

  useEffect(() => {
    if (!article) return
    document.title = `${article.title}｜持ち物リストチェッカー`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', article.description)
  }, [article])

  if (!slug || !article || !html) {
    return <Navigate to="/articles" replace />
  }

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
          <Link
            to="/articles"
            className="text-xs font-semibold text-sky-600 hover:underline"
          >
            コラム一覧
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[600px] flex-1 px-4 py-6 pb-8">
        <article className="space-y-6">
          <header className="space-y-3 rounded-3xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5">
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600">
              <Tag size={12} />
              {article.category}
            </span>
            <h1 className="text-left text-xl font-bold leading-snug text-slate-800">{article.title}</h1>
            <p className="text-left text-sm text-slate-600">{article.description}</p>
          </header>

          <div
            className="article-body rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <ArticleToolCta />
        </article>
      </main>
    </div>
  )
}
