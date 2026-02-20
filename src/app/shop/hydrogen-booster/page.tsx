'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Check, Atom, Brain, Shield, HeartPulse, Battery, Cpu,
  FlaskConical, Droplet, Zap, Smile, HandMetal, FileText, Award, X, Book
} from 'lucide-react';
import styles from '@/styles/HydrogenBooster.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'swiss-hydrogen-booster';
const PRODUCT_NAME = "SWISS HYDROGEN BOOSTER";

// --- DATA DEFINITION ---

const CONTENT_EN = {
  hero: {
    badge: 'Class 1 Medical Device',
    title: 'SWISS HYDROGEN',
    titleSpan: 'BOOSTER',
    features: [
      "7500 PPB pure hydrogen — world record",
      "Battery capacity: up to 15 uses",
      "Physical process (PEM Electrolysis + 10 bar pressure)",
      "Compact, rechargeable, no aftertaste",
      "+1000 scientific studies on the benefits of H₂",
      "Swiss innovation, certified materials",
      "Capacity: 280ml, Warranty: 2 years"
    ],
    certText: 'CE certified\nISO 13485 Class 1 Medical Device',
    btnAdd: 'Add to Cart',
    badges: {
      concTitle: 'Highest in World',
      concLabel: 'CONCENTRATION',
      concVal: '7500 PPB',
      battLabel: 'BATTERY',
      battVal: '15 Uses',
      chargeLabel: 'FAST CHARGE',
      chargeVal: '0-100% in 1h',
      capLabel: 'CAPACITY',
      capVal: '280ml',
      warLabel: 'WARRANTY',
      warVal: '2 Years'
    }
  },
  nav: {
    benefits: 'Health Benefits',
    usage: 'How to Use',
    details: 'Maintenance & Warranty',
    science: 'Reports & Certificates'
  },
  benefits: {
    title: 'A Health Tool for Your Daily Life',
    cards: [
      { title: '7500 PPB Concentration', text: 'World record saturation using 10-bar high-pressure PEM electrolysis. A true breakthrough in hydrogen water technology.' },
      { title: 'Cerebral & Athletic', text: 'Molecular hydrogen helps protect brain cells against oxidative stress while simultaneously improving recovery and reducing muscle fatigue.' },
      { title: 'Antioxidant', text: 'Fight free radicals and support your body\'s natural defense.' },
      { title: 'Daily Health', text: 'Easily integrate a powerful health boost into your routine.' },
      { title: 'Long Life', text: 'Battery capacity up to 15 uses. Full charge in 1 hour via USB.' },
      { title: 'SPE Technology', text: 'Solid Polymer Electrolyte technology ensures 99.9% pure hydrogen.' },
      { title: '280ml Capacity', text: 'Perfectly sized for portability. Constructed with premium, certified materials.' }
    ]
  },
  usage: {
    title: 'Simple Use in 3 Steps',
    steps: [
      { title: 'Fill', text: 'Open your booster and fill it with drinking water up to the indicated level.' },
      { title: 'Activate', text: 'Press the button to start the electrolysis process. Wait a few minutes.' },
      { title: 'Drink', text: 'Your hydrogen-enriched water is ready. Enjoy its benefits throughout the day.' }
    ]
  },
  details: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Easy Maintenance',
    maintText: 'Regularly clean the bottle with water and mild soap. Recharge the battery via USB when necessary (battery life up to 15 cycles).',
    warrantyTitle: 'Manufacturer Warranty',
    warrantyYears: '2 YEARS',
    warrantyText: 'Your SWISS HYDROGEN BOOSTER is covered by a 2-year warranty for total peace of mind.'
  },
  science: {
    title: 'Reports & Certificates',
    items: [
      { id: 'ce', title: 'CE Certificate', btn: 'View Certificate', icon: 'FlaskConical', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf', type: 'pdf' },
      { id: 'manual', title: 'User Manual', btn: 'View Manual (9 Pages)', icon: 'Book', url: '/images/website-assets/certificates/manual/page_1.jpg,/images/website-assets/certificates/manual/page_2.jpg,/images/website-assets/certificates/manual/page_3.jpg,/images/website-assets/certificates/manual/page_4.jpg,/images/website-assets/certificates/manual/page_5.jpg,/images/website-assets/certificates/manual/page_6.jpg,/images/website-assets/certificates/manual/page_7.jpg,/images/website-assets/certificates/manual/page_8.jpg,/images/website-assets/certificates/manual/page_9.jpg', type: 'image' },
      { id: 'iso', title: 'ISO 13485 Certificate', btn: 'View Certificate', icon: 'Award', url: '/images/website-assets/certificates/ISO.pdf', type: 'pdf' },
      { id: 'conformity', title: 'CE Conformity Assessment', btn: 'View Document (PDF)', icon: 'FileText', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf', type: 'pdf' }
    ]
  }
};

const CONTENT_FR = {
  hero: {
    badge: 'Dispositif Médical de Classe 1',
    title: 'SWISS HYDROGEN',
    titleSpan: 'BOOSTER',
    features: [
      "7500 PPB d'hydrogène pur — record mondial",
      "Batterie : jusqu'à 15 utilisations",
      "Procédé physique (Électrolyse PEM + pression de 10 bars)",
      "Compact, rechargeable, sans arrière-goût",
      "+1000 études scientifiques sur les bienfaits de l'H₂",
      "Innovation suisse, matériaux certifiés",
      "Capacité : 280ml, Garantie : 2 ans"
    ],
    certText: 'Certifié CE\nDispositif Médical Certifié ISO 13485',
    btnAdd: 'Ajouter au panier',
    badges: {
      concTitle: 'Record Mondial',
      concLabel: 'Concentration',
      concVal: '7500 PPB',
      battLabel: 'Batterie',
      battVal: '15 Usages',
      chargeLabel: 'Charge Rapide',
      chargeVal: '0-100% en 1h',
      capLabel: 'Capacité',
      capVal: '280ml',
      warLabel: 'Garantie',
      warVal: '2 Ans'
    }
  },
  nav: {
    benefits: 'Bienfaits Santé',
    usage: 'Utilisation',
    details: 'Garantie',
    science: 'Rapports et Science'
  },
  benefits: {
    title: 'Un outil de santé pour votre quotidien',
    cards: [
      { title: 'Concentration 7500 PPB', text: 'Saturation record mondial utilisant l\'électrolyse PEM haute pression (10 bars). Une véritable percée dans la technologie de l\'eau hydrogénée.' },
      { title: 'Cérébral & Athlétique', text: 'L\'hydrogène moléculaire aide à protéger les cellules cérébrales contre le stress oxydatif tout en améliorant la récupération.' },
      { title: 'Antioxydant', text: 'Combat les radicaux libres et soutient le système de défense naturel de votre corps.' },
      { title: 'Santé Quotidienne', text: 'Intégrez facilement un puissant boost de santé à votre routine d\'hydratation quotidienne.' },
      { title: 'Longue Durée', text: 'Capacité de batterie jusqu\'à 15 utilisations par charge. Charge complète de 0% à 100% en seulement 1 heure via USB.' },
      { title: 'Technologie SPE', text: 'La technologie d\'électrolyte polymère solide de pointe garantit un hydrogène pur à 99,9%.' },
      { title: 'Capacité 280ml', text: 'Taille parfaite pour la portabilité. Construit avec des matériaux de qualité certifiés.' }
    ]
  },
  usage: {
    title: 'Utilisation simple en 3 étapes',
    steps: [
      { title: 'Remplir', text: 'Ouvrez votre booster et remplissez-le d\'eau potable jusqu\'au niveau indiqué.' },
      { title: 'Activer', text: 'Appuyez sur le bouton pour démarrer le processus d\'électrolyse. Attendez quelques minutes.' },
      { title: 'Boire', text: 'Votre eau enrichie en hydrogène est prête. Profitez de ses bienfaits tout au long de la journée.' }
    ]
  },
  details: {
    title: 'Maintenance et Garantie',
    maintTitle: 'Maintenance Facile',
    maintText: 'Nettoyez régulièrement la bouteille avec de l\'eau et du savon doux. Rechargez la batterie via USB lorsque nécessaire.',
    warrantyTitle: 'Garantie Fabricant',
    warrantyYears: '2 ANS',
    warrantyText: 'Votre SWISS HYDROGEN BOOSTER est couvert par une garantie de 2 ans pour une tranquillité d\'esprit totale.'
  },
  science: {
    title: 'Rapports et Science',
    items: [
      { id: 'ce', title: 'Certificat CE', btn: 'Voir le certificat', icon: 'FlaskConical', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf', type: 'pdf' },
      { id: 'manual', title: 'Manuel d\'utilisation', btn: 'Voir le manuel (9 Pages)', icon: 'Book', url: '/images/website-assets/certificates/manual/page_1.jpg,/images/website-assets/certificates/manual/page_2.jpg,/images/website-assets/certificates/manual/page_3.jpg,/images/website-assets/certificates/manual/page_4.jpg,/images/website-assets/certificates/manual/page_5.jpg,/images/website-assets/certificates/manual/page_6.jpg,/images/website-assets/certificates/manual/page_7.jpg,/images/website-assets/certificates/manual/page_8.jpg,/images/website-assets/certificates/manual/page_9.jpg', type: 'image' },
      { id: 'iso', title: 'Certificat ISO 13485', btn: 'Voir le certificat', icon: 'Award', url: '/images/website-assets/certificates/ISO.pdf', type: 'pdf' },
      { id: 'conformity', title: 'Évaluation Conformité CE', btn: 'Voir le document (PDF)', icon: 'FileText', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf', type: 'pdf' }
    ]
  }
};

export default function HydrogenBoosterPage() {
  const { getPrice, getRawPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [activeSection, setActiveSection] = useState('benefits');
  const [modalUrls, setModalUrls] = useState<string[] | null>(null);
  const [modalIsPdf, setModalIsPdf] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const MAIN_IMAGE = "/images/WEBSITE-P/products/HYDROGEEN_BOOSTER.webp";

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // Auto-scroll active nav item into view on mobile (horizontal only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1023 && sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const activeNavLink = sidebar.querySelector(`button[data-section="${activeSection}"]`) as HTMLElement;

      if (activeNavLink) {
        // Calculate center position
        const left = activeNavLink.offsetLeft - (sidebar.offsetWidth / 2) + (activeNavLink.offsetWidth / 2);
        sidebar.scrollTo({ left, behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth <= 1023 ? 140 : 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    const rawPrice = getRawPrice(PRODUCT_ID);
    const currencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

    addToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: rawPrice,
      currency: currencyCode,
      image: MAIN_IMAGE
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical />;
      case 'Book': return <Book />;
      case 'Award': return <Award />;
      case 'FileText': return <FileText />;
      default: return <FlaskConical />;
    }
  };

  return (
    <div className={styles.pageWrapper}>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={`${styles.heroPill} ${styles.desktopOnly}`}>
              <span className={styles.heroPillDot}></span> {content.hero.badge}
            </div>
            <h1 className={styles.titleMain}>
              {content.hero.title} <br /><span className={styles.textHighlight}>{content.hero.titleSpan}</span>
            </h1>
            <ul className={styles.featuresList}>
              {content.hero.features.map((item, i) => (
                <li key={i}><Check size={16} className={styles.checkIcon} /> {item}</li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <img src="/images/website-assets/certificates/ce_mark.svg" alt="CE Mark" style={{ height: '40px', width: 'auto' }} loading="lazy" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#576778', lineHeight: 1.2, whiteSpace: 'pre-line' }}>
                {content.hero.certText}
              </span>
            </div>

            <div className={styles.priceTag}>
              {isLoading ? 'Loading...' : getPrice(PRODUCT_ID)}
            </div>

            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              {content.hero.btnAdd}
            </button>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={`${styles.heroPill} ${styles.mobileOnly}`}>
              <span className={styles.heroPillDot}></span> {content.hero.badge}
            </div>

            <div className={styles.heroBgCircle}></div>
            <img
              src={MAIN_IMAGE}
              alt="Swiss Hydrogen Booster"
              className={styles.heroProductImg}
            />

            <div className={styles.heroBadgesStack}>
              {/* 1. Concentration */}
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon}`}><Droplet size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.65rem', color: '#D52D25', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>{content.hero.badges.concTitle}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>{content.hero.badges.concLabel}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2C3E50', margin: 0 }}>{content.hero.badges.concVal}</p>
                </div>
              </div>
              {/* 2. Battery */}
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon} ${styles.iconGreen}`}><Battery size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>{content.hero.badges.battLabel}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2C3E50', margin: 0 }}>{content.hero.badges.battVal}</p>
                </div>
              </div>
              {/* 3. Fast Charge */}
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon} ${styles.iconRed}`}><Zap size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>{content.hero.badges.chargeLabel}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2C3E50', margin: 0 }}>{content.hero.badges.chargeVal}</p>
                </div>
              </div>
              {/* 4. Capacity */}
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon} ${styles.iconPurple}`}><FlaskConical size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>{content.hero.badges.capLabel}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2C3E50', margin: 0 }}>{content.hero.badges.capVal}</p>
                </div>
              </div>
              {/* 5. Warranty */}
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon} ${styles.iconOrange}`}><Shield size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>{content.hero.badges.warLabel}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2C3E50', margin: 0 }}>{content.hero.badges.warVal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <div className={styles.contentGrid}>

        {/* SIDEBAR */}
        <aside className={styles.sidebar} ref={sidebarRef}>
          <nav className={styles.sidebarNav}>
            {[
              { id: 'benefits', label: content.nav.benefits },
              { id: 'usage', label: content.nav.usage },
              { id: 'details', label: content.nav.details },
              { id: 'science', label: content.nav.science }
            ].map((link) => (
              <button
                key={link.id}
                data-section={link.id}
                className={`${styles.sidebarLink} ${activeSection === link.id ? styles.active : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN COLUMN */}
        <div className={styles.contentColumn}>

          {/* FEATURES */}
          <section id="benefits" className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.benefits.title}</h2>
            <div className={styles.bentoGrid}>
              <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
                <div className={styles.iconCircle}><Atom className={styles.bentoIcon} /></div>
                <div><h3>{content.benefits.cards[0].title}</h3><p>{content.benefits.cards[0].text}</p></div>
              </div>
              <div className={`${styles.bentoCard} ${styles.bentoWide}`}>
                <div className={styles.iconCircle}><Brain className={styles.bentoIcon} /></div>
                <div><h3>{content.benefits.cards[1].title}</h3><p>{content.benefits.cards[1].text}</p></div>
              </div>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><Shield className={styles.bentoIcon} /></div>
                <h3>{content.benefits.cards[2].title}</h3><p>{content.benefits.cards[2].text}</p>
              </div>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><HeartPulse className={styles.bentoIcon} /></div>
                <h3>{content.benefits.cards[3].title}</h3><p>{content.benefits.cards[3].text}</p>
              </div>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><Battery className={styles.bentoIcon} /></div>
                <h3>{content.benefits.cards[4].title}</h3><p>{content.benefits.cards[4].text}</p>
              </div>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><Cpu className={styles.bentoIcon} /></div>
                <h3>{content.benefits.cards[5].title}</h3><p>{content.benefits.cards[5].text}</p>
              </div>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><Droplet className={styles.bentoIcon} /></div>
                <h3>{content.benefits.cards[6].title}</h3><p>{content.benefits.cards[6].text}</p>
              </div>
            </div>
          </section>

          {/* USAGE STEPS */}
          <section id="usage" className={styles.section} style={{ background: '#F8FAFC' }}>
            <h2 className={styles.sectionTitle}>{content.usage.title}</h2>
            <div className={styles.stepsGrid}>
              <div className={styles.stepItem} style={{ backgroundImage: `url('/images/WEBSITE-P/products/hydrogeen%20booster/hydrogen%20booser%203.webp')` }}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}><h3><Droplet /> {content.usage.steps[0].title}</h3><p>{content.usage.steps[0].text}</p></div>
              </div>
              <div className={styles.stepItem} style={{ backgroundImage: `url('/images/WEBSITE-P/products/hydrogeen%20booster/hydrogen%20booser%208.webp')` }}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}><h3><Zap /> {content.usage.steps[1].title}</h3><p>{content.usage.steps[1].text}</p></div>
              </div>
              <div className={styles.stepItem} style={{ backgroundImage: `url('/images/WEBSITE-P/products/hydrogeen%20booster/hydrogen%20booser%205.webp')` }}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}><h3><Smile /> {content.usage.steps[2].title}</h3><p>{content.usage.steps[2].text}</p></div>
              </div>
            </div>
          </section>

          {/* MAINTENANCE */}
          <section id="details" className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.details.title}</h2>
            <div className={`${styles.bentoGrid} ${styles.bentoTwoCol}`}>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><HandMetal className={styles.bentoIcon} /></div>
                <h3>{content.details.maintTitle}</h3>
                <p>{content.details.maintText}</p>
              </div>
              <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
                <div className={styles.iconCircle}><Award className={styles.bentoIcon} /></div>
                <h3>{content.details.warrantyTitle}</h3>
                <h2 style={{ fontSize: '3rem', color: '#D52D25', margin: '10px 0' }}>{content.details.warrantyYears}</h2>
                <p>{content.details.warrantyText}</p>
              </div>
            </div>
          </section>

          {/* REPORTS */}
          <section id="science" className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.science.title}</h2>
            <div className={styles.scienceGrid}>
              {content.science.items.map((item, i) => (
                <button key={i} className={styles.scienceCard} onClick={() => {
                  if (item.type === 'pdf') {
                    setModalIsPdf(true);
                    setModalUrls([item.url]);
                    setIsLoadingPdf(true);
                  } else {
                    setModalIsPdf(false);
                    setModalUrls(item.url.split(','));
                    setIsLoadingPdf(false);
                  }
                }}>
                  <div className={styles.scienceIconBox}>
                    {getIcon(item.icon)}
                  </div>
                  <div><h4>{item.title}</h4><span>{item.btn}</span></div>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* PDF/IMAGE MODAL */}
      {modalUrls && (
        <div className={styles.modalOverlay} onClick={() => { setModalUrls(null); setIsLoadingPdf(false); }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span style={{ fontWeight: 700 }}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => { setModalUrls(null); setIsLoadingPdf(false); }}><X /></button>
            </div>

            <div className={styles.modalBody}>
              {isLoadingPdf && modalIsPdf && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #D52D25', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading document...</p>
                  </div>
                </div>
              )}

              {modalIsPdf && modalUrls[0] ? (
                <object
                  data={modalUrls[0]}
                  type="application/pdf"
                  style={{ width: '100%', height: '100%', border: 'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
                  title="Document Preview"
                  onLoad={() => setIsLoadingPdf(false)}
                >
                  <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                    <p>Preview not available.</p>
                    <a href={modalUrls[0]} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                      Download PDF
                    </a>
                  </div>
                </object>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
                  {modalUrls.map((url, idx) => (
                    <img key={idx} src={url.trim()} alt={`Document Page ${idx + 1}`} className={styles.modalPageImage} />
                  ))}
                </div>
              )}
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