import { cubicBezier } from "framer-motion";
/**
 * Animation Component Styles
 *
 * @description アニメーション関連のスタイル定義
 */

export const animationStyles = {
  fadeInUp: {
    initial: { opacity: 0, y: 24, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -32, filter: "blur(2px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    initial: { opacity: 0, filter: "blur(2px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  bounce: {
    whileHover: {
      scale: 1.03,
      y: -6,
      transition: { stiffness: 500, damping: 30 },
    },
    whileTap: {
      scale: 0.97,
      y: -2,
      transition: { stiffness: 600, damping: 35 },
    },
  },
  float: {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  },
};
