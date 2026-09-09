import { useCallback, useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import Header from './components/Header'
import TemplateSelector from './components/TemplateSelector'
import Checklist from './components/Checklist'
import MyListModal from './components/MyListModal'
import ShareModal from './components/ShareModal'
import { getPresetById } from './data/presets'
import {
  deleteFromMyLists,
  loadCurrent,
  loadSavedLists,
  saveCurrent,
  saveToMyLists,
} from './utils/storage'
import { buildShareUrl, clearUrlHash, getSharedFromUrl } from './utils/urlShare'

const MAX_TITLE_LENGTH = 50

/** 一意なIDを生成（crypto 未対応環境にもフォールバック） */
function genId() {
  try {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID()
    }
  } catch {
    /* noop */
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/** @returns {import('./types').ChecklistItem} */
function createItem(name, checked = false) {
  return { id: genId(), name, checked }
}

/** プリセットから新しい Checklist を生成 */
function checklistFromPreset(preset) {
  const now = new Date().toISOString()
  return {
    id: genId(),
    title: preset.title,
    createdAt: now,
    updatedAt: now,
    items: preset.items.map((name) => createItem(name)),
  }
}

/** 共有データ（title/items）から新しい Checklist を生成 */
function checklistFromShared(shared) {
  const now = new Date().toISOString()
  return {
    id: genId(),
    title: (shared.title || '共有リスト').slice(0, MAX_TITLE_LENGTH),
    createdAt: now,
    updatedAt: now,
    items: shared.items.map((it) => createItem(it.name, it.checked)),
  }
}

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'editor'
  /** @type {[import('./types').Checklist | null, Function]} */
  const [checklist, setChecklist] = useState(null)
  const [savedLists, setSavedLists] = useState([])
  const [showMyList, setShowMyList] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [toast, setToast] = useState(null) // { id, message, type }

  const toastTimer = useRef(null)
  const bootstrapped = useRef(false)

  // ---------- トースト ----------
  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: genId(), message, type })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  // ---------- 初回ロード：URL共有データ → 作業中データ の順で復元 ----------
  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    setSavedLists(loadSavedLists())

    // 1) 共有URL（#data=...）を最優先で確認
    const hasHashData = /#data=/.test(window.location.hash || '')
    if (hasHashData) {
      const shared = getSharedFromUrl()
      clearUrlHash()
      if (shared) {
        const restored = checklistFromShared(shared)
        setChecklist(restored)
        setView('editor')
        showToast('共有リストを読み込みました', 'success')
        return
      }
      // デコード失敗
      showToast('リストを読み込めませんでした', 'error')
    }

    // 2) 作業中データ（current_checklist）を自動復元
    const current = loadCurrent()
    if (current) {
      setChecklist(current)
      setView('editor')
    }
  }, [showToast])

  // ---------- 変更時の自動バックアップ保存 ----------
  useEffect(() => {
    if (!checklist) return
    const res = saveCurrent(checklist)
    if (!res.ok && res.error) {
      showToast(res.error, 'error')
    }
  }, [checklist, showToast])

  // ---------- リスト変更ヘルパー（updatedAt を更新） ----------
  const mutate = useCallback((updater) => {
    setChecklist((prev) => {
      if (!prev) return prev
      const next = updater(prev)
      return { ...next, updatedAt: new Date().toISOString() }
    })
  }, [])

  // ---------- ナビゲーション ----------
  const goHome = () => {
    setView('home')
    setSavedLists(loadSavedLists())
  }

  const handleSelectTemplate = (presetId) => {
    const preset = getPresetById(presetId)
    if (!preset) return
    setChecklist(checklistFromPreset(preset))
    setView('editor')
  }

  // ---------- アイテム操作 ----------
  const handleToggle = (id) =>
    mutate((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)),
    }))

  const handleDelete = (id) =>
    mutate((prev) => ({ ...prev, items: prev.items.filter((it) => it.id !== id) }))

  const handleEditItem = (id, name) =>
    mutate((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === id ? { ...it, name } : it)),
    }))

  const handleAddItem = (name) =>
    mutate((prev) => ({ ...prev, items: [...prev.items, createItem(name)] }))

  const handleClearAll = () =>
    mutate((prev) => ({ ...prev, items: prev.items.map((it) => ({ ...it, checked: false })) }))

  const handleUpdateTitle = (title) => mutate((prev) => ({ ...prev, title }))

  // ---------- 保存・共有 ----------
  const handleSaveToMyList = () => {
    if (!checklist) return
    if (!checklist.title.trim()) {
      showToast('タイトルを入力してから保存してください', 'error')
      return
    }
    const toSave = { ...checklist, updatedAt: new Date().toISOString() }
    const res = saveToMyLists(toSave)
    if (res.ok) {
      setChecklist(toSave)
      setSavedLists(res.lists)
      showToast('マイリストに保存しました', 'success')
    } else {
      showToast(res.error || '保存に失敗しました', 'error')
    }
  }

  const handleOpenShare = () => {
    if (!checklist) return
    try {
      setShareUrl(buildShareUrl(checklist))
      setShowShare(true)
    } catch {
      showToast('共有URLの生成に失敗しました', 'error')
    }
  }

  // ---------- マイリスト操作 ----------
  const handleLoadFromMyList = (id) => {
    const found = savedLists.find((c) => c.id === id)
    if (!found) return
    // 再利用のため、読み込み時は全項目を未チェックに初期化（保存済みデータ自体は変更しない）
    setChecklist({
      ...found,
      items: found.items.map((it) => ({ ...it, checked: false })),
    })
    setView('editor')
    setShowMyList(false)
    showToast(`「${found.title}」を読み込みました`, 'success')
  }

  const handleDeleteFromMyList = (id) => {
    const res = deleteFromMyLists(id)
    if (res.ok) {
      setSavedLists(res.lists)
      showToast('リストを削除しました', 'success')
    } else {
      showToast(res.error || '削除に失敗しました', 'error')
    }
  }

  // 作業中データが空になったらホームへ戻る導線（任意）— ここでは維持
  const currentQuickAdd = (() => {
    if (view !== 'editor' || !checklist) return []
    // タイトルからプリセットを推定できないため、全カテゴリ共通の定番候補を提示
    return ['充電器', 'モバイルバッテリー', 'ハンカチ/ティッシュ', '常備薬', '現金/カード', 'エコバッグ']
  })()

  return (
    <div className="min-h-svh">
      <Header
        view={view}
        savedCount={savedLists.length}
        onHome={goHome}
        onOpenMyList={() => setShowMyList(true)}
      />

      <main className="mx-auto max-w-[600px] px-4 py-5 pb-24">
        {view === 'home' || !checklist ? (
          <TemplateSelector
            onSelect={handleSelectTemplate}
            onOpenMyList={() => setShowMyList(true)}
            savedCount={savedLists.length}
          />
        ) : (
          <Checklist
            checklist={checklist}
            quickAdd={currentQuickAdd}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEditItem={handleEditItem}
            onAddItem={handleAddItem}
            onClearAll={handleClearAll}
            onUpdateTitle={handleUpdateTitle}
            onSave={handleSaveToMyList}
            onShare={handleOpenShare}
          />
        )}
      </main>

      <footer className="pb-6 text-center text-xs text-slate-400">
        登録不要・完全無料 / データはこの端末内にのみ保存されます
      </footer>

      {/* モーダル */}
      <MyListModal
        open={showMyList}
        lists={savedLists}
        onClose={() => setShowMyList(false)}
        onLoad={handleLoadFromMyList}
        onDelete={handleDeleteFromMyList}
      />
      <ShareModal
        open={showShare}
        url={shareUrl}
        onClose={() => setShowShare(false)}
        onCopied={() => showToast('共有URLをコピーしました', 'success')}
        onCopyError={() => showToast('コピーに失敗しました。URLを手動で選択してください', 'error')}
      />

      {/* トースト */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div
            role="status"
            className={`animate-toast-in flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${
              toast.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}
