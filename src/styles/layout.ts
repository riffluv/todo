/**
 * 統一レイアウトシステム - 手紙らしい心地よい空間設計
 *
 * @description 人の手で丁寧に調整した、読みやすく温かみのあるレイアウト
 * - 日本語の手紙に適したゆとりのある余白
 * - 自然で規則的すぎない、心地よいリズム
 * - 読み手の目に優しい空間配置
 */

import { tokens } from "./tokens";

// 手紙らしいスペーシング（人間らしい不規則な美しさ）
const letterSpacing = {
  xs: 6, // 細やかな調整用
  sm: 12, // 小さな区切り
  base: 20, // 基本の余白
  md: 32, // 程よい区切り
  lg: 48, // ゆとりのある区切り
  xl: 68, // 大きな区切り
  "2xl": 92, // とても大きな区切り
  "3xl": 124, // セクション区切り
  "4xl": 164, // 印象的な区切り
} as const;

// 手紙に最適化したフォントサイズ
const readableFontSizes = {
  body: {
    base: 16, // 読みやすい基本サイズ
    md: 18, // タブレットではもう少し大きく
    lg: 19, // デスクトップでは余裕をもって
  },
  title: {
    base: 24, // 見出し
    md: 28, // タブレット用見出し
    lg: 32, // デスクトップ用見出し
  },
  small: 13, // 小さな文字
  caption: 12, // キャプション
} as const;

// 自然なヘッダー高さ（読みやすさを重視）
const headerHeights = {
  mobile: 180, // スマートフォンで心地よい高さ
  tablet: 200, // タブレットで少し余裕を
  desktop: 220, // デスクトップでゆったりと
} as const;

// ヘッダーからコンテンツまでの自然な間隔
const transitionSpaces = {
  mobile: 32, // スマートフォンで適度な間隔
  tablet: 44, // タブレットで少しゆとりを
  desktop: 56, // デスクトップでより余裕を
} as const;

/**
 * 統一レイアウトシステム
 * 手紙らしい温かみのあるレイアウト構造
 */
