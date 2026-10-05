import {
  CompetitorItem,
  LocalBusiness,
  NewsItem,
  FinanceSignal,
  MarketStatistics,
  LocalSourcingSignal,
  ExternalRiskSignal
} from '../types/market.js';

export function fuseMarketData(
  competitors: CompetitorItem[],
  localLeads: LocalBusiness[],
  newsItems: NewsItem[],
  financeSignal: FinanceSignal,
  userPrice: number,
  costPrice?: number,
  city = 'India'
): {
  stats: MarketStatistics;
  localSourcing: LocalSourcingSignal;
  externalRisk: ExternalRiskSignal;
} {
  // Extract prices
  const validPrices = competitors.map(c => c.price).sort((a, b) => a - b);

  let minPrice = userPrice;
  let maxPrice = userPrice;
  let medianPrice = userPrice;
  let meanPrice = userPrice;
  let p25 = userPrice;
  let p75 = userPrice;

  if (validPrices.length > 0) {
    minPrice = validPrices[0];
    maxPrice = validPrices[validPrices.length - 1];

    const mid = Math.floor(validPrices.length / 2);
    medianPrice = validPrices.length % 2 !== 0
      ? validPrices[mid]
      : Math.round((validPrices[mid - 1] + validPrices[mid]) / 2);

    const sum = validPrices.reduce((acc, p) => acc + p, 0);
    meanPrice = Math.round(sum / validPrices.length);

    p25 = validPrices[Math.floor(validPrices.length * 0.25)] || minPrice;
    p75 = validPrices[Math.floor(validPrices.length * 0.75)] || maxPrice;
  }

  // Price gap calculations
  const priceGapVsMedian = medianPrice > 0
    ? Number((((userPrice - medianPrice) / medianPrice) * 100).toFixed(1))
    : 0;

  const priceGapVsMin = minPrice > 0
    ? Number((((userPrice - minPrice) / minPrice) * 100).toFixed(1))
    : 0;

  // Margin calculations
  let sellerMarginPercent: number | undefined;
  let marketMarginPercent: number | undefined;

  if (costPrice && costPrice > 0) {
    sellerMarginPercent = Number((((userPrice - costPrice) / userPrice) * 100).toFixed(1));
    marketMarginPercent = Number((((medianPrice - costPrice) / medianPrice) * 100).toFixed(1));
  }

  const stats: MarketStatistics = {
    minPrice,
    maxPrice,
    medianPrice,
    meanPrice,
    p25,
    p75,
    priceGapVsMedian,
    priceGapVsMin,
    sellerMarginPercent,
    marketMarginPercent,
    competitorsFoundCount: validPrices.length
  };

  // Evaluate Local Sourcing Signal
  const mandiCount = localLeads.filter(l => l.type === 'Mandi' || l.type === 'Wholesaler').length;
  let sourcingLevel: LocalSourcingSignal['level'] = 'Medium';
  let sourcingSummary = `Detected ${localLeads.length} local trading merchants in and around ${city}.`;

  if (localLeads.length >= 4 && mandiCount >= 2) {
    sourcingLevel = 'High';
    sourcingSummary = `Strong local wholesale presence in ${city}: ${mandiCount} direct mandis & wholesale hubs located nearby. High bargaining leverage for procurement.`;
  } else if (localLeads.length <= 1) {
    sourcingLevel = 'Low';
    sourcingSummary = `Sparse direct wholesale representation detected in immediate ${city} vicinity. Sourcing may rely on regional distributors or secondary agents.`;
  } else {
    sourcingLevel = 'Medium';
    sourcingSummary = `Moderate wholesale access in ${city}. Regular distributor networks exist; compare mandi rates with company C&F agents.`;
  }

  const localSourcing: LocalSourcingSignal = {
    level: sourcingLevel,
    title: `Local Sourcing Availability: ${sourcingLevel}`,
    summary: sourcingSummary,
    verifiedCount: localLeads.length,
    topSourcingHub: localLeads[0]?.name
  };

  // Evaluate External Risk
  const supplyShockCount = newsItems.filter(n => n.sentiment === 'Supply Shock').length;
  const policyCount = newsItems.filter(n => n.sentiment === 'Policy/GST').length;
  const financeImpact = financeSignal.impact;

  let riskLevel: ExternalRiskSignal['level'] = 'Low';
  const keyDrivers: string[] = [];

  if (supplyShockCount >= 2 || (supplyShockCount >= 1 && financeImpact === 'Bullish')) {
    riskLevel = 'High';
    keyDrivers.push('Recent news reports indicate raw material deficit or seasonal crop disruption.');
    keyDrivers.push(`Macro indicator (${financeSignal.signalName}) reflects upward price pressure.`);
  } else if (supplyShockCount === 1 || policyCount >= 1 || financeImpact === 'Bullish') {
    riskLevel = 'Medium';
    keyDrivers.push('Moderate volatility in transport/input costs or regulatory monitoring.');
    keyDrivers.push(`Key macro indicator: ${financeSignal.currentMetric} (${financeSignal.changeText}).`);
  } else {
    riskLevel = 'Low';
    keyDrivers.push('Supply conditions and wholesale stock arrivals are stable.');
    keyDrivers.push(`Inflation/input costs are within normal seasonal range.`);
  }

  const externalRisk: ExternalRiskSignal = {
    level: riskLevel,
    title: `External Market & Supply Risk: ${riskLevel}`,
    summary: riskLevel === 'High'
      ? 'Active supply or macro headwinds detected. Input costs may shift abruptly.'
      : riskLevel === 'Medium'
      ? 'Steady baseline market conditions with localized price fluctuations.'
      : 'Calm supply environment. Pricing decisions can prioritize local margin capture.',
    keyDrivers
  };

  return { stats, localSourcing, externalRisk };
}
