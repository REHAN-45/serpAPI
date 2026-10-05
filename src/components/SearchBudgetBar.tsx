import React from 'react';
import { X, Zap } from 'lucide-react';
import { BudgetStats } from '../types/market.js';
import { ThemeConfig } from '../types/theme.js';

interface SearchBudgetBarProps {
  budget: BudgetStats | null;
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
}

export const SearchBudgetBar: React.FC<SearchBudgetBarProps> = ({ budget, isOpen, onClose, theme }) => {
  if (!isOpen) return null;
  const isLight = theme.id === 'kirana-light';

  const total = 100;
  const used = budget ? (total - budget.remainingSearchBudget) : 12;
  const remaining = budget ? budget.remainingSearchBudget : 88;
  const percentUsed = Math.min(100, Math.round((used / total) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative transition-colors`}>
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-1 rounded-lg ${theme.classes.textMuted} hover:${theme.classes.textPrimary} transition-colors cursor-pointer`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${theme.classes.accentBgSubtle} ${theme.classes.accentText}`}>
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${theme.classes.textPrimary}`}>Search Quota & Execution Audit</h3>
            <p className={`text-xs ${theme.classes.textMuted} mt-0.5`}>
              Free SerpApi quota governance (4 queries per uncached request)
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="my-5">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            <span className={theme.classes.textSecondary}>Quota Consumed: {used} / {total}</span>
            <span className={`font-mono tabular-nums font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              {remaining} Available
            </span>
          </div>
          <div className={`h-2.5 w-full ${theme.classes.meterTrack} rounded-full overflow-hidden border ${isLight ? 'border-slate-300' : 'border-white/10'}`}>
            <div
              className={`h-full ${theme.classes.meterFill} transition-all rounded-full`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
        </div>

        {/* Safeguards List */}
        <div className={`space-y-2.5 text-xs ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border p-4 rounded-2xl mb-5`}>
          <div className={`font-bold ${theme.classes.textPrimary} text-xs mb-1`}>
            Governing Execution Protocols
          </div>
          <div className={`${theme.classes.textSecondary} space-y-1.5 leading-relaxed`}>
            <p><strong>Deterministic 2-Hour Cache:</strong> Identical product and city requests return stored results, burning 0 quota credits.</p>
            <p><strong>Strict Budget Limit:</strong> Exactly 4 search queries per uncached SKU (Shopping, Local, News, Finance).</p>
            <p><strong>Grounding Failover:</strong> In the absence of an active SerpApi token, Gemini grounds real-time market reality seamlessly.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.classes.cardBgAlt} hover:bg-black/10 ${theme.classes.textPrimary} border ${theme.classes.cardBorder} transition-colors cursor-pointer`}
        >
          Close Quota Monitor
        </button>
      </div>
    </div>
  );
};
