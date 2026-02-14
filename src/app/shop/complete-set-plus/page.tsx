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

const PRICE_MAP: Record<string, number> = {
  Morocco: 37507,    // MAD
  Switzerland: 3378, // CHF
  Europe: 3598       // EUR (Default)
};

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
      'Made of medical-grade stainless steel, 10-year warranty, built to last a lifetime.',
      'Includes the Dynamizer for revitalized and restructured water',
      'Exceptional water throughout your entire home : shower, drinking, cooking, tea, coffee…',
      'Treats: particles, limescale, and contaminants while preserving natural mineralization.',
      'Purifies water naturally, no electricity, no waste, no chemicals.',
      'Maintenance: one cartridge per year, 10 minutes (no tools required).'
    ]
  },
  usages: {
    title: 'Perfect water for every use',
    desc: 'Enjoy pure, healthy, and revitalized water from every tap. Our system transforms your daily life by improving water quality for all your uses.',
    cards: [
      { title: 'Drinking', text: 'Pure and revitalized spring water, free of impurities.', icon: GlassWater, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/drinking%20big.webp' },
      { title: 'Cooking', text: 'Reveal the flavors of your food and preserve its nutrients.', icon: Utensils, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/washing%20big.webp' },
      { title: 'Tea & Coffee', text: 'Unleash the full aromatic potential of your hot beverages.', icon: Coffee, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/coffee%20big.webp' },
      { title: 'Shower & Bath', text: 'Protect your skin and hair from limescale for a feeling of softness.', icon: ShowerHead, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/shower%20big.webp' }
    ]
  },
  details: {
    title: 'Technical Details in 4 Steps',
    lime: {
      title: '1. WATER LIME',
      summary: 'Physical transformation of limestone to prevent scaling deposits. Unlimited capacity and maintenance-free.',
      content: {
        h4: 'Effective, durable, and effortless.',
        quote: 'Note: Limescale is nothing more than calcium and magnesium...',
        challenge: 'The challenge: Calcite, the hard form of limestone in water, builds up...',
        solution: 'Mam Nature Swiss® Water Lime: Converts calcite into aragonite using permanent magnets.',
        specs: 'Capacity: unlimited - Maintenance: None.'
      }
    },
    particle: {
      title: '2. WATER PARTICLE FILTER',
      summary: 'Filters sediments and suspended particles with automatic backwash and integrated pressure regulator.',
      content: {
        text: 'Particle filter with automatic backwash, pressure regulator, and 360° connector. Compact, fully integrated solution made from medical-grade materials (316L stainless steel).',
        specs: 'Capacity: unlimited - Maintenance: none (fully automated solution).'
      }
    },
    fine: {
      title: '3. WATER FINE FILTER',
      summary: 'Advanced filtration that reduces chlorine, heavy metals, pesticides, and microplastics.',
      content: {
        text: 'Unique quadruple filtration system:',
        list: [
          'Physical: 20 µm and 5 µm membrane filter',
          'Activated carbon: adsorption filtration',
          'Aqualen™: Adsorbent fibers for efficient heavy metal filtration',
          'Ionized silver: sterility.'
        ]
      }
    },
    cartridge: {
      title: 'CARTRIDGE',
      summary: 'Patented technology that eliminates contaminants while preserving essential minerals.',
      content: {
        h4: 'The Swiss Water Cartridge',
        text: 'Eliminates PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides...',
        specs: 'Capacity: 150m³ - Maintenance: 10 minutes once per year.'
      }
    },
    dynamizer: {
      title: '4. THE SWISS WATER DYNAMIZER',
      summary: 'Revitalizes water for better hydration and transforms limescale.',
      problemTitle: 'The Problem with Modern Water',
      prob1: { title: 'Low cellular bioavailability', text: 'Industrial treatments alter the molecular structure of water...' },
      prob2: { title: 'Destructured water', text: 'In its natural state, high-quality water has a perfect hexagonal structure...' },
      solutionTitle: 'The Solution',
      sol1: { title: 'Restructuring & Revitalization', text: 'Breaks large water molecule clusters into micro-clusters...' },
      sol2: { title: 'Limestone Transformation', text: 'Through permanent magnets and extreme turbulence...' },
      sol3: { title: 'Long-Term stabilization', text: 'Dynamized water gains a biologically stable structure...' },
      pipeStraight: { title: 'Straight water pipe:', text: 'Water clusters and loses its biophysical power.' },
      pipeSpiral: { title: 'Spiral water pipe:', text: 'Molecular clusters are dissolved and the water regains its power.' },
      benefitsTitle: 'Daily benefits',
      benefit1: { title: 'Exceptional taste', text: 'Discover an incredibly soft, remarkably digestible and pleasant water.' },
      benefit2: { title: 'Optimal cellular hydration', text: 'Supports proper body function and reduces acidity.' },
      benefit3: { title: 'Natural limescale protection', text: 'Naturally protects your appliances and surfaces without using salt or chemicals.' },
      benefit4: { title: 'Unmatched performance', text: 'With a processing capacity of 5,000 liters/hour, it meets the needs of the entire house.' },
      specs: { cap: 'Capacity: Unlimited', maint: 'Maintenance: None' }
    }
  },
  install: {
    title: 'Simple & Guided Installation',
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
    warrantyText: 'Made of durable medical-grade stainless steel.'
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
      'Fabriqué en inox médical, garantie 10ans, conçu pour durer toute la vie',
      'Inclut le Dynamizeur pour une eau revitalisée et restructurée',
      'Eau d’exception pour toute votre maison : Douche, boire, cuisine, Thé, Café…',
      'Traite : particules, calcaire et contaminants (95 – 99,9% - unique en monde) tout en préservant la minéralisation naturelle',
      'Sans électricité, sans gaspillage et sans chimie',
      'Entretien: une seule cartouche par année, 10 minutes (sans outil)'
    ]
  },
  usages: {
    title: 'Une eau parfaite pour chaque usage',
    desc: 'Profitez d\'une eau pure, saine et revitalisée à chaque robinet. Notre système transforme votre quotidien en améliorant la qualité de l\'eau pour toutes vos utilisations.',
    cards: [
      { title: 'Boisson', text: 'Une eau de source pure et revitalisée, débarrassée des impuretés.', icon: GlassWater, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/drinking%20big.webp' },
      { title: 'Cuisine', text: 'Révélez les saveurs de vos aliments et préservez leurs nutriments.', icon: Utensils, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/washing%20big.webp' },
      { title: 'Thé & Café', text: 'Libérez tout le potentiel aromatique de vos boissons chaudes.', icon: Coffee, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/coffee%20big.webp' },
      { title: 'Douche & Bain', text: 'Protégez votre peau et vos cheveux du calcaire pour une sensation de douceur.', icon: ShowerHead, img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/shower%20big.webp' }
    ]
  },
  details: {
    title: 'Détails Techniques en 4 Étapes',
    lime: {
      title: '1. WATER LIME',
      summary: 'Transformation physique du calcaire pour prévenir les dépôts incrustants. Capacité illimitée et sans entretien.',
      content: {
        h4: 'Efficace, durable et sans effort.',
        quote: 'Note : Le calcaire n\'est rien d\'autre que du calcium et du magnésium...',
        challenge: 'Le défi : La calcite, forme dure du calcaire, s\'accumule...',
        solution: 'Mam Nature Swiss® Water Lime : Convertit la calcite en aragonite grâce à des aimants permanents.',
        specs: 'Capacité : illimitée - Entretien : Aucun.'
      }
    },
    particle: {
      title: '2. WATER PARTICLE FILTER',
      summary: 'Filtre les sédiments et particules en suspension avec retro-lavage automatique et régulateur de pression intégré.',
      content: {
        text: 'Filtre à particules avec retro-lavage automatique, régulateur de pression et connecteur 360°. Solution compacte en inox médical (316L).',
        specs: 'Capacité : illimitée - Entretien : aucun (solution entièrement automatisée).'
      }
    },
    fine: {
      title: '3. WATER FINE FILTER',
      summary: 'Filtration avancée qui réduit chlore, métaux lourds, pesticides et microplastiques.',
      content: {
        text: 'Système unique de quadruple filtration :',
        list: [
          'Physique : Filtre membrane 20 µm et 5 µm',
          'Charbon actif : filtration par adsorption',
          'Aqualen™ : Fibres adsorbantes pour la filtration des métaux lourds',
          'Argent ionisé : stérilité.'
        ]
      }
    },
    cartridge: {
      title: 'CARTOUCHE',
      summary: 'Technologie brevetée qui élimine les contaminants en préservant les minéraux essentiels.',
      content: {
        h4: 'The Swiss Water Cartridge',
        text: 'Élimine PFAS, métaux lourds, aluminium, chlore, fluor, pesticides...',
        specs: 'Capacité : 150m³ - Entretien : 10 minutes une fois par an.'
      }
    },
    dynamizer: {
      title: '4. THE SWISS WATER DYNAMIZER',
      summary: 'Revitalise l\'eau pour une meilleure hydratation et transforme le calcaire.',
      problemTitle: 'Problème de l\'eau moderne',
      prob1: { title: 'Faible biodisponibilité cellulaire', text: 'Les traitements industriels altèrent la structure de l\'eau...' },
      prob2: { title: 'Eau déstructurée', text: 'À l\'état naturel, l\'eau a une structure hexagonale parfaite...' },
      solutionTitle: 'La Solution',
      sol1: { title: 'Restructuration et revitalisation', text: 'Fragmente les gros clusters en micro-clusters...' },
      sol2: { title: 'Transformation du calcaire', text: 'Grâce à des aimants permanents et une turbulence extrême...' },
      sol3: { title: 'Stabilisation durable', text: 'L\'eau dynamisée acquiert une structure stable...' },
      pipeStraight: { title: 'Tube droit :', text: 'L\'eau s\'agglutine et perd sa puissance biophysique.' },
      pipeSpiral: { title: 'Tube en spirale :', text: 'Les clusters sont dissous et l\'eau retrouve sa puissance.' },
      benefitsTitle: 'Bénéfices au quotidien',
      benefit1: { title: 'Goût exceptionnel', text: 'Découvrez une eau douce, digeste et agréable.' },
      benefit2: { title: 'Hydratation cellulaire optimale', text: 'Favorise le bon fonctionnement du corps et réduit l\'acidité.' },
      benefit3: { title: 'Protection naturelle anti-calcaire', text: 'Protège vos appareils sans sel ni produits chimiques.' },
      benefit4: { title: 'Performance inégalée', text: 'Avec une capacité de 5 000 litres/heure, pour toute la maison.' },
      specs: { cap: 'Capacité : Illimitée', maint: 'Entretien : Aucun' }
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

export default function CompleteSetPlusPage() {
  const { getPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState<Record<string, boolean>>({});
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET%20PLUS.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/drinking%20big.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/shower%20big.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/coffee%20big.webp"
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
    const currentRegion = currency === 'MAD' ? 'Morocco' : currency === 'CHF' ? 'Switzerland' : 'Europe';
    const rawPrice = PRICE_MAP[currentRegion] || PRICE_MAP['Europe'];
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
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/The%20Swiss%20Water%20Cartridge_Retention%20Rates_Certificated%20ETH%20Zurich.pdf",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/ISO.pdf"
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
                  <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/water%20lime%20vertical.webp" alt="Water Lime" className={styles.headerImage} />
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
                  <p><strong>{content.details.lime.content.challenge}</strong></p>
                  <p><strong>{content.details.lime.content.solution}</strong></p>
                  <p dangerouslySetInnerHTML={{ __html: content.details.lime.content.specs.replace('\n', '<br/>') }}></p>
                </div>
              </div>
            </div>

            {/* ITEM 2: PARTICLE FILTER */}
            <div className={styles.accordionItem}>
              <button className={styles.accordionHeader} onClick={() => toggleAccordion('particle')}>
                <div className={styles.headerGrid}>
                  <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp" alt="Particle Filter" className={styles.headerImage} />
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
                <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/fine%20filter%20with%20cartridge.png" alt="Fine Filter" className={styles.groupedImage} />
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
                    {content.details.fine.content.list.map((it, idx) => <li key={idx}>{it}</li>)}
                  </ul>
                </div>
              </div>
              <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'cartridge' ? '1000px' : '0' }}>
                <div className={styles.accordionContentInner} style={{ marginLeft: 0 }}>
                  <h4>{content.details.cartridge.content.h4}</h4>
                  <p>{content.details.cartridge.content.text}</p>
                  <p dangerouslySetInnerHTML={{ __html: content.details.cartridge.content.specs.replace('\n', '<br/>') }}></p>
                </div>
              </div>
            </div>

            {/* ITEM 4: DYNAMIZER */}
            <div className={styles.accordionItem}>
              <button className={styles.accordionHeader} onClick={() => toggleAccordion('dynamizer')}>
                <div className={styles.headerGrid}>
                  <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp" alt="Dynamizer" className={styles.headerImage} />
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
              <iframe
                src={`https://docs.google.com/gview?url=${modalUrl}&embedded=true`}
                style={{ width: '100%', height: '100%', border: 'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
                title="Document Preview"
                onLoad={() => setIsLoadingPdf(false)}
              />
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