/**
 * TypewriterTitle Component - タイピングアニメーション付きタイトル
 */
"use client";

import { useAllowMotion } from "@/hooks/useMotion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { allowMotionTransition, easing, makeFadeInUp } from "@/styles/motion";
import { tokens } from "@/styles/tokens";
import { Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionHeading = motion.create(Heading);

interface TypewriterTitleProps {
  text: string;
  delay?: number;
  fontSize?: { base: string; md: string };
  color?: string;
  /** 端末のReduced Motion設定に関わらずアニメーションを強制 */
  forceMotion?: boolean;
}

export function TypewriterTitle({
  text,
  delay = 0.2,
  fontSize = { base: "2xl", md: "3xl" },
  color = tokens.colors.primary[600],
  forceMotion = false,
}: TypewriterTitleProps) {
  const allowMotion = useAllowMotion(forceMotion);
  const { displayText, showCursor, showExclamation } = useTypewriter({
    text,
    delaySeconds: delay,
    allowMotion,
    charIntervalMs: 80,
    cursorBlinkMs: 530,
    cursorHideAfterMs: 3000,
  });

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
      {...makeFadeInUp({ allowMotion, delay, distance: 20, duration: 0.6 })}
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
          transition={allowMotionTransition(allowMotion, {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          })}
          style={{
            color: tokens.colors.primary[500],
            marginLeft: "2px",
          }}
        >
          |
        </motion.span>
      )}
      {showExclamation && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={allowMotionTransition(allowMotion, {
            duration: 0.4,
            ease: easing.standard,
          })}
          style={{
            color: tokens.colors.primary[600],
            marginLeft: "2px",
            fontWeight: tokens.typography.fontWeights.bold,
          }}
        >
          !
        </motion.span>
      )}
    </MotionHeading>
  );
}
