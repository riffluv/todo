/**
 * Message Types - メッセージ関連の型定義
 */

export type ViewType = "home" | "saito" | "sakuda";

export interface MessageContent {
  /** メッセージのタイトル */
  title: string;
  /** メッセージの本文（段落の配列） */
  paragraphs: string[];
  /** 締めの言葉 */
  closing: string;
  /** 署名 */
  signature: string;
}

export interface PersonConfig {
  /** 人物のID */
  id: ViewType;
  /** 表示名 */
  name: string;
  /** ボタンラベル */
  buttonLabel: string;
  /** メッセージ内容 */
  message: MessageContent;
  /** テーマキー */
  themeKey: keyof typeof import("@/styles/themes").themes;
}