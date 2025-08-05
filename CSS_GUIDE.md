# CSS 設計・Chakra UI 運用ガイド

## 🎨 CSS 設計方針

- モバイルファーストで設計・実装する
- コンポーネント単位でスタイルを管理（グローバル CSS は最小限）
- Chakra UI の props 中心でカスタマイズ
- 必要に応じて`globals.css`で全体調整
- 競合や上書きが起きやすい`!important`は原則禁止
- デザインや UI/UX は何度も見直す前提で、柔軟にリファクタリングできる構成に

## 🛠 Chakra UI ベストプラクティス

- できるだけ Chakra の props で完結させる
- カスタム theme で色・フォント・余白を統一
- レスポンシブ props（`base`, `md`, `lg`など）を活用
- `sx`や`css` props は最小限に
- アクセシビリティ props（`aria-`系）も意識
- カスタムコンポーネントは`/components/ui/`配下にまとめる

## � DPI スケール・高解像度対応

- Next.js の Image コンポーネントを使用（自動最適化）
- `sizes` 属性でレスポンシブ画像を適切に指定
- SVG ロゴやアイコンは可能な限り使用（スケーラブル）
- CSS の `object-fit: contain` で画像の比率を保持
- Retina ディスプレイ対応は Next.js Image が自動で処理

## 🎭 ローディング画面設計

- フルスクリーン表示（`position: fixed`, `z-index: 9999`）
- アニメーション時間は 2-4 秒程度（長すぎず短すぎず）
- モバイルでタップされても反応しないよう `pointer-events: none` を適用
- ロゴのサイズはレスポンシブ対応（モバイル 280px → デスクトップ 480px）
- フェードイン・アウトは Framer Motion で滑らかに

## �💡 その他 Tips

- 余白・フォントサイズは theme token で統一
- グローバル CSS はリセットや最低限の調整のみ
- 必要なら emotion や styled-components も併用 OK（Chakra と競合しない範囲で）
- デザイン競合や上書きが起きた場合は、props や theme の見直しで解決する
- 変更・リファクタ時は影響範囲を意識して小さくまとめる

---

このガイドは、何度も UI/UX を見直す前提で、柔軟かつ安全に CSS・デザインを管理するためのルールです。
