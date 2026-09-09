import { useEffect, useRef, useState } from 'react'
import { RotateCcw, Save, Share2, ClipboardList } from 'lucide-react'
import ProgressBar from './ProgressBar'
import ChecklistItem from './ChecklistItem'
import AddItemForm from './AddItemForm'

const MAX_TITLE_LENGTH = 50

/**
 * メインチェックリストUI（リスト編集・チェック画面）
 *
 * @param {{
 *   checklist: import('../types').Checklist,
 *   quickAdd: string[],
 *   onToggle: (id: string) => void,
 *   onDelete: (id: string) => void,
 *   onEditItem: (id: string, name: string) => void,
 *   onAddItem: (name: string) => void,
 *   onClearAll: () => void,
 *   onUpdateTitle: (title: string) => void,
 *   onSave: () => void,
 *   onShare: () => void,
 * }} props
 */
export default function Checklist({
  checklist,
  quickAdd,
  onToggle,
  onDelete,
  onEditItem,
  onAddItem,
  onClearAll,
  onUpdateTitle,
  onSave,
  onShare,
}) {
  const { title, items } = checklist
  const total = items.length
  const checkedCount = items.filter((i) => i.checked).length

  const [titleDraft, setTitleDraft] = useState(title)
  const [titleError, setTitleError] = useState('')
  const lastTitleRef = useRef(title)

  // 外部からタイトルが変わった場合（リスト読み込み等）に同期
  useEffect(() => {
    setTitleDraft(title)
    lastTitleRef.current = title
  }, [title])

  const commitTitle = () => {
    const trimmed = titleDraft.trim()
    if (!trimmed) {
      setTitleError('タイトルを入力してください')
      setTitleDraft(lastTitleRef.current)
      return
    }
    if (trimmed.length > MAX_TITLE_LENGTH) {
      setTitleError(`${MAX_TITLE_LENGTH}文字以内で入力してください`)
      return
    }
    setTitleError('')
    lastTitleRef.current = trimmed
    if (trimmed !== title) onUpdateTitle(trimmed)
  }

  return (
    <div className="space-y-5">
      {/* タイトル編集 */}
      <div>
        <label className="mb-1 block text-left text-xs font-semibold text-slate-400">
          リストのタイトル
        </label>
        <input
          type="text"
          value={titleDraft}
          maxLength={MAX_TITLE_LENGTH}
          aria-label="リストのタイトル"
          onChange={(e) => {
            setTitleDraft(e.target.value)
            if (titleError) setTitleError('')
          }}
          onBlur={commitTitle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.currentTarget.blur()
            }
          }}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-lg font-bold text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
        />
        {titleError && <p className="mt-1 text-left text-xs text-rose-500">{titleError}</p>}
      </div>

      {/* 進捗バー */}
      <ProgressBar total={total} checked={checkedCount} />

      {/* アイテム一覧 or 空状態 */}
      {total > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEditItem}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 px-4 py-10 text-center">
          <span className="text-5xl" aria-hidden="true">
            🧺
          </span>
          <p className="font-semibold text-slate-500">持ち物がありません</p>
          <p className="text-sm text-slate-400">
            下のフォームやクイック追加から持ち物を追加してみましょう。
          </p>
        </div>
      )}

      {/* 追加フォーム + クイック追加 */}
      <AddItemForm onAdd={onAddItem} quickAdd={quickAdd} />

      {/* アクションボタン群 */}
      <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3">
        <button
          type="button"
          onClick={onSave}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500 active:scale-95"
        >
          <Save size={18} />
          このリストを保存
        </button>
        <button
          type="button"
          onClick={onShare}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-orange-300 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-pink-500 hover:to-orange-400 active:scale-95"
        >
          <Share2 size={18} />
          共有URLを発行
        </button>
        <button
          type="button"
          onClick={onClearAll}
          disabled={total === 0 || checkedCount === 0}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-500 shadow-sm transition hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={18} />
          一括解除
        </button>
      </div>

      {/* 補足 */}
      <p className="flex items-center justify-center gap-1 pt-1 text-center text-xs text-slate-400">
        <ClipboardList size={13} />
        変更は自動でこの端末に一時保存されます
      </p>
    </div>
  )
}
