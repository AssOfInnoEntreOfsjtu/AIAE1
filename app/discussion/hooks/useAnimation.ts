import { useEffect, useRef, useCallback } from 'react';

interface AnimationOptions {
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
  onUpdate?: (value: number) => void;
}

const defaultEasing = (t: number): number => {
  // 缓动函数：easeInOutQuad
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export function useAnimation(
  startValue: number,
  endValue: number,
  options: AnimationOptions = {}
) {
  const {
    duration = 300,
    easing = defaultEasing,
    onComplete,
    onUpdate,
  } = options;

  const animationFrame = useRef<number>();
  const startTime = useRef<number>(0);
  const currentValue = useRef<number>(startValue);

  const animate = useCallback((timestamp: number) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }

    const elapsed = timestamp - startTime.current;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easing(progress);
    currentValue.current = startValue + (endValue - startValue) * easedProgress;

    onUpdate?.(currentValue.current);

    if (progress < 1) {
      animationFrame.current = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  }, [startValue, endValue, duration, easing, onUpdate, onComplete]);

  const start = useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    startTime.current = 0;
    animationFrame.current = requestAnimationFrame(animate);
  }, [animate]);

  const stop = useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    currentValue.current = startValue;
    onUpdate?.(startValue);
  }, [stop, startValue, onUpdate]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    start,
    stop,
    reset,
    currentValue: currentValue.current,
  };
}

// 使用示例：
// // 1. 基本用法
// const { start, stop, currentValue } = useAnimation(0, 100, {
//   duration: 1000,
//   onUpdate: (value) => {
//     console.log('当前值:', value);
//   },
//   onComplete: () => {
//     console.log('动画完成');
//   },
// });
//
// // 2. 自定义缓动函数
// const customEasing = (t: number): number => {
//   // 弹性缓动
//   return 1 - Math.pow(2, -10 * t);
// };
//
// const { start } = useAnimation(0, 100, {
//   duration: 1000,
//   easing: customEasing,
// });
//
// // 3. 进度条动画
// const [progress, setProgress] = useState(0);
// const { start } = useAnimation(0, 100, {
//   duration: 2000,
//   onUpdate: setProgress,
// });
//
// return (
//   <div>
//     <div className="progress-bar">
//       <div
//         className="progress"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//     <button onClick={start}>开始加载</button>
//   </div>
// );
//
// // 4. 滚动动画
// const { start } = useAnimation(
//   window.scrollY,
//   targetScrollPosition,
//   {
//     duration: 1000,
//     onUpdate: (value) => {
//       window.scrollTo(0, value);
//     },
//   }
// ); 