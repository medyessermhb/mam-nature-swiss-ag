export type Region = 'Morocco' | 'Switzerland' | 'Europe' | 'RestOfWorld';

export const PRICES: Record<string, Record<Region, number>> = {
    // 1. ECO SET
    'mam-nature-eco-set': {
        Morocco: 12299,
        Switzerland: 1070,
        Europe: 1150,
        RestOfWorld: 966.39
    },

    // 2. ECO SET PLUS
    'mam-nature-eco-set-plus': {
        Morocco: 19989,
        Switzerland: 1787,
        Europe: 1916,
        RestOfWorld: 1610.08
    },

    // 3. COMPLETE SET PLUS
    'mam-nature-water-treatment-complete-set-plus': {
        Morocco: 37507,
        Switzerland: 3378,
        Europe: 3598,
        RestOfWorld: 3023.53
    },

    // 4. COMPLETE SET
    'mam-nature-water-treatment-complete-set': {
        Morocco: 31241,
        Switzerland: 2780,
        Europe: 2998,
        RestOfWorld: 2519.33
    },

    // 5. HYDROGEN BOOSTER
    'swiss-hydrogen-booster': {
        Morocco: 2292.40,
        Switzerland: 206.80,
        Europe: 220.00,
        RestOfWorld: 184.87
    },

    // 6. DYNAMIZER
    'the-swiss-water-dynamizer': {
        Morocco: 20816.16,
        Switzerland: 1848,
        Europe: 1998,
        RestOfWorld: 1678.99
    },

    // 7. FINE FILTER (Housing)
    'mam-nature-water-fine-filter': {
        Morocco: 6750,
        Switzerland: 598,
        Europe: 648,
        RestOfWorld: 544.54
    },

    // 8. PARTICLE FILTER
    'water-particle-filter': {
        Morocco: 2479.96,
        Switzerland: 218,
        Europe: 238,
        RestOfWorld: 200.00
    },

    // 9. CARTRIDGE
    'water-fine-filter-cartridge': {
        Morocco: 2709,
        Switzerland: 250,
        Europe: 240,
        RestOfWorld: 201.68
    },

    // 10. ESSENTIAL SET
    'mam-nature-essential-set': {
        Morocco: 8580,
        Switzerland: 760,
        Europe: 820,
        RestOfWorld: 689.08
    },

    // 11. ESSENTIAL PLUS SET
    'mam-nature-essential-plus': {
        Morocco: 10250,
        Switzerland: 910,
        Europe: 980,
        RestOfWorld: 823.53
    },

    // 12. WATER LIME
    'mam-nature-water-lime': {
        Morocco: 2270,
        Switzerland: 210,
        Europe: 217,
        RestOfWorld: 182.35
    },

    // 13. PARTICLE LIME SET
    'mam-nature-particle-lime-set': {
        Morocco: 3450,
        Switzerland: 305,
        Europe: 330,
        RestOfWorld: 277.31
    }
};
