"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { componentStyles, tokens } from "@/styles";
import type { Todo } from "@/types/todo";
import { motion, cubicBezier } from "framer-motion";

const MotionBox = motion.create(Box);

export interface TodoItemProps {
  todo: Todo;
  index: number;
  prefersReducedMotion?: boolean;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
  tapEffectProps?: Record<string, unknown>;
}

export function TodoItem({
  todo,
  index,
  prefersReducedMotion,
  onToggle,
  onOpen,
  tapEffectProps,
}: TodoItemProps) {
  const containerProps = componentStyles.messageCard.container as unknown as Record<string, unknown>;
  const { transition: __, _active: ___, _hover: ____, ...containerBase } = containerProps;
  void __; void ___; void ____;

  return (
    <MotionBox
      key={todo.id}
      {...containerBase}
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
            transition: { type: "tween", duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
          })}
      onClick={() => onOpen(todo.id)}
    >
      <HStack gap={4} align="flex-start">
        <Box
          w={{ base: "36px", md: "28px" }}
          h={{ base: "36px", md: "28px" }}
          borderRadius="4px"
          border="2px solid"
          borderColor={todo.completed ? tokens.colors.primary[500] : tokens.colors.gray[400]}
          bg={todo.completed ? tokens.colors.primary[500] : "transparent"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="12px"
          color="white"
          cursor="pointer"
          mt={1}
          aria-label={todo.completed ? "完了を解除" : "完了にする"}
          as="button"
          aria-pressed={todo.completed}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(todo.id);
          }}
          _hover={{
            borderColor: tokens.colors.primary[600],
            bg: todo.completed ? tokens.colors.primary[600] : tokens.colors.primary[50],
          }}
          {...(tapEffectProps ?? {})}
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
              css={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
            >
              {todo.description}
            </Text>
          )}
          <HStack gap={2}>
            {todo.priority && (
              <Box
                as="span"
                fontSize="xs"
                px={2}
                py={0.5}
                borderRadius="full"
                bg={
                  todo.priority === "high"
                    ? "red.100"
                    : todo.priority === "medium"
                      ? "orange.100"
                      : "gray.100"
                }
                color={
                  todo.priority === "high"
                    ? "red.600"
                    : todo.priority === "medium"
                      ? "orange.600"
                      : "gray.600"
                }
              >
                {todo.priority === "high" ? "🔥 高" : todo.priority === "medium" ? "🍊 中" : "🌿 低"}
              </Box>
            )}
            <Text fontSize="xs" color={tokens.colors.gray[400]}>
              {todo.createdAt.toLocaleDateString()}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </MotionBox>
  );
}
