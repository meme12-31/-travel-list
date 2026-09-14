import { FolderOpen, Sparkles } from 'lucide-react'
import { PRESETS } from '../data/presets'

/**
 * ホーム・テンプレート選択画面
 *
 * @param {{
 *   onSelect: (presetId: string) => void,
 *   onOpenMyList: () => void,
 *   savedCount: number,
 * }} props
 */
export default function TemplateSelector({ onSelect, onOpenMyList, savedCount }) {
  return (
    <div className="space-y-6">
      {/* イントロ */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl" aria-hidden="true">
          🧳
        </span>
        <h1 className="text-xl font-bold text-slate-700">持ち物リストチェッカー</h1>
        <p className="max-w-md text-sm text-slate-500">
          旅行・お出かけ・イベントの持ち物を、テンプレートから
          <br className="hidden sm:block" />
          サッと作って、チェック・保存・共有できる無料アプリ。登録不要！
        </p>
      </div>

      {/* 保存済みマイリスト */}
      <button
        type="button"
        onClick={onOpenMyList}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-100 active:scale-[0.98]"
      >
        <FolderOpen size={18} />
        保存済みマイリスト
        {savedCount > 0 && (
          <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
            {savedCount}
          </span>
        )}
      </button>

      {/* テンプレート選択 */}
      <div>
        <p className="mb-3 flex items-center justify-center gap-1 text-sm font-semibold text-slate-500">
          <Sparkles size={15} className="text-pink-400" />
          テンプレートを選んで、はじめる
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset.id)}
              className={`group flex flex-col items-start gap-1 rounded-3xl bg-gradient-to-br ${preset.accent} p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md active:scale-95`}
            >
              <span className="text-3xl transition group-hover:scale-110" aria-hidden="true">
                {preset.emoji}
              </span>
              <span className="text-sm font-bold text-slate-700">{preset.title}</span>
              <span className="text-[11px] leading-tight text-slate-600/80">
                {preset.description}
              </span>
              <span className="mt-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                {preset.items.length}点
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
