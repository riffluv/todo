/**
 * Page Layout Component Styles - 統一レイアウトシステム対応
 *
 * @description 黄金比による数学的に美しいページレイアウト
 * 全画面で完璧に統一されたスペーシングと比例関係
 */

import { unifiedLayout } from "../layout";
import { tokens } from "../tokens";

export const pageStyles = {
  // 統一ページコンテナ（全画面共通）
  container: {
    ...unifiedLayout.pageContainer,
  },
  
  // コンテンツ領域（統一サイズ制限）
  content: {
    ...unifiedLayout.contentSection,
    display: "flex",
    flexDirection: "column" as const,
    gap: {
      base: "16px", // より親しみやすい間隔
      md: "24px",   // 手紙らしい温かみのある間隔
      lg: "32px",   // 適度な余白で読みやすさを保持
    },
    align: "center" as const,
    w: "100%",
  },
  
  // ヘッダーセクション（固定高さ）
  header: {
    ...unifiedLayout.headerSection,
  },
  
  // メインコンテンツセクション
  main: {
    flex: 1,
    w: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: {
      base: "21px",
      md: "34px",
    },
  },
  
  // フッターセクション（空の場合はborderなし）
  footer: {
    ...unifiedLayout.footerSection,
  },
  
  // フッター（コンテンツありの場合はborderあり）
  footerWithContent: {
    ...unifiedLayout.footerWithContent,
  },
} as const;
