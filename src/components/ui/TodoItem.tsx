"use client";

import { componentStyles, tokens } from "@/styles";
import type { Todo } from "@/types/todo";
import { Box, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";
import { LuFlame, LuLeaf, LuSun } from "react-icons/lu";

const MotionBox = motion.create(Box);

export interface TodoItemProps {
  todo: Todo;
  index: number;
  prefersReducedMotion?: boolean;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
}

export function TodoItem({ todo, index, prefersReducedMotion, onToggle, onOpen }: TodoItemProps) {
  const containerProps = componentStyles.messageCard.container as unknown as Record<
    string,
    unknown
  >;
  const { transition: __, _active: ___, _hover: ____, ...containerBase } = containerProps;
  void __;
  void ___;
  void ____;

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
        <Box onClick={(e) => e.stopPropagation()} mt={1}>
          <Checkbox.Root
            size="md"
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            colorPalette="orange"
            aria-label={todo.completed ? "完了を解除" : "完了にする"}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Box>
        <VStack align="stretch" flex={1} gap={1}>
          <Text
            {...componentStyles.messageCard.text.primary}
            textDecoration={todo.completed ? "line-through" : "none"}
            opacity={todo.completed ? 0.6 : 1}
            fontWeight={todo.completed ? "normal" : "semibold"}
            lineHeight={1.6}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text
              fontSize="sm"
              color={tokens.colors.gray[600]}
              textDecoration={todo.completed ? "line-through" : "none"}
              opacity={todo.completed ? 0.5 : 0.9}
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              css={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
            >
              {todo.description}
            </Text>
          )}
          <HStack gap={3} align="center">
            {todo.priority && (
              <HStack gap={1} fontSize="xs" color={tokens.colors.gray[600]}>
                {todo.priority === "high" && <LuFlame color="#e11d48" size={14} />}
                {todo.priority === "medium" && <LuSun color="#ea580c" size={14} />}
                {todo.priority === "low" && <LuLeaf color="#16a34a" size={14} />}
                <Text as="span">
                  {todo.priority === "high" ? "高" : todo.priority === "medium" ? "中" : "低"}
                </Text>
              </HStack>
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
