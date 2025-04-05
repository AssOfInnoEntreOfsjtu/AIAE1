import { useState, useEffect, useCallback, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now >= lastExecuted.current + interval) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timeoutId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timeoutId);
    }
  }, [value, interval]);

  return throttledValue;
}

export function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number
): T {
  const lastExecuted = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now >= lastExecuted.current + interval) {
        lastExecuted.current = now;
        callback(...args);
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastExecuted.current = Date.now();
          callback(...args);
          timeoutRef.current = undefined;
        }, interval);
      }
    },
    [callback, interval]
  ) as T;
}

// 使用示例：
// // 1. 节流值
// const [scrollPosition, setScrollPosition] = useState(0);
// const throttledScrollPosition = useThrottle(scrollPosition, 100);
//
// useEffect(() => {
//   const handleScroll = () => {
//     setScrollPosition(window.scrollY);
//   };
//
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, []);
//
// // 2. 节流回调
// const throttledHandleScroll = useThrottleCallback(
//   (position: number) => {
//     updateScrollIndicator(position);
//   },
//   100
// );
//
// useEffect(() => {
//   const handleScroll = () => {
//     throttledHandleScroll(window.scrollY);
//   };
//
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, [throttledHandleScroll]); 