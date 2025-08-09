/**
 * usePerformanceOptimization Hook
 * 
 * @description パフォーマンス最適化のためのカスタムフック
 * GPU加速やレンダリング最適化を提供
 */

import { useMemo } from 'react';

export interface PerformanceOptimization {
  /** GPU加速用のスタイルプロパティ */
  gpuAcceleration: React.CSSProperties;
  /** パフォーマンス監視フラグ */
  isOptimized: boolean;
}

/**
 * パフォーマンス最適化フック
 * 
 * @returns PerformanceOptimization オブジェクト
 */
export function usePerformanceOptimization(): PerformanceOptimization {
  const gpuAcceleration = useMemo((): React.CSSProperties => ({
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    willChange: 'transform, opacity',
  }), []);

  const isOptimized = useMemo(() => {
    // ブラウザがGPU加速をサポートしているかチェック
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  }, []);

  return {
    gpuAcceleration,
    isOptimized,
  };
}
