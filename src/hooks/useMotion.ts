"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * useAllowMotion
 *
 * Reduced Motion 設定を考慮しつつ、forceMotion が true のときはアニメーションを許可する。
 */
export function useAllowMotion(forceMotion: boolean | undefined): boolean {
  const prefersReducedMotion = useReducedMotion();
  return Boolean(forceMotion || !prefersReducedMotion);
}
