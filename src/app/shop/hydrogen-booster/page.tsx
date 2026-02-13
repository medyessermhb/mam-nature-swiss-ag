'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, Atom, Brain, Shield, HeartPulse, Battery, Cpu, 
  FlaskConical, Droplet, Zap, Smile, HandMetal, FileText, Award, X 
} from 'lucide-react';
import styles from '@/styles/HydrogenBooster.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'swiss-hydrogen-booster';
const PRODUCT_NAME = "SWISS HYDROGEN BOOSTER";

const PRICE_MAP: Record<string, number> = {
  Morocco: 2292.40, // MAD
  Switzerland: 206.80, // CHF
  Europe: 220.00    // EUR (Default)
};

// --- DATA DEFINITION ---

const CONTENT_EN = {
  hero: {
    badge: 'Class 1 Medical Device',
    title: 'SWISS HYDROGEN',
    titleSpan: 'BOOSTER',
    features: [
      "7500 PPB pure hydrogen — world record",
      "Battery capacity: up to 15 uses (charge 0-100% in 1h)",
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
      chargeVal: '0-100% in 1h'
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
      { title: 'SPE Technology', text: 'Solid Polymer Electrolyte technology ensures 99.9% pure hydrogen.' }
    ]
  },
  usage: {
    title: 'Simple Use in 3 Steps',
    steps: [
      { title: 'Fill', text: 'Open your booster and fill it with drinking water.' },
      { title: 'Activate', text: 'Press the button to start electrolysis. Wait a few minutes.' },
      { title: 'Drink', text: 'Your hydrogen-enriched water is ready.' }
    ]
  },
  details: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Easy Maintenance',
    maintText: 'Regularly clean the bottle with water and mild soap. Recharge via USB.',
    warrantyTitle: 'Manufacturer Warranty',
    warrantyYears: '2 YEARS',
    warrantyText: 'Covered for total peace of mind.'
  },
  science: {
    title: 'Reports & Certificates',
    ceTitle: 'CE Certificate',
    ceBtn: 'View Certificate',
    confTitle: 'CE Conformity',
    confBtn: 'View PDF'
  }
};

