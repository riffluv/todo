/**
 * Component Styles Index
 * 
 * @description 分割されたコンポーネントスタイルの統合
 */

import { animationStyles } from './animations';
import { buttonStyles } from './button';
import { messageCardStyles } from './messageCard';
import { pageStyles } from './page';

/**
 * 統合されたコンポーネントスタイル
 * 
 * 各モジュールから必要なスタイルを組み合わせて、
 * 従来のcomponentStylesと同じインターフェースを提供
 */
export const componentStyles = {
  // ページレイアウト
  page: pageStyles,

  // メッセージカード
  messageCard: messageCardStyles,

  // ボタンスタイル
  button: buttonStyles,

  // アニメーション設定
  animations: animationStyles,

  // 熊さんアイコン
  bearIcon: {
    main: {
      size: 24,
      imageSize: 16,
      position: { top: '-12px', left: '50%', transform: 'translateX(-50%)' }
    },
    side: {
      size: 20,
      imageSize: 14,
      opacity: 0.7,
      display: { base: 'none', md: 'flex' }
    }
  }
} as const;