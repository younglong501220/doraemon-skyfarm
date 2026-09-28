import React from 'react';
import { Sparkles, HeartHandshake } from 'lucide-react';

interface TreeOfMemoryProps {
  health: number;
  onClick: () => void;
}

export const TreeOfMemory: React.FC<TreeOfMemoryProps> = ({ health, onClick }) => {
  const isRevived = health >= 100;
  const isFlourishing = health >= 70;
  const isSprouting = health >= 30;

  // Visual foliage colors based on health
  const foliageColor = isRevived
    ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]'
    : isFlourishing
    ? 'text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]'
    : isSprouting
    ? 'text-lime-600'
    : 'text-amber-700 opacity-80';

  const statusText = isRevived
    ? '🌟 奇蹟完全復甦！空之島守護之光已綻放！'
    : isFlourishing
    ? '✨ 枝繁葉茂，神樹記憶之核正散發溫暖光芒！'
    : isSprouting
    ? '🌿 嫩芽抽條，神樹開始聽見大雄的努力了！'
    : '🍂 枯萎沉睡中，需要更多作物的生命之露...';

  return (
    <div
      onClick={onClick}
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 border border-sky-200/80 p-3 shadow-inner cursor-pointer group select-none transition hover:shadow-md"
    >
      {/* Background drifting clouds */}
      <div className="absolute top-1 left-2 text-2xl opacity-40 animate-float-cloud pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-4 right-4 text-3xl opacity-30 animate-float-cloud pointer-events-none" style={{ animationDelay: '-6s' }}>
        ☁️
      </div>

      {/* Main floating island display */}
      <div className="relative flex flex-col items-center justify-center py-2">
        {/* Tree and Island Graphic */}
        <div className="relative w-36 h-28 flex items-center justify-center">
          {/* Rainbow or aura when revived */}
          {isRevived && (
            <div className="absolute -inset-4 bg-gradient-to-r from-red-400/20 via-yellow-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse" />
          )}

          {/* Tree SVG Art */}
          <svg viewBox="0 0 160 140" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>

            {/* Floating Island Cliff base */}
            <ellipse cx="80" cy="120" rx="60" ry="14" fill="#65a30d" />
            <path d="M 20 120 Q 80 155 140 120 Q 110 135 80 135 Q 50 135 20 120 Z" fill="#854d0e" />

            {/* Tree Trunk */}
            <path
              d="M 72 120 C 72 90 65 75 60 60 C 68 64 76 68 80 75 C 84 68 92 64 100 60 C 95 75 88 90 88 120 Z"
              fill="url(#trunkGrad)"
            />

            {/* Tree Canopy Circles with health-dependent foliage */}
            <circle cx="80" cy="45" r="28" className={foliageColor} fill="currentColor" />
            <circle cx="58" cy="55" r="22" className={foliageColor} fill="currentColor" />
            <circle cx="102" cy="55" r="22" className={foliageColor} fill="currentColor" />
            <circle cx="70" cy="32" r="18" className={foliageColor} fill="currentColor" opacity="0.9" />
            <circle cx="92" cy="32" r="18" className={foliageColor} fill="currentColor" opacity="0.9" />

            {/* Memory Fruit / Blossom lights when reviving */}
            {isSprouting && (
              <>
                <circle cx="68" cy="48" r="3.5" fill="#facc15" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="92" cy="45" r="3" fill="#f43f5e" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                <circle cx="80" cy="30" r="3.5" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '4s' }} />
              </>
            )}

            {/* Little Windmill on island */}
            <polygon points="122,122 125,108 128,122" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
            <circle cx="125" cy="108" r="2" fill="#ef4444" />
            <line x1="125" y1="108" x2="119" y2="104" stroke="#64748b" strokeWidth="1" />
            <line x1="125" y1="108" x2="131" y2="112" stroke="#64748b" strokeWidth="1" />
            <line x1="125" y1="108" x2="121" y2="114" stroke="#64748b" strokeWidth="1" />
            <line x1="125" y1="108" x2="129" y2="102" stroke="#64748b" strokeWidth="1" />
          </svg>

          {/* Nobita & Doraemon cute emoji duo resting under the tree */}
          <div className="absolute bottom-2 left-10 flex items-center -space-x-1 z-20 text-base">
            <span title="野比大雄">👦🏻</span>
            <span title="哆啦A夢" className="animate-gentle-bob">🐱</span>
          </div>

          {/* Lyla guardian spirit */}
          <div className="absolute top-2 right-6 z-20 text-base animate-bounce" title="守護妖精 莉拉">
            🧚🏻‍♀️
          </div>
        </div>

        {/* Tree status card banner */}
        <div className="mt-1 flex items-center justify-between w-full max-w-sm px-2.5 py-1 rounded-xl bg-white/80 backdrop-blur-xs border border-sky-100 shadow-2xs">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-[11px] font-medium text-slate-700 truncate">
              {statusText}
            </span>
          </div>
          <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-0.5">
            <HeartHandshake className="w-3 h-3 text-sky-600" />
            點擊對話
          </span>
        </div>
      </div>
    </div>
  );
};
