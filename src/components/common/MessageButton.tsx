/**
 * MessageButton Component - 再利用可能なメッセージボタン
 *
 * @description 統一されたデザインシステムに基づくメッセージボタンコンポーネント
 */
"use client";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { componentStyles } from "@/styles/components";
import { tokens } from "@/styles/tokens";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type React from "react";
import { FaEnvelope } from "react-icons/fa";

const MotionBox = motion.create(VStack);
const MotionIconBox = motion.create(VStack);

export interface MessageButtonProps {
  /** クリック時のハンドラー */
  onClick: () => void;
  /** ボタンのラベル */
  label: string;
  /** アニメーション遅延時間 */
  delay?: number;
  /** 無効化状態 */
  disabled?: boolean;
}

export function MessageButton({ onClick, label, delay = 0.6, disabled = false }: MessageButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  
  useKeyboardNavigation({
    onEnter: onClick,
    onSpace: onClick,
  });
  const { transition: _transitionUnused, ...iconProps } = componentStyles.button.message.icon;

  // スマホ用のタッチイベントハンドラー
  const handleTouchStart = () => {
    if (!disabled) {
      // タッチ開始時の処理（必要に応じて）
    }
  };

  const handleTouchEnd = () => {
    if (!disabled) {
      // タッチ終了時の処理（必要に応じて）
    }
  };

  // キーボード操作対応（Enter / Spaceで発火）
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <MotionBox
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <MotionBox
        as={VStack}
        {...(() => {
          const { transition: _transitionUnused2, ...containerStyles } =
            componentStyles.button.message.container;
          return containerStyles;
        })()}
        {...(!disabled ? { onClick } : {})}
        role="button"
        aria-label={label}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        opacity={disabled ? 0.6 : 1}
        cursor={disabled ? "not-allowed" : "pointer"}
        {...(!disabled
          ? {
              whileHover: {
                scale: 1.03,
                y: -6,
                transition: { stiffness: 500, damping: 30 },
              },
              whileTap: {
                scale: 0.9,
                y: 0,
                transition: { duration: 0.15, type: "spring", stiffness: 400 },
              },
            }
          : {})}
        // Android/iOS対応のタッチフィードバック
        _active={{
          transform: "scale(0.9)",
          transition: "transform 0.1s ease-out",
        }}
        _focus={{
          transform: "scale(0.95)",
          outline: "none",
        }}
        // 全デバイス対応のタッチ設定
        style={{
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <MotionIconBox {...iconProps} {...componentStyles.animations.pulse}>
          <Icon
            as={FaEnvelope}
            boxSize={{ base: 5, md: 6 }}
            color={tokens.colors.primary[500]}
            transition={`all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`}
          />
        </MotionIconBox>
        <Text {...componentStyles.button.message.label}>{label}</Text>
      </MotionBox>
    </MotionBox>
  );
}
