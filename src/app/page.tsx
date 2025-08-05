"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { MessageCard } from "@/components/ui/MessageCard";
import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack
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
      bg="gray.50"
      position="relative"
    >
      <Container maxW="4xl" py={{ base: 12, md: 20 }} position="relative">
        <VStack gap={{ base: 12, md: 16 }} align="center">
          {/* ヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign="center"
          >
            <VStack gap={6}>
              <Icon
                as={FaHeart}
                boxSize={{ base: 10, md: 12 }}
                color="orange.500"
              />
              <Heading
                as="h1"
                size={{ base: "xl", md: "2xl" }}
                color="gray.900"
                fontWeight="600"
              >
                ありがとうメッセージ
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                maxW="500px"
                lineHeight="1.7"
              >
                manaby大宮事業所で出会った大切な2人のクルーさんへ、
                心からの感謝の気持ちを込めて
              </Text>
            </VStack>
          </MotionBox>

          {/* 共通メッセージ */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            w="100%"
            maxW="600px"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            p={{ base: 8, md: 10 }}
          >
            <VStack gap={6} textAlign="center">
              <HStack gap={3}>
                <Icon as={FaUserFriends} color="gray.600" boxSize={5} />
                <Text
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="500"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  お二人へ
                </Text>
              </HStack>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.7"
                color="gray.700"
              >
                manaby大宮事業所で一緒に学んだ日々は、私にとってとても貴重な時間でした。
                お二人がいてくれたおかげで、Web制作の勉強も楽しく続けることができました。
                いつも支えてくれて、本当にありがとうございました。
                これからもお二人の活躍を心から応援しています。
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
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.500">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
