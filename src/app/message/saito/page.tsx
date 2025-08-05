"use client";

import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaHeart, FaUser } from "react-icons/fa";

const MotionBox = motion.create(Box);

export default function SaitoMessage() {
  return (
    <Box
      minHeight="100vh"
      bg="linear-gradient(135deg, #FFF5E6 0%, #FFE4B5 50%, #FFF8DC 100%)"
      position="relative"
    >
      {/* 背景パターン */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.05"
        backgroundImage="radial-gradient(circle, #F28C00 1px, transparent 1px)"
        backgroundSize="30px 30px"
        pointerEvents="none"
      />

      <Container maxW="3xl" py={{ base: 8, md: 16 }} position="relative">
        <VStack gap={{ base: 8, md: 12 }} align="center">
          {/* 戻るボタン */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            alignSelf="flex-start"
          >
            <Link href="/">
              <Button
                variant="ghost"
                color="#F28C00"
                _hover={{ bg: "orange.50" }}
              >
                <Icon as={FaArrowLeft} mr={2} />
                戻る
              </Button>
            </Link>
          </MotionBox>

          {/* ヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <VStack gap={4}>
              <Icon
                as={FaUser}
                boxSize={{ base: 12, md: 16 }}
                color="#F28C00"
                filter="drop-shadow(0 0 20px rgba(242, 140, 0, 0.3))"
              />
              <HStack gap={3}>
                <Heading
                  as="h1"
                  size={{ base: "xl", md: "2xl" }}
                  color="#F28C00"
                  fontWeight="bold"
                >
                  斎藤さんへ
                </Heading>
                <Badge
                  colorScheme="orange"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  感謝の手紙
                </Badge>
              </HStack>
            </VStack>
          </MotionBox>

          {/* メッセージカード */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box
              w="100%"
              bg="white"
              shadow="xl"
              borderWidth={2}
              borderColor="#F28C00"
              borderRadius="xl"
              overflow="hidden"
              p={{ base: 6, md: 10 }}
            >
              <VStack gap={6} textAlign="left" align="stretch">
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="600"
                  color="#F28C00"
                  textAlign="center"
                >
                  斎藤さん、本当にありがとうございました
                </Text>

                <Box height="1px" bg="orange.200" />

                <VStack gap={4} align="stretch">
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    斎藤さんがmanaby大宮事業所にいてくれて、本当に心強かったです。
                    分からないことがあったときに、いつも優しく丁寧に教えてくれました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    特に、Web制作で行き詰まったときに、一緒に考えてくれたり、
                    「大丈夫だよ、一歩ずつ進めばいいんだから」と励ましてくれたりして、
                    何度も救われました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    斎藤さんの優しさと温かい人柄に、いつも癒されていました。
                    一緒に過ごした時間は、私にとって本当に大切な思い出です。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    就職されてからも、お体に気をつけて、新しい環境でも
                    斎藤さんらしく頑張ってください。 いつまでも応援しています！
                  </Text>
                </VStack>

                <Box height="1px" bg="orange.200" />

                <VStack gap={2}>
                  <Text
                    fontSize="md"
                    color="#F28C00"
                    fontWeight="600"
                    textAlign="center"
                  >
                    改めて、本当にありがとうございました
                  </Text>
                  <HStack gap={2} justify="center">
                    <Icon as={FaHeart} color="#F28C00" />
                    <Text fontSize="sm" color="gray.600" fontStyle="italic">
                      感謝を込めて
                    </Text>
                    <Icon as={FaHeart} color="#F28C00" />
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </MotionBox>

          {/* 戻るボタン（下部） */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/">
              <Button size="lg" colorScheme="orange">
                <Icon as={FaArrowLeft} mr={2} />
                メッセージ一覧に戻る
              </Button>
            </Link>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
