import { tokens } from "./tokens";

// テーマ別スタイル定義
export const themes = {
  // ホームページテーマ
  home: {
    background: {
      bg: tokens.colors.semantic.background,
    },
    character: {
      container: {
        w: { base: "80px", md: "100px" },
        h: { base: "80px", md: "100px" },
        position: "relative" as const,
      },
      image: {
        objectFit: "contain" as const,
        width: "100%",
        height: "100%",
      },
    },
    textAnimation: {
      container: {
        display: "flex",
        gap: { base: "1px", md: "2px" },
        justifyContent: "center",
        alignItems: "baseline",
      },
      letter: {
        fontFamily: tokens.typography.fontFamilies.heading,
        fontSize: {
          base: tokens.typography.fontSizes["2xl"],
          md: tokens.typography.fontSizes["3xl"],
        },
        fontWeight: tokens.typography.fontWeights.semibold,
        color: tokens.colors.primary[500],
        display: "inline-block",
        letterSpacing: {
          base: tokens.typography.letterSpacings.widest,
          md: tokens.typography.letterSpacings.wide,
        },
        lineHeight: tokens.typography.lineHeights.tight,
        textShadow: `0 0 1px ${tokens.colors.primary[500]}4D`,
      },
    },
    header: {
      icon: {
        boxSize: { base: 10, md: 12 },
        color: tokens.colors.primary[500],
      },
      title: {
        as: "h1" as const,
        size: { base: "xl", md: "2xl" },
        color: tokens.colors.primary[700],
        fontWeight: tokens.typography.fontWeights.semibold,
      },
      subtitle: {
        fontSize: tokens.typography.fontSizes.sm,
        color: tokens.colors.primary[500],
        fontWeight: tokens.typography.fontWeights.medium,
        textTransform: "uppercase" as const,
        letterSpacing: tokens.typography.letterSpacings.widest,
      },
    },
  },
  
} as const;
