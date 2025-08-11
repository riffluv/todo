/**
 * Button Component Styles - 一流デザイン基準
 *
 * @description クリーンで競合のないボタンスタイル定義
 * Apple HIG & Material Design準拠
 */

import { tokens } from "../tokens";

export const buttonStyles = {
  // 戻るボタン（一流の押し込み感）
  back: {
    primary: {
      size: "lg",
      bg: `linear-gradient(135deg, ${tokens.colors.primary[500]}, ${tokens.colors.primary[600]})`,
      color: "white",
      borderRadius: tokens.radii.full,
      px: 8,
      py: 3,
      fontWeight: tokens.typography.fontWeights.semibold,
      boxShadow: `0 6px 14px ${tokens.colors.primary[500]}28`,
      border: "1px solid",
      borderColor: "rgba(255, 255, 255, 0.15)",
      transition: `all ${tokens.animations.durations.fast} ${tokens.animations.easings.standard}`,

      // ホバー効果（一流基準）
      _hover: {
        transform: "translateY(-1px) scale(1.01)",
        boxShadow: `0 10px 22px ${tokens.colors.primary[500]}33`,
        bg: `linear-gradient(135deg, ${tokens.colors.primary[400]}, ${tokens.colors.primary[500]})`,
      },

      // 押下効果（リアルな押し込み）
      _active: {
        transform: "scale(0.95) translateY(2px)",
        transition: `transform ${tokens.animations.durations.fast} ${tokens.animations.easings.emphasized}, box-shadow ${tokens.animations.durations.fast} ${tokens.animations.easings.easeOut}`,
        boxShadow: `0 1px 4px ${tokens.colors.primary[500]}40, inset 0 2px 4px rgba(0,0,0,0.15)`,
        bg: `linear-gradient(135deg, ${tokens.colors.primary[600]}, ${tokens.colors.primary[700]})`,
      },

      // フォーカス表示
      _focusVisible: {
        outline: `2px solid ${tokens.colors.primary[300]}`,
        outlineOffset: "2px",
      },
    },

    // セカンダリボタン
    secondary: {
      bg: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(8px)",
      border: "1px solid",
      borderColor: "rgba(0, 0, 0, 0.06)",
      borderRadius: tokens.radii.full,
      px: 6,
      py: 2,
      color: tokens.colors.semantic.text.primary,
      fontWeight: tokens.typography.fontWeights.medium,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
      transition: `all ${tokens.animations.durations.fast} ${tokens.animations.easings.standard}`,

      _hover: {
        bg: "rgba(255, 255, 255, 0.95)",
        transform: "translateY(-1px) scale(1.02)",
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)",
        borderColor: `${tokens.colors.primary[300]}40`,
      },

      _active: {
        transform: "scale(0.97) translateY(1px)",
        transition: `transform ${tokens.animations.durations.fastest} ${tokens.animations.easings.emphasized}`,
        bg: "rgba(248, 246, 243, 0.95)",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        borderColor: `${tokens.colors.primary[400]}60`,
      },

      _focusVisible: {
        outline: `2px solid ${tokens.colors.primary[400]}60`,
        outlineOffset: "2px",
      },
    },
  },
} as const;
