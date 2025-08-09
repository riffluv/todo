/**
 * useAppState Hook - アプリケーション状態管理
 * 
 * @description アプリケーション全体の状態を管理するカスタムフック
 * ブラウザの戻るボタン・スワイプバック対応
 */
"use client";

import { ViewType } from "@/types/message";
import { useEffect, useState } from "react";

export function useAppState() {
  const [showLoading, setShowLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
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

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    // ブラウザ履歴に状態を追加
    window.history.pushState({ view }, "", window.location.pathname);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    // ブラウザ履歴を戻る
    window.history.back();
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
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