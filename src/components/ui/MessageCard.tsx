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
  color = "#F28C00",
  subText,
  ...boxProps
}: MessageCardProps) => (
  <Box
    w={{ base: "100%", md: "300px" }}
    bg="white"
    shadow="md"
    borderRadius="xl"
    cursor={onClick ? "pointer" : undefined}
    _hover={
      onClick
        ? {
            transform: "translateY(-5px)",
            shadow: "xl",
            borderColor: color,
          }
        : undefined
    }
    borderWidth={1}
    borderColor="gray.200"
    transitionDuration="0.3s"
    p={6}
    onClick={onClick}
    {...boxProps}
  >
    <VStack gap={4} textAlign="center">
      <Box>{icon}</Box>
      <Heading size="md" color="gray.700">
        {title}
      </Heading>
      <Text
        fontSize="sm"
        color="gray.600"
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
          color="gray.400"
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
      <Button size="sm" colorScheme="orange" variant="outline">
        {buttonIcon ? (
          <Box mr={2} display="inline">
            {buttonIcon}
          </Box>
        ) : (
          icon
        )}
        {buttonText}
      </Button>
    </VStack>
  </Box>
);
