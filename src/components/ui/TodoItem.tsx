"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { componentStyles, tokens } from "@/styles";
import type { Todo } from "@/types/todo";
import { Box, Checkbox, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { animate, cubicBezier, motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { LuFlame, LuLeaf, LuSun } from "react-icons/lu";

const MotionBox = motion.create(Box);

export interface TodoItemProps {
  todo: Todo;
  index: number;
  prefersReducedMotion?: boolean;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
  onArchive?: (id: string) => void;
}

export function TodoItem({
  todo,
  index,
  prefersReducedMotion,
  onToggle,
  onOpen,
  onArchive,
}: TodoItemProps) {
  const containerProps = componentStyles.messageCard.container as unknown as Record<
    string,
    unknown
  >;
  const { transition: __, _active: ___, _hover: ____, ...containerBase } = containerProps;
  void __;
  void ___;
  void ____;

  // 行全体のドラッグ用 MotionValue
  const x = useMotionValue(0);
  // スワイプ方向に応じた背景のフェード
  const bgOpacityLeft = useTransform(x, [-120, -60, 0], [0.16, 0.08, 0]);
  const bgOpacityRight = useTransform(x, [0, 60, 120], [0, 0.08, 0.16]);
  // しきい値（距離/速度） - 体感に合わせてやや緩め
  const distanceThreshold = 72; // px
  const velocityThreshold = 600; // px/s（おおよそ）
  // ドラッグ中の誤タップ防止用（再レンダーを跨いで維持）
  const isDraggingRef = useRef(false);

  const handleArchive = () => {
    if (!onArchive) return;
    onArchive(todo.id);
  };

  return (
    <MotionBox
      key={todo.id}
      {...containerBase}
      transform="translateZ(0)"
      willChange="transform"
      className="todoItem"
      css={{
        "&:hover .todoItem__trash": { opacity: 1 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.4 + index * 0.1,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      }}
      position="relative"
      overflow="hidden"
    >
      {/* 背景レイヤー（左右に色を敷き、前景の行がスライドして露出）*/}
      <MotionBox
        position="absolute"
        inset={0}
        bg="red.50"
        style={{ opacity: bgOpacityLeft as unknown as number }}
        pointerEvents="none"
      />
      <MotionBox
        position="absolute"
        inset={0}
        bg="green.50"
        style={{ opacity: bgOpacityRight as unknown as number }}
        pointerEvents="none"
      />

      {/* 前景（行全体）: ドラッグ対象 */}
      <MotionBox
        style={{ x, touchAction: "pan-y" as unknown as string }}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.2}
        dragMomentum={false}
        // 未達時は中央へスナップ
        dragSnapToOrigin
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={(_, info) => {
          const offsetX = info.offset.x;
          const velocityX = info.velocity.x ?? 0;
          const swipeLeft = offsetX <= -distanceThreshold || velocityX <= -velocityThreshold;
          const swipeRight = offsetX >= distanceThreshold || velocityX >= velocityThreshold;

          if (swipeLeft && onArchive) {
            // 左スワイプ: 退場アニメ後にゴミ箱へ
            void animate(x, -320, { type: "spring", stiffness: 300, damping: 30 }).finished.then(
              () => {
                x.set(0);
                handleArchive();
              },
            );
          } else if (swipeRight) {
            // 右スワイプ: 完了トグル
            void animate(x, 320, { type: "spring", stiffness: 300, damping: 30 }).finished.then(
              () => {
                x.set(0);
                onToggle(todo.id);
              },
            );
          } else {
            // 中央へスナップバック（保険）
            void animate(x, 0, { type: "spring", stiffness: 500, damping: 38 });
          }
          // 少し待ってタップを許容
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 50);
        }}
        onClick={(e) => {
          if (isDraggingRef.current) {
            e.stopPropagation();
            return;
          }
          onOpen(todo.id);
        }}
        cursor="pointer"
        {...(prefersReducedMotion
          ? {}
          : {
              whileHover: { y: -2, scale: 1.01 },
              whileTap: { scale: 0.97, y: 1 },
              transition: { type: "tween", duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
            })}
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

          <Box onClick={(e) => e.stopPropagation()}>
            <Tooltip
              content="ゴミ箱へ移動"
              portalled
              positioning={{ placement: "top" }}
              disabled={!onArchive}
            >
              <IconButton
                aria-label="ゴミ箱へ移動"
                variant="ghost"
                colorPalette="red"
                size="sm"
                onClick={handleArchive}
                className="todoItem__trash"
                opacity={{ base: 1, md: 0 }}
                transition="opacity 0.2s ease"
                pointerEvents={onArchive ? "auto" : "none"}
              >
                <FaTrash />
              </IconButton>
            </Tooltip>
          </Box>
        </HStack>
      </MotionBox>
    </MotionBox>
  );
}
