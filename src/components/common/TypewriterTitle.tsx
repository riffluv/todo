/**
 * TypewriterTitle Component - タイピングアニメーション付きタイトル
 */
"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { tokens } from "@/styles/tokens";
import { Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionHeading = motion.create(Heading);

interface TypewriterTitleProps {
  text: string;
  delay?: number;
  fontSize?: { base: string; md: string };
  color?: string;
}

export function TypewriterTitle({ 
  text, 
  delay = 0.2, 
  fontSize = { base: "2xl", md: "3xl" },
  color = tokens.colors.primary[600]
}: TypewriterTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showExclamation, setShowExclamation] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text + "!");
      setShowCursor(false);
      setShowExclamation(false);
      return;
    }

    let currentIndex = 0;
    const timer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          // カーソルを点滅させる
          const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
          }, 530);
          
          // 3秒後にカーソルを非表示にして感嘆符を表示
          setTimeout(() => {
            clearInterval(cursorInterval);
            setShowCursor(false);
            setShowExclamation(true);
          }, 3000);
        }
      }, 80);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay, prefersReducedMotion]);

  return (
    <MotionHeading
      fontSize={fontSize}
      fontFamily={tokens.typography.fontFamilies.heading}
      fontWeight={tokens.typography.fontWeights.semibold}
      color={color}
      textAlign="center"
      letterSpacing={tokens.typography.letterSpacings.wide}
      lineHeight={tokens.typography.lineHeights.tight}
      position="relative"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        w: "48px",
        h: "2px",
        bg: `linear-gradient(90deg, transparent, ${tokens.colors.primary[400]}, transparent)`,
        borderRadius: "full",
      }}
    >
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ 
            color: tokens.colors.primary[500],
            marginLeft: "2px"
          }}
        >
          |
        </motion.span>
      )}
      {showExclamation && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ 
            color: tokens.colors.primary[600],
            marginLeft: "2px",
            fontWeight: tokens.typography.fontWeights.bold
          }}
        >
          !
        </motion.span>
      )}
    </MotionHeading>
  );
}
