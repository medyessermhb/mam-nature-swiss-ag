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
const PRODUCT_ID = 'mam-nature-water-lime';
const PRODUCT_NAME = "WATER LIME";

// Prices based on 217 EUR


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
    subtitle: 'Anti-Limescale Solution: Effective, durable, and effortless.',
    btnAdd: 'Add to Cart',
    priceTBD: 'Price Coming Soon',
    descBold: 'The Limescale Challenge: Calcite (hard limescale) builds up in your pipes and appliances, causing breakdowns and dulling surfaces.',
    desc: "Our Solution: Physical Conversion. Mam Nature Swiss® Water LIME doesn't remove limescale; it transforms its structure. Using permanent magnets, scaling calcite is converted into aragonite, a non-adhesive form."
  },
  details: {
    title: 'Why Physical Conversion is Superior',
    list: [
      { label: 'Active Protection:', text: 'Protects pipes, water heaters, and household appliances.' },
      { label: 'Preserved Water:', text: 'The natural taste, minerals, and trace elements remain untouched.' },
      { label: 'Unlimited Capacity:', text: 'Sustainable, eco-friendly operation with no limits.' },
      { label: 'Zero Maintenance:', text: 'No salt, no cartridges, no energy, no waste.' }
    ],
    reduces: "The limits of traditional softeners: They alter water (replacing essential minerals with sodium), increase bacterial risk, and require high maintenance (salt, regeneration, and water waste).",
    specs: {
      material: { title: 'Technology', val: 'Permanent magnetic conversion (Calcite to Aragonite)' },
      conn: { title: 'Lifespan', val: 'Unlimited capacity' },
      flow: { title: 'Maintenance', val: 'Absolutely zero' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Simple & Professional Integration',
    cardText: 'The Water LIME is installed directly on your main water line. Its compact design allows for easy integration into existing plumbing, providing immediate protection for the whole house.'
  },
  maint: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Zero Maintenance',
    maintText: 'No salt, no cartridges, no energy, no waste. The system requires absolutely no upkeep once installed.',
    warrantyTitle: 'Excellence Warranty',
    warrantyYears: '10 YEARS',
    warrantyText: "Built with high-quality materials and powerful permanent magnets, the Water LIME is covered by a comprehensive 10-year manufacturer's warranty."
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
    subtitle: 'Solution Anti-Calcaire : Efficace, durable et sans effort.',
    btnAdd: 'Ajouter au panier',
    priceTBD: 'Prix à venir',
    descBold: 'Le défi du calcaire : La calcite, forme dure du calcaire, s\'accumule dans vos tuyaux et appareils, provoquant des pannes et ternissant les surfaces.',
    desc: "Notre Solution : Conversion Physique. Mam Nature Swiss® Water LIME n'élimine pas le calcaire, il transforme sa structure. Grâce à des aimants permanents, la calcite incrustante est convertie en aragonite, une forme non adhésive."
  },
  details: {
    title: 'Pourquoi la Conversion Physique est Supérieure',
    list: [
      { label: 'Protection active :', text: 'Protège les tuyaux, chauffe-eaux et appareils électroménagers.' },
      { label: 'Eau préservée :', text: 'Le goût, les minéraux et les oligo-éléments restent naturellement présents.' },
      { label: 'Capacité Illimitée :', text: 'Fonctionnement durable et écologique.' },
      { label: 'Zéro Entretien :', text: 'Pas de sel, pas de cartouches, pas d\'énergie, pas de déchets.' }
    ],
    reduces: "Les limites des adoucisseurs : Altère l'eau (le sodium remplace les minéraux), risque bactérien, et entretien élevé (nécessite du sel, une régénération et gaspille de l'eau).",
    specs: {
      material: { title: 'Technologie', val: 'Conversion par aimants permanents (Calcite en Aragonite)' },
      conn: { title: 'Durée de vie', val: 'Capacité illimitée' },
      flow: { title: 'Entretien', val: 'Absolument zéro' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Intégration Simple et Professionnelle',
    cardText: "Le Water LIME est installé directement sur votre arrivée d'eau principale. Son design compact permet une intégration facile dans les installations de plomberie existantes, offrant une protection immédiate à tout le réseau."
  },
  maint: {
    title: 'Maintenance & Garantie',
    maintTitle: 'Zéro Entretien',
    maintText: 'Pas de sel, pas de cartouches, pas d\'énergie, pas de déchets. Le système ne nécessite absolument aucun entretien une fois installé.',
    warrantyTitle: 'Garantie d\'Excellence',
    warrantyYears: '10 ANS',
    warrantyText: "Fabriqué avec des matériaux durables et des aimants permanents de haute qualité, le Water LIME est couvert par une garantie constructeur de 10 ans."
  },
  reports: {
    title: 'Rapports & Certificats',
    btnPerf: 'Voir le Rapport de Performance',
    btnCert: 'Voir la Certification Suisse'
  }
};

export default function WaterLimeFilterPage() {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Placeholder image. Replace with the actual Water Lime image when you upload it to Supabase.
  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20horizontal.png"
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
    const rawPrice = getRawPrice(PRODUCT_ID);
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
                    : getRawPrice(PRODUCT_ID) > 0
                      ? getPrice(PRODUCT_ID)
                      : <span style={{ color: '#D52D25', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={20} /> {content.product.priceTBD}</span>
                  }
                </div>
              </div>
              <div className={styles.cartForm}>
                <button
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  disabled={getRawPrice(PRODUCT_ID) === 0}
                  style={{ opacity: getRawPrice(PRODUCT_ID) === 0 ? 0.5 : 1, cursor: getRawPrice(PRODUCT_ID) === 0 ? 'not-allowed' : 'pointer' }}
                >
                  {getRawPrice(PRODUCT_ID) === 0 ? content.product.priceTBD : content.product.btnAdd}
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
              <Gauge className={styles.specIcon} />
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
              <h3><Check className={styles.redIcon} /> {content.maint.maintTitle}</h3>
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