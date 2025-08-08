# Manaby Thanks App – 2025 リファクタリング指針（要約）

- 目的: 温かい手紙感を維持しつつ、拡張性・一貫性・可読性を2025水準へ。
- CSS: `src/styles/tokens.css` にデザイントークン、`src/styles/layers.css` に @layer 階層。CUBE/Block指向で分割。
- TypeScript: `tsconfig.json` を厳格化（exactOptionalPropertyTypes 等）。
- UI抽象: `MessageCard`/`CircleButton`/`LetterLayout` を基礎部品に。
- テスト: Vitest + RTL, Playwright, axe をCIで実行（雛形）。

## ディレクトリ構成（抜粋）

- src/app … RSCルーティング
- src/components … 再利用UI（ui/, layouts/）
- src/features/letters … 画面/ロジック（今後移行）
- src/styles … tokens.css / layers.css / TSトークン
- src/tests … 単体・e2e・a11y テスト

## アクセシビリティ

- フォーカスリングはトークンで一貫（--color-focus）
- ログ領域 aria-live="polite" を想定（今後Listに適用）

## パフォーマンス

- 初期JSの抑制 / next/image のsizes最適化 / Analytics有効化を推奨

## 使い方

- `npm run dev` 開発、`npm run build` 本番、`npm run ci` CI一括
- `npm run test` 単体、`npm run test:e2e` E2E、`npm run test:a11y` a11y

---

本ドキュメントは段階PR: 1) CSS基盤 → 2) UI抽象 → 3) 画面適用 → 4) パフォ/アクセ の順で適宜更新します。
