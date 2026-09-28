import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, X, Smartphone } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md hover:from-sky-600 hover:to-blue-700 transition active:scale-95 border border-sky-300"
        title="安裝到手機主畫面"
      >
        <Download className="w-3.5 h-3.5" />
        <span>安裝 App</span>
      </button>
    );
  }

  // iOS Safari flow (or general fallback prompt)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-sky-700 font-bold text-xs shadow-sm hover:bg-white transition border border-sky-200 active:scale-95"
          title="將遊戲加到 iPhone 主畫面"
        >
          <Smartphone className="w-3.5 h-3.5 text-sky-600" />
          <span>加到主畫面</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-sky-100 text-left animate-harvest-pop">
              <div className="flex items-center justify-between border-b pb-3 mb-3 border-sky-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-base">
                    🍃
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">安裝到 iPhone / iPad</h3>
                    <p className="text-[11px] text-slate-500">免 App Store，秒變全螢幕原生體驗</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    1
                  </span>
                  <div>
                    點擊 Safari 底部工具列的 <Share className="inline w-3.5 h-3.5 text-sky-600 -mt-0.5" /> <strong>「分享」</strong> 按鈕。
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    2
                  </span>
                  <div>
                    往下滑動選單，點選 <PlusSquare className="inline w-3.5 h-3.5 text-sky-600 -mt-0.5" /> <strong>「加入主畫面」</strong>。
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    3
                  </span>
                  <div>
                    點擊右上角<strong>「新增」</strong>，即可在手機桌面點擊圖示隨時暢玩！
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full py-2.5 rounded-xl bg-sky-500 font-bold text-white text-xs shadow-md hover:bg-sky-600 active:scale-95 transition"
              >
                我知道了，返回遊戲
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for desktop or non-Chromium browsers to show quick guide
  return null;
};
