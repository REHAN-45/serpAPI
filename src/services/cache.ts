import { AnalysisResult } from '../types/market.js';

interface CacheEntry {
  data: AnalysisResult;
  timestamp: number;
  expiresAt: number;
}

class MarketCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL = 2 * 60 * 60 * 1000; // 2 hours

  private makeKey(product: string, city: string): string {
    return `${product.trim().toLowerCase()}:::${city.trim().toLowerCase()}`;
  }

  public get(product: string, city: string): AnalysisResult | null {
    const key = this.makeKey(product, city);
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public set(product: string, city: string, data: AnalysisResult, ttlMs?: number): void {
    const key = this.makeKey(product, city);
    const ttl = ttlMs || this.defaultTTL;
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl
    });
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }
}

export const marketCache = new MarketCache();
