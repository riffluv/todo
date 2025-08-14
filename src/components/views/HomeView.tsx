/**
 * HomeView Component - Todoリストビュー
 *
 * @description メインのTodoリストページコンポーネント
 */

import { AnimatedTitle, BearIcon, CharacterHeader } from "@/components/common";
import { CircleButton, QuickAddBar, TodoItem } from "@/components/ui";
import type { QuickAddBarHandle } from "@/components/ui/QuickAddBar";
import { useReducedMotion, useScrollEnhancement, useTapEffectProps } from "@/hooks";
import { useTodos } from "@/hooks/useTodos";
import { componentStyles, themes, tokens } from "@/styles";
import { TodoViewType } from "@/types/todo";
import { Badge, Box, Container, HStack, List, Text, VStack } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaClock, FaListUl, FaPlus } from "react-icons/fa";

const MotionBox = motion.create(Box);

export interface HomeViewProps {
  /** ナビゲーションハンドラー */
  onNavigate: (view: TodoViewType) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const containerProps = componentStyles.messageCard.container;
  const tapEffectProps = useTapEffectProps();
  const prefersReducedMotion = useReducedMotion();
  const { todos, loading, pendingCount, completedCount, toggleTodo, createTodo } = useTodos();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const quickAddRef = useRef<QuickAddBarHandle | null>(null);

  useScrollEnhancement();

