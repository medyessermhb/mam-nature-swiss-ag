'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Minus, FileText, Award,
  GlassWater, Utensils, Coffee, ShowerHead, CalendarCheck, ShieldCheck,
  Wrench, User, Ruler, Clock, X, TriangleAlert, CheckCircle, Infinity as InfinityIcon
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context


// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-eco-set';
const PRODUCT_NAME = "ECO SET";

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
    title: 'Technical Details in 3 Steps',
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
      { title: "Swiss Safety System Certificate" }
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
    title: 'Détails Techniques en 3 Étapes',
    lime: {
      title: '1. WATER LIME',
      summary: 'Transformation physique du calcaire pour prévenir les dépôts incrustants. Capacité illimitée et sans entretien.',
      content: {
        h4: 'Efficace, durable et sans effort.',
        quote: 'Note : Le calcaire n\'est rien d\'autre que du calcium et du magnésium, qui sont essentiels à l\'équilibre biologique de l\'eau. C\'est la forme incrustante qui est problématique ; un traitement responsable ne les élimine pas mais les adoucit, ce qui empêche les dépôts durs tout en préservant les minéraux et oligo-éléments naturellement présents dans l\'eau.',
        challengeTitle: 'Le défi :',
        challenge: 'La Calcite, forme dure du calcaire dans l\'eau, s\'accumule, causant des dommages techniques (dysfonctionnements et réduction de la durée de vie des appareils) et esthétiques (surfaces ternes).',
        limitsTitle: 'Les limites des solutions traditionnelles :',
        limits: 'Les adoucisseurs à sel échangent les ions calcium et magnésium contre du sodium, éliminant les minéraux (l\'eau déminéralisée est dangereuse pour la santé), altérant ainsi gravement la composition et le goût de l\'eau, nécessitant un entretien régulier et causant une charge bactérienne inadmissible.',
        solutionTitle: 'Mam Nature Swiss® Water Lime : Une conversion physique du calcaire.',
        solution: 'Notre appareil ne fonctionne pas en éliminant le calcaire, mais en modifiant sa structure cristalline par l\'action d\'aimants permanents. Il convertit la Calcite (forme incrustante) en Aragonite (forme non adhésive).',
        benefitsTitle: 'Les bénéfices directs :',
        benefitsList: [
          'Protection active : Réduction des dépôts solides dans les tuyaux, chauffe-eau et appareils.',
          'Eau préservée : préserve le goût, les minéraux et les oligo-éléments naturellement présents dans l\'eau.',
          'Simplicité absolue, Économique et écologique : Pas de consommables (sel, cartouches), pas d\'énergie, pas de gaspillage d\'eau.'
        ],
        specs: 'Capacité : illimitée<br>Entretien : Aucun.'
      }
    },
    particle: {
      title: '2. WATER PARTICLE FILTER',
      summary: 'Filtre les sédiments et particules en suspension avec retro-lavage automatique et régulateur de pression intégré.',
      content: {
        text: 'Filtre à particules avec retro-lavage automatique, régulateur de pression et connecteur 360°. Solution compacte en inox médical (316L).',
        specs: 'Capacité : illimitée<br>Entretien : aucun (solution entièrement automatisée).'
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
      title: 'CARTOUCHE',
      summary: 'Technologie brevetée qui élimine les contaminants en préservant les minéraux essentiels.',
      content: {
        h4: 'The Swiss Water Cartridge',
        text1: 'Mam Nature Swiss® – Résoudre l\'impossible : Une eau parfaitement filtrée, douce et naturellement minéralisée.',
        text2: 'La « SWISS WATER CARTRIDGE » : Au-delà de la filtration, un véritable bouclier. SÉCURITÉ & PURETÉ INÉGALÉES',
        text3: 'Notre technologie de filtration 100% naturelle, exclusive à Mam Nature Swiss®, combine des fibres de protéines naturelles avec du charbon actif pour obtenir une adsorption totale, une première mondiale. Elle élimine les contaminants tout en préservant les minéraux et les oligo-éléments naturellement présents dans l\'eau. Grâce à son système de filtration sélective par adsorption complète, cette invention suisse brevetée est la solution universelle unique au monde, 100% naturelle, capable d\'éliminer PFAS, métaux lourds, aluminium, chlore, fluor, pesticides, résidus pharmaceutiques, produits chimiques industriels, arsenic, cadmium, chrome, etc. - et même les substances radioactives présentes dans l\'eau nucléaire.',
        specs: 'Débit : jusqu\'à 1800 litres/heure.<br>Capacité de la cartouche filtrante (durée de vie) : 150m³<br>Entretien : 10 minutes une fois par an (simple et sans outil).'
      }
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
      { title: "Cértificat de Swiss Safety System" }
    ]
  }
};

