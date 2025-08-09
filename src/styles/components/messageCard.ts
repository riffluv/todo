/**
 * Message Card Component Styles
 *
 * @description メッセージカード専用のスタイル定義
 */

import { tokens } from "../tokens";

export const messageCardStyles = {
  container: {
    // 紙の温度感を持つ穏やかなカード（グラス表現を控えめに）
    background: `
      linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.92))
    `,
    borderRadius: tokens.radii.xl,
    p: {
      base: tokens.spacing.xl,
      md: tokens.spacing["2xl"],
    },
    border: "1px solid",
    borderColor: tokens.colors.gray[200], // 繊細なラインのみ
    position: "relative" as const,
    boxShadow: tokens.shadows.sm, // 影は控えめに
    _hover: {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadows.md,
      background: `linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94))`,
    },
    _active: {
      transform: "translateY(0px)",
      boxShadow: tokens.shadows.sm,
    },
    _focusVisible: {
      outline: `2px solid ${tokens.colors.primary[400]}`,
      outlineOffset: "2px",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none !important",
      transform: "none !important",
      _hover: { transform: "none !important" },
    },
  },
  content: {
    gap: { base: tokens.spacing.lg, md: tokens.spacing.xl },
    textAlign: "center" as const,
    w: "100%",
  },
  text: {
    primary: {
      fontSize: {
        base: tokens.typography.fontSizes.md,
        md: tokens.typography.fontSizes.lg,
      },
      lineHeight: {
        base: tokens.typography.lineHeights.relaxed,
        md: tokens.typography.lineHeights.loose,
      },
      color: tokens.colors.gray[800],
      fontWeight: tokens.typography.fontWeights.normal,
      letterSpacing: tokens.typography.letterSpacings.wide, // 読みやすさ重視でわずかに広げる
      textAlign: "center" as const,
      maxW: "none",
    },
    label: {
      fontSize: tokens.typography.fontSizes.sm,
      color: tokens.colors.primary[600],
      fontWeight: tokens.typography.fontWeights.medium,
      textTransform: "none" as const, // 手紙らしく自然体
      letterSpacing: tokens.typography.letterSpacings.wider,
      mb: tokens.spacing.sm,
      textAlign: "center" as const,
      pb: tokens.spacing.xs,
      display: "inline-block",
      borderBottom: "none",
      position: "relative" as const,
      _after: {
        content: '""',
        position: "absolute",
        bottom: "-2px",
        left: "50%",
        transform: "translateX(-50%)",
        w: "32px",
        h: "2px",
        bg: `linear-gradient(90deg, transparent, ${tokens.colors.primary[400]}, transparent)`,
        borderRadius: "full",
      },
    },
    // 補足文用（必要な箇所で使用）
    caption: {
      fontSize: tokens.typography.fontSizes.xs,
      color: tokens.colors.gray[500],
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.wider,
    },
  },
} as const;
