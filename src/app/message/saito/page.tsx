"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaUser } from "react-icons/fa";

const MotionBox = motion.create(Box);

export default function SaitoMessage() {
  return (
    <Box
      minHeight="100vh"
      bg="gray.50"
      position="relative"
    >
      <Container maxW="3xl" py={{ base: 12, md: 20 }} position="relative">
        <VStack gap={{ base: 12, md: 16 }} align="center">
          {/* 戻るボタン */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            alignSelf="flex-start"
          >
            <Link href="/">
              <Button
                variant="ghost"
                color="gray.600"
                _hover={{ bg: "gray.100" }}
                transition="all 0.2s"
              >
                <Icon as={FaArrowLeft} mr={2} />
                戻る
              </Button>
            </Link>
          </MotionBox>

          {/* ヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            textAlign="center"
          >
            <VStack gap={6}>
              <Icon
                as={FaUser}
                boxSize={{ base: 10, md: 12 }}
                color="gray.600"
              />
              <VStack gap={2}>
                <Heading
                  as="h1"
                  size={{ base: "xl", md: "2xl" }}
                  color="gray.900"
                  fontWeight="600"
                >
                  斎藤さんへ
                </Heading>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="500"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  感謝の手紙
                </Text>
              </VStack>
            </VStack>
          </MotionBox>

          {/* メッセージカード */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Box
              w="100%"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p={{ base: 8, md: 12 }}
            >
              <VStack gap={8} textAlign="left" align="stretch">
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="600"
                  color="gray.900"
                  textAlign="center"
                >
                  斎藤さん、本当にありがとうございました
                </Text>

                <Box height="1px" bg="gray.200" />

                <VStack gap={6} align="stretch">
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.7"
                    color="gray.700"
                  >
                    斎藤さんがmanaby大宮事業所にいてくれて、本当に心強かったです。
                    分からないことがあったときに、いつも優しく丁寧に教えてくれました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.7"
                    color="gray.700"
                  >
                    特に、Web制作で行き詰まったときに、一緒に考えてくれたり、
                    「大丈夫だよ、一歩ずつ進めばいいんだから」と励ましてくれたりして、
                    何度も救われました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.7"
                    color="gray.700"
                  >
                    斎藤さんの優しさと温かい人柄に、いつも癒されていました。
                    一緒に過ごした時間は、私にとって本当に大切な思い出です。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.7"
                    color="gray.700"
                  >
                    就職されてからも、お体に気をつけて、新しい環境でも
                    斎藤さんらしく頑張ってください。いつまでも応援しています。
                  </Text>
                </VStack>

                <Box height="1px" bg="gray.200" />

                <VStack gap={3}>
                  <Text
                    fontSize="md"
                    color="gray.900"
                    fontWeight="600"
                    textAlign="center"
                  >
                    改めて、本当にありがとうございました
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    感謝を込めて
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </MotionBox>

          {/* 戻るボタン（下部） */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="/">
              <Button
                size="lg"
                bg="gray.900"
                color="white"
                _hover={{ bg: "gray.800" }}
                transition="all 0.2s"
              >
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
