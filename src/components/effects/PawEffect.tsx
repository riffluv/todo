"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Box, Image } from "@chakra-ui/react";
import { tokens, performance } from "@/styles/tokens";
import { useState } from "react";

export interface PawEffectItem {
  id: string;
  x: number;
  y: number;
}

interface PawEffectProps {
  effects: PawEffectItem[];
  onEffectComplete: (id: string) => void;
}

export function PawEffect({ effects, onEffectComplete }: PawEffectProps) {
  const ICON_SIZE = 40; // tokens.spacing["2xl"] is "40px"
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      pointerEvents="none"
      zIndex={9999}
    >
      <AnimatePresence mode="popLayout">
        {effects.map((effect) => (
          <motion.div
            key={effect.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: effect.x - ICON_SIZE / 2, // アイコンサイズの半分でセンタリング
              y: effect.y - ICON_SIZE / 2,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1.2, 1.4, 0.8],
              rotate: [0, -5, 5, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
            }}
            onAnimationComplete={() => onEffectComplete(effect.id)}
            style={{
              position: "absolute",
              width: tokens.spacing["2xl"],
              height: tokens.spacing["2xl"],
              ...performance.gpuAcceleration, // GPU最適化
            }}
          >
            <Image
              src="/manabyicon.png"
              alt="肉球エフェクト"
              width={tokens.spacing["2xl"]}
              height={tokens.spacing["2xl"]}
              objectFit="contain"
              filter={tokens.shadows.bear}
              loading="eager" // 即座にロード
              decoding="sync" // 同期デコード
              style={{
                imageRendering: "crisp-edges", // シャープな描画
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}

export function usePawEffect() {
  const [effects, setEffects] = useState<PawEffectItem[]>([]);

  const addPawEffect = (x: number, y: number) => {
    const id = `paw-${Date.now()}-${Math.random()}`;
    const newEffect: PawEffectItem = { id, x, y };
    
    setEffects((prev) => {
      // パフォーマンス最適化: 最大10個まで同時表示制限
      const newEffects = [...prev, newEffect];
      return newEffects.length > 10 ? newEffects.slice(-10) : newEffects;
    });
  };

  const removeEffect = (id: string) => {
    setEffects((prev) => prev.filter((effect) => effect.id !== id));
  };

  // メモリリーク防止: 古いエフェクトの自動クリーンアップ
  const cleanupOldEffects = () => {
    const now = Date.now();
    setEffects((prev) => 
      prev.filter((effect) => {
        const effectTime = parseInt(effect.id.split('-')[1] || '0', 10);
        return now - effectTime < 5000; // 5秒以上古いものは削除
      })
    );
  };

  return {
    effects,
    addPawEffect,
    removeEffect,
    cleanupOldEffects,
  };
}
