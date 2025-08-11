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
    },
    [disabled],
  );

  const handlePointerUp = React.useCallback(() => {
    if (disabled) return;
    setPressed(false);
  }, [disabled]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.currentTarget.blur();
      setPressed(false);
      onClick();
    },
    [disabled, onClick],
  );

  // グローバル押下解除（安全性）
  React.useEffect(() => {
    const cleanup = () => setPressed(false);
    window.addEventListener("pointerup", cleanup, { capture: true });
    document.addEventListener("visibilitychange", cleanup);
    return () => {
      window.removeEventListener("pointerup", cleanup, { capture: true });
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
      // 押下アニメーション（単一、競合なし）
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.95,
              y: 2,
              transition: {
                duration: parseFloat(tokens.animations.durations.fast),
                ease: [0.4, 0, 0.2, 1], // Material emphasized
              },
            }
      }
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.03,
              y: -4,
              transition: {
                duration: parseFloat(tokens.animations.durations.fast),
                ease: [0.25, 0.8, 0.25, 1], // Material Design ease-out
              },
            }
      }
      // ボタン基本設定
      as="button"
      type="button"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      disabled={disabled}
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
      // タッチ最適化
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        userSelect: "none",
      }}
    >
      {/* アイコン部分 - 高級感のあるオレンジ立体デザイン */}
      <VStack
        w={{ base: "72px", md: "80px", lg: "88px" }}
        h={{ base: "72px", md: "80px", lg: "88px" }}
        borderRadius="50%"
        bg={
          pressed
            ? `linear-gradient(135deg, rgba(255,255,255,0.85), rgba(248,246,243,0.9))`
            : `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(253,251,248,0.92))`
        }
        border="1px solid"
        borderColor={
          pressed ? `${tokens.colors.primary[500]}40` : `${tokens.colors.primary[500]}20`
        }
        boxShadow={
          pressed
            ? `0 2px 6px ${tokens.colors.primary[500]}25, inset 0 2px 4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)`
            : `0 6px 16px ${tokens.colors.primary[500]}18, 0 3px 8px ${tokens.colors.primary[500]}12, inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 ${tokens.colors.primary[500]}15`
        }
        justify="center"
        align="center"
        transition={`all ${tokens.animations.durations.fast} cubic-bezier(0.4, 0, 0.2, 1)`}
        // ホバー時の立体感強化
        _groupHover={{
          bg: `linear-gradient(135deg, rgba(255,255,255,0.98), rgba(251,249,246,0.95))`,
          borderColor: `${tokens.colors.primary[500]}35`,
          boxShadow: `0 8px 20px ${tokens.colors.primary[500]}22, 0 4px 12px ${tokens.colors.primary[500]}15, inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 ${tokens.colors.primary[500]}20`,
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
      </VStack>

      {/* ラベル部分 */}
      <Text
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
      >
        {label}
      </Text>
    </MotionButton>
  );
}
