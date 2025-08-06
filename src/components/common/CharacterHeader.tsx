/**
 * CharacterHeader Component - キャラクターヘッダー
 * 
 * @description 熊さんキャラクターとタイトルを含むヘッダーコンポーネント
 */
"use client";

import { componentStyles } from "@/styles/components";
import { themes } from "@/styles/themes";
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
}

export function CharacterHeader({
  children,
  delay = 0
}: CharacterHeaderProps) {
  return (
    <MotionBox
      {...componentStyles.animations.fadeInUp}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      textAlign="center"
      position="relative"
    >
      <VStack gap={{ base: 12, md: 16 }}>
        {/* 熊さんキャラクター */}
        <MotionBox
          {...themes.home.character.container}
          {...componentStyles.animations.float}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            inset: '-20px',
            borderRadius: 'full',
            background: `radial-gradient(circle, ${tokens.colors.primary[500]}08, transparent 70%)`,
            zIndex: -1
          }}
        >
          <Image
            src="/manaby-jump2.png"
            alt="manaby character"
            width={100}
            height={100}
            style={themes.home.character.image}
            priority
          />
        </MotionBox>

        {/* 子要素（タイトルなど） */}
        {children}
      </VStack>
    </MotionBox>
  );
}