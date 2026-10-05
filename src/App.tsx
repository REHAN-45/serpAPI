import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { DisclaimerBanner } from './components/DisclaimerBanner.js';
import { PresetSelector } from './components/PresetSelector.js';
import { MarketSearchForm } from './components/MarketSearchForm.js';
import { DecisionHeroCard } from './components/DecisionHeroCard.js';
import { MarketMetricsCard } from './components/MarketMetricsCard.js';
import { EvidenceTabs } from './components/EvidenceTabs.js';
import { SearchBudgetBar } from './components/SearchBudgetBar.js';
import { MarginCalculatorModal } from './components/MarginCalculatorModal.js';
import { AnalysisResult, ProductInput, BudgetStats } from './types/market.js';
import { AppTheme, THEMES } from './types/theme.js';
import { Calculator, Printer, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('zepto');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [isMarginModalOpen, setIsMarginModalOpen] = useState<boolean>(false);
  const [budget, setBudget] = useState<BudgetStats | null>(null);

  const themeConfig = THEMES[currentTheme];
  const isLight = currentTheme === 'kirana-light';

  const [formValues, setFormValues] = useState<{
    product: string;
    city: string;
    sellingPrice: number;
    costPrice?: number;
  }>({
    product: 'Fortune Mustard Oil 1L',
    city: 'Jaipur',
    sellingPrice: 175,
    costPrice: 132
  });

  // Initial load
  useEffect(() => {
    // 1. Fetch budget & health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.budget) {
          setBudget(data.budget);
        }
      })
      .catch(err => console.warn('Health check warning:', err));

    // 2. Perform initial analysis for Fortune Mustard Oil 1L (Jaipur)
    runAnalysis({
      product: 'Fortune Mustard Oil 1L',
      city: 'Jaipur',
      sellingPrice: 175,
      costPrice: 132
    });
  }, []);

  const runAnalysis = async (input: ProductInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      if (data.budget) {
        setBudget(data.budget);
      }
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Failed to complete analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetSelect = (
    product: string,
    city: string,
    sellingPrice: number,
    costPrice?: number
  ) => {
    setFormValues({ product, city, sellingPrice, costPrice });
    runAnalysis({
      product,
      city,
      sellingPrice,
      costPrice
    });
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen ${themeConfig.classes.appBg} ${themeConfig.classes.textPrimary} flex flex-col font-sans antialiased transition-colors duration-200`}>
      {/* Header with Theme Switcher */}
      <Header
        budget={budget}
        language={language}
        onLanguageChange={setLanguage}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        theme={themeConfig}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* Limitations Banner */}
      <DisclaimerBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Preset Selector */}
        <PresetSelector
          currentProduct={formValues.product}
          onSelect={handlePresetSelect}
          theme={themeConfig}
        />

        {/* Search Input Form */}
        <MarketSearchForm
          onAnalyze={runAnalysis}
          isLoading={isLoading}
          initialValues={formValues}
          theme={themeConfig}
        />

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => runAnalysis(formValues)}
              className="px-3 py-1 bg-rose-800 hover:bg-rose-700 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !result && (
          <div className={`py-16 text-center rounded-3xl ${themeConfig.classes.cardBg} ${themeConfig.classes.cardBorder} border`}>
            <Loader2 className={`w-8 h-8 ${themeConfig.classes.accentText} animate-spin mx-auto mb-3`} />
            <h3 className={`text-base font-bold ${themeConfig.classes.textPrimary} mb-1`}>
              Fusing Multi-Channel Market Signals...
            </h3>
            <p className={`text-xs ${themeConfig.classes.textMuted} max-w-md mx-auto`}>
              Querying Google Shopping, identifying local wholesale mandis in {formValues.city}, scanning supply news, and evaluating macroeconomic indices.
            </p>
          </div>
        )}

        {/* Active Analysis Dashboard */}
        {result && (
          <div className="space-y-6">
            {/* Quick Action Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-1 text-xs">
              <div className={themeConfig.classes.textMuted}>
                Evaluation for <strong className={themeConfig.classes.textPrimary}>{result.normalized.product}</strong> in{' '}
                <strong className={themeConfig.classes.accentText}>{result.normalized.city}</strong> ·{' '}
                {result.budget.isCached ? (
                  <span className={`${isLight ? 'text-emerald-700' : 'text-emerald-400'} font-bold`}>
                    ⚡ In-Memory Cache (0 search credits used)
                  </span>
                ) : (
                  <span className={themeConfig.classes.textSecondary}>Live Multi-Engine Search Run</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMarginModalOpen(true)}
                  className={`px-3 py-1.5 rounded-xl ${themeConfig.classes.cardBgAlt} ${themeConfig.classes.cardBorder} border ${themeConfig.classes.cardHoverBorder} text-xs font-bold ${themeConfig.classes.textPrimary} flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs`}
                >
                  <Calculator className={`w-3.5 h-3.5 ${themeConfig.classes.accentText}`} />
                  <span>Margin Simulator</span>
                </button>

                <button
                  onClick={handlePrintSummary}
                  className={`px-3 py-1.5 rounded-xl ${themeConfig.classes.cardBgAlt} ${themeConfig.classes.cardBorder} border ${themeConfig.classes.cardHoverBorder} text-xs font-bold ${themeConfig.classes.textPrimary} flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs`}
                  title="Print formal pricing memorandum"
                >
                  <Printer className={`w-3.5 h-3.5 ${themeConfig.classes.textMuted}`} />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* 1. Core Hero Decision Card */}
            <DecisionHeroCard result={result} language={language} theme={themeConfig} />

            {/* 2. Four Pillars Metrics Cards */}
            <MarketMetricsCard result={result} theme={themeConfig} />

            {/* 3. Detailed Evidence & Sources Tabs */}
            <EvidenceTabs result={result} theme={themeConfig} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t ${themeConfig.classes.cardBorder} ${isLight ? 'bg-slate-200/50' : 'bg-black/40'} py-6 text-xs ${themeConfig.classes.textMuted} mt-12 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${themeConfig.classes.textPrimary}`}>BharatPrice Pulse</span>
            <span>·</span>
            <span>Market Intelligence Copilot for Indian Retailers & Wholesalers</span>
          </div>
          <div>
            Current Theme: <strong className={themeConfig.classes.accentText}>{themeConfig.name}</strong> · Controlled SerpApi Engine
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SearchBudgetBar
        budget={budget}
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        theme={themeConfig}
      />

      {result && (
        <MarginCalculatorModal
          isOpen={isMarginModalOpen}
          onClose={() => setIsMarginModalOpen(false)}
          currentPrice={result.query.sellingPrice}
          currentCost={result.query.costPrice}
          marketMedian={result.stats.medianPrice}
          productName={result.normalized.product}
          theme={themeConfig}
        />
      )}
    </div>
  );
}
