/**
 * useScrollEnhancement Hook
 * 
 * @description スクロール体験を向上させるカスタムフック
 * スムーススクロールやスクロール位置の管理を提供
 */

import { useEffect, useState, useCallback } from 'react';

export interface ScrollEnhancement {
  /** 現在のスクロール位置 */
  scrollY: number;
  /** スクロール方向 */
  scrollDirection: 'up' | 'down' | null;
  /** ページトップかどうか */
  isAtTop: boolean;
  /** スムーススクロール関数 */
  smoothScrollTo: (target: number | HTMLElement) => void;
}

/**
 * スクロール拡張フック
 * 
 * @returns ScrollEnhancement オブジェクト
 */
export function useScrollEnhancement(): ScrollEnhancement {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const smoothScrollTo = useCallback((target: number | HTMLElement) => {
    if (typeof window === 'undefined') return;

    const targetY = typeof target === 'number' 
      ? target 
      : target.offsetTop;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollInfo = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY < 10);
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollInfo);
        ticking = true;
      }
    };

    // 初期値設定
    setScrollY(window.scrollY);
    setIsAtTop(window.scrollY < 10);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollY,
    scrollDirection,
    isAtTop,
    smoothScrollTo,
  };
}
