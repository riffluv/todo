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
  const { transition, ...iconProps } = componentStyles.button.message.icon;

  return (
    <MotionBox
      {...componentStyles.animations.bounce}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <VStack
        {...componentStyles.button.message.container}
        onClick={disabled ? undefined : onClick}
        opacity={disabled ? 0.6 : 1}
        cursor={disabled ? "not-allowed" : "pointer"}
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
      </VStack>
    </MotionBox>
  );
}
