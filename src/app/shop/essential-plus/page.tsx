'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, FileText, Award, 
  Check, Gem, ArrowLeftRight, Gauge, Wrench, CalendarCheck, ShieldCheck, X, AlertCircle
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; 

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-essential-plus';
const PRODUCT_NAME = "THE ESSENTIAL PLUS";

// Placeholder Prices (Update these when you have the final prices)
const PRICE_MAP: Record<string, number> = {
  Morocco: 10250,    // MAD
  Switzerland: 910,  // CHF
  Europe: 980        // EUR
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
    title: PRODUCT_NAME,
    subtitle: 'Fine Filter + Cartridge + Particle Filter',
    btnAdd: 'Add to Cart',
    priceTBD: 'Price Coming Soon',
    descBold: 'The ultimate whole-house filtration duo. Delivered with 1 x Particle Filter, 1 x Fine Filter Housing, and 1 x Filter Cartridge.',
    desc: "Complete protection for your home and health. The Particle Filter pre-filters sand, rust, and large debris, protecting your plumbing. The Fine Filter follows up with selective filtration, removing heavy metals, chlorine, and microplastics while preserving essential minerals."
  },
  details: {
    title: '5-Stage Comprehensive Filtration',
    list: [
      { label: 'Pre-Filtration:', text: '50 µm stainless steel mesh (Particle Filter) to remove sand, rust, and large sediments' },
      { label: 'Physical:', text: '20 µm and 5 µm membrane filter (Fine Filter)' },
      { label: 'Activated Carbon:', text: 'adsorption filtration for chlorine and organic compounds' },
      { label: 'Aqualen™:', text: 'Adsorbent fibers for efficient heavy metal filtration' },
      { label: 'Ionized Silver:', text: 'sterility in the filter cartridge without silver entering the drinking water.' }
    ],
    reduces: 'Reduces: sand, rust, chlorine, chloroform, pesticides, petrochemicals, phenol, microplastics, heavy metals up to 97 – 99 %',
    specs: {
      material: { title: 'Material', val: '316L stainless steel housing & high-grade brass (Particle Filter)' },
      conn: { title: 'Connections', val: '1 inch (2 3/4 inch adapters included for both units)' },
      flow: { title: 'Flow Rate', val: '1.5 m³/h (at 4 bar)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Professional Installation',
    cardText: 'The Essential Plus Set is installed sequentially on your main water line by a qualified plumber (Particle Filter first, followed by the Fine Filter). This ensures clean, filtered water for every tap in your house.'
  },
  maint: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Maintenance Routine',
    maintText: 'Particle Filter: Flush the valve manually every 1-2 months. Fine Filter: Change cartridge every 150 m³ (avg. 1 x per year).',
    warrantyTitle: 'Excellence Warranty',
    warrantyYears: '10 YEARS',
    warrantyText: "Made of durable materials, the housings of your filters are covered by a 10-year manufacturer's warranty."
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
    subtitle: 'Filtre à Eau Fin + Cartouche + Filtre à Particules',
    btnAdd: 'Ajouter au panier',
    priceTBD: 'Prix à venir',
    descBold: 'Le duo ultime de filtration pour toute la maison. Livré avec 1 x Filtre à Particules, 1 x Boîtier de Filtre Fin et 1 x Cartouche Filtrante.',
    desc: "Protection complète pour votre maison et votre santé. Le filtre à particules préfiltre le sable, la rouille et les gros débris, protégeant ainsi votre plomberie. Le filtre fin effectue ensuite une filtration sélective, éliminant les métaux lourds, le chlore et les microplastiques tout en préservant les minéraux."
  },
  details: {
    title: 'Filtration Complète en 5 Étapes',
    list: [
      { label: 'Pré-filtration :', text: 'Maille en acier inoxydable 50 µm (Filtre à particules) pour éliminer le sable, la rouille et les sédiments' },
      { label: 'Physique :', text: 'Filtre à membrane 20 µm et 5 µm (Filtre Fin)' },
      { label: 'Charbon Actif :', text: 'filtration par adsorption pour le chlore et les composés organiques' },
      { label: 'Aqualen™ :', text: 'Fibres adsorbantes pour une filtration efficace des métaux lourds' },
      { label: 'Argent Ionisé :', text: "stérilité dans la cartouche filtrante sans que l'argent ne pénètre dans l'eau potable." }
    ],
    reduces: 'Réduit : sable, rouille, chlore, chloroforme, pesticides, produits pétrochimiques, phénol, microplastiques, métaux lourds jusqu\'à 97 – 99 %',
    specs: {
      material: { title: 'Matériau', val: 'Boîtier en acier inoxydable 316L & laiton de haute qualité (Filtre à Particules)' },
      conn: { title: 'Connexions', val: '1 pouce (adaptateurs 3/4 pouces inclus pour les deux unités)' },
      flow: { title: 'Débit', val: '1,5 m³/h (à 4 bars)' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Installation Professionnelle',
    cardText: "Le Set Essentiel Plus est installé de manière séquentielle sur votre arrivée d'eau principale par un plombier qualifié (Filtre à particules en premier, suivi du filtre fin). Cela garantit une eau propre et filtrée à chaque robinet."
  },
  maint: {
    title: 'Maintenance & Garantie',
    maintTitle: 'Routine d\'Entretien',
    maintText: 'Filtre à particules : Purgez la valve manuellement tous les 1-2 mois. Filtre fin : Changez la cartouche tous les 150 m³ (1 x par an en moyenne).',
    warrantyTitle: 'Garantie d\'Excellence',
    warrantyYears: '10 ANS',
    warrantyText: "Fabriqués en matériaux durables, les boîtiers de vos filtres sont couverts par une garantie constructeur de 10 ans."
  },
  reports: {
    title: 'Rapports & Certificats',
    btnPerf: 'Voir le Rapport de Performance',
    btnCert: 'Voir la Certification Suisse'
  }
};

export default function EssentialPlusFilterPage() {
  const { getPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();
  
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 1. Fine Filter, 2. Cartridge, 3. Particle Filter (Make sure to update the 3rd URL to the actual particle filter image)
  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/FINE%20FILTER.png",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/CARTRIDGE.png",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLES%20FILTER.png" 
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
        <section id="produit" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['produit'] = el }}>
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
                <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide}><ChevronLeft size={32}/></button>
                <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide}><ChevronRight size={32}/></button>
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
                      : <span style={{color: '#D52D25', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px'}}><AlertCircle size={20} /> {content.product.priceTBD}</span>
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
        <section id="details" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['details'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>
          
          <ul className={styles.detailsList}>
            {content.details.list.map((item, idx) => (
              <li key={idx}>
                <Check className={styles.listIcon} size={20} />
                <div><strong>{item.label}</strong> {item.text}</div>
              </li>
            ))}
          </ul>
          
          <p style={{marginTop: '1.5rem', color: '#64748B'}}><strong>{content.details.reduces}</strong></p>

          <div className={styles.specGrid}>
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
        <section id="installation" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['installation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.install.title}</h2></div>
          <div className={styles.installationCard}>
             <h3><Wrench className={styles.redIcon} /> {content.install.cardTitle}</h3>
             <p>{content.install.cardText}</p>
          </div>
        </section>

        {/* 4. MAINTENANCE SECTION */}
        <section id="maintenance" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['maintenance'] = el }}>
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
        <section id="rapports" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['rapports'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.reports.title}</h2></div>
          <div className={styles.reportGrid}>
            <button 
              className={styles.reportLink} 
              onClick={() => setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/The%20Swiss%20Water%20Cartridge_Retention%20Rates_Certificated%20ETH%20Zurich.pdf")}
            >
              <FileText className={styles.reportIcon} size={24} /> {content.reports.btnPerf}
            </button>
            <button 
              className={styles.reportLink} 
              onClick={() => setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf")}
            >
              <Award className={styles.reportIcon} size={24} /> {content.reports.btnCert}
            </button>
          </div>
        </section>

      </main>

      {/* PDF/IMAGE MODAL */}
      {modalUrl && (
        <div className={styles.modalOverlay} onClick={() => setModalUrl(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => setModalUrl(null)}><X size={32} /></button>
            </div>
            <div className={styles.modalBody}>
              <iframe 
                src={`https://docs.google.com/gview?url=${modalUrl}&embedded=true`} 
                style={{width:'100%', height:'100%', border:'none'}} 
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}