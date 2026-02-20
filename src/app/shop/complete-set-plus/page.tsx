'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Minus, FileText,
  GlassWater, Utensils, Coffee, ShowerHead, CalendarCheck, ShieldCheck,
  Wrench, User, Ruler, Clock, X, TriangleAlert, CheckCircle, Infinity as InfinityIcon
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import Link from 'next/link';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context


// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-water-treatment-complete-set-plus';
const PRODUCT_NAME = "COMPLETE SET PLUS";

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    product: 'Product',
    usages: 'Usages',
    details: 'Technical Details',
    install: 'Installation',
    maint: 'Maintenance',
    reports: 'Reports'
  },
  product: {
    title: PRODUCT_NAME,
    btnAdd: 'Add to Cart',
    features: [
      "Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.",
      "Includes the Dynamizer for revitalized and restructured water",
      "Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…",
      "Converts limescale & treats particles and contaminants while preserving natural mineralization",
      "Purifies water naturally, no electricity, no waste, no chemicals.",
      "Maintenance: one cartridge per year, 10 minutes (no tools required)."
    ]
  },
  usages: {
    title: 'Perfect water for every use',
    desc: 'Enjoy pure, healthy, and revitalized water from every tap. Our system transforms your daily life by improving water quality for all your uses.',
    cards: [
      { title: 'Drinking', text: 'Pure spring water, free of contaminants', icon: GlassWater, img: '/images/WEBSITE-P/drinking_big.webp' },
      { title: 'Cooking', text: 'Reveal the flavours of your food and preserve its nutrients with water free of contaminants', icon: Utensils, img: '/images/WEBSITE-P/washing_big.webp' },
      { title: 'Tea & Coffee', text: 'Prepare your hot beverages with water free of contaminants', icon: Coffee, img: '/images/WEBSITE-P/coffee_big.webp' },
      { title: 'Shower & Bath', text: 'Protect your skin and hair with soft and contaminant free water for a feeling of smoothness.', icon: ShowerHead, img: '/images/WEBSITE-P/shower_big.webp' }
    ]
  },
  details: {
    title: 'Technical Details in 4 Steps',
    lime: {
      title: '1. WATER LIME',
      summary: 'Physical transformation of limestone to prevent scaling deposits. Unlimited capacity and maintenance-free.',
      content: {
        h4: 'Effective, durable, and effortless.',
        quote: 'Note: Limescale is nothing more than calcium and magnesium, which are essential to the biological balance of water. It is the scaling form that is problematic; a responsible treatment does not eliminate limestone, but softens it,, which prevents hard deposits while preserving the minerals and trace elements naturally present in the water.',
        challengeTitle: 'The challenge:',
        challenge: 'Calcite, the hard form of limestone in water, builds up deposits, causing technical (malfunctions and reduced lifespan of appliances) and aesthetic (dull surfaces) damage.',
        limitsTitle: 'The limits of traditional solutions:',
        limits: 'Salt-based water softeners exchange calcium and magnesium ions for sodium, removing minerals (demineralized water is dangerous to health), thus the composition and taste of the water are seriously altered, requires regular & expensive maintenance and causes an inadmissible bacterial load.',
        solutionTitle: 'Mam Nature Swiss® Water Lime: A physical conversion of limestone.',
        solution: 'Our device works not by removing limestone, but by modifying its crystalline structure through the action of permanent magnets. It converts Calcite (scaling form) into Aragonite (non-adhesive form).',
        benefitsTitle: 'The direct benefits:',
        benefitsList: [
          'Active protection: Reduction of solid deposits in pipes, water heaters, and appliances.',
          'Preserved water: preserves the taste, minerals, and trace elements naturally present in the water.',
          'Absolute simplicity, economical and ecological: No consumables (salt, cartridges), no energy, no water waste.'
        ],
        specs: 'Capacity: unlimited<br>Maintenance: None.'
      }
    },
    particle: {
      title: '2. WATER PARTICLE FILTER',
      summary: 'Filters sediments and suspended particles with automatic backwash and integrated pressure regulator.',
      content: {
        text: 'Particle filter with automatic backwash, pressure regulator, and 360° connector. Compact, fully integrated solution made from medical-grade materials (316L stainless steel).',
        specs: 'Capacity: unlimited<br>Maintenance: none (fully automated solution).'
      }
    },
    fine: {
      title: '3. WATER FINE FILTER',
      summary: 'Unique filtration technology eliminating PFAS, heavy metals, aluminium, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium & radioactive substances.',
      content: {
        text: 'Unique selective Whole-House Adsorption Filtration System:',
        list: [
          '1. Filter Media: Exclusive Mam Nature technology based on proteins fibers (combined with activated carbon) for the most complete & world unique adsorption filtration',
          '2. Sterile cartridge: Sterility (by copper & iron hydroxide) in the cartridge without sterilizing agents entering the drinking water.'
        ],
        reduces: 'Reduces Chlorine, Pesticides, PFAS, Drug Residues, Phenol, Heavy Metals, Aluminium, Microplastics & including radioactive substances at a reduction rate of 95 - 99.9 % at large volumes of 2000 litres/hour.'
      }
    },
    cartridge: {
      title: 'CARTRIDGE',
      summary: 'Patented technology that eliminates contaminants while preserving essential minerals.',
      content: {
        h4: 'The Swiss Water Cartridge',
        text1: 'Mam Nature Swiss® – Solving the impossible: Perfectly filtered, soft, and naturally mineralized water.',
        text2: 'The « SWISS WATER CARTRIDGE » : BEYOND FILTRATION – A TRUE PROTECTION UNMATCHED CONTAMINANT RENTENTION ',
        text3: 'Our 100% natural filtration technology, exclusive to Mam Nature Swiss®, combines natural protein fibers with activated carbon to achieve total adsorption, a world first. It eliminates contaminants while preserving minerals and trace elements being naturally present in water. Owing to its selective filtration system by full adsorption, this patented Swiss invention is the world unique universal solution, 100% natural, capable of eliminating PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium, etc. - and even radioactive substances found in nuclear water.',
        specs: 'Flow rate: up to 1800 liters/hour.<br>Filter cartridge capacity (lifespan): 150m³<br>Maintenance: 10 minutes once per year (simple and no tools required).'
      }
    },
    dynamizer: {
      title: '4. THE SWISS WATER DYNAMIZER',
      summary: 'Revitalizes water for better hydration and transforms limescale.',
      problemTitle: 'The Problem with Modern Water',
      prob1: { title: 'Low cellular bioavailability', text: 'Industrial treatments and demineralization alter the molecular structure of water, creating “large water molecule clusters” that cells hardly absorb.' },
      prob2: { title: 'Destructured water', text: 'In its natural state, high-quality water has a perfect hexagonal structure, key to optimal hydration. This structure, vital for our body, is unfortunately destroyed on its journey to our tap.' },
      solutionTitle: 'The Solution',
      sol1: { title: 'Restructuring & Revitalization', text: 'Breaks large water molecule clusters into micro-clusters, making water highly bioavailable for cells. At the same time, it transmits natural frequencies and harmonious vibrations, restoring the natural hexagonal structure of water.' },
      sol2: { title: 'Limestone Transformation', text: 'Through permanent magnets and extreme turbulence, it converts hard Calcite (responsible for deposits) into soft Aragonite. This form of limestone is non-scaling, thus protecting your appliances and pipes without altering the water\'s taste.' },
      sol3: { title: 'Long-Term stabilization', text: 'Dynamized water gains a biologically stable structure that lasts over time.' },
      pipeStraight: { title: 'Straight water pipe:', text: 'Water clusters and loses its biophysical power.' },
      pipeSpiral: { title: 'Spiral water pipe:', text: 'Molecular clusters are dissolved and the water regains its biophysical power.' },
      benefitsTitle: 'Daily benefits',
      benefit1: { title: 'Exceptional taste', text: 'Discover an incredibly soft, remarkably digestible and pleasant water.' },
      benefit2: { title: 'Optimal cellular hydration', text: 'Supports proper body function and reduces acidity, a source of many imbalances.' },
      benefit3: { title: 'Natural limescale protection', text: 'Naturally protects your appliances and surfaces without using salt or chemicals.' },
      benefit4: { title: 'Unmatched performance', text: 'With a processing capacity of 5,000 liters/hour, the dynamizer meets the needs of the entire house.' },
      specs: { cap: 'Capacity: Unlimited', maint: 'Maintenance: None' }
    }
  },
  install: {
    title: 'Simple & guided Installation',
    introTitle: 'Designed for efficient setup',
    introText: 'The Mam Nature system is designed for quick installation by a qualified plumber. It is placed just after your water meter to treat your entire home.',
    neededTitle: 'What you need',
    neededList: [
      'A professional plumber',
      'Space required: 80cm (H) x 80cm (L)',
      'Standard plumbing tools',
      'Estimated time: 2 to 3 hours'
    ]
  },
  maint: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Simplified Maintenance',
    maintText: 'The only maintenance is replacing the filter cartridge once a year. A simple 10-minute operation, possible without tools.',
    btnOrder: 'Order a cartridge',
    warrantyTitle: 'Excellence Warranty',
    warrantyYears: '10 YEARS',
    warrantyText: 'Water carrying part made of durable medical-grade stainless steel.'
  },
  reports: {
    title: 'Test Reports & Certificates',
    list: [
      { title: "Filtration Performance Report" },
      { title: "Swiss Safety System Certificate" },
      { title: "ISO Certificate" }
    ]
  }
};

