/**
 * Keyboard Navigation Hook - アクセシビリティ強化
 */
"use client";

import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  onEscape?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
}

export function useKeyboardNavigation({
  onEscape,
  onEnter,
  onSpace,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onEscape?.();
          break;
        case "Enter":
          if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            onEnter?.();
          }
          break;
        case " ":
          if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            onSpace?.();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, onEnter, onSpace]);
}