export default function EcoSetPage() {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'manual' | 'auto'>('manual');
  const [activeSection, setActiveSection] = useState('produit');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES_MANUAL = [
    "/images/products/WITHOUT AUTO BACKWASH/Eco Set+Aqmos 1 WITHOUT AUTOMATIC BACKWASH.webp",
    "/images/WEBSITE-P/drinking_big.webp",
    "/images/WEBSITE-P/shower_big.webp",
    "/images/WEBSITE-P/coffee_big.webp"
  ];

  const IMAGES_AUTO = [
    "/images/products/AUTOBACKWASH/Eco Set+Aqmos AUTO BACKWASH.webp",
    "/images/WEBSITE-P/drinking_big.webp",
    "/images/WEBSITE-P/shower_big.webp",
    "/images/WEBSITE-P/coffee_big.webp"
  ];

  const IMAGES = selectedOption === 'auto' ? IMAGES_AUTO : IMAGES_MANUAL;

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

  const handleAddToCart = () => {
    const currentProductId = selectedOption === 'auto' ? `${PRODUCT_ID}-auto` : PRODUCT_ID;
    const rawPrice = getRawPrice(currentProductId);
    const currencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

    addToCart({
      id: currentProductId,
      name: PRODUCT_NAME,
      price: rawPrice,
      currency: currencyCode,
      image: IMAGES[0]
    });
  };

  const reportUrls = [
    "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf",
    "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf"
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

                {/* OPTION SELECTOR */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>
                    {isFrench ? 'Choisissez votre version :' : 'Choose your version:'}
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedOption('manual')}
                      style={{
                        padding: '0.5rem 1rem',
                        border: selectedOption === 'manual' ? '1px solid #D52D25' : '1px solid #e5e7eb',
                        backgroundColor: selectedOption === 'manual' ? '#FFF5F5' : '#fff',
                        color: selectedOption === 'manual' ? '#D52D25' : '#4b5563',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: selectedOption === 'manual' ? 600 : 400,
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOption === 'manual' ? '0 1px 2px rgba(213, 45, 37, 0.1)' : 'none',
                      }}
                    >
                      {isFrench ? 'Sans Rétrolavage Automatique' : 'Without Automatic Backwash'}
                    </button>
                    <button
                      onClick={() => setSelectedOption('auto')}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: selectedOption === 'auto' ? '1px solid #D52D25' : '1px solid #e5e7eb',
                        backgroundColor: selectedOption === 'auto' ? '#FFF5F5' : '#fff',
                        color: selectedOption === 'auto' ? '#D52D25' : '#4b5563',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: selectedOption === 'auto' ? 600 : 400,
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOption === 'auto' ? '0 1px 2px rgba(213, 45, 37, 0.1)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {/* Image icon for Auto Backwash */}
                      <div style={{ position: 'relative', width: '30px', height: '30px', flexShrink: 0 }}>
                        <Image
                          src="/images/products/PARTICLE FILTER/Autom. Backwash Unit 1.webp"
                          alt="Automatic Backwash"
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.1' }}>
                        <span>{isFrench ? 'Avec Rétrolavage Automatique' : 'With Automatic Backwash'}</span>
                        <span style={{ fontSize: '0.85em', color: selectedOption === 'auto' ? '#D52D25' : '#888', fontWeight: 500 }}>
                          {getRawPrice('addon-automatic-backwash') > 0
                            ? (currency === 'MAD'
                              ? `+${getRawPrice('addon-automatic-backwash')} Dhs`
                              : `+${getRawPrice('addon-automatic-backwash')} ${currency || 'EUR'}`)
                            : '+90 EUR'}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className={styles.productPrice}>
                  {isLoading ? 'Loading...' : getPrice(selectedOption === 'auto' ? `${PRODUCT_ID}-auto` : PRODUCT_ID)}
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
                <img src="/images/website-assets/PRODUCT/fine_filter_with_cartridge.png" alt="Fine Filter Group" className={styles.groupedImage} />
                <div className={styles.accordionItemsWrapper}>
                  {/* Fine Filter Header */}
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
                  {/* Cartridge Header */}
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

              {/* Fine Filter Content */}
              <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'fine' ? '800px' : '0' }}>
                <div className={styles.accordionContentInner} style={{ marginLeft: 0, paddingTop: '1.5rem' }}>
                  <p><strong>{content.details.fine.content.text}</strong></p>
                  <ul>
                    {content.details.fine.content.list.map((it, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{it}</li>)}
                  </ul>
                  <p><strong>{content.details.fine.content.reduces}</strong></p>
                </div>
              </div>

              {/* Cartridge Content */}
              <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'cartridge' ? '1200px' : '0' }}>
                <div className={styles.accordionContentInner} style={{ marginLeft: 0, paddingTop: '1.5rem' }}>
                  <h4>{content.details.cartridge.content.h4}</h4>
                  <p><strong>{content.details.cartridge.content.text1}</strong></p>
                  <p><strong>{content.details.cartridge.content.text2}</strong></p>
                  <p>{content.details.cartridge.content.text3}</p>
                  <p dangerouslySetInnerHTML={{ __html: content.details.cartridge.content.specs.replace('\n', '<br/>') }}></p>
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