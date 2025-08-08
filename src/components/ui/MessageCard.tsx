import { tokens } from "@/styles/tokens";
import { Box, BoxProps, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface MessageCardProps extends BoxProps {
  icon: ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  onClick?: () => void;
  color?: string;
  subText?: string;
}

export const MessageCard = ({
  icon,
  title,
  message,
  buttonText = "手紙を読む",
  buttonIcon,
  onClick,
  color = "gray.900",
  subText,
  ...boxProps
}: MessageCardProps) => (
  <Box
    w={{ base: "100%", md: "320px" }}
    bg="white"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="xl"
    cursor={onClick ? "pointer" : undefined}
    _hover={
      onClick
        ? {
            transform: "translateY(-3px)",
            borderColor: "gray.300",
            boxShadow: tokens.shadows.md,
          }
        : undefined
    }
    transition={`all ${tokens.animations.durations.fast} ${tokens.animations.easings.emphasized}`}
    p={{ base: 7, md: 8 }}
    onClick={onClick}
    {...boxProps}
  >
    <VStack gap={{ base: 5, md: 6 }} textAlign="center">
      <Box color="gray.600">{icon}</Box>
      <Heading
        as="h3"
        fontSize={{
          base: tokens.typography.fontSizes.lg,
          md: tokens.typography.fontSizes.xl,
        }}
        color={tokens.colors.gray[900]}
        fontWeight={tokens.typography.fontWeights.semibold}
        letterSpacing={tokens.typography.letterSpacings.wide}
      >
        {title}
      </Heading>
      <Text
        fontSize={{
          base: tokens.typography.fontSizes.sm,
          md: tokens.typography.fontSizes.md,
        }}
        color={tokens.colors.gray[700]}
        lineHeight={tokens.typography.lineHeights.relaxed}
        letterSpacing={tokens.typography.letterSpacings.wide}
        css={{
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {message}
      </Text>
      {subText && (
        <Text
          fontSize={tokens.typography.fontSizes.xs}
          color={tokens.colors.gray[500]}
          letterSpacing={tokens.typography.letterSpacings.wider}
          css={{
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subText}
        </Text>
      )}
      <Button
        size="sm"
        bg={tokens.colors.gray[900]}
        color="white"
        _hover={{ bg: tokens.colors.gray[800] }}
        transition={`all ${tokens.animations.durations.fast} ease`}
        borderRadius="full"
        px={5}
        py={2}
      >
        {buttonText}
      </Button>
    </VStack>
  </Box>
);
