import { CompetitorItem, LocalBusiness, NewsItem, FinanceSignal } from '../types/market.js';

export interface BenchmarkProduct {
  id: string;
  name: string;
  category: string;
  categoryEmoji: string;
  brandName: string;
  defaultCity: string;
  defaultSellingPrice: number;
  defaultCostPrice: number;
  mrp: number;
  description: string;
  evidence: {
    shopping: CompetitorItem[];
    local: LocalBusiness[];
    news: NewsItem[];
    finance: FinanceSignal;
  };
}

export const INDIAN_MARKET_BENCHMARKS: BenchmarkProduct[] = [
  {
    id: 'fortune-mustard-oil-1l',
    name: 'Fortune Mustard Oil 1L',
    category: 'Edible Oils & Ghee',
    categoryEmoji: '🛢️',
    brandName: 'Fortune / Adani Wilmar',
    defaultCity: 'Jaipur',
    defaultSellingPrice: 175,
    defaultCostPrice: 132,
    mrp: 185,
    description: 'Cold-pressed kachi ghani pure mustard oil pouch in Rajasthan',
    evidence: {
      shopping: [
        {
          id: 'sp-1',
          title: 'Fortune Kachi Ghani Pure Mustard Oil Pouch, 1 L',
          price: 152,
          originalPrice: 180,
          merchant: 'Blinkit Jaipur',
          link: 'https://blinkit.com',
          rating: 4.6,
          reviewsCount: 1820,
          deliveryInfo: '10 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-2',
          title: 'Fortune Mustard Oil (Kachi Ghani) 1 Litre Pouch',
          price: 155,
          originalPrice: 178,
          merchant: 'Zepto',
          link: 'https://zepto.com',
          rating: 4.5,
          reviewsCount: 940,
          deliveryInfo: '10 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-3',
          title: 'Fortune Mustard Oil, 1L Poly Pack',
          price: 158,
          originalPrice: 175,
          merchant: 'JioMart Jaipur',
          link: 'https://jiomart.com',
          rating: 4.4,
          reviewsCount: 310,
          deliveryInfo: 'Same day delivery',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-4',
          title: 'Fortune Kachi Ghani Mustard Oil 1L Pouch Pack',
          price: 158,
          originalPrice: 175,
          merchant: 'DMart Ready',
          link: 'https://dmart.in',
          rating: 4.7,
          reviewsCount: 520,
          deliveryInfo: 'Scheduled pickup / delivery',
          badge: 'Hypermarket'
        },
        {
          id: 'sp-5',
          title: 'Fortune Premium Kachi Ghani Pure Mustard Oil, 1L',
          price: 162,
          originalPrice: 180,
          merchant: 'Swiggy Instamart',
          link: 'https://swiggy.com',
          rating: 4.6,
          reviewsCount: 650,
          deliveryInfo: '12 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-6',
          title: 'Fortune Kachi Ghani Pure Mustard Oil 1 Litre',
          price: 165,
          originalPrice: 185,
          merchant: 'Amazon.in',
          link: 'https://amazon.in',
          rating: 4.4,
          reviewsCount: 4120,
          deliveryInfo: 'Prime next day',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-7',
          title: 'Fortune Mustard Oil 1L Pouch',
          price: 172,
          originalPrice: 180,
          merchant: 'BigBasket Jaipur',
          link: 'https://bigbasket.com',
          rating: 4.5,
          reviewsCount: 890,
          deliveryInfo: 'Morning delivery slot',
          badge: 'E-Commerce'
        }
      ],
      local: [
        {
          id: 'lb-1',
          name: 'Muhana Mandi Krishi Upaj Vyapar Sangh',
          type: 'Mandi',
          address: 'Muhana Terminal Mandi, Sanganer, Jaipur, Rajasthan 302029',
          distanceEstimate: '8.5 km',
          rating: 4.4,
          reviewsCount: 380,
          phone: '+91 141 228 4110',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-2',
          name: 'Rajasthan Edible Oil Agencies (Adani Wilmar C&F)',
          type: 'Distributor',
          address: 'Chandpole Bazar, Old City, Jaipur, Rajasthan 302001',
          distanceEstimate: '3.2 km',
          rating: 4.5,
          reviewsCount: 48,
          phone: '+91 98290 14820',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-3',
          name: 'Shree Karni Kirana & Oil Thok Vyapari',
          type: 'Wholesaler',
          address: 'Surajpole Mandi, Transport Nagar, Jaipur, Rajasthan 302003',
          distanceEstimate: '5.1 km',
          rating: 4.2,
          reviewsCount: 64,
          phone: '+91 94140 77312',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-4',
          name: 'Jaipur Grain & Oil Merchants Association',
          type: 'Trader',
          address: 'Johari Bazar / Ghat Gate Road, Jaipur 302003',
          distanceEstimate: '4.0 km',
          rating: 4.3,
          reviewsCount: 35,
          phone: '+91 141 256 0914',
          verifiedSourcingLead: true
        }
      ],
      news: [
        {
          id: 'nw-1',
          title: 'Rajasthan Mustard Crop Arrivals Pick Up in Kota & Jaipur Mandis',
          source: 'Krishi Jagran',
          snippet: 'Bumper mustard sowing across Alwar, Bharatpur and Tonk districts maintains steady crushing operations across oil mills with stable wholesale rates.',
          date: '3 days ago',
          sentiment: 'Bearish',
          link: '#'
        },
        {
          id: 'nw-2',
          title: 'Govt monitors edible oil retail prices ahead of festive restocking',
          source: 'Economic Times',
          snippet: 'Food Ministry reviews edible oil stocks and warns against unfair retail margins as imported crude edible oil tariffs remain unaltered.',
          date: '5 days ago',
          sentiment: 'Policy/GST',
          link: '#'
        },
        {
          id: 'nw-3',
          title: 'Edible oil sales surge 18% on quick commerce platforms in Tier-2 cities',
          source: 'LiveMint',
          snippet: 'Consumers in Jaipur, Lucknow, and Indore increasingly purchase staple oil pouches online during weekend discount promotions.',
          date: '1 week ago',
          sentiment: 'Neutral',
          link: '#'
        }
      ],
      finance: {
        signalName: 'Mustard Seed NCDEX & Domestic Wholesale Index',
        currentMetric: '₹5,410 / Quintal',
        changeText: '-0.8% this week',
        category: 'Commodity',
        impact: 'Neutral',
        explanation: 'Steady mandi arrivals cap upside risk on crude oil prices. Supply risk is Low; wholesale margins are predictable.'
      }
    }
  },
  {
    id: 'india-gate-basmati-rice-5kg',
    name: 'India Gate Basmati Rice Feast Rozzana 5kg',
    category: 'Grains & Pulses',
    categoryEmoji: '🌾',
    brandName: 'India Gate / KRBL',
    defaultCity: 'Delhi',
    defaultSellingPrice: 460,
    defaultCostPrice: 380,
    mrp: 525,
    description: 'High-volume long grain Basmati rice package in NCR',
    evidence: {
      shopping: [
        {
          id: 'sp-b1',
          title: 'India Gate Basmati Rice Feast Rozzana, 5 kg Bag',
          price: 419,
          originalPrice: 520,
          merchant: 'Blinkit Delhi NCR',
          link: 'https://blinkit.com',
          rating: 4.6,
          reviewsCount: 3120,
          deliveryInfo: '10 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-b2',
          title: 'India Gate Feast Rozzana Basmati Rice 5kg',
          price: 425,
          originalPrice: 510,
          merchant: 'DMart Ready Delhi',
          link: 'https://dmart.in',
          rating: 4.7,
          reviewsCount: 1450,
          deliveryInfo: 'Next day slot',
          badge: 'Hypermarket'
        },
        {
          id: 'sp-b3',
          title: 'India Gate Basmati Rice Rozzana 5 kg Pack',
          price: 435,
          originalPrice: 515,
          merchant: 'Zepto',
          link: 'https://zepto.com',
          rating: 4.5,
          reviewsCount: 880,
          deliveryInfo: '8 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-b4',
          title: 'India Gate Basmati Rice 5kg Pouch',
          price: 440,
          originalPrice: 525,
          merchant: 'Amazon.in',
          link: 'https://amazon.in',
          rating: 4.5,
          reviewsCount: 8900,
          deliveryInfo: 'Free Prime delivery',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-b5',
          title: 'India Gate Rozzana Basmati 5kg Bag',
          price: 448,
          originalPrice: 520,
          merchant: 'JioMart',
          link: 'https://jiomart.com',
          rating: 4.4,
          reviewsCount: 610,
          deliveryInfo: 'Standard 24-hr delivery',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-b6',
          title: 'India Gate Basmati Rice 5kg',
          price: 465,
          originalPrice: 530,
          merchant: 'Local Modern Bazaar',
          link: '#',
          rating: 4.3,
          reviewsCount: 120,
          deliveryInfo: 'Store walk-in',
          badge: 'Supermarket'
        }
      ],
      local: [
        {
          id: 'lb-b1',
          name: 'Naya Bazar Grain & Rice Merchants Association',
          type: 'Mandi',
          address: 'Naya Bazar, Chandni Chowk, Delhi 110006',
          distanceEstimate: '6.2 km',
          rating: 4.6,
          reviewsCount: 620,
          phone: '+91 11 2395 1820',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-b2',
          name: 'Delhi Foodgrains & Rice Wholesale Traders Co',
          type: 'Wholesaler',
          address: 'Khari Baoli / Fatehpuri, Old Delhi 110006',
          distanceEstimate: '5.8 km',
          rating: 4.5,
          reviewsCount: 410,
          phone: '+91 11 2397 4510',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-b3',
          name: 'KRBL Authorized Rice Depot & Distributor',
          type: 'Distributor',
          address: 'Lawrence Road Industrial Area, Delhi 110035',
          distanceEstimate: '9.4 km',
          rating: 4.4,
          reviewsCount: 85,
          phone: '+91 98110 33412',
          verifiedSourcingLead: true
        }
      ],
      news: [
        {
          id: 'nw-b1',
          title: 'Basmati Minimum Export Price (MEP) removal spurs domestic mill procurement',
          source: 'Financial Express',
          snippet: 'Exporters actively bidding in Haryana and Punjab mandis. Domestic retail supply remains adequate but wholesale procurement costs have firmed up slightly.',
          date: '4 days ago',
          sentiment: 'Bullish',
          link: '#'
        },
        {
          id: 'nw-b2',
          title: 'Delhi Wholesale Foodgrain trade remains firm on festive catering demand',
          source: 'Millennium Post',
          snippet: 'Wholesale traders in Naya Bazar report robust orders from North Indian caterers and local grocery shops.',
          date: '6 days ago',
          sentiment: 'Neutral',
          link: '#'
        }
      ],
      finance: {
        signalName: 'All-India Cereals & Pulses CPI Index',
        currentMetric: '148.6 pts',
        changeText: '+1.1% MoM',
        category: 'Inflation',
        impact: 'Bullish',
        explanation: 'Paddy MSP revision and export volumes exert mild upward pressure on premium long-grain varieties.'
      }
    }
  },
  {
    id: 'amul-butter-500g',
    name: 'Amul Pasteurised Butter 500g',
    category: 'Dairy & Fresh',
    categoryEmoji: '🧈',
    brandName: 'Amul GCMMF',
    defaultCity: 'Ahmedabad',
    defaultSellingPrice: 285,
    defaultCostPrice: 262,
    mrp: 285,
    description: 'Everyday household dairy staple with regulated retail margin',
    evidence: {
      shopping: [
        {
          id: 'sp-a1',
          title: 'Amul Butter - Pasteurised, 500 g Carton',
          price: 275,
          originalPrice: 285,
          merchant: 'Blinkit Ahmedabad',
          link: 'https://blinkit.com',
          rating: 4.8,
          reviewsCount: 15400,
          deliveryInfo: '8 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-a2',
          title: 'Amul Butter 500g Pack',
          price: 275,
          originalPrice: 285,
          merchant: 'Zepto',
          link: 'https://zepto.com',
          rating: 4.8,
          reviewsCount: 9200,
          deliveryInfo: '8 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-a3',
          title: 'Amul Pasteurised Butter 500 g',
          price: 275,
          originalPrice: 285,
          merchant: 'JioMart Ahmedabad',
          link: 'https://jiomart.com',
          rating: 4.7,
          reviewsCount: 3400,
          deliveryInfo: 'Scheduled delivery',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-a4',
          title: 'Amul Butter 500g Brick',
          price: 275,
          originalPrice: 285,
          merchant: 'DMart Ready Ahmedabad',
          link: 'https://dmart.in',
          rating: 4.8,
          reviewsCount: 4100,
          deliveryInfo: 'Store pick / delivery',
          badge: 'Hypermarket'
        }
      ],
      local: [
        {
          id: 'lb-a1',
          name: 'Amul Federation (GCMMF) Central Distribution Depot',
          type: 'Distributor',
          address: 'Amul Dairy Road, Anand / Sarkhej Highway, Ahmedabad 382210',
          distanceEstimate: '6.5 km',
          rating: 4.8,
          reviewsCount: 890,
          phone: '+91 79 2658 5430',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-a2',
          name: 'Madhav Cold Storage & Dairy Wholesalers',
          type: 'Wholesaler',
          address: 'Kalupur Market, Ahmedabad, Gujarat 380001',
          distanceEstimate: '4.1 km',
          rating: 4.4,
          reviewsCount: 180,
          phone: '+91 79 2213 9045',
          verifiedSourcingLead: true
        }
      ],
      news: [
        {
          id: 'nw-a1',
          title: 'Amul assures steady milk procurement and butter availability across western India',
          source: 'DeshGujarat',
          snippet: 'GCMMF confirms winter flush season supplies are normal; no retail price hikes planned for butter and cheese.',
          date: '1 day ago',
          sentiment: 'Neutral',
          link: '#'
        }
      ],
      finance: {
        signalName: 'Gujarat Cooperative Milk Procurement Price',
        currentMetric: '₹840 / kg fat',
        changeText: 'Stable',
        category: 'Commodity',
        impact: 'Neutral',
        explanation: 'Strict MRP discipline maintained by federation. Selling above ₹275 MRP can trigger customer resistance.'
      }
    }
  },
  {
    id: 'tata-tea-gold-500g',
    name: 'Tata Tea Gold 500g Pack',
    category: 'Tea & Coffee',
    categoryEmoji: '☕',
    brandName: 'Tata Consumer Products',
    defaultCity: 'Kolkata',
    defaultSellingPrice: 345,
    defaultCostPrice: 285,
    mrp: 380,
    description: 'High-demand premium Assam CTC and orthodox blend tea in Bengal',
    evidence: {
      shopping: [
        {
          id: 'sp-t1',
          title: 'Tata Tea Gold Leaf Tea, 500g Pouch',
          price: 315,
          originalPrice: 380,
          merchant: 'Blinkit Kolkata',
          link: 'https://blinkit.com',
          rating: 4.7,
          reviewsCount: 2450,
          deliveryInfo: '10 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-t2',
          title: 'Tata Tea Gold Assam Orthodox Long Leaf, 500g',
          price: 320,
          originalPrice: 380,
          merchant: 'Spencer’s Retail Kolkata',
          link: 'https://spencers.in',
          rating: 4.6,
          reviewsCount: 420,
          deliveryInfo: 'Same-day 2-hr slot',
          badge: 'Supermarket'
        },
        {
          id: 'sp-t3',
          title: 'Tata Tea Gold 500 g Pack',
          price: 325,
          originalPrice: 375,
          merchant: 'Zepto',
          link: 'https://zepto.com',
          rating: 4.6,
          reviewsCount: 780,
          deliveryInfo: '10 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-t4',
          title: 'Tata Tea Gold, 500g Pouch',
          price: 330,
          originalPrice: 375,
          merchant: 'JioMart Kolkata',
          link: 'https://jiomart.com',
          rating: 4.5,
          reviewsCount: 310,
          deliveryInfo: 'Next day delivery',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-t5',
          title: 'Tata Tea Gold Blend Tea 500g',
          price: 340,
          originalPrice: 380,
          merchant: 'Amazon.in',
          link: 'https://amazon.in',
          rating: 4.6,
          reviewsCount: 5400,
          deliveryInfo: 'Free delivery with Prime',
          badge: 'E-Commerce'
        }
      ],
      local: [
        {
          id: 'lb-t1',
          name: 'Posta Bazar Wholesale Grocery & Tea Traders',
          type: 'Wholesaler',
          address: 'Posta, Burrabazar, Kolkata, West Bengal 700007',
          distanceEstimate: '3.4 km',
          rating: 4.5,
          reviewsCount: 512,
          phone: '+91 33 2259 8412',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-t2',
          name: 'Kolkata Tea Auction Center & Broking Houses',
          type: 'Mandi',
          address: 'Brabourne Road, BBD Bagh, Kolkata 700001',
          distanceEstimate: '4.2 km',
          rating: 4.7,
          reviewsCount: 290,
          phone: '+91 33 2220 5410',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-t3',
          name: 'Tata Consumer Products C&F Bengal Hub',
          type: 'Distributor',
          address: 'Taratala Industrial Area, Kolkata 700088',
          distanceEstimate: '9.8 km',
          rating: 4.3,
          reviewsCount: 74,
          phone: '+91 33 2401 9840',
          verifiedSourcingLead: true
        }
      ],
      news: [
        {
          id: 'nw-t1',
          title: 'Assam tea production contracts 6% on erratic weather; premium CTC bids rise',
          source: 'Telegraph India',
          snippet: 'Secondary auction prices for quality orthodox grades remain firm; blending brands like Tata Tea and Wagh Bakri face higher raw tea costs.',
          date: '2 days ago',
          sentiment: 'Bullish',
          link: '#'
        },
        {
          id: 'nw-t2',
          title: 'Bengal tea wholesalers expect robust festive demand through Durga Puja',
          source: 'Anandabazar Patrika',
          snippet: 'Burrabazar tea merchants report strong pre-Puja bulk orders from neighborhood grocers and sweetmakers.',
          date: '5 days ago',
          sentiment: 'Neutral',
          link: '#'
        }
      ],
      finance: {
        signalName: 'Tea Board India Auction Price Index (Assam CTC)',
        currentMetric: '₹228 / kg wholesale bulk',
        changeText: '+3.4% MoM',
        category: 'Commodity',
        impact: 'Bullish',
        explanation: 'Higher auction clearing prices protect branded retail pricing; zero room for downward price slashing by FMCG brands.'
      }
    }
  },
  {
    id: 'boat-airdopes-141',
    name: 'boAt Airdopes 141 Earbuds',
    category: 'Consumer Electronics',
    categoryEmoji: '🎧',
    brandName: 'boAt Audio',
    defaultCity: 'Mumbai',
    defaultSellingPrice: 1299,
    defaultCostPrice: 940,
    mrp: 4490,
    description: 'Fast-selling consumer electronics TWS earbuds in metro retail',
    evidence: {
      shopping: [
        {
          id: 'sp-e1',
          title: 'boAt Airdopes 141 True Wireless Earbuds (42H Playtime)',
          price: 999,
          originalPrice: 4490,
          merchant: 'Amazon.in',
          link: 'https://amazon.in',
          rating: 4.1,
          reviewsCount: 198000,
          deliveryInfo: 'Same-day Prime Mumbai',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-e2',
          title: 'boAt Airdopes 141 with Beast Mode (Bold Black)',
          price: 1049,
          originalPrice: 4490,
          merchant: 'Flipkart',
          link: 'https://flipkart.com',
          rating: 4.1,
          reviewsCount: 124000,
          deliveryInfo: 'Next day delivery',
          badge: 'E-Commerce'
        },
        {
          id: 'sp-e3',
          title: 'boAt Airdopes 141 TWS Earbuds',
          price: 1099,
          originalPrice: 4490,
          merchant: 'Zepto Mumbai',
          link: 'https://zepto.com',
          rating: 4.3,
          reviewsCount: 4200,
          deliveryInfo: '10 min delivery',
          badge: 'Quick Commerce'
        },
        {
          id: 'sp-e4',
          title: 'boAt Airdopes 141 Bluetooth Headset',
          price: 1149,
          originalPrice: 4490,
          merchant: 'Croma Retail',
          link: 'https://croma.com',
          rating: 4.2,
          reviewsCount: 1840,
          deliveryInfo: 'Store pickup / 2-hr delivery',
          badge: 'Modern Retail'
        },
        {
          id: 'sp-e5',
          title: 'boAt Airdopes 141 Wireless Earphones',
          price: 1199,
          originalPrice: 4490,
          merchant: 'Vijay Sales Mumbai',
          link: 'https://vijaysales.com',
          rating: 4.3,
          reviewsCount: 820,
          deliveryInfo: 'Available in showroom',
          badge: 'Modern Retail'
        }
      ],
      local: [
        {
          id: 'lb-e1',
          name: 'Lamington Road Electronics Wholesale Market',
          type: 'Wholesaler',
          address: 'Grant Road East, Mumbai, Maharashtra 400007',
          distanceEstimate: '4.8 km',
          rating: 4.5,
          reviewsCount: 1820,
          phone: '+91 22 2388 9410',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-e2',
          name: 'Manish Market Mobile & Gadget Thok Vyapar',
          type: 'Wholesaler',
          address: 'Musafir Khana, Crawford Market Area, Mumbai 400001',
          distanceEstimate: '6.1 km',
          rating: 4.2,
          reviewsCount: 940,
          phone: '+91 22 2261 4580',
          verifiedSourcingLead: true
        },
        {
          id: 'lb-e3',
          name: 'Imagine Marketing (boAt) Regional Distributor Mumbai',
          type: 'Distributor',
          address: 'Andheri East Industrial Estate, Mumbai 400069',
          distanceEstimate: '11.5 km',
          rating: 4.3,
          reviewsCount: 125,
          phone: '+91 98200 48123',
          verifiedSourcingLead: true
        }
      ],
      news: [
        {
          id: 'nw-e1',
          title: 'Indian wearables market slows down as festive promotional wars intensify',
          source: 'Mint Tech',
          snippet: 'E-commerce discounting on audio brands puts pressure on offline dealer margins; online discounts often undercut traditional retail billing by 15-20%.',
          date: '2 days ago',
          sentiment: 'Bearish',
          link: '#'
        },
        {
          id: 'nw-e2',
          title: 'Customs crack down on non-BIS certified electronics imports',
          source: 'Business Standard',
          snippet: 'Authorized brand distributors gain market share as grey market supplies face border clearance hurdles.',
          date: '1 week ago',
          sentiment: 'Policy/GST',
          link: '#'
        }
      ],
      finance: {
        signalName: 'USD / INR Spot Rate & 18% GST Compliance',
        currentMetric: '₹86.45 / USD',
        changeText: '+0.4% MoM depreciation',
        category: 'Currency',
        impact: 'Bullish',
        explanation: 'Slight foreign exchange headwind stabilizes wholesale costs; unlikely to see deeper brand-led price drops.'
      }
    }
  }
];

export function findBenchmark(product: string, city?: string): BenchmarkProduct | null {
  const p = product.toLowerCase();
  
  if (/fortune.*mustard|mustard.*oil/i.test(p)) {
    return INDIAN_MARKET_BENCHMARKS[0];
  } else if (/basmati|rice.*5kg|india.*gate/i.test(p)) {
    return INDIAN_MARKET_BENCHMARKS[1];
  } else if (/butter|amul/i.test(p)) {
    return INDIAN_MARKET_BENCHMARKS[2];
  } else if (/tea|chai|tata.*gold/i.test(p)) {
    return INDIAN_MARKET_BENCHMARKS[3];
  } else if (/boat|airdopes|earbuds/i.test(p)) {
    return INDIAN_MARKET_BENCHMARKS[4];
  }

  return null;
}
