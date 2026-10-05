import React, { useState, useEffect } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { ProductInput } from '../types/market.js';
import { ThemeConfig } from '../types/theme.js';

interface MarketSearchFormProps {
  onAnalyze: (input: ProductInput) => void;
  isLoading: boolean;
  initialValues?: {
    product: string;
    city: string;
    sellingPrice: number;
    costPrice?: number;
  };
  theme: ThemeConfig;
}

const COMMON_CITIES = [
  'Jaipur', 'Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Ahmedabad',
  'Hyderabad', 'Pune', 'Lucknow', 'Indore', 'Surat', 'Chandigarh'
];

const CATEGORY_CHIPS = [
  { label: 'Oils & Ghee', emoji: '🛢️', sample: 'Fortune Mustard Oil 1L' },
  { label: 'Atta & Rice', emoji: '🌾', sample: 'India Gate Basmati Rice 5kg' },
  { label: 'Butter & Dairy', emoji: '🧈', sample: 'Amul Butter 500g' },
  { label: 'Tea & Coffee', emoji: '☕', sample: 'Tata Tea Gold 500g' },
  { label: 'Electronics', emoji: '🎧', sample: 'boAt Airdopes 141' },
];

export const MarketSearchForm: React.FC<MarketSearchFormProps> = ({
  onAnalyze,
  isLoading,
  initialValues,
  theme
}) => {
  const [product, setProduct] = useState(initialValues?.product || 'Fortune Mustard Oil 1L');
  const [city, setCity] = useState(initialValues?.city || 'Jaipur');
  const [sellingPrice, setSellingPrice] = useState<string>(
    initialValues?.sellingPrice ? String(initialValues.sellingPrice) : '175'
  );
  const [costPrice, setCostPrice] = useState<string>(
    initialValues?.costPrice ? String(initialValues.costPrice) : '132'
  );
  const [forceRefresh, setForceRefresh] = useState(false);
  const isLight = theme.id === 'kirana-light';

  useEffect(() => {
    if (initialValues) {
      setProduct(initialValues.product);
      setCity(initialValues.city);
      setSellingPrice(String(initialValues.sellingPrice));
      setCostPrice(initialValues.costPrice ? String(initialValues.costPrice) : '');
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) return;

    const sPrice = parseFloat(sellingPrice);
    if (isNaN(sPrice) || sPrice <= 0) return;

    const cPrice = costPrice.trim() ? parseFloat(costPrice) : undefined;

    onAnalyze({
      product: product.trim(),
      city: city.trim() || 'Jaipur',
      sellingPrice: sPrice,
      costPrice: cPrice && !isNaN(cPrice) ? cPrice : undefined,
      forceRefresh
    });
  };

  const handleCategoryClick = (sample: string) => {
    setProduct(sample);
  };

  return (
    <div className={`${theme.classes.cardBg} ${theme.classes.cardBorder} border rounded-3xl p-5 sm:p-6 mb-8 shadow-xs transition-colors`}>
      {/* Category Quick Fill Chips */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 text-xs">
        <span className={`${theme.classes.textMuted} text-[11px] font-bold shrink-0`}>
          Quick Category:
        </span>
        {CATEGORY_CHIPS.map(cat => (
          <button
            key={cat.label}
            type="button"
            onClick={() => handleCategoryClick(cat.sample)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              product.toLowerCase().includes(cat.sample.toLowerCase().split(' ')[0])
                ? `${theme.classes.accentBgSubtle} font-bold`
                : `${theme.classes.cardBgAlt} ${theme.classes.cardBorder} ${theme.classes.textSecondary} hover:border-current`
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Product Name */}
          <div className="lg:col-span-5">
            <label className={`block text-xs font-bold ${theme.classes.textSecondary} mb-1.5 flex items-center justify-between`}>
              <span>Product SKU & Pack Weight</span>
              <span className={`text-[11px] ${theme.classes.textMuted} font-normal`}>e.g. 1L pouch, 5kg bag, 500g</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={product}
                onChange={e => setProduct(e.target.value)}
                placeholder="e.g. Fortune Mustard Oil 1L, India Gate Basmati Rice 5kg"
                required
                className={`w-full ${theme.classes.inputBg} ${theme.classes.inputBorder} border rounded-xl px-3.5 py-2.5 text-sm ${theme.classes.textPrimary} placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-current transition-colors font-medium`}
              />
            </div>
          </div>

          {/* City / Mandi Geography */}
          <div className="lg:col-span-3">
            <label className={`block text-xs font-bold ${theme.classes.textSecondary} mb-1.5`}>
              Mandi Market / City
            </label>
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Jaipur, Delhi, Mumbai"
                list="popular-cities"
                required
                className={`w-full ${theme.classes.inputBg} ${theme.classes.inputBorder} border rounded-xl px-3.5 py-2.5 text-sm ${theme.classes.textPrimary} placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-current transition-colors font-medium`}
              />
              <datalist id="popular-cities">
                {COMMON_CITIES.map(c => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Selling Price */}
          <div className="lg:col-span-2">
            <label className={`block text-xs font-bold ${theme.classes.textSecondary} mb-1.5`}>
              Your Selling Price
            </label>
            <div className="relative">
              <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${theme.classes.textMuted} text-sm font-semibold`}>
                ₹
              </span>
              <input
                type="number"
                step="any"
                min="1"
                value={sellingPrice}
                onChange={e => setSellingPrice(e.target.value)}
                placeholder="175"
                required
                className={`w-full ${theme.classes.inputBg} ${theme.classes.inputBorder} border rounded-xl pl-8 pr-3 py-2.5 text-sm ${theme.classes.textPrimary} font-mono tabular-nums font-bold focus:outline-none focus:ring-2 focus:ring-current transition-colors`}
              />
            </div>
          </div>

          {/* Cost Price */}
          <div className="lg:col-span-2">
            <label className={`block text-xs font-bold ${theme.classes.textSecondary} mb-1.5 flex items-center justify-between`}>
              <span>Wholesale Cost</span>
              <span className={`text-[10px] ${theme.classes.textMuted}`}>Optional</span>
            </label>
            <div className="relative">
              <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${theme.classes.textMuted} text-sm font-semibold`}>
                ₹
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={costPrice}
                onChange={e => setCostPrice(e.target.value)}
                placeholder="132"
                className={`w-full ${theme.classes.inputBg} ${theme.classes.inputBorder} border rounded-xl pl-8 pr-3 py-2.5 text-sm ${theme.classes.textPrimary} font-mono tabular-nums font-semibold focus:outline-none focus:ring-2 focus:ring-current transition-colors`}
              />
            </div>
          </div>
        </div>

        {/* Action Button & Cache Check */}
        <div className={`mt-4 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/10'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={forceRefresh}
              onChange={e => setForceRefresh(e.target.checked)}
              className="w-4 h-4 rounded border-slate-400 bg-transparent text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span className={`text-xs ${theme.classes.textMuted}`}>
              Force fresh live lookup (bypasses 2-hr cache, uses 4 budget credits)
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl font-extrabold text-sm tracking-wide text-white ${theme.classes.accent} ${theme.classes.accentHover} active:scale-95 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Checking Prices & Mandis...</span>
              </>
            ) : (
              <>
                <span>ANALYZE MARKET POSITION</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
