/**
 * BearIcon Component - 再利用可能な熊さんアイコン
 * 
 * @description 統一されたデザインシステムに基づく熊さんアイコンコンポーネント
 */
"use client";

import { tokens } from "@/styles/tokens";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

export interface BearIconProps {
  /** アイコンのサイズ（px） */
  size?: number;
  /** 画像のサイズ（px） */
  imageSize?: number;
  /** 位置指定 */
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
  };
  /** 透明度 */
  opacity?: number;
  /** 表示設定 */
  display?: "flex" | "none" | { base: string; md: string };
}

export function BearIcon({
  size = 24,
  imageSize = 16,
  position = { top: "0", left: "0" },
  opacity = 1,
  display = "flex"
}: BearIconProps) {
  return (
    <Box
      position="absolute"
      {...position}
      w={`${size}px`}
      h={`${size}px`}
      display={display}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/manabyicon.png"
        alt="manaby"
        width={imageSize}
        height={imageSize}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          filter: tokens.shadows.bear,
          opacity,
        }}
      />
    </Box>
  );
}