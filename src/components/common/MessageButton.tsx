/**
 * MessageButton Component - 再利用可能なメッセージボタン
 *
 * @description 統一されたデザインシステムに基づくメッセージボタンコンポーネント
 */
"use client";

import { componentStyles } from "@/styles/components";
import { tokens } from "@/styles/tokens";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
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

export function MessageButton({
  onClick,
  label,
  delay = 0,
  disabled = false,
}: MessageButtonProps) {
  const { transition: _, ...iconProps } = componentStyles.button.message.icon;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <MotionBox
        as={VStack}
        {...(() => {
          const { transition: _, ...containerStyles } = componentStyles.button.message.container;
          return containerStyles;
        })()}
        onClick={disabled ? undefined : onClick}
        opacity={disabled ? 0.6 : 1}
        cursor={disabled ? "not-allowed" : "pointer"}
        whileHover={!disabled ? {
          scale: 1.03,
          y: -6,
          transition: { stiffness: 500, damping: 30 },
        } : undefined}
        whileTap={!disabled ? {
          scale: 0.95,
          y: 0,
          transition: { duration: 0.1 },
        } : undefined}
        // スマホ用のタッチフィードバック
        _active={{
          transform: "scale(0.95) translateY(0px)",
          transition: "all 0.1s ease-out",
        }}
        // iOS Safari用のタッチハイライト無効化
        style={{
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
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
