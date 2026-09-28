import React from 'react';
import { WeatherType } from '../types/game';
import { Volume2, VolumeX, Smartphone, Monitor, Sparkles, Heart } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface StatusBarProps {
  day: number;
  stamina: number;
  maxStamina: number;
  gold: number;
  treeHealth: number;
  weather: WeatherType;
  isMuted: boolean;
  onToggleMute: () => void;
  isSimulatorMode: boolean;
  onToggleSimulator: () => void;
  onOpenTreeModal: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  day,
  stamina,
  maxStamina,
  gold,
  treeHealth,
  weather,
  isMuted,
  onToggleMute,
  isSimulatorMode,
  onToggleSimulator,
  onOpenTreeModal,
}) => {
  const weatherBadge = {
    sunny: { label: '晴朗', emoji: '☀️', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    cloudy: { label: '微風多雲', emoji: '⛅', color: 'bg-sky-100 text-sky-700 border-sky-200' },
    rainy: { label: '雲端甘霖', emoji: '🌧️', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    rainbow: { label: '七彩虹光', emoji: '🌈', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  }[weather];

  const staminaPct = Math.max(0, Math.min(100, (stamina / maxStamina) * 100));
  const staminaColor =
    staminaPct > 50
      ? 'from-emerald-400 to-green-500'
      : staminaPct > 20
      ? 'from-amber-400 to-yellow-500'
      : 'from-rose-400 to-red-500';

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs px-3 py-2.5 transition-all">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="text-xl">🍃</span>
          <span className="font-bold text-sky-800 text-sm md:text-base tracking-tight truncate">
            哆啦A夢 牧場物語
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
            空之島篇
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <PWAInstallButton />

          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 active:scale-95 transition"
            title={isMuted ? '開啟音效' : '靜音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleSimulator}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium active:scale-95 transition"
            title="切換手機外框模擬"
          >
            {isSimulatorMode ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>全螢幕模式</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>手機框模擬</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-1.5 text-xs">
        {/* Day & Weather */}
        <div className="flex flex-col justify-center px-2 py-1.5 rounded-xl bg-sky-50 border border-sky-100">
          <div className="text-[10px] text-sky-600 font-semibold leading-tight">日期 / 天氣</div>
          <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5 truncate">
            <span>第 {day} 天</span>
            <span className={`text-[10px] px-1 py-0.2 rounded border ${weatherBadge.color}`}>
              {weatherBadge.emoji}
            </span>
          </div>
        </div>

        {/* Nobita Stamina */}
        <div className="flex flex-col justify-center px-2 py-1.5 rounded-xl bg-orange-50 border border-orange-100">
          <div className="flex items-center justify-between text-[10px] text-orange-700 font-semibold leading-tight">
            <span className="flex items-center gap-0.5">
              <Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" /> 大雄體力
            </span>
            <span className="font-mono">{stamina}/{maxStamina}</span>
          </div>
          <div className="w-full h-1.5 bg-orange-200 rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${staminaColor} rounded-full transition-all duration-300`}
              style={{ width: `${staminaPct}%` }}
            />
          </div>
        </div>

        {/* Dorayaki Coin Purse */}
        <div className="flex flex-col justify-center px-2 py-1.5 rounded-xl bg-amber-50 border border-amber-100">
          <div className="text-[10px] text-amber-700 font-semibold leading-tight">銅鑼燒金幣</div>
          <div className="flex items-center gap-1 font-bold text-amber-900 mt-0.5">
            <span className="text-amber-500">🪙</span>
            <span className="font-mono text-sm">{gold}</span>
          </div>
        </div>

        {/* Tree of Memory Health */}
        <button
          onClick={onOpenTreeModal}
          className="flex flex-col justify-center px-2 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-left hover:bg-emerald-100/70 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-[10px] text-emerald-700 font-semibold leading-tight">
            <span className="flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600 animate-spin" /> 記憶之樹
            </span>
            <span className="font-mono">{treeHealth}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, treeHealth)}%` }}
            />
          </div>
        </button>
      </div>
    </header>
  );
};
