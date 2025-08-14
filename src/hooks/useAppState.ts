/**
 * useAppState Hook - Todoアプリケーション状態管理
 *
 * @description Todoアプリケーション全体の状態を管理するカスタムフック
 * ブラウザの戻るボタン・スワイプバック対応
 */
"use client";

import { TodoViewType } from "@/types/todo";
import { useEffect, useState } from "react";

export function useAppState() {
  const [showLoading, setShowLoading] = useState(false);
  const [currentView, setCurrentView] = useState<TodoViewType>("home");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // E2E/自動テスト環境ではローディングをスキップ
    try {
      if (
        typeof navigator !== "undefined" &&
        (navigator as unknown as { webdriver?: boolean }).webdriver
      ) {
        setShowLoading(false);
      }
    } catch {
      // noop
    }

    // 初期状態をブラウザ履歴に追加
    if (typeof window !== "undefined") {
      window.history.replaceState({ view: "home" }, "", window.location.pathname);
    }
  }, []);

  // ブラウザの戻るボタン・スワイプバック対応
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state?.view) {
        setCurrentView(state.view);
        // ローディング画面をスキップ
        if (showLoading) {
          setShowLoading(false);
        }
      } else {
        // 状態がない場合はホームに戻る
        setCurrentView("home");
        setShowLoading(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showLoading]);

  const handleNavigate = (view: TodoViewType) => {
    setCurrentView(view);
    // ブラウザ履歴に状態を追加
    window.history.pushState({ view }, "", window.location.pathname);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    // アプリ内ナビゲーション（履歴操作なし）- スクロール位置リセット
    window.scrollTo({ top: 0, behavior: "smooth" });
    // 履歴の状態を更新（戻る操作ではなく状態変更）
    window.history.replaceState({ view: "home" }, "", window.location.pathname);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // ローディング完了後、ホーム状態を履歴に設定
    if (typeof window !== "undefined") {
      window.history.replaceState({ view: "home" }, "", window.location.pathname);
    }
  };

  return {
    // State
    showLoading,
    currentView,
    isMounted,

    // Actions
    handleNavigate,
    handleBackToHome,
    handleLoadingComplete,
  };
}
