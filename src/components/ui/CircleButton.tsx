"use client";
import { tokens } from "@/styles/tokens";
import { Icon, StackProps, Text, VStack } from "@chakra-ui/react";

export interface CircleButtonProps extends Omit<StackProps, "onClick"> {
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
}

export function CircleButton({ label, icon, onClick, disabled, ...rest }: CircleButtonProps) {
  const IconEl = icon;

  return (
    <VStack
      asChild
      gap={{ base: tokens.spacing.md, md: tokens.spacing.lg }}
      cursor={disabled ? "not-allowed" : "pointer"}
      p={{ base: tokens.spacing.md, md: tokens.spacing.lg }}
      borderRadius={tokens.radii.xl}
      minW={{ base: "140px", md: "160px" }}
      minH="48px"
      align="center"
      opacity={disabled ? 0.6 : 1}
      transition={`all ${tokens.animations.durations.fast} ${tokens.animations.easings.standard}`}
      _hover={
        !disabled
          ? {
              transform: "translateY(-2px) scale(1.01)",
            }
          : {}
      }
      _active={
        !disabled
          ? {
              transform: "scale(0.96) translateY(2px)",
            }
          : {}
      }
      {...rest}
    >
      <button type="button" disabled={disabled} {...(!disabled && onClick ? { onClick } : {})}>
      <VStack
        w={{ base: "72px", md: "80px", lg: "88px" }}
        h={{ base: "72px", md: "80px", lg: "88px" }}
        borderRadius="50%"
        bg={`linear-gradient(135deg, #fdfcfb, #f8f6f4)`}
        border="1px solid"
        borderColor="rgba(209, 120, 66, 0.15)"
        boxShadow={`0 6px 16px ${tokens.colors.primary[500]}18, 0 3px 8px ${tokens.colors.primary[500]}12, inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 ${tokens.colors.primary[500]}15`}
        justify="center"
        align="center"
        transition={`all ${tokens.animations.durations.fast} cubic-bezier(0.4, 0, 0.2, 1)`}
      >
        <Icon as={IconEl} boxSize={{ base: 5, md: 6 }} color={tokens.colors.primary[500]} />
      </VStack>
      <Text
        fontFamily={tokens.typography.fontFamilies.body}
        fontSize={{
          base: tokens.typography.fontSizes.sm,
          md: tokens.typography.fontSizes.md,
        }}
        fontWeight={tokens.typography.fontWeights.semibold}
        color={tokens.colors.primary[600]}
        letterSpacing="0.01em"
        textAlign="center"
      >
        {label}
      </Text>
      </button>
    </VStack>
  );
}
