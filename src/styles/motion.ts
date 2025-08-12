/**
 * Motion utilities
 *
 * 中央集約したアニメーションの定数・ユーティリティ
 * - 共通の easing / durations / spring config
 * - Reduced Motion を安全に扱うための helper
 */

import type { Easing, Transition, Variant } from "framer-motion";

// Easing
export const easing = {
  easeOut: [0.25, 0.8, 0.25, 1] as Easing,
  emphasized: [0.4, 0, 0.2, 1] as Easing,
  standard: [0.16, 1, 0.3, 1] as Easing,
};

// Springs for UI
export const springs = {
  uiPress: { type: "spring", stiffness: 500, damping: 28, mass: 0.7 } as Transition,
  soft: { type: "spring", stiffness: 280, damping: 30, mass: 0.9 } as Transition,
};

// Helpers
export function allowMotionVariants(
  allowMotion: boolean,
  active: Variant,
  fallback: Variant = { opacity: 1 },
): Variant {
  return allowMotion ? active : fallback;
}

export function allowMotionTransition(
  allowMotion: boolean,
  active: Transition,
  fallback: Transition = { duration: 0 },
): Transition {
  return allowMotion ? active : fallback;
}

export function makeFadeInUp({
  allowMotion,
  delay = 0,
  distance = 16,
  duration = 0.8,
}: {
  allowMotion: boolean;
  delay?: number;
  distance?: number;
  duration?: number;
}) {
  return {
    initial: allowMotion ? { opacity: 0, y: distance } : { opacity: 1 },
    animate: allowMotion ? { opacity: 1, y: 0 } : { opacity: 1 },
    transition: allowMotion ? { duration, delay, ease: easing.standard } : { duration: 0 },
  };
}
