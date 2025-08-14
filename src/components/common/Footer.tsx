"use client";
import { tokens } from "@/styles";
import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mt="auto"
      py={{ base: 4, md: 6 }}
      textAlign="center"
      px={{ base: tokens.spacing.md, md: tokens.spacing.lg }}
      bg="linear-gradient(135deg, #fefcf8 0%, #fbf9f6 100%)"
      css={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <Text
        fontSize="xs"
        color={tokens.colors.gray[500]}
        fontWeight={tokens.typography.fontWeights.medium}
        letterSpacing="0.2px"
        style={{ opacity: 0.8 }}
      >
        ☕珈琲をやめる
      </Text>
    </Box>
  );
}
