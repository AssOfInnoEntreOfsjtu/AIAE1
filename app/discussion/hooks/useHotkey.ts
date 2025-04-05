import { useEffect, useCallback } from 'react';

type KeyCombo = string | string[];
type HotkeyHandler = (event: KeyboardEvent) => void;

interface HotkeyOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export function useHotkey(
  keyCombo: KeyCombo,
  handler: HotkeyHandler,
  options: HotkeyOptions = {}
) {
  const {
    enabled = true,
    preventDefault = true,
    stopPropagation = false,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const keys = Array.isArray(keyCombo) ? keyCombo : [keyCombo];
      const isMatch = keys.some(combo => {
        const parts = combo.toLowerCase().split('+');
        const modifiers = parts.slice(0, -1);
        const key = parts[parts.length - 1];

        // 检查修饰键
        const hasCtrl = modifiers.includes('ctrl') === event.ctrlKey;
        const hasShift = modifiers.includes('shift') === event.shiftKey;
        const hasAlt = modifiers.includes('alt') === event.altKey;
        const hasMeta = modifiers.includes('meta') === event.metaKey;

        // 检查主键
        const keyMatch = event.key.toLowerCase() === key;

        return hasCtrl && hasShift && hasAlt && hasMeta && keyMatch;
      });

      if (isMatch) {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        handler(event);
      }
    },
    [keyCombo, handler, enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// 使用示例：
// // 1. 基本用法
// useHotkey('ctrl+s', (event) => {
//   console.log('保存');
// });
//
// // 2. 多个快捷键
// useHotkey(['ctrl+s', 'meta+s'], (event) => {
//   console.log('保存');
// });
//
// // 3. 带修饰键的组合
// useHotkey('ctrl+shift+a', (event) => {
//   console.log('全选');
// });
//
// // 4. 禁用默认行为
// useHotkey('ctrl+r', (event) => {
//   console.log('刷新');
// }, { preventDefault: true });
//
// // 5. 条件启用
// const [isEditing, setIsEditing] = useState(false);
// useHotkey('ctrl+z', (event) => {
//   console.log('撤销');
// }, { enabled: isEditing }); 