/**
 * Reduced Motion Hook - アクセシビリティ対応
 */
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // モバイルデバイスの判定
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // モバイルでは、ユーザーが明示的にreduced motionを設定していない限り、アニメーションを有効にする
    // デスクトップでは従来通りの動作
    const shouldReduceMotion = isMobile ? false : mediaQuery.matches;
    
    setPrefersReducedMotion(shouldReduceMotion);

    const handleChange = (event: MediaQueryListEvent) => {
      // モバイルでは引き続きアニメーションを有効に保つ
      const newShouldReduceMotion = isMobile ? false : event.matches;
      setPrefersReducedMotion(newShouldReduceMotion);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
