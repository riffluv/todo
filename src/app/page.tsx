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
import Image from "next/image";

export default function Home() {
  const {
    showLoading,
    currentView,
    isMounted,
    handleNavigate,
    handleBackToHome,
    handleLoadingComplete,
  } = useAppState();

  // ハイドレーション対応：マウント前は基本的なレンダリングのみ
  if (!isMounted) {
    return (
      <Box minHeight="100vh" bg="#fafafa" display="flex" alignItems="center" justifyContent="center">
        <Box w="100px" h="100px">
          <Image
            src="/manaby-jump2.png"
            alt="manaby character"
            width={100}
            height={100}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            priority
          />
        </Box>
      </Box>
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