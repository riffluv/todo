/**
 * MessageView Component - 個別メッセージビュー
 * 
 * @description 個人宛メッセージを表示するコンポーネント
 * メインページと統一されたデザインシステムを使用
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
import { cubicBezier, motion } from "framer-motion";
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
          {/* 英語タイトルヘッダー */}
          <CharacterHeader delay={0.1}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: cubicBezier(0.16, 1, 0.3, 1),
              }}
            >
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight={tokens.typography.fontWeights.bold}
                color={tokens.colors.primary[600]}
                textAlign="center"
                letterSpacing="0.02em"
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  w: "40px",
                  h: "2px",
                  bg: `linear-gradient(90deg, transparent, ${tokens.colors.primary[400]}, transparent)`,
                  borderRadius: "full",
                }}
              >
                Dear {person.id === "saito" ? "Saito-san" : "Sakuda-san"}
              </Heading>
            </MotionBox>
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
            maxW="680px"
          >
            <VStack {...componentStyles.messageCard.content}>
              <MotionBox
                {...componentStyles.messageCard.container}
                position="relative"

                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: {
                    duration: 0.3,
                    ease: cubicBezier(0.16, 1, 0.3, 1),
                  },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                {/* 熊さんアイコン群 */}
                <BearIcon
                  position={{ top: "-16px", left: "50%", transform: "translateX(-50%)" }}
                  opacity={0.9}
                  size={28}
                  imageSize={20}
                />
                <BearIcon
                  position={{ top: "-12px", left: "50%", transform: "translateX(-250%)" }}
                  opacity={0.6}
                  size={20}
                  imageSize={14}
                  display={{ base: "none", md: "flex" }}
                />
                <BearIcon
                  position={{ top: "-12px", left: "50%", transform: "translateX(150%)" }}
                  opacity={0.6}
                  size={20}
                  imageSize={14}
                  display={{ base: "none", md: "flex" }}
                />



                <VStack gap={{ base: tokens.spacing.lg, md: tokens.spacing.xl }}>
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
                      borderBottom="none"
                      pb={tokens.spacing.xs}
                      mb={0}
                    >
                      {person.name}へ
                    </Text>
                    {/* オレンジのボーダー */}
                    <Box
                      w="60px"
                      h="3px"
                      bg={`linear-gradient(90deg, ${tokens.colors.primary[400]}, ${tokens.colors.primary[600]})`}
                      borderRadius="full"
                      mx="auto"
                      mt={0}
                      opacity={0.8}
                    />
                  </MotionBox>

                  <VStack gap={6} align="stretch">
                    {person.message.paragraphs.map((paragraph, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.6 + index * 0.1,
                          ease: cubicBezier(0.16, 1, 0.3, 1),
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
                    transition={{
                      duration: 0.6,
                      delay: 1.2,
                      ease: cubicBezier(0.16, 1, 0.3, 1),
                    }}
                  >
                    <VStack gap={3} mt={6}>
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

          {/* 戻るボタン（アイコンのみ） */}
          <MotionBox
            {...componentStyles.animations.bounce}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            display="flex"
            justifyContent="center"
            cursor="pointer"
            onClick={onBack}
            whileHover={{
              scale: 1.1,
              y: -2,
              transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            whileTap={{
              scale: 0.85,
              transition: { duration: 0.15, type: "spring", stiffness: 400 },
            }}
            // Android/iOS対応のタッチフィードバック
            _active={{
              transform: "scale(0.85)",
              transition: "transform 0.1s ease-out",
            }}
            _focus={{
              transform: "scale(0.9)",
              outline: "none",
            }}
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            <MotionBox
              {...(() => {
                const { transition: _, ...iconStyles } = componentStyles.button.message.icon;
                return { ...iconStyles, ...componentStyles.animations.pulse };
              })()}
            >
              <Icon
                as={FaArrowLeft}
                boxSize={{ base: 6, md: 7 }}
                color={tokens.colors.primary[600]}
                transition={`all ${tokens.animations.durations.normal} ${tokens.animations.easings.bounce}`}
              />
            </MotionBox>
          </MotionBox>

          {/* フッター */}
          <MotionBox {...componentStyles.animations.fadeIn} textAlign="center" mt={4}>
            <Text fontSize="xs" color={tokens.colors.gray[400]} lineHeight="1.5">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container >
    </Box >
  );
}