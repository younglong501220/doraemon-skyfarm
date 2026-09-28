import React, { useRef, useEffect } from 'react';
import { ScrollText, Trash2 } from 'lucide-react';

interface AdventureLogProps {
  logs: string[];
  onClearLogs: () => void;
}

export const AdventureLog: React.FC<AdventureLogProps> = ({ logs, onClearLogs }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-sky-100 shadow-md p-3 my-1 flex flex-col h-44 sm:h-48">
      <div className="flex items-center justify-between border-b border-sky-100 pb-1.5 mb-1.5">
        <div className="flex items-center gap-1.5">
          <ScrollText className="w-4 h-4 text-sky-600" />
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
            空之島冒險日誌
          </h3>
          <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full font-bold">
            {logs.length} 則動態
          </span>
        </div>

        <button
          onClick={onClearLogs}
          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition active:scale-95"
          title="清空日誌"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs text-slate-600"
      >
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-xs italic">
            尚未有冒險紀錄，快拿起鋤頭翻土吧！
          </div>
        ) : (
          logs.map((log, index) => {
            // Emphasize first log
            const isLatest = index === 0;
            return (
              <div
                key={index}
                className={`p-1.5 rounded-xl transition ${
                  isLatest
                    ? 'bg-sky-50/80 border border-sky-200/80 font-medium text-slate-800 shadow-2xs'
                    : 'hover:bg-slate-50'
                }`}
              >
                <span className="text-[11px] leading-relaxed">{log}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
