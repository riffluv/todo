/**
 * Home Page - メインTodoアプリケーション
 *
 * @description 拡張性と保守性を重視した綺麗な設計のメインページ
 */
"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AddTodoView, HomeView, TodoView } from "@/components/views";
import { useAppState } from "@/hooks/useAppState";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const {
    showLoading,
    currentView,
    isMounted,
    handleNavigate,
    handleBackToHome,
    handleLoadingComplete,
  } = useAppState();

  // ハイドレーション対応：マウント前は空の画面
  if (!isMounted) {
    return <Box minHeight="100vh" bg="#fafafa" />;
  }

  // ローディング画面
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // ビューの条件分岐
  if (currentView === "home") {
    return <HomeView onNavigate={handleNavigate} />;
  }

  // Todo追加ビュー
  if (currentView === "add") {
    return <AddTodoView onBack={handleBackToHome} />;
  }

  // 個別Todoビューもしくはエラーケースでホームに戻る
  return <TodoView todoId={currentView} onBack={handleBackToHome} />;
}
