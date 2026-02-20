'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProductsGrid.module.css';
import ProductCard, { ProductType } from './ProductCard';
import { useLanguage } from '@/context/LanguageContext';

// Standard Lifestyle Slider Groups for whole-house systems
const SHARED_SLIDER_GROUPS = [
  {
    img1: "/images/WEBSITE-P/composents/SHOWER.webp",
    img2: "/images/WEBSITE-P/composents/WATER_DRINKING.webp"
  },
  {
    img1: "/images/WEBSITE-P/composents/TEETH.webp",
    img2: "/images/WEBSITE-P/composents/WASHING_VEGIES.webp"
  },
  {
    img1: "/images/WEBSITE-P/composents/COFFEE.webp",
    img2: "/images/WEBSITE-P/composents/WASHING_MACHINE.webp"
  }
];

// --- DATA DEFINITION (ENGLISH) ---
const PRODUCTS_EN: ProductType[] = [
  // 1. THE ESSENTIAL
  {
    id: 'mam-nature-essential-set',
    name: 'THE ESSENTIAL',
    subtitle: 'whole house solution',
    slug: 'essential',
    priceKey: 'mam-nature-essential-set',
    image: '/images/WEBSITE-P/products/essential.webp',
    imageHeight: 300,
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 2. THE ESSENTIAL PLUS
  {
    id: 'mam-nature-essential-plus',
    name: 'THE ESSENTIAL PLUS',
    subtitle: 'whole house solution',
    slug: 'essential-plus',
    priceKey: 'mam-nature-essential-plus',
    image: '/images/WEBSITE-P/products/essential_plus.webp',
    imageHeight: 300,
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 3. ECO SET
  {
    id: 'eco-set',
    name: 'ECO SET',
    subtitle: 'whole house solution',
    slug: 'eco-set',
    priceKey: 'mam-nature-eco-set',
    image: '/images/products/autobackwash/eco_set_aqmos_auto_backwash.webp',
    imageHeight: 320,
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 4. ECO SET PLUS
  {
    id: 'eco-set-plus',
    name: 'ECO SET PLUS',
    subtitle: 'whole house solution',
    slug: 'eco-set-plus',
    priceKey: 'mam-nature-eco-set-plus',
    image: '/images/products/autobackwash/eco_set_plus_aqmos_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 5. COMPLETE SET
  {
    id: 'complete-set',
    name: 'COMPLETE SET',
    subtitle: 'whole house solution',
    slug: 'complete-set',
    priceKey: 'mam-nature-water-treatment-complete-set',
    image: '/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp',
    imageHeight: 320,
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Includes the Dynamizer for revitalized and restructured water",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 6. COMPLETE SET PLUS
  {
    id: 'complete-set-plus',
    name: 'COMPLETE SET PLUS',
    subtitle: 'whole house solution',
    slug: 'complete-set-plus',
    priceKey: 'mam-nature-water-treatment-complete-set-plus',
    image: '/images/products/autobackwash/complete_set_plus_aqmos_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Includes the Dynamizer for revitalized and restructured water",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 7. WATER PARTICLE FILTER
  {
    id: 'particle-filter',
    name: 'WATER PARTICLE FILTER',
    subtitle: 'Individual Component',
    slug: 'particles-filter',
    priceKey: 'water-particle-filter',
    image: '/images/products/particle_filter/particle_filter_auto_backwash_front.webp',
    imageHeight: 320,
    features: [
      "The first line of protection for your system",
      "Eliminates sand, sediments, and all solid matter in the water with automatic backwash. Requires neither maintenance nor consumables."
    ]
  },
  // 8. WATER LIME
  {
    id: 'water-lime',
    name: 'WATER LIME',
    subtitle: 'Anti-Limescale Solution',
    slug: 'water-lime',
    priceKey: 'mam-nature-water-lime',
    image: '/images/WEBSITE-P/products/water_lime_vertical.webp',
    imageHeight: 320,
    features: [
      "Physical conversion of limescale.",
      "Protects household appliances.",
      "Retains healthy calcium and magnesium.",
      "Zero salt, zero electricity, zero chemicals.",
      "Unlimited capacity lifespan."
    ]
  },
  // 9. THE SWISS WATER DYNAMIZER
  {
    id: 'dynamizer',
    name: 'THE SWISS WATER DYNAMIZER',
    subtitle: 'Individual Component',
    slug: 'dynamizer',
    priceKey: 'the-swiss-water-dynamizer',
    image: '/images/WEBSITE-P/products/DYNAMIZER.webp',
    imageHeight: 320,
    features: [
      "100% physical action to restore all the beneficial properties to tap water.",
      "Revitalizes and restructures water at a molecular level.",
      "Transformation of limescale into soft Aragonite.",
      "Water with an exceptional taste and remarkably easy to digest.",
      "Optimal cellular hydration.",
      "Simple installation, requires no maintenance or electricity."
    ]
  },
  // 10. PARTICLE & LIME SET
  {
    id: 'particle-lime-set',
    name: 'PARTICLE & LIME SET',
    subtitle: 'Sediment + Scale Protection',
    slug: 'particle-lime-set',
    priceKey: 'mam-nature-particle-lime-set',
    image: '/images/products/particle_filter/water_lime_particle_filter_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Dual protection for plumbing and appliances.",
      "Stops sand and rust with automatic backwash.",
      "Converts hard limescale into soft Aragonite.",
      "Zero salt, zero chemicals, zero waste.",
      "No maintenance needed for scale protection."
    ]
  },
  // 11. SWISS HYDROGEN BOOSTER
  {
    id: 'hydrogen-booster',
    name: 'SWISS HYDROGEN BOOSTER',
    subtitle: 'Class 1 Medical Device',
    slug: 'hydrogen-booster',
    priceKey: 'swiss-hydrogen-booster',
    image: '/images/WEBSITE-P/products/HYDROGEEN_BOOSTER.webp',
    imageHeight: 320,
    features: [
      "Highest concentration in the market: 7500 ppb of molecular Hydrogen",
      "Fast recharge: 0 to 100% in 1 hour.",
      "150-minute battery life, or up to 15 uses.",
      "Components compliant with food safety standards.",
      "Ultra-fine hydrogen bubbles guarantee unparalleled efficiency, far surpassing standard devices.",
      "Portable and easy to use for daily well-being."
    ]
  },
  // 12. SWISS WATER CARTRIDGE
  {
    id: 'cartridge',
    name: 'SWISS WATER CARTRIDGE',
    subtitle: 'Replacement Cartridge',
    slug: 'cartridge',
    priceKey: 'water-fine-filter-cartridge',
    image: '/images/WEBSITE-P/products/cartridge.webp',
    imageHeight: 320,
    features: [
      "Replacement Cartridge for your Water Fine Filter after max. 150 m3 resp. 1 year.",
      "Eliminates chlorine, PFAS, PFOS, heavy metals, aluminium, pesticides & radioactive substances …",
      "Easy and quick installation, no tools required."
    ]
  }
];

// --- DATA DEFINITION (FRENCH) ---
const PRODUCTS_FR: ProductType[] = [
  // 1. L'ESSENTIEL
  {
    id: 'mam-nature-essential-set',
    name: 'L’ESSENTIEL',
    subtitle: 'Pour toute la maison',
    slug: 'essentiel',
    priceKey: 'mam-nature-essential-set',
    image: '/images/WEBSITE-P/products/essential.webp',
    imageHeight: 300,
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 2. L'ESSENTIEL PLUS
  {
    id: 'mam-nature-essential-plus',
    name: 'L’ESSENTIEL PLUS',
    subtitle: 'Pour toute la maison',
    slug: 'essentiel-plus',
    priceKey: 'mam-nature-essential-plus',
    image: '/images/WEBSITE-P/products/essential_plus.webp',
    imageHeight: 300,
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 3. ECO SET
  {
    id: 'mam-nature-eco-set',
    name: 'ECO SET',
    subtitle: 'Pour toute la maison',
    slug: 'eco-set',
    priceKey: 'mam-nature-eco-set',
    image: '/images/products/autobackwash/eco_set_aqmos_auto_backwash.webp',
    imageHeight: 320,
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 4. ECO SET PLUS
  {
    id: 'mam-nature-eco-set-plus',
    name: 'ECO SET PLUS',
    subtitle: 'Pour toute la maison',
    slug: 'eco-set-plus',
    priceKey: 'mam-nature-eco-set-plus',
    image: '/images/products/autobackwash/eco_set_plus_aqmos_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 5. COMPLETE SET
  {
    id: 'mam-nature-water-treatment-complete-set',
    name: 'COMPLETE SET',
    subtitle: 'Pour toute la maison',
    slug: 'complete-set',
    priceKey: 'mam-nature-water-treatment-complete-set',
    image: '/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp',
    imageHeight: 320,
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Inclut le Dynamizer pour une eau revitalisée et restructurée",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 6. COMPLETE SET PLUS
  {
    id: 'mam-nature-water-treatment-complete-set-plus',
    name: 'COMPLETE SET PLUS',
    subtitle: 'Pour toute la maison',
    slug: 'complete-set-plus',
    priceKey: 'mam-nature-water-treatment-complete-set-plus',
    image: '/images/products/autobackwash/complete_set_plus_aqmos_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Inclut le Dynamizer pour une eau revitalisée et restructurée",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 7. WATER PARTICLE FILTER (L'ESSENTIEL PLUS/ECO SET component but sold separately)
  {
    id: 'particle-filter',
    name: 'WATER PARTICLE FILTER',
    subtitle: 'Composant Individuel',
    slug: 'particles-filter',
    priceKey: 'water-particle-filter',
    image: '/images/products/particle_filter/particle_filter_auto_backwash_front.webp',
    imageHeight: 320,
    features: [
      "La première ligne de défense de votre système.",
      "Élimine le sable, les sédiments et toute matière solide dans l’eau avec rétrolavage automatique. Ne nécessite ni entretien ni consommable."
    ]
  },
  // 8. WATER LIME
  {
    id: 'mam-nature-water-lime',
    name: 'WATER LIME',
    subtitle: 'Solution Anti-Calcaire',
    slug: 'water-lime',
    priceKey: 'mam-nature-water-lime',
    image: '/images/WEBSITE-P/products/water_lime_vertical.webp',
    imageHeight: 320,
    features: [
      "Conversion physique du tartre.",
      "Protège les appareils électroménagers.",
      "Préserve le calcium et le magnésium.",
      "Zéro sel, zéro électricité, zéro chimie.",
      "Capacité de durée de vie illimitée."
    ]
  },
  // 9. THE SWISS WATER DYNAMIZER
  {
    id: 'the-swiss-water-dynamizer',
    name: 'THE SWISS WATER DYNAMIZER',
    subtitle: 'Composant Individuel',
    slug: 'dynamizer',
    priceKey: 'the-swiss-water-dynamizer',
    image: '/images/WEBSITE-P/products/DYNAMIZER.webp',
    imageHeight: 320,
    features: [
      "Action 100% physique pour restituer à l'eau du robinet toutes ses propriétés bénéfiques.",
      "Revitalise et restructure l'eau au niveau moléculaire.",
      "Transformation du calcaire en Aragonite douce.",
      "Une eau au goût exceptionnel et remarquablement digeste.",
      "Une hydratation cellulaire optimale.",
      "Installation simple, sans entretien ni électricité."
    ]
  },
  // 10. SET PARTICULES & CALCAIRE
  {
    id: 'mam-nature-particle-lime-set',
    name: 'SET PARTICULES & CALCAIRE',
    subtitle: 'Sédiments + Protection Tartre',
    slug: 'set-particules-calcaire',
    priceKey: 'mam-nature-particle-lime-set',
    image: '/images/products/particle_filter/water_lime_particle_filter_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Double protection plomberie et appareils.",
      "Arrête sable et rouille (rétrolavage automatique).",
      "Convertit le calcaire en Aragonite douce.",
      "Écologique : zéro sel, zéro chimie, zéro déchet.",
      "Protection anticalcaire sans aucun entretien."
    ]
  },
  // 11. SWISS HYDROGEN BOOSTER
  {
    id: 'swiss-hydrogen-booster',
    name: 'SWISS HYDROGEN BOOSTER',
    subtitle: 'Dispositif médical de classe 1',
    slug: 'hydrogen-booster',
    priceKey: 'swiss-hydrogen-booster',
    image: '/images/WEBSITE-P/products/HYDROGEEN_BOOSTER.webp',
    imageHeight: 320,
    features: [
      "Enrichissez votre eau en hydrogène moléculaire.",
      "Recharge rapide : de 0 à 100 % en 1 heure.",
      "Autonomie de 150 minutes, soit jusqu’à 15 utilisations.",
      "Composants conformes aux normes de sécurité alimentaire.",
      "Des bulles d’hydrogène ultra-fines garantissent efficacité inégalée, surpassant largement les appareils standards.",
      "Portable et facile à utiliser pour un bien-être quotidien."
    ]
  },
  // 12. SWISS WATER CARTRIDGE
  {
    id: 'cartridge',
    name: 'SWISS WATER CARTRIDGE',
    subtitle: 'Cartouche de Remplacement',
    slug: 'cartridge',
    priceKey: 'water-fine-filter-cartridge',
    image: '/images/WEBSITE-P/products/cartridge.webp',
    imageHeight: 320,
    features: [
      "Cartouche de remplacement pour votre Water Fine Filter après max. 150 m3 resp. 1 an.",
      "Élimine le chlore, les PFAS, les PFOS, les métaux lourds, l'aluminium, les pesticides et les substances radioactives...",
      "Installation facile et rapide, sans outils."
    ]
  }
];

const PRODUCTS_DE: ProductType[] = [
  // 1. THE ESSENTIAL
  {
    id: 'mam-nature-essential-set',
    name: 'THE ESSENTIAL',
    subtitle: 'Für das ganze Haus',
    slug: 'essential',
    priceKey: 'mam-nature-essential-set',
    image: '/images/WEBSITE-P/products/essential.webp',
    imageHeight: 300,
    features: [
      "Aus medizinischem Edelstahl, 10 Jahre Garantie, gebaut für ein Leben lang.",
      "Außergewöhnliches Wasser im ganzen Haus: Duschen, Trinken, Kochen, Tee, Kaffee…",
      "Wandelt Kalk um & filtert Partikel und Schadstoffe wie Chlor & PFAS.",
      "Reinigt Wasser auf natürliche Weise, ohne Strom, ohne Abfall, ohne Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten (kein Werkzeug erforderlich)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 2. THE ESSENTIAL PLUS
  {
    id: 'mam-nature-essential-plus',
    name: 'THE ESSENTIAL PLUS',
    subtitle: 'Für das ganze Haus',
    slug: 'essential-plus',
    priceKey: 'mam-nature-essential-plus',
    image: '/images/WEBSITE-P/products/essential_plus.webp',
    imageHeight: 300,
    features: [
      "Aus medizinischem Edelstahl, 10 Jahre Garantie, gebaut für ein Leben lang.",
      "Außergewöhnliches Wasser im ganzen Haus: Duschen, Trinken, Kochen, Tee, Kaffee…",
      "Wandelt Kalk um & filtert Partikel und Schadstoffe wie Chlor & PFAS.",
      "Reinigt Wasser auf natürliche Weise, ohne Strom, ohne Abfall, ohne Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten (kein Werkzeug erforderlich)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 3. ECO SET
  {
    id: 'eco-set',
    name: 'ECO SET',
    subtitle: 'Für das ganze Haus',
    slug: 'eco-set',
    priceKey: 'mam-nature-eco-set',
    image: '/images/products/autobackwash/eco_set_aqmos_auto_backwash.webp',
    imageHeight: 320,
    features: [
      "Aus medizinischem Edelstahl, 10 Jahre Garantie.",
      "Außergewöhnliches Wasser im ganzen Haus.",
      "Wandelt Kalk um & filtert Partikel und Schadstoffe wie Chlor & PFAS.",
      "Kein Strom, kein Abfall, keine Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten (kein Werkzeug erforderlich)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 4. ECO SET PLUS
  {
    id: 'eco-set-plus',
    name: 'ECO SET PLUS',
    subtitle: 'Für das ganze Haus',
    slug: 'eco-set-plus',
    priceKey: 'mam-nature-eco-set-plus',
    image: '/images/products/autobackwash/eco_set_plus_aqmos_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Aus medizinischem Edelstahl, 10 Jahre Garantie, gebaut für ein Leben lang.",
      "Außergewöhnliches Wasser im ganzen Haus: Duschen, Trinken, Kochen, Tee, Kaffee…",
      "Wandelt Kalk um & filtert Partikel und Schadstoffe wie Chlor & PFAS.",
      "Kein Strom, kein Abfall, keine Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten (kein Werkzeug erforderlich)."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 5. COMPLETE SET
  {
    id: 'complete-set',
    name: 'KOMPLETTSET',
    subtitle: 'Für das ganze Haus',
    slug: 'complete-set',
    priceKey: 'mam-nature-water-treatment-complete-set',
    image: '/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp',
    imageHeight: 320,
    features: [
      "Aus medizinischem Edelstahl, 10 Jahre Garantie.",
      "Beinhaltet den Dynamizer für revitalisiertes und strukturiertes Wasser.",
      "Außergewöhnliches Wasser im ganzen Haus.",
      "Wandelt Kalk um, filtert Partikel und Schadstoffe (95-99%).",
      "Kein Strom, kein Abfall, keine Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 6. COMPLETE SET PLUS
  {
    id: 'complete-set-plus',
    name: 'KOMPLETTSET PLUS',
    subtitle: 'Für das ganze Haus',
    slug: 'complete-set-plus',
    priceKey: 'mam-nature-water-treatment-complete-set-plus',
    image: '/images/products/autobackwash/complete_set_plus_aqmos_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Aus medizinischem Edelstahl, 10 Jahre Garantie.",
      "Beinhaltet den Dynamizer für revitalisiertes und strukturiertes Wasser.",
      "Außergewöhnliches Wasser im ganzen Haus.",
      "Wandelt Kalk um, filtert Partikel und Schadstoffe (95-99%).",
      "Kein Strom, kein Abfall, keine Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  // 7. WATER PARTICLE FILTER
  {
    id: 'particle-filter',
    name: 'WASSER PARTIKELFILTER',
    subtitle: 'Einzelkomponente',
    slug: 'particles-filter',
    priceKey: 'water-particle-filter',
    image: '/images/products/particle_filter/particle_filter_auto_backwash_front.webp',
    imageHeight: 320,
    features: [
      "Die erste Schutzlinie Ihres Systems.",
      "Eliminiert Sand und Ablagerungen mit automatischer Rückspülung. Ohne Wartung."
    ]
  },
  // 8. WATER LIME
  {
    id: 'water-lime',
    name: 'WASSER LIME',
    subtitle: 'Anti-Kalk-Lösung',
    slug: 'water-lime',
    priceKey: 'mam-nature-water-lime',
    image: '/images/WEBSITE-P/products/water_lime_vertical.webp',
    imageHeight: 320,
    features: [
      "Physikalische Umwandlung von Kalk.",
      "Schützt Haushaltsgeräte.",
      "Erhält gesundes Calcium und Magnesium.",
      "Null Salz, null Strom, null Chemie.",
      "Unbegrenzte Kapazität."
    ]
  },
  // 9. THE SWISS WATER DYNAMIZER
  {
    id: 'dynamizer',
    name: 'DER SWISS WATER DYNAMIZER',
    subtitle: 'Einzelkomponente',
    slug: 'dynamizer',
    priceKey: 'the-swiss-water-dynamizer',
    image: '/images/WEBSITE-P/products/DYNAMIZER.webp',
    imageHeight: 320,
    features: [
      "100% physikalische Wirkung zur Wiederherstellung positiver Eigenschaften von Leitungswasser.",
      "Revitalisiert und rekonstruiert Wasser auf molekularer Ebene.",
      "Sorgt für optimal hydrierte Zellen und extrem angenehmen Geschmack.",
      "Garantierte Hydratation ohne Strom oder Austausch."
    ]
  },
  // 10. PARTICLE & LIME SET
  {
    id: 'particle-lime-set',
    name: 'PARTIKEL & KALK SET',
    subtitle: 'Schutz vor Sedimenten + Kalk',
    slug: 'particle-lime-set',
    priceKey: 'mam-nature-particle-lime-set',
    image: '/images/products/particle_filter/water_lime_particle_filter_auto_backwash.webp',
    imageHeight: 300,
    features: [
      "Doppelter Schutz für Leitungen und Geräte.",
      "Stoppt Sand und Rost mit automatischer Rückspülung.",
      "Kein Salz, keine Chemie, kein Abfall.",
      "Wartungsfreier Kalkschutz."
    ]
  },
  // 11. SWISS HYDROGEN BOOSTER
  {
    id: 'hydrogen-booster',
    name: 'SWISS HYDROGEN BOOSTER',
    subtitle: 'Medizinprodukt Klasse 1',
    slug: 'hydrogen-booster',
    priceKey: 'swiss-hydrogen-booster',
    image: '/images/WEBSITE-P/products/HYDROGEEN_BOOSTER.webp',
    imageHeight: 320,
    features: [
      "Höchste Konzentration auf dem Markt: 7500 ppb molekularer Wasserstoff.",
      "Schnelles Aufladen in nur 1 Stunde.",
      "Bis zu 15 Anwendungen mit einer Aufladung.",
      "Tragbar und einfach, um freie Radikale zu bekämpfen."
    ]
  },
  // 12. SWISS WATER CARTRIDGE
  {
    id: 'cartridge',
    name: 'SWISS KARTUSCHE',
    subtitle: 'Ersatzkartusche',
    slug: 'cartridge',
    priceKey: 'water-fine-filter-cartridge',
    image: '/images/WEBSITE-P/products/cartridge.webp',
    imageHeight: 320,
    features: [
      "Ersatzkartusche für Ihren Wasserfeinfilter nach max. 150 m³ bzw. 1 Jahr.",
      "Entfernt unzählige Schadstoffe wie PFAS, Schwermetalle etc.",
      "Einfache und werkzeuglose Installation."
    ]
  }
];

const CONTENT_UI = {
  en: {
    headerTitle: "All Products",
    headerDesc: "Discover our cutting-edge solutions designed in Switzerland for pure and healthy water at your home.",
    sortName: "Sort by Name",
    sortNameAZ: "Name: A-Z",
    sortNameZA: "Name: Z-A",
    sortPrice: "Sort by Price",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    layoutTitle: "Our Products"
  },
  fr: {
    headerTitle: "Tous les produits",
    headerDesc: "Découvrez nos solutions de pointe conçues en Suisse pour une eau pure et saine à la maison.",
    sortName: "Trier par Nom",
    sortNameAZ: "Nom : A-Z",
    sortNameZA: "Nom : Z-A",
    sortPrice: "Trier par Prix",
    sortPriceLow: "Prix : Croissant",
    sortPriceHigh: "Prix : Décroissant",
    layoutTitle: "Nos Produits"
  },
  de: {
    headerTitle: "Alle Produkte",
    headerDesc: "Entdecken Sie unsere in der Schweiz entwickelten Lösungen für reines und gesundes Wasser zu Hause.",
    sortName: "Nach Name sortieren",
    sortNameAZ: "Name: A-Z",
    sortNameZA: "Name: Z-A",
    sortPrice: "Nach Preis sortieren",
    sortPriceLow: "Preis: Aufsteigend",
    sortPriceHigh: "Preis: Absteigend",
    layoutTitle: "Unsere Produkte"
  }
};

export default function ProductsGrid() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const products = isFrench ? PRODUCTS_FR : language === 'de' ? PRODUCTS_DE : PRODUCTS_EN;
  const ui = CONTENT_UI[language as keyof typeof CONTENT_UI] || CONTENT_UI.en;

  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    setSortedProducts(products);
  }, [language, products]);

  const handleSortName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const sorted = [...sortedProducts];
    if (value === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (value === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    else {
      setSortedProducts(products);
      return;
    }
    setSortedProducts(sorted);
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1>{ui.headerTitle}</h1>
          <p>{ui.headerDesc}</p>
        </div>

        <div className={styles.filterControls}>
          <select className={styles.filterSelect} onChange={handleSortName}>
            <option value="default">{ui.sortName}</option>
            <option value="name-asc">{ui.sortNameAZ}</option>
            <option value="name-desc">{ui.sortNameZA}</option>
          </select>
          <select className={styles.filterSelect}>
            <option value="default">{ui.sortPrice}</option>
            <option value="price-asc">{ui.sortPriceLow}</option>
            <option value="price-desc">{ui.sortPriceHigh}</option>
          </select>
        </div>

        <h2 className={styles.layoutTitle}>{ui.layoutTitle}</h2>

        <div className={styles.grid}>
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}