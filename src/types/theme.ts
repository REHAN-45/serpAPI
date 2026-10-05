export type AppTheme = 'zepto' | 'amazon' | 'flipkart' | 'kirana-light';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  brandSubtitle: string;
  tagline: string;
  iconName: string;
  classes: {
    appBg: string;
    headerBg: string;
    bannerBg: string;
    cardBg: string;
    cardBgAlt: string;
    cardBorder: string;
    cardHoverBorder: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    accentText: string;
    accentBgSubtle: string;
    accentBorder: string;
    tagBorder: string;
    inputBg: string;
    inputBorder: string;
    meterTrack: string;
    meterFill: string;
    headerPillActive: string;
  };
}

export const THEMES: Record<AppTheme, ThemeConfig> = {
  zepto: {
    id: 'zepto',
    name: 'Zepto Grocery',
    brandSubtitle: 'Quick Commerce Pulse',
    tagline: '10-Min Delivery & Kirana Intelligence',
    iconName: 'Zap',
    classes: {
      appBg: 'bg-[#0d0e14]',
      headerBg: 'bg-[#12141c]/95',
      bannerBg: 'bg-[#181a24]/80 border-[#262a3b]',
      cardBg: 'bg-[#151722]/90',
      cardBgAlt: 'bg-[#0e1017]',
      cardBorder: 'border-[#242938]',
      cardHoverBorder: 'hover:border-[#ff3269]',
      textPrimary: 'text-white',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-400',
      accent: 'bg-gradient-to-r from-[#ff3269] to-[#e11d48]',
      accentHover: 'hover:from-[#ff4d7d] hover:to-[#f43f5e]',
      accentText: 'text-[#ff3269]',
      accentBgSubtle: 'bg-[#ff3269]/15 text-[#ff3269] border border-[#ff3269]/30',
      accentBorder: 'border-[#ff3269]',
      tagBorder: 'border-[#3a202c]',
      inputBg: 'bg-[#0e1017]',
      inputBorder: 'border-[#242938]',
      meterTrack: 'bg-[#1e2230]',
      meterFill: 'bg-[#ff3269]',
      headerPillActive: 'bg-[#ff3269] text-white font-bold'
    }
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon Retail',
    brandSubtitle: 'Marketplace Intelligence',
    tagline: 'Amazon Seller Central Benchmark',
    iconName: 'ShoppingBag',
    classes: {
      appBg: 'bg-[#0f1111]',
      headerBg: 'bg-[#131921]/95',
      bannerBg: 'bg-[#1b222d]/80 border-[#2b384a]',
      cardBg: 'bg-[#19222d]/90',
      cardBgAlt: 'bg-[#11171f]',
      cardBorder: 'border-[#29374a]',
      cardHoverBorder: 'hover:border-[#febd69]',
      textPrimary: 'text-white',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-400',
      accent: 'bg-gradient-to-r from-[#ff9900] to-[#febd69]',
      accentHover: 'hover:from-[#f08804] hover:to-[#ffa41c]',
      accentText: 'text-[#ff9900]',
      accentBgSubtle: 'bg-[#febd69]/15 text-[#febd69] border border-[#febd69]/30',
      accentBorder: 'border-[#ff9900]',
      tagBorder: 'border-[#37475a]',
      inputBg: 'bg-[#11171f]',
      inputBorder: 'border-[#37475a]',
      meterTrack: 'bg-[#1b222d]',
      meterFill: 'bg-[#febd69]',
      headerPillActive: 'bg-[#ff9900] text-slate-950 font-bold'
    }
  },
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart B2B',
    brandSubtitle: 'Kirana & Supermart',
    tagline: 'Wholesale & Retail Margin Matrix',
    iconName: 'TrendingUp',
    classes: {
      appBg: 'bg-[#071328]',
      headerBg: 'bg-[#0c1e3d]/95',
      bannerBg: 'bg-[#0f254c]/80 border-[#1c3e7b]',
      cardBg: 'bg-[#0d2044]/90',
      cardBgAlt: 'bg-[#07142b]',
      cardBorder: 'border-[#17376e]',
      cardHoverBorder: 'hover:border-[#ffe11b]',
      textPrimary: 'text-white',
      textSecondary: 'text-blue-100',
      textMuted: 'text-blue-300',
      accent: 'bg-gradient-to-r from-[#2874f0] to-[#1258d4]',
      accentHover: 'hover:from-[#3880ff] hover:to-[#1b63e8]',
      accentText: 'text-[#ffe11b]',
      accentBgSubtle: 'bg-[#ffe11b]/15 text-[#ffe11b] border border-[#ffe11b]/30',
      accentBorder: 'border-[#2874f0]',
      tagBorder: 'border-[#1e4588]',
      inputBg: 'bg-[#07142b]',
      inputBorder: 'border-[#1f4990]',
      meterTrack: 'bg-[#0f2650]',
      meterFill: 'bg-gradient-to-r from-[#2874f0] to-[#ffe11b]',
      headerPillActive: 'bg-[#2874f0] text-white font-bold'
    }
  },
  'kirana-light': {
    id: 'kirana-light',
    name: 'Kirana Day Mode',
    brandSubtitle: 'Shop Counter Display',
    tagline: 'High-Contrast Sunlight Interface',
    iconName: 'Sun',
    classes: {
      appBg: 'bg-[#f1f5f9]',
      headerBg: 'bg-white/95',
      bannerBg: 'bg-emerald-50 border-emerald-200',
      cardBg: 'bg-white',
      cardBgAlt: 'bg-slate-50',
      cardBorder: 'border-slate-300',
      cardHoverBorder: 'hover:border-emerald-600',
      textPrimary: 'text-slate-900',
      textSecondary: 'text-slate-700',
      textMuted: 'text-slate-500',
      accent: 'bg-gradient-to-r from-[#059669] to-[#047857]',
      accentHover: 'hover:from-[#10b981] hover:to-[#059669]',
      accentText: 'text-[#047857]',
      accentBgSubtle: 'bg-emerald-100 text-[#047857] border border-emerald-300',
      accentBorder: 'border-[#047857]',
      tagBorder: 'border-slate-300',
      inputBg: 'bg-white',
      inputBorder: 'border-slate-300',
      meterTrack: 'bg-slate-200',
      meterFill: 'bg-[#047857]',
      headerPillActive: 'bg-emerald-700 text-white font-bold'
    }
  }
};
