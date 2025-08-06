/**
 * MessageView Component - 汎用メッセージビュー
 * 
 * @description 再利用可能なメッセージ表示コンポーネント
 */
"use client";

import { BearIcon } from "@/components/common/BearIcon";
import { CharacterHeader } from "@/components/common/CharacterHeader";
import { componentStyles } from "@/styles/components";
import { themes } from "@/styles/themes";
import { tokens } from "@/styles/tokens";
import { PersonConfig } from "@/types/message";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHeart } from "react-icons/fa";

const MotionBox = motion.create(Box);

export interface MessageViewProps {
  /** 人物の設定データ */
  person: PersonConfig;
  /** 戻るボタンのハンドラー */
  onBack: () => void;
}

export function MessageView({ person, onBack }: MessageViewProps) {
  const theme = themes[person.themeKey];

  return (
    <Box {...componentStyles.page.container} {...theme.background}>
      {/* 背景パターン（作田さんの場合のみ） */}
      {person.themeKey === "sakuda" && (
        <Box {...theme.background.pattern} />
      )}

      <Container {...componentStyles.page.content}>
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {/* 戻るボタン */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            alignSelf="flex-start"
          >
            <Button
              {...componentStyles.button.back.secondary}
              onClick={onBack}
            >
              <Icon as={FaArrowLeft} mr={2} />
              戻る
            </Button>
          </MotionBox>

          {/* キャラクターヘッダー */}
          <CharacterHeader delay={0.1}>
            <VStack gap={2}>
              <HStack gap={3}>
                <Heading {...theme.header.title}>
                  {person.name}へ
                </Heading>
                {person.themeKey === "sakuda" && (
                  <Badge {...theme.header.badge}>
                    感謝の手紙
                  </Badge>
                )}
              </HStack>
              {person.themeKey === "saito" && (
                <Text {...theme.header.subtitle}>
                  感謝の手紙
                </Text>
              )}
            </VStack>
          </CharacterHeader>

          {/* メッセージカード */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            w="100%"
            maxW="680px"
          >
            <VStack {...componentStyles.messageCard.content}>
              <MotionBox
                {...componentStyles.messageCard.container}
                position="relative"
                whileHover={{
                  y: -3,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* 熊さんアイコン群 */}
                <BearIcon
                  position={{ top: "-12px", left: "50%", transform: "translateX(-50%)" }}
                  opacity={0.8}
                />
                <BearIcon
                  position={{ top: "-10px", left: "50%", transform: "translateX(-200%)" }}
                  opacity={0.6}
                  display={{ base: "none", md: "flex" }}
                />
                <BearIcon
                  position={{ top: "-10px", left: "50%", transform: "translateX(100%)" }}
                  opacity={0.6}
                  display={{ base: "none", md: "flex" }}
                />

                <VStack gap={8}>
                  <Text {...componentStyles.messageCard.text.label}>
                    {person.name}への感謝
                  </Text>

                  <VStack gap={6} align="stretch">
                    {person.message.paragraphs.map((paragraph, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.5 + index * 0.1,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <Text {...componentStyles.messageCard.text.primary}>
                          {paragraph}
                        </Text>
                      </MotionBox>
                    ))}
                  </VStack>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                  >
                    <VStack gap={3} mt={6}>
                      <Text
                        fontSize="md"
                        color={person.themeKey === "saito" ? tokens.colors.gray[900] : tokens.colors.primary[700]}
                        fontWeight={tokens.typography.fontWeights.semibold}
                        textAlign="center"
                      >
                        {person.message.closing}
                      </Text>
                      <HStack gap={2} justify="center">
                        <MotionBox
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Icon
                            as={FaHeart}
                            color={person.themeKey === "saito" ? tokens.colors.gray[400] : tokens.colors.primary[700]}
                            boxSize={3}
                          />
                        </MotionBox>
                        <Text fontSize="sm" color={tokens.colors.gray[600]}>
                          {person.message.signature}
                        </Text>
                        <MotionBox
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                          <Icon
                            as={FaHeart}
                            color={person.themeKey === "saito" ? tokens.colors.gray[400] : tokens.colors.primary[700]}
                            boxSize={3}
                          />
                        </MotionBox>
                      </HStack>
                    </VStack>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* 戻るボタン（下部） */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              {...componentStyles.button.back.primary}
              onClick={onBack}
            >
              <Icon as={FaArrowLeft} mr={2} />
              メッセージ一覧に戻る
            </Button>
          </MotionBox>

          {/* フッター */}
          <MotionBox {...componentStyles.animations.fadeIn} textAlign="center" mt={4}>
            <Text fontSize="xs" color={tokens.colors.gray[400]} lineHeight="1.5">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}