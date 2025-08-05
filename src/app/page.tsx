"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import {
  Box,
  Container,
  HStack,
  Icon,
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
      <Container maxW="4xl" py={{ base: 16, md: 20 }} position="relative">
        <VStack gap={{ base: 12, md: 16 }} align="center">
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

          {/* メインカード */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            w="100%"
            maxW="500px"
            bg="white"
            borderRadius="xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            {/* カードヘッダー */}
            <Box
              bg="orange.50"
              px={{ base: 6, md: 8 }}
              py={4}
              borderBottom="1px solid"
              borderColor="orange.100"
            >
              <HStack gap={3} justify="center">
                <Icon as={FaUserFriends} color="orange.500" boxSize={5} />
                <Text
                  fontSize="sm"
                  color="orange.600"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  お二人へのメッセージ
                </Text>
              </HStack>
            </Box>

            {/* カードコンテンツ */}
            <Box p={{ base: 6, md: 8 }}>
              <VStack gap={6} textAlign="center">
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="1.7"
                  color="gray.700"
                >
                  manaby大宮事業所で一緒に学んだ日々は、私にとってとても貴重な時間でした。
                  お二人がいてくれたおかげで、Web制作の勉強も楽しく続けることができました。
                  いつも支えてくれて、本当にありがとうございました。
                  これからもお二人の活躍を心から応援しています。
                </Text>

                {/* アクションエリア */}
                <Box
                  w="100%"
                  bg="gray.50"
                  borderRadius="lg"
                  p={4}
                  mt={4}
                >
                  <Text fontSize="xs" color="gray.500" mb={3} textAlign="center">
                    メッセージを選択してください
                  </Text>
                  <HStack gap={8} justify="center">
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <VStack
                        gap={3}
                        cursor="pointer"
                        onClick={() => handleNavigate("/message/saito")}
                        _hover={{ opacity: 0.8 }}
                        transition="all 0.2s"
                      >
                        <Box
                          w={16}
                          h={16}
                          bg="orange.50"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="2px solid"
                          borderColor="orange.200"
                        >
                          <Icon as={FaEnvelope} boxSize={6} color="orange.500" />
                        </Box>
                        <Text fontSize="sm" fontWeight="500" color="gray.700">
                          斎藤さんへ
                        </Text>
                      </VStack>
                    </MotionBox>

                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <VStack
                        gap={3}
                        cursor="pointer"
                        onClick={() => handleNavigate("/message/sakuta")}
                        _hover={{ opacity: 0.8 }}
                        transition="all 0.2s"
                      >
                        <Box
                          w={16}
                          h={16}
                          bg="orange.50"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="2px solid"
                          borderColor="orange.200"
                        >
                          <Icon as={FaHeart} boxSize={6} color="orange.500" />
                        </Box>
                        <Text fontSize="sm" fontWeight="500" color="gray.700">
                          作田さんへ
                        </Text>
                      </VStack>
                    </MotionBox>
                  </HStack>
                </Box>
              </VStack>
            </Box>
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
      </Container >
    </Box >
  );
}
