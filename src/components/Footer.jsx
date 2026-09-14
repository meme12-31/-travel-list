import { Link } from 'react-router-dom'

const navItems = [
  { label: '運営者情報', to: '/about' },
  { label: 'プライバシーポリシー', to: '/privacy' },
  { label: 'お問い合わせ', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/60 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto max-w-[600px] px-4 py-6 sm:py-7">
        <p className="text-center text-xs leading-relaxed text-slate-500">
          登録不要・完全無料 / データはこの端末内にのみ保存されます
        </p>

        <nav
          aria-label="フッターナビゲーション"
          className="mt-4 flex flex-col items-center gap-1 sm:mt-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-1 sm:gap-y-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white/80 hover:text-sky-600 active:scale-[0.98]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="mt-5 border-t border-slate-200/60 pt-4 text-center text-[11px] text-slate-400">
          © 2026 持ち物リストチェッカー All rights reserved.
        </p>
      </div>
    </footer>
  )
}
