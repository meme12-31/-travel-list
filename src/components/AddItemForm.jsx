import { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'

const MAX_ITEM_LENGTH = 100

/**
 * アイテム追加フォーム + クイック追加（よく使うアイテムのワンタップ追加）
 *
 * @param {{
 *   onAdd: (name: string) => void,
 *   quickAdd?: string[],
 * }} props
 */
export default function AddItemForm({ onAdd, quickAdd = [] }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setError('持ち物名を入力してください')
      return
    }
    if (trimmed.length > MAX_ITEM_LENGTH) {
      setError(`${MAX_ITEM_LENGTH}文字以内で入力してください`)
      return
    }
    onAdd(trimmed)
    setValue('')
    setError('')
  }

  return (
    <div className="space-y-3">
      <form onSubmit={submit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            maxLength={MAX_ITEM_LENGTH}
            placeholder="持ち物を追加（例：充電器）"
            aria-label="追加する持ち物名"
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError('')
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-[15px] outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <button
          type="submit"
          className="flex shrink-0 items-center gap-1 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-400 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:from-sky-500 hover:to-blue-500 active:scale-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          追加
        </button>
      </form>
      {error && <p className="text-left text-xs text-rose-500">{error}</p>}

      {/* クイック追加 */}
      {quickAdd.length > 0 && (
        <div>
          <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-400">
            <Sparkles size={13} />
            クイック追加
          </p>
          <div className="flex flex-wrap gap-2">
            {quickAdd.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onAdd(name)}
                className="rounded-full border border-pink-200 bg-pink-50/60 px-3 py-1 text-xs font-medium text-pink-500 transition hover:bg-pink-100 active:scale-95"
              >
                + {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
