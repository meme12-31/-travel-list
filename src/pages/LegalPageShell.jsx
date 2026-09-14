import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toolHomeLinkProps } from '../constants/paths'

/**
 * @param {{ title: string, children: import('react').ReactNode }} props
 */
export default function LegalPageShell({ title, children }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[600px] items-center justify-between px-4 py-3">
          <Link
            {...toolHomeLinkProps()}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            TOPへ
          </Link>
          <span className="text-sm font-bold text-slate-700">{title}</span>
          <span className="w-14" aria-hidden="true" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[600px] flex-1 px-4 py-6 pb-10">
        <article className="space-y-4 rounded-3xl bg-white/70 p-5 text-sm leading-relaxed text-slate-600 shadow-sm ring-1 ring-black/5">
          {children}
        </article>
      </main>
    </div>
  )
}
