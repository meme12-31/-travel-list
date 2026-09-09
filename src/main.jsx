import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 画面遷移は App.jsx 内の state 管理（React Router 未使用）。
// React Router 導入時は basename="/travel-checklist" を設定すること。
// → src/constants/paths.js の APP_BASE_PATH を参照

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
