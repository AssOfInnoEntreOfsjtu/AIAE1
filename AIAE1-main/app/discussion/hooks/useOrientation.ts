import { useState, useEffect } from 'react';

interface OrientationState {
  angle: number;
  type: 'portrait' | 'landscape';
  isPortrait: boolean;
  isLandscape: boolean;
}

export function useOrientation() {
  const [state, setState] = useState<OrientationState>({
    angle: 0,
    type: 'portrait',
    isPortrait: true,
    isLandscape: false,
  });

  useEffect(() => {
    const updateOrientation = () => {
      const angle = window.screen.orientation?.angle || 0;
      const type = angle === 0 || angle === 180 ? 'portrait' : 'landscape';

      setState({
        angle,
        type,
        isPortrait: type === 'portrait',
        isLandscape: type === 'landscape',
      });
    };

    // 现代浏览器
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener('change', updateOrientation);
    }
    // 兼容旧版浏览器
    window.addEventListener('orientationchange', updateOrientation);

    // 初始化状态
    updateOrientation();

    return () => {
      if (window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', updateOrientation);
      }
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  return state;
}
