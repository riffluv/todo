/**
 * MessageView Component - 個別メッセージビュー
 *
 * @description 個人宛メッセージを表示するコンポーネント
 * メインページと統一されたデザインシステムを使用
 */
"use client";

import { BearIcon } from "@/components/common/BearIcon";
import { CharacterHeader } from "@/components/common/CharacterHeader";
import { MessageButton } from "@/components/common/MessageButton";
import { TypewriterTitle } from "@/components/common/TypewriterTitle";
import { useScrollEnhancement } from "@/hooks/useScrollEnhancement";
import { useTapEffectProps } from "@/hooks/useTapEffect";
import { componentStyles } from "@/styles/components";
import { themes } from "@/styles/themes";
import { tokens } from "@/styles/tokens";
import { PersonConfig } from "@/types/message";
import { Box, Container, Text, VStack, chakra } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";
import type React from "react";
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
  const tapEffectProps = useTapEffectProps();
  useScrollEnhancement();

  return (
    <Box 
      {...componentStyles.page.container} 
      {...theme.background}
      {...tapEffectProps}
    >
      <Container {...componentStyles.page.content}>
        <VStack gap={{ base: tokens.spacing["2xl"], md: tokens.spacing["3xl"] }} align="center">
          {/* 英語タイトルヘッダー */}
          <CharacterHeader 
            delay={0.1}
            characterSrc={
              person.id === "sakuda" ? "/sakuda.png" : 
              person.id === "saito" ? "/saito.png" : 
              "/manaby-jump2.png"
            }
            characterAlt={
              person.id === "sakuda" ? "作田さんのキャラクター" : 
              person.id === "saito" ? "斎藤さんのキャラクター" : 
              "manaby character"
            }
          >
            <TypewriterTitle 
              text={`Dear ${person.id === "saito" ? "Saito-san" : "Sakuda-san"}`}
              delay={0.3}
              fontSize={{ base: "2xl", md: "3xl" }}
              color={tokens.colors.primary[600]}
            />
          </CharacterHeader>

          {/* メッセージカード */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: cubicBezier(0.16, 1, 0.3, 1),
            }}
            w="100%"
            maxW={{ base: "100%", sm: "400px", md: "600px", lg: "700px" }}
          >
            <VStack {...componentStyles.messageCard.content}>
              <MotionBox
                {...componentStyles.messageCard.container}
                position="relative"
                transform="translateZ(0)"
                willChange="transform"
                {...tapEffectProps}
                whileHover={{
                  y: -2,
                  scale: 1.01,
                  transition: {
                    duration: 0.25,
                    ease: cubicBezier(0.16, 1, 0.3, 1),
                  },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                {/* 熊さんアイコン群（装飾用） */}
                <BearIcon
                  position={{
                    top: "-16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  opacity={0.9}
                  size={28}
                  imageSize={20}
                />
                <BearIcon
                  position={{
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-250%)",
                  }}
                  opacity={0.6}
                  size={20}
                  imageSize={14}
                  display={{ base: "none", md: "flex" }}
                />
                <BearIcon
                  position={{
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(150%)",
                  }}
                  opacity={0.6}
                  size={20}
                  imageSize={14}
                  display={{ base: "none", md: "flex" }}
                />

                <VStack
                  gap={{
                    base: `calc(${tokens.spacing.lg} + 4px)`,
                    md: tokens.spacing.xl,
                  }}
                >
                  {/* カード内日本語名前 */}
                  <MotionBox
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4,
                      ease: cubicBezier(0.16, 1, 0.3, 1),
                    }}
                  >
                    <Text
                      {...componentStyles.messageCard.text.label}
                    >
                      {person.name}へ
                    </Text>
                  </MotionBox>

                  <VStack gap={{ base: 6, md: 7 }} align="stretch">
                    {person.message.paragraphs.map((paragraph, index) => (
                      <MotionBox
                        as="article"
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.6 + index * 0.1,
                          ease: cubicBezier(0.16, 1, 0.3, 1),
                        }}
                        aria-label={`メッセージ段落 ${index + 1}`}
                      >
                        <Text
                          {...componentStyles.messageCard.text.primary}
                          lineHeight={{ base: "1.7", md: "1.75" }}
                          mb={{ base: 2, md: 3 }}
                        >
                          {paragraph}
                        </Text>
                      </MotionBox>
                    ))}
                  </VStack>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.2,
                      ease: cubicBezier(0.16, 1, 0.3, 1),
                    }}
                  >
                    <VStack gap={3} mt={{ base: 5, md: 6 }}>
                      <chakra.time
                        dateTime={new Date().toISOString()}
                        aria-label="作成日時"
                        style={{ display: "block" }}
                      >
                        <Text 
                          fontSize="xs" 
                          color={tokens.colors.gray[400]} 
                          textAlign="center"
                          opacity={0.8}
                          fontWeight={tokens.typography.fontWeights.normal}
                        >
                          {new Date().toLocaleDateString()}
                        </Text>
                      </chakra.time>
                      <Text
                        fontSize="md"
                        color={tokens.colors.primary[700]}
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

          {/* 戻るボタン（MessageButtonで統一） */}
          <MotionBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MessageButton 
              onClick={onBack} 
              label="戻る" 
              icon={FaArrowLeft}
              aria-label="ホーム画面に戻る"
            />
          </MotionBox>

          {/* フッター */}
          <MotionBox {...componentStyles.animations.fadeIn} textAlign="center" mt={4}>
            <Text 
              fontSize="xs" 
              color={tokens.colors.gray[500]} 
              fontWeight={tokens.typography.fontWeights.medium}
              letterSpacing="0.2px"
              style={{ opacity: 0.7 }}
            >
              ☕ かねこより
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
