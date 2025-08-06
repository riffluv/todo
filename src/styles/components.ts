import { tokens } from './tokens';

// コンポーネント別スタイル定義
export const componentStyles = {
  // ページレイアウト
  page: {
    container: {
      minHeight: '100vh',
      position: 'relative' as const,
      py: { base: tokens.spacing['2xl'], md: tokens.spacing['3xl'] }
    },
    content: {
      maxW: '4xl',
      gap: { base: tokens.spacing['4xl'], md: tokens.spacing['5xl'] },
      align: 'center' as const
    }
  },

  // メッセージカード
  messageCard: {
    container: {
      bg: tokens.colors.semantic.surface,
      backdropFilter: 'blur(10px)',
      borderRadius: tokens.radii.xl,
      p: { base: tokens.spacing.lg, md: tokens.spacing.xl },
      border: '1px solid',
      borderColor: tokens.colors.semantic.border,
      position: 'relative' as const
    },
    content: {
      gap: tokens.spacing.md,
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
        textAlign: 'center' as const,
        maxW: '480px'
      },
      label: {
        fontSize: tokens.typography.fontSizes.sm,
        color: tokens.colors.semantic.text.secondary,
        fontWeight: tokens.typography.fontWeights.medium,
        textTransform: 'uppercase' as const,
        letterSpacing: tokens.typography.letterSpacings.widest,
        mt: tokens.spacing.xs
      }
    }
  },

  // ボタンスタイル
  button: {
    message: {
      container: {
        gap: tokens.spacing.sm,
        cursor: 'pointer',
        transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.easeOut}`,
        _hover: {
          '& > div': {
            bg: 'rgba(255, 247, 237, 0.9)',
            borderColor: tokens.colors.primary[500],
            boxShadow: tokens.shadows.lg
          },
          '& svg': {
            color: tokens.colors.primary[600],
            transform: 'scale(1.1)'
          }
        }
      },
      icon: {
        w: { base: '56px', md: '64px' },
        h: { base: '56px', md: '64px' },
        bg: `${tokens.colors.primary[500]}10`,
        borderRadius: tokens.radii.full,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        borderColor: `${tokens.colors.primary[500]}33`,
        transition: `all ${tokens.animations.durations.normal} ${tokens.animations.easings.easeOut}`,
        position: 'relative' as const,
        _before: {
          content: '""',
          position: 'absolute',
          inset: '-4px',
          borderRadius: tokens.radii.full,
          background: `linear-gradient(45deg, transparent, ${tokens.colors.primary[500]}1A, transparent)`,
          opacity: 0,
          transition: `opacity ${tokens.animations.durations.normal} ease`
        },
        _hover: {
          _before: { opacity: 1 }
        }
      },
      label: {
        fontSize: tokens.typography.fontSizes.sm,
        fontWeight: tokens.typography.fontWeights.semibold,
        color: tokens.colors.gray[900],
        letterSpacing: tokens.typography.letterSpacings.wider
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

  // アニメーション設定
  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay: 0.6, ease: 'easeOut' }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay: 0.3 }
    },
    bounce: {
      whileHover: { scale: 1.02, y: -2 },
      whileTap: { scale: 0.98, y: 0 },
      transition: { type: 'spring', stiffness: 400, damping: 25 }
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