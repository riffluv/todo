import { tokens } from './tokens';

/**
 * Component Styles System - 2025年ベストプラクティス準拠
 * 
 * - Atomic Design原則
 * - Container/Presentation分離
 * - アクセシビリティファースト
 * - パフォーマンス最適化
 * - 型安全性確保
 */
export const componentStyles = {
  // ページレイアウト
  page: {
    container: {
      minHeight: '100vh',
      position: 'relative' as const,
      py: { base: tokens.spacing['2xl'], md: tokens.spacing['3xl'] },
      px: { base: tokens.spacing.md, md: tokens.spacing.lg }
    },
    content: {
      maxW: { base: 'container.sm', md: 'container.md', lg: '4xl' },
      gap: { base: tokens.spacing['4xl'], md: tokens.spacing['5xl'] },
      align: 'center' as const,
      w: '100%'
    }
  },

  // メッセージカード（一流デザイナー仕様）
  messageCard: {
    container: {
      bg: tokens.colors.semantic.surface,
      backdropFilter: 'blur(12px)',
      borderRadius: tokens.radii.xl,
      p: { base: tokens.spacing.lg, md: tokens.spacing['2xl'] },
      border: '1px solid',
      borderColor: tokens.colors.semantic.border,
      position: 'relative' as const,
      shadow: { base: tokens.shadows.md, md: tokens.shadows.lg },
      transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.easeOut}`,
      _hover: {
        transform: 'translateY(-2px)',
        shadow: tokens.shadows.xl,
        borderColor: `${tokens.colors.primary[500]}33`
      },
      // 2025年アクセシビリティ対応
      _focusVisible: {
        outline: `2px solid ${tokens.colors.primary[500]}`,
        outlineOffset: '2px',
        borderRadius: tokens.radii.sm
      },
      // Reduced Motion対応
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none !important',
        transform: 'none !important',
        animation: 'none !important',
        _hover: {
          transform: 'none !important'
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
        color: tokens.colors.semantic.text.primary,
        fontWeight: tokens.typography.fontWeights.normal,
        letterSpacing: tokens.typography.letterSpacings.wide,
        textAlign: 'left' as const,
        maxW: 'none',
        _first: {
          textAlign: 'center' as const
        }
      },
      label: {
        fontSize: tokens.typography.fontSizes.sm,
        color: tokens.colors.semantic.text.secondary,
        fontWeight: tokens.typography.fontWeights.medium,
        textTransform: 'uppercase' as const,
        letterSpacing: tokens.typography.letterSpacings.widest,
        mb: tokens.spacing.md,
        position: 'relative' as const,
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          w: '24px',
          h: '2px',
          bg: tokens.colors.primary[500],
          borderRadius: tokens.radii.full
        }
      }
    }
  },

  // ボタンスタイル（一流デザイナー仕様）
  button: {
    message: {
      container: {
        gap: { base: tokens.spacing.sm, md: tokens.spacing.md },
        cursor: 'pointer',
        transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`,
        p: { base: tokens.spacing.sm, md: tokens.spacing.md },
        borderRadius: tokens.radii.lg,
        _hover: {
          transform: 'translateY(-4px)',
          '& > div': {
            bg: 'rgba(255, 247, 237, 0.95)',
            borderColor: tokens.colors.primary[500],
            boxShadow: `0 8px 32px ${tokens.colors.primary[500]}33`,
            transform: 'scale(1.05)'
          },
          '& svg': {
            color: tokens.colors.primary[600],
            transform: 'scale(1.15) rotate(5deg)'
          },
          '& p': {
            color: tokens.colors.primary[700],
            transform: 'translateY(-1px)'
          }
        },
        _active: {
          transform: 'translateY(-2px)'
        }
      },
      icon: {
        w: { base: '64px', md: '72px' },
        h: { base: '64px', md: '72px' },
        bg: `linear-gradient(135deg, ${tokens.colors.primary[500]}15, ${tokens.colors.primary[500]}08)`,
        borderRadius: tokens.radii.full,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: `${tokens.colors.primary[500]}25`,
        transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`,
        position: 'relative' as const,
        _before: {
          content: '""',
          position: 'absolute',
          inset: '-6px',
          borderRadius: tokens.radii.full,
          background: `conic-gradient(from 0deg, transparent, ${tokens.colors.primary[500]}20, transparent, ${tokens.colors.primary[500]}20, transparent)`,
          opacity: 0,
          transition: `all ${tokens.animations.durations.normal} ease`,
          animation: 'spin 3s linear infinite'
        },
        _hover: {
          _before: { opacity: 1 }
        }
      },
      label: {
        fontSize: { base: tokens.typography.fontSizes.sm, md: tokens.typography.fontSizes.md },
        fontWeight: tokens.typography.fontWeights.semibold,
        color: tokens.colors.gray[800],
        letterSpacing: tokens.typography.letterSpacings.wider,
        transition: `all ${tokens.animations.durations.normal} ease`
      }
    },
    back: {
      primary: {
        size: 'lg',
        bg: tokens.colors.gray[900],
        color: 'white',
        _hover: { bg: tokens.colors.gray[800] },
        transition: `all ${tokens.animations.durations.fast}`
      },
      secondary: {
        variant: 'ghost',
        color: tokens.colors.gray[600],
        _hover: { bg: tokens.colors.gray[100] },
        transition: `all ${tokens.animations.durations.fast}`
      }
    }
  },

  // アニメーション設定（一流デザイナー仕様）
  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -32, filter: 'blur(2px)' },
      animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
    fadeIn: {
      initial: { opacity: 0, filter: 'blur(2px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      transition: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
    },
    bounce: {
      whileHover: {
        scale: 1.03,
        y: -6,
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      },
      whileTap: {
        scale: 0.97,
        y: -2,
        transition: { type: 'spring', stiffness: 600, damping: 35 }
      }
    },
    float: {
      animate: {
        y: [0, -8, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    },
    pulse: {
      animate: {
        scale: [1, 1.02, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    }
  },

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