const CONTENT_FR = {
  nav: {
    product: 'Produit',
    usages: 'Usages',
    details: 'Détails Techniques',
    install: 'Installation',
    maint: 'Entretien',
    reports: 'Rapports'
  },
  product: {
    title: PRODUCT_NAME,
    btnAdd: 'Ajouter au panier',
    features: [
      "Fabriqué en inox médical, garantie 10 ans, conçu pour durer toute la vie",
      "Inclut le Dynamizer pour une eau revitalisée et restructurée",
      "Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…",
      "Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle",
      "Sans électricité, sans gaspillage et sans chimie",
      "Une seule cartouche par année, 10 minutes (sans outil)"
    ]
  },
  usages: {
    title: 'Une eau parfaite pour chaque usage',
    desc: 'Profitez d\'une eau pure, saine et revitalisée à chaque robinet. Notre système transforme votre quotidien en améliorant la qualité de l\'eau pour toutes vos utilisations.',
    cards: [
      { title: 'Boisson', text: 'Une eau de source pure et revitalisée, débarrassée des impuretés.', icon: GlassWater, img: '/images/WEBSITE-P/drinking_big.webp' },
      { title: 'Cuisine', text: 'Révélez les saveurs de vos aliments et préservez leurs nutriments.', icon: Utensils, img: '/images/WEBSITE-P/washing_big.webp' },
      { title: 'Thé & Café', text: 'Libérez tout le potentiel aromatique de vos boissons chaudes.', icon: Coffee, img: '/images/WEBSITE-P/coffee_big.webp' },
      { title: 'Douche & Bain', text: 'Protégez votre peau et vos cheveux du calcaire pour une sensation de douceur.', icon: ShowerHead, img: '/images/WEBSITE-P/shower_big.webp' }
    ]
  },
  details: {
    title: 'Technical Details in 4 Steps',
    lime: {
      title: '1. WATER LIME',
      summary: 'Physical transformation of limestone to prevent scaling deposits. Unlimited capacity and maintenance-free.',
      content: {
        h4: 'Effective, durable, and effortless.',
        quote: 'Note: Limescale is nothing more than calcium and magnesium, which are essential to the biological balance of water. It is the scaling form that is problematic; a responsible treatment does not eliminate limestone, but softens it,, which prevents hard deposits while preserving the minerals and trace elements naturally present in the water.',
        challengeTitle: 'The challenge:',
        challenge: 'Calcite, the hard form of limestone in water, builds up deposits, causing technical (malfunctions and reduced lifespan of appliances) and aesthetic (dull surfaces) damage.',
        limitsTitle: 'The limits of traditional solutions:',
        limits: 'Salt-based water softeners exchange calcium and magnesium ions for sodium, removing minerals (demineralized water is dangerous to health), thus the composition and taste of the water are seriously altered, requires regular & expensive maintenance and causes an inadmissible bacterial load.',
        solutionTitle: 'Mam Nature Swiss® Water Lime: A physical conversion of limestone.',
        solution: 'Our device works not by removing limestone, but by modifying its crystalline structure through the action of permanent magnets. It converts Calcite (scaling form) into Aragonite (non-adhesive form).',
        benefitsTitle: 'The direct benefits:',
        benefitsList: [
          'Active protection: Reduction of solid deposits in pipes, water heaters, and appliances.',
          'Preserved water: preserves the taste, minerals, and trace elements naturally present in the water.',
          'Absolute simplicity, economical and ecological: No consumables (salt, cartridges), no energy, no water waste.'
        ],
        specs: 'Capacity: unlimited<br>Maintenance: None.'
      }
    },
    particle: {
      title: '2. WATER PARTICLE FILTER',
      summary: 'Filters sediments and suspended particles with automatic backwash and integrated pressure regulator.',
      content: {
        text: 'Particle filter with automatic backwash, pressure regulator, and 360° connector. Compact, fully integrated solution made from medical-grade materials (316L stainless steel).',
        specs: 'Capacity: unlimited<br>Maintenance: none (fully automated solution).'
      }
    },
    fine: {
      title: '3. WATER FINE FILTER',
      summary: 'Unique filtration technology eliminating PFAS, heavy metals, aluminium, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium & radioactive substances.',
      content: {
        text: 'Unique selective Whole-House Adsorption Filtration System:',
        list: [
          '1. Filter Media: Exclusive Mam Nature technology based on proteins fibers (combined with activated carbon) for the most complete & world unique adsorption filtration',
          '2. Sterile cartridge: Sterility (by copper & iron hydroxide) in the cartridge without sterilizing agents entering the drinking water.'
        ],
        reduces: 'Reduces Chlorine, Pesticides, PFAS, Drug Residues, Phenol, Heavy Metals, Aluminium, Microplastics & including radioactive substances at a reduction rate of 95 - 99.9 % at large volumes of 2000 litres/hour.'
      }
    },
    cartridge: {
      title: 'CARTRIDGE',
      summary: 'Patented technology that eliminates contaminants while preserving essential minerals.',
      content: {
        h4: 'The Swiss Water Cartridge',
        text1: 'Mam Nature Swiss® – Solving the impossible: Perfectly filtered, soft, and naturally mineralized water.',
        text2: 'The « SWISS WATER CARTRIDGE » : BEYOND FILTRATION – A TRUE PROTECTION UNMATCHED CONTAMINANT RENTENTION ',
        text3: 'Our 100% natural filtration technology, exclusive to Mam Nature Swiss®, combines natural protein fibers with activated carbon to achieve total adsorption, a world first. It eliminates contaminants while preserving minerals and trace elements being naturally present in water. Owing to its selective filtration system by full adsorption, this patented Swiss invention is the world unique universal solution, 100% natural, capable of eliminating PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium, etc. - and even radioactive substances found in nuclear water.',
        specs: 'Flow rate: up to 1800 liters/hour.<br>Filter cartridge capacity (lifespan): 150m³<br>Maintenance: 10 minutes once per year (simple and no tools required).'
      }
    },
    dynamizer: {
      title: '4. THE SWISS WATER DYNAMIZER',
      summary: 'Revitalizes water for better hydration and transforms limescale.',
      problemTitle: 'The Problem with Modern Water',
      prob1: { title: 'Low cellular bioavailability', text: 'Industrial treatments and demineralization alter the molecular structure of water, creating “large water molecule clusters” that cells hardly absorb.' },
      prob2: { title: 'Destructured water', text: 'In its natural state, high-quality water has a perfect hexagonal structure, key to optimal hydration. This structure, vital for our body, is unfortunately destroyed on its journey to our tap.' },
      solutionTitle: 'The Solution',
      sol1: { title: 'Restructuring & Revitalization', text: 'Breaks large water molecule clusters into micro-clusters, making water highly bioavailable for cells. At the same time, it transmits natural frequencies and harmonious vibrations, restoring the natural hexagonal structure of water.' },
      sol2: { title: 'Limestone Transformation', text: 'Through permanent magnets and extreme turbulence, it converts hard Calcite (responsible for deposits) into soft Aragonite. This form of limestone is non-scaling, thus protecting your appliances and pipes without altering the water\'s taste.' },
      sol3: { title: 'Long-Term stabilization', text: 'Dynamized water gains a biologically stable structure that lasts over time.' },
      pipeStraight: { title: 'Straight water pipe:', text: 'Water clusters and loses its biophysical power.' },
      pipeSpiral: { title: 'Spiral water pipe:', text: 'Molecular clusters are dissolved and the water regains its biophysical power.' },
      benefitsTitle: 'Daily benefits',
      benefit1: { title: 'Exceptional taste', text: 'Discover an incredibly soft, remarkably digestible and pleasant water.' },
      benefit2: { title: 'Optimal cellular hydration', text: 'Supports proper body function and reduces acidity, a source of many imbalances.' },
      benefit3: { title: 'Natural limescale protection', text: 'Naturally protects your appliances and surfaces without using salt or chemicals.' },
      benefit4: { title: 'Unmatched performance', text: 'With a processing capacity of 5,000 liters/hour, the dynamizer meets the needs of the entire house.' },
      specs: { cap: 'Capacity: Unlimited', maint: 'Maintenance: None' }
    }
  },
  install: {
    title: 'Installation Simple & Guidée',
    introTitle: 'Conçu pour une mise en place efficace',
    introText: 'Le système Mam Nature est pensé pour une installation rapide par un plombier qualifié. Il se place juste après votre compteur d\'eau pour traiter l\'ensemble de votre domicile.',
    neededTitle: 'Ce dont vous avez besoin',
    neededList: [
      'Un plombier professionnel',
      'Espace requis : 80cm (H) x 80cm (L)',
      'Outillage de plomberie standard',
      'Durée estimée : 2 à 3 heures'
    ]
  },
  maint: {
    title: 'Maintenance & Garantie',
    maintTitle: 'Maintenance Simplifiée',
    maintText: 'L\'unique entretien consiste à remplacer la cartouche filtrante une fois par an. Une opération simple de 10 minutes, réalisable sans outils.',
    btnOrder: 'Commander une cartouche',
    warrantyTitle: 'Garantie d\'Excellence',
    warrantyYears: '10 ANS',
    warrantyText: 'Fabriqué en inox médical durable, votre système est couvert par une garantie constructeur de 10 ans.'
  },
  reports: {
    title: 'Rapports de tests & Certificats',
    list: [
      { title: "Rapport de Performance" },
      { title: "Cértificat de Swiss Safety System" },
      { title: "ISO Certificate" }
    ]
  }
};

