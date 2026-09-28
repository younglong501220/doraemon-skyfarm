import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md border border-amber-400">
      <WifiOff className="w-4 h-4 animate-pulse text-amber-200" />
      <span>離線模式 — 已載入本機快取與農場紀錄</span>
    </div>
  );
};
