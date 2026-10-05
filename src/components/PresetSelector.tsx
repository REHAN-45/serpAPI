import React from 'react';
import { INDIAN_MARKET_BENCHMARKS } from '../services/marketBenchmarks.js';
import { ThemeConfig } from '../types/theme.js';

interface PresetSelectorProps {
  onSelect: (product: string, city: string, sellingPrice: number, costPrice?: number) => void;
  currentProduct: string;
  theme: ThemeConfig;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelect, currentProduct, theme }) => {
  const isLight = theme.id === 'kirana-light';

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold tracking-tight ${theme.classes.textPrimary} flex items-center gap-1.5`}>
            <span className="text-base">🛒</span>
            <span>Indian Retail & Grocery Benchmark Catalog</span>
          </span>
          <span className={`text-xs ${theme.classes.textMuted} hidden sm:inline`}>
            (Click to simulate instant multi-channel analysis)
          </span>
        </div>
        <span className={`text-xs font-semibold ${theme.classes.accentText}`}>
          5 Live Calibrated SKUs
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {INDIAN_MARKET_BENCHMARKS.map(item => {
          const isSelected = currentProduct.toLowerCase().includes(item.name.toLowerCase().split(' ')[0]);

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.name, item.defaultCity, item.defaultSellingPrice, item.defaultCostPrice)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? `${theme.classes.cardBg} ${theme.classes.accentBorder} ring-2 ring-current shadow-md scale-[1.01]`
                  : `${theme.classes.cardBgAlt} ${theme.classes.cardBorder} hover:border-current`
              }`}
            >
              {/* Top Row: Category Emoji & City */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-xl p-1 rounded-lg bg-black/10" role="img" aria-label={item.category}>
                  {item.categoryEmoji}
                </span>
                <span className={`font-semibold text-xs px-2 py-0.5 rounded-md ${theme.classes.accentBgSubtle}`}>
                  {item.defaultCity} Mandi
                </span>
              </div>

              {/* Title & Brand */}
              <div className={`font-bold text-xs ${theme.classes.textPrimary} line-clamp-1 group-hover:${theme.classes.accentText} transition-colors`}>
                {item.name}
              </div>
              <div className={`text-[11px] ${theme.classes.textMuted} line-clamp-1 mt-0.5`}>
                {item.brandName}
              </div>

              {/* Price Row: MRP vs Your Shelf Price vs Cost */}
              <div className={`mt-3 pt-2.5 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} flex items-baseline justify-between`}>
                <div>
                  <span className={`text-[10px] ${theme.classes.textMuted} block uppercase`}>Shelf Ask</span>
                  <span className={`text-sm font-black font-mono tabular-nums ${theme.classes.textPrimary}`}>
                    ₹{item.defaultSellingPrice}
                  </span>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] ${theme.classes.textMuted} block uppercase`}>Procure Cost</span>
                  <span className={`text-xs font-mono tabular-nums ${theme.classes.textSecondary}`}>
                    ₹{item.defaultCostPrice}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
