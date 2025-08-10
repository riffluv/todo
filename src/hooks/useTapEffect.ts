"use client";

import { useCallback, useRef } from "react";
import { usePawEffectContext } from "../components/providers/PawEffectProvider";
import { a11y } from "@/styles/tokens";

export function useTapEffect() {
  const { triggerPawEffect } = usePawEffectContext();
  const lastTapTime = useRef<number>(0);

  const handleTap = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    // パフォーマンス最適化: スロットリング（100ms間隔制限）
    const now = Date.now();
    if (now - lastTapTime.current < 100) {
      return;
    }
    lastTapTime.current = now;

    let clientX: number;
    let clientY: number;

    // マウスイベントとタッチイベントの両方に対応
    if ('touches' in event && event.touches.length > 0) {
      // タッチイベント
      clientX = event.touches[0]?.clientX ?? 0;
      clientY = event.touches[0]?.clientY ?? 0;
    } else if ('clientX' in event) {
      // マウスイベント
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return;
    }

    // 肉球エフェクトを発動
    triggerPawEffect(clientX, clientY);
  }, [triggerPawEffect]);

  return { handleTap };
}

// 特定の要素に肉球エフェクトを適用するためのプロパティを返すフック
export function useTapEffectProps() {
  const { handleTap } = useTapEffect();

  return {
    onClick: handleTap,
    onTouchStart: handleTap,
    style: { cursor: 'pointer', ...a11y.touchTarget },
  };
}
