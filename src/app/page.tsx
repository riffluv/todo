"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { APP_CONFIG, FEATURES, TECH_STACK } from "@/constants";
import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGift, FaHeart, FaStar } from "react-icons/fa";

const MotionBox = motion.create(Box);

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      minHeight="100vh"
      bgGradient={colorMode === "dark" ? "to-br" : "to-br"}
      bg={
        colorMode === "dark"
          ? "linear-gradient(to bottom right, #1a202c, #000000)"
          : "linear-gradient(to bottom right, #ebf8ff, #faf5ff)"
      }
      position="relative"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.05"
        backgroundImage="radial-gradient(circle, currentColor 1px, transparent 1px)"
        backgroundSize="20px 20px"
        pointerEvents="none"
      />

      <Container maxW="6xl" py={20} position="relative">
        <Stack gap={12} align="center">
          {/* Header Section */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Stack gap={4} align="center">
              <Icon
                as={FaHeart}
                boxSize={16}
                color={colorMode === "dark" ? "orange.400" : "pink.500"}
                filter="drop-shadow(0 0 20px currentColor)"
              />
              <Heading
                as="h1"
                size="2xl"
                bgGradient={
                  colorMode === "dark"
                    ? "linear(to-r, orange.400, yellow.400)"
                    : "linear(to-r, pink.500, purple.500)"
                }
                bgClip="text"
                textAlign="center"
                fontWeight="bold"
              >
                {APP_CONFIG.name}
              </Heading>
              <Text
                fontSize="xl"
                color={colorMode === "dark" ? "gray.300" : "gray.600"}
                textAlign="center"
                maxW="2xl"
              >
                {APP_CONFIG.description}
              </Text>
            </Stack>
          </MotionBox>

          {/* Feature Cards */}
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={8}
            justify="center"
            flexWrap="wrap"
          >
            {FEATURES.map((feature, index) => {
              const IconComponent =
                feature.icon === "FaHeart"
                  ? FaHeart
                  : feature.icon === "FaGift"
                  ? FaGift
                  : FaStar;

              return (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  maxW="300px"
                  bg={colorMode === "dark" ? "gray.800" : "white"}
                  borderWidth={1}
                  borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
                  shadow="xl"
                  borderRadius="lg"
                  p={6}
                  _hover={{
                    transform: "translateY(-5px)",
                    shadow: "2xl",
                  }}
                >
                  <Stack gap={4} align="center" textAlign="center">
                    <Icon
                      as={IconComponent}
                      boxSize={12}
                      color={feature.color}
                    />
                    <Heading size="md" color={feature.color}>
                      {feature.title}
                    </Heading>
                    <Text
                      color={colorMode === "dark" ? "gray.300" : "gray.600"}
                      fontSize="sm"
                    >
                      {feature.description}
                    </Text>
                  </Stack>
                </MotionBox>
              );
            })}
          </Stack>

          {/* Action Buttons */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Stack gap={4} align="center">
              <Stack direction={{ base: "column", sm: "row" }} gap={4}>
                <Button
                  size="lg"
                  colorScheme={colorMode === "dark" ? "orange" : "pink"}
                  variant="solid"
                  _hover={{
                    transform: "scale(1.05)",
                    shadow: "xl",
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={FaHeart} mr={2} />
                  メッセージを作成
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme={colorMode === "dark" ? "orange" : "pink"}
                  onClick={toggleColorMode}
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                  transition="all 0.2s"
                >
                  {colorMode === "dark" ? "ライトモード" : "ダークモード"}
                </Button>
              </Stack>
              <Text
                fontSize="sm"
                color={colorMode === "dark" ? "gray.400" : "gray.500"}
                textAlign="center"
              >
                Chakra UI + Next.js + TypeScript + Framer Motion で作成
              </Text>
            </Stack>
          </MotionBox>

          {/* Tech Stack Display */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            textAlign="center"
          >
            <Stack gap={4} align="center">
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color={colorMode === "dark" ? "orange.300" : "purple.600"}
              >
                🚀 技術スタック
              </Text>
              <Stack direction="row" gap={4} flexWrap="wrap" justify="center">
                {TECH_STACK.map((tech, index) => (
                  <Box
                    key={index}
                    px={4}
                    py={2}
                    bg={colorMode === "dark" ? "gray.700" : "gray.100"}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="medium"
                    color={colorMode === "dark" ? "gray.200" : "gray.700"}
                    border="1px"
                    borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                  >
                    {tech.name}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
