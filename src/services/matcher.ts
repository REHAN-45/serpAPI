import { CompetitorItem } from '../types/market.js';

export function matchAndFilterProducts(
  items: CompetitorItem[],
  targetUnit: string,
  userPrice: number
): CompetitorItem[] {
  if (!items || items.length === 0) return [];

  return items.filter(item => {
    // 1. Extreme price outlier filter (if userPrice is provided)
    if (userPrice > 0) {
      if (item.price > userPrice * 2.8) return false; // Likely bulk pack (e.g. 5L instead of 1L)
      if (item.price < userPrice * 0.35) return false; // Likely small sachet/mini pack (e.g. 200ml instead of 1L)
    }

    // 2. Unit mismatch check if user specified specific unit
    if (targetUnit) {
      const lowerTitle = item.title.toLowerCase();
      // If user wants 1L, reject if title explicitly says 5L or 15L or 200ml
      if (/1\s*l|1\s*litre/i.test(targetUnit)) {
        if (/\b5\s*l|\b15\s*l|\b200\s*ml|\b500\s*ml/i.test(lowerTitle)) return false;
      } else if (/500\s*g/i.test(targetUnit)) {
        if (/\b1\s*kg|\b5\s*kg|\b100\s*g/i.test(lowerTitle)) return false;
      } else if (/5\s*kg/i.test(targetUnit)) {
        if (/\b1\s*kg|\b25\s*kg|\b500\s*g/i.test(lowerTitle)) return false;
      }
    }

    return true;
  });
}
