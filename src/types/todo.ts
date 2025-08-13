/**
 * Todo Types - Todoアプリケーション用の型定義
 *
 * @description Todoアプリケーションで使用する型定義
 */

export interface Todo {
  /** 一意のID */
  id: string;
  /** タスクのタイトル */
  title: string;
  /** タスクの詳細説明（オプション） */
  description?: string | undefined;
  /** 完了状態 */
  completed: boolean;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
  /** 優先度（オプション） */
  priority?: "low" | "medium" | "high" | undefined;
}

export interface TodoFormData {
  /** タスクのタイトル */
  title: string;
  /** タスクの詳細説明（オプション） */
  description?: string | undefined;
  /** 優先度（オプション） */
  priority?: "low" | "medium" | "high" | undefined;
}

export type TodoViewType = "home" | "add" | string; // Todo IDまたは特定のビュー

export interface TodoListFilter {
  /** 完了状態でフィルタ */
  completed?: boolean;
  /** 優先度でフィルタ */
  priority?: "low" | "medium" | "high";
  /** 検索クエリ */
  search?: string;
}
