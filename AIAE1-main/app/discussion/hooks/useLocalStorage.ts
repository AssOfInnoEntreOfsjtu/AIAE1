import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // 更新本地存储和状态
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数，这样我们就有了与 useState 相同的 API
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // 保存状态
      setStoredValue(valueToStore);

      // 保存到本地存储
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // 同步多个标签页之间的状态
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error syncing with localStorage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}

// 使用示例：
// const [value, setValue] = useLocalStorage('my-key', 'initial-value');
//
// // 设置新值
// setValue('new-value');
//
// // 使用函数更新
// setValue(prev => prev + 1);
//
// // 使用对象
// const [user, setUser] = useLocalStorage('user', { name: '', age: 0 });
// setUser(prev => ({ ...prev, name: 'John' })); 