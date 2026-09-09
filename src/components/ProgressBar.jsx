import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { PartyPopper } from 'lucide-react'

/**
 * 進捗バー
 * - 進捗率 = Math.round((checked / total) * 100)
 * - 残り個数 = total - checked
 * - 「〇〇％、あと〇個で準備完了！」/ 100%時「準備は万端！行ってらっしゃい！🎉」
 * - 100%到達時に紙吹雪を1回だけ発火（連発防止の発火制御あり）
 *
 * @param {{ total: number, checked: number }} props
 */
export default function ProgressBar({ total, checked }) {
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0
  const remaining = Math.max(total - checked, 0)
  const isComplete = total > 0 && checked === total

  // 100%達成の紙吹雪を連発させないための発火制御
  const firedRef = useRef(false)

  useEffect(() => {
    if (isComplete && !firedRef.current) {
      firedRef.current = true
      fireConfetti()
    }
    // 100%未満に戻ったら次回のために発火フラグをリセット
    if (!isComplete) {
      firedRef.current = false
    }
  }, [isComplete])

  const barColor = isComplete
    ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
    : 'bg-gradient-to-r from-sky-400 to-blue-400'

  return (
    <div className="rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5">
      {/* 数値・ラベル */}
      <div className="mb-2 flex items-end justify-between">
        <span
          className={`text-2xl font-bold tabular-nums ${
            isComplete ? 'text-emerald-500' : 'text-sky-500'
          }`}
        >
          {percent}
          <span className="text-base">%</span>
        </span>
        <span className="text-xs text-slate-400 tabular-nums">
          {checked} / {total}
        </span>
      </div>

      {/* バー本体 */}
      <div
        className="h-4 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="準備の進捗"
      >
        <div
          className={`progress-fill h-full rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* テキスト表示 */}
      {isComplete ? (
        <div className="animate-stamp mt-3 flex flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-emerald-600">
            <PartyPopper size={18} />
            <span className="text-sm font-bold">100％、準備は万端！行ってらっしゃい！🎉</span>
          </div>
          <span className="text-3xl" aria-hidden="true">
            🧳✨🎉
          </span>
        </div>
      ) : (
        <p className="mt-2 text-center text-sm font-semibold text-slate-600">
          {total === 0 ? (
            '持ち物を追加してみましょう'
          ) : (
            <>
              <span className="text-sky-500">{percent}％</span>
              、あと
              <span className="mx-0.5 text-pink-500">{remaining}</span>
              個で準備完了！
            </>
          )}
        </p>
      )}
    </div>
  )
}

/** 画面全体へ紙吹雪を発火 */
function fireConfetti() {
  const duration = 1200
  const end = Date.now() + duration
  const colors = ['#7cc4f0', '#7fd6b3', '#ff9ec4', '#ffb877', '#c4b5fd']

  // 中央から一発ドンと
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors,
  })

  // 両サイドから流し込み
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
