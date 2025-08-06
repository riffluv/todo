/**
 * HomeView Component - ホームページビュー
 * 
 * @description メインのホームページコンポーネント
 */
"use client";

import { AnimatedTitle } from "@/components/common/AnimatedTitle";
import { BearIcon } from "@/components/common/BearIcon";
import { CharacterHeader } from "@/components/common/CharacterHeader";
import { MessageButton } from "@/components/common/MessageButton";
import { componentStyles } from "@/styles/components";
import { themes } from "@/styles/themes";
import { tokens } from "@/styles/tokens";
import { PersonConfig, ViewType } from "@/types/message";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

export interface HomeViewProps {
  /** メッセージデータ */
  messages: PersonConfig[];
  /** ナビゲーションハンドラー */
  onNavigate: (view: ViewType) => void;
}

export function HomeView({ messages, onNavigate }: HomeViewProps) {
  return (
    <Box {...componentStyles.page.container} {...themes.home.background}>
      <Container {...componentStyles.page.content}>
        <VStack gap={{ base: 16, md: 20 }} align="center">
          {/* キャラクターヘッダー */}
          <CharacterHeader>
            <AnimatedTitle text="Thanks!" delay={0.4} />
          </CharacterHeader>

          {/* メッセージコンテナ */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            w="100%"
            maxW="680px"
          >
            <VStack {...componentStyles.messageCard.content}>
              {/* メインメッセージカード */}
              <MotionBox
                {...componentStyles.messageCard.container}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* 熊さんアイコン群 */}
                <BearIcon
                  position={{ top: "-12px", left: "50%", transform: "translateX(-50%)" }}
                  opacity={0.9}
                />
                <BearIcon
                  position={{ top: "-10px", left: "50%", transform: "translateX(-200%)" }}
                  opacity={0.7}
                  display={{ base: "none", md: "flex" }}
                />
                <BearIcon
                  position={{ top: "-10px", left: "50%", transform: "translateX(100%)" }}
                  opacity={0.7}
                  display={{ base: "none", md: "flex" }}
                />

                <VStack gap={8}>
                  <Text {...componentStyles.messageCard.text.label}>
                    お二人へ
                  </Text>

                  <Text {...componentStyles.messageCard.text.primary}>
                    manaby大宮事業所で一緒に学んだ日々は、私にとってとても貴重な時間でした。
                    お二人がいてくれたおかげで、Web制作の勉強も楽しく続けることができました。
                    いつも支えてくれて、本当にありがとうございました。
                    これからもお二人の活躍を心から応援しています。
                  </Text>
                </VStack>
              </MotionBox>

              {/* アクションエリア */}
              <Box w="100%" pt={4}>
                <HStack
                  gap={{ base: 8, md: 16 }}
                  justify="center"
                  flexWrap="wrap"
                >
                  {messages.map((person, index) => (
                    <MessageButton
                      key={person.id}
                      onClick={() => onNavigate(person.id)}
                      label={person.buttonLabel}
                      delay={0.6 + index * 0.2}
                    />
                  ))}
                </HStack>
              </Box>
            </VStack>
          </MotionBox>

          {/* フッター */}
          <MotionBox {...componentStyles.animations.fadeIn} textAlign="center" mt={8}>
            <Text fontSize="xs" color={tokens.colors.gray[400]} lineHeight="1.5">
              Web制作で学んだ技術を込めて作成しました
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}