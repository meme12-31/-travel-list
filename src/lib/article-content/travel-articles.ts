// ============================================================
// travel-articles.ts — 10本分の記事本文（HTML）を集約
// ============================================================

import { bodiesPart1 } from './bodies-part1'
import { bodiesPart2 } from './bodies-part2'

export const TRAVEL_ARTICLE_HTML: Record<string, string> = {
  ...bodiesPart1,
  ...bodiesPart2,
}

export function getArticleHtmlBySlug(slug: string): string | undefined {
  return TRAVEL_ARTICLE_HTML[slug]
}
