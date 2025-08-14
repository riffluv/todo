import { useTodos } from "@/hooks/useTodos";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

// jsdom環境でlocalStorageをクリアしてから実行
beforeEach(() => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
});

describe("trash flow", () => {
  it("archive -> restore -> purge", () => {
    const { result } = renderHook(() => useTodos());

    // 初期ロード待ち
    // useEffectの同期のために1tick待つ
    // ただしここではフックの返り値を直接使う

    // まず1件追加
    act(() => {
      result.current.createTodo({ title: "temp" });
    });

    const newTodo = result.current.todos.find((t) => t.title === "temp");
    expect(newTodo).toBeDefined();

    // アーカイブ
    act(() => {
      result.current.moveToTrash(newTodo!.id);
    });

    const archived = result.current.todos.find((t) => t.id === newTodo!.id);
    expect(archived?.archivedAt).toBeTruthy();

    // 復元
    act(() => {
      result.current.restoreFromTrash(newTodo!.id);
    });

    const restored = result.current.todos.find((t) => t.id === newTodo!.id);
    expect(restored?.archivedAt).toBeFalsy();

    // 再度アーカイブして空にする
    act(() => {
      result.current.moveToTrash(newTodo!.id);
    });

    const countBefore = result.current.todos.length;
    act(() => {
      const removed = result.current.emptyTrash();
      expect(removed).toBeGreaterThanOrEqual(1);
    });

    expect(result.current.todos.length).toBeLessThan(countBefore);
  });
});
