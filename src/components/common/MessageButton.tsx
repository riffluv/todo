/**
 * MessageButton Component - 一流の安定したボタン
 *
 * @description シンプルで予測可能、アニメーション競合のない一流ボタン
 * Apple HIG & Material Design準拠
 */
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { tokens } from "@/styles/tokens";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const MotionButton = motion.create(VStack);
const MotionCircle = motion.create(VStack);
const MotionText = motion.create(Text);

export interface MessageButtonProps {
  /** クリック時のハンドラー */
  onClick: () => void;
  /** ボタンのラベル */
  label: string;
  /** アニメーション遅延時間 */
  delay?: number;
  /** 無効化状態 */
  disabled?: boolean;
  /** アイコン（省略時は封筒） */
  icon?: React.ElementType;
}

export function MessageButton({
  onClick,
  label,
  delay = 0.6,
  disabled = false,
  icon = FaEnvelope,
}: MessageButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [pressed, setPressed] = React.useState(false);

  // シンプルな押下状態管理（競合なし）
  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled || e.button !== 0) return;
      setPressed(true);
      // 軽い触覚フィードバック（対応端末のみ）
      try {
        if (e.pointerType !== "mouse" && "vibrate" in navigator) {
          // @ts-expect-error: vibrate は一部ブラウザで未定義
          navigator.vibrate?.(10);
        }
      } catch {}
    },
    [disabled],
  );

  const handlePointerUp = React.useCallback(() => {
    if (disabled) return;
    setPressed(false);
  }, [disabled]);

  const handleClick = React.useCallback(() => {
    if (disabled) return;
    // フォーカスが当たっていれば外す（型安全）
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setPressed(false);
    onClick();
  }, [disabled, onClick]);

  // グローバル押下解除（モバイル対応強化）
  React.useEffect(() => {
    const cleanup = () => setPressed(false);
    // デスクトップ・モバイル両対応のイベントリスナー
    window.addEventListener("pointerup", cleanup, { capture: true, passive: true });
    window.addEventListener("pointercancel", cleanup, { capture: true, passive: true });
    window.addEventListener("touchend", cleanup, { capture: true, passive: true });
    window.addEventListener("touchcancel", cleanup, { capture: true, passive: true });
    document.addEventListener("visibilitychange", cleanup);
    return () => {
      window.removeEventListener("pointerup", cleanup, { capture: true });
      window.removeEventListener("pointercancel", cleanup, { capture: true });
      window.removeEventListener("touchend", cleanup, { capture: true });
      window.removeEventListener("touchcancel", cleanup, { capture: true });
      document.removeEventListener("visibilitychange", cleanup);
    };
  }, []);

  return (
    <MotionButton
      // 初期表示アニメーション
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.8, 0.25, 1], // Material Design ease-out
      }}
      // 押下アニメーションは内側要素で制御（ゲーム風の押し込み感）
      // ボタン基本設定
      as="button"
      onClick={handleClick}
      // マウス操作時はフォーカスを発生させない（キーボードは focus-visible で表示）
      onMouseDown={(e) => e.preventDefault()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      // レイアウト
      gap={{ base: "12px", md: "16px" }}
      align="center"
      cursor={disabled ? "not-allowed" : "pointer"}
      opacity={disabled ? 0.6 : 1}
      p={{ base: "16px", md: "20px" }}
      borderRadius="20px"
      minW={{ base: "140px", md: "160px" }}
      minH="56px"
      // 背景・境界
      bg="transparent"
      border="none"
      outline="none"
      // フォーカス表示
      _focusVisible={{
        outline: `2px solid ${tokens.colors.primary[500]}`,
        outlineOffset: "2px",
      }}
      // タッチ最適化（モバイル強化） - グローバルCSSクラスで適用し型競合回避
      className="touch-optimized"
    >
      {/* アイコン部分 - 高級感のあるオレンジ立体デザイン */}
      <MotionCircle
        w={{ base: "72px", md: "80px", lg: "88px" }}
        h={{ base: "72px", md: "80px", lg: "88px" }}
        borderRadius="50%"
        bg={
          pressed
            ? `linear-gradient(135deg, #f8f6f4, #efebe7)` // 押下時：便箋のような温かいベージュ
            : `linear-gradient(135deg, #fdfcfb, #f8f6f4)` // 通常時：手紙用紙のような温かい白
        }
        border="1px solid"
        borderColor={
          pressed ? "rgba(209, 120, 66, 0.25)" : "rgba(209, 120, 66, 0.15)" // アプリのボーダー色に合わせた温かみのある色
        }
        boxShadow={
          pressed
            ? `0 2px 6px ${tokens.colors.primary[500]}30, inset 0 3px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)`
            : `0 10px 22px ${tokens.colors.primary[500]}22, 0 4px 12px ${tokens.colors.primary[500]}14, inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 ${tokens.colors.primary[500]}18`
        }
        justify="center"
        align="center"
        transition={`all ${tokens.animations.durations.fast} cubic-bezier(0.4, 0, 0.2, 1)`}
        animate={pressed ? { scale: 0.94, y: 2 } : { scale: 1, y: 0 }}
        transitionEnd={pressed ? undefined : {}}
        // しっかりしたスプリングで戻す
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.7 }}
        // ホバー時の立体感強化
        _groupHover={{
          bg: `linear-gradient(135deg, #fefcf8, #fdfcfb)`, // ホバー時：手紙全体の背景色に近い温かさ
          borderColor: "rgba(209, 120, 66, 0.2)", // ホバー時も統一感のある温かい色
          boxShadow: `0 12px 28px ${tokens.colors.primary[500]}26, 0 6px 16px ${tokens.colors.primary[500]}18, inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 ${tokens.colors.primary[500]}22`,
        }}
      >
        <Icon
          as={icon}
          boxSize={{ base: 5, md: 6 }}
          color={pressed ? tokens.colors.primary[600] : tokens.colors.primary[500]}
          filter={
            pressed
              ? `drop-shadow(0 1px 2px rgba(0,0,0,0.15))`
              : `drop-shadow(0 2px 4px ${tokens.colors.primary[500]}30) drop-shadow(0 1px 2px rgba(0,0,0,0.08))`
          }
          transition={`all ${tokens.animations.durations.fast} cubic-bezier(0.4, 0, 0.2, 1)`}
        />
      </MotionCircle>

      {/* ラベル部分 */}
      <MotionText
        fontFamily={tokens.typography.fontFamilies.body}
        fontSize={{
          base: tokens.typography.fontSizes.sm,
          md: tokens.typography.fontSizes.md,
        }}
        fontWeight={tokens.typography.fontWeights.semibold}
        color={tokens.colors.primary[600]}
        letterSpacing="0.01em"
        textAlign="center"
        transition={`all ${tokens.animations.durations.fast} cubic-bezier(0.4, 0, 0.2, 1)`}
        animate={pressed ? { y: 1, scale: 0.98, opacity: 0.95 } : { y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.7 }}
      >
        {label}
      </MotionText>
    </MotionButton>
  );
}
