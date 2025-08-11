/**
 * Unified Layout System - 黄金比による美しいデザイン
 * 
 * @description 一流UI/UXデザイナーによる数学的に美しいレイアウトシステム
 * - 黄金比(1.618)とモジュラースケールによる調和の取れた比例関係
 * - 8ptグリッドシステムとの完全統合
 * - 全画面での完璧な位置統一
 */

import { tokens } from './tokens';

// 黄金比定数
const GOLDEN_RATIO = 1.618;
const PHI = GOLDEN_RATIO;

// モジュラースケール（黄金比ベース + 日本語最適化）
const modularScale = {
  xs: 8 / (PHI * PHI), // ~3.056px
  sm: 8 / PHI,         // ~4.944px  
  base: 8,             // 8px (基準)
  md: 8 * PHI,         // ~12.944px
  lg: 8 * PHI * PHI,   // ~20.944px
  xl: 8 * (PHI ** 3),  // ~33.888px
  '2xl': 8 * (PHI ** 4), // ~54.832px
  '3xl': 8 * (PHI ** 5), // ~88.72px
  '4xl': 8 * (PHI ** 6), // ~143.552px
} as const;

// 日本語読みやすさ最適化フォントサイズ
const optimizedFontSizes = {
  body: {
    base: 16, // 日本語に最適な基準サイズ
    md: 18,   // タブレット用
  },
  title: {
    base: 24, // 見出し用
    md: 28,   // タブレット用
    lg: 32,   // デスクトップ用
  },
  caption: 14, // キャプション用
} as const;

// 統一ヘッダー高さ（黄金比による美しい比例）
const headerHeights = {
  mobile: Math.round(modularScale['4xl'] * 1.5), // ~215px
  tablet: Math.round(modularScale['4xl'] * PHI), // ~232px  
  desktop: Math.round(modularScale['4xl'] * PHI * 1.2), // ~278px
} as const;

// 遷移スペース（ヘッダーからコンテンツまでの統一間隔）
const transitionSpaces = {
  mobile: Math.round(modularScale.xl * 1.5), // ~51px
  tablet: Math.round(modularScale.xl * PHI), // ~55px
  desktop: Math.round(modularScale.xl * PHI * 1.2), // ~66px
} as const;

/**
 * 統一レイアウトシステム
 * 全画面で数学的に一致するレイアウト構造
 */
