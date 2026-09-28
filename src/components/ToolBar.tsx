import React, { useState } from 'react';
import { ToolType, CROPS } from '../types/game';
import { Wrench, Sprout, Sparkles, AlertCircle } from 'lucide-react';

interface ToolBarProps {
  currentTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  gold: number;
  unlockedCrops: string[];
}

export const ToolBar: React.FC<ToolBarProps> = ({
  currentTool,
  onSelectTool,
  gold,
  unlockedCrops,
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'seeds' | 'gadgets'>('tools');

  const basicTools: { id: ToolType; label: string; icon: string; desc: string; cost?: number }[] = [
    { id: 'hoe', label: '鋤頭', icon: '⛏️', desc: '翻耕土地整備田埂 (消耗 5 體力)' },
    { id: 'water', label: '灑水壺', icon: '💧', desc: '為翻好的農地澆水 (消耗 3 體力)' },
    { id: 'harvest', label: '收成', icon: '🧺', desc: '收割成熟作物獲取金幣與記憶神樹生機' },
  ];

  const seedTools: { id: ToolType; cropId: string; label: string; icon: string; cost: number; desc: string }[] = [
    {
      id: 'seed_radish',
      cropId: 'radish',
      label: '白蘿蔔種子',
      icon: '🥕',
      cost: CROPS.radish.cost,
      desc: `${CROPS.radish.description} 成熟期 2 天。`,
    },
    {
      id: 'seed_strawberry',
      cropId: 'strawberry',
      label: '浮空草莓',
      icon: '🍓',
      cost: CROPS.strawberry.cost,
      desc: `${CROPS.strawberry.description} 成熟期 2 天。`,
    },
    {
      id: 'seed_corn',
      cropId: 'corn',
      label: '陽光金玉米',
      icon: '🌽',
      cost: CROPS.corn.cost,
      desc: `${CROPS.corn.description} 成熟期 3 天。`,
    },
    {
      id: 'seed_watermelon',
      cropId: 'watermelon',
      label: '彩虹西瓜',
      icon: '🍉',
      cost: CROPS.watermelon.cost,
      desc: `${CROPS.watermelon.description} 售價極高，成熟期 3 天。`,
    },
    {
      id: 'seed_flower',
      cropId: 'flower',
      label: '記憶之花',
      icon: '🌸',
      cost: CROPS.flower.cost,
      desc: `${CROPS.flower.description} 能注入大量神樹能量！`,
    },
  ];

  const gadgetTools: { id: ToolType; label: string; icon: string; desc: string; stamina: number }[] = [
    {
      id: 'weather',
      label: '氣象箱',
      icon: '⛅',
      desc: '哆啦A夢的經典道具！召喚空島甘霖，瞬間替全農場自動灌溉！(消耗 12 體力)',
      stamina: 12,
    },
    {
      id: 'shrink',
      label: '縮小燈',
      icon: '🔦',
      desc: '照射作物進行害蟲微型化與神秘突變，收成時變為 2.5 倍售價的「巨大作物」！(消耗 15 體力)',
      stamina: 15,
    },
    {
      id: 'time_cloth',
      label: '時光布',
      icon: '⏰',
      desc: '包覆在幼苗或成長中的作物上，使其成長時鐘跳躍 1 天！(消耗 18 體力)',
      stamina: 18,
    },
    {
      id: 'memory_bread',
      label: '記憶麵包',
      icon: '🍞',
      desc: '吃下一片印有農作知識的記憶麵包，直接回復大雄 40 點體力！(消耗 25 幣)',
      stamina: 0,
    },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-sky-100 shadow-md p-2.5 my-1">
      {/* Category Tabs */}
      <div className="flex items-center justify-between border-b border-sky-100 pb-2 mb-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition active:scale-95 ${
              activeTab === 'tools'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>日常農具</span>
          </button>

          <button
            onClick={() => setActiveTab('seeds')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition active:scale-95 ${
              activeTab === 'seeds'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>作物種子</span>
          </button>

          <button
            onClick={() => setActiveTab('gadgets')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition active:scale-95 ${
              activeTab === 'gadgets'
                ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>秘密道具</span>
          </button>
        </div>

        <div className="text-[11px] font-bold text-amber-700">
          🪙 {gold} 幣
        </div>
      </div>

      {/* Tool List horizontal scrollable */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {activeTab === 'tools' &&
          basicTools.map((tool) => {
            const isSelected = currentTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold shrink-0 transition active:scale-95 ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-600 shadow-md ring-2 ring-sky-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-200'
                }`}
                title={tool.desc}
              >
                <span className="text-base">{tool.icon}</span>
                <span>{tool.label}</span>
              </button>
            );
          })}

        {activeTab === 'seeds' &&
          seedTools.map((seed) => {
            const isSelected = currentTool === seed.id;
            const isAffordable = gold >= seed.cost;
            const isUnlocked = unlockedCrops.includes(seed.cropId);

            return (
              <button
                key={seed.id}
                onClick={() => onSelectTool(seed.id)}
                disabled={!isUnlocked}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold shrink-0 transition active:scale-95 ${
                  !isUnlocked
                    ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                    : isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                    : isAffordable
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
                title={seed.desc}
              >
                <span className="text-base">{seed.icon}</span>
                <div className="flex flex-col items-start leading-tight">
                  <span>{seed.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-amber-700'}`}>
                    🪙 -{seed.cost} 幣
                  </span>
                </div>
              </button>
            );
          })}

        {activeTab === 'gadgets' &&
          gadgetTools.map((gadget) => {
            const isSelected = currentTool === gadget.id;
            return (
              <button
                key={gadget.id}
                onClick={() => onSelectTool(gadget.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold shrink-0 transition active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
                title={gadget.desc}
              >
                <span className="text-base animate-bounce">{gadget.icon}</span>
                <div className="flex flex-col items-start leading-tight">
                  <span>{gadget.label}</span>
                  <span className={`text-[9px] ${isSelected ? 'text-amber-100' : 'text-amber-700 font-semibold'}`}>
                    {gadget.id === 'memory_bread' ? '🪙 25 幣 (+40體力)' : `⚡ -${gadget.stamina} 體力`}
                  </span>
                </div>
              </button>
            );
          })}
      </div>

      {/* Tool Hint Tip */}
      <div className="mt-1.5 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-sky-50 text-[11px] text-sky-800 font-medium">
        <AlertCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span className="truncate">
          {currentTool === 'hoe' && '鋤頭：點擊任意荒地翻土，每次消耗 5 點體力。'}
          {currentTool === 'water' && '灑水壺：點擊翻好的農地澆水，每次消耗 3 點體力。'}
          {currentTool === 'harvest' && '收成：點擊成熟作物收穫金幣，為記憶之樹注入生機！'}
          {currentTool.startsWith('seed_') && '種子：點擊已翻好的乾淨土地播種，需花費金幣。'}
          {currentTool === 'weather' && '氣象箱：點擊田地任一處即可發動！全農場瞬間自動澆灌完畢！'}
          {currentTool === 'shrink' && '縮小燈：點擊已種下的作物，照射後將使其突變成巨型作物！'}
          {currentTool === 'time_cloth' && '時光布：點擊正在生長中的作物，瞬間跳躍生長 1 天！'}
          {currentTool === 'memory_bread' && '記憶麵包：點擊任意農田吃下記憶麵包，直接回復 40 點體力！'}
        </span>
      </div>
    </div>
  );
};
