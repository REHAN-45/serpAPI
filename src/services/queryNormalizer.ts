export interface NormalizedQuery {
  rawProduct: string;
  rawCity: string;
  normalizedProduct: string;
  normalizedCity: string;
  brand: string;
  unit: string;
  category: 'Edible Oil' | 'Staples & Grains' | 'Dairy & Fresh' | 'Packaged FMCG' | 'Electronics' | 'Beverages' | 'Personal Care' | 'General';
  queries: {
    shopping: string;
    local: string;
    news: string;
    finance: string;
  };
}

const COMMON_BRANDS = [
  'Fortune', 'Dhara', 'Saffola', 'Gemini', 'Emami', 'Patanjali',
  'Tata', 'Aashirvaad', 'India Gate', 'Daawat', 'Kohinoor',
  'Amul', 'Mother Dairy', 'Nestle', 'Britannia', 'Parle',
  'Boat', 'Noise', 'Realme', 'Xiaomi', 'OnePlus', 'Samsung',
  'Surf Excel', 'Ariel', 'Colgate', 'Dettol', 'Lifebuoy',
  'Taj Mahal', 'Wagh Bakri', 'Red Label', 'Brooke Bond'
];

export function normalizeQuery(productInput: string, cityInput: string): NormalizedQuery {
  const cleanProduct = productInput.trim();
  const cleanCity = cityInput.trim() || 'India';

  // Detect Unit
  const unitRegex = /(\d+(?:\.\d+)?\s*(?:l|litre|litres|ltr|kg|kgs|kilo|gram|gm|g|ml|pack|pcs|piece|pieces))\b/i;
  const unitMatch = cleanProduct.match(unitRegex);
  let unit = unitMatch ? unitMatch[0].toLowerCase().replace(/\s+/g, '') : '';
  if (unit.endsWith('litre') || unit.endsWith('litres') || unit.endsWith('ltr')) {
    unit = unit.replace(/(litre|litres|ltr)/, 'L');
  }

  // Detect Brand
  let brand = '';
  for (const b of COMMON_BRANDS) {
    if (new RegExp(`\\b${b}\\b`, 'i').test(cleanProduct)) {
      brand = b;
      break;
    }
  }

  // Detect Category
  let category: NormalizedQuery['category'] = 'General';
  const lower = cleanProduct.toLowerCase();
  if (/oil|mustard|refined|sunflower|groundnut|soyabean|tel/i.test(lower)) {
    category = 'Edible Oil';
  } else if (/rice|atta|wheat|dal|chana|besan|flour|sugar|grain|staple/i.test(lower)) {
    category = 'Staples & Grains';
  } else if (/butter|milk|paneer|curd|cheese|ghee|dahi/i.test(lower)) {
    category = 'Dairy & Fresh';
  } else if (/tea|chai|coffee|juice|water|cold drink|beverage/i.test(lower)) {
    category = 'Beverages';
  } else if (/airdopes|earbuds|phone|cable|charger|headphones|battery|electronic/i.test(lower)) {
    category = 'Electronics';
  } else if (/soap|shampoo|toothpaste|detergent|wash|cleaner/i.test(lower)) {
    category = 'Personal Care';
  } else if (/biscuit|maggie|noodles|snack|namkeen|chips|chocolate/i.test(lower)) {
    category = 'Packaged FMCG';
  }

  // Canonical queries for SerpApi engines
  const shoppingQuery = `${cleanProduct} buy online price India`;
  const localCategoryTerm = category === 'Edible Oil' ? 'edible oil wholesale distributor mandi'
    : category === 'Staples & Grains' ? 'grain grain mandi wholesale merchant distributor'
    : category === 'Electronics' ? 'electronics wholesale market distributor'
    : category === 'Dairy & Fresh' ? 'dairy distributor wholesale cold storage'
    : category === 'Beverages' ? 'tea wholesale merchant distributor'
    : `${cleanProduct} wholesale distributor trader`;

  const localQuery = `${localCategoryTerm} in ${cleanCity}`;
  const newsQuery = `${category === 'General' ? cleanProduct : category} price supply trend India`;
  const financeQuery = category === 'Edible Oil' ? 'Mustard seed edible oil NCDEX USD INR'
    : category === 'Electronics' ? 'USD INR exchange rate electronics import duty India'
    : category === 'Staples & Grains' ? 'India food inflation CPI wheat paddy MSP price'
    : 'India CPI retail inflation FMCG commodity price';

  return {
    rawProduct: cleanProduct,
    rawCity: cleanCity,
    normalizedProduct: cleanProduct.replace(/\s+/g, ' '),
    normalizedCity: cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1).toLowerCase(),
    brand: brand || 'Generic / Local',
    unit: unit || 'Standard',
    category,
    queries: {
      shopping: shoppingQuery,
      local: localQuery,
      news: newsQuery,
      finance: financeQuery
    }
  };
}
