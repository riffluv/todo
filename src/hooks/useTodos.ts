/**
 * useTodos Hook - Todoデータの管理
 *
 * @description TodoのCRUD操作を提供するカスタムフック
 */

import {
  addTodo,
  archiveTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  purgeArchived,
  restoreTodo,
  updateTodo,
} from "@/data/todos";
import { Todo, TodoFormData } from "@/types/todo";
import { normalizeTitle, sortTodosByUpdatedDesc, validateTodoForm } from "@/utils/todos";
import { useCallback, useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Todoリストの初期読み込み
  useEffect(() => {
    const loadTodos = () => {
      try {
        const allTodos = getAllTodos();
        setTodos(sortTodosByUpdatedDesc(allTodos));
      } catch (error) {
        console.error("Failed to load todos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Todoリストを再読み込み
  const refreshTodos = useCallback(() => {
    try {
      const allTodos = getAllTodos();
      setTodos(sortTodosByUpdatedDesc(allTodos));
    } catch (error) {
      console.error("Failed to refresh todos:", error);
    }
  }, []);

  // 新しいTodoを追加
  const createTodo = useCallback((formData: TodoFormData) => {
    try {
      const check = validateTodoForm(formData);
      if (!check.ok) throw new Error(check.message);

      const normalized: TodoFormData = {
        ...formData,
        title: normalizeTitle(formData.title),
      };

      const newTodo = addTodo(normalized);
      setTodos((prev) => sortTodosByUpdatedDesc([newTodo, ...prev]));
      return newTodo;
    } catch (error) {
      console.error("Failed to create todo:", error);
      throw error;
    }
  }, []);

  // Todoを更新
  const modifyTodo = useCallback(
    (
      id: string,
      updates: Partial<
        Pick<Todo, "title" | "description" | "completed" | "priority" | "archivedAt">
      >,
    ) => {
      try {
        const updatedTodo = updateTodo(id, updates);
        if (updatedTodo) {
          setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)));
          return updatedTodo;
        }
        return null;
      } catch (error) {
        console.error("Failed to update todo:", error);
        throw error;
      }
    },
    [],
  );

  // Todoを削除
  const removeTodo = useCallback((id: string) => {
    try {
      const success = deleteTodo(id);
      if (success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
      return success;
    } catch (error) {
      console.error("Failed to delete todo:", error);
      throw error;
    }
  }, []);

  // ソフト削除（ゴミ箱へ）
  const moveToTrash = useCallback((id: string) => {
    try {
      const updated = archiveTodo(id);
      if (updated) {
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      }
      return updated;
    } catch (error) {
      console.error("Failed to archive todo:", error);
      throw error;
    }
  }, []);

  // 復元
  const restoreFromTrash = useCallback((id: string) => {
    try {
      const updated = restoreTodo(id);
      if (updated) {
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      }
      return updated;
    } catch (error) {
      console.error("Failed to restore todo:", error);
      throw error;
    }
  }, []);

  // ゴミ箱を空にする（完全削除）
  const emptyTrash = useCallback(() => {
    try {
      const removed = purgeArchived();
      if (removed > 0) {
        setTodos((prev) => prev.filter((t) => !t.archivedAt));
      }
      return removed;
    } catch (error) {
      console.error("Failed to purge archived todos:", error);
      throw error;
    }
  }, []);

  // Todoの完了状態を切り替え
  const toggleTodo = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        return modifyTodo(id, { completed: !todo.completed });
      }
      return null;
    },
    [todos, modifyTodo],
  );

  // IDでTodoを取得
  const getTodo = useCallback((id: string): Todo | undefined => {
    return getTodoById(id);
  }, []);

  // 完了したTodo数を取得
  const completedCount = todos.filter((todo) => todo.completed).length;

  // 未完了のTodo数を取得
  const pendingCount = todos.filter((todo) => !todo.completed).length;

  return {
    todos,
    loading,
    completedCount,
    pendingCount,
    refreshTodos,
    createTodo,
    modifyTodo,
    removeTodo,
    moveToTrash,
    restoreFromTrash,
    emptyTrash,
    toggleTodo,
    getTodo,
  };
}
