"use client";

import { a11y } from "@/styles/tokens";
import { useCallback, useRef } from "react";
import { usePawEffectContext } from "../components/providers/PawEffectProvider";

export function useTapEffect() {
  const { triggerPawEffect } = usePawEffectContext();
  const lastTapTime = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);

  const handleTap = useCallback(
    (event: React.PointerEvent) => {
      // 左クリック/タップのみ許可
      if (event.pointerType === "mouse" && event.button !== 0) return;

      // パフォーマンス最適化: スロットリング（100ms間隔制限）
      const now = Date.now();
      if (now - lastTapTime.current < 100) return;
      lastTapTime.current = now;

      // 二重発火防止
      if (isPointerDown.current) return;
      isPointerDown.current = true;

      const clientX = event.clientX;
      const clientY = event.clientY;

      triggerPawEffect(clientX, clientY);

      // 少し遅らせて解除（長押しや連打に強く）
      setTimeout(() => {
        isPointerDown.current = false;
      }, 80);
    },
    [triggerPawEffect],
  );

  return { handleTap };
}

// 特定の要素に肉球エフェクトを適用するためのプロパティを返すフック
export function useTapEffectProps() {
  const { handleTap } = useTapEffect();

  return {
    onPointerUp: handleTap,
    style: { cursor: "pointer", ...a11y.touchTarget },
  };
}
