import { useState, useEffect } from 'react';

type MediaQueryOptions = {
  defaultMatches?: boolean;
  noSSR?: boolean;
};

export function useMediaQuery(
  query: string,
  options: MediaQueryOptions = {}
): boolean {
  const { defaultMatches = false, noSSR = false } = options;
  const [matches, setMatches] = useState(() => {
    if (noSSR) {
      return defaultMatches;
    }
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return defaultMatches;
  });

  useEffect(() => {
    if (noSSR) {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 现代浏览器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // 旧版浏览器
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query, noSSR]);

  return matches;
}

// 使用示例：
// // 1. 响应式布局
// const isMobile = useMediaQuery('(max-width: 768px)');
// const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
// const isDesktop = useMediaQuery('(min-width: 1025px)');
//
// return (
//   <div>
//     {isMobile && <MobileLayout />}
//     {isTablet && <TabletLayout />}
//     {isDesktop && <DesktopLayout />}
//   </div>
// );
//
// // 2. 暗色模式
// const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
//
// useEffect(() => {
//   document.body.classList.toggle('dark-mode', prefersDark);
// }, [prefersDark]);
//
// // 3. 打印样式
// const isPrinting = useMediaQuery('print');
//
// useEffect(() => {
//   if (isPrinting) {
//     // 准备打印
//     console.log('准备打印');
//   }
// }, [isPrinting]);
//
// // 4. 设备方向
// const isPortrait = useMediaQuery('(orientation: portrait)');
// const isLandscape = useMediaQuery('(orientation: landscape)');
//
// // 5. 高分辨率屏幕
// const isRetina = useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'); 