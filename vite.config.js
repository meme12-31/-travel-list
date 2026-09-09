import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // アセット（JS/CSS）の相対パス解決用 — 末尾スラッシュ付き
  base: '/travel-checklist/',
  plugins: [react(), tailwindcss()],
})
