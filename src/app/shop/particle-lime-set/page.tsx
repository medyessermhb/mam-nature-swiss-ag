'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, FileText, Award,
  Check, Gem, ArrowLeftRight, Gauge, Wrench, CalendarCheck, ShieldCheck, X, AlertCircle, Magnet
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-particle-lime-set';
const PRODUCT_NAME = "PARTICLE & LIME SET";

// Prices based on 330 EUR
const PRICE_MAP: Record<string, number> = {
  Morocco: 3450,     // MAD
  Switzerland: 305,  // CHF
  Europe: 330        // EUR
};

// --- DATA DEFINITION ---
const CONTENT_EN = {
  nav: {
    product: 'Product',
    details: 'How it Works',
    install: 'Installation',
    maint: 'Maintenance',
    reports: 'Reports'
  },
  product: {
    title: PRODUCT_NAME,
    subtitle: 'Complete Protection Bundle: Particle Filter + Anti-Limescale',
    btnAdd: 'Add to Cart',
    priceTBD: 'Price Coming Soon',
    descBold: 'The ultimate protection package: Filter sediments and treat limescale in one complete set.',
    desc: "This bundle combines our two essential systems for total home protection. You get the 50µm Particle Filter to remove sand and rust, plus the Water LIME physics-based anti-scale system to prevent limescale buildup. Sold together as a complete package for maximum efficiency and value."
  },
  details: {
    title: 'Dual Protection Technology',
    list: [
      { label: 'Pre-Filtration:', text: '50 µm stainless steel mesh (Particle Filter) removes sand, rust, and sediments.' },
      { label: 'Active Scale Prevention:', text: 'Permanent magnets (Water LIME) convert calcite to non-adhesive aragonite.' },
      { label: 'Appliance Protection:', text: 'Significantly extends the lifespan of boilers, washing machines, and pipes.' },
      { label: 'Eco-Friendly & Healthy:', text: 'Zero salt, zero chemicals. Healthy calcium and magnesium remain in the water.' }
    ],
    reduces: "Reduces: Large particles, sediments, and hard limescale deposits on surfaces and heating elements.",
    specs: {
      material: { title: 'Technology', val: '50µm Mesh + Magnetic Conversion' },
      conn: { title: 'Connections', val: '1 inch (Standard plumbing integration)' },
      flow: { title: 'Maintenance', val: 'Manual flush (Particle) / Zero (Lime)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Sequential Professional Installation',
    cardText: 'The set is installed directly on your main water line by a qualified plumber. The Particle Filter is installed first to catch debris, followed immediately by the Water LIME filter to treat the scale. Their compact design allows for easy integration.'
  },
  maint: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Low Maintenance',
    maintText: 'Particle Filter: Flush the valve manually every 1-2 months to clear caught debris. Water LIME: Requires absolutely zero maintenance once installed.',
    warrantyTitle: 'Excellence Warranty',
    warrantyYears: '10 YEARS',
    warrantyText: "Built with high-quality brass, durable stainless steel, and permanent magnets, both units are covered by a comprehensive 10-year manufacturer's warranty."
  },
  reports: {
    title: 'Reports & Certificates',
    btnPerf: 'View Performance Report',
    btnCert: 'See Swiss Certification'
  }
};

const CONTENT_FR = {
  nav: {
    product: 'Produit',
    details: 'Fonctionnement',
    install: 'Installation',
    maint: 'Entretien',
    reports: 'Rapports'
  },
  product: {
    title: PRODUCT_NAME,
    subtitle: 'Pack Protection Complète : Filtre à Particules + Anti-Calcaire',
    btnAdd: 'Ajouter au panier',
    priceTBD: 'Prix à venir',
    descBold: 'Le pack de protection ultime : Filtrez les sédiments et traitez le calcaire en un seul ensemble complet.',
    desc: "Ce pack combine nos deux systèmes essentiels pour une protection totale de l'habitat. Vous obtenez le Filtre à Particules 50µm pour éliminer sable et rouille, plus le système physique Water LIME pour empêcher l'incrustation du calcaire. Vendus ensemble comme un pack complet pour une efficacité et une valeur maximales."
  },
  details: {
    title: 'Technologie de Double Protection',
    list: [
      { label: 'Pré-filtration :', text: 'Maille en acier inoxydable 50 µm (Filtre à Particules) élimine le sable, la rouille et les sédiments.' },
      { label: 'Prévention Active du Tartre :', text: 'Des aimants permanents (Water LIME) convertissent la calcite en aragonite non adhésive.' },
      { label: 'Protection des Appareils :', text: 'Prolonge considérablement la durée de vie des chaudières, lave-linge et canalisations.' },
      { label: 'Écologique et Sain :', text: 'Zéro sel, zéro produit chimique. Le calcium et le magnésium sains restent dans l\'eau.' }
    ],
    reduces: "Réduit : Les grosses particules, les sédiments et les dépôts de calcaire tenaces sur les surfaces et les éléments chauffants.",
    specs: {
      material: { title: 'Technologie', val: 'Maille 50µm + Conversion Magnétique' },
      conn: { title: 'Connexions', val: '1 pouce (Intégration de plomberie standard)' },
      flow: { title: 'Entretien', val: 'Purge manuelle (Particules) / Zéro (Calcaire)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Installation Séquentielle Professionnelle',
    cardText: "L'ensemble est installé directement sur votre arrivée d'eau principale par un plombier qualifié. Le filtre à particules est installé en premier pour retenir les débris, suivi immédiatement du filtre Water LIME pour traiter le calcaire. Leur design compact permet une intégration facile."
  },
  maint: {
    title: 'Maintenance & Garantie',
    maintTitle: 'Entretien Réduit',
    maintText: 'Filtre à Particules : Purgez la valve manuellement tous les 1-2 mois pour évacuer les débris. Water LIME : Ne nécessite absolument aucun entretien une fois installé.',
    warrantyTitle: 'Garantie d\'Excellence',
    warrantyYears: '10 ANS',
    warrantyText: "Fabriqués avec du laiton de haute qualité, de l'acier inoxydable durable et des aimants permanents, les deux unités sont couvertes par une garantie constructeur de 10 ans."
  },
  reports: {
    title: 'Rapports & Certificats',
    btnPerf: 'Voir le Rapport de Performance',
    btnCert: 'Voir la Certification Suisse'
  }
};

export default function ParticleLimeSetPage() {
  const { getPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Placeholder images. Replace with actual images (Particle filter + Water Lime)
  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLE%20%26%20LIME%20SET.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/water%20lime%20vertical.webp"
  ];

  const currentRegion = currency === 'MAD' ? 'Morocco' : currency === 'CHF' ? 'Switzerland' : 'Europe';
  const rawPrice = PRICE_MAP[currentRegion] || PRICE_MAP['Europe'];

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
      const offset = window.innerWidth <= 991 ? 150 : 150;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  const handleAddToCart = () => {
    if (rawPrice === 0) return;
    const currencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

    addToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: rawPrice,
      currency: currencyCode,
      image: IMAGES[0]
    });
  };

  return (
    <div className={styles.pageWrapper}>

      {/* SIDEBAR NAV */}
      <aside className={styles.stickyNav}>
        <nav>
          <ul className={styles.navList}>
            {[
              { id: 'produit', label: content.nav.product },
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
              <div className={styles.mainImageContainer}>
                <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {IMAGES.map((img, idx) => (
                    <img key={idx} src={img} alt={`${PRODUCT_NAME} View ${idx + 1}`} className={styles.sliderImage} />
                  ))}
                </div>
                {IMAGES.length > 1 && (
                  <>
                    <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide}><ChevronLeft size={32} /></button>
                    <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide}><ChevronRight size={32} /></button>
                  </>
                )}
              </div>
            </div>

            <div className={styles.productDetails}>
              <div className={styles.productInfoMobile}>
                <h1 className={styles.productTitle}>{content.product.title}</h1>
                <h2 className={styles.productSubtitle}>{content.product.subtitle}</h2>
                <div className={styles.productPrice}>
                  {isLoading
                    ? 'Loading...'
                    : rawPrice > 0
                      ? getPrice(PRODUCT_ID)
                      : <span style={{ color: '#D52D25', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={20} /> {content.product.priceTBD}</span>
                  }
                </div>
              </div>
              <div className={styles.cartForm}>
                <button
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  disabled={rawPrice === 0}
                  style={{ opacity: rawPrice === 0 ? 0.5 : 1, cursor: rawPrice === 0 ? 'not-allowed' : 'pointer' }}
                >
                  {rawPrice === 0 ? content.product.priceTBD : content.product.btnAdd}
                </button>
              </div>
              <div className={styles.productShortDescription}>
                <p><strong>{content.product.descBold}</strong></p>
                <p>{content.product.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DETAILS SECTION */}
        <section id="details" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['details'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>

          <ul className={styles.detailsList}>
            {content.details.list.map((item, idx) => (
              <li key={idx}>
                <Check className={styles.listIcon} size={20} />
                <div><strong>{item.label}</strong> {item.text}</div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff1f2', borderLeft: '4px solid #D52D25', borderRadius: '4px' }}>
            <p style={{ color: '#9f1239', margin: 0 }}><strong>{content.details.reduces}</strong></p>
          </div>

          <div className={styles.specGrid}>
            <div className={styles.specCard}>
              <Magnet className={styles.specIcon} />
              <h4>{content.details.specs.material.title}</h4>
              <p>{content.details.specs.material.val}</p>
            </div>
            <div className={styles.specCard}>
              <ArrowLeftRight className={styles.specIcon} />
              <h4>{content.details.specs.conn.title}</h4>
              <p>{content.details.specs.conn.val}</p>
            </div>
            <div className={styles.specCard}>
              <Wrench className={styles.specIcon} />
              <h4>{content.details.specs.flow.title}</h4>
              <p>{content.details.specs.flow.val}</p>
            </div>
          </div>
        </section>

        {/* 3. INSTALLATION SECTION */}
        <section id="installation" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['installation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.install.title}</h2></div>
          <div className={styles.installationCard}>
            <h3><Wrench className={styles.redIcon} /> {content.install.cardTitle}</h3>
            <p>{content.install.cardText}</p>
          </div>
        </section>

        {/* 4. MAINTENANCE SECTION */}
        <section id="maintenance" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['maintenance'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.maint.title}</h2></div>
          <div className={styles.maintenanceGrid}>
            <div className={styles.maintenanceCard}>
              <h3><CalendarCheck className={styles.redIcon} /> {content.maint.maintTitle}</h3>
              <p>{content.maint.maintText}</p>
            </div>
            <div className={styles.warrantyCard}>
              <h3><ShieldCheck className={styles.redIcon} /> {content.maint.warrantyTitle}</h3>
              <div className={styles.warrantyHighlight}>{content.maint.warrantyYears.split(' ')[0]} <span>{content.maint.warrantyYears.split(' ')[1]}</span></div>
              <p>{content.maint.warrantyText}</p>
            </div>
          </div>
        </section>

        {/* 5. REPORTS SECTION */}
        <section id="rapports" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['rapports'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.reports.title}</h2></div>
          <div className={styles.reportGrid}>
            <button
              className={styles.reportLink}
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/The%20Swiss%20Water%20Cartridge_Retention%20Rates_Certificated%20ETH%20Zurich.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <FileText className={styles.reportIcon} /> {content.reports.btnPerf}
            </button>
            <button
              className={styles.reportLink}
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <Award className={styles.reportIcon} size={24} /> {content.reports.btnCert}
            </button>
          </div>
        </section>

      </main>

      {/* PDF/IMAGE MODAL */}
      {modalUrl && (
        <div className={styles.modalOverlay} onClick={() => { setModalUrl(null); setIsLoadingPdf(false); }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => { setModalUrl(null); setIsLoadingPdf(false); }}><X size={32} /></button>
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