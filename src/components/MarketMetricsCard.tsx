import React from 'react';
import { AnalysisResult } from '../types/market.js';
import { ThemeConfig } from '../types/theme.js';
import { ShoppingBag, Store, Newspaper, LineChart } from 'lucide-react';

interface MarketMetricsCardProps {
  result: AnalysisResult;
  theme: ThemeConfig;
}

export const MarketMetricsCard: React.FC<MarketMetricsCardProps> = ({ result, theme }) => {
  const { stats, localSourcing, externalRisk, evidence, normalized } = result;
  const isLight = theme.id === 'kirana-light';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Digital Commerce Landscape */}
      <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors`}>
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className={`font-bold uppercase tracking-wider ${theme.classes.textPrimary} flex items-center gap-1.5`}>
              <ShoppingBag className={`w-4 h-4 ${theme.classes.accentText}`} />
              <span>Digital Commerce</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${theme.classes.accentBgSubtle}`}>
              Shopping
            </span>
          </div>

          <div className="space-y-1">
            <div className={`text-2xl font-black font-mono tabular-nums ${theme.classes.textPrimary}`}>
              ₹{stats.minPrice} – ₹{stats.maxPrice}
            </div>
            <div className={`text-xs ${theme.classes.textSecondary}`}>
              Observed Median: <span className={`font-mono tabular-nums font-bold ${theme.classes.accentText}`}>₹{stats.medianPrice}</span>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs space-y-1.5`}>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Verified Channels</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>{stats.competitorsFoundCount} items</span>
            </div>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Quick-Commerce Price</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.accentText}`}>
                {evidence.shopping.find(s => s.badge === 'Quick Commerce')?.price
                  ? `₹${evidence.shopping.find(s => s.badge === 'Quick Commerce')?.price}`
                  : '—'}
              </span>
            </div>
          </div>
        </div>

        <div className={`mt-4 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs flex items-center justify-between`}>
          <span className={theme.classes.textMuted}>Variance vs shelf ask:</span>
          <span className={`font-mono tabular-nums font-bold ${
            stats.priceGapVsMedian > 0
              ? isLight ? 'text-rose-600' : 'text-rose-400'
              : isLight ? 'text-emerald-700' : 'text-emerald-400'
          }`}>
            {stats.priceGapVsMedian > 0 ? `+${stats.priceGapVsMedian}%` : `${stats.priceGapVsMedian}%`}
          </span>
        </div>
      </div>

      {/* 2. Local Wholesale & Mandi Proximity */}
      <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors`}>
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className={`font-bold uppercase tracking-wider ${theme.classes.textPrimary} flex items-center gap-1.5`}>
              <Store className="w-4 h-4 text-blue-500" />
              <span>Local Mandis</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
              localSourcing.level === 'High'
                ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {localSourcing.level} Sourcing
            </span>
          </div>

          <div className="space-y-1">
            <div className={`text-lg font-bold ${theme.classes.textPrimary} line-clamp-1`}>
              {normalized.city} Wholesale Hub
            </div>
            <p className={`text-xs ${theme.classes.textSecondary} line-clamp-2 leading-relaxed`}>
              {localSourcing.summary}
            </p>
          </div>

          <div className={`mt-4 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs space-y-1.5`}>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Nearby Merchants</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>{localSourcing.verifiedCount} leads</span>
            </div>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Primary Node</span>
              <span className={`font-medium ${theme.classes.textPrimary} line-clamp-1 max-w-[130px]`}>
                {localSourcing.topSourcingHub || 'City Terminal Mandi'}
              </span>
            </div>
          </div>
        </div>

        <div className={`mt-4 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs flex items-center justify-between`}>
          <span className={theme.classes.textMuted}>Procurement leverage:</span>
          <span className="font-semibold text-blue-500">
            {localSourcing.level === 'High' ? 'Direct Mandi Bargain' : 'Distributor Network'}
          </span>
        </div>
      </div>

      {/* 3. Supply Chain & Market News */}
      <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors`}>
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className={`font-bold uppercase tracking-wider ${theme.classes.textPrimary} flex items-center gap-1.5`}>
              <Newspaper className="w-4 h-4 text-purple-500" />
              <span>Supply News</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
              isLight ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
            }`}>
              News Wire
            </span>
          </div>

          <div className="space-y-1">
            <div className={`text-sm font-semibold ${theme.classes.textPrimary} line-clamp-2 leading-snug`}>
              {evidence.news[0]?.title || 'Regional trading flows and agricultural arrivals steady'}
            </div>
            <div className={`text-xs ${theme.classes.textMuted}`}>
              {evidence.news[0]?.source} · {evidence.news[0]?.date}
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs space-y-1.5`}>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Market Articles</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>{evidence.news.length} updates</span>
            </div>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Supply Sentiment</span>
              <span className={`font-semibold ${theme.classes.textPrimary}`}>{evidence.news[0]?.sentiment || 'Neutral'}</span>
            </div>
          </div>
        </div>

        <div className={`mt-4 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs flex items-center justify-between`}>
          <span className={theme.classes.textMuted}>Stock Outlook:</span>
          <span className="font-semibold text-purple-500">
            {evidence.news.some(n => n.sentiment === 'Supply Shock') ? 'Price Volatility Expected' : 'Normal Restock Cycle'}
          </span>
        </div>
      </div>

      {/* 4. Macro & Commodity Index */}
      <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors`}>
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className={`font-bold uppercase tracking-wider ${theme.classes.textPrimary} flex items-center gap-1.5`}>
              <LineChart className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
              <span>Macro Signal</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
              externalRisk.level === 'High'
                ? isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              Risk: {externalRisk.level}
            </span>
          </div>

          <div className="space-y-1">
            <div className={`text-lg font-black font-mono tabular-nums ${theme.classes.textPrimary}`}>
              {evidence.finance.currentMetric}
            </div>
            <div className={`text-xs ${theme.classes.textSecondary} line-clamp-1`}>
              {evidence.finance.signalName}
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs space-y-1.5`}>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Index Movement</span>
              <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>{evidence.finance.changeText}</span>
            </div>
            <div className="flex justify-between">
              <span className={theme.classes.textMuted}>Factor Category</span>
              <span className={theme.classes.textSecondary}>{evidence.finance.category}</span>
            </div>
          </div>
        </div>

        <div className={`mt-4 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs flex items-center justify-between`}>
          <span className={theme.classes.textMuted}>Pricing pressure:</span>
          <span className={`font-semibold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>{evidence.finance.impact} Environment</span>
        </div>
      </div>
    </div>
  );
};
