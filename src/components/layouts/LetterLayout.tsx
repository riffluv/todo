import { componentStyles } from "@/styles/components";
import { Box, BoxProps, Container, VStack } from "@chakra-ui/react";

export interface LetterLayoutProps extends BoxProps {
  children: React.ReactNode;
  background?: Record<string, unknown>;
}

export function LetterLayout({ children, background, ...rest }: LetterLayoutProps) {
  return (
    <Box {...componentStyles.page.container} {...background} {...rest}>
      <Container {...componentStyles.page.content}>
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {children}
        </VStack>
      </Container>
    </Box>
  );
}
