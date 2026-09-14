import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/** hit-tool.com サブディレクトリ公開（末尾スラッシュ必須） */
const PRODUCTION_BASE = '/travel-checklist/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // 相対 base (./) だと /travel-checklist/articles 等で JS/CSS が誤ったパスになり白画面になる
  base: mode === 'production' ? PRODUCTION_BASE : '/',
  plugins: [react(), tailwindcss()],
}))
