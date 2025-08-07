import { tokens } from './tokens';

// テーマ別スタイル定義
export const themes = {
  // ホームページテーマ
  home: {
    background: {
      bg: tokens.colors.semantic.background
    },
    character: {
      container: {
        w: { base: '80px', md: '100px' },
        h: { base: '80px', md: '100px' },
        position: 'relative' as const
      },
      image: {
        objectFit: 'contain' as const,
        width: '100%',
        height: '100%'
      }
    },
    textAnimation: {
      container: {
        display: 'flex',
        gap: { base: '1px', md: '2px' },
        justifyContent: 'center',
        alignItems: 'baseline'
      },
      letter: {
        fontSize: { base: tokens.typography.fontSizes.xl, md: tokens.typography.fontSizes['2xl'] },
        fontWeight: tokens.typography.fontWeights.semibold,
        color: tokens.colors.primary[500],
        display: 'inline-block',
        letterSpacing: { base: tokens.typography.letterSpacings.widest, md: tokens.typography.letterSpacings.wide },
        lineHeight: tokens.typography.lineHeights.tight,
        textShadow: `0 0 1px ${tokens.colors.primary[500]}4D`
      }
    },
    header: {
      icon: {
        boxSize: { base: 10, md: 12 },
        color: tokens.colors.primary[500]
      },
      title: {
        as: 'h1' as const,
        size: { base: 'xl', md: '2xl' },
        color: tokens.colors.primary[700],
        fontWeight: tokens.typography.fontWeights.semibold
      },
      subtitle: {
        fontSize: tokens.typography.fontSizes.sm,
        color: tokens.colors.primary[500],
        fontWeight: tokens.typography.fontWeights.medium,
        textTransform: 'uppercase' as const,
        letterSpacing: tokens.typography.letterSpacings.widest
      }
    }
  },

  // 斎藤さんページテーマ
  saito: {
    background: {
      bg: '#fefcf9' // 温かみのあるクリーム白で統一
    },
    card: {
      bg: 'white',
      border: '1px solid',
      borderColor: tokens.colors.gray[200],
      borderRadius: tokens.radii.lg,
      p: { base: tokens.spacing.lg, md: tokens.spacing['2xl'] }
    },
    text: {
      title: {
        fontSize: { base: tokens.typography.fontSizes.lg, md: tokens.typography.fontSizes.xl },
        fontWeight: tokens.typography.fontWeights.semibold,
        color: tokens.colors.gray[900],
        textAlign: 'center' as const
      },
      body: {
        fontSize: { base: tokens.typography.fontSizes.md, md: tokens.typography.fontSizes.lg },
        lineHeight: tokens.typography.lineHeights.relaxed,
        color: tokens.colors.gray[700]
      },
      divider: {
        height: '1px',
        bg: tokens.colors.gray[200]
      }
    },
    header: {
      icon: {
        boxSize: { base: 10, md: 12 },
        color: tokens.colors.gray[600]
      },
      title: {
        as: 'h1' as const,
        size: { base: 'xl', md: '2xl' },
        color: tokens.colors.gray[900],
        fontWeight: tokens.typography.fontWeights.semibold
      },
      subtitle: {
        fontSize: tokens.typography.fontSizes.sm,
        color: tokens.colors.gray[600],
        fontWeight: tokens.typography.fontWeights.medium,
        textTransform: 'uppercase' as const,
        letterSpacing: tokens.typography.letterSpacings.widest
      }
    }
  },

  // 作田さんページテーマ
  sakuda: {
    background: {
      bg: tokens.colors.semantic.background // 統一されたクリーム白背景
    },
    card: {
      bg: 'white',
      shadow: 'xl',
      borderWidth: 2,
      borderColor: tokens.colors.primary[700],
      borderRadius: tokens.radii.xl,
      overflow: 'hidden',
      p: { base: tokens.spacing.md, md: tokens.spacing.xl }
    },
    text: {
      title: {
        fontSize: { base: tokens.typography.fontSizes.lg, md: tokens.typography.fontSizes.xl },
        fontWeight: tokens.typography.fontWeights.semibold,
        color: tokens.colors.primary[700],
        textAlign: 'center' as const
      },
      body: {
        fontSize: { base: tokens.typography.fontSizes.md, md: tokens.typography.fontSizes.lg },
        lineHeight: tokens.typography.lineHeights.loose,
        color: tokens.colors.gray[700]
      },
      divider: {
        height: '1px',
        bg: `${tokens.colors.primary[500]}33`
      }
    },
    header: {
      icon: {
        boxSize: { base: 12, md: 16 },
        color: tokens.colors.primary[700],
        filter: `drop-shadow(0 0 20px ${tokens.colors.primary[700]}4D)`
      },
      title: {
        as: 'h1' as const,
        size: { base: 'xl', md: '2xl' },
        color: tokens.colors.primary[700],
        fontWeight: tokens.typography.fontWeights.bold
      },
      badge: {
        colorScheme: 'orange',
        fontSize: tokens.typography.fontSizes.md,
        px: 3,
        py: 1,
        borderRadius: tokens.radii.full
      }
    }
  }
} as const;