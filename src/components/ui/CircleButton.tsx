"use client";
import { componentStyles } from "@/styles/components";
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
  const { transition: _, ...iconProps } = componentStyles.button.message.icon;
  const { transition: __, ...containerProps } = componentStyles.button.message.container;
  void _; // silence unused var lint
  void __;

  return (
    <VStack
      {...containerProps}
      {...(!disabled && onClick ? { onClick } : {})}
      opacity={disabled ? 0.6 : 1}
      cursor={disabled ? "not-allowed" : "pointer"}
      {...rest}
    >
      <VStack {...iconProps} {...componentStyles.animations.pulse}>
        <Icon as={IconEl} boxSize={{ base: 5, md: 6 }} color={tokens.colors.primary[500]} />
      </VStack>
      <Text {...componentStyles.button.message.label}>{label}</Text>
    </VStack>
  );
}
