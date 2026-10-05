import React, { useState } from 'react';
import { ExternalLink, Phone, ShieldCheck, ShoppingBag, Store, Newspaper, LineChart, Database } from 'lucide-react';
import { AnalysisResult } from '../types/market.js';
import { ThemeConfig } from '../types/theme.js';

interface EvidenceTabsProps {
  result: AnalysisResult;
  theme: ThemeConfig;
}

export const EvidenceTabs: React.FC<EvidenceTabsProps> = ({ result, theme }) => {
  const [activeTab, setActiveTab] = useState<'shopping' | 'local' | 'news' | 'finance' | 'orchestrator'>('shopping');

  const { evidence, budget, normalized, query } = result;
  const isLight = theme.id === 'kirana-light';

  const getMerchantBadge = (merchant: string, badge?: string) => {
    if (/zepto/i.test(merchant)) {
      return <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'text-[#ff3269] bg-[#ff3269]/10 border-[#ff3269]/30'}`}>Zepto 10-min</span>;
    }
    if (/blinkit/i.test(merchant)) {
      return <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>Blinkit 10-min</span>;
    }
    if (/instamart|swiggy/i.test(merchant)) {
      return <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${isLight ? 'bg-orange-100 text-orange-900 border-orange-300' : 'text-orange-400 bg-orange-500/10 border-orange-500/20'}`}>Instamart</span>;
    }
    if (/amazon/i.test(merchant)) {
      return <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${isLight ? 'bg-sky-100 text-sky-900 border-sky-300' : 'text-sky-400 bg-sky-500/10 border-sky-500/20'}`}>Amazon Prime</span>;
    }
    if (/dmart/i.test(merchant)) {
      return <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'}`}>DMart Ready</span>;
    }
    return <span className={`text-[11px] font-semibold ${theme.classes.textMuted}`}>{badge || 'E-Commerce'}</span>;
  };

  return (
    <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-3xl p-6 shadow-xs transition-colors`}>
      {/* Header and Filter Navigation */}
      <div className={`flex items-center justify-between flex-wrap gap-4 pb-5 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
        <div>
          <h3 className={`text-base font-bold ${theme.classes.textPrimary} tracking-tight flex items-center gap-2`}>
            <span>Market Evidence & Source Registry</span>
            <span className={`text-xs font-normal ${theme.classes.textMuted}`}>
              ({evidence.shopping.length + evidence.local.length + evidence.news.length + 1} cross-verified data points)
            </span>
          </h3>
          <p className={`text-xs ${theme.classes.textMuted} mt-0.5`}>
            Transparent multi-channel evidence across Quick Commerce, Local Mandis, Supply News & Macro benchmarks.
          </p>
        </div>

        {/* Tab Buttons (Segmented Filter Bar) */}
        <div className={`flex items-center ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border rounded-xl p-1 text-xs overflow-x-auto`}>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shopping'
                ? `${theme.classes.accent} text-white shadow-xs`
                : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Digital Commerce ({evidence.shopping.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('local')}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'local'
                ? `${theme.classes.accent} text-white shadow-xs`
                : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Wholesale Mandis ({evidence.local.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'news'
                ? `${theme.classes.accent} text-white shadow-xs`
                : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Market News ({evidence.news.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'finance'
                ? `${theme.classes.accent} text-white shadow-xs`
                : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Macro Index</span>
          </button>

          <button
            onClick={() => setActiveTab('orchestrator')}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orchestrator'
                ? `${theme.classes.accent} text-white shadow-xs`
                : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Audit Log</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Digital Commerce Table */}
      {activeTab === 'shopping' && (
        <div className="pt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'} font-bold uppercase text-[11px] tracking-wider`}>
                <th className="py-3 px-3">Platform / Channel</th>
                <th className="py-3 px-3">Catalog Item Description</th>
                <th className="py-3 px-3 text-right">Observed Price</th>
                <th className="py-3 px-3 text-right">Difference vs Shelf</th>
                <th className="py-3 px-3">Delivery Speed</th>
                <th className="py-3 px-3 text-right">Source Link</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-white/5'} font-medium`}>
              {evidence.shopping.map(item => {
                const delta = item.price - query.sellingPrice;
                const isUnder = delta < 0;

                return (
                  <tr key={item.id} className={`${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/5'} transition-colors`}>
                    <td className="py-3 px-3 font-bold whitespace-nowrap">
                      {getMerchantBadge(item.merchant, item.badge)}
                    </td>
                    <td className={`py-3 px-3 ${theme.classes.textPrimary} max-w-sm truncate`} title={item.title}>
                      {item.title}
                    </td>
                    <td className={`py-3 px-3 text-right font-mono tabular-nums font-black ${theme.classes.accentText} whitespace-nowrap text-sm`}>
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums whitespace-nowrap font-bold">
                      <span className={
                        isUnder
                          ? isLight ? 'text-rose-600' : 'text-amber-400'
                          : isLight ? 'text-emerald-700' : 'text-emerald-400'
                      }>
                        {isUnder ? `-₹${Math.abs(delta).toFixed(2)}` : `+₹${delta.toFixed(2)}`}
                      </span>
                    </td>
                    <td className={`py-3 px-3 ${theme.classes.textMuted} whitespace-nowrap`}>
                      {item.deliveryInfo || 'Standard Delivery'}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {item.link && item.link !== '#' ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className={`${theme.classes.accentText} hover:underline inline-flex items-center gap-1 font-bold`}
                        >
                          <span>View SKU</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className={theme.classes.textMuted}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Local Wholesale Mandis Table */}
      {activeTab === 'local' && (
        <div className="pt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'} font-bold uppercase text-[11px] tracking-wider`}>
                <th className="py-3 px-3">Trade Establishment</th>
                <th className="py-3 px-3">Classification</th>
                <th className="py-3 px-3">Address / Mandi Yard</th>
                <th className="py-3 px-3">Distance</th>
                <th className="py-3 px-3 text-right">Direct Inquiry Contact</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-white/5'} font-medium`}>
              {evidence.local.map(lead => (
                <tr key={lead.id} className={`${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/5'} transition-colors`}>
                  <td className={`py-3 px-3 font-bold ${theme.classes.textPrimary} whitespace-nowrap`}>
                    {lead.name}
                  </td>
                  <td className="py-3 px-3 text-blue-500 font-semibold whitespace-nowrap">
                    {lead.type}
                  </td>
                  <td className={`py-3 px-3 ${theme.classes.textSecondary} max-w-sm truncate`} title={lead.address}>
                    {lead.address}
                  </td>
                  <td className={`py-3 px-3 ${theme.classes.textMuted} font-mono tabular-nums whitespace-nowrap`}>
                    {lead.distanceEstimate || 'Near City Terminal'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums whitespace-nowrap">
                    {lead.phone ? (
                      <span className={`${isLight ? 'text-emerald-700' : 'text-emerald-400'} font-bold flex items-center justify-end gap-1`}>
                        <Phone className="w-3.5 h-3.5" />
                        {lead.phone}
                      </span>
                    ) : (
                      <span className={theme.classes.textMuted}>Mandi Walk-In</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Market & Supply News */}
      {activeTab === 'news' && (
        <div className={`pt-4 divide-y ${isLight ? 'divide-slate-200' : 'divide-white/5'}`}>
          {evidence.news.map(article => (
            <div key={article.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="max-w-3xl">
                <div className={`flex items-center gap-2 text-xs ${theme.classes.textMuted} mb-1.5`}>
                  <span className={`font-bold ${theme.classes.textPrimary}`}>{article.source}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span className={`font-bold ${theme.classes.accentText}`}>{article.sentiment}</span>
                </div>
                <h4 className={`text-sm font-bold ${theme.classes.textPrimary} leading-snug`}>
                  {article.title}
                </h4>
                <p className={`text-xs ${theme.classes.textSecondary} mt-1.5 leading-relaxed`}>
                  {article.snippet}
                </p>
              </div>

              {article.link && article.link !== '#' && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs ${theme.classes.accentText} hover:underline font-bold inline-flex items-center gap-1 self-start shrink-0`}
                >
                  <span>Read Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Macro & Commodity Index */}
      {activeTab === 'finance' && (
        <div className="pt-4">
          <div className={`p-6 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <div className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <div>
                <span className={`text-xs ${theme.classes.textMuted} block mb-1 font-semibold`}>
                  Primary Commodity / Macro Indicator ({evidence.finance.category})
                </span>
                <h4 className={`text-lg font-bold ${theme.classes.textPrimary}`}>{evidence.finance.signalName}</h4>
              </div>

              <div className="text-right">
                <span className={`text-2xl font-black font-mono tabular-nums ${theme.classes.accentText} block`}>
                  {evidence.finance.currentMetric}
                </span>
                <span className={`text-xs ${theme.classes.textMuted} font-mono tabular-nums`}>
                  Trend: {evidence.finance.changeText}
                </span>
              </div>
            </div>

            <div className={`pt-4 text-xs ${theme.classes.textSecondary} leading-relaxed space-y-2`}>
              <p className="text-sm">{evidence.finance.explanation}</p>
              <p className={theme.classes.textMuted}>
                Note: In Indian wholesale distribution, major commodity adjustments on NCDEX or import tariffs usually filter into distributor invoices within 7–14 days.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Orchestrator Audit Log */}
      {activeTab === 'orchestrator' && (
        <div className="pt-4 space-y-4">
          <div className={`p-5 rounded-2xl ${theme.classes.cardBgAlt} ${theme.classes.cardBorder} border`}>
            <div className={`flex items-center justify-between text-xs ${theme.classes.textMuted} mb-4`}>
              <span className={`font-bold ${theme.classes.textPrimary} text-sm`}>SerpApi Budget & Cache Accounting</span>
              <span className={`font-mono tabular-nums ${isLight ? 'text-emerald-700' : 'text-emerald-400'} font-bold`}>
                {budget.isCached ? 'Cache Hit (0 Searches Consumed)' : `${budget.searchesUsed} Searches Consumed`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-5">
              <div className={`p-3 rounded-xl ${theme.classes.cardBg} border ${theme.classes.cardBorder}`}>
                <span className={`${theme.classes.textMuted} block text-[10px]`}>Google Shopping</span>
                <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary} text-sm`}>1 execution</span>
              </div>
              <div className={`p-3 rounded-xl ${theme.classes.cardBg} border ${theme.classes.cardBorder}`}>
                <span className={`${theme.classes.textMuted} block text-[10px]`}>Google Local</span>
                <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary} text-sm`}>1 execution</span>
              </div>
              <div className={`p-3 rounded-xl ${theme.classes.cardBg} border ${theme.classes.cardBorder}`}>
                <span className={`${theme.classes.textMuted} block text-[10px]`}>Google News</span>
                <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary} text-sm`}>1 execution</span>
              </div>
              <div className={`p-3 rounded-xl ${theme.classes.cardBg} border ${theme.classes.cardBorder}`}>
                <span className={`${theme.classes.textMuted} block text-[10px]`}>Google Finance</span>
                <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary} text-sm`}>1 execution</span>
              </div>
            </div>

            <div className={`space-y-2 text-xs font-mono tabular-nums ${theme.classes.textSecondary}`}>
              <div className={`flex justify-between py-1.5 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                <span className={theme.classes.textMuted}>Canonical Product:</span>
                <span className={`font-bold ${theme.classes.textPrimary}`}>{normalized.product} ({normalized.unit})</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                <span className={theme.classes.textMuted}>Target Geography:</span>
                <span className={`font-bold ${theme.classes.textPrimary}`}>{normalized.city}, India</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className={theme.classes.textMuted}>Remaining Free Budget:</span>
                <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{budget.remainingSearchBudget} searches left</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
