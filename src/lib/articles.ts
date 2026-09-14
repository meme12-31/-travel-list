// ============================================================
// articles.ts — お役立ちコラム（10本）メタ情報
// ============================================================

export type ArticleCategory =
  | '準備・リスト'
  | 'パッキング'
  | '海外・安全'
  | '便利グッズ'
  | 'スケジュール'
  | '機内ルール'
  | 'ファッション'
  | '健康管理'
  | '帰宅後'

export type ArticleMeta = {
  slug: string
  title: string
  description: string
  category: ArticleCategory
  emoji: string
  accent: string
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: 'save-edition-travel-packing-list',
    title: '✈️ 【保存版】ウキウキ旅行の持ち物リスト！忘れ物ゼロで安心・快適な旅へ♪',
    description:
      '国内・海外どちらでも使える持ち物リストの作り方と、忘れがちな項目チェックポイントをやさしく解説。テンプレートでサッと準備！',
    category: '準備・リスト',
    emoji: '✈️',
    accent: 'from-sky-200 to-blue-200',
  },
  {
    slug: 'smart-light-packing-1-2-nights',
    title: '🎒 【1泊2日〜3泊】リュック1つでスマートに♪ かろやかパッキング術＆裏ワザ',
    description:
      '短い旅行でも荷物が膨らみがち…。リュック1つで快適に回る、選び方・詰め方・裏ワザをまとめました。',
    category: 'パッキング',
    emoji: '🎒',
    accent: 'from-teal-200 to-cyan-200',
  },
  {
    slug: 'overseas-theft-prevention-guide',
    title: '🔒 海外旅行もこれで安心！スリ・盗難を防ぐかわいい防犯＆貴重品ガードガイド',
    description:
      '海外でよくあるスリ・置き引き対策。貴重品の持ち方、バッグ選び、現地で困らない防犯グッズまで。',
    category: '海外・安全',
    emoji: '🔒',
    accent: 'from-indigo-200 to-violet-200',
  },
  {
    slug: 'useful-travel-goods-12',
    title: '✨ 女子旅・出張・子連れ旅もバッチリ！持って行ってよかった旅の便利グッズ12選',
    description:
      'シーン別に「これ入れてよかった！」アイテム12選。荷物を増やしすぎない選び方のコツも紹介します。',
    category: '便利グッズ',
    emoji: '✨',
    accent: 'from-pink-200 to-rose-200',
  },
  {
    slug: 'travel-prep-schedule',
    title: '📅 いつから準備スタート？ワクワクが止まらない旅行準備の神スケジュール',
    description:
      '出発日から逆算した準備カレンダー。パスポート・予約・荷造りのタイミングが一目でわかります。',
    category: 'スケジュール',
    emoji: '📅',
    accent: 'from-amber-200 to-orange-200',
  },
  {
    slug: 'carry-on-rules-guide',
    title: '✈️ 機内持ち込みって何がOK？コスメ・液体類・モバイルバッテリーのルールまとめ',
    description:
      '液体100mlルール、リチウム電池の機内持ち込み、機内で困らない荷物の分け方をわかりやすく整理。',
    category: '機内ルール',
    emoji: '✈️',
    accent: 'from-cyan-200 to-sky-200',
  },
  {
    slug: 'capsule-wardrobe-laundry',
    title: '🧺 たったこれだけで荷物が半分に！？着まわしコーデ＆旅行中のカンタン洗濯術',
    description:
      '少ない服で着回すコーディネート術と、ホテル・コインランドリーで使える洗濯の裏技を紹介。',
    category: 'ファッション',
    emoji: '🧺',
    accent: 'from-emerald-200 to-green-200',
  },
  {
    slug: 'cute-emergency-pouch-diy',
    title: '🩹 旅先での「困った！」を即解決！自分専用のかわいい応急ポーチの作り方',
    description:
      '頭痛・切り傷・胃腸トラブル…旅先の小さなトラブル用ポーチの中身リストと、作り方のヒント。',
    category: '健康管理',
    emoji: '🩹',
    accent: 'from-rose-200 to-pink-200',
  },
  {
    slug: 'post-travel-cleanup-10min',
    title: '🧹 帰ってきた後もスッキリ！たった10分で終わる旅の後片付けルール',
    description:
      '帰宅直後の荷解き・洗濯・充電・書類整理を10分ルーティン化。次の旅行準備もラクに！',
    category: '帰宅後',
    emoji: '🧹',
    accent: 'from-slate-200 to-gray-200',
  },
  {
    slug: 'fold-clothes-compression',
    title: '👗 お気に入りの服がシワにならない！きれいにまとまるお洋服の畳み方＆圧縮術',
    description:
      'シワを抑える畳み方、圧縮袋の使い方、スーツ・ワンピの扱い方まで。スーツケースがすっきり。',
    category: 'パッキング',
    emoji: '👗',
    accent: 'from-violet-200 to-purple-200',
  },
]

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}
