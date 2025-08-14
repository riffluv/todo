/**
 * TodoView Component - Todo詳細・編集ビュー
 *
 * @description Todo詳細表示と編集を行うコンポーネント
 * 既存のデザインシステムを使用
 */
"use client";

import { BearIcon, CharacterHeader, TypewriterTitle } from "@/components/common";
import { useReducedMotion, useScrollEnhancement, useTapEffectProps } from "@/hooks";
import { useTodos } from "@/hooks/useTodos";
import { componentStyles, themes, tokens } from "@/styles";
import { Todo, TodoFormData } from "@/types/todo";
import { Badge, Box, Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { TodoForm } from "@/components/ui/TodoForm";
import { toaster } from "@/components/ui/toaster";
import { cubicBezier, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { CircleButton } from "@/components/ui";

const MotionBox = motion.create(Box);

export interface TodoViewProps {
  /** TodoのID */
  todoId: string;
  /** 戻るボタンのハンドラー */
  onBack: () => void;
}

export function TodoView({ todoId, onBack }: TodoViewProps) {
  const { getTodo, modifyTodo, removeTodo } = useTodos();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
    priority: "medium",
  });

  const tapEffectProps = useTapEffectProps();
  const prefersReducedMotion = useReducedMotion();
  // use app-level toaster

  useScrollEnhancement();

  // Todo データの読み込み
  useEffect(() => {
    const todoData = getTodo(todoId);
    if (todoData) {
      setTodo(todoData);
      setFormData({
        title: todoData.title,
        description: todoData.description || "",
        priority: todoData.priority || "medium",
      });
    }
  }, [todoId, getTodo]);

  // 保存処理
  const handleSave = async () => {
    if (!todo || !formData.title.trim()) {
      toaster.create({
        title: "タイトルが未入力です",
        description: "タスクのタイトルを入力してください",
        type: "info",
      });
      return;
    }

    try {
      const updatedTodo = modifyTodo(todo.id, {
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        priority: formData.priority,
      });

      if (updatedTodo) {
        setTodo(updatedTodo);
        setIsEditing(false);
        toaster.create({ title: "タスクを更新しました", type: "success" });
      }
    } catch {
      toaster.create({ title: "保存に失敗しました", type: "error" });
    }
  };

  // 削除処理
  const handleDelete = async () => {
    if (!todo) return;

    if (window.confirm("このタスクを削除しますか？")) {
      try {
        const success = removeTodo(todo.id);
        if (success) {
          toaster.create({ title: "タスクを削除しました", type: "success" });
          onBack();
        }
      } catch {
        toaster.create({ title: "削除に失敗しました", type: "error" });
      }
    }
  };

  // 完了状態の切り替え
  const handleToggleComplete = () => {
    if (!todo) return;

    try {
      const updatedTodo = modifyTodo(todo.id, { completed: !todo.completed });
      if (updatedTodo) {
        setTodo(updatedTodo);
        toaster.create({
          title: updatedTodo.completed ? "完了しました！お疲れ様でした！" : "未完了に戻しました",
          type: updatedTodo.completed ? "success" : "info",
        });
      }
    } catch {
      toaster.create({ title: "更新に失敗しました", type: "error" });
    }
  };

  if (!todo) {
    return (
      <Box {...componentStyles.page.container} {...themes.home.background} {...tapEffectProps}>
        <Container {...componentStyles.page.content}>
          <VStack justify="center" align="center" minH="50vh" gap={4}>
            <Text color={tokens.colors.gray[500]}>タスクが見つかりません</Text>
            <CircleButton icon={FaArrowLeft} label="戻る" onClick={onBack} aria-label="戻る" />
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
          <CharacterHeader delay={0.1}>
            <Box role="heading" aria-level={1}>
              <TypewriterTitle
                text={isEditing ? "編集中" : "タスク詳細"}
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
          {/* Todoカード */}
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
                  {/* 完了チェックボックスとステータス */}
                  <HStack justify="space-between" w="100%" align="center">
                    <HStack gap={3}>
                      <Box
                        w={{ base: "36px", md: "28px" }}
                        h={{ base: "36px", md: "28px" }}
                        borderRadius="4px"
                        border="2px solid"
                        borderColor={
                          todo.completed ? tokens.colors.primary[500] : tokens.colors.gray[400]
                        }
                        bg={todo.completed ? tokens.colors.primary[500] : "transparent"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="14px"
                        color="white"
                        cursor="pointer"
                        aria-label={todo.completed ? "完了を解除" : "完了にする"}
                        as="button"
                        aria-pressed={todo.completed}
                        onClick={handleToggleComplete}
                        _hover={{
                          borderColor: tokens.colors.primary[600],
                          bg: todo.completed
                            ? tokens.colors.primary[600]
                            : tokens.colors.primary[50],
                        }}
                        {...tapEffectProps}
                      >
                        {todo.completed && "✓"}
                      </Box>
                      <Text fontSize="sm" color={tokens.colors.gray[600]}>
                        {todo.completed ? "完了済み" : "未完了"}
                      </Text>
                    </HStack>

                    <HStack gap={2}>
                      {todo.priority && (
                        <Badge
                          colorScheme={
                            todo.priority === "high"
                              ? "red"
                              : todo.priority === "medium"
                                ? "orange"
                                : "gray"
                          }
                        >
                          {todo.priority === "high"
                            ? "高優先度"
                            : todo.priority === "medium"
                              ? "中優先度"
                              : "低優先度"}
                        </Badge>
                      )}
                    </HStack>
                  </HStack>

                  {/* タイトル編集 */}
                  {isEditing ? (
                    <TodoForm value={formData} onChange={setFormData} />
                  ) : (
                    <VStack gap={4} align="stretch" w="100%">
                      <Text
                        {...componentStyles.messageCard.text.primary}
                        textAlign="center"
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="semibold"
                        textDecoration={todo.completed ? "line-through" : "none"}
                        opacity={todo.completed ? 0.6 : 1}
                      >
                        {todo.title}
                      </Text>

                      {todo.description && (
                        <Text
                          {...componentStyles.messageCard.text.primary}
                          textAlign="left"
                          whiteSpace="pre-wrap"
                          textDecoration={todo.completed ? "line-through" : "none"}
                          opacity={todo.completed ? 0.6 : 0.9}
                        >
                          {todo.description}
                        </Text>
                      )}

                      <VStack gap={2} align="center">
                        <Text fontSize="sm" color={tokens.colors.gray[500]}>
                          作成日: {todo.createdAt.toLocaleDateString()}
                        </Text>
                        {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                          <Text fontSize="sm" color={tokens.colors.gray[500]}>
                            更新日: {todo.updatedAt.toLocaleDateString()}
                          </Text>
                        )}
                      </VStack>
                    </VStack>
                  )}
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
              {isEditing ? (
                <>
                  <Button onClick={handleSave} aria-label="変更を保存" display="inline-flex" alignItems="center" gap={2}>
                    <FaSave aria-hidden />
                    保存
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        title: todo.title,
                        description: todo.description || "",
                        priority: todo.priority || "medium",
                      });
                    }}
                    aria-label="編集をキャンセル"
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                  >
                    <FaTimes aria-hidden />
                    キャンセル
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} aria-label="タスクを編集" display="inline-flex" alignItems="center" gap={2}>
                    <FaEdit aria-hidden />
                    編集
                  </Button>
                  <Button onClick={handleDelete} aria-label="タスクを削除" display="inline-flex" alignItems="center" gap={2}>
                    <FaTrash aria-hidden />
                    削除
                  </Button>
                </>
              )}
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
            <CircleButton icon={FaArrowLeft} label="戻る" onClick={onBack} aria-label="リストに戻る" />
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
