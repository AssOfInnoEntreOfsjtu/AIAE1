import { useState, useEffect } from 'react';

interface NetworkState {
  online: boolean;
  rtt: number | null;
  type: string | null;
  effectiveType: string | null;
  saveData: boolean;
}

export function useNetwork() {
  const [state, setState] = useState<NetworkState>({
    online: typeof window !== 'undefined' ? navigator.onLine : true,
    rtt: null,
    type: null,
    effectiveType: null,
    saveData: false,
  });

  useEffect(() => {
    const updateNetworkState = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setState({
          online: navigator.onLine,
          rtt: connection.rtt || null,
          type: connection.type || null,
          effectiveType: connection.effectiveType || null,
          saveData: connection.saveData || false,
        });
      } else {
        setState(prev => ({
          ...prev,
          online: navigator.onLine,
        }));
      }
    };

    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateNetworkState);
    }

    updateNetworkState();

    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updateNetworkState);
      }
    };
  }, []);

  return state;
}

// 使用示例：
// // 1. 基本用法
// const { online, rtt, type, effectiveType, saveData } = useNetwork();
//
// return (
//   <div>
//     <p>网络状态: {online ? '在线' : '离线'}</p>
//     {rtt && <p>网络延迟: {rtt}ms</p>}
//     {type && <p>连接类型: {type}</p>}
//     {effectiveType && <p>有效连接类型: {effectiveType}</p>}
//     {saveData && <p>已启用数据节省模式</p>}
//   </div>
// );
//
// // 2. 离线提示
// const { online } = useNetwork();
//
// useEffect(() => {
//   if (!online) {
//     showOfflineNotification();
//   }
// }, [online]);
//
// // 3. 网络质量监控
// const { rtt, effectiveType } = useNetwork();
//
// useEffect(() => {
//   if (rtt && rtt > 1000) {
//     console.warn('网络延迟过高');
//   }
//   if (effectiveType === '2g') {
//     console.warn('网络质量较差');
//   }
// }, [rtt, effectiveType]);
//
// // 4. 数据节省模式适配
// const { saveData } = useNetwork();
//
// useEffect(() => {
//   if (saveData) {
//     // 降低图片质量
//     // 减少动画效果
//     // 优化数据传输
//   }
// }, [saveData]); 