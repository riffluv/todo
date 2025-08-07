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
      base: tokens.spacing.xl,
      md: tokens.spacing["4xl"],
    },
    px: {
      base: tokens.spacing.lg,
      md: tokens.spacing.xl,
    },
    pb: {
      base: tokens.spacing["2xl"],
      md: tokens.spacing["4xl"],
    },
    // 微細なテクスチャ背景
    _before: {
      content: '""',
      position: "absolute",
      inset: 0,
      opacity: 0.03,
      backgroundImage: `radial-gradient(circle at 25% 25%, ${tokens.colors.primary[500]} 1px, transparent 1px),
                        radial-gradient(circle at 75% 75%, ${tokens.colors.primary[600]} 1px, transparent 1px)`,
      backgroundSize: "60px 60px, 40px 40px",
      pointerEvents: "none",
    },
  },
  content: {
    maxW: { base: "100%", sm: "420px", md: "768px", lg: "1024px" },
    gap: { base: tokens.spacing["3xl"], md: tokens.spacing["5xl"] },
    align: "center" as const,
    w: "100%",
    mx: "auto",
  },
} as const;
