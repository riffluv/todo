"use client";

import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { tokens } from "@/styles/tokens";

const MotionBox = motion.create(Box);

interface CharacterIconProps {
  /** キャラクター画像のパス */
  src: string;
  /** 代替テキスト */
  alt: string;
  /** サイズ */
  size?: {
    base: string;
    md: string;
    lg?: string;
  };
  /** 位置 */
  position?: {
    top?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  /** 不透明度 */
  opacity?: number;
  /** 表示制御 */
  display?: any;
}

export function CharacterIcon({
  src,
  alt,
  size = { base: "80px", md: "100px", lg: "120px" },
  position,
  opacity = 1,
  display,
}: CharacterIconProps) {
  return (
    <MotionBox
      position="absolute"
      zIndex={2}
      display={display}
      opacity={opacity}
      {...position}
      // 可愛いふわふわアニメーション
      animate={{
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      // ホバー時の反応
      whileHover={{
        scale: 1.1,
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 0.6,
          repeat: 2,
        },
      }}
    >
      <Box
        w={size}
        h={size}
        borderRadius="50%"
        overflow="hidden"
        boxShadow={`0 4px 12px ${tokens.colors.primary[500]}20`}
        border="2px solid"
        borderColor={`${tokens.colors.primary[300]}40`}
        background="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(4px)"
      >
        <Image
          src={src}
          alt={alt}
          w="100%"
          h="100%"
          objectFit="cover"
          filter="contrast(1.1) saturate(1.1)"
        />
      </Box>
    </MotionBox>
  );
}
