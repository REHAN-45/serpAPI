import React from 'react';
import { TrendingUp, ShoppingBag, Zap, Sun } from 'lucide-react';
import { BudgetStats } from '../types/market.js';
import { AppTheme, ThemeConfig } from '../types/theme.js';
import { ThemeSwitcher } from './ThemeSwitcher.js';

interface HeaderProps {
  budget?: BudgetStats | null;
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
  onOpenBudgetModal?: () => void;
  theme: ThemeConfig;
  currentTheme: AppTheme;
  onThemeChange: (t: AppTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  budget,
  language,
  onLanguageChange,
  onOpenBudgetModal,
  theme,
  currentTheme,
  onThemeChange
}) => {
  const remaining = budget ? budget.remainingSearchBudget : 88;
  const isLight = currentTheme === 'kirana-light';

  const getBrandIcon = () => {
    switch (currentTheme) {
      case 'zepto':
        return <Zap className="w-5 h-5 text-[#ff3269]" />;
      case 'amazon':
        return <ShoppingBag className="w-5 h-5 text-[#ff9900]" />;
      case 'flipkart':
        return <TrendingUp className="w-5 h-5 text-[#ffe11b]" />;
      case 'kirana-light':
        return <Sun className="w-5 h-5 text-[#047857]" />;
    }
  };

  return (
    <header className={`border-b ${theme.classes.cardBorder} ${theme.classes.headerBg} backdrop-blur-md sticky top-0 z-40 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Commercial Tag */}
        <div className="flex items-center gap-3 shrink-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${theme.classes.cardBorder} ${isLight ? 'bg-slate-100' : 'bg-black/30'} shadow-xs`}>
            {getBrandIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-black text-lg tracking-tight ${theme.classes.textPrimary}`}>
                BharatPrice <span className={theme.classes.accentText}>Pulse</span>
              </span>
              <span className={`text-xs ${theme.classes.textMuted} font-normal hidden sm:inline`}>/</span>
              <span className={`text-xs font-bold hidden sm:inline ${theme.classes.accentText}`}>
                {theme.brandSubtitle}
              </span>
            </div>
            <p className={`text-[11px] ${theme.classes.textMuted} hidden md:block`}>
              {theme.tagline}
            </p>
          </div>
        </div>

        {/* Center Theme Switcher */}
        <div className="hidden md:flex items-center justify-center">
          <ThemeSwitcher currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile Theme trigger */}
          <div className="md:hidden">
            <ThemeSwitcher currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </div>

          {/* Search Quota Counter */}
          <button
            onClick={onOpenBudgetModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${theme.classes.cardBorder} ${theme.classes.cardBgAlt} hover:border-current text-xs transition-colors cursor-pointer`}
            title="Controlled search quota monitor"
          >
            <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
            <span className={`${theme.classes.textMuted} hidden sm:inline font-medium`}>Quota:</span>
            <span className={`font-mono tabular-nums font-bold ${theme.classes.textPrimary}`}>{remaining}</span>
          </button>

          {/* Language Switch */}
          <div className={`flex items-center rounded-lg border ${theme.classes.cardBorder} ${theme.classes.cardBgAlt} p-0.5 text-xs`}>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 font-bold rounded-md transition-colors cursor-pointer ${
                language === 'en'
                  ? `${theme.classes.headerPillActive} shadow-xs`
                  : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 font-bold rounded-md transition-colors cursor-pointer ${
                language === 'hi'
                  ? `${theme.classes.headerPillActive} shadow-xs`
                  : `${theme.classes.textMuted} hover:${theme.classes.textPrimary}`
              }`}
            >
              हिं
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
