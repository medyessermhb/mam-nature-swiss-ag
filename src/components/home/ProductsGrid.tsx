'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProductsGrid.module.css';
import ProductCard, { ProductType } from './ProductCard';
import { useLanguage } from '@/context/LanguageContext';

// Standard Lifestyle Slider Groups for whole-house systems
const SHARED_SLIDER_GROUPS = [
  {
    img1: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/composents/SHOWER.webp",
    img2: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/composents/WATER%20DRINKING.webp"
  },
  {
    img1: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/composents/TEETH.webp",
    img2: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/composents/WASHING%20VEGIES.webp"
  },
  {
    img1: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/composents/COFFEE.webp",
    img2: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/composents/WASHING%20MACHINE.webp"
  }
];

// --- DATA DEFINITION (ENGLISH) ---
const PRODUCTS_EN: ProductType[] = [
  {
    id: 'mam-nature-essential-set',
    name: 'THE ESSENTIAL',
    subtitle: 'Water Fine Filter',
    slug: 'essential',
    priceKey: 'mam-nature-essential-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/FINE%20FILTER.webp',
    imageHeight: 300,
    features: [
      "Medical-grade stainless steel construction.",
      "Selective filtration: removes microplastics and heavy metals.",
      "Preserves essential minerals and trace elements.",
      "Purifies water naturally, no electricity or chemicals.",
      "Compact design for easy installation."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'mam-nature-essential-plus',
    name: 'THE ESSENTIAL PLUS',
    subtitle: 'Fine Filter + Particle Filter',
    slug: 'essential-plus',
    priceKey: 'mam-nature-essential-plus',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/FINE%20FILTER.webp',
    imageHeight: 300,
    features: [
      "Dual protection: physical and selective filtration.",
      "Pre-filters sand, rust, and large sediments.",
      "Eliminates chlorine, pesticides, and heavy metals.",
      "Protects both your health and your home's plumbing.",
      "Casing covered by a 10-year warranty."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'eco-set',
    name: 'ECO SET',
    subtitle: 'For the whole house',
    slug: 'eco-set',
    priceKey: 'mam-nature-eco-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET.webp',
    imageHeight: 320,
    features: [
      "Complete whole-house solution.",
      "Treats: particles, limescale, and contaminants.",
      "Medical-grade stainless steel, 10-year warranty.",
      "Exceptional water for showering, drinking, and cooking.",
      "Maintenance: one cartridge per year."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'eco-set-plus',
    name: 'ECO SET PLUS',
    subtitle: 'For the whole house',
    slug: 'eco-set-plus',
    priceKey: 'mam-nature-eco-set-plus',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET%20PLUS.webp',
    imageHeight: 300,
    features: [
      "Advanced whole-house treatment system.",
      "Enhanced filtration performance.",
      "Protects pipes and appliances from scale.",
      "Natural purification without electricity.",
      "Includes premium medical-grade housing."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'complete-set',
    name: 'COMPLETE SET',
    subtitle: 'For the whole house',
    slug: 'complete-set',
    priceKey: 'mam-nature-water-treatment-complete-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET.webp',
    imageHeight: 320,
    features: [
      "Includes the Dynamizer for revitalized water.",
      "Restructures water at a molecular level.",
      "Exceptional taste and easy to digest.",
      "Protects the entire home from scale and rust.",
      "Durable stainless steel, lifetime design."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'complete-set-plus',
    name: 'COMPLETE SET PLUS',
    subtitle: 'For the whole house',
    slug: 'complete-set-plus',
    priceKey: 'mam-nature-water-treatment-complete-set-plus',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET%20PLUS.webp',
    imageHeight: 300,
    features: [
      "The most advanced water treatment solution.",
      "Full revitalizing and restructure technology.",
      "Maximum removal of all contaminants.",
      "Perfect for high-demand households.",
      "Zero maintenance scale prevention included."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'particle-lime-set',
    name: 'PARTICLE & LIME SET',
    subtitle: 'Sediment + Scale Protection',
    slug: 'particle-lime-set',
    priceKey: 'mam-nature-particle-lime-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp',
    imageHeight: 300,
    features: [
      "Dual protection for plumbing and appliances.",
      "Stops sand and rust with automatic backwash.",
      "Converts hard limescale into soft aragonite.",
      "Zero salt, zero chemicals, zero waste.",
      "No maintenance needed for scale protection."
    ]
  },
  {
    id: 'dynamizer',
    name: 'THE SWISS WATER DYNAMIZER',
    subtitle: 'Water Revitalizer',
    slug: 'dynamizer',
    priceKey: 'the-swiss-water-dynamizer',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp',
    imageHeight: 320,
    features: [
      "Restores natural water properties.",
      "Revitalizes water at a molecular level.",
      "Prevents scaling in pipes.",
      "Exceptional taste, easy to digest.",
      "No maintenance or electricity."
    ]
  },
  {
    id: 'water-lime',
    name: 'WATER LIME',
    subtitle: 'Anti-Limescale Solution',
    slug: 'water-lime',
    priceKey: 'mam-nature-water-lime',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/water%20lime%20vertical.webp',
    imageHeight: 320,
    features: [
      "Physical conversion of limescale.",
      "Protects household appliances.",
      "Retains healthy calcium and magnesium.",
      "Zero salt, zero electricity, zero chemicals.",
      "Unlimited capacity lifespan."
    ]
  },
  {
    id: 'hydrogen-booster',
    name: 'SWISS HYDROGEN BOOSTER',
    subtitle: 'Class 1 Medical Device',
    slug: 'hydrogen-booster',
    priceKey: 'swiss-hydrogen-booster',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/HYDROGEEN%20BOOSTER.webp',
    imageHeight: 320,
    features: [
      "Enrich your water with molecular hydrogen.",
      "Fast recharge and ultra-fine bubbles.",
      "Components compliant with food safety.",
      "Portable and easy to use.",
      "Rechargeable battery (150-min life)."
    ]
  },
  {
    id: 'fine-filter',
    name: 'WATER FINE FILTER',
    subtitle: 'Filtration Housing',
    slug: 'fine-filter',
    priceKey: 'mam-nature-water-fine-filter',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/FINE%20FILTER.webp',
    imageHeight: 320,
    features: [
      "Medical-grade stainless steel casing.",
      "Eliminates chlorine, heavy metals, and PFAS.",
      "High-pressure resistant design.",
      "Quick and easy installation."
    ]
  },
  {
    id: 'particle-filter',
    name: 'WATER PARTICLE FILTER',
    subtitle: 'Sediment Pre-filter',
    slug: 'particles-filter',
    priceKey: 'mam-nature-water-particle-filter',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp',
    imageHeight: 320,
    features: [
      "Eliminates sand, rust, and sediments.",
      "Automatic backwash valve.",
      "No consumables or maintenance.",
      "Protects entire plumbing system."
    ]
  },
  {
    id: 'cartridge',
    name: 'SWISS WATER CARTRIDGE',
    subtitle: 'Replacement Cartridge',
    slug: 'cartridge',
    priceKey: 'mam-nature-water-fine-filter---cartridge',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/CARTRIDGE.webp',
    imageHeight: 320,
    features: [
      "Annual replacement for Fine Filter.",
      "Maintains optimal filtration performance.",
      "Unique Swiss-engineered filtration fibers.",
      "Tool-free replacement in 10 minutes."
    ]
  }
];

// --- DATA DEFINITION (FRENCH) ---
const PRODUCTS_FR: ProductType[] = [
  {
    id: 'mam-nature-essential-set',
    name: 'L’ESSENTIEL',
    subtitle: 'Filtre à Eau Fin',
    slug: 'essentiel',
    priceKey: 'mam-nature-essential-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/FINE%20FILTER.webp',
    imageHeight: 300,
    features: [
      "Construction robuste en acier inoxydable médical.",
      "Filtration sélective : élimine microplastiques et métaux lourds.",
      "Préserve les minéraux et oligo-éléments essentiels.",
      "Purifie naturellement sans électricité ni chimie.",
      "Design compact pour une installation facile."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'mam-nature-essential-plus',
    name: 'L’ESSENTIEL PLUS',
    subtitle: 'Filtre Fin + Filtre à Particules',
    slug: 'essentiel-plus',
    priceKey: 'mam-nature-essential-plus',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/FINE%20FILTER.webp',
    imageHeight: 300,
    features: [
      "Double protection : filtration physique et sélective.",
      "Pré-filtre le sable, la rouille et les gros sédiments.",
      "Élimine le chlore, les pesticides et les métaux lourds.",
      "Protège votre santé et la plomberie de votre maison.",
      "Boîtier couvert par une garantie de 10 ans."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'eco-set',
    name: 'ECO SET',
    subtitle: 'Pour toute la maison',
    slug: 'eco-set',
    priceKey: 'mam-nature-eco-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET.webp',
    imageHeight: 320,
    features: [
      "Solution complète pour toute la maison.",
      "Traite : particules, calcaire et contaminants.",
      "Inox médical, garantie 10 ans.",
      "Eau d'exception : douche, boisson et cuisine.",
      "Entretien : une cartouche par an."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'eco-set-plus',
    name: 'ECO SET PLUS',
    subtitle: 'Pour toute la maison',
    slug: 'eco-set-plus',
    priceKey: 'mam-nature-eco-set-plus',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET%20PLUS.webp',
    imageHeight: 300,
    features: [
      "Système de traitement avancé pour toute la maison.",
      "Performance de filtration accrue.",
      "Protège les tuyaux et appareils du calcaire.",
      "Purification naturelle sans électricité.",
      "Inclus un boîtier robuste en inox médical."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'complete-set',
    name: 'COMPLETE SET',
    subtitle: 'Pour toute la maison',
    slug: 'complete-set',
    priceKey: 'mam-nature-water-treatment-complete-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET.webp',
    imageHeight: 320,
    features: [
      "Inclut le Dynamizer pour une eau revitalisée.",
      "Restructure l'eau au niveau moléculaire.",
      "Goût exceptionnel et remarquablement digeste.",
      "Protège toute la maison du tartre et de la rouille.",
      "Inox médical durable, conçu pour la vie."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'complete-set-plus',
    name: 'COMPLETE SET PLUS',
    subtitle: 'Pour toute la maison',
    slug: 'complete-set-plus',
    priceKey: 'mam-nature-water-treatment-complete-set-plus',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET%20PLUS.webp',
    imageHeight: 300,
    features: [
      "La solution de traitement d'eau la plus avancée.",
      "Technologie complète de revitalisation.",
      "Élimination maximale de tous les contaminants.",
      "Idéal pour les foyers exigeants.",
      "Protection anticalcaire sans entretien incluse."
    ],
    sliderGroups: SHARED_SLIDER_GROUPS
  },
  {
    id: 'particle-lime-set',
    name: 'SET PARTICULES & CALCAIRE',
    subtitle: 'Sédiments + Protection Tartre',
    slug: 'set-particules-calcaire',
    priceKey: 'mam-nature-particle-lime-set',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp',
    imageHeight: 300,
    features: [
      "Double protection plomberie et appareils.",
      "Arrête sable et rouille (rétrolavage automatique).",
      "Convertit le calcaire en aragonite douce.",
      "Écologique : zéro sel, zéro chimie, zéro déchet.",
      "Protection anticalcaire sans aucun entretien."
    ]
  },
  {
    id: 'dynamizer',
    name: 'THE SWISS WATER DYNAMIZER',
    subtitle: 'Revitaliseur d\'Eau',
    slug: 'dynamizer',
    priceKey: 'the-swiss-water-dynamizer',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp',
    imageHeight: 320,
    features: [
      "Restitue à l'eau toutes ses propriétés naturelles.",
      "Revitalise l'eau au niveau moléculaire.",
      "Prévient l'entartrage des canalisations.",
      "Goût exceptionnel et digeste.",
      "Sans entretien ni électricité."
    ]
  },
  {
    id: 'water-lime',
    name: 'WATER LIME',
    subtitle: 'Solution Anti-Calcaire',
    slug: 'water-lime',
    priceKey: 'mam-nature-water-lime',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/water%20lime%20vertical.webp',
    imageHeight: 320,
    features: [
      "Conversion physique du tartre.",
      "Protège les appareils électroménagers.",
      "Préserve le calcium et le magnésium.",
      "Zéro sel, zéro électricité, zéro chimie.",
      "Capacité de durée de vie illimitée."
    ]
  },
  {
    id: 'hydrogen-booster',
    name: 'SWISS HYDROGEN BOOSTER',
    subtitle: 'Dispositif Médical Classe 1',
    slug: 'hydrogen-booster',
    priceKey: 'swiss-hydrogen-booster',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/HYDROGEEN%20BOOSTER.webp',
    imageHeight: 320,
    features: [
      "Enrichissez votre eau en hydrogène moléculaire.",
      "Recharge rapide et bulles ultra-fines.",
      "Composants conformes aux normes alimentaires.",
      "Portable et simple d'utilisation.",
      "Batterie rechargeable (150 min d'autonomie)."
    ]
  },
  {
    id: 'fine-filter',
    name: 'WATER FINE FILTER',
    subtitle: 'Boîtier de Filtration',
    slug: 'fine-filter',
    priceKey: 'mam-nature-water-fine-filter',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/FINE%20FILTER.webp',
    imageHeight: 320,
    features: [
      "Boîtier en acier inoxydable médical.",
      "Élimine chlore, métaux lourds et PFAS.",
      "Conçu pour résister à la haute pression.",
      "Installation simple et rapide."
    ]
  },
  {
    id: 'particle-filter',
    name: 'WATER PARTICLE FILTER',
    subtitle: 'Pré-filtre à Sédiments',
    slug: 'particles-filter',
    priceKey: 'mam-nature-water-particle-filter',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp',
    imageHeight: 320,
    features: [
      "Élimine sable, rouille et sédiments.",
      "Vanne de rétrolavage automatique.",
      "Sans consommables ni entretien.",
      "Protège toute l'installation de plomberie."
    ]
  },
  {
    id: 'cartridge',
    name: 'SWISS WATER CARTRIDGE',
    subtitle: 'Cartouche de Remplacement',
    slug: 'cartridge',
    priceKey: 'mam-nature-water-fine-filter---cartridge',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/CARTRIDGE.webp',
    imageHeight: 320,
    features: [
      "Remplacement annuel pour Fine Filter.",
      "Maintient une filtration optimale.",
      "Fibres de filtration suisses uniques.",
      "Remplacement sans outil en 10 minutes."
    ]
  }
];

const CONTENT_UI = {
  en: {
    headerTitle: "All Products",
    headerDesc: "Discover our cutting-edge solutions designed in Switzerland for pure and healthy water at home.",
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
  }
};

export default function ProductsGrid() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const products = isFrench ? PRODUCTS_FR : PRODUCTS_EN;
  const ui = isFrench ? CONTENT_UI.fr : CONTENT_UI.en;

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