const CONTENT_DE = {
  nav: {
    product: 'Produkt',
    usages: 'Anwendungen',
    details: 'Technische Details',
    install: 'Installation',
    maint: 'Wartung',
    reports: 'Berichte'
  },
  product: {
    title: PRODUCT_NAME,
    btnAdd: 'In den Warenkorb',
    features: [
      "Aus medizinischem Edelstahl gefertigt, 10 Jahre Garantie, gebaut für ein ganzes Leben.",
      "Enthält den Dynamizer für revitalisiertes und restrukturiertes Wasser",
      "Außergewöhnliches Wasser im ganzen Haus: Duschen, Trinken, Kochen, Tee, Kaffee…",
      "Wandelt Kalk um und behandelt Partikel sowie Schadstoffe bei gleichzeitiger Erhaltung der natürlichen Mineralien",
      "Reinigt Wasser auf natürliche Weise, ohne Strom, ohne Abfall, ohne Chemie.",
      "Wartung: eine Kartusche pro Jahr, 10 Minuten (kein Werkzeug erforderlich)."
    ]
  },
  usages: {
    title: 'Perfektes Wasser für jeden Zweck',
    desc: 'Genießen Sie reines, gesundes und revitalisiertes Wasser an jedem Wasserhahn. Unser System verändert Ihren Alltag, indem es die Wasserqualität für all Ihre Anwendungen verbessert.',
    cards: [
      { title: 'Trinken', text: 'Reines Quellwasser, frei von Verunreinigungen', icon: GlassWater, img: '/images/WEBSITE-P/drinking_big.webp' },
      { title: 'Kochen', text: 'Entfalten Sie die Aromen Ihrer Speisen und bewahren Sie die Nährstoffe mit wasser frei von Verunreinigungen', icon: Utensils, img: '/images/WEBSITE-P/washing_big.webp' },
      { title: 'Tee & Kaffee', text: 'Bereiten Sie Ihre Heißgetränke mit wasser frei von Verunreinigungen zu', icon: Coffee, img: '/images/WEBSITE-P/coffee_big.webp' },
      { title: 'Dusche & Bad', text: 'Schützen Sie Ihre Haut und Haare mit weichem und schadstofffreiem Wasser für ein geschmeidiges Gefühl.', icon: ShowerHead, img: '/images/WEBSITE-P/shower_big.webp' }
    ]
  },
  details: {
    title: 'Technische Details in 4 Schritten',
    lime: {
      title: '1. WATER LIME',
      summary: 'Physikalische Umwandlung von Kalkstein zur Vermeidung hartnäckiger Ablagerungen. Unbegrenzte Kapazität und wartungsfrei.',
      content: {
        h4: 'Effektiv, langlebig und mühelos.',
        quote: 'Hinweis: Kalk ist nichts anderes als Kalzium und Magnesium, die für das biologische Gleichgewicht des Wassers wichtig sind. Nur die ausfallende Form ist problematisch; eine verantwortungsvolle Behandlung eliminiert den Kalk nicht, sondern erweicht ihn, was harte Ablagerungen verhindert und gleichzeitig die natürlich im Wasser vorkommenden Mineralien und Spurenelemente bewahrt.',
        challengeTitle: 'Die Herausforderung:',
        challenge: 'Calcit, die harte Form von Kalkstein im Wasser, bildet Ablagerungen, die technische (Fehlfunktionen und verkürzte Lebensdauer von Geräten) und ästhetische (stumpfe Oberflächen) Schäden verursachen.',
        limitsTitle: 'Die Grenzen traditioneller Lösungen:',
        limits: 'Salzbasierte Wasserenthärter tauschen Kalzium- und Magnesiumionen gegen Natrium aus und entfernen Mineralien (demineralisiertes Wasser ist gesundheitsgefährdend). Dadurch wird die Zusammensetzung und der Geschmack des Wassers ernsthaft beeinträchtigt, sie erfordern regelmäßige & teure Wartung und verursachen eine unzulässige Bakterienbelastung.',
        solutionTitle: 'Mam Nature Swiss® Water Lime: Eine physikalische Umwandlung von Kalk.',
        solution: 'Unser Gerät entfernt keinen Kalk, sondern verändert dessen Kristallstruktur durch die Wirkung von Permanentmagneten. Es wandelt Calcit (kalkbildend) in Aragonit (nicht haftend) um.',
        benefitsTitle: 'Die direkten Vorteile:',
        benefitsList: [
          'Aktiver Schutz: Reduzierung fester Ablagerungen in Rohren, Boilern und Geräten.',
          'Geschütztes Wasser: Erhält den Geschmack, die Mineralien und die Spurenelemente, die natürlich im Wasser vorhanden sind.',
          'Absolute Einfachheit, wirtschaftlich und ökologisch: Keine Verbrauchsmaterialien (Salz, Kartuschen), keine Energie, keine Wasserverschwendung.'
        ],
        specs: 'Kapazität: unbegrenzt<br>Wartung: Keine.'
      }
    },
    particle: {
      title: '2. WATER PARTICLE FILTER',
      summary: 'Filtert Sedimente und Schwebstoffe mit automatischer Rückspülung und integriertem Druckminderer.',
      content: {
        text: 'Partikelfilter mit automatischer Rückspülung, Druckminderer und 360°-Anschluss. Kompakte, voll integrierte Lösung aus medizinischem Material (Edelstahl 316L).',
        specs: 'Kapazität: unbegrenzt<br>Wartung: keine (vollautomatische Lösung).'
      }
    },
    fine: {
      title: '3. WATER FINE FILTER',
      summary: 'Einzigartige Filtrationstechnologie zur Eliminierung von PFAS, Schwermetallen, Aluminium, Chlor, Fluorid, Pestiziden, Medikamentenrückständen, Industriechemikalien, Arsen, Cadmium, Chrom & radioaktiven Substanzen.',
      content: {
        text: 'Einzigartiges selektives Haus-Adsorptions-Filtrationssystem:',
        list: [
          '1. Filtermedium: Exklusive Mam Nature Technologie, basierend auf Proteinfasern (in Kombination mit Aktivkohle) für die vollständigste & weltweit einzigartige Adsorptionsfiltration',
          '2. Sterile Kartusche: Sterilität (durch Kupfer- und Eisenhydroxid) in der Kartusche, ohne dass Sterilisationsmittel ins Trinkwasser gelangen.'
        ],
        reduces: 'Reduziert Chlor, Pestizide, PFAS, Medikamentenrückstände, Phenol, Schwermetalle, Aluminium, Mikroplastik & einschließlich radioaktiver Substanzen mit einer Reduktionsrate von 95 - 99,9 % bei großen Mengen von 2000 Litern/Stunde.'
      }
    },
    cartridge: {
      title: 'CARTRIDGE',
      summary: 'Patentierte Technologie, die Verunreinigungen eliminiert und wichtige Mineralien bewahrt.',
      content: {
        h4: 'The Swiss Water Cartridge',
        text1: 'Mam Nature Swiss® – Wir machen das Unmögliche möglich: Perfekt gefiltertes, weiches und natürlich mineralisiertes Wasser.',
        text2: 'Die « SWISS WATER CARTRIDGE » : MEHR ALS NUR FILTRATION – EIN WAHRER SCHUTZ MIT UNERREICHTER SCHADSTOFFRÜCKHALTUNG. ',
        text3: 'Unsere 100% natürliche Filtrationstechnologie, exklusiv bei Mam Nature Swiss®, kombiniert natürliche Proteinfasern mit Aktivkohle, um eine vollständige Adsorption zu erreichen – eine Weltneuheit. Sie eliminiert Verunreinigungen und bewahrt gleichzeitig die natürlich im Wasser vorkommenden Mineralien und Spurenelemente. Dank ihres selektiven Filtrationssystems durch vollständige Adsorption ist diese patentierte Schweizer Erfindung die weltweit einzige 100% natürliche Universallösung, die in der Lage ist, PFAS, Schwermetalle, Aluminium, Chlor, Fluorid, Pestizide, Medikamentenrückstände, Industriechemikalien, Arsen, Cadmium, Chrom usw. zu eliminieren – und sogar radioaktive Substanzen, die in nuklearem Wasser vorkommen.',
        specs: 'Durchflussrate: bis zu 1800 Liter/Stunde.<br>Filterkartuschen-Kapazität (Lebensdauer): 150m³<br>Wartung: 10 Minuten einmal pro Jahr (einfach und ohne Werkzeug).'
      }
    },
    dynamizer: {
      title: '4. THE SWISS WATER DYNAMIZER',
      summary: 'Revitalisiert Wasser für eine bessere Hydratation und wandelt Kalk um.',
      problemTitle: 'Das Problem mit modernem Wasser',
      prob1: { title: 'Geringe zelluläre Bioverfügbarkeit', text: 'Industrielle Behandlungen und Demineralisierung verändern die molekulare Struktur des Wassers und erzeugen "große Wassermolekül-Cluster", die von den Zellen kaum aufgenommen werden.' },
      prob2: { title: 'Destrukturiertes Wasser', text: 'Im Naturzustand hat hochwertiges Wasser eine perfekte hexagonale Struktur, der Schlüssel zu optimaler Hydratation. Diese für unseren Körper lebenswichtige Struktur wird auf ihrem Weg zu unserem Wasserhahn leider zerstört.' },
      solutionTitle: 'Die Lösung',
      sol1: { title: 'Umstrukturierung & Revitalisierung', text: 'Bricht große Wassermolekül-Cluster in Mikro-Cluster auf, wodurch Wasser für die Zellen hochgradig bioverfügbar wird. Gleichzeitig überträgt er natürliche Frequenzen und harmonische Schwingungen und stellt die natürliche hexagonale Struktur des Wassers wieder her.' },
      sol2: { title: 'Kalkumwandlung', text: 'Durch Permanentmagnete und extreme Turbulenz wandelt er harten Calcit (verantwortlich für Ablagerungen) in weichen Aragonit um. Diese Form des Kalks ist nicht kalkbildend und schützt Ihre Geräte und Rohrleitungen, ohne den Geschmack des Wassers zu verändern.' },
      sol3: { title: 'Langzeitstabilisierung', text: 'Dynamisiert Wasser erhält eine biologisch stabile Struktur, die über die Zeit anhält.' },
      pipeStraight: { title: 'Gerades Wasserrohr:', text: 'Wasser verklumpt und verliert seine biophysikalische Kraft.' },
      pipeSpiral: { title: 'Spiralförmiges Wasserrohr:', text: 'Molekül-Cluster werden aufgelöst und das Wasser gewinnt seine biophysikalische Kraft zurück.' },
      benefitsTitle: 'Tägliche Vorteile',
      benefit1: { title: 'Außergewöhnlicher Geschmack', text: 'Entdecken Sie unglaublich weiches, bemerkenswert bekömmliches und angenehmes Wasser.' },
      benefit2: { title: 'Optimale zelluläre Hydratation', text: 'Unterstützt die richtige Körperfunktion und reduziert die Säure, eine Quelle vieler Ungleichgewichte.' },
      benefit3: { title: 'Natürlicher Kalkschutz', text: 'Schützt natürlich Ihre Geräte und Oberflächen ohne Salz oder Chemikalien.' },
      benefit4: { title: 'Unerreichte Leistung', text: 'Mit einer Verarbeitungskapazität von 5.000 Litern/Stunde erfüllt der Dynamizer die Bedürfnisse des ganzen Hauses.' },
      specs: { cap: 'Kapazität: Unbegrenzt', maint: 'Wartung: Keine' }
    }
  },
  install: {
    title: 'Einfache & geführte Installation',
    introTitle: 'Für eine effiziente Einrichtung konzipiert',
    introText: 'Das Mam Nature System ist für eine schnelle Installation durch einen qualifizierten Klempner ausgelegt. Es wird direkt hinter Ihrem Wasserzähler platziert, um Ihr gesamtes Haus zu versorgen.',
    neededTitle: 'Was Sie benötigen',
    neededList: [
      'Einen professionellen Klempner',
      'Benötigter Platz: 80cm (H) x 80cm (L)',
      'Standard-Klempnerwerkzeuge',
      'Geschätzte Zeit: 2 bis 3 Stunden'
    ]
  },
  maint: {
    title: 'Wartung & Garantie',
    maintTitle: 'Vereinfachte Wartung',
    maintText: 'Die einzige Wartung ist der Austausch der Filterkartusche einmal im Jahr. Ein einfacher, 10-minütiger Vorgang, der ohne Werkzeug durchgeführt werden kann.',
    btnOrder: 'Kartusche bestellen',
    warrantyTitle: 'Exzellenz-Garantie',
    warrantyYears: '10 JAHRE',
    warrantyText: 'Der wasserführende Teil besteht aus langlebigem medizinischem Edelstahl.'
  },
  reports: {
    title: 'Prüfberichte & Zertifikate',
    list: [
      { title: "Leistungsbericht Filtration" },
      { title: "Zertifikat des Swiss Safety Systems" },
      { title: "ISO Zertifikat" }
    ]
  }
};

