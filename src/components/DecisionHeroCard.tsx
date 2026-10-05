import React from 'react';
import { AnalysisResult } from '../types/market.js';
import { ThemeConfig } from '../types/theme.js';
import { AlertTriangle, TrendingUp, ShieldCheck, Zap, Store } from 'lucide-react';

interface DecisionHeroCardProps {
  result: AnalysisResult;
  language: 'en' | 'hi';
  theme: ThemeConfig;
}

export const DecisionHeroCard: React.FC<DecisionHeroCardProps> = ({ result, language, theme }) => {
  const { recommendation, stats, query, normalized } = result;

  const isLight = theme.id === 'kirana-light';
  const isOverpriced = stats.priceGapVsMedian > 4;
  const isUnderpriced = stats.priceGapVsMedian < -4;

  const min = stats.minPrice;
  const max = Math.max(stats.maxPrice, query.sellingPrice);
  const range = max - min || 1;
  const medianPct = Math.min(95, Math.max(5, ((stats.medianPrice - min) / range) * 100));
  const yourPricePct = Math.min(95, Math.max(5, ((query.sellingPrice - min) / range) * 100));

  const getActionBadge = () => {
    switch (recommendation.action) {
      case 'Review Price':
        return {
          bg: isLight
            ? 'bg-rose-100 text-rose-800 border border-rose-300'
            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40',
          icon: AlertTriangle,
          label: 'Price Adjustment Recommended'
        };
      case 'Opportunity to Increase':
        return {
          bg: isLight
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
          icon: TrendingUp,
          label: 'Margin Expansion Opportunity'
        };
      case 'Source Cheaper Locally':
        return {
          bg: isLight
            ? 'bg-blue-100 text-blue-800 border border-blue-300'
            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
          icon: Store,
          label: 'Wholesale Mandi Procurement Lead'
        };
      case 'Urgent Restock Action':
        return {
          bg: isLight
            ? 'bg-purple-100 text-purple-800 border border-purple-300'
            : 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
          icon: Zap,
          label: 'Supply Chain Volatility Alert'
        };
      default:
        return {
          bg: isLight
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
          icon: ShieldCheck,
          label: 'Optimal Market Positioning'
        };
    }
  };

  const actionStyle = getActionBadge();
  const ActionIcon = actionStyle.icon;

  return (
    <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden transition-colors`}>
      {/* Top Meta Header */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-5 border-b ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-bold ${theme.classes.textPrimary} text-sm`}>{normalized.product}</span>
          <span className={theme.classes.textMuted}>·</span>
          <span className={theme.classes.textSecondary}>{normalized.city} Trading District</span>
          <span className={theme.classes.textMuted}>·</span>
          <span className={`font-semibold ${theme.classes.accentText}`}>{normalized.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={theme.classes.textMuted}>Confidence:</span>
          <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'} flex items-center gap-1`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            {recommendation.confidence}
          </span>
          <span className={theme.classes.textMuted}>·</span>
          <span className={theme.classes.textMuted}>{stats.competitorsFoundCount} online channels analyzed</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl ${actionStyle.bg} shrink-0 mt-1`}>
            <ActionIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${actionStyle.bg}`}>
                {actionStyle.label}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black ${theme.classes.textPrimary} tracking-tight leading-snug`}>
              {recommendation.headline}
            </h2>
            <p className={`text-sm ${theme.classes.textSecondary} mt-3 leading-relaxed max-w-3xl`}>
              {language === 'hi' ? recommendation.hindiSummary : recommendation.detailedAdvice}
            </p>
          </div>
        </div>

        {/* 4 Financial Figures Ledger */}
        <div className={`mt-8 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} grid grid-cols-2 sm:grid-cols-4 gap-4`}>
          <div className={`p-4 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <span className={`text-xs ${theme.classes.textMuted} block mb-1 font-semibold`}>Your Shelf Ask</span>
            <div className={`text-2xl font-black font-mono tabular-nums ${theme.classes.textPrimary}`}>
              ₹{query.sellingPrice.toFixed(2)}
            </div>
            <span className={`text-[11px] ${theme.classes.textMuted} mt-1 block`}>Current store price</span>
          </div>

          <div className={`p-4 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <span className={`text-xs ${theme.classes.textMuted} block mb-1 font-semibold`}>Observed Market Median</span>
            <div className={`text-2xl font-black font-mono tabular-nums ${theme.classes.accentText}`}>
              ₹{stats.medianPrice.toFixed(2)}
            </div>
            <span className={`text-[11px] ${theme.classes.textMuted} mt-1 block`}>Channel average</span>
          </div>

          <div className={`p-4 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <span className={`text-xs ${theme.classes.textMuted} block mb-1 font-semibold`}>Price Variance</span>
            <div
              className={`text-2xl font-black font-mono tabular-nums ${
                isOverpriced
                  ? isLight ? 'text-rose-600' : 'text-rose-400'
                  : isUnderpriced
                  ? isLight ? 'text-emerald-700' : 'text-emerald-400'
                  : theme.classes.textPrimary
              }`}
            >
              {stats.priceGapVsMedian > 0 ? `+${stats.priceGapVsMedian}%` : `${stats.priceGapVsMedian}%`}
            </div>
            <span className={`text-[11px] ${theme.classes.textMuted} mt-1 block`}>vs Market median</span>
          </div>

          <div className={`p-4 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <span className={`text-xs ${theme.classes.textMuted} block mb-1 font-semibold`}>Suggested Pricing Band</span>
            <div className={`text-lg font-bold font-mono tabular-nums ${theme.classes.textPrimary} mt-0.5`}>
              ₹{recommendation.suggestedPriceRange.min} – ₹{recommendation.suggestedPriceRange.max}
            </div>
            <span className={`text-[11px] ${theme.classes.accentText} mt-1 block font-bold`}>
              Target: ₹{recommendation.suggestedPriceRange.target}
            </span>
          </div>
        </div>

        {/* Visual Benchmark Corridor Bar */}
        <div className={`mt-8 p-5 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
          <div className={`flex justify-between items-center text-xs ${theme.classes.textMuted} mb-3`}>
            <span className={`font-semibold ${theme.classes.textPrimary}`}>Channel Price Spread & Position</span>
            <span className="font-mono tabular-nums">Low: ₹{stats.minPrice} · High: ₹{stats.maxPrice}</span>
          </div>

          <div className="relative pt-6 pb-3">
            {/* The Track */}
            <div className={`h-2.5 w-full ${theme.classes.meterTrack} rounded-full relative overflow-visible`}>
              {/* Target corridor segment */}
              <div
                className={`absolute top-0 bottom-0 ${isLight ? 'bg-emerald-200' : 'bg-white/20'} rounded-full`}
                style={{
                  left: `${Math.min(90, Math.max(5, ((recommendation.suggestedPriceRange.min - min) / range) * 100))}%`,
                  width: `${Math.max(12, ((recommendation.suggestedPriceRange.max - recommendation.suggestedPriceRange.min) / range) * 100)}%`
                }}
              />

              {/* Median Marker */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-5 ${isLight ? 'bg-emerald-700' : 'bg-amber-400'} rounded-xs shadow-md`}
                style={{ left: `${medianPct}%` }}
                title={`Median: ₹${stats.medianPrice}`}
              />

              {/* Your Price Marker */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'bg-slate-900 border-2 border-white' : 'bg-white border-2 border-black'} rounded-full shadow-lg`}
                style={{ left: `${yourPricePct}%` }}
                title={`Your Price: ₹${query.sellingPrice}`}
              />
            </div>

            {/* Labels under the track */}
            <div className={`flex justify-between text-xs ${theme.classes.textMuted} mt-3 font-mono tabular-nums`}>
              <span>₹{min} (Channel Low)</span>
              <span className={`${theme.classes.accentText} font-bold`}>▲ ₹{stats.medianPrice} (Market Median)</span>
              <span>₹{max} (Upper Retail)</span>
            </div>
          </div>
        </div>

        {/* Cost & Margin Ledger (if cost provided) */}
        {query.costPrice && stats.sellerMarginPercent !== undefined && (
          <div className={`mt-5 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} flex flex-wrap items-center justify-between gap-4 text-xs`}>
            <div className="flex items-center gap-1.5">
              <span className={theme.classes.textMuted}>Landing Cost:</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>₹{query.costPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={theme.classes.textMuted}>Your Gross Margin:</span>
              <span className={`font-mono tabular-nums font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{stats.sellerMarginPercent}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={theme.classes.textMuted}>Margin at Median:</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.textSecondary}`}>{stats.marketMarginPercent}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={theme.classes.textMuted}>Profit Per Unit:</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.accentText}`}>
                ₹{(query.sellingPrice - query.costPrice).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
