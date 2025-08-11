/**
 * MessageButton Component - 再利用可能なメッセージボタン
 *
 * @description 統一されたデザインシステムに基づくメッセージボタンコンポーネント
 */
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { componentStyles } from "@/styles/components";
import { tokens } from "@/styles/tokens";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const MotionBox = motion.create(VStack);
const MotionIconBox = motion.create(VStack);

export interface MessageButtonProps {
  /** クリック時のハンドラー */
  onClick: () => void;
  /** ボタンのラベル */
  label: string;
  /** アニメーション遅延時間 */
  delay?: number;
  /** 無効化状態 */
  disabled?: boolean;
  /** アイコン（省略時は封筒） */
  icon?: React.ElementType;
}

export function MessageButton({
  onClick,
  label,
  delay = 0.6,
  disabled = false,
  icon = FaEnvelope,
}: MessageButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [pressed, setPressed] = React.useState(false);
  const [showRipple, setShowRipple] = React.useState(false);
  const [showDelayedBorder, setShowDelayedBorder] = React.useState(false);
  const [iconColorStage, setIconColorStage] = React.useState<"normal" | "pressed" | "delayed">(
    "normal",
  );

  const { transition: _, ...iconProps } = componentStyles.button.message.icon;
  void _;

  // Pointerイベントで統一（iOS/Android/デスクトップ一貫）
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    // マウス右クリックなどは無視
    if (e.button && e.button !== 0) return;
    setPressed(true);

    // アイコン色変化の段階的アニメーション
    setIconColorStage("pressed"); // 即座に押下色に
    setTimeout(() => setIconColorStage("delayed"), 100); // 100ms後に遅延色に

    // リップル効果を開始
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);

    // 遅延オレンジボーダーを表示（150ms後）
    setTimeout(() => setShowDelayedBorder(true), 150);
  };

  const clearPressed = () => {
    setPressed(false);
    // アイコン色を通常に戻す（少し遅延させて自然に）
    setTimeout(() => setIconColorStage("normal"), 150);
    // 遅延ボーダーもクリア
    setTimeout(() => setShowDelayedBorder(false), 200);
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
    if (disabled) return;
    clearPressed();
  };

  const handlePointerCancel: React.PointerEventHandler<HTMLDivElement> = () => {
    clearPressed();
  };

  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    clearPressed();
  };

  // button のネイティブ挙動（Enter/Spaceでクリック）に任せる

  // アンマウント/ページ遷移時に押下状態を確実に解除
  React.useEffect(() => {
    const onWinPointerUp = () => clearPressed();
    const onVisibility = () => {
      if (document.visibilityState !== "visible") clearPressed();
    };
    const onWinKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") clearPressed();
    };
    window.addEventListener("pointerup", onWinPointerUp, true);
    window.addEventListener("keyup", onWinKeyUp, true);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      setPressed(false);
      window.removeEventListener("pointerup", onWinPointerUp, true);
      window.removeEventListener("keyup", onWinKeyUp, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // クリック時は先に押下状態を解除してから遷移
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    // マウス操作時はフォーカスを残さない
    (e.currentTarget as HTMLElement).blur();
    clearPressed();
    onClick();
  };

  return (
    <MotionBox
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <MotionBox
        as={motion.create("button")}
        {...(() => {
          const {
            transition: __,
            _active: ___,
            _hover: ____,
            _focus: _____,
            _focusVisible: ______,
            // Chakraの型の都合
            ["@media (hover: none)"]: _______,
            ...containerBase
          } = componentStyles.button.message.container as Record<string, unknown>;
          // Silence unused var lints for destructured style props not used directly
          void __;
          void ___;
          void ____;
          void _____;
          void ______;
          void _______;
          return containerBase;
        })()}
        type="button"
        {...(!disabled ? { onClick: handleClick } : {})}
        aria-label={label}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        // キーボード操作はネイティブに委譲（重複発火防止）
        // マウスクリックでフォーカスを当てない（focus-visibleのみ表示）
        onMouseDown={(e) => e.preventDefault()}
        opacity={disabled ? 0.6 : 1}
        cursor={disabled ? "not-allowed" : "pointer"}
        // フォーカス時のオレンジ背景・スケールは無効化（枠線のみ）
        _focus={{ outline: "none" }}
        _focusVisible={{
          outline: `${tokens.focus.ring.width} ${tokens.focus.ring.style} ${tokens.focus.ring.color}`,
          outlineOffset: tokens.focus.ring.offset,
          // 影は付けない（背景っぽく見えるのを防ぐ）
        }}
        {...(!disabled
          ? {
              whileHover: {
                scale: 1.03,
                y: -6,
                transition: { stiffness: 500, damping: 30 },
              },
            }
          : {})}
        // 一流デザイナー基準の押下アニメーション
        animate={pressed ? { scale: 0.94, y: 1 } : { scale: 1, y: 0 }}
        transition={
          pressed
            ? { type: "tween", duration: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
            : { type: "tween", duration: 0.15, ease: [0.16, 1, 0.3, 1] }
        }
        // 全デバイス対応のタッチ設定（Pointerイベント）
        style={{
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        // 押下中の見た目（コンテナ側）- 一流デザイナー基準
        {...(pressed
          ? {
              transform: "scale(0.94) translateY(1px)",
            }
          : {})}
      >
        <MotionIconBox
          {...iconProps}
          {...componentStyles.animations.pulse}
          position="relative"
          overflow="hidden"
          // 押下中の見た目（アイコン円）- より洗練されたスタイル
          {...(pressed
            ? {
                background: `rgba(255, 248, 240, 0.9)`,
                transform: "scale(0.92)",
                borderColor: tokens.colors.primary[300],
                boxShadow: `0 1px 4px ${tokens.colors.primary[200]}40, inset 0 1px 2px rgba(0, 0, 0, 0.05)`,
              }
            : {})}
          // 遅延サブトルボーダーのスタイル
          {...(showDelayedBorder
            ? {
                borderColor: tokens.colors.primary[400],
                borderWidth: "1px",
                boxShadow: `0 0 0 1px ${tokens.colors.primary[300]}60, 0 2px 8px ${tokens.colors.primary[200]}30`,
              }
            : {})}
          animate={pressed ? { scale: 0.92, rotate: 1 } : { scale: 1, rotate: 0 }}
          transition={
            pressed
              ? { type: "tween", duration: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
              : { type: "tween", duration: 0.15, ease: [0.16, 1, 0.3, 1] }
          }
        >
          {/* サブトルリップル効果 */}
          {showRipple && (
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${tokens.colors.primary[200]}40 0%, ${tokens.colors.primary[300]}20 50%, transparent 70%)`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          )}

          <motion.div
            animate={
              iconColorStage === "delayed"
                ? { scale: 1.05, rotate: -1 } // 遅延色時に少し大きく
                : pressed
                  ? { scale: 0.95, rotate: -1 }
                  : { scale: 1, rotate: 0 }
            }
            transition={
              iconColorStage === "delayed"
                ? { type: "spring", stiffness: 1200, damping: 50, mass: 0.25 } // 遅延時はより弾性的に
                : pressed
                  ? { type: "spring", stiffness: 900, damping: 45, mass: 0.3 }
                  : { type: "spring", stiffness: 600, damping: 35, mass: 0.5 }
            }
            style={{ position: "relative", zIndex: 2 }}
          >
            <Icon
              as={icon}
              boxSize={{ base: 5, md: 6 }}
              color={
                iconColorStage === "delayed"
                  ? tokens.colors.primary[700] // 遅延時：最も濃い色
                  : iconColorStage === "pressed"
                    ? tokens.colors.primary[600] // 押下時：中間色
                    : tokens.colors.primary[500] // 通常時：標準色
              }
              transition={`color ${tokens.animations.durations.fast} ${tokens.animations.easings.easeInOut}`}
            />
          </motion.div>
        </MotionIconBox>
        <Text {...componentStyles.button.message.label}>{label}</Text>
      </MotionBox>
    </MotionBox>
  );
}
