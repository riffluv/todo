/**
 * AddTodoView Component - Todo追加ビュー
 *
 * @description 新しいTodoを追加するためのフォームコンポーネント
 */
"use client";

import { BearIcon, CharacterHeader, MessageButton, TypewriterTitle } from "@/components/common";
import { useReducedMotion, useScrollEnhancement, useTapEffectProps } from "@/hooks";
import { useTodos } from "@/hooks/useTodos";
import { componentStyles, themes, tokens } from "@/styles";
import { TodoFormData } from "@/types/todo";
import { Box, Button, Container, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";
import { useState } from "react";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

const MotionBox = motion.create(Box);

export interface AddTodoViewProps {
  /** 戻るボタンのハンドラー */
  onBack: () => void;
}

export function AddTodoView({ onBack }: AddTodoViewProps) {
  const { createTodo } = useTodos();
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tapEffectProps = useTapEffectProps();
  const prefersReducedMotion = useReducedMotion();

  useScrollEnhancement();

  // 保存処理
  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      const todoData: TodoFormData = {
        title: formData.title.trim(),
        priority: formData.priority,
      };

      if (formData.description?.trim()) {
        todoData.description = formData.description.trim();
      }

      const newTodo = createTodo(todoData);

      if (newTodo) {
        alert("新しいタスクを追加しました！");
        onBack();
      }
    } catch {
      alert("保存に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // リセット処理
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
    });
  };

  return (
    <Box {...componentStyles.page.container} {...themes.home.background} {...tapEffectProps}>
      <Container {...componentStyles.page.content}>
        {/* 統一ヘッダーセクション */}
        <Box {...componentStyles.page.header}>
          <CharacterHeader delay={0.1}>
            <Box role="heading" aria-level={1}>
              <TypewriterTitle
                text="新しいタスク"
                delay={0.3}
                fontSize={{ base: "2xl", md: "3xl" }}
                color={tokens.colors.primary[600]}
                forceMotion
              />
            </Box>
          </CharacterHeader>
        </Box>

        {/* 統一メインコンテンツセクション */}
        <VStack as="main" role="main" {...componentStyles.page.main}>
          {/* フォームカード */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.3, ease: cubicBezier(0.16, 1, 0.3, 1) }
            }
            w="100%"
            maxW={{ base: "100%", sm: "400px", md: "600px", lg: "720px" }}
          >
            <VStack {...componentStyles.messageCard.content} gap={{ base: "24px", md: "32px" }}>
              <MotionBox
                {...(() => {
                  const {
                    transition: __,
                    _active: ___,
                    _hover: ____,
                    ...containerBase
                  } = componentStyles.messageCard.container as unknown as Record<string, unknown>;
                  void __;
                  void ___;
                  void ____;
                  return containerBase;
                })()}
                position="relative"
                transform="translateZ(0)"
                willChange="transform"
                {...tapEffectProps}
              >
                {/* 熊さんアイコン群 */}
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

                <VStack gap={{ base: tokens.spacing.lg, md: tokens.spacing.xl }}>
                  <Text {...componentStyles.messageCard.text.label}>
                    どんなタスクを追加しますか？
                  </Text>

                  <VStack w="100%" gap={6}>
                    {/* タイトル入力 */}
                    <Box w="100%">
                      <Text
                        fontSize="sm"
                        mb={2}
                        color={tokens.colors.gray[600]}
                        fontWeight="medium"
                      >
                        タスクのタイトル *
                      </Text>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="例: プロジェクト資料を作成する"
                        size="lg"
                        borderColor={tokens.colors.primary[300]}
                        _focus={{
                          borderColor: tokens.colors.primary[500],
                          boxShadow: `0 0 0 1px ${tokens.colors.primary[500]}`,
                        }}
                        _placeholder={{
                          color: tokens.colors.gray[400],
                        }}
                      />
                    </Box>

                    {/* 詳細説明 */}
                    <Box w="100%">
                      <Text
                        fontSize="sm"
                        mb={2}
                        color={tokens.colors.gray[600]}
                        fontWeight="medium"
                      >
                        詳細説明（オプション）
                      </Text>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="タスクの詳細や注意点などを記述できます"
                        rows={4}
                        borderColor={tokens.colors.primary[300]}
                        _focus={{
                          borderColor: tokens.colors.primary[500],
                          boxShadow: `0 0 0 1px ${tokens.colors.primary[500]}`,
                        }}
                        _placeholder={{
                          color: tokens.colors.gray[400],
                        }}
                      />
                    </Box>

                    {/* 優先度選択 */}
                    <Box w="100%">
                      <Text
                        fontSize="sm"
                        mb={3}
                        color={tokens.colors.gray[600]}
                        fontWeight="medium"
                      >
                        優先度
                      </Text>
                      <HStack gap={3} justify="center">
                        <Button
                          size="md"
                          variant={formData.priority === "low" ? "solid" : "outline"}
                          colorScheme="gray"
                          onClick={() => setFormData({ ...formData, priority: "low" })}
                          flex={1}
                          maxW="120px"
                        >
                          低
                        </Button>
                        <Button
                          size="md"
                          variant={formData.priority === "medium" ? "solid" : "outline"}
                          colorScheme="orange"
                          onClick={() => setFormData({ ...formData, priority: "medium" })}
                          flex={1}
                          maxW="120px"
                        >
                          中
                        </Button>
                        <Button
                          size="md"
                          variant={formData.priority === "high" ? "solid" : "outline"}
                          colorScheme="red"
                          onClick={() => setFormData({ ...formData, priority: "high" })}
                          flex={1}
                          maxW="120px"
                        >
                          高
                        </Button>
                      </HStack>
                    </Box>
                  </VStack>
                </VStack>
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* アクションボタン */}
          <MotionBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            pt={{ base: "24px", md: "32px" }}
            pb={{ base: "28px", md: "36px" }}
          >
            <HStack gap={4} justify="center" wrap="wrap">
              <MessageButton
                onClick={handleSave}
                label={isSubmitting ? "保存中..." : "保存"}
                icon={FaSave}
                disabled={isSubmitting || !formData.title.trim()}
                aria-label="タスクを保存"
              />
              <MessageButton
                onClick={handleReset}
                label="リセット"
                icon={FaTimes}
                disabled={isSubmitting}
                aria-label="フォームをリセット"
              />
            </HStack>
          </MotionBox>

          {/* 戻るボタン */}
          <MotionBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: "-16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "56px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(253, 127, 40, 0.2), transparent)",
              display: { base: "none", md: "block" },
            }}
          >
            <MessageButton
              onClick={onBack}
              label="戻る"
              icon={FaArrowLeft}
              disabled={isSubmitting}
              aria-label="リストに戻る"
            />
          </MotionBox>

          {/* フッター */}
          <MotionBox
            {...componentStyles.animations.fadeIn}
            textAlign="center"
            mt={{ base: tokens.spacing.lg, md: tokens.spacing.xl }}
          >
            <Text
              fontSize="xs"
              color={tokens.colors.gray[500]}
              fontWeight={tokens.typography.fontWeights.medium}
              letterSpacing="0.2px"
              style={{ opacity: 0.7 }}
            >
              ☕ あなたの成長をサポート
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
