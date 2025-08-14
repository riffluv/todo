"use client";

import { BearIcon, CharacterHeader } from "@/components/common";
import { CircleButton } from "@/components/ui";
import { toaster } from "@/components/ui/toaster";
import { useReducedMotion, useScrollEnhancement, useTapEffectProps } from "@/hooks";
import { useTodos } from "@/hooks/useTodos";
import { componentStyles, themes, tokens } from "@/styles";
import { Todo } from "@/types/todo";
import { Box, Button, Container, Dialog, HStack, List, Text, VStack } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";
import { useState } from "react";
import { FaArrowLeft, FaTrash, FaTrashRestore } from "react-icons/fa";

const MotionBox = motion.create(Box);

export interface TrashViewProps {
  onBack: () => void;
}

export function TrashView({ onBack }: TrashViewProps) {
  const { todos, restoreFromTrash, emptyTrash } = useTodos();
  const archived = todos.filter((t) => t.archivedAt);
  const tapEffectProps = useTapEffectProps();
  const prefersReducedMotion = useReducedMotion();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useScrollEnhancement();

  const handleRestore = (todo: Todo) => {
    restoreFromTrash(todo.id);
    toaster.create({ title: `「${todo.title}」を復元しました`, type: "success" });
  };

  const handleEmpty = () => setConfirmOpen(true);

  const confirmPurge = () => {
    const removed = emptyTrash();
    if (removed > 0) {
      toaster.create({ title: `${removed}件を完全に削除しました`, type: "success" });
    } else {
      toaster.create({ title: "削除する項目がありません", type: "info" });
    }
    setConfirmOpen(false);
  };

  return (
    <Box {...componentStyles.page.container} {...themes.home.background} {...tapEffectProps}>
      <Container {...componentStyles.page.content}>
        {/* Header */}
        <Box {...componentStyles.page.header}>
          <CharacterHeader>
            <Box role="heading" aria-level={1}>
              <Text
                as="h1"
                fontSize={{ base: "2xl", md: "3xl" }}
                color={tokens.colors.primary[600]}
              >
                ゴミ箱
              </Text>
            </Box>
          </CharacterHeader>
        </Box>

        {/* Main */}
        <VStack as="main" role="main" {...componentStyles.page.main}>
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
                } = componentStyles.messageCard.container as unknown as Record<string, unknown>;
                void __;
                void ___;
                void ____;
                return containerBase;
              })()}
            >
              <BearIcon
                position={{ top: "-16px", left: "50%", transform: "translateX(-50%)" }}
                opacity={0.9}
                size={28}
                imageSize={20}
              />
              <VStack gap={{ base: tokens.spacing.md, md: tokens.spacing.lg }}>
                <HStack w="100%" justify="space-between" align="center">
                  <Text fontSize="sm" color={tokens.colors.gray[600]}>
                    {archived.length} 件
                  </Text>
                  <Button
                    onClick={handleEmpty}
                    aria-label="ゴミ箱を空にする"
                    colorPalette="red"
                    variant="subtle"
                  >
                    <FaTrash /> ゴミ箱を空にする
                  </Button>
                </HStack>

                {archived.length === 0 ? (
                  <VStack gap={4} py={8}>
                    <Text {...componentStyles.messageCard.text.primary} textAlign="center">
                      ゴミ箱は空です
                    </Text>
                    <Text fontSize="sm" color={tokens.colors.gray[500]} textAlign="center">
                      削除したタスクはここに表示されます
                    </Text>
                  </VStack>
                ) : (
                  <List.Root as="ul" m={0} p={0} w="100%" unstyled>
                    {archived.map((todo) => (
                      <List.Item as="li" key={todo.id} m={0} p={0}>
                        <HStack
                          justify="space-between"
                          align="center"
                          {...(() => {
                            const {
                              transition: __,
                              _active: ___,
                              _hover: ____,
                              ...containerBase
                            } = componentStyles.messageCard.container as unknown as Record<
                              string,
                              unknown
                            >;
                            void __;
                            void ___;
                            void ____;
                            return containerBase;
                          })()}
                          p={4}
                        >
                          <VStack align="start" gap={1}>
                            <Text fontWeight="semibold">{todo.title}</Text>
                            {todo.description && (
                              <Text
                                fontSize="sm"
                                color={tokens.colors.gray[600]}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                display="-webkit-box"
                                css={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                              >
                                {todo.description}
                              </Text>
                            )}
                          </VStack>
                          <HStack gap={2}>
                            <Button
                              onClick={() => handleRestore(todo)}
                              aria-label="復元"
                              variant="subtle"
                            >
                              <FaTrashRestore /> 復元
                            </Button>
                          </HStack>
                        </HStack>
                      </List.Item>
                    ))}
                  </List.Root>
                )}
              </VStack>
            </MotionBox>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <CircleButton icon={FaArrowLeft} label="戻る" onClick={onBack} aria-label="戻る" />
          </MotionBox>

          {/* Confirm Dialog */}
          <Dialog.Root
            role="alertdialog"
            open={confirmOpen}
            onOpenChange={(e) => setConfirmOpen(e.open)}
          >
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                  <Dialog.Title>ゴミ箱を空にしますか？</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text color={tokens.colors.gray[600]}>
                    この操作は元に戻せません。アーカイブされたタスクを完全に削除します。
                  </Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <HStack gap={2} justify="flex-end">
                    <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
                      キャンセル
                    </Button>
                    <Button colorPalette="red" onClick={confirmPurge} aria-label="完全に削除">
                      完全に削除
                    </Button>
                  </HStack>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </VStack>
      </Container>
    </Box>
  );
}
