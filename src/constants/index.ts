// =============================================================================
// 感謝のメッセージアプリ - アプリケーション定数
// VimApp inspired professional constants
// =============================================================================

/**
 * カラーパレット - VimAppのプロフェッショナルなダークテーマを参考
 */
export const COLORS = {
  // プライマリカラー (オレンジアクセント)
  primary: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },

  // セカンダリカラー (ピンク/パープル)
  secondary: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },

  // VimApp風ダークテーマ
  dark: {
    bg: "#0a0a0a",
    surface: "#1a1a1a",
    border: "#2d2d2d",
    text: "#ffffff",
    textSecondary: "#a0a0a0",
    accent: "#fd7f28",
  },

  // ライトテーマ
  light: {
    bg: "#ffffff",
    surface: "#f8f9fa",
    border: "#e9ecef",
    text: "#212529",
    textSecondary: "#6c757d",
    accent: "#ec4899",
  },
} as const;

/**
 * タイポグラフィ設定
 */
export const TYPOGRAPHY = {
  fonts: {
    heading:
      '"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Geist Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

/**
 * スペーシング設定
 */
export const SPACING = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
  "5xl": "8rem",
} as const;

/**
 * ブレークポイント設定
 */
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * アニメーション設定
 */
export const ANIMATIONS = {
  // 共通アニメーション設定
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },

  // イージング関数
  easing: {
    easeInOut: [0.4, 0, 0.2, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
  },

  // フェードイン設定
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },

  // スケールアニメーション
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 },
  },

  // スライドイン
  slideIn: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 },
  },
} as const;

/**
 * アプリケーション設定
 */
export const APP_CONFIG = {
  name: "感謝のメッセージアプリ",
  description:
    "大切な人に心からの感謝を伝える、特別なメッセージアプリケーション",
  version: "1.0.0",
  author: "ManabyThanksApp Team",

  // メタデータ
  meta: {
    title: "感謝のメッセージアプリ",
    description:
      "大切な人に心からの感謝を伝える、特別なメッセージアプリケーション",
    keywords: ["感謝", "メッセージ", "Next.js", "Chakra UI", "TypeScript"],
  },

  // ソーシャルメディア
  social: {
    github: "#",
    twitter: "#",
  },
} as const;

/**
 * UI設定
 */
export const UI_CONFIG = {
  // ボーダー半径
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },

  // シャドウ
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },

  // グラデーション
  gradients: {
    primary: "linear(to-r, orange.400, yellow.400)",
    secondary: "linear(to-r, pink.500, purple.500)",
    dark: "linear(to-br, gray.900, black)",
    light: "linear(to-br, blue.50, purple.50)",
  },
} as const;

/**
 * 技術スタック情報
 */
export const TECH_STACK = [
  { name: "Next.js 15", color: "gray.600" },
  { name: "TypeScript", color: "blue.500" },
  { name: "Chakra UI", color: "teal.500" },
  { name: "Framer Motion", color: "purple.500" },
  { name: "React Icons", color: "orange.500" },
] as const;

/**
 * 機能一覧
 */
export const FEATURES = [
  {
    icon: "FaHeart",
    title: "心からの感謝",
    description: "あなたの大切な人への感謝の気持ちを込めて",
    color: "pink.500",
  },
  {
    icon: "FaGift",
    title: "特別なメッセージ",
    description: "技術とデザインで想いを美しく表現",
    color: "purple.500",
  },
  {
    icon: "FaStar",
    title: "プロフェッショナル",
    description: "Next.js + Chakra UIの最新技術を使用",
    color: "orange.500",
  },
] as const;
