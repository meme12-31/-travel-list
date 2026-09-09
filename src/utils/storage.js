// ============================================================
// storage.js — LocalStorage 操作関数
// キー: saved_checklists (マイリスト一覧), current_checklist (作業中データ)
// 破損データ・書き込み不可(容量超過/プライベートモード等)に対応
// ============================================================

const SAVED_KEY = 'saved_checklists'
const CURRENT_KEY = 'current_checklist'

/** LocalStorage が利用可能かを安全に判定 */
function isStorageAvailable() {
  try {
    const testKey = '__storage_test__'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * ChecklistItem として妥当かを検証
 * @returns {boolean}
 */
function isValidItem(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.checked === 'boolean'
  )
}

/**
 * Checklist として妥当かを検証し、破損していれば null を返す
 * @returns {import('../types').Checklist | null}
 */
export function sanitizeChecklist(data) {
  if (!data || typeof data !== 'object') return null
  if (typeof data.id !== 'string' || typeof data.title !== 'string') return null
  if (!Array.isArray(data.items)) return null

  const items = data.items.filter(isValidItem)
  return {
    id: data.id,
    title: data.title,
    createdAt: typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString(),
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
    items,
  }
}

// ---------- 作業中データ (current_checklist) ----------

/**
 * 作業中リストを自動バックアップ保存
 * @param {object} checklist
 * @returns {{ ok: boolean, error?: string }}
 */
export function saveCurrent(checklist) {
  if (!isStorageAvailable()) {
    return { ok: false, error: 'このブラウザではデータを保存できません。' }
  }
  try {
    window.localStorage.setItem(CURRENT_KEY, JSON.stringify(checklist))
    return { ok: true }
  } catch {
    return { ok: false, error: '保存に失敗しました。ブラウザの空き容量をご確認ください。' }
  }
}

/**
 * 作業中リストを読み込み（破損時は null）
 * @returns {object | null}
 */
export function loadCurrent() {
  if (!isStorageAvailable()) return null
  try {
    const raw = window.localStorage.getItem(CURRENT_KEY)
    if (!raw) return null
    return sanitizeChecklist(JSON.parse(raw))
  } catch {
    // 破損データはクリアして安全に復帰
    try {
      window.localStorage.removeItem(CURRENT_KEY)
    } catch {
      /* noop */
    }
    return null
  }
}

/** 作業中リストを削除 */
export function clearCurrent() {
  if (!isStorageAvailable()) return
  try {
    window.localStorage.removeItem(CURRENT_KEY)
  } catch {
    /* noop */
  }
}

// ---------- マイリスト一覧 (saved_checklists) ----------

/**
 * 保存済みマイリスト一覧を取得（破損要素は除外）
 * @returns {object[]}
 */
export function loadSavedLists() {
  if (!isStorageAvailable()) return []
  try {
    const raw = window.localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(sanitizeChecklist).filter((c) => c !== null)
  } catch {
    try {
      window.localStorage.removeItem(SAVED_KEY)
    } catch {
      /* noop */
    }
    return []
  }
}

/** 一覧全体を書き込む内部ヘルパー */
function writeSavedLists(lists) {
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(lists))
    return { ok: true, lists }
  } catch {
    return { ok: false, error: '保存に失敗しました。ブラウザの空き容量をご確認ください。' }
  }
}

/**
 * マイリストへ保存（同一 id は上書き = update、無ければ新規追加）
 * @param {object} checklist
 * @returns {{ ok: boolean, error?: string, lists?: object[] }}
 */
export function saveToMyLists(checklist) {
  if (!isStorageAvailable()) {
    return { ok: false, error: 'このブラウザではデータを保存できません。' }
  }
  const lists = loadSavedLists()
  const idx = lists.findIndex((c) => c.id === checklist.id)
  if (idx >= 0) {
    lists[idx] = checklist
  } else {
    lists.unshift(checklist)
  }
  return writeSavedLists(lists)
}

/**
 * マイリストから削除
 * @param {string} id
 * @returns {{ ok: boolean, error?: string, lists?: object[] }}
 */
export function deleteFromMyLists(id) {
  if (!isStorageAvailable()) {
    return { ok: false, error: 'このブラウザではデータを操作できません。' }
  }
  const lists = loadSavedLists().filter((c) => c.id !== id)
  return writeSavedLists(lists)
}
