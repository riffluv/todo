/**
 * CharacterHeader Component - シンプルなキャラクターヘッダー
 * 
 * @description ぷかぷか浮いているだけのシンプルなキャラクター
 */
"use client";

import { componentStyles } from "@/styles/components";
import { tokens } from "@/styles/tokens";
import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionBox = motion.create(Box);

export interface CharacterHeaderProps {
  /** 子要素（タイトルなど） */
  children?: React.ReactNode;
  /** アニメーション遅延時間 */
  delay?: number;
  /** カスタムキャラクター画像のパス */
  characterSrc?: string;
  /** カスタムキャラクターの代替テキスト */
  characterAlt?: string;
}

export function CharacterHeader({
  children,
  delay = 0,
  characterSrc = "/manaby-jump2.webp",
  characterAlt = "manaby character"
}: CharacterHeaderProps) {
  return (
    <MotionBox
      {...componentStyles.animations.fadeInUp}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      textAlign="center"
      position="relative"
      w="100%"
    >
      <VStack gap={{ base: tokens.spacing.xl, md: tokens.spacing['2xl'] }}>
        {/* シンプルにぷかぷか浮いているキャラクター */}
        <MotionBox
          w={{ base: tokens.mobile.characterSize.sm, md: tokens.mobile.characterSize.md, lg: tokens.mobile.characterSize.lg }}
          h={{ base: tokens.mobile.characterSize.sm, md: tokens.mobile.characterSize.md, lg: tokens.mobile.characterSize.lg }}
          {...componentStyles.animations.float}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${tokens.colors.primary[500]}15, transparent 70%)`,
            opacity: 0.6,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        >
          <Image
            src={characterSrc}
            alt={characterAlt}
            width={160}
            height={160}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%"
            }}
            priority
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
          />
        </MotionBox>

        {/* 子要素（タイトルなど） */}
        <Box w="100%">
          {children}
        </Box>
      </VStack>
    </MotionBox>
  );
}