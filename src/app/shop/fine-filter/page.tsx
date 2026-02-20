'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, FileText, Award,
  Check, Gem, ArrowLeftRight, Gauge, Wrench, CalendarCheck, ShieldCheck, X
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context


// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-water-fine-filter';
const PRODUCT_NAME = "WATER FINE FILTER";

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
    title: PRODUCT_NAME,
    subtitle: 'Water Fine Filter',
    btnAdd: 'Add to Cart',
    descBold: 'Delivered with 1 x filter cartridge included.',
    desc: "Selective filtration: preserves the water's structure and composition (like minerals): This means all minerals and trace elements remain in the drinking water."
  },
  details: {
    title: 'Unique Quadruple Filtration System',
    list: [
      { label: 'Physical:', text: '20 µm and 5 µm membrane filter' },
      { label: 'Activated Carbon:', text: 'adsorption filtration' },
      { label: 'Aqualen™:', text: 'Adsorbent fibers for efficient heavy metal filtration' },
      { label: 'Ionized Silver:', text: 'sterility in the filter cartridge without silver entering the drinking water.' }
    ],
    reduces: 'Reduces: chlorine, chloroform, pesticides, petrochemicals, phenol, microplastics, heavy metals up to 97 – 99 %',
    specs: {
      material: { title: 'Material', val: '316L stainless steel housing & food-grade parts' },
      conn: { title: 'Connections', val: '1 inch (2 3/4 inch adapters included)' },
      flow: { title: 'Flow Rate', val: '1.5 m³/h (at 4 bar)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Professional Installation',
    cardText: 'The Water Fine Filter is installed on your main water line by a qualified plumber. Its compact design allows for easy integration.'
  },
  maint: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Simplified Maintenance',
    maintText: 'Maintenance required: Filter cartridge change every 150 m³ (on average 1 x per year)',
    warrantyTitle: 'Excellence Warranty',
    warrantyYears: '10 YEARS',
    warrantyText: "Made of durable medical-grade stainless steel, the housing of your filter is covered by a 10-year manufacturer's warranty."
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
    details: 'Détails Techniques',
    install: 'Installation',
    maint: 'Entretien',
    reports: 'Rapports'
  },
  product: {
    title: PRODUCT_NAME,
    subtitle: 'Filtre à Eau Fin',
    btnAdd: 'Ajouter au panier',
    descBold: 'Livré avec 1 x cartouche filtrante incluse.',
    desc: "Filtration sélective : préserve la structure de l'eau et sa composition (comme les minéraux) : Cela signifie que tous les minéraux et oligo-éléments restent dans l'eau potable."
  },
  details: {
    title: 'Système Unique de Quadruple Filtration',
    list: [
      { label: 'Physique :', text: 'Filtre à membrane 20 µm et 5 µm' },
      { label: 'Charbon Actif :', text: 'filtration par adsorption' },
      { label: 'Aqualen™ :', text: 'Fibres adsorbantes pour une filtration efficace des métaux lourds' },
      { label: 'Argent Ionisé :', text: "stérilité dans la cartouche filtrante sans que l'argent ne pénètre dans l'eau potable." }
    ],
    reduces: 'Réduit : chlore, chloroforme, pesticides, produits pétrochimiques, phénol, microplastiques, métaux lourds jusqu\'à 97 – 99 %',
    specs: {
      material: { title: 'Matériau', val: 'Boîtier en acier inoxydable 316L & pièces alimentaires' },
      conn: { title: 'Connexions', val: '1 pouce (2 adaptateurs 3/4 pouces inclus)' },
      flow: { title: 'Débit', val: '1,5 m³/h (à 4 bars)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Installation Professionnelle',
    cardText: "Le Filtre Fin est installé sur votre conduite d'eau principale par un plombier qualifié. Son design compact permet une intégration facile."
  },
  maint: {
    title: 'Maintenance & Garantie',
    maintTitle: 'Maintenance Simplifiée',
    maintText: 'Entretien requis : Changement de cartouche filtrante tous les 150 m³ (en moyenne 1 x par an)',
    warrantyTitle: 'Garantie d\'Excellence',
    warrantyYears: '10 ANS',
    warrantyText: "Fabriqué en acier inoxydable de qualité médicale durable, le boîtier de votre filtre est couvert par une garantie constructeur de 10 ans."
  },
  reports: {
    title: 'Rapports & Certificats',
    btnPerf: 'Voir le Rapport de Performance',
    btnCert: 'Voir la Certification Suisse'
  }
};

const CONTENT_DE = {
  nav: {
    product: 'Produkt',
    details: 'Technische Details',
    install: 'Installation',
    maint: 'Wartung',
    reports: 'Berichte'
  },
  product: {
    title: PRODUCT_NAME,
    subtitle: 'Wasserfeinfilter',
    btnAdd: 'In den Warenkorb',
    descBold: 'Wird mit 1 x Filterkartusche geliefert.',
    desc: "Selektive Filtration: erhält die Struktur und Zusammensetzung des Wassers (z. B. Mineralien): Das bedeutet, dass alle Mineralien und Spurenelemente im Trinkwasser verbleiben."
  },
  details: {
    title: 'Einzigartiges 4-fach-Filtrationssystem',
    list: [
      { label: 'Physikalisch:', text: '20 µm und 5 µm Membranfilter' },
      { label: 'Aktivkohle:', text: 'Adsorptionsfiltration' },
      { label: 'Aqualen™:', text: 'Adsorbierende Fasern für eine effiziente Filtration von Schwermetallen' },
      { label: 'Ionisiertes Silber:', text: 'Keimfreiheit in der Filterkartusche, ohne dass Silber ins Trinkwasser gelangt.' }
    ],
    reduces: 'Reduziert: Chlor, Chloroform, Pestizide, Petrochemikalien, Phenol, Mikroplastik, Schwermetalle bis zu 97 – 99 %',
    specs: {
      material: { title: 'Material', val: 'Gehäuse aus 316L Edelstahl & lebensmittelechte Teile' },
      conn: { title: 'Anschlüsse', val: '1 Zoll (2 x 3/4 Zoll Adapter inklusive)' },
      flow: { title: 'Durchflussrate', val: '1,5 m³/h (bei 4 bar)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Professionelle Installation',
    cardText: 'Der Wasserfeinfilter wird von einem qualifizierten Klempner an Ihrer Hauptwasserleitung installiert. Sein kompaktes Design ermöglicht eine einfache Integration.'
  },
  maint: {
    title: 'Wartung & Garantie',
    maintTitle: 'Vereinfachte Wartung',
    maintText: 'Erforderliche Wartung: Wechsel der Filterkartusche alle 150 m³ (durchschnittlich 1 x pro Jahr)',
    warrantyTitle: 'Exzellenz-Garantie',
    warrantyYears: '10 JAHRE',
    warrantyText: "Das Gehäuse Ihres Filters besteht aus langlebigem medizinischem Edelstahl und ist durch eine 10-jährige Herstellergarantie abgedeckt."
  },
  reports: {
    title: 'Prüfberichte & Zertifikate',
    btnPerf: 'Leistungsbericht anzeigen',
    btnCert: 'Schweizer Zertifizierung ansehen'
  }
};

export default function FineFilterPage() {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES = [
    "/images/WEBSITE-P/products/FINE_FILTER.webp",
    "/images/WEBSITE-P/products/FINE_FILTER.webp"
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
                    <img key={idx} src={img} alt={`Fine Filter View ${idx + 1}`} className={styles.sliderImage} />
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
                <h2 className={styles.productSubtitle}>{content.product.subtitle}</h2>
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
                <Check className={styles.listIcon} />
                <div><strong>{item.label}</strong> {item.text}</div>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: '1.5rem' }}><strong>{content.details.reduces}</strong></p>

          <div className={styles.dynamizerSpecGrid}>
            <div className={styles.specCard}>
              <Gem className={styles.specIcon} />
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
          <div className={styles.maintenanceGrid}>
            <div className={styles.maintenanceCard}>
              <h3><CalendarCheck className={styles.specIcon} /> {content.maint.maintTitle}</h3>
              <p>{content.maint.maintText}</p>
            </div>
            <div className={styles.warrantyCard}>
              <h3><ShieldCheck className={styles.specIcon} /> {content.maint.warrantyTitle}</h3>
              <div className={styles.warrantyHighlight}>{content.maint.warrantyYears}</div>
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
                setModalUrl("/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <FileText className={styles.reportIcon} /> {content.reports.btnPerf}
            </button>
            <button
              className={styles.reportLink}
              onClick={() => {
                setModalUrl("/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf");
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