/**
 * Message Card Component Styles
 * 
 * @description メッセージカード専用のスタイル定義
 */

import { tokens } from '../tokens';

export const messageCardStyles = {
  container: {
    // 洗練されたグラスモーフィズム風デザイン
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85)),
      linear-gradient(45deg, ${tokens.colors.primary[50]}40, transparent 60%)
    `,
    backdropFilter: 'blur(20px)',
    borderRadius: tokens.radii.xl,
    p: {
      base: tokens.spacing.xl,
      md: tokens.spacing['2xl']
    },
    border: '1px solid',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative' as const,
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.08),
      0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`,
    // エレガントなホバー効果
    _hover: {
      transform: 'translateY(-4px) scale(1.01)',
      boxShadow: `
        0 16px 48px rgba(0, 0, 0, 0.12),
        0 0 0 1px ${tokens.colors.primary[500]}20,
        inset 0 1px 0 rgba(255, 255, 255, 0.9)
      `,
      background: `
        linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9)),
        linear-gradient(45deg, ${tokens.colors.primary[100]}60, transparent 70%)
      `
    },
    _active: {
      transform: 'translateY(-2px) scale(0.99)'
    },
    // アクセシビリティ対応
    _focusVisible: {
      outline: `2px solid ${tokens.colors.primary[500]}`,
      outlineOffset: '2px'
    },
    // Reduced Motion対応
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none !important',
      transform: 'none !important',
      _hover: {
        transform: 'none !important',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  content: {
    gap: { base: tokens.spacing.lg, md: tokens.spacing.xl },
    textAlign: 'center' as const,
    w: '100%'
  },
  text: {
    primary: {
      fontSize: { base: tokens.typography.fontSizes.md, md: tokens.typography.fontSizes.lg },
      lineHeight: { base: tokens.typography.lineHeights.relaxed, md: tokens.typography.lineHeights.loose },
      color: tokens.colors.gray[800],
      fontWeight: tokens.typography.fontWeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
      textAlign: 'center' as const,
      maxW: 'none'
    },
    label: {
      fontSize: tokens.typography.fontSizes.sm,
      color: tokens.colors.primary[600],
      fontWeight: tokens.typography.fontWeights.semibold,
      textTransform: 'uppercase' as const,
      letterSpacing: tokens.typography.letterSpacings.wider,
      mb: tokens.spacing.sm,
      textAlign: 'center' as const,
      borderBottom: `2px solid ${tokens.colors.primary[500]}`,
      pb: tokens.spacing.xs,
      display: 'inline-block'
    }
  }
} as const;