"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { MessageCard } from "@/components/ui/MessageCard";
import {
  Box,
  Container,
  HStack,
  Icon,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
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
      bg="#fafafa"
      position="relative"
    >
      <Container maxW="4xl" py={{ base: 16, md: 24 }} position="relative">
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {/* 熊さんキャラクターヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign="center"
          >
            <VStack gap={{ base: 8, md: 10 }}>
              {/* 熊さんキャラクター */}
              <Box
                w={{ base: "80px", md: "100px" }}
                h={{ base: "80px", md: "100px" }}
                position="relative"
              >
                <Image
                  src="/manaby-jump2.png"
                  alt="manaby character"
                  width={100}
                  height={100}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  priority
                />
              </Box>

              {/* 弾むテキストアニメーション */}
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                display="flex"
                gap={{ base: "1px", md: "2px" }}
                justifyContent="center"
                alignItems="baseline"
              >
                {["T", "h", "a", "n", "k", "s", "!"].map((letter, index) => (
                  <MotionBox
                    key={`${letter}-${index}`}
                    display="inline-block"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      y: 8,
                      filter: "blur(4px)"
                    }}
                    animate={{
                      opacity: [0, 0, 1, 1, 0.8, 1],
                      scale: [0.8, 0.8, 1.05, 1, 1.02, 1],
                      y: [8, 8, -2, 0, 1, 0],
                      filter: [
                        "blur(4px)",
                        "blur(4px)",
                        "blur(0px)",
                        "blur(0px)",
                        "blur(0px)",
                        "blur(0px)"
                      ]
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: index * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.1, 0.25, 0.4, 0.7, 1],
                    }}
                  >
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="600"
                      color="orange.500"
                      display="inline-block"
                      letterSpacing={{ base: "0.05em", md: "0.03em" }}
                      lineHeight="1.2"
                      style={{
                        textShadow: "0 0 1px rgba(255, 165, 0, 0.3)"
                      }}
                    >
                      {letter}
                    </Text>
                  </MotionBox>
                ))}
              </MotionBox>
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
                <Icon as={FaUserFriends} color="orange.500" boxSize={5} />
                <Text
                  fontSize="sm"
                  color="orange.500"
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

          {/* メッセージカード */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            w="100%"
            maxW="800px"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={8}
              w="100%"
              justify="center"
            >
              <MessageCard
                icon={<Icon as={FaEnvelope} boxSize={6} color="orange.500" />}
                title="斎藤さんへ"
                message="いつも優しく教えてくれた斎藤さんへの特別なメッセージです"
                buttonText="読む"
                onClick={() => handleNavigate("/message/saito")}
              />

              <MessageCard
                icon={<Icon as={FaHeart} boxSize={6} color="orange.500" />}
                title="作田さんへ"
                message="いつも一緒に頑張ってくれた作田さんへの感謝のメッセージです"
                buttonText="読む"
                onClick={() => handleNavigate("/message/sakuta")}
              />
            </Stack>
          </MotionBox>

          {/* フッター */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            textAlign="center"
          >
            <Text fontSize="xs" color="gray.400">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
