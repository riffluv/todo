/**
 * Message Card Component Styles - 統一レイアウトシステム対応
 *
 * @description 黄金比による数学的に美しいメッセージカード
 * 全画面で完璧に統一されたスペーシング・比例・アニメーション
 */

import { unifiedLayout } from "../layout";
import { tokens } from "../tokens";

export const messageCardStyles = {
  container: {
    // 統一メッセージカードスタイル（黄金比ベース）
    ...unifiedLayout.messageCard,
    position: "relative" as const,

    // 統一アニメーション
    transition: unifiedLayout.animations.cssTransition,

    _hover: {
      transform: "translateY(-2px) scale(1.01)",
      transition: "all 0.25s ease-out",
      boxShadow: `
        0 6px 20px rgba(0,0,0,0.08),
        0 12px 40px rgba(0,0,0,0.12),
        inset 0 1px 0 rgba(255,255,255,0.8)
      `,
      background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.96))",
    },

    _active: {
      transform: "scale(0.97) translateY(1px)",
      transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.1s ease-out, background 0.1s ease-out",
      boxShadow: `
        0 2px 6px rgba(0,0,0,0.08),
        0 4px 12px rgba(0,0,0,0.06),
        inset 0 1px 0 rgba(255,255,255,0.5)
      `,
      background: "linear-gradient(180deg, rgba(250,248,245,0.98), rgba(248,246,243,0.95))",
      borderColor: "rgba(253, 127, 40, 0.15)",
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
    gap: { base: "13px", md: "21px" }, // 黄金比ベース
    textAlign: "center" as const,
    w: "100%",
    display: "flex",
    flexDirection: "column" as const,
  },

  text: {
    // メインテキスト（統一タイポグラフィ）
    primary: {
      ...unifiedLayout.typography.body,
      color: tokens.colors.gray[800],
      fontWeight: tokens.typography.fontWeights.normal,
      textAlign: "center" as const,
      maxW: "none",
    },

    // ラベルテキスト（統一タイポグラフィ）
    label: {
      fontFamily: tokens.typography.fontFamilies.body,
      fontSize: "12px", // 黄金比ベース
      color: tokens.colors.primary[600],
      fontWeight: tokens.typography.fontWeights.semibold,
      textTransform: "none" as const,
      letterSpacing: "0.01em",
      mb: "8px", // 黄金比ベース
      textAlign: "center" as const,
      pb: 0,
      display: "inline-block",
    },

    // キャプション（統一タイポグラフィ）
    caption: {
      ...unifiedLayout.typography.caption,
      color: tokens.colors.gray[500],
    },

    // タイトル用（統一タイポグラフィ）
    title: {
      ...unifiedLayout.typography.title,
      color: tokens.colors.primary[600],
      textAlign: "center" as const,
    },
  },
} as const;
