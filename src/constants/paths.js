// ============================================================
// paths.js — サブディレクトリ公開用パス定数
// 公開URL: https://hit-tool.com/travel-checklist （末尾スラッシュなし）
// ============================================================

/** Vite base（末尾スラッシュ付き — import.meta.env.BASE_URL と同等） */
export const VITE_BASE = import.meta.env.BASE_URL

/**
 * アプリの公開パス（末尾スラッシュなし）
 * 共有URL生成など本番パスが必要な箇所で使用
 */
export const APP_BASE_PATH = '/travel-checklist'

/** public/ 配下の静的アセットURLを生成（例: favicon.svg → /travel-checklist/favicon.svg） */
export function publicAssetUrl(filename) {
  const base = VITE_BASE.endsWith('/') ? VITE_BASE : `${VITE_BASE}/`
  return `${base}${filename.replace(/^\//, '')}`
}

/** React Router の basename（Vite base と整合） */
export function getRouterBasename() {
  const fromVite = import.meta.env.BASE_URL
  if (fromVite && fromVite !== '/') {
    return fromVite.replace(/\/$/, '')
  }

  if (typeof window === 'undefined') return ''

  const { pathname } = window.location
  if (pathname === APP_BASE_PATH || pathname.startsWith(`${APP_BASE_PATH}/`)) {
    return APP_BASE_PATH
  }
  return ''
}

/** コラムからチェックリストTOP（テンプレート選択）へ戻るときの Router state */
export const TOOL_HOME_NAV_STATE = { showToolTop: true }

/** `<Link {...toolHomeLinkProps()}>` 用（basename 配下の `/` = ツールTOP） */
export function toolHomeLinkProps() {
  return { to: '/', state: TOOL_HOME_NAV_STATE }
}
