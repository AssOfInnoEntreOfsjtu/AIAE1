import { useState, useEffect, useCallback } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

// 使用示例：
// // 1. 防抖值
// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
//
// useEffect(() => {
//   // 当 debouncedSearchTerm 改变时执行搜索
//   performSearch(debouncedSearchTerm);
// }, [debouncedSearchTerm]);
//
// // 2. 防抖回调
// const debouncedHandleSearch = useDebounceCallback(
//   (term: string) => {
//     performSearch(term);
//   },
//   500
// );
//
// return (
//   <input
//     type="text"
//     onChange={(e) => {
//       setSearchTerm(e.target.value);
//       debouncedHandleSearch(e.target.value);
//     }}
//     value={searchTerm}
//   />
// ); 