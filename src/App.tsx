import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ToolType,
  FarmPlot,
  WeatherType,
  Milestone,
  CROPS,
} from './types/game';
import { sound } from './utils/audio';
import { StatusBar } from './components/StatusBar';
import { TreeOfMemory } from './components/TreeOfMemory';
import { FarmGrid } from './components/FarmGrid';
import { ToolBar } from './components/ToolBar';
import { AdventureLog } from './components/AdventureLog';
import { StoryModal } from './components/StoryModal';
import { PhoneSimulatorWrapper } from './components/PhoneSimulatorWrapper';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Moon, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'first_crop',
    title: '第一次大豐收',
    desc: '成功收穫 3 次農作物',
    reward: 50,
    completed: false,
    icon: '🧺',
  },
  {
    id: 'use_gadgets',
    title: '22世紀秘密道具好幫手',
    desc: '使用氣象箱、縮小燈或時光布等秘密道具',
    reward: 80,
    completed: false,
    icon: '✨',
  },
  {
    id: 'feed_doraemon',
    title: '哆啦A夢的最愛',
    desc: '請哆啦A夢品嚐 1 個特級銅鑼燒',
    reward: 60,
    completed: false,
    icon: '🥞',
  },
  {
    id: 'tree_milestone',
    title: '記憶微光復甦',
    desc: '記憶之樹活力提升至 50% 以上',
    reward: 120,
    completed: false,
    icon: '🌱',
  },
  {
    id: 'sky_miracle',
    title: '空之島神聖奇蹟',
    desc: '喚醒記憶之樹 100% 力量，拯救空之島！',
    reward: 300,
    completed: false,
    icon: '🌟',
  },
];

