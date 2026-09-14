import { useEffect } from 'react'
import LegalPageShell from './LegalPageShell'

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'プライバシーポリシー｜持ち物リストチェッカー'
  }, [])

  return (
    <LegalPageShell title="プライバシーポリシー">
      <h1 className="text-lg font-bold text-slate-700">プライバシーポリシー</h1>
      <p>
        持ち物リストチェッカー（以下「本サービス」）は、利用者のプライバシーを尊重し、個人情報の保護に努めます。
      </p>
      <h2 className="font-bold text-slate-700">1. 保存する情報</h2>
      <p>
        本サービスで作成したチェックリストは、原則として利用者のブラウザ内（LocalStorage）にのみ保存されます。アカウント登録は不要です。
      </p>
      <h2 className="font-bold text-slate-700">2. 外部送信</h2>
      <p>
        リストの共有機能を利用した場合、URLにエンコードされたリスト内容が共有先に表示される場合があります。共有URLの取り扱いにはご注意ください。
      </p>
      <h2 className="font-bold text-slate-700">3. アクセス解析</h2>
      <p>
        サービス改善のため、匿名の利用統計を取得する場合があります。個人を特定する情報は含まれません。
      </p>
      <h2 className="font-bold text-slate-700">4. お問い合わせ</h2>
      <p>本ポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。</p>
    </LegalPageShell>
  )
}
