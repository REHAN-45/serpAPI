import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { ThemeConfig } from '../types/theme.js';

interface MarginCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  currentCost?: number;
  marketMedian: number;
  productName: string;
  theme: ThemeConfig;
}

export const MarginCalculatorModal: React.FC<MarginCalculatorModalProps> = ({
  isOpen,
  onClose,
  currentPrice,
  currentCost = Math.round(currentPrice * 0.78),
  marketMedian,
  productName,
  theme
}) => {
  const [testPrice, setTestPrice] = useState<number>(marketMedian);
  const [cost, setCost] = useState<number>(currentCost);
  const [monthlyUnits, setMonthlyUnits] = useState<number>(100);

  if (!isOpen) return null;
  const isLight = theme.id === 'kirana-light';

  const currentProfitPerUnit = currentPrice - cost;
  const currentTotalProfit = currentProfitPerUnit * monthlyUnits;
  const currentMargin = currentPrice > 0 ? ((currentProfitPerUnit / currentPrice) * 100).toFixed(1) : '0';

  const testProfitPerUnit = testPrice - cost;
  const testTotalProfit = testProfitPerUnit * monthlyUnits;
  const testMargin = testPrice > 0 ? ((testProfitPerUnit / testPrice) * 100).toFixed(1) : '0';

  const profitDiff = testTotalProfit - currentTotalProfit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative transition-colors`}>
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-1 rounded-lg ${theme.classes.textMuted} hover:${theme.classes.textPrimary} transition-colors cursor-pointer`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${theme.classes.accentBgSubtle} ${theme.classes.accentText}`}>
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${theme.classes.textPrimary}`}>Unit Economics & Margin Simulator</h3>
            <p className={`text-xs ${theme.classes.textMuted} truncate mt-0.5`}>{productName}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className={`p-3.5 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <label className={`text-xs font-semibold ${theme.classes.textSecondary} block mb-1`}>
              Simulated Price (₹)
            </label>
            <input
              type="number"
              value={testPrice}
              onChange={e => setTestPrice(Number(e.target.value))}
              className={`w-full bg-transparent font-mono tabular-nums text-2xl font-bold ${theme.classes.accentText} focus:outline-none`}
            />
            <div className={`text-[11px] ${theme.classes.textMuted} mt-1`}>Observed Median: ₹{marketMedian}</div>
          </div>

          <div className={`p-3.5 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <label className={`text-xs font-semibold ${theme.classes.textSecondary} block mb-1`}>
              Wholesale Landing Cost (₹)
            </label>
            <input
              type="number"
              value={cost}
              onChange={e => setCost(Number(e.target.value))}
              className={`w-full bg-transparent font-mono tabular-nums text-2xl font-bold ${theme.classes.textPrimary} focus:outline-none`}
            />
            <div className={`text-[11px] ${theme.classes.textMuted} mt-1`}>Procurement cost</div>
          </div>
        </div>

        {/* Volume Selector */}
        <div className={`mb-5 p-3.5 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border flex items-center justify-between`}>
          <div>
            <span className={`text-xs font-semibold ${theme.classes.textPrimary} block`}>Expected Sales Volume</span>
            <span className={`text-[11px] ${theme.classes.textMuted}`}>Monthly units</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[50, 100, 250, 500].map(vol => (
              <button
                key={vol}
                onClick={() => setMonthlyUnits(vol)}
                className={`px-3 py-1 rounded-lg text-xs font-mono tabular-nums font-bold transition-all cursor-pointer ${
                  monthlyUnits === vol
                    ? `${theme.classes.accent} text-white shadow-xs`
                    : `${theme.classes.cardBg} ${theme.classes.textSecondary} hover:${theme.classes.textPrimary}`
                }`}
              >
                {vol}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={`p-4 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border space-y-2.5 mb-6 text-xs font-medium`}>
          <div className="flex justify-between items-center">
            <span className={theme.classes.textMuted}>Current Margin @ ₹{currentPrice}:</span>
            <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>{currentMargin}% (₹{currentProfitPerUnit.toFixed(2)}/unit)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className={theme.classes.textMuted}>Simulated Margin @ ₹{testPrice}:</span>
            <span className={`font-mono tabular-nums font-bold ${theme.classes.accentText}`}>{testMargin}% (₹{testProfitPerUnit.toFixed(2)}/unit)</span>
          </div>

          <div className={`pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} flex justify-between items-center text-sm font-bold`}>
            <span className={theme.classes.textPrimary}>Net Monthly Profit Delta:</span>
            <span
              className={`font-mono tabular-nums text-base ${
                profitDiff >= 0
                  ? isLight ? 'text-emerald-700' : 'text-emerald-400'
                  : 'text-rose-600'
              }`}
            >
              {profitDiff >= 0 ? `+₹${profitDiff.toLocaleString()}` : `-₹${Math.abs(profitDiff).toLocaleString()}`}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl font-bold text-xs ${theme.classes.accent} ${theme.classes.accentHover} text-white transition-colors cursor-pointer shadow-md`}
        >
          Apply Strategy & Close
        </button>
      </div>
    </div>
  );
};