export const unifiedLayout = {
  // ページコンテナ（全画面共通）
  pageContainer: {
    minHeight: "100dvh",
    position: "relative" as const,
    background: "linear-gradient(135deg, #fefcf8 0%, #fbf9f6 100%)",

    // 手紙らしい余白設定
    py: {
      base: `${letterSpacing.lg}px`, // 48px - スマートフォンでゆとりを
      md: `${letterSpacing.xl}px`, // 68px - タブレットで上品に
      lg: `${letterSpacing["2xl"]}px`, // 92px - デスクトップで贅沢に
    },
    px: {
      base: `${letterSpacing.base}px`, // 20px - スマートフォンで読みやすく
      md: `${letterSpacing.md}px`, // 32px - タブレットで余裕を
      lg: `${letterSpacing.lg}px`, // 48px - デスクトップでゆったりと
    },
    pb: {
      base: `${letterSpacing.xl}px`, // 68px - 下部にしっかりと余白
      md: `${letterSpacing["2xl"]}px`, // 92px - より余裕を
      lg: `${letterSpacing["3xl"]}px`, // 124px - 印象的な余白
    },

    // やわらかなテクスチャ（控えめに）
    _before: {
      content: '""',
      position: "absolute",
      inset: 0,
      opacity: 0.015,
      backgroundImage: `radial-gradient(circle at 25% 32%, ${tokens.colors.primary[500]} 1px, transparent 1px),
                        radial-gradient(circle at 75% 68%, ${tokens.colors.primary[600]} 1px, transparent 1px)`,
      backgroundSize: "64px 64px, 52px 52px",
      pointerEvents: "none",
    },
  },

  // ヘッダー領域（自然な高さ）
  headerSection: {
    height: {
      base: `${headerHeights.mobile}px`, // 180px - スマートフォンで心地よく
      md: `${headerHeights.tablet}px`, // 200px - タブレットでバランス良く
      lg: `${headerHeights.desktop}px`, // 220px - デスクトップで余裕を
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    mb: {
      base: `${transitionSpaces.mobile}px`, // 32px - 適度な間隔
      md: `${transitionSpaces.tablet}px`, // 44px - ゆとりのある間隔
      lg: `${transitionSpaces.desktop}px`, // 56px - 贅沢な間隔
    },
  },

  // メインコンテンツ領域（手紙に最適な幅）
  contentSection: {
    maxW: {
      base: "100%",
      sm: "440px", // スマートフォンで読みやすく（少し広げました）
      md: "580px", // タブレットで手紙らしい幅
      lg: "680px", // デスクトップでゆとりを持って
      xl: "740px", // 大画面でも読みやすい最適幅
    },
    mx: "auto",
    px: {
      base: `${letterSpacing.base}px`, // 20px - スマートフォンで適度な余白
      md: `${letterSpacing.md}px`, // 32px - タブレット以上でゆとりを
    },
  },

  // メッセージカード統一スペーシング
  messageCard: {
    // 外側マージン（自然な間隔）
    mb: {
      base: `${letterSpacing.lg}px`, // 48px - 心地よい間隔
      md: `${letterSpacing.xl}px`, // 68px - より余裕のある間隔
    },

    // 内側パディング（手紙らしい豊かさ）
    p: {
      base: `${letterSpacing.md}px`, // 32px - スマートフォンで読みやすく
      md: `${letterSpacing.lg}px`, // 48px - タブレットで余裕を
      lg: `${letterSpacing.xl}px`, // 68px - デスクトップで贅沢に
    },

    // やわらかな角丸
    borderRadius: `${letterSpacing.sm}px`, // 12px - やさしい印象

    // 温かみのある背景とシャドウ
    background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(253,252,250,0.94))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(244, 162, 97, 0.08)",
    boxShadow: `
      0 2px 8px rgba(244, 162, 97, 0.08),
      0 8px 24px rgba(244, 162, 97, 0.12),
      0 1px 0 rgba(255,255,255,0.9),
      inset 0 1px 0 rgba(255,255,255,0.95)
    `,
  },

  // タイポグラフィ統一（手紙らしい読みやすさ）
  typography: {
    title: {
      fontSize: {
        base: `${readableFontSizes.title.base}px`, // 24px - 見出し
        md: `${readableFontSizes.title.md}px`, // 28px - タブレット用見出し
        lg: `${readableFontSizes.title.lg}px`, // 32px - デスクトップ用見出し
      },
      lineHeight: 1.4, // 見出しらしい行間
      letterSpacing: "-0.01em", // 見出しに適した字間
      fontWeight: 600,
      mb: {
        base: `${letterSpacing.sm}px`, // 12px - 適度な間隔
        md: `${letterSpacing.base}px`, // 20px - ゆとりのある間隔
      },
    },

    body: {
      fontSize: {
        base: `${readableFontSizes.body.base}px`, // 16px - 読みやすい基本サイズ
        md: `${readableFontSizes.body.md}px`, // 18px - タブレット用
        lg: `${readableFontSizes.body.lg}px`, // 19px - デスクトップ用
      },
      lineHeight: { base: 1.75, md: 1.8 }, // 手紙らしいゆったりした行間
      letterSpacing: "0.018em", // 日本語に適した優しい字間
      mb: {
        base: `${letterSpacing.sm}px`, // 12px - 段落間の適度な余白
        md: `${letterSpacing.base}px`, // 20px - より余裕のある段落間隔
      },
    },

    caption: {
      fontSize: `${readableFontSizes.caption}px`, // 12px - キャプション
      lineHeight: 1.5,
      letterSpacing: "0.02em",
      opacity: 0.7,
    },
  },

  // フッター/アクション領域（自然な余白）
  footerSection: {
    mt: {
      base: `${letterSpacing.xl}px`, // 68px - 適度な区切り
      md: `${letterSpacing["2xl"]}px`, // 92px - より大きな区切り
    },
    pt: {
      base: `${letterSpacing.lg}px`, // 48px - 内側の余白
      md: `${letterSpacing.xl}px`, // 68px - より余裕のある内側余白
    },
    // borderは内容がある場合のみ適用
    _notEmpty: {
      borderTop: "1px solid rgba(244, 162, 97, 0.1)", // 温かみのあるボーダー
    },
  },

  // フッター（内容がある場合のみborder表示）
  footerWithContent: {
    mt: {
      base: `${letterSpacing.xl}px`, // 68px - 適度な区切り
      md: `${letterSpacing["2xl"]}px`, // 92px - より大きな区切り
    },
    pt: {
      base: `${letterSpacing.lg}px`, // 48px - 内側の余白
      md: `${letterSpacing.xl}px`, // 68px - より余裕のある内側余白
    },
    borderTop: "1px solid rgba(244, 162, 97, 0.1)",
    w: "100%",
    display: "flex",
    justifyContent: "center",
  },

  // アニメーション統一（自然で有機的な動き）
  animations: {
    // 心地よい遷移時間
    cssTransition: `all 0.48s cubic-bezier(0.19, 1, 0.32, 1)`,
    // やわらかなホバーエフェクト
    hover: {
      transform: "translateY(-2px) scale(1.012)", // 少し控えめに
      transition: "all 0.32s cubic-bezier(0.18, 0.98, 0.28, 1)",
    },
    // 自然なタップエフェクト
    tap: {
      scale: 0.98, // より自然な縮小
      transform: "scale(0.98) translateY(1px)",
      transition: "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.12s ease-out",
    },
  },
} as const;

/**
 * レスポンシブブレークポイント（自然な値）
 */
export const breakpoints = {
  sm: 480, // 小さなスマートフォン
  md: 768, // タブレット
  lg: 1024, // 小さなPC
  xl: 1280, // 標準的なPC
} as const;

/**
 * グリッドシステム（手紙らしい余白）
 */
export const gridSystem = {
  columns: 12,
  gutter: {
    base: `${letterSpacing.base}px`, // 20px - 基本の余白
    md: `${letterSpacing.md}px`, // 32px - タブレット用
    lg: `${letterSpacing.lg}px`, // 48px - デスクトップ用
  },
  margin: {
    base: `${letterSpacing.md}px`, // 32px - 外側余白
    md: `${letterSpacing.lg}px`, // 48px - タブレット外側余白
    lg: `${letterSpacing.xl}px`, // 68px - デスクトップ外側余白
  },
} as const;

/**
 * モバイルUX配慮
 */
export const mobileUXRules = {
  maxContentHeight: "50vh", // ビューポートの50%以下
  minTouchTarget: "56px", // より押しやすいタッチサイズ
  safeArea: {
    top: "env(safe-area-inset-top)",
    bottom: "env(safe-area-inset-bottom)",
    left: "env(safe-area-inset-left)",
    right: "env(safe-area-inset-right)",
  },
} as const;
