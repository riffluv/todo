/**
 * useAppState Hook - アプリケーション状態管理
 * 
 * @description アプリケーション全体の状態を管理するカスタムフック
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
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
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