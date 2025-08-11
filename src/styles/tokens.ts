/**
 * Design Tokens - 手紙アプリのための心温まるデザインシステム
 *
 * 感謝の気持ちを大切にしながら、読みやすさとアクセシビリティを
 * バランス良く組み合わせた、人の心に寄り添うデザインを目指しています。
 */
export const tokens = {
  /**
   * カラーパレット - 手紙に込めた想いを表現する色たち
   *
   * WCAG AA準拠を保ちながら、温かみのある色合いを選びました。
   * 感謝の気持ちが自然に伝わるような、やわらかな印象を大切にしています。
   */
  colors: {
    primary: {
      50: "#fff8f1", // やさしい手紙用紙のような白
      100: "#ffecda", // ほんのり温かみのあるクリーム
      200: "#ffd8b6", // 午後のやわらかな陽だまり
      300: "#ffc18a", // 心地よい秋の夕暮れ
      400: "#ffaa5e", // やさしい感謝の色合い
      500: "#f97316", // メインのしっかりとしたオレンジ色（元に戻す）
      600: "#ea580c", // 深みのある感謝の色
      700: "#c2410c", // 落ち着いた温かみ
      800: "#b8623a", // しっとりとした茶色
      900: "#9e4f2e", // 深い感謝の念
    },
    gray: {
      50: "#fdfcfb", // 手紙用紙のような温かい白
      100: "#f8f6f4", // やわらかなベージュがかった白
      200: "#efebe7", // 上質な便箋のような色
      300: "#d9d5d1", // やさしいグレー
      400: "#a8a4a0", // 読みやすい中間色
      500: "#6d6a66", // 落ち着いた文字色
      600: "#524f4c", // しっかりとした文字色
      700: "#3a3834", // 深みのある文字色
      800: "#2a2824", // より深い文字色
      900: "#1c1a18", // 最も濃い文字色
    },
    semantic: {
      background: "#fefcf8", // 手紙全体の背景（より温かく）
      surface: "rgba(255, 255, 255, 0.92)", // カード背景（少し温かみを加えて）
      border: "rgba(209, 120, 66, 0.12)", // ボーダー（温かみのある色に）
      text: {
        primary: "#2a2824", // メイン文字（やわらかい黒に）
        secondary: "#524f4c", // セカンダリ文字（読みやすく）
        muted: "#6d6a66", // 控えめな文字色
      },
      fg: "#1c1a18",
      muted: "#6d6a66",
      subtle: "#a8a4a0",
      emphasized: "#2a2824",
      focusRing: "#f97316",
    },
  },

  // 文字まわりの設定 - 手紙らしい読みやすさを追求
  typography: {
    fontFamilies: {
      // 日本語の手紙にぴったりの、温かみのあるフォント設定
      heading:
        '"Inter", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", sans-serif',
      body: '"Inter", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", sans-serif',
      // 特別な場面で使う、手書きのような親しみやすさ
      handwritten: '"Klee One", "Hiragino Kaku Gothic ProN", cursive, sans-serif',
    },
    fontSizes: {
      xs: "11px", // 小さな注記用（少し読みやすくしました）
      sm: "13px", // 日付などの補助情報
      md: "16px", // 基本の文字サイズ
      lg: "18px", // 少し大きめの本文（手紙らしく）
      xl: "22px", // 小見出しサイズ（優しい印象に）
      "2xl": "28px", // 大きな見出し
      "3xl": "36px", // 特別な場面用
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25, // 見出し用（少しゆとりを）
      normal: 1.65, // 基本（読みやすく）
      relaxed: 1.8, // 手紙本文用（ゆったりと）
      loose: 1.9, // とてもゆったりとした行間
    },
    letterSpacings: {
      tight: "-0.02em", // 見出し用
      normal: "0", // 標準
      wide: "0.015em", // 日本語に適した微調整
      wider: "0.025em", // より開放的な印象
      widest: "0.04em", // 特別な強調用
    },
  },

  // 空間の使い方 - 心地よいリズムを意識した余白
  spacing: {
    xs: "6px", // 少し大きめに（優しい印象に）
    sm: "10px", // 規則的でない、人間らしい数値
    md: "18px", // 基本の余白（読みやすさを重視）
    lg: "28px", // ゆとりのある余白
    xl: "38px", // 大きめの余白（手紙らしい贅沢さ）
    "2xl": "52px", // とても大きな余白
    "3xl": "68px", // セクション区切り用
    "4xl": "88px", // 大きな区切り
    "5xl": "112px", // 特別な場面用
    "6xl": "148px", // より印象的な空間
    "7xl": "192px", // 最大の余白
  },

  // モバイルでの使いやすさ - 指でタッチしやすいサイズ感
  mobile: {
    touchTarget: "56px", // より押しやすく（Apple推奨に近く）
    characterSize: {
      sm: "128px", // キャラクター画像（少し大きく）
      md: "148px", // 中サイズ
      lg: "168px", // 大きなサイズ
    },
    safeArea: {
      top: "48px", // セーフエリア（余裕をもって）
      bottom: "38px",
    },
    // 手紙らしい文字間隔
    letterSpacing: {
      comfortable: "0.018em", // 心地よい間隔
      relaxed: "0.028em", // よりゆったりと
    },
  },

  // フォーカス表示 - アクセシビリティを大切に
  focus: {
    ring: {
      color: "#f4a261", // 温かみのある色
      width: "2px",
      offset: "3px",
      style: "solid",
      shadow: "0 0 0 4px rgba(244, 162, 97, 0.28)", // 少し優しく
    },
    background: {
      light: "rgba(244, 162, 97, 0.08)",
      medium: "rgba(244, 162, 97, 0.14)",
    },
  },

  // 角の丸み - やわらかな印象を大切に
  radii: {
    sm: "5px", // 少し丸く（優しい印象）
    md: "9px", // 基本の丸み
    lg: "14px", // やわらかな印象
    xl: "19px", // とても丸い
    full: "9999px",
  },

  // 影の表現 - 奥行きと立体感を自然に
  shadows: {
    sm: "0 1px 3px rgba(28, 26, 24, 0.08)", // やさしい影
    md: "0 4px 12px rgba(28, 26, 24, 0.12)", // 基本の影
    lg: "0 8px 24px rgba(244, 162, 97, 0.18)", // 温かみのある影
    xl: "0 16px 32px rgba(28, 26, 24, 0.15)", // 大きな影
    bear: "drop-shadow(0 1px 2px rgba(28, 26, 24, 0.25)) drop-shadow(0 1px 4px rgba(244, 162, 97, 0.15))",

    // 特別な表現技法
    neumorphism: {
      raised: "6px 6px 12px rgba(163, 177, 198, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.7)",
      pressed:
        "inset 4px 4px 8px rgba(163, 177, 198, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.7)",
      floating: "0 8px 28px rgba(244, 162, 97, 0.25)",
    },
    glass: "0 8px 28px rgba(244, 162, 97, 0.2)",
  },

  /**
   * アニメーション設定 - 自然で心地よい動きを
   *
   * 手紙を読む時のような、ゆったりとした時間の流れを
   * アニメーションでも表現したいと思います。
   */
  animations: {
    durations: {
      instant: "0.02s", // 瞬時の反応
      fastest: "0.08s", // 最速フィードバック
      fast: "0.12s", // 素早い動き（一流基準）
      normal: "0.2s", // 基本の速度（Apple/Google標準）
      slow: "0.3s", // ゆったりとした動き
      slower: "0.4s", // より穏やかな動き
      slowest: "0.5s", // 最も穏やかな動き
    },
    easings: {
      // 一流デザイン基準（オーバーシュート完全排除）
      easeOut: "cubic-bezier(0.25, 0.8, 0.25, 1)", // Material Design ease-out
      easeIn: "cubic-bezier(0.55, 0.055, 0.675, 0.19)", // Material Design ease-in
      easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)", // Material Design ease-in-out
      // Apple HIG & Google準拠
      emphasized: "cubic-bezier(0.4, 0, 0.2, 1)", // Material emphasized motion
      standard: "cubic-bezier(0.4, 0.0, 0.2, 1)", // Google標準
      decelerated: "cubic-bezier(0.0, 0.0, 0.2, 1)", // 減速重視
      accelerated: "cubic-bezier(0.4, 0.0, 1, 1)", // 加速重視
      // 安定した自然な動き
      gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // 穏やかで確実
      warm: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // 温かみがあり安定
      crisp: "cubic-bezier(0.4, 0, 0.6, 1)", // きれのある動き
    },
    // アクセシビリティ対応
    reducedMotion: {
      duration: "0.02s",
      easing: "linear",
    },
  },

  // 画面サイズ対応 - どの端末でも読みやすく
  breakpoints: {
    base: "0px",
    sm: "480px", // 小さなスマートフォン
    md: "768px", // タブレット
    lg: "1024px", // 小さなPC（少し調整）
    xl: "1280px", // 標準的なPC
    "2xl": "1536px", // 大きなディスプレイ
  },

  /**
   * 2025年最新CSS機能対応
   */
  modern: {
    // CSS Container Queries対応
    containerQueries: {
      card: "(min-width: 300px)",
      sidebar: "(min-width: 250px)",
      main: "(min-width: 600px)",
    },

    // CSS Grid最新機能
    grid: {
      autoFit: "repeat(auto-fit, minmax(280px, 1fr))",
      autoFill: "repeat(auto-fill, minmax(280px, 1fr))",
      subgrid: "subgrid",
    },

    // CSS Logical Properties
    logical: {
      inlineStart: "margin-inline-start",
      inlineEnd: "margin-inline-end",
      blockStart: "margin-block-start",
      blockEnd: "margin-block-end",
    },

    // CSS Cascade Layers
    layers: {
      reset: "@layer reset",
      base: "@layer base",
      components: "@layer components",
      utilities: "@layer utilities",
    },
  },
} as const;

