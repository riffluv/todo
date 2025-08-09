// =============================================================================
// 感謝のメッセージアプリ - カスタムフック
// Professional React hooks for the application
// =============================================================================

import { throttle } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ローカルストレージフック
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

/**
 * デバウンス値フック
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 前の値を保持するフック
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

/**
 * マウント状態フック
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMounted;
}

/**
 * ウィンドウサイズフック
 */
export function useWindowSize(): { width: number; height: number } {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/**
 * デバイスタイプフック
 */
export function useDeviceType(): "mobile" | "tablet" | "desktop" {
  const { width } = useWindowSize();

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * スクロール位置フック
 */
export function useScrollPosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePosition = throttle(() => {
      setPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    }, 100);

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return position;
}

/**
 * 交差監視フック (Intersection Observer)
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit,
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}

/**
 * クリック外部検知フック
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/**
 * ホットキーフック
 */
export function useHotkey(
  keys: string[],
  callback: () => void,
  deps: React.DependencyList = [],
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedKeys: string[] = [];
      if (event.metaKey) pressedKeys.push("meta");
      if (event.ctrlKey) pressedKeys.push("ctrl");
      if (event.shiftKey) pressedKeys.push("shift");
      if (event.altKey) pressedKeys.push("alt");
      if (
        event.key !== "Meta" &&
        event.key !== "Control" &&
        event.key !== "Shift" &&
        event.key !== "Alt"
      ) {
        pressedKeys.push(event.key.toLowerCase());
      }

      if (keys.every((key) => pressedKeys.includes(key.toLowerCase()))) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, deps);
}

/**
 * コピー機能フック
 */
export function useCopyToClipboard(): [boolean, (text: string) => Promise<void>] {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.warn("Failed to copy to clipboard:", error);
    }
  }, []);

  return [isCopied, copyToClipboard];
}

/**
 * ローディング状態フック
 */
export function useLoading(initialValue: boolean = false): {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  toggleLoading: () => void;
} {
  const [isLoading, setIsLoading] = useState(initialValue);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  const toggleLoading = useCallback(() => setIsLoading((prev) => !prev), []);

  return { isLoading, startLoading, stopLoading, toggleLoading };
}

/**
 * トグル状態フック
 */
export function useToggle(
  initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setToggle = useCallback((newValue: boolean) => setValue(newValue), []);

  return [value, toggle, setToggle];
}

/**
 * カウンターフック
 */
export function useCounter(initialValue: number = 0): {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
} {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const set = useCallback((value: number) => setCount(value), []);

  return { count, increment, decrement, reset, set };
}

/**
 * 配列状態フック
 */
export function useArray<T>(initialValue: T[] = []): {
  array: T[];
  set: (array: T[]) => void;
  push: (element: T) => void;
  filter: (callback: (element: T, index: number) => boolean) => void;
  update: (index: number, element: T) => void;
  remove: (index: number) => void;
  clear: () => void;
} {
  const [array, setArray] = useState<T[]>(initialValue);

  const push = useCallback((element: T) => {
    setArray((prev) => [...prev, element]);
  }, []);

  const filter = useCallback((callback: (element: T, index: number) => boolean) => {
    setArray((prev) => prev.filter(callback));
  }, []);

  const update = useCallback((index: number, element: T) => {
    setArray((prev) => {
      const newArray = [...prev];
      newArray[index] = element;
      return newArray;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setArray([]), []);

  return { array, set: setArray, push, filter, update, remove, clear };
}

/**
 * タイマーフック
 */
export function useTimer(initialTime: number = 0): {
  time: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
} {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setTime(initialTime);
  }, [stop, initialTime]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { time, start, stop, reset, isRunning };
}

/**
 * フェッチフック
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit,
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Re-export individual hooks
export { useAppState } from './useAppState';
export { useKeyboardNavigation } from './useKeyboardNavigation';
export { useReducedMotion } from './useReducedMotion';
export { usePerformanceOptimization } from './usePerformanceOptimization';
export { useScrollEnhancement } from './useScrollEnhancement';
