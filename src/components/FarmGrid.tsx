import React, { useState } from 'react';
import { FarmPlot, CROPS } from '../types/game';
import { Droplet, Sparkles } from 'lucide-react';

interface FarmGridProps {
  plots: FarmPlot[];
  onPlotClick: (index: number) => void;
  gridSize: number; // 9 for 3x3 or 16 for 4x4
}

interface FloatingText {
  id: number;
  index: number;
  text: string;
  color: string;
}

export const FarmGrid: React.FC<FarmGridProps> = ({ plots, onPlotClick, gridSize }) => {
  const [floatingTexts] = useState<FloatingText[]>([]);

  const gridColsClass = gridSize === 16 ? 'grid-cols-4' : 'grid-cols-3';

  return (
    <div className="relative w-full max-w-md mx-auto my-1 select-none">
      <div className={`grid ${gridColsClass} gap-2.5 p-2 bg-amber-900/10 rounded-2xl border-2 border-amber-800/20 shadow-inner`}>
        {plots.slice(0, gridSize).map((plot, index) => {
          const crop = plot.cropId ? CROPS[plot.cropId] : null;

          // Soil background styling
          let soilClass = 'bg-[#dfba82] border-[#b89561] hover:bg-[#d6af74]'; // Untilled
          if (plot.tilled) {
            soilClass = plot.watered
              ? 'bg-[#4a2e13] border-[#311c08] shadow-inner' // Watered tilled
              : 'bg-[#82542a] border-[#653e1a] shadow-xs'; // Dry tilled
          }

          return (
            <button
              key={plot.id}
              onClick={() => onPlotClick(index)}
              className={`relative aspect-square rounded-2xl border-b-4 border-r-2 flex flex-col items-center justify-center p-1.5 transition-all duration-150 transform active:scale-95 active:border-b-2 cursor-pointer overflow-hidden ${soilClass}`}
              title={`農田 #${index + 1}`}
            >
              {/* Plot texture lines for tilled land */}
              {plot.tilled && (
                <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-around py-1">
                  <div className="h-0.5 bg-black/40 rounded-full" />
                  <div className="h-0.5 bg-black/40 rounded-full" />
                  <div className="h-0.5 bg-black/40 rounded-full" />
                </div>
              )}

              {/* Water moisture effect */}
              {plot.watered && (
                <div className="absolute top-1 right-1 flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-sky-500/80 text-white text-[9px] font-bold shadow-xs">
                  <Droplet className="w-2.5 h-2.5 fill-current" />
                  <span className="hidden xs:inline">濕潤</span>
                </div>
              )}

              {/* Crop visualization */}
              {crop ? (
                <div className="flex flex-col items-center justify-center relative z-10 w-full h-full">
                  {plot.stage === 0 && (
                    <div className="flex flex-col items-center">
                      <span className="text-xl sm:text-2xl animate-pulse">🌱</span>
                      <span className="text-[10px] font-bold text-white/90 drop-shadow-md">
                        幼苗
                      </span>
                    </div>
                  )}

                  {plot.stage === 1 && (
                    <div className="flex flex-col items-center">
                      <span className="text-2xl sm:text-3xl animate-gentle-bob">🌿</span>
                      <span className="text-[10px] font-bold text-emerald-200 drop-shadow-md">
                        生長中
                      </span>
                    </div>
                  )}

                  {plot.stage >= 2 && (
                    <div className="flex flex-col items-center animate-harvest-pop">
                      <div className="relative">
                        <span className={`text-3xl sm:text-4xl transition-transform ${plot.boosted ? 'scale-125' : ''}`}>
                          {crop.emoji}
                        </span>
                        {plot.boosted && (
                          <span className="absolute -top-1 -right-2 text-xs animate-spin" style={{ animationDuration: '4s' }}>
                            ✨
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] shadow-sm whitespace-nowrap">
                        {plot.boosted ? (
                          <>
                            <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                            <span>巨型可收穫</span>
                          </>
                        ) : (
                          <span>可收穫</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Boosted glowing indicator tag if still growing */}
                  {plot.boosted && plot.stage < 2 && (
                    <div className="absolute bottom-0.5 px-1 rounded-sm bg-yellow-400/90 text-yellow-950 font-black text-[9px] shadow-xs">
                      ✨縮小燈突變
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-70">
                  {plot.tilled ? (
                    <span className="text-xs font-bold text-amber-100 drop-shadow-xs">
                      已整地
                    </span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-base">🌾</span>
                      <span className="text-[10px] font-medium text-amber-900/80">荒地</span>
                    </div>
                  )}
                </div>
              )}

              {/* Individual Floating text overlay for this plot */}
              {floatingTexts
                .filter((ft) => ft.index === index)
                .map((ft) => (
                  <div
                    key={ft.id}
                    className={`absolute z-30 pointer-events-none font-bold text-xs animate-harvest-pop ${ft.color}`}
                  >
                    {ft.text}
                  </div>
                ))}
            </button>
          );
        })}
      </div>
    </div>
  );
};
