/**
 * Todos Data - Todoデータの管理
 *
 * @description ローカルストレージを使用したTodoデータの管理
 */

import { Todo, TodoFormData } from "@/types/todo";

const TODOS_STORAGE_KEY = "manaby-todos";

/**
 * ランダムなIDを生成
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * ローカルストレージからTodoデータを取得
 */
export function getTodosFromStorage(): Todo[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(TODOS_STORAGE_KEY);
    if (!stored) return getDefaultTodos();

    const todos = JSON.parse(stored);
    // Date オブジェクトに変換
    return todos.map(
      (todo: {
        id: string;
        title: string;
        description?: string;
        completed: boolean;
        archivedAt?: string | null;
        createdAt: string;
        updatedAt: string;
        priority?: "low" | "medium" | "high";
      }) => ({
        ...todo,
        archivedAt: todo.archivedAt ? new Date(todo.archivedAt) : null,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }),
    );
  } catch (error) {
    console.error("Failed to load todos from storage:", error);
    return getDefaultTodos();
  }
}

/**
 * ローカルストレージにTodoデータを保存
 */
export function saveTodosToStorage(todos: Todo[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to storage:", error);
  }
}

/**
 * デフォルトのTodoデータを取得
 */
function getDefaultTodos(): Todo[] {
  // デフォルトのサンプルタスクは廃止。初期は空のリストを返す。
  return [];
}

/**
 * IDでTodoを取得
 */
export function getTodoById(id: string): Todo | undefined {
  const todos = getTodosFromStorage();
  return todos.find((todo) => todo.id === id);
}

/**
 * 新しいTodoを作成
 */
export function createTodo(formData: TodoFormData): Todo {
  const now = new Date();
  const todo: Todo = {
    id: generateId(),
    title: formData.title,
    completed: false,
    archivedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  if (formData.description) {
    todo.description = formData.description;
  }

  if (formData.priority) {
    todo.priority = formData.priority;
  } else {
    todo.priority = "medium";
  }

  return todo;
}

/**
 * Todoを更新
 */
export function updateTodo(
  id: string,
  updates: Partial<Pick<Todo, "title" | "description" | "completed" | "priority" | "archivedAt">>,
): Todo | null {
  const todos = getTodosFromStorage();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) return null;

  const existingTodo = todos[index];
  if (!existingTodo) return null;

  const updatedTodo: Todo = {
    id: existingTodo.id,
    title: updates.title ?? existingTodo.title,
    completed: updates.completed ?? existingTodo.completed,
    // archivedAt は null を明示的に設定できるように、プロパティの存在チェックを使う
    archivedAt:
      "archivedAt" in updates ? (updates.archivedAt ?? null) : (existingTodo.archivedAt ?? null),
    createdAt: existingTodo.createdAt,
    updatedAt: new Date(),
  };

  if (updates.description !== undefined) {
    updatedTodo.description = updates.description;
  } else if (existingTodo.description) {
    updatedTodo.description = existingTodo.description;
  }

  if (updates.priority !== undefined) {
    updatedTodo.priority = updates.priority;
  } else if (existingTodo.priority) {
    updatedTodo.priority = existingTodo.priority;
  }

  todos[index] = updatedTodo;
  saveTodosToStorage(todos);

  return updatedTodo;
}

/**
 * Todoを削除
 */
export function deleteTodo(id: string): boolean {
  const todos = getTodosFromStorage();
  const filteredTodos = todos.filter((todo) => todo.id !== id);

  if (filteredTodos.length === todos.length) return false;

  saveTodosToStorage(filteredTodos);
  return true;
}

/**
 * Todoをゴミ箱へ移動（ソフト削除）
 */
export function archiveTodo(id: string): Todo | null {
  return updateTodo(id, { archivedAt: new Date() });
}

/**
 * ゴミ箱から復元
 */
export function restoreTodo(id: string): Todo | null {
  return updateTodo(id, { archivedAt: null });
}

/**
 * ゴミ箱内の全てを完全削除
 */
export function purgeArchived(): number {
  const todos = getTodosFromStorage();
  const keep = todos.filter((t) => !t.archivedAt);
  const removed = todos.length - keep.length;
  saveTodosToStorage(keep);
  return removed;
}

/**
 * Todoを追加
 */
export function addTodo(formData: TodoFormData): Todo {
  const todos = getTodosFromStorage();
  const newTodo = createTodo(formData);

  todos.unshift(newTodo); // 新しいタスクを先頭に追加
  saveTodosToStorage(todos);

  return newTodo;
}

/**
 * 全てのTodoを取得
 */
export function getAllTodos(): Todo[] {
  return getTodosFromStorage();
}
