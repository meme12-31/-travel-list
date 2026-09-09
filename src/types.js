// ============================================================
// types.js — JSDoc 型定義（データモデル）
// any は使用しない。全データはこの形状に従う。
// ============================================================

/**
 * @typedef {Object} ChecklistItem
 * @property {string} id       一意なアイテムID
 * @property {string} name     持ち物名
 * @property {boolean} checked  チェック済みか
 */

/**
 * @typedef {Object} Checklist
 * @property {string} id                 一意なリストID
 * @property {string} title              リストタイトル
 * @property {string} createdAt          作成日時（ISO文字列）
 * @property {string} updatedAt          更新日時（ISO文字列）
 * @property {ChecklistItem[]} items     持ち物アイテム配列
 */

export {}
