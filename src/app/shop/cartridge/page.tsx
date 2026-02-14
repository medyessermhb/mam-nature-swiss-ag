'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, FileText, Award, 
  Wrench, CalendarCheck, Gauge, Infinity as InfinityIcon, X
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'water-fine-filter-cartridge';
const PRODUCT_NAME = "THE SWISS WATER CARTRIDGE";

const PRICE_MAP: Record<string, number> = {
  Morocco: 2709, // MAD
  Switzerland: 250, // CHF (Approx)
  Europe: 240       // EUR (Approx)
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
    title: 'The Swiss Water Cartridge',
    tagline: 'Mam Nature Swiss® – Solving the impossible',
    descBold: 'Perfectly filtered, soft, and naturally mineralized water.',
    desc: 'The « SWISS WATER CARTRIDGE » : Beyond filtration, a true shield. UNMATCHED SAFETY & PURITY.',
    btnAdd: 'Add to Cart'
  },
  details: {
    title: 'Advanced Filtration Technology',
    p1: 'Our 100% natural filtration technology, exclusive to Mam Nature Swiss®, combines natural protein fibers with activated carbon to achieve total adsorption, a world first. It eliminates contaminants while preserving minerals and trace elements naturally present in water.',
    p2Part1: 'Owing to its selective filtration system by full adsorption, this patented Swiss invention is the world unique universal solution, 100% natural, capable of eliminating ',
    p2Bold: 'PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium, etc. - and even radioactive substances found in nuclear water…',
    specs: {
      flow: { title: 'Flow Rate', val: 'Up to 2,000+ L/hour' },
      cap: { title: 'Capacity', val: '150m³ per cartridge' },
      maint: { title: 'Maintenance', val: '10 min / year (no tools)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Easy Installation',
    cardText: 'The cartridge simply inserts into the Water Fine Filter housing. No technical skills are required.'
  },
  maint: {
    title: 'Maintenance',
    cardTitle: 'Annual Replacement',
    cardText: "The only maintenance is replacing the cartridge once a year (or after 150m³ of use). It's a simple 10-minute operation that requires no tools."
  },
  reports: {
    title: 'Reports & Certificates',
    btnCert: 'See Swiss Certification',
    btnIso: 'ISO Certificate'
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
    title: 'The Swiss Water Cartridge',
    tagline: 'Mam Nature Swiss® – Là où l’impossible devient réalité',
    descBold: 'Une eau parfaitement filtrée, douce et naturellement minéralisée.',
    desc: 'The « SWISS WATER CARTRIDGE » : Plus qu’une filtration, un vrai bouclier. SÉCURITÉ & PURETÉ SANS ÉQUIVALENT.',
    btnAdd: 'Ajouter au panier'
  },
  details: {
    title: 'Technologie de Filtration Avancée',
    p1: 'Notre technologie 100% naturelle de filtration, exclusive Mam Nature Swiss®, basée sur des fibres naturelles associées à du charbon actif permettant une adsorption complète et unique au monde. Élimine les contaminants en préservant minéraux et oligo-éléments naturellement présents dans l’eau.',
    p2Part1: 'Grâce à ce système unique de filtration sélective par adsorption intégrale, cette invention suisse brevetée constitue l’unique solution universelle au monde, 100% naturelle, capable d’éliminer ',
    p2Bold: 'PFAS, métaux lourds, aluminium, chlore, fluor, pesticides, résidus médicamenteux, produits chimiques, tous les arsenics, mercure, chrome, et capable même de filtrer les substances radioactives de l’eau nucléaire…',
    specs: {
      flow: { title: 'Débit', val: 'Jusqu’à 1800 L/heure' },
      cap: { title: 'Capacité', val: '150m³ par cartouche' },
      maint: { title: 'Entretien', val: '10 min / an (sans outils)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Installation Facile',
    cardText: 'La cartouche s\'insère simplement dans le boîtier du Water Fine Filter. Aucune compétence technique n\'est requise.'
  },
  maint: {
    title: 'Maintenance',
    cardTitle: 'Remplacement Annuel',
    cardText: "L'unique entretien est le remplacement de la cartouche une fois par an (ou après 150m³ d'utilisation). C'est une opération simple de 10 minutes qui ne nécessite aucun outil."
  },
  reports: {
    title: 'Rapports & Certificats',
    btnCert: 'Rapport de Performance',
    btnIso: 'Cértificat de Swiss Safety System'
  }
};

export default function CartridgePage() {
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
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/CARTRIDGE.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/CARTRIDGE.webp" 
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
                <button                   data-section={item.id}                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
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
        <section id="produit" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['produit'] = el }}>
          <div className={styles.productGrid}>
            <div className={styles.productGallery}>
              <div className={styles.mainImageContainer}>
                <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {IMAGES.map((img, idx) => (
                    <img key={idx} src={img} alt={`Cartridge View ${idx + 1}`} className={styles.sliderImage} />
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
                <p className={styles.taglineMoved}>{content.product.tagline}</p>
                <p><strong>{content.product.descBold}</strong></p>
                <p>{content.product.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DETAILS SECTION */}
        <section id="details" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['details'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>
          <p style={{marginBottom: '1rem'}}>{content.details.p1}</p>
          <p style={{marginBottom: '2rem'}}>
            {content.details.p2Part1}
            <span className={styles.tooltipPfas}>PFAS</span>, 
            <strong>{content.details.p2Bold}</strong>
          </p>
          
          <div className={styles.dynamizerSpecGrid}>
            <div className={styles.specCard}>
              <Gauge className={styles.specIcon} />
              <h4>{content.details.specs.flow.title}</h4>
              <p>{content.details.specs.flow.val}</p>
            </div>
            <div className={styles.specCard}>
              <InfinityIcon className={styles.specIcon} />
              <h4>{content.details.specs.cap.title}</h4>
              <p>{content.details.specs.cap.val}</p>
            </div>
            <div className={styles.specCard}>
              <Wrench className={styles.specIcon} />
              <h4>{content.details.specs.maint.title}</h4>
              <p>{content.details.specs.maint.val}</p>
            </div>
          </div>
        </section>

        {/* 3. INSTALLATION SECTION */}
        <section id="installation" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['installation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.install.title}</h2></div>
          <div className={styles.installationCard}>
             <div className={styles.videoContainer}>
               <div style={{width:'100%', height:'100%', background:'#000', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>
                 [Installation Video Placeholder]
               </div>
             </div>
             <h3><Wrench className={styles.specIcon} /> {content.install.cardTitle}</h3>
             <p>{content.install.cardText}</p>
          </div>
        </section>

        {/* 4. MAINTENANCE SECTION */}
        <section id="maintenance" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['maintenance'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.maint.title}</h2></div>
          <div className={styles.maintenanceCard} style={{gridColumn: '1 / -1'}}>
            <h3><CalendarCheck className={styles.specIcon} /> {content.maint.cardTitle}</h3>
            <p>{content.maint.cardText}</p>
          </div>
        </section>

        {/* 5. REPORTS SECTION */}
        <section id="rapports" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['rapports'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.reports.title}</h2></div>
          <div className={styles.reportGrid}>
            <button 
              className={styles.reportLink} 
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <Award className={styles.reportIcon} /> {content.reports.btnCert}
            </button>
            <button 
              className={styles.reportLink} 
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/ISO.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <FileText className={styles.reportIcon} /> {content.reports.btnIso}
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
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                    <div style={{width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #D52D25', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}} />
                    <p style={{color: '#64748b', fontSize: '0.9rem'}}>Loading PDF...</p>
                  </div>
                </div>
              )}
              <iframe 
                src={`https://docs.google.com/gview?url=${modalUrl}&embedded=true`}
                style={{width:'100%', height:'100%', border:'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease'}} 
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