  // キーボードショートカット: nでQuickAddにフォーカス
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "n" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        quickAddRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, []);

  // ローディング中
  if (loading) {
    return (
      <Box {...componentStyles.page.container} {...themes.home.background} {...tapEffectProps}>
        <Container {...componentStyles.page.content}>
          <VStack justify="center" align="center" minH="40vh" gap={4}>
            <Text color={tokens.colors.gray[500]}>読み込み中...</Text>
          </VStack>

          {/* デスクトップ用 新しいタスク（上部）*/}
          <HStack justify="center" display={{ base: "none", md: "flex" }}>
            <CircleButton onClick={() => onNavigate("add")} label="新しいタスク" icon={FaPlus} />
          </HStack>

          {/* モバイル用 FAB */}
          <Box
            position={{ base: "fixed", md: "relative" }}
            right={{ base: "20px", md: "auto" }}
            bottom={{ base: "20px", md: "auto" }}
            zIndex={1000}
            display={{ base: "block", md: "none" }}
          >
            <CircleButton onClick={() => onNavigate("add")} label="新しいタスク" icon={FaPlus} />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box {...componentStyles.page.container} {...themes.home.background} {...tapEffectProps}>
      <Container {...componentStyles.page.content}>
        {/* 統一ヘッダーセクション */}
        <Box {...componentStyles.page.header}>
          <CharacterHeader>
            <Box role="heading" aria-level={1}>
              <AnimatedTitle
                text="manaby-todo"
                delay={0.4}
                fontSize={{ base: "2xl", md: "3xl" }}
                color={tokens.colors.primary[600]}
                lineHeight={{ base: "1.2", md: "1.25" }}
                letterSpacing="0.01em"
                forceMotion
              />
            </Box>
          </CharacterHeader>
        </Box>

        {/* 統一メインコンテンツセクション */}
        <VStack as="main" role="main" {...componentStyles.page.main}>
          {/* サマリーカード */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.2, ease: cubicBezier(0.16, 1, 0.3, 1) }
            }
            w="100%"
            maxW={{ base: "100%", sm: "400px", md: "600px", lg: "720px" }}
          >
            <MotionBox
              {...(() => {
                const {
                  transition: __,
                  _active: ___,
                  _hover: ____,
                  ...containerBase
                } = containerProps as unknown as Record<string, unknown>;
                void __;
                void ___;
                void ____;
                return containerBase;
              })()}
              transform="translateZ(0)"
              willChange="transform"
              mb={{ base: "24px", md: "32px" }}
            >
              {/* 装飾的な熊さんアイコン群 */}
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

              <VStack gap={{ base: tokens.spacing.md, md: tokens.spacing.lg }}>
                <HStack gap={4} justify="center" wrap="wrap">
                  <Badge
                    colorScheme="orange"
                    px={3}
                    py={1}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <FaClock size={12} />
                    {pendingCount}件 進行中
                  </Badge>
                  <Badge
                    colorScheme="green"
                    px={3}
                    py={1}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <FaCheck size={12} />
                    {completedCount}件 完了
                  </Badge>
                </HStack>

                {/* Encouragement message removed per request */}
              </VStack>
            </MotionBox>
          </MotionBox>

          {/* フィルタ（すべて／進行中／完了） */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.25, ease: cubicBezier(0.16, 1, 0.3, 1) }
            }
            w="100%"
            maxW={{ base: "100%", sm: "400px", md: "600px", lg: "720px" }}
          >
            <HStack gap={2} justify="center" mb={{ base: 2, md: 3 }}>
              <Badge
                as="button"
                onClick={() => setFilter("all")}
                colorScheme={filter === "all" ? "orange" : "gray"}
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack gap={2} align="center">
                  <FaListUl size={12} />
                  <Text as="span">すべて ({todos.length})</Text>
                </HStack>
              </Badge>
              <Badge
                as="button"
                onClick={() => setFilter("pending")}
                colorScheme={filter === "pending" ? "orange" : "gray"}
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack gap={2} align="center">
                  <FaClock size={12} />
                  <Text as="span">進行中 ({pendingCount})</Text>
                </HStack>
              </Badge>
              <Badge
                as="button"
                onClick={() => setFilter("completed")}
                colorScheme={filter === "completed" ? "green" : "gray"}
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack gap={2} align="center">
                  <FaCheck size={12} />
                  <Text as="span">完了 ({completedCount})</Text>
                </HStack>
              </Badge>
            </HStack>
          </MotionBox>

          {/* クイック追加 */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.25, ease: cubicBezier(0.16, 1, 0.3, 1) }
            }
            w="100%"
            maxW={{ base: "100%", sm: "400px", md: "600px", lg: "720px" }}
            mb={{ base: 2, md: 3 }}
          >
            <QuickAddBar
              ref={quickAddRef}
              onAdd={(title) => void createTodo({ title })}
              placeholder="クイック追加: タイトルを入力してね。"
            />
          </MotionBox>

          {/* デスクトップ用 新しいタスク（上部配置で常に見える） */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.28, ease: cubicBezier(0.16, 1, 0.3, 1) }
            }
            w="100%"
            maxW={{ base: "100%", sm: "400px", md: "600px", lg: "720px" }}
            mb={{ base: 2, md: 4 }}
            display={{ base: "none", md: "block" }}
          >
            <HStack justify="center">
              <CircleButton onClick={() => onNavigate("add")} label="新しいタスク" icon={FaPlus} />
            </HStack>
          </MotionBox>

          {/* Todoリスト */}
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
            <VStack gap={{ base: "16px", md: "20px" }}>
              {todos.length === 0 ? (
                <MotionBox
                  {...(() => {
                    const {
                      transition: __,
                      _active: ___,
                      _hover: ____,
                      ...containerBase
                    } = containerProps as unknown as Record<string, unknown>;
                    void __;
                    void ___;
                    void ____;
                    return containerBase;
                  })()}
                  py={8}
                >
                  <VStack gap={4}>
                    <Text {...componentStyles.messageCard.text.primary} textAlign="center">
                      まだタスクがありません
                    </Text>
                    <Text fontSize="sm" color={tokens.colors.gray[500]} textAlign="center">
                      新しいタスクを追加して始めましょう！
                    </Text>
                  </VStack>
                </MotionBox>
              ) : (
                <List.Root as="ul" role="list" m={0} p={0} w="100%" unstyled>
                  {(filter === "all"
                    ? todos
                    : filter === "pending"
                      ? todos.filter((t) => !t.completed)
                      : todos.filter((t) => t.completed)
                  ).map((todo, index) => (
                    <List.Item as="li" key={todo.id} role="listitem" m={0} p={0}>
                      <TodoItem
                        todo={todo}
                        index={index}
                        prefersReducedMotion={prefersReducedMotion}
                        onToggle={toggleTodo}
                        onOpen={(id) => onNavigate(id)}
                      />
                    </List.Item>
                  ))}
                </List.Root>
              )}
            </VStack>
          </MotionBox>

          {/* 新規追加ボタン（モバイルは右下固定のFAB） */}
          <MotionBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            position={{ base: "fixed", md: "relative" }}
            right={{ base: "20px", md: "auto" }}
            bottom={{ base: "20px", md: "auto" }}
            pt={{ base: 0, md: "36px" }}
            pb={{ base: 0, md: "36px" }}
            zIndex={1000}
            display={{ base: "block", md: "none" }}
          >
            <CircleButton onClick={() => onNavigate("add")} label="新しいタスク" icon={FaPlus} />
          </MotionBox>

          {/* 共通フッターはルートレイアウトにて固定表示 */}
        </VStack>
      </Container>
    </Box>
  );
}