export default function App() {
  // Local storage initialization or default state
  const [day, setDay] = useState<number>(() => {
    const saved = localStorage.getItem('dora_day');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [stamina, setStamina] = useState<number>(() => {
    const saved = localStorage.getItem('dora_stamina');
    return saved ? parseInt(saved, 10) : 100;
  });

  const [gold, setGold] = useState<number>(() => {
    const saved = localStorage.getItem('dora_gold');
    return saved ? parseInt(saved, 10) : 60;
  });

  const [treeHealth, setTreeHealth] = useState<number>(() => {
    const saved = localStorage.getItem('dora_tree');
    return saved ? parseInt(saved, 10) : 15;
  });

  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [currentTool, setCurrentTool] = useState<ToolType>('hoe');
  const [gridSize, setGridSize] = useState<number>(() => {
    const saved = localStorage.getItem('dora_grid_size');
    return saved ? parseInt(saved, 10) : 9;
  });

  const [plots, setPlots] = useState<FarmPlot[]>(() => {
    const saved = localStorage.getItem('dora_plots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      tilled: i < 2, // 2 starter tilled plots
      watered: false,
      cropId: null,
      stage: 0,
      boosted: false,
    }));
  });

  const [unlockedCrops] = useState<string[]>([
    'radish',
    'strawberry',
    'corn',
    'watermelon',
    'flower',
  ]);

  const [dorayakiCount, setDorayakiCount] = useState<number>(() => {
    const saved = localStorage.getItem('dora_dorayaki');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem('dora_milestones');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return INITIAL_MILESTONES;
  });

  const [logs, setLogs] = useState<string[]>([
    '✨ 莉拉：「大雄、哆啦A夢，歡迎來到浮空農場！試著用秘密道具讓記憶之樹復甦吧！」',
    '🍃 哆啦A夢：「先用【⛏️ 鋤頭】翻土，再播下種子並澆水喔！」',
  ]);

  const [harvestCount, setHarvestCount] = useState<number>(0);
  const [gadgetCount, setGadgetCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSimulatorMode, setIsSimulatorMode] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth > 768 : false;
  });
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [victoryCelebrated, setVictoryCelebrated] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dora_day', day.toString());
    localStorage.setItem('dora_stamina', stamina.toString());
    localStorage.setItem('dora_gold', gold.toString());
    localStorage.setItem('dora_tree', treeHealth.toString());
    localStorage.setItem('dora_grid_size', gridSize.toString());
    localStorage.setItem('dora_plots', JSON.stringify(plots));
    localStorage.setItem('dora_dorayaki', dorayakiCount.toString());
    localStorage.setItem('dora_milestones', JSON.stringify(milestones));
  }, [day, stamina, gold, treeHealth, gridSize, plots, dorayakiCount, milestones]);

  // Check victory celebration
  useEffect(() => {
    if (treeHealth >= 100 && !victoryCelebrated) {
      setVictoryCelebrated(true);
      sound.playGadget();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      addLog('🎉【奇蹟誕生】記憶之樹完全復甦！七彩神光貫穿天際，空之島重獲新生！');
    }
  }, [treeHealth, victoryCelebrated]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 20)]);
  };

  const handleToggleMute = () => {
    sound.isMuted = !sound.isMuted;
    setIsMuted(sound.isMuted);
  };

  const checkMilestoneProgress = (
    currentHarvests = harvestCount,
    currentGadgets = gadgetCount,
    currentTree = treeHealth
  ) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.completed) return m;
        if (m.id === 'first_crop' && currentHarvests >= 3) return { ...m, completed: true };
        if (m.id === 'use_gadgets' && currentGadgets >= 1) return { ...m, completed: true };
        if (m.id === 'tree_milestone' && currentTree >= 50) return { ...m, completed: true };
        if (m.id === 'sky_miracle' && currentTree >= 100) return { ...m, completed: true };
        return m;
      })
    );
  };

  const handlePlotClick = (index: number) => {
    if (stamina <= 0 && currentTool !== 'memory_bread') {
      sound.playError();
      addLog('⚠️ 大雄太累了，走不動了！快去按「睡覺休息」吧。');
      return;
    }

    const newPlots = [...plots];
    const p = { ...newPlots[index] };
    let staminaCost = 0;

    // 1. Hoe (翻土)
    if (currentTool === 'hoe') {
      if (!p.tilled) {
        p.tilled = true;
        staminaCost = 5;
        sound.playTill();
        addLog('⛏️ 大雄揮汗翻好了泥土，露出了肥沃的新土壤！(-5體力)');
      } else {
        sound.playError();
        addLog('⚠️ 這裡已經整好田了，不需要重複翻土！');
      }
    }

    // 2. Seeds (播種)
    else if (currentTool.startsWith('seed_')) {
      const cropKey = currentTool.replace('seed_', '');
      const cropInfo = CROPS[cropKey];

      if (!p.tilled) {
        sound.playError();
        addLog('⚠️ 這裡還沒翻土整地，種子沒辦法在荒地發芽！');
      } else if (p.cropId) {
        sound.playError();
        addLog('⚠️ 這裡已經有正在生長的作物了！');
      } else if (gold < cropInfo.cost) {
        sound.playError();
        addLog(`⚠️ 銅鑼燒幣不足！需要 ${cropInfo.cost} 幣才能購買【${cropInfo.name}】種子。`);
      } else {
        setGold((g) => g - cropInfo.cost);
        p.cropId = cropInfo.id;
        p.stage = 0;
        p.boosted = false;
        staminaCost = 2;
        sound.playPlant();
        addLog(`🌱 大雄播下了【${cropInfo.name}】種子！(-${cropInfo.cost}幣, -2體力)`);
      }
    }

    // 3. Water (灑水)
    else if (currentTool === 'water') {
      if (!p.tilled) {
        sound.playError();
        addLog('⚠️ 荒地無法蓄水，請先翻土喔！');
      } else if (!p.watered) {
        p.watered = true;
        staminaCost = 3;
        sound.playWater();
        addLog('💧 澆灌了農田，泥土散發出好聞的青草香。(-3體力)');
      } else {
        sound.playError();
        addLog('⚠️ 這裡的泥土已經充分濕潤了！');
      }
    }

    // 4. Harvest (收成)
    else if (currentTool === 'harvest') {
      if (p.cropId && p.stage >= 2) {
        const cropInfo = CROPS[p.cropId];
        const gain = p.boosted ? cropInfo.giantSell : cropInfo.baseSell;
        const treeGain = p.boosted ? cropInfo.giantTreeVitality : cropInfo.treeVitality;

        setGold((g) => g + gain);
        setTreeHealth((t) => Math.min(100, t + treeGain));
        setHarvestCount((c) => {
          const next = c + 1;
          checkMilestoneProgress(next, gadgetCount, treeHealth + treeGain);
          return next;
        });

        sound.playHarvest();
        confetti({
          particleCount: p.boosted ? 50 : 25,
          spread: 60,
          origin: { y: 0.7 },
        });

        addLog(
          `🧺 收成【${p.boosted ? cropInfo.giantEmoji : cropInfo.name}】！賣出獲得 ${gain} 幣，神樹生機提升 ${treeGain}%！`
        );

        p.cropId = null;
        p.stage = 0;
        p.boosted = false;
        p.watered = false;
      } else {
        sound.playError();
        addLog('⚠️ 作物還在生長，尚未成熟！請耐心澆水照料。');
      }
    }

    // 5. Weather Box (氣象箱)
    else if (currentTool === 'weather') {
      if (stamina < 12) {
        sound.playError();
        addLog('⚠️ 啟動氣象箱需要 12 點體力！');
        return;
      }
      staminaCost = 12;
      sound.playGadget();
      setGadgetCount((c) => {
        const next = c + 1;
        checkMilestoneProgress(harvestCount, next, treeHealth);
        return next;
      });

      const updatedPlots = newPlots.map((plot) => ({
        ...plot,
        watered: plot.tilled ? true : plot.watered,
      }));

      setStamina((s) => Math.max(0, s - staminaCost));
      setPlots(updatedPlots);
      setWeather('rainy');
      addLog('🌧️ 哆啦A夢啟動了『氣象箱』！全農場瞬間自動澆灌完畢，天空降下甘霖！(-12體力)');
      return;
    }

    // 6. Shrink Ray (縮小燈)
    else if (currentTool === 'shrink') {
      if (stamina < 15) {
        sound.playError();
        addLog('⚠️ 使用縮小燈照射需要 15 點體力！');
        return;
      }
      if (p.cropId && !p.boosted) {
        p.boosted = true;
        staminaCost = 15;
        sound.playGadget();
        setGadgetCount((c) => {
          const next = c + 1;
          checkMilestoneProgress(harvestCount, next, treeHealth);
          return next;
        });
        addLog('🔦 照射『縮小燈』進行害蟲微型化！作物發生奇蹟突變，將長成巨大版！(-15體力)');
      } else {
        sound.playError();
        addLog('⚠️ 只能對尚未突變的農作物使用縮小燈！');
      }
    }

    // 7. Time Cloth (時光布)
    else if (currentTool === 'time_cloth') {
      if (stamina < 18) {
        sound.playError();
        addLog('⚠️ 使用時光布包覆需要 18 點體力！');
        return;
      }
      if (p.cropId && p.stage < 2) {
        p.stage = Math.min(2, p.stage + 1);
        staminaCost = 18;
        sound.playGadget();
        setGadgetCount((c) => {
          const next = c + 1;
          checkMilestoneProgress(harvestCount, next, treeHealth);
          return next;
        });
        addLog('⏰ 展開『時光布』！作物成長時間瞬間飛躍，生長階段提升！(-18體力)');
      } else {
        sound.playError();
        addLog('⚠️ 請對未成熟的作物使用時光布！');
      }
    }

    // 8. Memory Bread (記憶麵包)
    else if (currentTool === 'memory_bread') {
      if (gold < 25) {
        sound.playError();
        addLog('⚠️ 購買記憶麵包需要 25 銅鑼燒幣！');
        return;
      }
      setGold((g) => g - 25);
      setStamina((s) => Math.min(100, s + 40));
      sound.playCoin();
      addLog('🍞 大雄大口吃下印滿農夫知識的『記憶麵包』！精力充沛，體力回復 40 點！(-25幣)');
      return;
    }

    // Deduct stamina & update plot state
    if (staminaCost > 0) {
      setStamina((s) => Math.max(0, s - staminaCost));
      newPlots[index] = p;
      setPlots(newPlots);
    }
  };

  const handleSleep = () => {
    sound.playSleep();
    setDay((d) => d + 1);
    setStamina(100);

    // Weather shuffle: 50% sunny, 25% cloudy, 15% rainy, 10% rainbow
    const rand = Math.random();
    let nextWeather: WeatherType = 'sunny';
    if (rand < 0.5) nextWeather = 'sunny';
    else if (rand < 0.75) nextWeather = 'cloudy';
    else if (rand < 0.9) nextWeather = 'rainy';
    else nextWeather = 'rainbow';

    setWeather(nextWeather);

    // Update plots
    setPlots((prev) =>
      prev.map((p) => {
        let nextStage = p.stage;
        // If watered or rainy weather
        const willGrow = p.watered || nextWeather === 'rainy' || weather === 'rainy';
        if (p.cropId && willGrow) {
          nextStage = Math.min(2, p.stage + 1);
        }
        // Next day plots are dry unless it's rainy
        return {
          ...p,
          stage: nextStage,
          watered: nextWeather === 'rainy' && p.tilled,
        };
      })
    );

    let weatherNote = '陽光明媚';
    if (nextWeather === 'cloudy') weatherNote = '微風徐徐';
    if (nextWeather === 'rainy') weatherNote = '天降甘霖，全田地自動澆水';
    if (nextWeather === 'rainbow') weatherNote = '七彩虹光籠罩，植物生長旺盛';

    addLog(`💤 天亮了，迎來第 ${day + 1} 天！大雄精神飽滿，體力恢復 100！今日天氣：${weatherNote}。`);
  };

  const handleClaimMilestone = (id: string) => {
    const target = milestones.find((m) => m.id === id);
    if (!target || !target.completed) return;

    sound.playCoin();
    setGold((g) => g + target.reward);
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    addLog(`🏆 領取成就【${target.title}】！獲得獎勵 ${target.reward} 銅鑼燒金幣！`);
  };

  const handleBuyDorayaki = () => {
    if (gold < 30) return;
    setGold((g) => g - 30);
    setDorayakiCount((c) => c + 1);
    sound.playCoin();
    addLog('🥞 購買了 1 個香噴噴的特級銅鑼燒！(-30幣)');
  };

  const handleFeedDoraemon = () => {
    if (dorayakiCount < 1) return;
    setDorayakiCount((c) => c - 1);
    setStamina((s) => Math.min(100, s + 30));
    setTreeHealth((t) => Math.min(100, t + 5));
    sound.playGadget();

    // Complete feed milestone
    setMilestones((prev) =>
      prev.map((m) => (m.id === 'feed_doraemon' ? { ...m, completed: true } : m))
    );

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
    });

    addLog('🥞 哆啦A夢一臉幸福地把銅鑼燒吞了下去：「太好吃了！大雄謝謝你！體力送你+30點！」');
  };

  const handleExpandFarm = () => {
    if (gold < 150) return;
    setGold((g) => g - 150);
    setGridSize(16);
    sound.playHarvest();
    addLog('🌾 恭喜！小夫協助啟動了空間擴建，農田擴充為 16 格大田地！(-150幣)');
  };

  const handleResetGame = () => {
    if (window.confirm('確定要重新開始空之島農場冒險嗎？')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <PhoneSimulatorWrapper
      isSimulatorMode={isSimulatorMode}
      onToggleSimulator={() => setIsSimulatorMode(!isSimulatorMode)}
    >
      <div className="w-full flex flex-col flex-1 p-2 sm:p-3 relative select-none">
        {/* Top Header & Live Status */}
        <StatusBar
          day={day}
          stamina={stamina}
          maxStamina={100}
          gold={gold}
          treeHealth={treeHealth}
          weather={weather}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isSimulatorMode={isSimulatorMode}
          onToggleSimulator={() => setIsSimulatorMode(!isSimulatorMode)}
          onOpenTreeModal={() => {
            sound.playTill();
            setIsStoryModalOpen(true);
          }}
        />

        {/* Tree of Memory Island Display */}
        <div className="my-1.5">
          <TreeOfMemory
            health={treeHealth}
            onClick={() => {
              sound.playTill();
              setIsStoryModalOpen(true);
            }}
          />
        </div>

        {/* Farming Plot Grid */}
        <div className="flex-1 flex flex-col justify-center my-1">
          <FarmGrid
            plots={plots}
            onPlotClick={handlePlotClick}
            gridSize={gridSize}
          />
        </div>

        {/* Quick Sleep & Rest Button */}
        <div className="grid grid-cols-2 gap-2 my-1">
          <button
            onClick={handleSleep}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs sm:text-sm shadow-md active:scale-95 transition border border-amber-300 cursor-pointer"
          >
            <Moon className="w-4 h-4 fill-amber-900 text-amber-900" />
            <span>睡覺休息 (進入明天)</span>
          </button>

          <button
            onClick={() => {
              sound.playTill();
              setIsStoryModalOpen(true);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition border border-sky-300 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>物語對話 & 銅鑼燒</span>
          </button>
        </div>

        {/* Toolbelt & Secret Gadgets */}
        <ToolBar
          currentTool={currentTool}
          onSelectTool={(tool) => {
            sound.playPlant();
            setCurrentTool(tool);
          }}
          gold={gold}
          unlockedCrops={unlockedCrops}
        />

        {/* Adventure Log */}
        <AdventureLog logs={logs} onClearLogs={() => setLogs([])} />

        {/* Footer actions */}
        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <span>🍃 哆啦A夢 牧場物語：空之島</span>
          </div>
          <button
            onClick={handleResetGame}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition"
            title="重設遊戲紀錄"
          >
            <RotateCcw className="w-3 h-3" />
            <span>重置存檔</span>
          </button>
        </div>
      </div>

      {/* Story & Lore Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        treeHealth={treeHealth}
        gold={gold}
        dorayakiCount={dorayakiCount}
        gridSize={gridSize}
        milestones={milestones}
        onClaimMilestone={handleClaimMilestone}
        onBuyDorayaki={handleBuyDorayaki}
        onFeedDoraemon={handleFeedDoraemon}
        onExpandFarm={handleExpandFarm}
      />

      {/* Offline Status Toast Indicator */}
      <OfflineIndicator />
    </PhoneSimulatorWrapper>
  );
}
