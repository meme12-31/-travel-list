// ============================================================
// urlShare.js — 共有用URLのエンコード / デコード処理
// リスト構造体を軽量化 → JSON化 → Base64(URL-safe) → URL Hash `#data=...`
// ============================================================

/** UTF-8 対応の Base64 エンコード */
function toBase64(str) {
  // encodeURIComponent で UTF-8 バイト列化してから btoa
  const bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16)),
  )
  return btoa(bytes)
}

/** UTF-8 対応の Base64 デコード */
function fromBase64(b64) {
  const binary = atob(b64)
  const percentEncoded = Array.prototype.map
    .call(binary, (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('')
  return decodeURIComponent(percentEncoded)
}

/** URL-safe 変換（+ / = を除去/置換） */
function toUrlSafe(b64) {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** URL-safe から通常の Base64 へ戻す */
function fromUrlSafe(safe) {
  let b64 = safe.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4 !== 0) b64 += '='
  return b64
}

/**
 * Checklist を軽量ペイロードにエンコード
 * キーを短縮: t=title, i=items, n=name, c=checked(0/1)
 * @param {object} checklist
 * @returns {string} URL-safe Base64 文字列
 */
export function encodeChecklist(checklist) {
  const payload = {
    t: checklist.title,
    i: (checklist.items || []).map((item) => ({
      n: item.name,
      c: item.checked ? 1 : 0,
    })),
  }
  return toUrlSafe(toBase64(JSON.stringify(payload)))
}

/**
 * URL-safe Base64 を Checklist へデコード（不正時は null）
 * @param {string} encoded
 * @returns {{ title: string, items: {name: string, checked: boolean}[] } | null}
 */
export function decodeChecklist(encoded) {
  try {
    const json = fromBase64(fromUrlSafe(encoded))
    const payload = JSON.parse(json)
    if (!payload || typeof payload !== 'object') return null
    if (typeof payload.t !== 'string' || !Array.isArray(payload.i)) return null

    const items = payload.i
      .filter((it) => it && typeof it.n === 'string')
      .map((it) => ({ name: it.n, checked: it.c === 1 }))

    return { title: payload.t, items }
  } catch {
    return null
  }
}

/**
 * 現在のURLをベースに共有URLを生成
 * @param {object} checklist
 * @returns {string}
 */
export function buildShareUrl(checklist) {
  const encoded = encodeChecklist(checklist)
  const base = `${window.location.origin}${window.location.pathname}`
  return `${base}#data=${encoded}`
}

/**
 * 現在のURL Hash から共有データを取り出す（無ければ null）
 * @returns {{ title: string, items: {name: string, checked: boolean}[] } | null}
 */
export function getSharedFromUrl() {
  const hash = window.location.hash || ''
  const match = hash.match(/#data=(.+)$/)
  if (!match) return null
  return decodeChecklist(match[1])
}

/** URL の Hash をクリア（履歴を汚さないよう replaceState を使用） */
export function clearUrlHash() {
  try {
    const url = window.location.pathname + window.location.search
    window.history.replaceState(null, '', url)
  } catch {
    window.location.hash = ''
  }
}
