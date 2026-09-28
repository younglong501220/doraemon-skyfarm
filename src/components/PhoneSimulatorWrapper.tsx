import React, { ReactNode } from 'react';
import { Smartphone, QrCode, X, Copy, Check } from 'lucide-react';

interface PhoneSimulatorWrapperProps {
  isSimulatorMode: boolean;
  children: ReactNode;
  onToggleSimulator: () => void;
}

export const PhoneSimulatorWrapper: React.FC<PhoneSimulatorWrapperProps> = ({
  isSimulatorMode,
  children,
  onToggleSimulator,
}) => {
  const [showQR, setShowQR] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If not in simulator mode, return clean centered full responsive app
  if (!isSimulatorMode) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-sky-200 via-sky-100 to-[#eaf6fb]">
        <div className="w-full max-w-md min-h-screen flex flex-col bg-white/40 shadow-xl backdrop-blur-xs">
          {children}
        </div>
      </div>
    );
  }

  // Simulator mode: Render within a sleek modern smartphone frame
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 bg-slate-900/90 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]">
      {/* Top simulator toolbar */}
      <div className="fixed top-3 z-40 flex items-center gap-2 bg-slate-800/90 text-white px-3 py-1.5 rounded-full border border-slate-700 shadow-xl backdrop-blur-md text-xs">
        <span className="flex items-center gap-1 text-sky-400 font-bold">
          <Smartphone className="w-3.5 h-3.5" />
          <span>手機 App 模擬預覽</span>
        </span>
        <span className="text-slate-500">|</span>
        <button
          onClick={() => setShowQR(true)}
          className="flex items-center gap-1 text-slate-300 hover:text-white transition"
          title="手機掃碼秒玩"
        >
          <QrCode className="w-3.5 h-3.5 text-amber-400" />
          <span>手機掃碼實機玩</span>
        </button>
        <span className="text-slate-500">|</span>
        <button
          onClick={onToggleSimulator}
          className="text-slate-400 hover:text-white transition"
          title="退出手機框"
        >
          切換全螢幕
        </button>
      </div>

      {/* Phone Shell */}
      <div className="relative w-full max-w-[400px] h-[844px] max-h-[92vh] bg-slate-950 rounded-[48px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.6)] border-4 border-slate-700/80 flex flex-col mt-8 overflow-hidden ring-1 ring-slate-600">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Screen Bezel and Game Screen */}
        <div className="relative w-full h-full bg-[#eaf6fb] rounded-[38px] overflow-hidden flex flex-col shadow-inner">
          {/* iOS-style Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold text-slate-800 z-40 select-none shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="text-[10px]">5G</span>
              <span className="text-[12px]">🔋 100%</span>
            </div>
          </div>

          {/* Game screen body */}
          <div className="flex-1 overflow-y-auto flex flex-col relative no-scrollbar">
            {children}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="h-5 w-full flex items-center justify-center shrink-0 bg-transparent z-40">
            <div className="w-32 h-1 bg-slate-400/80 rounded-full" />
          </div>
        </div>
      </div>

      {/* QR Code Modal for real mobile device testing */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center border border-sky-100 animate-harvest-pop">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📲</span>
                <h3 className="font-bold text-slate-800 text-base">用手機直接暢玩</h3>
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              使用手機相機掃描下方 QR Code，或點擊複製連結在手機瀏覽器開啟，即可加入主畫面安裝！
            </p>

            {/* Live QR Code image via Google Chart API */}
            <div className="flex justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  currentUrl
                )}`}
                alt="Game Mobile URL QR Code"
                className="w-44 h-44 rounded-xl shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl mb-4 text-xs font-mono text-slate-700 truncate">
              <span className="truncate flex-1 text-left">{currentUrl}</span>
              <button
                onClick={copyUrl}
                className="p-1.5 rounded-lg bg-sky-500 text-white font-bold shrink-0 hover:bg-sky-600 active:scale-95 transition"
                title="複製網址"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 active:scale-95 transition"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
