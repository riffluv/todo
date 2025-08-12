"use client";

import { useEffect, useState } from "react";

export interface UseTypewriterOptions {
  text: string;
  delaySeconds?: number;
  allowMotion: boolean;
  charIntervalMs?: number;
  cursorBlinkMs?: number;
  cursorHideAfterMs?: number;
}

export function useTypewriter({
  text,
  delaySeconds = 0.2,
  allowMotion,
  charIntervalMs = 80,
  cursorBlinkMs = 530,
  cursorHideAfterMs = 3000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showExclamation, setShowExclamation] = useState(false);

  useEffect(() => {
    // Reduced motion: すぐに確定表示
    if (!allowMotion) {
      setDisplayText(text + "!");
      setShowCursor(false);
      setShowExclamation(false);
      return;
    }

    let isUnmounted = false;
    let cursorIntervalId: number | undefined;
    let typeIntervalId: number | undefined;
    let hideTimeoutId: number | undefined;

    const start = () => {
      let currentIndex = 0;
      typeIntervalId = window.setInterval(() => {
        if (isUnmounted) return;
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex += 1;
        } else {
          if (typeIntervalId) window.clearInterval(typeIntervalId);
          // カーソル点滅
          cursorIntervalId = window.setInterval(() => {
            setShowCursor((prev) => !prev);
          }, cursorBlinkMs);

          // 一定時間後にカーソル停止 + 感嘆符表示
          hideTimeoutId = window.setTimeout(() => {
            if (cursorIntervalId) window.clearInterval(cursorIntervalId);
            setShowCursor(false);
            setShowExclamation(true);
          }, cursorHideAfterMs);
        }
      }, charIntervalMs);
    };

    const delayId = window.setTimeout(start, delaySeconds * 1000);

    return () => {
      isUnmounted = true;
      window.clearTimeout(delayId);
      if (typeIntervalId) window.clearInterval(typeIntervalId);
      if (cursorIntervalId) window.clearInterval(cursorIntervalId);
      if (hideTimeoutId) window.clearTimeout(hideTimeoutId);
    };
  }, [text, delaySeconds, allowMotion, charIntervalMs, cursorBlinkMs, cursorHideAfterMs]);

  return { displayText, showCursor, showExclamation } as const;
}
