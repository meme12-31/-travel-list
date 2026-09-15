// ============================================================
// paths.js — サブディレクトリ公開用パス定数
// 公開URL: https://hit-tool.com/travel-checklist （末尾スラッシュなし）
// ============================================================

/** Vite base（末尾スラッシュ付き — import.meta.env.BASE_URL と同等） */
export const VITE_BASE = import.meta.env.BASE_URL || '/travel-checklist/'

/**
 * アプリの公開パス（末尾スラッシュなし）
 * React Router の basename / 共有URL で使用
 */
export const APP_BASE_PATH = '/travel-checklist'

/** public/ 配下の静的アセットURLを生成（例: favicon.svg → /travel-checklist/favicon.svg） */
export function publicAssetUrl(filename) {
  const raw = VITE_BASE || `${APP_BASE_PATH}/`
  const base = raw.endsWith('/') ? raw : `${raw}/`
  return `${base}${filename.replace(/^\//, '')}`
}

/** React Router の basename。常に /travel-checklist を返す */
export function getRouterBasename() {
  return APP_BASE_PATH
}

/** コラムからチェックリストTOP（テンプレート選択）へ戻るときの Router state */
export const TOOL_HOME_NAV_STATE = { showToolTop: true }

/** `<Link {...toolHomeLinkProps()}>` 用（basename 配下の `/` = ツールTOP） */
export function toolHomeLinkProps() {
  return { to: '/', state: TOOL_HOME_NAV_STATE }
}
