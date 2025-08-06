/**
 * Home Page - メインアプリケーション
 * 
 * @description 拡張性と保守性を重視した綺麗な設計のメインページ
 */
"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { HomeView } from "@/components/views/HomeView";
import { MessageView } from "@/components/views/MessageView";
import { getAllMessages, getMessageById } from "@/data/messages";
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
    return (
      <Box minHeight="100vh" bg="#fafafa" />
    );
  }

  // ローディング画面
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // メッセージデータの取得
  const messages = getAllMessages();

  // ビューの条件分岐
  if (currentView === "home") {
    return (
      <HomeView
        messages={messages}
        onNavigate={handleNavigate}
      />
    );
  }

  // 個別メッセージビュー
  const person = getMessageById(currentView);
  if (!person) {
    // 存在しないIDの場合はホームに戻る
    handleBackToHome();
    return null;
  }

  return (
    <MessageView
      person={person}
      onBack={handleBackToHome}
    />
  );
}