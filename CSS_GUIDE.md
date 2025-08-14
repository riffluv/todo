# CSS設計・開発ガイド v2.0 (2025年版)

## 🎯 2025年CSS設計方針

### 🏗️ アーキテクチャ原則
- **Design Tokens First**: すべてのスタイルはトークンから
- **Component-Driven**: 完全分離されたコンポーネント設計
- **Mobile-First + Progressive Enhancement**: モバイル最優先
- **Accessibility-First**: WCAG 2.2 AA完全準拠
- **Performance-First**: Core Web Vitals最適化
- **Type-Safe**: TypeScript完全対応

### 🎨 スタイル記述ルール
```typescript
// ✅ Good: Design Tokensを使用
<Box {...componentStyles.messageCard.container} />

// ❌ Bad: 直接値を指定
<Box bg="#f97316" p="16px" />

## 🛠 Chakra UI v3 ベストプラクティス

### 📦 コンポーネント設計
```typescript
// ✅ 推奨: トークンベース設計
const buttonStyles = {
  bg: tokens.colors.primary[500],
  color: 'white',
  px: tokens.spacing.lg,
  py: tokens.spacing.md,
  borderRadius: tokens.radii.md,
  fontSize: tokens.typography.fontSizes.md,
  fontWeight: tokens.typography.fontWeights.semibold
};

// ❌ 非推奨: 直接値指定
<Button bg="orange.500" px="24px" py="12px" />
```

### 🎭 テーマシステム活用
```typescript
// ✅ テーマベース設計（Todoアプリでは home テーマを使用）
<Box {...themes.home.background} />

// ❌ 個別スタイル指定（条件分岐で個別名に依存しない）
<Box bg="gray.50" />
```

## 🖼️ 2025年画像・メディア最適化

### 📱 高解像度対応
```typescript
// ✅ Next.js Image最適化
<Image
  src="/image.jpg"
  alt="説明"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ✅ SVGアイコン使用
<Icon as={FaEnvelope} boxSize={tokens.spacing.lg} />
```

### 🎭 アニメーション設計（2025年版）
```typescript
// ✅ Reduced Motion対応
const animation = a11y.prefersReducedMotion() 
  ? tokens.animations.reducedMotion
  : tokens.animations.normal;

// ✅ GPU加速対応
<MotionBox
  {...performance.gpuAcceleration}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: animation.duration }}
/>
```

## 🚀 パフォーマンス最適化

### ⚡ Core Web Vitals対応
```typescript
// ✅ レイアウトシフト防止
<Box {...performance.layoutStable}>
  <Image {...performance.imageOptimization} />
</Box>

// ✅ フォント最適化
<Text {...performance.fontOptimization}>
  テキスト内容
</Text>
```

### 🔒 セキュリティ対応
```typescript
// ✅ CSP準拠
const secureStyles = {
  ...componentStyles.messageCard.container,
  // インラインスタイル最小化
};

// ✅ XSS防止
const sanitizedContent = DOMPurify.sanitize(userContent);
```

## 🌐 アクセシビリティ（WCAG 2.2 AA）

### ♿ 必須対応項目
```typescript
// ✅ フォーカス管理
<Button {...a11y.focusRing}>
  ボタン
</Button>

// ✅ タッチターゲット
<TouchableBox {...a11y.touchTarget}>
  タッチ可能エリア
</TouchableBox>

// ✅ スクリーンリーダー対応
<Text {...a11y.srOnly}>
  スクリーンリーダー専用テキスト
</Text>
```

## 🔧 開発・デバッグ Tips

### 🛠️ 開発効率化
```typescript
// ✅ 型安全なスタイル
const styles: ComponentStyles = {
  container: componentStyles.messageCard.container,
  text: componentStyles.messageCard.text.primary
};

// ✅ 条件付きスタイル
const dynamicStyles = useMemo(() => ({
  ...baseStyles,
  ...(isActive && activeStyles),
  ...(isDisabled && disabledStyles)
}), [isActive, isDisabled]);
```

### 🐛 デバッグ支援
```typescript
// ✅ 開発時のスタイルデバッグ
if (process.env.NODE_ENV === 'development') {
  console.log('Applied styles:', styles);
}

// ✅ パフォーマンス監視
const observer = new PerformanceObserver((list) => {
  // CLS, LCP, FID監視
});
```

## 📋 チェックリスト

### ✅ 実装前チェック
- [ ] Design Tokensを使用しているか
- [ ] レスポンシブ対応は適切か
- [ ] アクセシビリティ要件を満たしているか
- [ ] パフォーマンス影響を考慮したか
- [ ] 型安全性は確保されているか

### ✅ リリース前チェック
- [ ] Core Web Vitalsスコア確認
- [ ] アクセシビリティテスト実行
- [ ] 複数デバイスでの動作確認
- [ ] パフォーマンス回帰テスト
- [ ] セキュリティ脆弱性チェック

---

## 🎯 2025年開発哲学

このガイドは、**技術的卓越性**と**ユーザー体験**を両立させ、**持続可能な開発**を実現するための指針です。

### 💎 品質への取り組み
- 最新Web標準の積極的採用
- アクセシビリティファースト設計
- パフォーマンス最適化の徹底
- 開発者体験の最大化
