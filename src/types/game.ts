export type ToolType =
  | 'hoe'
  | 'seed_radish'
  | 'seed_strawberry'
  | 'seed_corn'
  | 'seed_watermelon'
  | 'seed_flower'
  | 'water'
  | 'harvest'
  | 'weather'
  | 'shrink'
  | 'time_cloth'
  | 'memory_bread';

export interface CropDefinition {
  id: string;
  name: string;
  emoji: string;
  giantEmoji: string;
  cost: number;
  baseSell: number;
  giantSell: number;
  treeVitality: number;
  giantTreeVitality: number;
  growthDays: number;
  description: string;
}

export const CROPS: Record<string, CropDefinition> = {
  radish: {
    id: 'radish',
    name: '雲朵白蘿蔔',
    emoji: '🥕',
    giantEmoji: '✨🥕大白蘿蔔',
    cost: 10,
    baseSell: 35,
    giantSell: 80,
    treeVitality: 4,
    giantTreeVitality: 9,
    growthDays: 2,
    description: '空之島特產，汲取雲露長大，口感甘甜清脆。',
  },
  strawberry: {
    id: 'strawberry',
    name: '浮空草莓',
    emoji: '🍓',
    giantEmoji: '✨🍓女王草莓',
    cost: 20,
    baseSell: 65,
    giantSell: 150,
    treeVitality: 6,
    giantTreeVitality: 14,
    growthDays: 2,
    description: '飄浮在微風中的甜美果實，靜香最喜歡的水果！',
  },
  corn: {
    id: 'corn',
    name: '陽光金玉米',
    emoji: '🌽',
    giantEmoji: '✨🌽金燦巨型玉米',
    cost: 30,
    baseSell: 100,
    giantSell: 240,
    treeVitality: 8,
    giantTreeVitality: 18,
    growthDays: 3,
    description: '飽含空島烈陽精華，顆粒飽滿金黃。',
  },
  watermelon: {
    id: 'watermelon',
    name: '彩虹西瓜',
    emoji: '🍉',
    giantEmoji: '✨🍉彩虹霸王西瓜',
    cost: 50,
    baseSell: 180,
    giantSell: 420,
    treeVitality: 12,
    giantTreeVitality: 28,
    growthDays: 3,
    description: '稀有的七彩西瓜，清甜消暑，是空之島的國寶農產。',
  },
  flower: {
    id: 'flower',
    name: '記憶之花',
    emoji: '🌸',
    giantEmoji: '✨🌸永恆奇蹟花',
    cost: 40,
    baseSell: 90,
    giantSell: 220,
    treeVitality: 20,
    giantTreeVitality: 45,
    growthDays: 2,
    description: '花瓣散發出溫柔的記憶微光，能大幅治癒記憶之樹！',
  },
};

export interface FarmPlot {
  id: number;
  tilled: boolean;
  watered: boolean;
  cropId: string | null;
  stage: number; // 0: seed, 1: growing, 2: ready
  boosted: boolean; // enlarged via Small Light (縮小燈)
}

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'rainbow';

export interface Milestone {
  id: string;
  title: string;
  desc: string;
  reward: number;
  completed: boolean;
  icon: string;
}

export interface CharacterDialogue {
  speaker: string;
  role: string;
  avatar: string;
  color: string;
  text: string;
}

export interface GameStats {
  totalHarvested: number;
  totalEarned: number;
  dorayakiGiven: number;
  gadgetsUsed: number;
  giantCropsGrown: number;
}
