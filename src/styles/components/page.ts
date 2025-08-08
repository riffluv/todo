/**
 * Page Layout Component Styles
 *
 * @description ページレイアウト関連のスタイル定義
 */

import { tokens } from "../tokens";

export const pageStyles = {
  container: {
    minHeight: "100dvh",
    position: "relative" as const,
    py: {
      base: `calc(${tokens.spacing.xl} + 6px)`,
      md: tokens.spacing["4xl"],
    },
    px: {
      base: `calc(${tokens.spacing.lg} - 2px)`,
      md: tokens.spacing.xl,
    },
    pb: {
      base: `calc(${tokens.spacing["2xl"]} + 10px)`,
      md: tokens.spacing["4xl"],
    },
    // 微細なテクスチャ背景
    _before: {
      content: '""',
      position: "absolute",
      inset: 0,
      opacity: 0.025,
      backgroundImage: `radial-gradient(circle at 22% 28%, ${tokens.colors.primary[500]} 1px, transparent 1px),
                        radial-gradient(circle at 78% 72%, ${tokens.colors.primary[600]} 1px, transparent 1px)`,
      backgroundSize: "56px 56px, 44px 44px",
      pointerEvents: "none",
    },
  },
  content: {
    maxW: { base: "100%", sm: "420px", md: "740px", lg: "980px" },
    gap: {
      base: `calc(${tokens.spacing["3xl"]} - 6px)`,
      md: tokens.spacing["5xl"],
    },
    align: "center" as const,
    w: "100%",
    mx: "auto",
  },
} as const;