/**
 * 2025年アクセシビリティ対応ユーティリティ
 * WCAG 2.2 AA完全準拠
 */
export const a11y = {
  // Media Queries対応
  prefersReducedMotion: () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,

  prefersHighContrast: () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-contrast: high)").matches,

  prefersColorScheme: () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches,

  prefersReducedData: () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-data: reduce)").matches,

  // Focus管理（2025年強化版）
  focusRing: {
    outline: `2px solid ${tokens.colors.primary[500]}`,
    outlineOffset: "2px",
    borderRadius: tokens.radii.sm,
    // Focus-visible対応
    "&:focus-visible": {
      outline: `3px solid ${tokens.colors.primary[500]}`,
      outlineOffset: "2px",
    },
  },

  // タッチターゲット（WCAG 2.2対応）
  touchTarget: {
    minWidth: "44px",
    minHeight: "44px",
    // iOS Safari対応
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  },

  // スクリーンリーダー対応
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0",
  },

  // 色覚対応（コントラスト比保証）
  colorBlind: {
    // 4.5:1以上のコントラスト比を保証
    textOnPrimary: tokens.colors.gray[900],
    textOnSecondary: tokens.colors.gray[800],
    textOnBackground: tokens.colors.gray[900],
  },
} as const;

/**
 * 型安全なトークンアクセス用のヘルパー
 * 2025年TypeScript 5.x対応
 */
