/**
 * HomeView Component - Todoリストビュー
 *
 * @description メインのTodoリストページコンポーネント
 */

import { AnimatedTitle, BearIcon, CharacterHeader, MessageButton } from "@/components/common";
import { useReducedMotion, useScrollEnhancement, useTapEffectProps } from "@/hooks";
import { useTodos } from "@/hooks/useTodos";
import { componentStyles, themes, tokens } from "@/styles";
import { TodoViewType } from "@/types/todo";
import { Badge, Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";
import { FaCheck, FaClock, FaPlus } from "react-icons/fa";

const MotionBox = motion.create(Box);

export interface HomeViewProps {
  /** ナビゲーションハンドラー */
  onNavigate: (view: TodoViewType) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const containerProps = componentStyles.messageCard.container;
  const tapEffectProps = useTapEffectProps();
  const prefersReducedMotion = useReducedMotion();
  const { todos, loading, pendingCount, completedCount, toggleTodo } = useTodos();

  useScrollEnhancement();

  // ローディング中
  if (loading) {
    return (
      <Box {...componentStyles.page.container} {...themes.home.background} {...tapEffectProps}>
        <Container {...componentStyles.page.content}>
          <VStack justify="center" align="center" minH="50vh">
            <Text color={tokens.colors.gray[500]}>読み込み中...</Text>
          </VStack>
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
                text="manabyTodos"
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

                <Text {...componentStyles.messageCard.text.primary} textAlign="center" maxW="none">
                  今日も一歩ずつ、大切なタスクを進めていきましょう。
                  あなたの成長をmanabyが応援しています！
                </Text>
              </VStack>
            </MotionBox>
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
                todos.map((todo, index) => (
                  <MotionBox
                    key={todo.id}
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
                    cursor="pointer"
                    transform="translateZ(0)"
                    willChange="transform"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1,
                      ease: cubicBezier(0.16, 1, 0.3, 1),
                    }}
                    {...(prefersReducedMotion
                      ? {}
                      : {
                          whileHover: { y: -2, scale: 1.01 },
                          whileTap: { scale: 0.97, y: 1 },
                          transition: {
                            type: "tween",
                            duration: 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          },
                        })}
                    onClick={() => onNavigate(todo.id)}
                  >
                    <HStack gap={4} align="flex-start">
                      <Box
                        w="20px"
                        h="20px"
                        borderRadius="4px"
                        border="2px solid"
                        borderColor={
                          todo.completed ? tokens.colors.primary[500] : tokens.colors.gray[400]
                        }
                        bg={todo.completed ? tokens.colors.primary[500] : "transparent"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="12px"
                        color="white"
                        cursor="pointer"
                        mt={1}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTodo(todo.id);
                        }}
                        _hover={{
                          borderColor: tokens.colors.primary[600],
                          bg: todo.completed
                            ? tokens.colors.primary[600]
                            : tokens.colors.primary[50],
                        }}
                      >
                        {todo.completed && "✓"}
                      </Box>
                      <VStack align="stretch" flex={1} gap={2}>
                        <Text
                          {...componentStyles.messageCard.text.primary}
                          textDecoration={todo.completed ? "line-through" : "none"}
                          opacity={todo.completed ? 0.6 : 1}
                          fontWeight={todo.completed ? "normal" : "medium"}
                        >
                          {todo.title}
                        </Text>
                        {todo.description && (
                          <Text
                            fontSize="sm"
                            color={tokens.colors.gray[600]}
                            textDecoration={todo.completed ? "line-through" : "none"}
                            opacity={todo.completed ? 0.5 : 0.8}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            display="-webkit-box"
                            css={{
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {todo.description}
                          </Text>
                        )}
                        <HStack gap={2}>
                          {todo.priority && (
                            <Badge
                              size="sm"
                              colorScheme={
                                todo.priority === "high"
                                  ? "red"
                                  : todo.priority === "medium"
                                    ? "orange"
                                    : "gray"
                              }
                            >
                              {todo.priority === "high"
                                ? "高"
                                : todo.priority === "medium"
                                  ? "中"
                                  : "低"}
                            </Badge>
                          )}
                          <Text fontSize="xs" color={tokens.colors.gray[400]}>
                            {todo.createdAt.toLocaleDateString()}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </MotionBox>
                ))
              )}
            </VStack>
          </MotionBox>

          {/* 新規追加ボタン */}
          <MotionBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            pt={{ base: "36px", md: "48px" }}
            pb={{ base: "28px", md: "36px" }}
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: "16px",
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
              onClick={() => onNavigate("add")}
              label="新しいタスク"
              icon={FaPlus}
              aria-label="新しいタスクを追加"
            />
          </MotionBox>

          {/* 改良されたフッター */}
          <MotionBox
            {...componentStyles.animations.fadeInUp}
            textAlign="center"
            mt={{ base: tokens.spacing.lg, md: tokens.spacing.xl }}
            px={tokens.spacing.md}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: cubicBezier(0.16, 1, 0.3, 1),
            }}
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
