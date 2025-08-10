"use client";

import { useEffect, useState } from "react";

export function useImagePreload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setError(null);
    };
    
    img.onerror = () => {
      setError(`Failed to load image: ${src}`);
      setIsLoaded(false);
    };
    
    img.src = src;
    
    // クリーンアップ
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, error };
}

// 複数画像の事前ロード
export function useMultipleImagePreload(sources: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    let loadedImages = 0;
    const imageErrors: string[] = [];

    const loadPromises = sources.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        
        img.onerror = () => {
          imageErrors.push(`Failed to load: ${src}`);
          setErrors([...imageErrors]);
          resolve();
        };
        
        img.src = src;
      });
    });

    Promise.all(loadPromises);
  }, [sources]);

  return {
    loadedCount,
    totalCount: sources.length,
    isAllLoaded: loadedCount === sources.length,
    errors,
  };
}
