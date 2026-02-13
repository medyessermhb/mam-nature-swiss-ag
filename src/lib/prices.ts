export type Region = 'Morocco' | 'Switzerland' | 'Europe';

// Central source of truth for all product prices
export const PRODUCT_PRICES: Record<string, Record<Region, string>> = {
  // 1. ECO SET
  'mam-nature-eco-set': {
    Morocco: '12,299 Dhs',
    Switzerland: 'CHF 1,070',
    Europe: '€ 1,150 EUR'
  },
  
  // 2. ECO SET PLUS
  'mam-nature-eco-set-plus': {
    Morocco: '20,425 Dhs',
    Switzerland: 'CHF 1,777',
    Europe: '€ 1,910 EUR'
  },

  // 3. COMPLETE SET PLUS
  'mam-nature-water-treatment-complete-set-plus': {
    Morocco: '37,507.16 Dhs',
    Switzerland: 'CHF 3,378',
    Europe: '€ 3,598 EUR'
  },

  // 4. COMPLETE SET
  'mam-nature-water-treatment-complete-set': {
    Morocco: '31,241.16 Dhs',
    Switzerland: 'CHF 2,780',
    Europe: '€ 2,998 EUR'
  },

  // 5. HYDROGEN BOOSTER
  'swiss-hydrogen-booster': {
    Morocco: '2,292.40 Dhs',
    Switzerland: 'CHF 206.80',
    Europe: '€ 220 EUR'
  },

  // 6. DYNAMIZER
  'the-swiss-water-dynamizer': {
    Morocco: '20,816.16 Dhs',
    Switzerland: 'CHF 1,848',
    Europe: '€ 1,998 EUR'
  },

  // 7. FINE FILTER (Housing)
  'mam-nature-water-fine-filter': {
    Morocco: '6,750.16 Dhs',
    Switzerland: 'CHF 598',
    Europe: '€ 648 EUR'
  },

  // 8. PARTICLE FILTER (Added both keys to be safe)
  'water-particle-filter': {
    Morocco: '2,479.96 Dhs',
    Switzerland: 'CHF 218',
    Europe: '€ 238 EUR'
  },
  'mam-nature-water-particle-filter': { 
    Morocco: '2,479.96 Dhs',
    Switzerland: 'CHF 218',
    Europe: '€ 238 EUR'
  },

  // 9. CARTRIDGE (Added both keys to be safe)
  'water-fine-filter-cartridge': {
    Morocco: '2,709 Dhs',
    Switzerland: 'CHF 173',
    Europe: '€ 164 EUR'
  },
  'mam-nature-water-fine-filter---cartridge': { 
    Morocco: '2,709 Dhs',
    Switzerland: 'CHF 173',
    Europe: '€ 164 EUR'
  },

  // 10. ESSENTIAL SET
  'mam-nature-essential-set': {
    Morocco: '8,580 Dhs',
    Switzerland: 'CHF 760',
    Europe: '€ 820 EUR'
  },

  // 11. ESSENTIAL PLUS SET
  'mam-nature-essential-plus': {
    Morocco: '10,250 Dhs',
    Switzerland: 'CHF 910',
    Europe: '€ 980 EUR'
  },

  // 12. WATER LIME
  'mam-nature-water-lime': {
    Morocco: '2,270 Dhs',
    Switzerland: 'CHF 210',
    Europe: '€ 217 EUR'
  },

  // 13. PROMO: Particle Filter + Water Lime (Triggered by Essential Set in Cart)
  // Math: Eco Set - Essential Set
  'promo-particle-lime-set': {
    Morocco: '3,719 Dhs', 
    Switzerland: 'CHF 310', 
    Europe: '€ 330 EUR'     
  },

  // 14. PROMO: Water Lime (Triggered by Essential Plus Set in Cart)
  // Math: Eco Set - Essential Plus Set
  'promo-water-lime': {
    Morocco: '2,049 Dhs', 
    Switzerland: 'CHF 160', 
    Europe: '€ 170 EUR'     
  },

  // 15. STANDALONE: Particle Filter + Water Lime Page 
  // (Uses the exact same discounted pricing as the promo)
  'mam-nature-particle-lime-set': {
    Morocco: '3,719 Dhs', 
    Switzerland: 'CHF 310', 
    Europe: '€ 330 EUR' 
  }
};