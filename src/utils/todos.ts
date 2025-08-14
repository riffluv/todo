/**
 * Todo Utilities - バリデーション/ソート/フィルタ等の共通処理
 */

import type { Todo, TodoFormData } from "@/types/todo";

/** フォームの最小バリデーション */
export function validateTodoForm(data: TodoFormData): { ok: true } | { ok: false; message: string } {
  const title = data.title?.trim();
  if (!title) return { ok: false, message: "タイトルを入力してください" };
  if (title.length > 200) return { ok: false, message: "タイトルは200文字以内にしてください" };
  if (data.description && data.description.length > 2000)
    return { ok: false, message: "説明は2000文字以内にしてください" };
  return { ok: true };
}

/** タイトルの正規化（前後空白の除去、連続空白の縮約） */
export function normalizeTitle(title: string): string {
  return title.replace(/\s+/g, " ").trim();
}

/** 更新日の降順で並び替え */
export function sortTodosByUpdatedDesc(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

/** 作成日の降順で並び替え */
export function sortTodosByCreatedDesc(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/** シンプルなフィルタ（completed / priority / search） */
export function filterTodos(
  todos: Todo[],
  opts: { completed?: boolean; priority?: "low" | "medium" | "high"; search?: string } = {},
): Todo[] {
  const s = opts.search?.toLowerCase().trim();
  return todos.filter((t) => {
    if (opts.completed !== undefined && t.completed !== opts.completed) return false;
    if (opts.priority && t.priority !== opts.priority) return false;
    if (s) {
      const hay = `${t.title} ${t.description ?? ""}`.toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });
}

/** completed のトグルを適用した Todo を返す（不変更新） */
export function toggled(todo: Todo): Todo {
  return { ...todo, completed: !todo.completed, updatedAt: new Date() };
}