export default function CompleteSetPlusPage() {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState<Record<string, boolean>>({});
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES = [
    "/images/products/autobackwash/complete_set_plus_aqmos_auto_backwash.webp",
    "/images/WEBSITE-P/drinking_big.webp",
    "/images/WEBSITE-P/shower_big.webp",
    "/images/WEBSITE-P/coffee_big.webp"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Auto-scroll active nav item into view on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 991) {
      const activeNavLink = document.querySelector(`button[data-section="${activeSection}"]`);
      if (activeNavLink) {
        activeNavLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 150;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const toggleSubAccordion = (key: string) => {
    setActiveSubAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    const rawPrice = getRawPrice(PRODUCT_ID);
    const currencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

    addToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: rawPrice,
      currency: currencyCode,
      image: IMAGES[0]
    });
  };

  const reportUrls = [
    "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf",
    "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf",
    "/images/website-assets/certificates/ISO.pdf"
  ];

  return (
    <div className={styles.pageWrapper}>

      {/* SIDEBAR NAV */}
      <aside className={styles.stickyNav}>
        <nav>
          <ul className={styles.navList}>
            {[
              { id: 'produit', label: content.nav.product },
              { id: 'usages', label: content.nav.usages },
              { id: 'details', label: content.nav.details },
              { id: 'installation', label: content.nav.install },
              { id: 'maintenance', label: content.nav.maint },
              { id: 'rapports', label: content.nav.reports }
            ].map(item => (
              <li key={item.id}>
                <button
                  data-section={item.id}
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.contentArea}>

        {/* 1. PRODUCT SECTION */}
        <section id="produit" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['produit'] = el }}>
          <div className={styles.productGrid}>
            <div className={styles.productGallery}>
              <div className={styles.mainImageContainer}>
                <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {IMAGES.map((img, idx) => (
                    <img key={idx} src={img} alt={`Product ${idx}`} className={styles.sliderImage} />
                  ))}
                </div>
                <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide}><ChevronLeft /></button>
                <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide}><ChevronRight /></button>
              </div>
              <div className={styles.thumbnailList}>
                {IMAGES.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className={`${styles.thumbnail} ${idx === currentSlide ? styles.active : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    alt="thumbnail"
                  />
                ))}
              </div>
            </div>

            <div className={styles.productDetails}>
              <div className={styles.productInfoMobile}>
                <h1 className={styles.productTitle}>{content.product.title}</h1>
                <div className={styles.productPrice}>
                  {isLoading ? 'Loading...' : getPrice(PRODUCT_ID)}
                </div>
              </div>
              <div className={styles.cartForm}>
                <button
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                >
                  {content.product.btnAdd}
                </button>
              </div>
              <div className={styles.productShortDescription}>
                <ul>
                  {content.product.features.map((feature, idx) => (
                    <li key={idx}><span className={styles.featureIcon}>•</span>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. USAGES SECTION */}
        <section id="usages" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['usages'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.usages.title}</h2></div>
          <p style={{ marginBottom: '2rem' }}>{content.usages.desc}</p>
          <div className={styles.usagesGrid}>
            {content.usages.cards.map((card, idx) => (
              <div key={idx} className={styles.usageCard} style={{ backgroundImage: `url('${card.img}')` }}>
                <div className={styles.usageContent}>
                  <card.icon className={styles.usageIcon} />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. DETAILS SECTION */}
        <section id="details" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['details'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>
          <div className={styles.detailsList}>

            {/* ITEM 1: WATER LIME */}
            <div className={styles.accordionItem}>
              <button className={styles.accordionHeader} onClick={() => toggleAccordion('lime')}>
                <div className={styles.headerGrid}>
                  <img src="/images/WEBSITE-P/products/water_lime_vertical.webp" alt="Water Lime" className={styles.headerImage} />
                  <div className={styles.accordionTitle}>
                    <strong>{content.details.lime.title}</strong>
                    <p className={styles.summaryText}>{content.details.lime.summary}</p>
                  </div>
                </div>
                {activeAccordion === 'lime' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
              </button>
              <div className={styles.accordionContent} style={{ maxHeight: activeAccordion === 'lime' ? '1500px' : '0' }}>
                <div className={styles.accordionContentInner}>
                  <h4>{content.details.lime.content.h4}</h4>
                  <blockquote>{content.details.lime.content.quote}</blockquote>
                  <p><strong>{content.details.lime.content.challengeTitle}</strong> {content.details.lime.content.challenge}</p>
                  <p><strong>{content.details.lime.content.limitsTitle}</strong> {content.details.lime.content.limits}</p>
                  <p><strong>{content.details.lime.content.solutionTitle}</strong> {content.details.lime.content.solution}</p>
                  <p><strong>{content.details.lime.content.benefitsTitle}</strong></p>
                  <ul>
                    {content.details.lime.content.benefitsList.map((benefit: string, idx: number) => (
                      <li key={idx}><strong>{benefit.split(':')[0]}:</strong>{benefit.split(':')[1]}</li>
                    ))}
                  </ul>
                  <p dangerouslySetInnerHTML={{ __html: content.details.lime.content.specs.replace('\n', '<br/>') }}></p>
                </div>
              </div>
            </div>

            {/* ITEM 2: PARTICLE FILTER */}
            <div className={styles.accordionItem}>
              <button className={styles.accordionHeader} onClick={() => toggleAccordion('particle')}>
                <div className={styles.headerGrid}>
                  <img src="/images/WEBSITE-P/products/PARTICLES_FILTER.webp" alt="Particle Filter" className={styles.headerImage} />
                  <div className={styles.accordionTitle}>
                    <strong>{content.details.particle.title}</strong>
                    <p className={styles.summaryText}>{content.details.particle.summary}</p>
                  </div>
                </div>
                {activeAccordion === 'particle' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
              </button>
              <div className={styles.accordionContent} style={{ maxHeight: activeAccordion === 'particle' ? '1000px' : '0' }}>
                <div className={styles.accordionContentInner}>
                  <p>{content.details.particle.content.text}</p>
                  <p dangerouslySetInnerHTML={{ __html: content.details.particle.content.specs.replace('\n', '<br/>') }}></p>
                </div>
              </div>
            </div>

            {/* ITEM 3: FINE FILTER + CARTRIDGE (GROUPED) */}
            <div className={styles.detailsGroupContainer}>
              <div className={styles.groupedHeader}>
                <img src="/images/website-assets/PRODUCT/fine_filter_with_cartridge.png" alt="Fine Filter" className={styles.groupedImage} />
                <div className={styles.accordionItemsWrapper}>
                  <div className={styles.accordionItem}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('fine')}>
                      <div className={styles.headerGrid}>
                        <div className={styles.accordionTitle}>
                          <strong>{content.details.fine.title}</strong>
                          <p className={styles.summaryText}>{content.details.fine.summary}</p>
                        </div>
                      </div>
                      {activeAccordion === 'fine' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
                    </button>
                  </div>
                  <div className={styles.accordionItem}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('cartridge')}>
                      <div className={styles.headerGrid}>
                        <div className={styles.accordionTitle}>
                          <strong>{content.details.cartridge.title}</strong>
                          <p className={styles.summaryText}>{content.details.cartridge.summary}</p>
                        </div>
                      </div>
                      {activeAccordion === 'cartridge' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'fine' ? '1000px' : '0' }}>
                <div className={styles.accordionContentInner} style={{ marginLeft: 0 }}>
                  <p><strong>{content.details.fine.content.text}</strong></p>
                  <ul>
                    {content.details.fine.content.list.map((it: string, idx: number) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{it}</li>)}
                  </ul>
                  <p><strong>{content.details.fine.content.reduces}</strong></p>
                </div>
              </div>
              <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'cartridge' ? '1200px' : '0' }}>
                <div className={styles.accordionContentInner} style={{ marginLeft: 0 }}>
                  <h4>{content.details.cartridge.content.h4}</h4>
                  <p><strong>{content.details.cartridge.content.text1}</strong></p>
                  <p><strong>{content.details.cartridge.content.text2}</strong></p>
                  <p>{content.details.cartridge.content.text3}</p>
                  <p dangerouslySetInnerHTML={{ __html: content.details.cartridge.content.specs.replace('\n', '<br/>') }}></p>
                </div>
              </div>
            </div>

            {/* ITEM 4: DYNAMIZER */}
            <div className={styles.accordionItem}>
              <button className={styles.accordionHeader} onClick={() => toggleAccordion('dynamizer')}>
                <div className={styles.headerGrid}>
                  <img src="/images/WEBSITE-P/products/DYNAMIZER.webp" alt="Dynamizer" className={styles.headerImage} />
                  <div className={styles.accordionTitle}>
                    <strong>{content.details.dynamizer.title}</strong>
                    <p className={styles.summaryText}>{content.details.dynamizer.summary}</p>
                  </div>
                </div>
                {activeAccordion === 'dynamizer' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
              </button>
              <div className={styles.accordionContent} style={{ maxHeight: activeAccordion === 'dynamizer' ? '2500px' : '0' }}>
                <div className={styles.accordionContentInner}>

                  <div className={styles.visualFlowGrid}>
                    <div className={styles.flowColumn}>
                      <h3>{content.details.dynamizer.problemTitle}</h3>
                      <ul className={styles.iconList}>
                        <li className={`${styles.iconListItem} ${activeSubAccordion['prob1'] ? styles.active : ''}`}>
                          <TriangleAlert className={`${styles.listIcon} ${styles.iconProblem}`} size={20} />
                          <div className={styles.listText}>
                            <strong onClick={() => toggleSubAccordion('prob1')}>
                              {content.details.dynamizer.prob1.title}
                              <Plus className={styles.toggleIconInner} size={16} />
                            </strong>
                            <span>{content.details.dynamizer.prob1.text}</span>
                          </div>
                        </li>
                        <li className={`${styles.iconListItem} ${activeSubAccordion['prob2'] ? styles.active : ''}`}>
                          <TriangleAlert className={`${styles.listIcon} ${styles.iconProblem}`} size={20} />
                          <div className={styles.listText}>
                            <strong onClick={() => toggleSubAccordion('prob2')}>
                              {content.details.dynamizer.prob2.title}
                              <Plus className={styles.toggleIconInner} size={16} />
                            </strong>
                            <span>{content.details.dynamizer.prob2.text}</span>
                          </div>
                        </li>
                      </ul>
                      <div className={styles.imagePair}>
                        <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68db19801650b6d08333f5d3_cell%20before.png" alt="Before" loading="lazy" />
                        <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1c2bbf5b4fe2f0c82ee3_Cell%20mouth%20Big%20clusters.png" alt="Clusters" loading="lazy" />
                      </div>
                    </div>

                    <div className={styles.flowColumn}>
                      <h3>{content.details.dynamizer.solutionTitle}</h3>
                      <ul className={styles.iconList}>
                        <li className={`${styles.iconListItem} ${activeSubAccordion['sol1'] ? styles.active : ''}`}>
                          <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                          <div className={styles.listText}>
                            <strong onClick={() => toggleSubAccordion('sol1')}>
                              {content.details.dynamizer.sol1.title}
                              <Plus className={styles.toggleIconInner} size={16} />
                            </strong>
                            <span>{content.details.dynamizer.sol1.text}</span>
                          </div>
                        </li>
                        <li className={`${styles.iconListItem} ${activeSubAccordion['sol2'] ? styles.active : ''}`}>
                          <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                          <div className={styles.listText}>
                            <strong onClick={() => toggleSubAccordion('sol2')}>
                              {content.details.dynamizer.sol2.title}
                              <Plus className={styles.toggleIconInner} size={16} />
                            </strong>
                            <span>{content.details.dynamizer.sol2.text}</span>
                          </div>
                        </li>
                        <li className={`${styles.iconListItem} ${activeSubAccordion['sol3'] ? styles.active : ''}`}>
                          <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                          <div className={styles.listText}>
                            <strong onClick={() => toggleSubAccordion('sol3')}>
                              {content.details.dynamizer.sol3.title}
                              <Plus className={styles.toggleIconInner} size={16} />
                            </strong>
                            <span>{content.details.dynamizer.sol3.text}</span>
                          </div>
                        </li>
                      </ul>
                      <div className={styles.imagePair}>
                        <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68db1980b6ba9dc316c8be9e_Frame%201.png" alt="After" loading="lazy" />
                        <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1c2bb9d316188c73a11a_Cell%20mouth%20Micro%20clusters.png" alt="Clusters" loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className={styles.pipeComparisonInline}>
                    <div className={styles.pipeItemInline}>
                      <h5>{content.details.dynamizer.pipeStraight.title}</h5>
                      <p>{content.details.dynamizer.pipeStraight.text}</p>
                      <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1a7c91c3165fbe2f7354_Straight%20Water%20Pipe.png" alt="Straight" />
                    </div>
                    <div className={styles.pipeItemInline}>
                      <h5>{content.details.dynamizer.pipeSpiral.title}</h5>
                      <p>{content.details.dynamizer.pipeSpiral.text}</p>
                      <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1a7c0f9a2706c32f43c9_Spiral%20Water%20Pipe.png" alt="Spiral" />
                    </div>
                  </div>

                  <div className={styles.dynamizerBenefitsSection}>
                    <h3 className={styles.dynamizerBenefitsTitle}>{content.details.dynamizer.benefitsTitle}</h3>
                    <div className={styles.dynamizerBenefitsGrid}>
                      {[content.details.dynamizer.benefit1, content.details.dynamizer.benefit2, content.details.dynamizer.benefit3, content.details.dynamizer.benefit4].map((ben, i) => (
                        <div key={i} className={styles.dynamizerBenefitCard}>
                          <div className={styles.dynamizerBenefitIcon}>{i === 0 ? '★' : i === 1 ? '💧' : i === 2 ? '🛡️' : '⚙️'}</div>
                          <h4>{ben.title}</h4>
                          <p>{ben.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.dynamizerSpecGrid}>
                      <div className={styles.dynamizerBenefitCard}>
                        <div className={styles.dynamizerBenefitIcon}>♾️</div>
                        <h4>Capacity</h4>
                        <p>{content.details.dynamizer.specs.cap}</p>
                      </div>
                      <div className={styles.dynamizerBenefitCard}>
                        <div className={styles.dynamizerBenefitIcon}>🔧</div>
                        <h4>Maintenance</h4>
                        <p>{content.details.dynamizer.specs.maint}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. INSTALLATION SECTION */}
        <section id="installation" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['installation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.install.title}</h2></div>
          <div className={styles.installationGrid}>
            <div className={styles.installationIntro}>
              <h3>{content.install.introTitle}</h3>
              <p>{content.install.introText}</p>
            </div>
            <div className={styles.neededBox}>
              <h3>{content.install.neededTitle}</h3>
              <ul>
                <li><User className={styles.specIcon} /> {content.install.neededList[0]}</li>
                <li><Ruler className={styles.specIcon} /> {content.install.neededList[1]}</li>
                <li><Wrench className={styles.specIcon} /> {content.install.neededList[2]}</li>
                <li><Clock className={styles.specIcon} /> {content.install.neededList[3]}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. MAINTENANCE SECTION */}
        <section id="maintenance" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['maintenance'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.maint.title}</h2></div>
          <div className={styles.maintenanceGrid}>
            <div className={styles.maintenanceCard}>
              <h3><CalendarCheck className={styles.specIcon} /> {content.maint.maintTitle}</h3>
              <p>{content.maint.maintText}</p>
              <Link href="/shop/cartridge" className={`${styles.btn} ${styles.btnPrimary}`}>
                {content.maint.btnOrder}
              </Link>
            </div>
            <div className={styles.warrantyCard}>
              <h3><ShieldCheck className={styles.specIcon} /> {content.maint.warrantyTitle}</h3>
              <div className={styles.warrantyHighlight}>{content.maint.warrantyYears}</div>
              <p>{content.maint.warrantyText}</p>
            </div>
          </div>
        </section>

        {/* 6. REPORTS SECTION */}
        <section id="rapports" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['rapports'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.reports.title}</h2></div>
          <div className={styles.reportGrid}>
            {content.reports.list.map((rep, i) => (
              <button
                key={i}
                className={styles.reportLink}
                onClick={() => {
                  setModalUrl(reportUrls[i]);
                  setIsLoadingPdf(true);
                }}
              >
                <FileText className={styles.reportIcon} /> {rep.title}
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* PDF/IMAGE MODAL */}
      {modalUrl && (
        <div className={styles.modalOverlay} onClick={() => { setModalUrl(null); setIsLoadingPdf(false); }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => { setModalUrl(null); setIsLoadingPdf(false); }}><X /></button>
            </div>
            <div className={styles.modalBody}>
              {isLoadingPdf && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #D52D25', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading PDF...</p>
                  </div>
                </div>
              )}
              <object
                data={modalUrl}
                type="application/pdf"
                style={{ width: '100%', height: '100%', border: 'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
                title="Document Preview"
                onLoad={() => setIsLoadingPdf(false)}
              >
                <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                  <p>Preview not available.</p>
                  <a href={modalUrl} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                    Download PDF
                  </a>
                </div>
              </object>
            </div>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
}