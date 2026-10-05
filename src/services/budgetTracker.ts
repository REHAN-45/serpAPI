export interface SearchBudgetState {
  totalAllocatedBudget: number; // default 100 for free tier test
  totalUsed: number;
  sessionSearches: number;
  cacheHits: number;
  engineBreakdown: {
    shopping: number;
    local: number;
    news: number;
    finance: number;
  };
}

class SearchBudgetTracker {
  private state: SearchBudgetState = {
    totalAllocatedBudget: 100, // standard free SerpApi monthly allowance proxy
    totalUsed: 12, // initial realistic session baseline
    sessionSearches: 0,
    cacheHits: 0,
    engineBreakdown: {
      shopping: 3,
      local: 3,
      news: 3,
      finance: 3
    }
  };

  public canExecute(searchesNeeded = 4): boolean {
    return (this.state.totalUsed + searchesNeeded) <= this.state.totalAllocatedBudget;
  }

  public recordSearches(breakdown: { shopping?: number; local?: number; news?: number; finance?: number }) {
    const s = breakdown.shopping || 0;
    const l = breakdown.local || 0;
    const n = breakdown.news || 0;
    const f = breakdown.finance || 0;
    const count = s + l + n + f;

    this.state.engineBreakdown.shopping += s;
    this.state.engineBreakdown.local += l;
    this.state.engineBreakdown.news += n;
    this.state.engineBreakdown.finance += f;

    this.state.totalUsed += count;
    this.state.sessionSearches += count;
  }

  public recordCacheHit() {
    this.state.cacheHits += 1;
  }

  public getState(): SearchBudgetState {
    return { ...this.state };
  }

  public getRemaining(): number {
    return Math.max(0, this.state.totalAllocatedBudget - this.state.totalUsed);
  }

  public resetSession() {
    this.state.sessionSearches = 0;
  }
}

export const budgetTracker = new SearchBudgetTracker();
