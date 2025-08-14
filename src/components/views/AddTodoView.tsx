/**
 * AddTodoView Component - Todo追加ビュー
 *
 * @description 新しいTodoを追加するためのフォームコンポーネント
 */
"use client";

import { BearIcon, CharacterHeader, TypewriterTitle } from "@/components/common";
import { CircleButton } from "@/components/ui";
import { TodoForm } from "@/components/ui/TodoForm";
import { toaster } from "@/components/ui/toaster";
import { useReducedMotion, useScrollEnhancement, useTapEffectProps } from "@/hooks";
import { useTodos } from "@/hooks/useTodos";
import { componentStyles, themes, tokens } from "@/styles";
import { TodoFormData } from "@/types/todo";
import { Box, Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
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
  // use app-level toaster

  const tapEffectProps = useTapEffectProps();
  const prefersReducedMotion = useReducedMotion();

  useScrollEnhancement();

  // 保存処理
  const handleSave = async () => {
    if (!formData.title.trim()) {
      toaster.create({
        title: "タイトルが未入力です",
        description: "タスクのタイトルを入力してください",
        type: "info",
      });
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
        toaster.create({ title: "タスクを追加しました", type: "success" });
        onBack();
      }
    } catch {
      toaster.create({ title: "保存に失敗しました", type: "error" });
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
                    <TodoForm value={formData} onChange={setFormData} />
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
              <Button
                onClick={handleSave}
                disabled={isSubmitting || !formData.title.trim()}
                aria-label="タスクを保存"
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <FaSave aria-hidden />
                {isSubmitting ? "保存中..." : "保存"}
              </Button>
              <Button
                onClick={handleReset}
                disabled={isSubmitting}
                aria-label="フォームをリセット"
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <FaTimes aria-hidden />
                リセット
              </Button>
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
            <CircleButton
              icon={FaArrowLeft}
              label="戻る"
              onClick={onBack}
              disabled={isSubmitting}
              aria-label="リストに戻る"
            />
          </MotionBox>

          {/* 共通フッターはルートレイアウトにて固定表示 */}
        </VStack>
      </Container>
    </Box>
  );
}
