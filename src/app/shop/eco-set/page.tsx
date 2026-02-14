'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Minus, FileText, Award,
  GlassWater, Utensils, Coffee, ShowerHead, CalendarCheck, ShieldCheck,
  Wrench, User, Ruler, Clock, X, TriangleAlert, CheckCircle, Infinity as InfinityIcon
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import Link from 'next/link';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-eco-set';
const PRODUCT_NAME = "ECO SET";

const PRICE_MAP: Record<string, number> = {
  Morocco: 12299,    // MAD
  Switzerland: 1070, // CHF
  Europe: 1150       // EUR (Default)
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
    title: 'Technical Details in 3 Steps',
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
      'Fabriqué en inox médical, garantie 10ans, conçu pour durer toute la vie',
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
    title: 'Détails Techniques en 3 Étapes',
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
  const { getPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET.webp",
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
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf"
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
              <div className={styles.accordionContent} style={{ maxHeight: activeAccordion === 'lime' ? '1200px' : '0' }}>
                <div className={`${styles.accordionContentInner} ${styles.fullWidthContent}`}>
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
              <div className={styles.accordionContent} style={{ maxHeight: activeAccordion === 'particle' ? '500px' : '0' }}>
                <div className={`${styles.accordionContentInner} ${styles.fullWidthContent}`}>
                  <p>{content.details.particle.content.text}</p>
                  <p dangerouslySetInnerHTML={{ __html: content.details.particle.content.specs.replace('\n', '<br/>') }}></p>
                </div>
              </div>
            </div>

            {/* ITEM 3: FINE FILTER + CARTRIDGE (GROUPED) */}
            <div className={styles.detailsGroupContainer}>
              <div className={styles.groupedHeader}>
                <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/fine%20filter%20with%20cartridge.png" alt="Fine Filter Group" className={styles.groupedImage} />
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
                    {content.details.fine.content.list.map((it, idx) => <li key={idx}>{it}</li>)}
                  </ul>
                </div>
              </div>

              {/* Cartridge Content */}
              <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'cartridge' ? '1200px' : '0' }}>
                <div className={styles.accordionContentInner} style={{ marginLeft: 0, paddingTop: '1.5rem' }}>
                  <h4>{content.details.cartridge.content.h4}</h4>
                  <p>{content.details.cartridge.content.text}</p>
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