import {
  MarketStatistics,
  LocalSourcingSignal,
  ExternalRiskSignal,
  Recommendation
} from '../types/market.js';

export function generateRecommendation(
  product: string,
  city: string,
  userPrice: number,
  costPrice: number | undefined,
  stats: MarketStatistics,
  localSourcing: LocalSourcingSignal,
  externalRisk: ExternalRiskSignal
): Recommendation {
  const { medianPrice, priceGapVsMedian, minPrice, maxPrice, competitorsFoundCount } = stats;

  // Confidence calculation
  let confidence: Recommendation['confidence'] = 'High';
  let confidenceReason = 'Backed by comprehensive multi-source price matches, local merchant signals, and macro data.';

  if (competitorsFoundCount < 4) {
    confidence = 'Medium';
    confidenceReason = `Limited comparable online SKUs (${competitorsFoundCount} found); recommendations should be weighed against your known store walk-in patterns.`;
  } else if (competitorsFoundCount >= 7 && localSourcing.verifiedCount >= 3) {
    confidence = 'High';
    confidenceReason = `Strong sample size: ${competitorsFoundCount} verified competitor listings and ${localSourcing.verifiedCount} local ${city} wholesale sources analyzed.`;
  }

  // Decision Logic
  let action: Recommendation['action'] = 'Hold & Defend Margin';
  let actionType: Recommendation['actionType'] = 'neutral';
  let headline = '';
  let detailedAdvice = '';
  let hindiSummary = '';

  // Calculate suggested pricing corridor
  let suggestedMin = Math.round(medianPrice * 0.96);
  let suggestedTarget = medianPrice;
  let suggestedMax = Math.round(medianPrice * 1.04);

  // Scenario 1: Seller is significantly overpriced (> +7%)
  if (priceGapVsMedian > 7) {
    action = 'Review Price';
    actionType = 'warning';
    headline = `Your price (₹${userPrice}) is +${priceGapVsMedian}% above observed market median (₹${medianPrice}).`;
    
    if (localSourcing.level === 'High') {
      detailedAdvice = `Online platforms and quick commerce in ${city} are selling at ₹${minPrice}–₹${medianPrice}. Because local wholesale access is strong (${localSourcing.topSourcingHub || 'nearby mandis'}), check if you can negotiate a lower procurement cost rather than sacrificing your retail margin. If your customers have quick-commerce alternatives, align your shelf price closer to ₹${suggestedTarget}–₹${suggestedMax}.`;
    } else {
      detailedAdvice = `You are currently pricing at the top ${Math.round(100 - (stats.priceGapVsMedian > 20 ? 5 : 15))}% of the market. Unless you offer unique advantages like credit (udhaar), free home delivery, or bundled grocery value, consider tapering to ₹${suggestedTarget} to avoid losing price-sensitive shoppers.`;
    }

    hindiSummary = `बाज़ार का औसत भाव ₹${medianPrice} है, जबकि आपका भाव ₹${userPrice} (${priceGapVsMedian}% अधिक) है। यदि ग्राहक ब्लिंकिट या अन्य दुकानों से तुलना करते हैं, तो बिक्री प्रभावित हो सकती है। नया माल आने पर दाम ₹${suggestedTarget}-₹${suggestedMax} के दायरे में लाने पर विचार करें।`;
    
    suggestedMin = Math.max(costPrice ? costPrice * 1.05 : 0, Math.round(medianPrice * 0.98));
    suggestedTarget = Math.round(medianPrice * 1.02);
    suggestedMax = Math.round(medianPrice * 1.05);
  }
  // Scenario 2: Seller is notably underpriced (< -6%)
  else if (priceGapVsMedian < -6) {
    action = 'Opportunity to Increase';
    actionType = 'positive';
    headline = `Your price (₹${userPrice}) is ${Math.abs(priceGapVsMedian)}% below market median (₹${medianPrice}).`;
    
    detailedAdvice = `You have pricing headroom. The typical observed market price is ₹${medianPrice} (ranging up to ₹${maxPrice}). You can comfortably raise your price to ₹${Math.round(userPrice + (medianPrice - userPrice) * 0.65)} without becoming uncompetitive, directly expanding your gross margin.`;
    
    hindiSummary = `आप बाज़ार के औसत भाव (₹${medianPrice}) से ${Math.abs(priceGapVsMedian)}% कम में बेच रहे हैं। आप बिना किसी ग्राहक नुकसान के अपना दाम ₹${userPrice} से बढ़ाकर ₹${Math.round(userPrice + (medianPrice - userPrice) * 0.65)} तक कर सकते हैं, जिससे आपका सीधा मुनाफा बढ़ेगा।`;

    suggestedMin = userPrice;
    suggestedTarget = Math.round(medianPrice * 0.98);
    suggestedMax = medianPrice;
  }
  // Scenario 3: High supply risk ahead
  else if (externalRisk.level === 'High') {
    action = 'Urgent Restock Action';
    actionType = 'urgent';
    headline = `Market risk is elevated: upcoming wholesale supply tightness detected.`;

    detailedAdvice = `While your current price (₹${userPrice}) matches the median (₹${medianPrice}), recent supply-chain indicators point to wholesale cost inflation. Contact local distributors in ${city} immediately to lock in procurement before wholesale prices increase.`;

    hindiSummary = `बाज़ार में सप्लाई या कच्चे माल की कमी के संकेत हैं। आपका वर्तमान भाव ठीक है, लेकिन जल्द ही थोक भाव बढ़ सकते हैं। स्थानीय सप्लायर से बात करके तुरंत अगला स्टॉक सुरक्षित कर लें।`;

    suggestedMin = medianPrice;
    suggestedTarget = Math.round(medianPrice * 1.03);
    suggestedMax = Math.round(medianPrice * 1.08);
  }
  // Scenario 4: Local sourcing opportunity
  else if (localSourcing.level === 'High' && costPrice && stats.sellerMarginPercent !== undefined && stats.sellerMarginPercent < 15) {
    action = 'Source Cheaper Locally';
    actionType = 'positive';
    headline = `Your margin (${stats.sellerMarginPercent}%) is tight, but strong local sourcing exists in ${city}.`;

    detailedAdvice = `Direct wholesale suppliers and mandis are active in ${city} (e.g. ${localSourcing.topSourcingHub || 'local trade centers'}). Instead of raising retail price above ₹${userPrice}, obtain quotes from 2 nearby wholesale leads to reduce your landing cost from ₹${costPrice}.`;

    hindiSummary = `आपका मार्जिन अभी कम है, लेकिन ${city} में सीधे थोक व्यापारी मौजूद हैं। रिटेल भाव बढ़ाने के बजाय स्थानीय मंडी से माल लेकर खरीद लागत घटाएं।`;

    suggestedMin = Math.round(medianPrice * 0.98);
    suggestedTarget = userPrice;
    suggestedMax = Math.round(medianPrice * 1.04);
  }
  // Scenario 5: Balanced competitive position
  else {
    action = 'Hold & Defend Margin';
    actionType = 'neutral';
    headline = `Your price (₹${userPrice}) is in the optimal sweet spot (within ${Math.abs(priceGapVsMedian)}% of median).`;

    detailedAdvice = `Your pricing is competitive against both online sellers and local stores. Market risk is low, and local sourcing is adequate. Maintain this price to defend your margin while remaining attractive to neighbourhood shoppers.`;

    hindiSummary = `आपका भाव बाज़ार के अनुकूल है (औसत ₹${medianPrice} के बिल्कुल पास)। दाम बदलने की ज़रूरत नहीं है, वर्तमान स्तर पर बेचते रहें।`;

    suggestedMin = Math.round(medianPrice * 0.97);
    suggestedTarget = userPrice;
    suggestedMax = Math.round(medianPrice * 1.03);
  }

  return {
    action,
    actionType,
    headline,
    detailedAdvice,
    hindiSummary,
    confidence,
    confidenceReason,
    suggestedPriceRange: {
      min: suggestedMin,
      target: suggestedTarget,
      max: suggestedMax
    }
  };
}
