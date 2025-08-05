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
    borderRadius="lg"
    cursor={onClick ? "pointer" : undefined}
    _hover={
      onClick
        ? {
          transform: "translateY(-2px)",
          borderColor: "gray.300",
          shadow: "sm",
        }
        : undefined
    }
    transition="all 0.2s ease"
    p={8}
    onClick={onClick}
    {...boxProps}
  >
    <VStack gap={6} textAlign="center">
      <Box color="gray.600">{icon}</Box>
      <Heading size="md" color="gray.900" fontWeight="600">
        {title}
      </Heading>
      <Text
        fontSize="sm"
        color="gray.600"
        lineHeight="1.6"
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
          fontSize="xs"
          color="gray.500"
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
        bg="gray.900"
        color="white"
        _hover={{ bg: "gray.800" }}
        transition="all 0.2s"
        borderRadius="md"
      >
        {buttonText}
      </Button>
    </VStack>
  </Box>
);
