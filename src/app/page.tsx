"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { MessageCard } from "@/components/ui/MessageCard";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEnvelope, FaHeart, FaUserFriends } from "react-icons/fa";

const MotionBox = motion.create(Box);

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

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

      <Container maxW="4xl" py={{ base: 8, md: 16 }} position="relative">
        <VStack gap={{ base: 8, md: 12 }} align="center">
          {/* ヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <VStack gap={4}>
              <Icon
                as={FaHeart}
                boxSize={{ base: 12, md: 16 }}
                color="#F28C00"
                filter="drop-shadow(0 0 20px rgba(242, 140, 0, 0.3))"
              />
              <Heading
                as="h1"
                size={{ base: "xl", md: "2xl" }}
                color="#F28C00"
                fontWeight="bold"
                letterSpacing="0.05em"
              >
                ありがとうメッセージ
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                maxW="600px"
                lineHeight="1.8"
              >
                manaby大宮事業所で出会った大切な2人のクルーさんへ、
                心からの感謝の気持ちを込めて
              </Text>
            </VStack>
          </MotionBox>

          {/* 共通メッセージ */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            w="100%"
            maxW="600px"
            bg="white"
            shadow="lg"
            borderWidth={2}
            borderColor="#F28C00"
            borderRadius="xl"
            p={{ base: 6, md: 8 }}
          >
            <VStack gap={4} textAlign="center">
              <HStack gap={2}>
                <Icon as={FaUserFriends} color="#F28C00" />
                <Badge
                  colorScheme="orange"
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  お二人へ
                </Badge>
              </HStack>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.8"
                color="gray.700"
              >
                manaby大宮事業所で一緒に学んだ日々は、私にとってとても貴重な時間でした。
                お二人がいてくれたおかげで、Web制作の勉強も楽しく続けることができました。
                いつも支えてくれて、本当にありがとうございました。
                これからもお二人の活躍を心から応援しています！
              </Text>
            </VStack>
          </MotionBox>

          {/* 個別メッセージカード */}
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={6}
            w="100%"
            justify="center"
          >
            <MessageCard
              icon={<Icon as={FaEnvelope} boxSize={8} color="#F28C00" />}
              title="斎藤さんへ"
              message="いつも優しく教えてくれた斎藤さんへの特別なメッセージです..."
              buttonText="手紙を読む"
              onClick={() => handleNavigate("/message/saito")}
              color="#F28C00"
            />

            <MessageCard
              icon={<Icon as={FaHeart} boxSize={8} color="#F28C00" />}
              title="作田さんへ"
              message="いつも一緒に頑張ってくれた作田さんへの感謝のメッセージです..."
              buttonText="手紙を読む"
              onClick={() => handleNavigate("/message/sakuta")}
              color="#F28C00"
            />
          </Stack>

          {/* フッター */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.500">
              Web制作で学んだ技術を込めて作成しました 💖
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
