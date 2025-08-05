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
import { FaEnvelope, FaHeart } from "react-icons/fa";

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
      <Container maxW="4xl" py={{ base: 20, md: 24 }} position="relative">
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {/* 熊さんキャラクターヘッダー */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            textAlign="center"
          >
            <VStack gap={{ base: 10, md: 12 }}>
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

          {/* モダンなテキストコンテナ */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            w="100%"
            maxW="600px"
          >
            {/* モダンなテキストエリア */}
            <VStack gap={10} textAlign="center" w="100%">
              {/* メインメッセージ */}
              <Box
                bg="rgba(255, 255, 255, 0.8)"
                backdropFilter="blur(10px)"
                borderRadius="16px"
                p={{ base: 8, md: 10 }}
                border="1px solid"
                borderColor="rgba(229, 231, 235, 0.6)"
                position="relative"

              >
                {/* 中央上部の熊さんアイコン */}
                <Box
                  position="absolute"
                  top="-12px"
                  left="50%"
                  transform="translateX(-50%)"
                  w="24px"
                  h="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/manabyicon.png"
                    alt="manaby"
                    width={16}
                    height={16}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.4)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                    }}
                  />
                </Box>

                {/* 左上コーナーの熊さん */}
                <Box
                  position="absolute"
                  top="-8px"
                  left="-8px"
                  w="18px"
                  h="18px"
                  display={{ base: "flex", md: "flex" }}
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(-15deg)"
                >
                  <Image
                    src="/manabyicon.png"
                    alt="manaby corner"
                    width={12}
                    height={12}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
                      opacity: 0.7,
                    }}
                  />
                </Box>

                {/* 右上コーナーの熊さん */}
                <Box
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  w="18px"
                  h="18px"
                  display={{ base: "flex", md: "flex" }}
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(15deg)"
                >
                  <Image
                    src="/manabyicon.png"
                    alt="manaby corner"
                    width={12}
                    height={12}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
                      opacity: 0.7,
                    }}
                  />
                </Box>

                {/* 左下コーナーの熊さん（デスクトップのみ） */}
                <Box
                  position="absolute"
                  bottom="-8px"
                  left="-8px"
                  w="18px"
                  h="18px"
                  display={{ base: "none", md: "flex" }}
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(-25deg)"
                >
                  <Image
                    src="/manabyicon.png"
                    alt="manaby corner"
                    width={12}
                    height={12}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
                      opacity: 0.7,
                    }}
                  />
                </Box>

                {/* 右下コーナーの熊さん（デスクトップのみ） */}
                <Box
                  position="absolute"
                  bottom="-8px"
                  right="-8px"
                  w="18px"
                  h="18px"
                  display={{ base: "none", md: "flex" }}
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(25deg)"
                >
                  <Image
                    src="/manabyicon.png"
                    alt="manaby corner"
                    width={12}
                    height={12}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
                      opacity: 0.7,
                    }}
                  />
                </Box>

                <VStack gap={6}>
                  <Text
                    fontSize="13px"
                    color="#6b7280"
                    fontWeight="500"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    mt={2}
                  >
                    お二人へ
                  </Text>

                  <Text
                    fontSize={{ base: "16px", md: "17px" }}
                    lineHeight={{ base: "1.7", md: "1.75" }}
                    color="#374151"
                    fontWeight="400"
                    letterSpacing="0.01em"
                    textAlign="center"
                    maxW="480px"
                  >
                    manaby大宮事業所で一緒に学んだ日々は、私にとってとても貴重な時間でした。
                    お二人がいてくれたおかげで、Web制作の勉強も楽しく続けることができました。
                    いつも支えてくれて、本当にありがとうございました。
                    これからもお二人の活躍を心から応援しています。
                  </Text>
                </VStack>
              </Box>

              {/* モダンなアクションエリア */}
              <Box w="100%">
                <Text
                  fontSize="14px"
                  color="#6b7280"
                  textAlign="center"
                  fontWeight="500"
                  mb={8}
                >
                  メッセージを選択してください
                </Text>
                <HStack gap={12} justify="center">
                  <MotionBox
                    whileHover={{
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{
                      scale: 0.98,
                      y: 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <VStack
                      gap={4}
                      cursor="pointer"
                      onClick={() => handleNavigate("/message/saito")}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        "& > div": {
                          bg: "rgba(255, 247, 237, 0.9)",
                          borderColor: "#f97316",
                          boxShadow: "0 8px 25px rgba(234, 88, 12, 0.15)"
                        },
                        "& svg": {
                          color: "#ea580c",
                          transform: "scale(1.1)"
                        }
                      }}
                    >
                      <Box
                        w={{ base: 14, md: 16 }}
                        h={{ base: 14, md: 16 }}
                        bg="orange.50"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                        borderColor="orange.200"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        position="relative"
                        _before={{
                          content: '""',
                          position: "absolute",
                          inset: "-4px",
                          borderRadius: "full",
                          background: "linear-gradient(45deg, transparent, rgba(255, 165, 0, 0.1), transparent)",
                          opacity: 0,
                          transition: "opacity 0.3s ease"
                        }}
                        _hover={{
                          _before: {
                            opacity: 1
                          }
                        }}
                      >
                        <Icon
                          as={FaEnvelope}
                          boxSize={{ base: 5, md: 6 }}
                          color="#f97316"
                          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        />
                      </Box>
                      <Text
                        fontSize="13px"
                        fontWeight="600"
                        color="#1f2937"
                        letterSpacing="0.02em"
                      >
                        斎藤さんへ
                      </Text>
                    </VStack>
                  </MotionBox>

                  <MotionBox
                    whileHover={{
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{
                      scale: 0.98,
                      y: 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <VStack
                      gap={4}
                      cursor="pointer"
                      onClick={() => handleNavigate("/message/sakuta")}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        "& > div": {
                          bg: "rgba(255, 247, 237, 0.9)",
                          borderColor: "#f97316",
                          boxShadow: "0 8px 25px rgba(234, 88, 12, 0.15)"
                        },
                        "& svg": {
                          color: "#ea580c",
                          transform: "scale(1.1)"
                        }
                      }}
                    >
                      <Box
                        w={{ base: 14, md: 16 }}
                        h={{ base: 14, md: 16 }}
                        bg="orange.50"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                        borderColor="orange.200"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        position="relative"
                        _before={{
                          content: '""',
                          position: "absolute",
                          inset: "-4px",
                          borderRadius: "full",
                          background: "linear-gradient(45deg, transparent, rgba(255, 165, 0, 0.1), transparent)",
                          opacity: 0,
                          transition: "opacity 0.3s ease"
                        }}
                        _hover={{
                          _before: {
                            opacity: 1
                          }
                        }}
                      >
                        <Icon
                          as={FaHeart}
                          boxSize={{ base: 5, md: 6 }}
                          color="#f97316"
                          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        />
                      </Box>
                      <Text
                        fontSize="13px"
                        fontWeight="600"
                        color="#1f2937"
                        letterSpacing="0.02em"
                      >
                        作田さんへ
                      </Text>
                    </VStack>
                  </MotionBox>
                </HStack>
              </Box>
            </VStack>
          </MotionBox>

          {/* フッター */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            textAlign="center"
            mt={8}
          >
            <Text fontSize="xs" color="gray.400" lineHeight="1.5">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container >
    </Box >
  );
}
