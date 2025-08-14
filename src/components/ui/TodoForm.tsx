"use client";

import { Box, Button, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { tokens } from "@/styles";
import type { TodoFormData } from "@/types/todo";

export type TodoPriority = NonNullable<TodoFormData["priority"]>;

export interface TodoFormProps {
  value: TodoFormData;
  onChange: (next: TodoFormData) => void;
}

export function TodoForm({ value, onChange }: TodoFormProps) {
  return (
    <Box w="100%">
      <Input
        value={value.title}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
        placeholder="タスクのタイトル"
        size="lg"
        aria-label="タスクのタイトル"
        borderColor={tokens.colors.primary[300]}
        _focus={{
          borderColor: tokens.colors.primary[500],
          boxShadow: `0 0 0 1px ${tokens.colors.primary[500]}`,
        }}
      />

      <Textarea
        mt={4}
        value={value.description}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
        placeholder="詳細説明（オプション）"
        rows={4}
        aria-label="詳細説明"
        borderColor={tokens.colors.primary[300]}
        _focus={{
          borderColor: tokens.colors.primary[500],
          boxShadow: `0 0 0 1px ${tokens.colors.primary[500]}`,
        }}
      />

      <Box w="100%" mt={4}>
        <Text fontSize="sm" mb={2} color={tokens.colors.gray[600]}>
          優先度
        </Text>
        <HStack gap={2}>
          <Button
            size="sm"
            variant={value.priority === "low" ? "solid" : "outline"}
            colorScheme="gray"
            onClick={() => onChange({ ...value, priority: "low" })}
            aria-pressed={value.priority === "low"}
          >
            低
          </Button>
          <Button
            size="sm"
            variant={value.priority === "medium" ? "solid" : "outline"}
            colorScheme="orange"
            onClick={() => onChange({ ...value, priority: "medium" })}
            aria-pressed={value.priority === "medium"}
          >
            中
          </Button>
          <Button
            size="sm"
            variant={value.priority === "high" ? "solid" : "outline"}
            colorScheme="red"
            onClick={() => onChange({ ...value, priority: "high" })}
            aria-pressed={value.priority === "high"}
          >
            高
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
