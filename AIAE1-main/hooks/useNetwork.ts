'use client';

import { useState, useEffect } from 'react';

interface NetworkState {
  isOnline: boolean;
  type: 'wifi' | '4g' | 'other';
}

export function useNetwork() {
  const [state, setState] = useState<NetworkState>({
    isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
    type: 'other',
  });

  useEffect(() => {
    const updateNetworkState = () => {
      setState({
        isOnline: navigator.onLine,
        type: 'wifi', // 这里应该根据实际情况判断网络类型
      });
    };

    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);
    };
  }, []);

  return state;
} 