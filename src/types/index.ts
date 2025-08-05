// =============================================================================
// 感謝のメッセージアプリ - TypeScript型定義
// Professional type definitions for the application
// =============================================================================

import { IconType } from "react-icons";

/**
 * カラーモード型
 */
export type ColorMode = "light" | "dark";

/**
 * テーマ関連の型
 */
export interface ThemeConfig {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

/**
 * 機能カード型
 */
export interface FeatureCard {
  icon: IconType | string;
  title: string;
  description: string;
  color: string;
}

/**
 * 技術スタック型
 */
export interface TechStack {
  name: string;
  color: string;
}

/**
 * アニメーション設定型
 */
export interface AnimationConfig {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  transition: Record<string, unknown>;
}

/**
 * ユーザー情報型
 */
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * メッセージ型
 */
export interface Message {
  id: string;
  title: string;
  content: string;
  recipientName: string;
  senderName: string;
  theme: "gratitude" | "appreciation" | "thanks" | "custom";
  style: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * メッセージテンプレート型
 */
export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  category: "business" | "personal" | "family" | "friends";
  content: string;
  style: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
  preview: string;
  isPopular: boolean;
}

/**
 * API レスポンス型
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * ページプロパティ型
 */
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}

/**
 * レイアウトプロパティ型
 */
export interface LayoutProps {
  children: React.ReactNode;
  params?: Record<string, string>;
}

/**
 * フォーム型
 */
export interface MessageFormData {
  recipientName: string;
  senderName: string;
  title: string;
  content: string;
  theme: Message["theme"];
  isPublic: boolean;
}

/**
 * フォームエラー型
 */
export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * アプリケーション状態型
 */
export interface AppState {
  user: User | null;
  messages: Message[];
  currentMessage: Message | null;
  loading: boolean;
  error: string | null;
  theme: ColorMode;
}

/**
 * コンポーネントプロパティ型
 */
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * ボタンプロパティ型
 */
export interface ButtonProps extends ComponentProps {
  variant?: "solid" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  colorScheme?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick?: () => void;
}

/**
 * カードプロパティ型
 */
export interface CardProps extends ComponentProps {
  variant?: "elevated" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  direction?: "row" | "column";
}

/**
 * 入力フィールドプロパティ型
 */
export interface InputProps extends ComponentProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * ナビゲーション項目型
 */
export interface NavigationItem {
  label: string;
  href: string;
  icon?: IconType;
  isActive?: boolean;
  children?: NavigationItem[];
}

/**
 * メニュー項目型
 */
export interface MenuItem {
  label: string;
  value: string;
  icon?: IconType;
  isDisabled?: boolean;
}

/**
 * 通知型
 */
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
  isClosable?: boolean;
}

/**
 * ローディング状態型
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

/**
 * 設定型
 */
export interface AppSettings {
  theme: ColorMode;
  language: "ja" | "en";
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    profileVisible: boolean;
    messagesPublic: boolean;
  };
}

/**
 * ファイルアップロード型
 */
export interface FileUpload {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

/**
 * 検索フィルター型
 */
export interface SearchFilters {
  query?: string;
  category?: string;
  theme?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: "date" | "title" | "popularity";
  sortOrder?: "asc" | "desc";
}

// =============================================================================
// ユーティリティ型
// =============================================================================

/**
 * オプショナル型ヘルパー
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 必須型ヘルパー
 */
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * ID付き型ヘルパー
 */
export type WithId<T> = T & { id: string };

/**
 * タイムスタンプ付き型ヘルパー
 */
export type WithTimestamp<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

/**
 * ページネーション型
 */
export type Paginated<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
