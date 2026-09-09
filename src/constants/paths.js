// ============================================================
// paths.js — サブディレクトリ公開用パス定数
// 公開URL: https://hit-tool.com/travel-checklist （末尾スラッシュなし）
// ============================================================

/** Vite base（末尾スラッシュ付き — import.meta.env.BASE_URL と同等） */
export const VITE_BASE = import.meta.env.BASE_URL

/**
 * アプリの公開パス（末尾スラッシュなし）
 * React Router を使う場合は <BrowserRouter basename={APP_BASE_PATH}> に設定
 */
export const APP_BASE_PATH = '/travel-checklist'

/** public/ 配下の静的アセットURLを生成（例: favicon.svg → /travel-checklist/favicon.svg） */
export function publicAssetUrl(filename) {
  const base = VITE_BASE.endsWith('/') ? VITE_BASE : `${VITE_BASE}/`
  return `${base}${filename.replace(/^\//, '')}`
}
