import { useEffect, useRef, useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'

const MAX_ITEM_LENGTH = 100

/**
 * 個別チェックリストアイテム
 * - チェック切り替え（位置は移動させず、その場で打ち消し線を適用）
 * - テキストのインライン編集
 * - 個別削除
 *
 * @param {{
 *   item: { id: string, name: string, checked: boolean },
 *   onToggle: (id: string) => void,
 *   onDelete: (id: string) => void,
 *   onEdit: (id: string, name: string) => void,
 * }} props
 */
export default function ChecklistItem({ item, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(item.name)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const startEdit = () => {
    setDraft(item.name)
    setError('')
    setEditing(true)
  }

  const commitEdit = () => {
    const trimmed = draft.trim()
    if (!trimmed) {
      setError('持ち物名を入力してください')
      return
    }
    if (trimmed.length > MAX_ITEM_LENGTH) {
      setError(`${MAX_ITEM_LENGTH}文字以内で入力してください`)
      return
    }
    if (trimmed !== item.name) onEdit(item.id, trimmed)
    setEditing(false)
    setError('')
  }

  const cancelEdit = () => {
    setEditing(false)
    setError('')
    setDraft(item.name)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitEdit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelEdit()
    }
  }

  return (
    <li className="animate-pop-in">
      <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2.5 shadow-sm ring-1 ring-black/5 transition hover:bg-white">
        {/* チェックボックス */}
        <button
          type="button"
          role="checkbox"
          aria-checked={item.checked}
          aria-label={`${item.name} を${item.checked ? '未完了に戻す' : '完了にする'}`}
          onClick={() => onToggle(item.id)}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition active:scale-90 ${
            item.checked
              ? 'border-emerald-400 bg-emerald-400 text-white'
              : 'border-slate-300 bg-white text-transparent hover:border-emerald-300'
          }`}
        >
          <Check size={16} strokeWidth={3} />
        </button>

        {/* 名前 / 編集フォーム */}
        {editing ? (
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={draft}
              maxLength={MAX_ITEM_LENGTH}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={commitEdit}
              className="w-full rounded-lg border border-sky-300 bg-white px-2 py-1 text-left text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            />
            {error && <p className="mt-1 text-left text-xs text-rose-500">{error}</p>}
          </div>
        ) : (
          <button
            type="button"
            onClick={startEdit}
            title="タップして編集"
            className={`flex-1 cursor-text text-left text-[15px] leading-snug transition ${
              item.checked ? 'text-[#888888] line-through' : 'text-slate-700'
            }`}
          >
            {item.name}
          </button>
        )}

        {/* 操作ボタン */}
        {editing ? (
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              aria-label="編集を確定"
              onMouseDown={(e) => e.preventDefault()}
              onClick={commitEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full text-emerald-500 transition hover:bg-emerald-50 active:scale-90"
            >
              <Check size={18} />
            </button>
            <button
              type="button"
              aria-label="編集をキャンセル"
              onMouseDown={(e) => e.preventDefault()}
              onClick={cancelEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 active:scale-90"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              aria-label={`${item.name} を編集`}
              onClick={startEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-sky-50 hover:text-sky-500 active:scale-90"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              aria-label={`${item.name} を削除`}
              onClick={() => onDelete(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 active:scale-90"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
