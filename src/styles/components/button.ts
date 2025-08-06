/**
 * Button Component Styles
 * 
 * @description ボタン関連のスタイル定義
 */

import { tokens } from '../tokens';

export const buttonStyles = {
  message: {
    container: {
      gap: { base: tokens.spacing.md, md: tokens.spacing.lg },
      cursor: 'pointer',
      transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`,
      p: { base: tokens.spacing.md, md: tokens.spacing.lg },
      borderRadius: tokens.radii.xl,
      minW: { base: '120px', md: '140px' }, // より大きなタッチターゲット
      minH: tokens.mobile.touchTarget,
      _hover: {
        transform: 'translateY(-6px) scale(1.05)',
        '& > div': {
          background: `
            linear-gradient(135deg, rgba(255, 247, 237, 0.95), rgba(255, 237, 213, 0.9)),
            radial-gradient(circle at 50% 50%, ${tokens.colors.primary[500]}20, transparent 70%)
          `,
          borderColor: tokens.colors.primary[500],
          boxShadow: `
            0 20px 40px ${tokens.colors.primary[500]}25,
            0 0 0 1px ${tokens.colors.primary[500]}40,
            inset 0 1px 0 rgba(255, 255, 255, 0.6)
          `,
          transform: 'scale(1.1) rotate(-2deg)'
        },
        '& svg': {
          color: tokens.colors.primary[600],
          transform: 'scale(1.2) rotate(12deg)',
          filter: `drop-shadow(0 4px 8px ${tokens.colors.primary[500]}40)`
        },
        '& p': {
          color: tokens.colors.semantic.text.primary,
          transform: 'translateY(-2px)',
          fontWeight: tokens.typography.fontWeights.bold
        }
      },
      _active: {
        transform: 'translateY(-3px) scale(1.02)'
      },
      '@media (hover: none)': {
        _hover: {
          transform: 'none',
          '& > div': {
            transform: 'none'
          }
        },
        _active: {
          transform: 'scale(0.95)',
          '& > div': {
            background: `rgba(255, 247, 237, 0.8)`,
            transform: 'scale(0.95)'
          }
        }
      }
    },
    icon: {
      w: { base: '72px', md: '80px', lg: '88px' },
      h: { base: '72px', md: '80px', lg: '88px' },
      background: `
        linear-gradient(135deg, ${tokens.colors.primary[500]}12, ${tokens.colors.primary[500]}06),
        linear-gradient(225deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))
      `,
      borderRadius: tokens.radii.full,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid',
      borderColor: `rgba(255, 255, 255, 0.3)`,
      boxShadow: tokens.shadows.neumorphism.raised,
      transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`,
      position: 'relative' as const,
      _hover: {
        boxShadow: `
          0 12px 24px ${tokens.colors.primary[500]}25,
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
        background: `
          linear-gradient(135deg, ${tokens.colors.primary[400]}15, ${tokens.colors.primary[500]}08),
          linear-gradient(225deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))
        `
      }
    },
    label: {
      fontSize: { base: tokens.typography.fontSizes.sm, md: tokens.typography.fontSizes.md },
      fontWeight: tokens.typography.fontWeights.semibold,
      color: tokens.colors.semantic.text.primary,
      letterSpacing: tokens.typography.letterSpacings.wider,
      transition: `all ${tokens.animations.durations.normal} ease`
    }
  },
  back: {
    primary: {
      size: 'lg',
      bg: `linear-gradient(135deg, ${tokens.colors.primary[500]}, ${tokens.colors.primary[600]})`,
      color: 'white',
      borderRadius: tokens.radii.full,
      px: 8,
      py: 3,
      fontWeight: tokens.typography.fontWeights.semibold,
      boxShadow: `0 4px 12px ${tokens.colors.primary[500]}30`,
      border: '2px solid',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      _hover: {
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: `0 8px 20px ${tokens.colors.primary[500]}40`,
        bg: `linear-gradient(135deg, ${tokens.colors.primary[400]}, ${tokens.colors.primary[500]})`
      },
      _active: {
        transform: 'translateY(-1px) scale(0.98)'
      },
      transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`
    },
    secondary: {
      bg: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: tokens.radii.full,
      px: 6,
      py: 2,
      color: tokens.colors.semantic.text.primary,
      fontWeight: tokens.typography.fontWeights.medium,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      _hover: {
        bg: 'rgba(255, 255, 255, 0.95)',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      _active: {
        transform: 'scale(0.95)'
      },
      transition: `all ${tokens.animations.durations.normal} ease-out`
    }
  }
} as const;