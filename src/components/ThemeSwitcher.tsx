import React from 'react';
import { AppTheme, THEMES } from '../types/theme.js';
import { Zap, ShoppingBag, TrendingUp, Sun } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const isLight = currentTheme === 'kirana-light';

  const getIcon = (id: AppTheme) => {
    switch (id) {
      case 'zepto':
        return <Zap className="w-3.5 h-3.5 text-[#ff3269]" />;
      case 'amazon':
        return <ShoppingBag className="w-3.5 h-3.5 text-[#ff9900]" />;
      case 'flipkart':
        return <TrendingUp className="w-3.5 h-3.5 text-[#ffe11b]" />;
      case 'kirana-light':
        return <Sun className="w-3.5 h-3.5 text-[#047857]" />;
    }
  };

  return (
    <div className={`flex items-center gap-1.5 p-1 rounded-xl ${isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-black/30 border-white/10'} border text-xs overflow-x-auto`}>
      <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'} px-2 hidden lg:inline`}>
        Theme:
      </span>
      {(Object.keys(THEMES) as AppTheme[]).map(key => {
        const theme = THEMES[key];
        const isActive = currentTheme === key;

        return (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? `${theme.classes.headerPillActive} shadow-xs scale-100`
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title={theme.tagline}
          >
            {getIcon(key)}
            <span>{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
};
