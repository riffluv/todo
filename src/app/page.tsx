/**
 * Home Page - メインTodoアプリケーション
 *
 * @description 拡張性と保守性を重視した綺麗な設計のメインページ
 */
"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AddTodoView, HomeView, TodoView } from "@/components/views";
import { useAppState } from "@/hooks/useAppState";

export default function Home() {
  const { showLoading, currentView, handleNavigate, handleBackToHome, handleLoadingComplete } =
    useAppState();

  // SSR/CSRで常に同じUIを返す（isMountedゲートは撤去）

  // ローディング画面
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} duration={1500} />;
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
