import { FolderOpen, Trash2, X } from 'lucide-react'

/** ISO日時を「YYYY/MM/DD HH:mm」に整形 */
function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/**
 * マイリスト（保存済み一覧）モーダル
 *
 * @param {{
 *   open: boolean,
 *   lists: import('../types').Checklist[],
 *   onClose: () => void,
 *   onLoad: (id: string) => void,
 *   onDelete: (id: string) => void,
 * }} props
 */
export default function MyListModal({ open, lists, onClose, onLoad, onDelete }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="保存済みマイリスト"
      onClick={onClose}
    >
      <div
        className="animate-pop-in flex max-h-[85svh] w-full max-w-[600px] flex-col rounded-t-3xl bg-white shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="flex items-center gap-2 font-bold text-slate-700">
            <FolderOpen size={18} className="text-emerald-500" />
            保存済みマイリスト
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* 一覧 */}
        <div className="flex-1 overflow-y-auto p-4">
          {lists.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <span className="text-4xl" aria-hidden="true">
                📭
              </span>
              <p className="font-semibold text-slate-500">保存済みのリストはありません</p>
              <p className="text-sm text-slate-400">
                リスト編集画面の「このリストを保存」から追加できます。
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {lists.map((list) => {
                const checked = list.items.filter((i) => i.checked).length
                return (
                  <li
                    key={list.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 shadow-sm"
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate font-bold text-slate-700">{list.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {list.items.length}点（{checked}点完了）・更新 {formatDate(list.updatedAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onLoad(list.id)}
                      className="shrink-0 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 px-3 py-1.5 text-xs font-semibold text-white transition hover:from-sky-500 hover:to-blue-500 active:scale-95"
                    >
                      読み込み
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(list.id)}
                      aria-label={`${list.title} を削除`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
