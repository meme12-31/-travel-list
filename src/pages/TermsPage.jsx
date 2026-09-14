import { useEffect } from 'react'
import LegalPageShell from './LegalPageShell'

export default function TermsPage() {
  useEffect(() => {
    document.title = '利用規約｜持ち物リストチェッカー'
  }, [])

  return (
    <LegalPageShell title="利用規約">
      <h1 className="text-lg font-bold text-slate-700">利用規約</h1>
      <p>本規約は、持ち物リストチェッカー（以下「本サービス」）の利用条件を定めるものです。</p>
      <h2 className="font-bold text-slate-700">1. サービスの内容</h2>
      <p>
        本サービスは、旅行等の持ち物リストを作成・チェック・保存・共有するための無料ツールおよび関連コンテンツを提供します。
      </p>
      <h2 className="font-bold text-slate-700">2. 禁止事項</h2>
      <p>
        法令に反する行為、本サービスの運営を妨害する行為、他者の権利を侵害する行為を禁止します。
      </p>
      <h2 className="font-bold text-slate-700">3. 免責</h2>
      <p>
        本サービスは現状有姿で提供されます。リスト内容の正確性や、利用により生じた損害について、運営者は責任を負いかねます。重要な持ち物はご自身でもご確認ください。
      </p>
      <h2 className="font-bold text-slate-700">4. 規約の変更</h2>
      <p>必要に応じて本規約を変更することがあります。変更後も本サービスを利用した場合、変更に同意したものとみなします。</p>
    </LegalPageShell>
  )
}
