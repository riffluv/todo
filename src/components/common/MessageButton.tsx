/**
 * MessageButton Component - 一流の安定したボタン
 *
 * @description シンプルで予測可能、アニメーション競合のない一流ボタン
 * Apple HIG & Material Design準拠
 */
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easing } from "@/styles/motion";
import { tokens } from "@/styles/tokens";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const MotionButton = motion.create(VStack);
const MotionCircle = motion.create(VStack);
const MotionText = motion.create(Text);
const MotionIcon = motion.create(Icon);

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
  /** 遷移のディレイ（ms） バウンスを目視させる用途。Reduced Motion時は0msに強制 */
  navigateDelayMs?: number;
}

export function MessageButton({
  onClick,
  label,
  delay = 0.6,
  disabled = false,
  icon = FaEnvelope,
  navigateDelayMs = 100,
}: MessageButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [pressed, setPressed] = React.useState(false);
  const clickTimeoutRef = React.useRef<number | null>(null);

  // シンプルな押下状態管理（競合なし）
  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled || e.button !== 0) return;
      setPressed(true);
      // 軽い触覚フィードバック（対応端末のみ）
      try {
        if (e.pointerType !== "mouse" && "vibrate" in navigator) {
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
    const delayMs = prefersReducedMotion ? 0 : navigateDelayMs;
    if (delayMs > 0) {
      // 遷移を少し遅らせ、リリース後のバウンスを見せる
      clickTimeoutRef.current = window.setTimeout(() => {
        onClick();
      }, delayMs);
    } else {
      onClick();
    }
  }, [disabled, onClick, prefersReducedMotion, navigateDelayMs]);

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
      if (clickTimeoutRef.current != null) {
        window.clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
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
      aria-pressed={pressed}
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
        initial={false}
        variants={{
          // 離した時に軽いオーバーシュートで戻る（温かい紙の弾み感）
          idle: {
            scaleX: [1.02, 0.995, 1],
            // 最初のキーを pressed より少し戻すことで“途中”が見えるようにする
            scaleY: [0.96, 1.01, 1],
            y: [2, -0.6, 0],
            transition: { duration: 0.18, ease: easing.easeOut, times: [0, 0.35, 1] },
          },
          // 押下時は素早く、深すぎず沈み込む
          pressed: {
            scaleX: 1.012,
            scaleY: 0.945,
            y: 2,
            transition: { type: "tween", duration: 0.07, ease: easing.emphasized },
          },
        }}
        animate={pressed ? "pressed" : "idle"}
        // ホバー時の立体感強化
        _groupHover={{
          bg: `linear-gradient(135deg, #fefcf8, #fdfcfb)`, // ホバー時：手紙全体の背景色に近い温かさ
          borderColor: "rgba(209, 120, 66, 0.2)", // ホバー時も統一感のある温かい色
          boxShadow: `0 12px 28px ${tokens.colors.primary[500]}26, 0 6px 16px ${tokens.colors.primary[500]}18, inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 ${tokens.colors.primary[500]}22`,
        }}
      >
        <MotionIcon
          as={icon}
          boxSize={{ base: 5, md: 6 }}
          color={pressed ? tokens.colors.primary[600] : tokens.colors.primary[500]}
          filter={
            pressed
              ? `drop-shadow(0 1px 2px rgba(0,0,0,0.15))`
              : `drop-shadow(0 2px 4px ${tokens.colors.primary[500]}30) drop-shadow(0 1px 2px rgba(0,0,0,0.08))`
          }
          initial={false}
          variants={{
            idle: {
              scale: [0.99, 1.015, 1],
              y: [0.8, -0.5, 0],
              transition: { duration: 0.18, ease: easing.easeOut, times: [0, 0.35, 1] },
            },
            pressed: {
              scale: 0.985,
              y: 0.8,
              transition: { type: "tween", duration: 0.07, ease: easing.emphasized },
            },
          }}
          animate={pressed ? "pressed" : "idle"}
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
        initial={false}
        variants={{
          idle: {
            y: [0.8, -0.5, 0],
            scale: [0.99, 1.006, 1],
            opacity: [0.96, 1, 1],
            transition: { duration: 0.18, ease: easing.easeOut, times: [0, 0.35, 1] },
          },
          pressed: {
            y: 0.8,
            scale: 0.985,
            opacity: 0.96,
            transition: { type: "tween", duration: 0.07, ease: easing.emphasized },
          },
        }}
        animate={pressed ? "pressed" : "idle"}
      >
        {label}
      </MotionText>
    </MotionButton>
  );
}
