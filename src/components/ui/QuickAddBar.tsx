"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { HStack, Input, Button, Box } from "@chakra-ui/react";
import { tokens } from "@/styles";

export interface QuickAddBarHandle {
  focus: () => void;
  clear: () => void;
  submit: () => void;
}

export interface QuickAddBarProps {
  onAdd: (title: string) => void | Promise<void>;
  placeholder?: string;
  isSubmitting?: boolean;
}

export const QuickAddBar = forwardRef<QuickAddBarHandle, QuickAddBarProps>(
  ({ onAdd, placeholder = "タスクを入力してEnter", isSubmitting = false }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => setValue(""),
      submit: () => void submit(),
    }));

    const submit = async () => {
      const title = value.trim();
      if (!title) return;
      await onAdd(title);
      setValue("");
      inputRef.current?.focus();
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await submit();
      }
    };

    return (
      <Box role="form" aria-label="クイック追加フォーム">
        <HStack gap={2} align="stretch">
          <Input
            id="quick-add-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="新しいタスクを入力"
            flex={1}
            bg="#fff"
            borderColor="rgba(209, 120, 66, 0.25)"
            _focus={{
              borderColor: tokens.colors.primary[400],
              boxShadow: `0 0 0 3px ${tokens.colors.primary[200]}`,
            }}
          />
          <Button
            colorScheme="orange"
            onClick={submit}
            disabled={!value.trim()}
            aria-label="タスクを追加"
          >
            {isSubmitting ? "追加中..." : "追加"}
          </Button>
        </HStack>
      </Box>
    );
  },
);

QuickAddBar.displayName = "QuickAddBar";
