// ============================================================
// presets.js — 全9種類の初期テンプレートデータ
// 各テンプレートは初期アイテム群 + カテゴリ別クイック追加候補を持つ
// ============================================================

/**
 * @typedef {Object} PresetTemplate
 * @property {string} id        テンプレート識別子
 * @property {string} title     リストタイトルの初期値
 * @property {string} emoji     カード用の可愛いアイコン
 * @property {string} accent    テーマ配色（Tailwindグラデーション用）
 * @property {string} description カードの説明文
 * @property {string[]} items   初期持ち物名の配列
 * @property {string[]} quickAdd よく使うアイテムのワンタップ候補
 */

/** @type {PresetTemplate[]} */
export const PRESETS = [
  {
    id: 'domestic',
    title: '国内旅行の持ち物',
    emoji: '🧳',
    accent: 'from-sky-200 to-blue-200',
    description: '1泊〜数泊の国内旅行にちょうどいい定番セット',
    items: [
      '着替え',
      '下着',
      'タオル',
      '充電器',
      'モバイルバッテリー',
      '身分証明書',
      '現金/カード',
      '歯ブラシ',
      '常備薬',
    ],
    quickAdd: ['ハンカチ', 'ティッシュ', '折りたたみ傘', '目薬', 'マスク', 'エコバッグ'],
  },
  {
    id: 'overseas',
    title: '海外旅行の持ち物',
    emoji: '✈️',
    accent: 'from-indigo-200 to-sky-200',
    description: 'パスポートや変換プラグなど海外必須アイテム',
    items: [
      'パスポート',
      '航空券(Eチケット)',
      '変換プラグ',
      '外貨/クレジットカード',
      '海外保険証書',
      '充電器',
      'モバイルバッテリー',
      '着替え',
      '変圧器',
      'ポケットWi-Fi/SIM',
    ],
    quickAdd: ['常備薬', '歯ブラシ', 'アイマスク', 'ネックピロー', '筆記用具', 'ビニール袋'],
  },
  {
    id: 'oshikatsu',
    title: '推し活の持ち物',
    emoji: '💖',
    accent: 'from-pink-200 to-rose-200',
    description: 'ライブ・イベント参戦の必需品まとめ',
    items: [
      'イベントチケット',
      'ペンライト',
      '予備電池',
      'アクスタ/ぬいぐるみ',
      'うちわ',
      '双眼鏡',
      'モバイルバッテリー',
      'キャリーケース/バッグ',
    ],
    quickAdd: ['充電器', 'タオル', '飲み物', '常備薬', 'ばんそうこう', 'クリアファイル'],
  },
  {
    id: 'comike',
    title: 'コミケの持ち物',
    emoji: '📚',
    accent: 'from-amber-200 to-orange-200',
    description: '長時間の同人イベントを乗り切る装備',
    items: [
      'チケット/参加証',
      '現金(小銭・千円札)',
      'カタログ/チェックリスト',
      '飲み物',
      '折りたたみイス',
      '汗拭きシート/寒さ対策',
      'トートバッグ/リュック',
    ],
    quickAdd: ['モバイルバッテリー', '軽食', 'タオル', '雨具', '常備薬', 'ゴミ袋'],
  },
  {
    id: 'camp',
    title: 'キャンプの持ち物',
    emoji: '🏕️',
    accent: 'from-emerald-200 to-green-200',
    description: 'アウトドアの基本ギアと消耗品',
    items: [
      'テント',
      '寝袋/マット',
      'ランタン/ライト',
      'バーナー/クッカー',
      '食材/水',
      'ライター/着火剤',
      '虫よけスプレー',
      'ゴミ袋',
    ],
    quickAdd: ['救急セット', '軍手', 'クーラーボックス', 'タオル', '着替え', '日焼け止め'],
  },
  {
    id: 'daytrip',
    title: '日帰り・お出かけの持ち物',
    emoji: '🚶',
    accent: 'from-teal-200 to-cyan-200',
    description: 'ちょっとしたお出かけの最小セット',
    items: [
      '財布',
      'スマートフォン',
      'モバイルバッテリー',
      'ハンカチ/ティッシュ',
      'エコバッグ',
      '雨具',
    ],
    quickAdd: ['充電器', '常備薬', 'マスク', '飲み物', 'リップクリーム', '日焼け止め'],
  },
  {
    id: 'business',
    title: 'ビジネス・出張の持ち物',
    emoji: '💼',
    accent: 'from-slate-200 to-gray-200',
    description: '出張・商談で困らないビジネスセット',
    items: [
      '名刺',
      'PC/タブレット',
      'ビジネス用充電器',
      '筆記用具',
      '書類/資料',
      '折りたたみ傘',
      'ワイシャツ/スーツ',
    ],
    quickAdd: ['モバイルバッテリー', '着替え', '歯ブラシ', '常備薬', '印鑑', 'メモ帳'],
  },
  {
    id: 'beach',
    title: '海・プール・レジャーの持ち物',
    emoji: '🏖️',
    accent: 'from-cyan-200 to-sky-200',
    description: '水辺のレジャーを満喫する装備一式',
    items: [
      '水着',
      'バスタオル',
      'ゴーグル/水中メガネ',
      '日焼け止め',
      'サンダル',
      '防水スマホケース',
      '浮き輪/ビーチボール',
      '着替え・ビニール袋',
    ],
    quickAdd: ['帽子', 'サングラス', '飲み物', 'レジャーシート', '救急セット', 'ゴミ袋'],
  },
  {
    id: 'family',
    title: '子連れ・ファミリーの持ち物',
    emoji: '👶',
    accent: 'from-rose-200 to-pink-200',
    description: '小さな子ども連れの安心セット',
    items: [
      '着替え(多め)',
      'オムツ/おしりふき',
      '粉ミルク/離乳食/マグ',
      '抱っこ紐',
      'おもちゃ/絵本',
      '絆創膏/消毒液',
      'ウェットティッシュ',
    ],
    quickAdd: ['ビニール袋', 'タオル', '帽子', '飲み物', 'おやつ', '母子手帳'],
  },
]

/** id からテンプレートを取得 */
export function getPresetById(id) {
  return PRESETS.find((p) => p.id === id) || null
}