const CONTENT_FR = {
  hero: {
    badge: 'Dispositif Médical de Classe 1',
    title: 'SWISS HYDROGEN',
    titleSpan: 'BOOSTER',
    features: [
      "7500 PPB d'hydrogène pur — record mondial",
      "Batterie : jusqu'à 15 utilisations (charge 0-100% en 1h)",
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
      chargeVal: '0-100% en 1h'
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
      { title: 'Technologie SPE', text: 'La technologie d\'électrolyte polymère solide de pointe garantit un hydrogène pur à 99,9%.' }
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
    ceTitle: 'Certificat CE',
    ceBtn: 'Voir le certificat',
    confTitle: 'Évaluation Conformité CE',
    confBtn: 'Voir le document (PDF)'
  }
};

export default function HydrogenBoosterPage() {
  const { getPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();
  
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;
  
  const [activeSection, setActiveSection] = useState('benefits');
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const MAIN_IMAGE = "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/HYDROGEEN%20BOOSTER.png";

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
    const currentRegion = currency === 'MAD' ? 'Morocco' : currency === 'CHF' ? 'Switzerland' : 'Europe';
    const rawPrice = PRICE_MAP[currentRegion] || PRICE_MAP['Europe'];
    const currencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

    addToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: rawPrice,
      currency: currencyCode,
      image: MAIN_IMAGE
    });
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot}></span> {content.hero.badge}
            </div>
            <h1 className={styles.titleMain}>
              {content.hero.title} <br/><span className={styles.textHighlight}>{content.hero.titleSpan}</span>
            </h1>
            <ul className={styles.featuresList}>
              {content.hero.features.map((item, i) => (
                <li key={i}><Check size={16} className={styles.checkIcon} /> {item}</li>
              ))}
            </ul>

            <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'20px'}}>
              <img src="https://cdn.prod.website-files.com/6772955ff9646840f29d1d3d/692ace3a32f2b7514a12cf42_WhatsApp%20Image%202025-11-29%20at%2011.36.32%201.svg" alt="CE Mark" style={{height:'40px'}} />
              <span style={{fontSize:'0.9rem', fontWeight:600, color:'#576778', lineHeight: 1.2, whiteSpace: 'pre-line'}}>
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
            <div className={styles.heroBgCircle}></div>
            <img 
              src={MAIN_IMAGE} 
              alt="Swiss Hydrogen Booster" 
              className={styles.heroProductImg} 
            />
            
            <div className={styles.heroBadgesStack}>
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon}`}><Droplet size={20} /></div>
                <div>
                  <p style={{fontSize:'0.65rem', color:'#D52D25', fontWeight:800, textTransform:'uppercase', margin:0}}>{content.hero.badges.concTitle}</p>
                  <p style={{fontSize:'0.75rem', color:'#64748b', fontWeight:700, margin:0}}>{content.hero.badges.concLabel}</p>
                  <p style={{fontSize:'1.1rem', fontWeight:800, color:'#2C3E50', margin:0}}>{content.hero.badges.concVal}</p>
                </div>
              </div>
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon} ${styles.iconGreen}`}><Battery size={20} /></div>
                <div>
                  <p style={{fontSize:'0.75rem', color:'#64748b', fontWeight:700, margin:0}}>{content.hero.badges.battLabel}</p>
                  <p style={{fontSize:'1.1rem', fontWeight:800, color:'#2C3E50', margin:0}}>{content.hero.badges.battVal}</p>
                </div>
              </div>
              <div className={styles.heroFloatingBadge}>
                <div className={`${styles.badgeIcon} ${styles.iconRed}`}><Zap size={20} /></div>
                <div>
                  <p style={{fontSize:'0.75rem', color:'#64748b', fontWeight:700, margin:0}}>{content.hero.badges.chargeLabel}</p>
                  <p style={{fontSize:'1.1rem', fontWeight:800, color:'#2C3E50', margin:0}}>{content.hero.badges.chargeVal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <div className={styles.contentGrid}>
        
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            {[
              { id: 'benefits', label: content.nav.benefits },
              { id: 'usage', label: content.nav.usage },
              { id: 'details', label: content.nav.details },
              { id: 'science', label: content.nav.science }
            ].map((link) => (
              <button 
                key={link.id}
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
            </div>
          </section>

          {/* USAGE STEPS */}
          <section id="usage" className={styles.section} style={{background: '#F8FAFC'}}>
            <h2 className={styles.sectionTitle}>{content.usage.title}</h2>
            <div className={styles.stepsGrid}>
              <div className={styles.stepItem} style={{backgroundImage: `url('https://cdn.prod.website-files.com/6772955ff9646840f29d1d3d/6928595ae38a8c5f73692d00_hydrogen%20booser%203.jpeg')`}}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}><h3><Droplet /> {content.usage.steps[0].title}</h3><p>{content.usage.steps[0].text}</p></div>
              </div>
              <div className={styles.stepItem} style={{backgroundImage: `url('https://cdn.prod.website-files.com/6772955ff9646840f29d1d3d/6928595aaa3cd07b410d9823_hydrogen%20booser%208.jpeg')`}}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}><h3><Zap /> {content.usage.steps[1].title}</h3><p>{content.usage.steps[1].text}</p></div>
              </div>
              <div className={styles.stepItem} style={{backgroundImage: `url('https://cdn.prod.website-files.com/6772955ff9646840f29d1d3d/6928595ae4cee31ebe723026_hydrogen%20booser%205.jpeg')`}}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}><h3><Smile /> {content.usage.steps[2].title}</h3><p>{content.usage.steps[2].text}</p></div>
              </div>
            </div>
          </section>

          {/* MAINTENANCE */}
          <section id="details" className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.details.title}</h2>
            <div className={styles.bentoGrid} style={{gridTemplateColumns: '1fr 1fr'}}>
              <div className={styles.bentoCard}>
                <div className={styles.iconCircle}><HandMetal className={styles.bentoIcon} /></div>
                <h3>{content.details.maintTitle}</h3>
                <p>{content.details.maintText}</p>
              </div>
              <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
                <div className={styles.iconCircle}><Award className={styles.bentoIcon} /></div>
                <h3>{content.details.warrantyTitle}</h3>
                <h2 style={{fontSize:'3rem', color:'#D52D25', margin:'10px 0'}}>{content.details.warrantyYears}</h2>
                <p>{content.details.warrantyText}</p>
              </div>
            </div>
          </section>

          {/* REPORTS */}
          <section id="science" className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.science.title}</h2>
            <div className={styles.scienceGrid}>
              <button className={styles.scienceCard} onClick={() => setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Mam%20Nature%20Swiss%20Hydrogen%20Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf")}>
                <div className={styles.scienceIconBox}><FlaskConical /></div>
                <div><h4>{content.science.ceTitle}</h4><span>{content.science.ceBtn}</span></div>
              </button>
              <button className={styles.scienceCard} onClick={() => setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Mam%20Nature%20Swiss%20Hydrogen%20Booster_CE-Conformity%20Assessment_2025-005-CR-01_signed.pdf")}>
                <div className={styles.scienceIconBox}><FileText /></div>
                <div><h4>{content.science.confTitle}</h4><span>{content.science.confBtn}</span></div>
              </button>
            </div>
          </section>

        </div>
      </div>

      {/* PDF/IMAGE MODAL */}
      {modalUrl && (
        <div className={styles.modalOverlay} onClick={() => setModalUrl(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span style={{fontWeight:700}}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => setModalUrl(null)}><X /></button>
            </div>
            <div className={styles.modalBody}>
              {modalUrl.endsWith('.pdf') ? (
                <iframe 
                  src={`https://docs.google.com/gview?url=${modalUrl}&embedded=true`} 
                  style={{width:'100%', height:'100%', border:'none'}} 
                  title="Document Preview"
                />
              ) : (
                <img src={modalUrl} alt="Document" style={{maxWidth:'100%', height:'auto'}} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}