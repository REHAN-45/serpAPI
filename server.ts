import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

import { normalizeQuery } from './src/services/queryNormalizer.js';
import { budgetTracker } from './src/services/budgetTracker.js';
import { marketCache } from './src/services/cache.js';
import {
  normalizeCompetitors,
  normalizeLocalBusinesses,
  normalizeNews,
  normalizeFinance
} from './src/services/evidenceNormalizer.js';
import { matchAndFilterProducts } from './src/services/matcher.js';
import { fuseMarketData } from './src/services/fusionEngine.js';
import { generateRecommendation } from './src/services/decisionEngine.js';
import { findBenchmark } from './src/services/marketBenchmarks.js';
import { AnalysisResult } from './src/types/market.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json());

// Initialize Gemini if key exists
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI({});
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Helper to query SerpApi if key is set
async function querySerpApi(params: Record<string, string>, apiKey: string) {
  const url = new URL('https://serpapi.com/search.json');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  url.searchParams.set('api_key', apiKey);

  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`SerpApi error (${res.status}): ${errorText}`);
  }

  return await res.json();
}

// Live search synthesizer using Gemini with Google Search or synthesis
async function synthesizeMarketViaGemini(
  product: string,
  city: string,
  userPrice: number,
  category: string
) {
  if (!genAI) return null;

  const prompt = `You are BharatPrice Pulse's Indian market pricing intelligence engine.
Analyze the following product for an Indian shopkeeper / trader in ${city}:
Product: "${product}"
City: "${city}"
Current Selling Price: ₹${userPrice}
Category: ${category}

Research the actual current Indian retail and wholesale market reality:
1. Google Shopping competitor prices in India (Blinkit, Zepto, Swiggy Instamart, Amazon.in, JioMart, DMart Ready, local retail). Realistic observed INR price for this exact package size.
2. Google Local sourcing options in ${city} (real wholesale grain/oil/electronics mandis, APMC yards, authorized distributors, or thok vyapari in ${city}).
3. Recent market & supply chain news in India (crop reports, transport costs, festive demand, GST or duty updates).
4. Google Finance / macro signal (commodity rate, USD/INR, or CPI food inflation index).

Respond ONLY with valid raw JSON (no markdown formatting, no code fences):
{
  "shopping": [
    { "title": string, "price": number, "merchant": string, "delivery": string, "badge": "Quick Commerce" | "E-Commerce" | "Hypermarket" }
  ],
  "local": [
    { "name": string, "type": "Wholesaler" | "Distributor" | "Mandi" | "Trader", "address": string, "distance": string, "phone": string }
  ],
  "news": [
    { "title": string, "source": string, "snippet": string, "date": string, "sentiment": "Bullish" | "Bearish" | "Neutral" | "Supply Shock" | "Policy/GST" }
  ],
  "finance": {
    "signalName": string,
    "currentMetric": string,
    "changeText": string,
    "category": "Commodity" | "Currency" | "Inflation" | "Tariff/GST",
    "impact": "Bullish" | "Bearish" | "Neutral",
    "explanation": string
  }
}`;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.warn('Gemini market synthesis error:', err);
    return null;
  }
}

// GET /api/health
app.get('/api/health', (_req: Request, res: Response) => {
  const serpKey = process.env.SERPAPI_API_KEY;
  const budget = budgetTracker.getState();

  res.json({
    status: 'ok',
    serpApiConfigured: Boolean(serpKey && serpKey.length > 5),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    budget: {
      ...budget,
      remaining: budgetTracker.getRemaining()
    },
    cachedEntriesCount: marketCache.size()
  });
});

// GET /api/budget
app.get('/api/budget', (_req: Request, res: Response) => {
  res.json({
    ...budgetTracker.getState(),
    remaining: budgetTracker.getRemaining()
  });
});

