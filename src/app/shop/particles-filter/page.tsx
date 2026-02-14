'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, FileText, Award,
  Infinity as InfinityIcon, Wrench, CalendarCheck, ShieldCheck, X
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'water-particle-filter';
const PRODUCT_NAME = "WATER PARTICLE FILTER";

const PRICE_MAP: Record<string, number> = {
  Morocco: 2479.96, // MAD
  Switzerland: 218,    // CHF
  Europe: 238       // EUR (Default)
};

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    product: 'Product',
    details: 'Technical Details',
    install: 'Installation',
    maint: 'Maintenance',
    reports: 'Reports'
  },
  product: {
    title: 'Particles Filter',
    btnAdd: 'Add to Cart',
    desc: 'Particle filter with automatic backwash, pressure regulator, and 360° connector.',
    descBold: 'Compact, fully integrated solution made from medical-grade materials (316L stainless steel).'
  },
  details: {
    title: 'Technical Details',
    specs: {
      material: { title: 'Material', val: '316L stainless steel housing & high-grade brass (Particle Filter)' },
      connection: { title: 'Connections', val: '1 inch (2 3/4 inch adapters included for both units)' },
      flow: { title: 'Flow Rate', val: '1.5 m³/h (at 4 bar)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Professional Installation',
    cardText: 'Installs directly after the main water meter by a qualified plumber to treat your entire home.'
  },
  maint: {
    title: 'Maintenance',
    cardTitle: 'Automated Maintenance',
    cardText: 'The filter cleans itself automatically through the backwash mechanism, which reverses the water flow to flush out accumulated particles. This autonomous operation ensures constant efficiency and extends the life of the filter element.'
  },
  reports: {
    title: 'Reports & Certificates',
    btnIso: 'ISO Certificate',
    btnCert: 'Swiss Safety System Certificate'
  }
};

const CONTENT_FR = {
  nav: {
    product: 'Produit',
    details: 'Détails Techniques',
    install: 'Installation',
    maint: 'Entretien',
    reports: 'Rapports'
  },
  product: {
    title: 'Filtre à Particules',
    btnAdd: 'Ajouter au panier',
    desc: 'Filtre à particules avec retro-lavage automatique, régulateur de pression et orientation à 360.',
    descBold: 'Solution compacte et entièrement intégrée, matériaux de qualité médicale (parties métalliques en acier inoxydable 316L).'
  },
  details: {
    title: 'Détails Techniques',
    specs: {
      material: { title: 'Matériaux', val: 'Boîtier en acier inoxydable 316L et laiton de haute qualité (Filtre à particules)' },
      connection: { title: 'Connexions', val: '1 pouce (adaptateurs 2 3/4 pouces inclus pour les deux unités)' },
      flow: { title: 'Débit', val: '1.5 m³/h (à 4 bars)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Installation Professionnelle',
    cardText: 'S\'installe directement après le compteur d\'eau principal par un plombier qualifié pour traiter l\'ensemble de votre domicile.'
  },
  maint: {
    title: 'Maintenance',
    cardTitle: 'Maintenance Automatisée',
    cardText: 'Le filtre se nettoie automatiquement grâce au mécanisme de rétro-lavage, qui inverse le flux d\'eau pour évacuer les particules accumulées. Cette opération autonome garantit une efficacité constante et prolonge la durée de vie de l\'élément filtrant.'
  },
  reports: {
    title: 'Rapports & Certificats',
    btnIso: 'Certificat ISO 13485',
    btnCert: 'Cértificat de Swiss Safety System'
  }
};

export default function ParticleFilterPage() {
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

  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp"
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
      const offset = window.innerWidth <= 991 ? 140 : 150;
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
              <div className={styles.mainImageContainer}>
                <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {IMAGES.map((img, idx) => (
                    <img key={idx} src={img} alt={`Particle Filter View ${idx + 1}`} className={styles.sliderImage} />
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
                  {isLoading ? 'Loading...' : getPrice('water-particle-filter')}
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
                <p>{content.product.desc}</p>
                <p><strong>{content.product.descBold}</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DETAILS SECTION */}
        <section id="details" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['details'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>

          <div className={styles.dynamizerSpecGrid}>
            <div className={styles.specCard}>
              <ShieldCheck className={styles.specIcon} />
              <h4>{content.details.specs.material.title}</h4>
              <p>{content.details.specs.material.val}</p>
            </div>
            <div className={styles.specCard}>
              <Wrench className={styles.specIcon} />
              <h4>{content.details.specs.connection.title}</h4>
              <p>{content.details.specs.connection.val}</p>
            </div>
            <div className={styles.specCard}>
              <InfinityIcon className={styles.specIcon} />
              <h4>{content.details.specs.flow.title}</h4>
              <p>{content.details.specs.flow.val}</p>
            </div>
          </div>
        </section>

        {/* 3. INSTALLATION SECTION */}
        <section id="installation" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['installation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.install.title}</h2></div>
          <div className={styles.installationCard}>
            <div className={styles.videoContainer}>
              <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                [Installation Video Placeholder]
              </div>
            </div>
            <h3><Wrench className={styles.specIcon} /> {content.install.cardTitle}</h3>
            <p>{content.install.cardText}</p>
          </div>
        </section>

        {/* 4. MAINTENANCE SECTION */}
        <section id="maintenance" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['maintenance'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.maint.title}</h2></div>
          <div className={styles.maintenanceCard} style={{ gridColumn: '1 / -1' }}>
            <h3><CalendarCheck className={styles.specIcon} /> {content.maint.cardTitle}</h3>
            <p>{content.maint.cardText}</p>
          </div>
        </section>

        {/* 5. REPORTS SECTION */}
        <section id="rapports" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['rapports'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.reports.title}</h2></div>
          <div className={styles.reportGrid}>
            <button
              className={styles.reportLink}
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/ISO.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <FileText className={styles.reportIcon} /> {content.reports.btnIso}
            </button>
            <button
              className={styles.reportLink}
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <Award className={styles.reportIcon} /> {content.reports.btnCert}
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