export type ColorToken = keyof typeof tokens.colors.primary | keyof typeof tokens.colors.gray;
export type SpacingToken = keyof typeof tokens.spacing;
export type RadiusToken = keyof typeof tokens.radii;
export type AnimationToken = keyof typeof tokens.animations.durations;
/**
 
* 2025年パフォーマンス最適化ユーティリティ
 * Core Web Vitals対応
 */
export const performance = {
  // GPU加速対応
  gpuAcceleration: {
    transform: "translateZ(0)",
    willChange: "transform",
    backfaceVisibility: "hidden",
  },

  // レイアウトシフト防止
  layoutStable: {
    containIntrinsicSize: "auto 300px",
    contentVisibility: "auto",
  },

  // 画像最適化
  imageOptimization: {
    loading: "lazy" as const,
    decoding: "async" as const,
    fetchPriority: "low" as const,
  },

  // フォント最適化
  fontOptimization: {
    fontDisplay: "swap",
    fontOpticalSizing: "auto",
  },
} as const;

/**
 * 2025年セキュリティ対応
 */
export const security = {
  // CSP対応
  contentSecurityPolicy: {
    "img-src": "'self' data: https:",
    "font-src": "'self' https:",
    "style-src": "'self' 'unsafe-inline'",
  },

  // XSS防止
  sanitization: {
    allowedTags: ["p", "br", "strong", "em"],
    allowedAttributes: {},
  },
} as const;
