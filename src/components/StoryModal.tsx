import React, { useState } from 'react';
import { Milestone } from '../types/game';
import { X, Sparkles, Award, Gift, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  treeHealth: number;
  gold: number;
  dorayakiCount: number;
  gridSize: number;
  milestones: Milestone[];
  onClaimMilestone: (id: string) => void;
  onBuyDorayaki: () => void;
  onFeedDoraemon: () => void;
  onExpandFarm: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  treeHealth,
  gold,
  dorayakiCount,
  gridSize,
  milestones,
  onClaimMilestone,
  onBuyDorayaki,
  onFeedDoraemon,
  onExpandFarm,
}) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'milestones' | 'doraemon' | 'expand'>('lore');

  if (!isOpen) return null;

  const characters = [
    {
      name: '莉拉 (Lyla)',
      title: '空之島神樹守護巫女',
      avatar: '🧚🏻‍♀️',
      speech:
        treeHealth >= 100
          ? '「大雄！你做到了！記憶之樹的神聖之光籠罩了整個空之島，所有逝去的溫暖回憶都甦醒了！謝謝你們！」'
          : treeHealth >= 50
          ? '「謝謝大雄與哆啦A夢！神樹的光芒越來越溫暖了，空之島的微風中洋溢著大家耕作的芳香！」'
          : '「歡迎來到空之島。這顆古老的神樹正因失去記憶微光而枯萎，只要用愛心培育作物並奉獻甘露，神樹就能重現生機！」',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    },
    {
      name: '哆啦A夢 (Doraemon)',
      title: '來自22世紀的貓型機器人',
      avatar: '🐱',
      speech:
        '「大雄，今天也要元氣滿滿地翻土耕作喔！如果遇到大旱災，就用我的『氣象箱』；要是想收成巨大作物，就用『縮小燈』吧！...對了，有買銅鑼燒給我吃嗎？（口水）」',
      color: 'bg-sky-50 border-sky-200 text-sky-950',
    },
    {
      name: '野比大雄 (Nobita)',
      title: '空之島新手農夫',
      avatar: '👦🏻',
      speech:
        '「呼～翻土真的好辛苦啊！不過看到自己種下的雲朵蘿蔔一點一滴長大，心裡真的好有成就感！好想種出全宇宙最大的彩虹西瓜給靜香看！」',
      color: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    {
      name: '源靜香 (Shizuka)',
      title: '溫柔的好夥伴',
      avatar: '👧🏻',
      speech:
        '「大雄種的浮空草莓真的好香甜喔！要是把這些新鮮的草莓拿來做草莓奶油蛋糕，大家一定會吃得好開心！」',
      color: 'bg-pink-50 border-pink-200 text-pink-950',
    },
    {
      name: '剛田武 (Gian / 胖虎)',
      title: '空島第一孩子王',
      avatar: '👦🏽',
      speech:
        '「喂大雄！你可別偷懶睡午覺啊！本大爺也來幫你搬南瓜和金玉米！等豐收的時候，我要在神樹底下開個人盛大演唱會～哇哈哈！」',
      color: 'bg-orange-50 border-orange-200 text-orange-950',
    },
    {
      name: '骨川小夫 (Suneo)',
      title: '空島商人贊助商',
      avatar: '👦🏼',
      speech:
        '「哼哼，我爸爸託海外商會帶進了全自動浮空耕地擴建模組！只要有足夠的銅鑼燒金幣，就能把農場擴展到 16 格超大田地喔！」',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-950',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-sky-100 flex flex-col max-h-[90vh] overflow-hidden animate-harvest-pop">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍃</span>
            <div>
              <h2 className="font-bold text-base leading-tight">空之島物語與秘密工坊</h2>
              <p className="text-[11px] text-sky-100">神樹記憶進度：{treeHealth}%</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playTill();
              onClose();
            }}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-sky-100 bg-sky-50/50 px-3 pt-2 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('lore')}
            className={`px-3 py-2 font-bold rounded-t-xl transition shrink-0 ${
              activeTab === 'lore'
                ? 'bg-white text-sky-700 shadow-xs border-t-2 border-sky-500'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            神樹與角色對話
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-3 py-2 font-bold rounded-t-xl transition shrink-0 ${
              activeTab === 'milestones'
                ? 'bg-white text-sky-700 shadow-xs border-t-2 border-sky-500'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            島民成就與獎賞
          </button>
          <button
            onClick={() => setActiveTab('doraemon')}
            className={`px-3 py-2 font-bold rounded-t-xl transition shrink-0 ${
              activeTab === 'doraemon'
                ? 'bg-white text-sky-700 shadow-xs border-t-2 border-sky-500'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            🥞 銅鑼燒小舖
          </button>
          <button
            onClick={() => setActiveTab('expand')}
            className={`px-3 py-2 font-bold rounded-t-xl transition shrink-0 ${
              activeTab === 'expand'
                ? 'bg-white text-sky-700 shadow-xs border-t-2 border-sky-500'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            🌾 農田擴建
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'lore' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/70 text-xs text-slate-700 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>空之島與記憶之樹傳說</span>
                </div>
                空之島是一座乘載著大地住民美好回憶的浮空秘境。由於時間的流逝，記憶之樹漸漸枯萎。大雄與哆啦A夢乘著時光機意外降落此處，藉由翻土、澆水、播種優質作物，收穫時產生的純淨生命之光能逐步治癒神樹！
              </div>

              <div className="space-y-2.5">
                {characters.map((char, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border ${char.color} shadow-2xs`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{char.avatar}</span>
                      <div>
                        <div className="font-bold text-xs">{char.name}</div>
                        <div className="text-[10px] opacity-75">{char.title}</div>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mt-1 font-medium">{char.speech}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-2.5">
              <div className="text-xs text-slate-500 mb-2">
                完成空之島開拓任務，即可領取豐厚金幣獎勵！
              </div>
              {milestones.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                    m.completed
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                        <span>{m.title}</span>
                        {m.completed && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {m.desc}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700">
                      +{m.reward} 🪙
                    </span>
                    <button
                      onClick={() => onClaimMilestone(m.id)}
                      disabled={!m.completed}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition active:scale-95 ${
                        m.completed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      領取
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'doraemon' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3">
                <span className="text-4xl animate-bounce">🐱</span>
                <div>
                  <h4 className="font-bold text-sky-900 text-sm">哆啦A夢的最愛：特級銅鑼燒</h4>
                  <p className="text-xs text-sky-700 mt-0.5">
                    目前擁有：<strong className="text-amber-800 font-mono">{dorayakiCount}</strong> 個銅鑼燒
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 font-bold text-amber-900 text-xs mb-1">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>向小夫的烘焙車購買</span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      香濃紅豆餡特製銅鑼燒，售價 30 銅鑼燒金幣。
                    </p>
                  </div>
                  <button
                    onClick={onBuyDorayaki}
                    disabled={gold < 30}
                    className={`mt-3 w-full py-2 rounded-xl font-bold text-xs transition active:scale-95 ${
                      gold >= 30
                        ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    購買 1 個 (🪙 30 幣)
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-pink-50 border border-pink-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 font-bold text-pink-900 text-xs mb-1">
                      <Sparkles className="w-4 h-4 text-pink-600" />
                      <span>請哆啦A夢品嚐！</span>
                    </div>
                    <p className="text-[11px] text-pink-800">
                      哆啦A夢開心地享用，會立即回贈大雄 30 點體力並帶來神樹好運！
                    </p>
                  </div>
                  <button
                    onClick={onFeedDoraemon}
                    disabled={dorayakiCount < 1}
                    className={`mt-3 w-full py-2 rounded-xl font-bold text-xs transition active:scale-95 ${
                      dorayakiCount >= 1
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 shadow-sm'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    請哆啦A夢吃 (🥞 -1)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expand' && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🌾</span>
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">浮空農田擴建工程</h4>
                  <p className="text-xs text-amber-700">
                    當前田地：{gridSize === 9 ? '3x3 (共 9 格)' : '4x4 (共 16 格，最高級農場！)'}
                  </p>
                </div>
              </div>

              {gridSize === 9 ? (
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    透過哆啦A夢的『空間膨脹黏土』與小夫的引薦，你可以將農田一舉擴大為 16 格農地！大幅提升作物的種植與收成效率！
                  </p>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-200">
                    <span className="text-xs font-bold text-amber-900">擴建至 4x4 (16格)</span>
                    <span className="text-xs font-bold text-amber-700">🪙 150 幣</span>
                  </div>
                  <button
                    onClick={onExpandFarm}
                    disabled={gold < 150}
                    className={`mt-3 w-full py-2.5 rounded-xl font-bold text-xs transition active:scale-95 flex items-center justify-center gap-1.5 ${
                      gold >= 150
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>立即擴建 (150 金幣)</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                  🎉 恭喜！你的空之島農場已擴建至最高階 16 格大田地！
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-sky-100 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playTill();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-sky-500 font-bold text-white text-xs hover:bg-sky-600 active:scale-95 transition"
          >
            返回浮空農場
          </button>
        </div>
      </div>
    </div>
  );
};
