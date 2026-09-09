import { useEffect, useState } from 'react'
import { Check, Copy, Share2, X } from 'lucide-react'

/**
 * 共有URLコピーモーダル
 *
 * @param {{
 *   open: boolean,
 *   url: string,
 *   onClose: () => void,
 *   onCopied: () => void,
 *   onCopyError: () => void,
 * }} props
 */
export default function ShareModal({ open, url, onClose, onCopied, onCopyError }) {
  const [copied, setCopied] = useState(false)

  // モーダルを開くたびにコピー状態をリセット
  useEffect(() => {
    if (open) setCopied(false)
  }, [open])

  if (!open) return null

  const copy = async () => {
    const done = () => {
      setCopied(true)
      onCopied()
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url)
        done()
        return
      }
      // フォールバック（非セキュアコンテキスト等）
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      if (ok) done()
      else onCopyError()
    } catch {
      onCopyError()
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="共有用URL"
      onClick={onClose}
    >
      <div
        className="animate-pop-in w-full max-w-[600px] rounded-t-3xl bg-white shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="flex items-center gap-2 font-bold text-slate-700">
            <Share2 size={18} className="text-pink-500" />
            共有用URL
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

        <div className="space-y-3 p-5">
          <p className="text-sm text-slate-500">
            このURLを送ると、相手の端末で同じ持ち物リストを開けます。
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="max-h-24 overflow-y-auto text-left text-xs break-all text-slate-500">
              {url}
            </p>
          </div>
          <button
            type="button"
            onClick={copy}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white shadow-sm transition active:scale-95 ${
              copied
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400'
            }`}
          >
            {copied ? (
              <>
                <Check size={18} />
                コピーしました！
              </>
            ) : (
              <>
                <Copy size={18} />
                URLをコピー
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
