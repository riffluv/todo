"use client";

import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export function LoadingScreen({
  onComplete,
  duration = 2000,
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 600);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="9999"
          bg="white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <MotionFlex
            height="100vh"
            width="100vw"
            direction="column"
            align="center"
            justify="center"
            gap={{ base: 6, md: 8 }}
            px={{ base: 4, md: 8 }}
          >
            {/* ロゴのみ中央配置 */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box
                position="relative"
                width={{ base: "220px", sm: "260px", md: "320px", lg: "380px" }}
                height={{ base: "60px", sm: "70px", md: "90px", lg: "110px" }}
              >
                <Image
                  src="/manabylogo.png"
                  alt="manaby logo"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 480px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                  priority
                />
              </Box>
            </MotionBox>
            {/* 熊アイコン3つのアニメーション */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Flex gap={{ base: 2, md: 3, lg: 4 }} align="center">
                {[0, 1, 2].map((i) => (
                  <MotionBox
                    key={i}
                    w={{ base: "30px", sm: "34px", md: "40px", lg: "44px" }}
                    h={{ base: "30px", sm: "34px", md: "40px", lg: "44px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/manabyicon.png"
                      alt="manaby icon"
                      width={44}
                      height={44}
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
          </MotionFlex>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
