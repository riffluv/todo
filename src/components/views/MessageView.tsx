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
  Box,
  Container,
  Heading,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

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
      <Container {...componentStyles.page.content}>
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {/* キャラクターヘッダー - メインページと同じ位置 */}
          <CharacterHeader delay={0.1}>
            <Heading {...theme.header.title}>
              {person.name}へ
            </Heading>
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
                      <Text fontSize="sm" color={tokens.colors.gray[600]} textAlign="center">
                        {person.message.signature}
                      </Text>
                    </VStack>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* 戻るボタン（アイコンのみ） */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            display="flex"
            justifyContent="center"
            cursor="pointer"
            onClick={onBack}
          >
            <Box {...componentStyles.button.message.icon}>
              <Icon
                as={FaArrowLeft}
                boxSize={{ base: 6, md: 7 }}
                color={tokens.colors.primary[600]}
                transition={`all ${tokens.animations.durations.normal} ease`}
              />
            </Box>
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