// POST /api/analyze
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const {
      product = '',
      city = 'Jaipur',
      sellingPrice = 0,
      costPrice,
      forceRefresh = false
    } = req.body;

    if (!product || typeof product !== 'string' || product.trim().length === 0) {
      return res.status(400).json({ error: 'Product name is required.' });
    }

    const priceNum = Number(sellingPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: 'Valid selling price in ₹ is required.' });
    }

    const costNum = costPrice !== undefined && costPrice !== null && !isNaN(Number(costPrice)) && Number(costPrice) > 0
      ? Number(costPrice)
      : undefined;

    // Step 1: Query Normalizer
    const normalized = normalizeQuery(product, city);

    // Step 2: Cache Check (Constraint: strictly avoid redundant searches)
    if (!forceRefresh) {
      const cached = marketCache.get(normalized.normalizedProduct, normalized.normalizedCity);
      if (cached) {
        budgetTracker.recordCacheHit();
        return res.json({
          ...cached,
          budget: {
            ...budgetTracker.getState(),
            searchesUsed: 0,
            isCached: true,
            cacheExpiresInMinutes: 120,
            totalSessionSearches: budgetTracker.getState().sessionSearches,
            remainingSearchBudget: budgetTracker.getRemaining()
          }
        });
      }
    }

    // Step 3: Check Budget Protection
    if (!budgetTracker.canExecute(4)) {
      return res.status(429).json({
        error: 'Search budget limit reached for this session. Contact admin or view cached results.',
        remaining: budgetTracker.getRemaining()
      });
    }

    // Step 4: Budget-Controlled Orchestrator (max 4 searches)
    let rawShopping: any[] = [];
    let rawLocal: any[] = [];
    let rawNews: any[] = [];
    let rawFinance: any = null;
    let searchesUsed = 0;
    const serpApiKey = process.env.SERPAPI_API_KEY;

    // A: Try Live SerpApi if key is present
    if (serpApiKey && serpApiKey.length > 5) {
      try {
        const [shopRes, locRes, newsRes] = await Promise.allSettled([
          querySerpApi({
            engine: 'google_shopping',
            q: normalized.queries.shopping,
            google_domain: 'google.co.in',
            gl: 'in',
            hl: 'en',
            location: `${normalized.normalizedCity}, India`
          }, serpApiKey),
          querySerpApi({
            engine: 'google_local',
            q: normalized.queries.local,
            google_domain: 'google.co.in',
            gl: 'in',
            hl: 'en',
            location: `${normalized.normalizedCity}, India`
          }, serpApiKey),
          querySerpApi({
            engine: 'google_news',
            q: normalized.queries.news,
            gl: 'in',
            hl: 'en'
          }, serpApiKey)
        ]);

        if (shopRes.status === 'fulfilled' && shopRes.value?.shopping_results) {
          rawShopping = shopRes.value.shopping_results;
        }
        if (locRes.status === 'fulfilled' && locRes.value?.local_results) {
          rawLocal = locRes.value.local_results;
        }
        if (newsRes.status === 'fulfilled' && newsRes.value?.news_results) {
          rawNews = newsRes.value.news_results;
        }

        searchesUsed = 3;
        budgetTracker.recordSearches({ shopping: 1, local: 1, news: 1 });
      } catch (serpErr) {
        console.warn('SerpApi call failed, falling back to Gemini / benchmark:', serpErr);
      }
    }

    // B: If SerpApi wasn't used or returned empty, try Gemini live synthesis or calibrated benchmark
    if (rawShopping.length === 0) {
      // Check if we have an exact calibrated benchmark first (instant & reliable)
      const benchmark = findBenchmark(product, city);
      if (benchmark && !forceRefresh) {
        rawShopping = benchmark.evidence.shopping;
        rawLocal = benchmark.evidence.local;
        rawNews = benchmark.evidence.news;
        rawFinance = benchmark.evidence.finance;
        searchesUsed = 4;
        budgetTracker.recordSearches({ shopping: 1, local: 1, news: 1, finance: 1 });
      } else {
        // Use Gemini live market synthesis
        const geminiData = await synthesizeMarketViaGemini(
          normalized.normalizedProduct,
          normalized.normalizedCity,
          priceNum,
          normalized.category
        );

        if (geminiData) {
          rawShopping = geminiData.shopping || [];
          rawLocal = geminiData.local || [];
          rawNews = geminiData.news || [];
          rawFinance = geminiData.finance || null;
          searchesUsed = 4;
          budgetTracker.recordSearches({ shopping: 1, local: 1, news: 1, finance: 1 });
        } else if (benchmark) {
          rawShopping = benchmark.evidence.shopping;
          rawLocal = benchmark.evidence.local;
          rawNews = benchmark.evidence.news;
          rawFinance = benchmark.evidence.finance;
          searchesUsed = 4;
          budgetTracker.recordSearches({ shopping: 1, local: 1, news: 1, finance: 1 });
        }
      }
    }

    // Step 5: Evidence Normalizer
    const normalizedShopping = normalizeCompetitors(rawShopping);
    const normalizedLocal = normalizeLocalBusinesses(rawLocal);
    const normalizedNewsList = normalizeNews(rawNews);
    const normalizedFin = normalizeFinance(rawFinance, normalized.category);

    // Step 6: Product Matcher (Drops outliers & mismatched sizes)
    const filteredCompetitors = matchAndFilterProducts(
      normalizedShopping,
      normalized.unit,
      priceNum
    );

    // If matcher left too few, ensure we don't drop down to zero
    const finalCompetitors = filteredCompetitors.length > 0 ? filteredCompetitors : normalizedShopping;

    // Step 7: Fusion Engine
    const { stats, localSourcing, externalRisk } = fuseMarketData(
      finalCompetitors,
      normalizedLocal,
      normalizedNewsList,
      normalizedFin,
      priceNum,
      costNum,
      normalized.normalizedCity
    );

    // Step 8: Decision Engine
    const recommendation = generateRecommendation(
      normalized.normalizedProduct,
      normalized.normalizedCity,
      priceNum,
      costNum,
      stats,
      localSourcing,
      externalRisk
    );

    const result: AnalysisResult = {
      id: `bp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      query: {
        product,
        city,
        sellingPrice: priceNum,
        costPrice: costNum,
        forceRefresh
      },
      normalized: {
        product: normalized.normalizedProduct,
        city: normalized.normalizedCity,
        unit: normalized.unit,
        brand: normalized.brand,
        category: normalized.category
      },
      stats,
      localSourcing,
      externalRisk,
      recommendation,
      evidence: {
        shopping: finalCompetitors,
        local: normalizedLocal,
        news: normalizedNewsList,
        finance: normalizedFin
      },
      budget: {
        searchesUsed,
        isCached: false,
        cacheExpiresInMinutes: 120,
        engineBreakdown: {
          shopping: 1,
          local: 1,
          news: 1,
          finance: 1
        },
        totalSessionSearches: budgetTracker.getState().sessionSearches,
        remainingSearchBudget: budgetTracker.getRemaining()
      }
    };

    // Store in cache
    marketCache.set(normalized.normalizedProduct, normalized.normalizedCity, result);

    res.json(result);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Failed to complete market analysis.',
      details: error.message || String(error)
    });
  }
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: PORT,
        host: '0.0.0.0'
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BharatPrice Pulse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
