/**
 * AnimatedTitle Component - アニメーション付きタイトル
 *
 * @description ハイドレーション対応の弾むテキストアニメーション
 */
"use client";

import { ClientOnly } from "@/components/ui/ClientOnly";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { themes } from "@/styles/themes";
import { tokens } from "@/styles/tokens";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

export interface AnimatedTitleProps {
  /** 表示するテキスト */
  text?: string;
  /** アニメーション遅延時間 */
  delay?: number;
  /** 端末のReduced Motion設定に関わらずアニメーションを強制 */
  forceMotion?: boolean;
}

export function AnimatedTitle({
  text = "Thanks!",
  delay = 0.4,
  forceMotion = false,
}: AnimatedTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const allowMotion = forceMotion || !prefersReducedMotion;
  const letters = text.split("");

  const fallback = (
    <Box {...themes.home.textAnimation.container}>
      {letters.map((letter, index) => (
        <Text key={`${letter}-${index}`} {...themes.home.textAnimation.letter}>
          {letter}
        </Text>
      ))}
    </Box>
  );

  return (
    <ClientOnly fallback={fallback}>
      <MotionBox
        initial={allowMotion ? { opacity: 0, y: 16 } : { opacity: 1 }}
        animate={allowMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
        transition={{
          duration: allowMotion ? 1 : 0,
          delay: allowMotion ? delay : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        {...themes.home.textAnimation.container}
        position="relative"
      >
        {letters.map((letter, index) => (
          <MotionBox
            key={`${letter}-${index}`}
            display="inline-block"
            initial={allowMotion ? { opacity: 0, scale: 0.8, y: 8 } : { opacity: 1 }}
            animate={
              allowMotion
                ? {
                    opacity: [0, 0, 1, 1, 0.9, 1],
                    scale: [0.8, 0.8, 1.1, 1, 1.03, 1],
                    y: [8, 8, -4, 0, 2, 0],
                  }
                : { opacity: 1 }
            }
            transition={
              allowMotion
                ? {
                    duration: 3.8,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: index * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                    times: [0, 0.12, 0.3, 0.45, 0.75, 1],
                  }
                : { duration: 0 }
            }
            whileHover={
              allowMotion
                ? {
                    scale: 1.2,
                    y: -8,
                    color: tokens.colors.primary[600],
                    transition: { duration: 0.3, ease: "easeOut" },
                  }
                : {}
            }
          >
            <Text {...themes.home.textAnimation.letter}>{letter}</Text>
          </MotionBox>
        ))}
      </MotionBox>
    </ClientOnly>
  );
}
