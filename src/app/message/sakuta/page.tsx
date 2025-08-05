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

export default function SakutaMessage() {
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
                  作田さんへ
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
                  作田さん、本当にありがとうございました
                </Text>

                <Box height="1px" bg="orange.200" />

                <VStack gap={4} align="stretch">
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    作田さんと一緒にmanaby大宮事業所で学べて、本当に良かったです。
                    いつも前向きで、一生懸命に取り組む姿勢に、とても刺激を受けました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    困ったときには一緒に悩んでくれて、成功したときには一緒に喜んでくれて、
                    作田さんがいてくれたから、どんな課題も乗り越えることができました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    作田さんの頑張り屋さんなところや、いつも笑顔でいてくれるところが
                    本当に素敵で、私も作田さんのように前向きに頑張ろうと思えました。
                  </Text>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="1.8"
                    color="gray.700"
                  >
                    就職されてからも、作田さんらしく元気に頑張ってください。
                    きっと新しい職場でも、作田さんの明るさで周りを笑顔にしてくれると思います。
                    心から応援しています！
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
                    一緒に頑張れて本当に幸せでした
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
