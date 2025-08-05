"use client";

import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// Motion components
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

// Constants - 黄金比ベースの設計値
const GOLDEN_RATIO = 1.618;
const FADE_OUT_DURATION = 500;
const BEAR_COUNT = 3;

const SIZES = {
  logo: {
    width: { base: "260px", md: "324px" },
    height: { base: "71px", md: "89px" },
  },
  bear: {
    size: { base: "40px", md: "52px" },
    gap: { base: "20px", md: "32px" },
  },
  container: {
    gap: { base: "48px", md: "64px" },
    maxWidth: { base: "320px", md: "400px" },
  },
} as const;

const ANIMATIONS = {
  logo: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  bearContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, delay: 0.3 },
  },
  bear: {
    animate: {
      opacity: [0.25, 1, 0.25],
      scale: [0.85, 1.05, 0.85],
    },
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  overlay: {
    initial: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

interface LoadingScreenProps {
  /** ローディング完了時のコールバック */
  onComplete?: () => void;
  /** ローディング表示時間（ミリ秒） */
  duration?: number;
}

export function LoadingScreen({
  onComplete,
  duration = 3500,
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, FADE_OUT_DURATION);
  }, [onComplete]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(handleComplete, duration);
    return () => clearTimeout(timer);
  }, [duration, handleComplete]);

  // SSR対応
  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionBox
          position="fixed"
          inset="0"
          zIndex="9999"
          bg="#fafafa"
          {...ANIMATIONS.overlay}
        >
          <MotionFlex
            height="100vh"
            width="100vw"
            direction="column"
            align="center"
            justify="center"
            px={4}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap={SIZES.container.gap}
              maxW={SIZES.container.maxWidth}
              w="100%"
            >
              {/* Manaby Logo */}
              <MotionBox
                {...ANIMATIONS.logo}
                w="100%"
                display="flex"
                justifyContent="center"
              >
                <Box
                  position="relative"
                  width={SIZES.logo.width}
                  height={SIZES.logo.height}
                >
                  <Image
                    src="/manabylogo.png"
                    alt="Manaby"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 260px, 324px"
                    priority
                  />
                </Box>
              </MotionBox>

              {/* Bear Loading Animation */}
              <MotionBox
                {...ANIMATIONS.bearContainer}
                display="flex"
                justifyContent="center"
              >
                <Flex gap={SIZES.bear.gap} align="center">
                  {Array.from({ length: BEAR_COUNT }, (_, i) => (
                    <MotionBox
                      key={i}
                      w={SIZES.bear.size}
                      h={SIZES.bear.size}
                      animate={ANIMATIONS.bear.animate}
                      transition={{
                        ...ANIMATIONS.bear.transition,
                        delay: i * 0.3,
                      }}
                    >
                      <Image
                        src="/manabyicon.png"
                        alt=""
                        width={52}
                        height={52}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                        priority
                      />
                    </MotionBox>
                  ))}
                </Flex>
              </MotionBox>
            </Flex>
          </MotionFlex>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