export const unifiedLayout = {
  // ページコンテナ（全画面共通）
  pageContainer: {
    minHeight: "100dvh",
    position: "relative" as const,
    background: "linear-gradient(135deg, #fefcf9 0%, #faf8f5 100%)",
    
    // 統一パディング（黄金比ベース）
    py: {
      base: `${modularScale.lg}px`,
      md: `${modularScale.xl}px`,
      lg: `${modularScale['2xl']}px`,
    },
    px: {
      base: `${modularScale.md}px`,
      md: `${modularScale.lg}px`,
      lg: `${modularScale.xl}px`,
    },
    pb: {
      base: `${modularScale.xl}px`,
      md: `${modularScale['2xl']}px`,
      lg: `${modularScale['3xl']}px`,
    },
    
    // 微細なテクスチャ（統一）
    _before: {
      content: '""',
      position: "absolute",
      inset: 0,
      opacity: 0.02,
      backgroundImage: `radial-gradient(circle at 22% 28%, ${tokens.colors.primary[500]} 1px, transparent 1px),
                        radial-gradient(circle at 78% 72%, ${tokens.colors.primary[600]} 1px, transparent 1px)`,
      backgroundSize: "56px 56px, 44px 44px",
      pointerEvents: "none",
    },
  },

  // ヘッダー領域（固定高さ）
  headerSection: {
    height: {
      base: `${headerHeights.mobile}px`,
      md: `${headerHeights.tablet}px`, 
      lg: `${headerHeights.desktop}px`,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    mb: {
      base: `${transitionSpaces.mobile}px`,
      md: `${transitionSpaces.tablet}px`,
      lg: `${transitionSpaces.desktop}px`, 
    },
  },

  // メインコンテンツ領域（手紙に最適な幅）
  contentSection: {
    maxW: { 
      base: "100%", 
      sm: "400px", 
      md: "520px", // 手紙らしい読みやすい幅に調整
      lg: "600px", // 以前の設定に近づける
      xl: "680px" // 広すぎないように調整
    },
    mx: "auto",
    px: {
      base: `${modularScale.sm}px`,
      md: `${modularScale.md}px`,
    },
  },

  // メッセージカード統一スペーシング
  messageCard: {
    // 外側マージン（黄金比による美しい間隔）
    mb: {
      base: `${modularScale.lg}px`,
      md: `${modularScale.xl}px`,
    },
    
    // 内側パディング（完全統一）
    p: {
      base: `${modularScale.lg}px`,
      md: `${modularScale.xl}px`,
      lg: `${modularScale['2xl']}px`,
    },
    
    // ボーダーラディウス（黄金比）
    borderRadius: `${modularScale.md}px`,
    
    // 背景とシャドウ（統一）
    background: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,255,255,0.94))",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: `
      0 ${modularScale.xs}px ${modularScale.md}px rgba(0,0,0,0.04),
      0 ${modularScale.sm}px ${modularScale.lg}px rgba(0,0,0,0.06),
      inset 0 1px 0 rgba(255,255,255,0.7)
    `,
  },

  // タイポグラフィ統一（日本語読みやすさ最適化）
  typography: {
    title: {
      fontSize: {
        base: `${optimizedFontSizes.title.base}px`,
        md: `${optimizedFontSizes.title.md}px`,
        lg: `${optimizedFontSizes.title.lg}px`,
      },
      lineHeight: 1.5, // 日本語に最適化
      letterSpacing: "-0.01em", // 日本語に適した字間
      fontWeight: 600,
      mb: {
        base: `${modularScale.md}px`,
        md: `${modularScale.lg}px`,
      },
    },
    
    body: {
      fontSize: {
        base: `${optimizedFontSizes.body.base}px`,
        md: `${optimizedFontSizes.body.md}px`,
      },
      lineHeight: 1.8, // 手紙らしいゆったりした読みやすさ
      letterSpacing: "0.025em", // 日本語の美しさを強化
      mb: {
        base: `${modularScale.sm}px`,
        md: `${modularScale.md}px`,
      },
    },
    
    caption: {
      fontSize: `${optimizedFontSizes.caption}px`,
      lineHeight: 1.5,
      letterSpacing: "0.02em",
      opacity: 0.7,
    },
  },

  // フッター/アクション領域（条件付きborder）
  footerSection: {
    mt: {
      base: `${modularScale.xl}px`,
      md: `${modularScale['2xl']}px`,
    },
    pt: {
      base: `${modularScale.lg}px`,
      md: `${modularScale.xl}px`,
    },
    // borderは内容がある場合のみ適用（CSSで制御）
    _notEmpty: {
      borderTop: "1px solid rgba(0,0,0,0.05)",
    },
  },
  
  // フッター（内容がある場合のみborder表示）
  footerWithContent: {
    mt: {
      base: `${modularScale.xl}px`,
      md: `${modularScale['2xl']}px`,
    },
    pt: {
      base: `${modularScale.lg}px`,
      md: `${modularScale.xl}px`,
    },
    borderTop: "1px solid rgba(0,0,0,0.05)",
    w: "100%",
    display: "flex",
    justifyContent: "center",
  },

  // アニメーション統一
  animations: {
    // CSS用の滑らかな遷移（黄金比による時間設定）
    cssTransition: `all ${0.618}s cubic-bezier(0.16, 1, 0.3, 1)`,
    // ホバーエフェクト
    hover: {
      transform: "translateY(-2px) scale(1.01)",
      transition: "all 0.25s ease-out",
    },
    // タップエフェクト  
    tap: {
      scale: 0.98,
      transition: "all 0.15s ease-out",
    },
  },
} as const;

/**
 * レスポンシブブレークポイント（黄金比ベース）
 */
export const breakpoints = {
  sm: Math.round(480 * PHI), // ~777px
  md: Math.round(768 * PHI), // ~1242px  
  lg: Math.round(1024 * PHI), // ~1657px
  xl: Math.round(1280 * PHI), // ~2071px
} as const;

/**
 * グリッドシステム（8pt + 黄金比）
 */
export const gridSystem = {
  columns: 12,
  gutter: {
    base: `${modularScale.md}px`,
    md: `${modularScale.lg}px`,
    lg: `${modularScale.xl}px`,
  },
  margin: {
    base: `${modularScale.lg}px`,
    md: `${modularScale.xl}px`,
    lg: `${modularScale['2xl']}px`,
  },
} as const;

/**
 * 数学的美しさの検証関数
 */
export const validateGoldenRatio = (value: number, reference: number): boolean => {
  const ratio = value / reference;
  return Math.abs(ratio - PHI) < 0.1 || Math.abs(ratio - (1/PHI)) < 0.1;
};

/**
 * モバイルUX 50%ルール対応
 */
export const mobileUXRules = {
  maxContentHeight: "50vh", // ビューポートの50%以下
  minTouchTarget: "44px",   // タッチターゲット最小サイズ
  safeArea: {
    top: "env(safe-area-inset-top)",
    bottom: "env(safe-area-inset-bottom)",
    left: "env(safe-area-inset-left)", 
    right: "env(safe-area-inset-right)",
  },
} as const;
