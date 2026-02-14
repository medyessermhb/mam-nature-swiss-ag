'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Minus, FileText, Award,
  Star, Shield, Gauge, Activity, X, Droplet,
  CheckCircle, XCircle, Wrench, CalendarCheck, ShieldCheck, Infinity as InfinityIcon
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context


// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'the-swiss-water-dynamizer';
const PRODUCT_NAME = "THE SWISS WATER DYNAMIZER";

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    product: 'Product',
    benefits: 'Benefits',
    details: 'Technical Details',
    science: 'Science',
    install: 'Installation',
    maint: 'Maintenance'
  },
  product: {
    title: PRODUCT_NAME,
    tagline: 'Nature\'s intelligence at the service of your well-being.',
    descBold: 'Restore your water\'s original vitality with The Swiss Water Dynamizer.',
    desc: "The Swiss Water Dynamizer works entirely physically to restore water's beneficial properties. It doesn’t filter – it revitalizes.",
    btnAdd: 'Add to Cart'
  },
  benefits: {
    title: 'Benefits for you and your family',
    cards: [
      { title: 'Exceptional taste', text: 'Discover soft, remarkably digestible, and pleasant water to drink.' },
      { title: 'Optimal cellular hydration', text: 'Supports proper body function.' },
      { title: 'Limescale deposit reduction', text: 'Naturally protects your appliances and surfaces without salt or chemicals.' },
      { title: 'Unmatched performance', text: 'With a treatment capacity of 5,000 liters/hour, it serves the needs of the whole house.' }
    ]
  },
  details: {
    title: 'The Problem & The Solution',
    intro: 'Water is life. Yet, modern drinking water, though treated, often loses its natural ability to deeply hydrate our cells. It is therefore essential to consume water that is not only pure and mineralized, but also living and structured.',
    problem: {
      title: 'Problem of modern water',
      p1: { title: 'Low cellular bioavailability', text: 'Industrial treatments and demineralization alter the molecular structure of water, creating "large water molecule clusters" that our cells hardly absorb.' },
      p2: { title: 'Destructured water', text: 'In its natural state, high-quality water has a perfect hexagonal structure, key to optimal hydration. This structure, vital for our organism, is unfortunately destroyed on its journey to our tap.' }
    },
    solution: {
      title: 'The Solution: Its Triple Action',
      s1: { title: '1. Restructuring and revitalization', text: 'Breaks large water molecule clusters into micro-clusters, making water highly bioavailable for your cells. Simultaneously, it transmits natural frequencies and harmonious vibrations to the water, restoring its natural hexagonal structure.' },
      s2: { title: '2. Limescale Transformation', text: 'Through a combination of magnetic fields with precise intensity and orientation, limescale (hard calcite) is converted into soft aragonite.', quote: 'Note: Limescale is nothing more than calcium and magnesium... A responsible treatment doesn\'t eliminate them but softens them...' },
      s3: { title: '3. Long-Term Stabilization', text: 'Dynamized water gains a biologically stable structure that lasts over time.' }
    },
    specs: {
      flow: { title: 'Flow Rate', val: '5,000 L/hour' },
      cap: { title: 'Capacity', val: 'Unlimited' },
      maint: { title: 'Maintenance', val: 'None' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Professional Installation',
    cardText: 'The Dynamizer is installed on your main water line by a qualified plumber. Its compact design allows for easy integration into your existing system.'
  },
  maint: {
    title: 'Maintenance & Warranty',
    maintTitle: 'Zero Maintenance',
    maintText: 'The Swiss Water Dynamizer is designed to operate for decades without any maintenance. Once installed, you don\'t have to worry about it.',
    warrantyTitle: 'Excellence Warranty',
    warrantyYears: '10 YEARS',
    warrantyText: "Made of durable medical-grade stainless steel, your dynamizer is covered by a 10-year manufacturer's warranty."
  },
  science: {
    title: 'Science & Useful Links',
    btnCert: 'ISO Certificate'
  }
};

const CONTENT_FR = {
  nav: {
    product: 'Produit',
    benefits: 'Bénéfices',
    details: 'Détails Techniques',
    science: 'Science',
    install: 'Installation',
    maint: 'Maintenance'
  },
  product: {
    title: PRODUCT_NAME,
    tagline: "L'intelligence de la nature au service de votre bien-être.",
    descBold: 'Redonnez à votre eau sa vitalité originelle grâce au Swiss Water Dynamizer.',
    desc: "The Swiss Water Dynamizer agit de manière 100% physique pour restituer à l'eau toutes ses propriétés bénéfiques. Il ne filtre pas, il revitalise.",
    btnAdd: 'Ajouter au panier'
  },
  benefits: {
    title: 'Les bénéfices pour vous et votre famille',
    cards: [
      { title: 'Goût exceptionnel', text: 'Découvrez une eau douce, remarquablement digeste et agréable à boire.' },
      { title: 'Hydratation cellulaire optimale', text: 'Favorise le bon fonctionnement de l’organisme.' },
      { title: 'Réduction des dépôts de calcaire', text: 'Protège naturellement vos électroménagers et vos surfaces sans utiliser de sel ou de produits chimiques.' },
      { title: 'Performance inégalée', text: 'Avec une capacité de traitement de 5 000 litres/heure, il répond aux besoins de toute la maison.' }
    ]
  },
  details: {
    title: 'Le Problème & La Solution',
    intro: "L'eau est source de vie. Pourtant, l'eau potable moderne, bien que traitée, perd souvent sa capacité naturelle à hydrater nos cellules en profondeur. Il est donc essentiel de consommer une eau non seulement pure et minéralisée, mais aussi vivante et structurée.",
    problem: {
      title: "Problème de l'eau moderne",
      p1: { title: 'Faible biodisponibilité cellulaire', text: "Les traitements industriels altèrent la structure moléculaire de l'eau, créant de \"gros clusters\" que nos cellules absorbent difficilement." },
      p2: { title: 'Eau déstructurée', text: "À l'état naturel, une eau de qualité a une structure hexagonale parfaite. Cette structure est malheureusement détruite lors de son acheminement." }
    },
    solution: {
      title: 'La Solution : Son action triple',
      s1: { title: '1. Restructuration et revitalisation', text: "Fragmente les gros clusters en micro-clusters, rendant l'eau hautement biodisponible. Restitue sa structure hexagonale naturelle." },
      s2: { title: '2. Transformation du calcaire', text: 'Grâce à des champs magnétiques, le calcaire (calcite dure) est converti en aragonite douce.', quote: "Note : Le calcaire n'est rien d'autre que du calcium et du magnésium... Un traitement responsable ne les élimine pas mais les adoucit..." },
      s3: { title: '3. Stabilisation durable', text: "L'eau dynamisée acquiert une structure biologiquement stable qui dure dans le temps." }
    },
    specs: {
      flow: { title: 'Débit', val: '5 000 L/heure' },
      cap: { title: 'Capacité', val: 'Illimitée' },
      maint: { title: 'Entretien', val: 'Zéro entretien' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Installation Professionnelle',
    cardText: "Le Dynamiseur s'installe sur votre arrivée d'eau principale par un plombier qualifié. Son design compact permet une intégration facile dans votre système existant."
  },
  maint: {
    title: 'Maintenance & Garantie',
    maintTitle: 'Zéro Maintenance',
    maintText: "Le Swiss Water Dynamizer est conçu pour fonctionner pendant des décennies sans aucun entretien. Une fois installé, vous n'avez plus à vous en soucier.",
    warrantyTitle: 'Garantie d\'Excellence',
    warrantyYears: '10 ANS',
    warrantyText: "Fabriqué en inox médical durable, votre dynamiseur est couvert par une garantie constructeur de 10 ans pour une tranquillité d'esprit totale."
  },
  science: {
    title: 'Certificats',
    btnCert: 'Certificat ISO 13485'
  }
};

export default function DynamizerPage() {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES = [
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp",
    "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp"
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

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
              { id: 'usages', label: content.nav.benefits },
              { id: 'details', label: content.nav.details },
              { id: 'installation', label: content.nav.install },
              { id: 'maintenance', label: content.nav.maint },
              { id: 'sciences', label: content.nav.science }
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
                    <img key={idx} src={img} alt={`Dynamizer View ${idx + 1}`} className={styles.sliderImage} />
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

        {/* 2. BENEFITS SECTION */}
        <section id="usages" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['usages'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.benefits.title}</h2></div>
          <div className={styles.usagesGrid}>
            <div className={styles.usageCard} style={{ backgroundImage: `url('https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/coffee%20big.webp')` }}>
              <div className={styles.usageContent}>
                <Star className={styles.usageIcon} />
                <h3>{content.benefits.cards[0].title}</h3>
                <p>{content.benefits.cards[0].text}</p>
              </div>
            </div>
            <div className={styles.usageCard} style={{ backgroundImage: `url('https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/drinking%20big.webp')` }}>
              <div className={styles.usageContent}>
                <Droplet className={styles.usageIcon} />
                <h3>{content.benefits.cards[1].title}</h3>
                <p>{content.benefits.cards[1].text}</p>
              </div>
            </div>
            <div className={styles.usageCard} style={{ backgroundImage: `url('https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/shower%20big.webp')` }}>
              <div className={styles.usageContent}>
                <Shield className={styles.usageIcon} />
                <h3>{content.benefits.cards[2].title}</h3>
                <p>{content.benefits.cards[2].text}</p>
              </div>
            </div>
            <div className={styles.usageCard} style={{ backgroundImage: `url('https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/washing%20big.webp')` }}>
              <div className={styles.usageContent}>
                <Gauge className={styles.usageIcon} />
                <h3>{content.benefits.cards[3].title}</h3>
                <p>{content.benefits.cards[3].text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DETAILS / PROBLEM & SOLUTION SECTION */}
        <section id="details" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['details'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>
          <p style={{ marginBottom: '2rem' }}>{content.details.intro}</p>

          <div className={styles.productGrid}>

            {/* COLUMN 1: PROBLEM */}
            <div className={styles.flowColumn}>
              <h3>{content.details.problem.title}</h3>
              <ul className={styles.iconList}>
                <li className={`${styles.iconListItem} ${expandedItems['prob1'] ? styles.active : ''}`}>
                  <XCircle className={`${styles.listIcon} ${styles.iconProblem}`} size={20} />
                  <div className={styles.listText}>
                    <strong onClick={() => toggleItem('prob1')}>
                      {content.details.problem.p1.title}
                      <Plus className={styles.toggleIconInner} size={16} />
                    </strong>
                    <span className={expandedItems['prob1'] ? styles.expanded : ''}>
                      {content.details.problem.p1.text}
                    </span>
                  </div>
                </li>
                <li className={`${styles.iconListItem} ${expandedItems['prob2'] ? styles.active : ''}`}>
                  <XCircle className={`${styles.listIcon} ${styles.iconProblem}`} size={20} />
                  <div className={styles.listText}>
                    <strong onClick={() => toggleItem('prob2')}>
                      {content.details.problem.p2.title}
                      <Plus className={styles.toggleIconInner} size={16} />
                    </strong>
                    <span className={expandedItems['prob2'] ? styles.expanded : ''}>
                      {content.details.problem.p2.text}
                    </span>
                  </div>
                </li>
              </ul>
              <div className={styles.imagePair}>
                <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68db19801650b6d08333f5d3_cell%20before.png" alt="Cell before dynamization" />
                <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1c2bbf5b4fe2f0c82ee3_Cell%20mouth%20Big%20clusters.png" alt="Water cluster before dynamization" />
              </div>
            </div>

            {/* COLUMN 2: SOLUTION */}
            <div className={styles.flowColumn}>
              <h3>{content.details.solution.title}</h3>
              <ul className={styles.iconList}>
                <li className={`${styles.iconListItem} ${expandedItems['sol1'] ? styles.active : ''}`}>
                  <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                  <div className={styles.listText}>
                    <strong onClick={() => toggleItem('sol1')}>
                      {content.details.solution.s1.title}
                      <Plus className={styles.toggleIconInner} size={16} />
                    </strong>
                    <span className={expandedItems['sol1'] ? styles.expanded : ''}>
                      {content.details.solution.s1.text}
                    </span>
                  </div>
                </li>
                <li className={`${styles.iconListItem} ${expandedItems['sol2'] ? styles.active : ''}`}>
                  <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                  <div className={styles.listText}>
                    <strong onClick={() => toggleItem('sol2')}>
                      {content.details.solution.s2.title}
                      <Plus className={styles.toggleIconInner} size={16} />
                    </strong>
                    <span className={expandedItems['sol2'] ? styles.expanded : ''}>
                      <blockquote className={styles.blockquote}>
                        {content.details.solution.s2.quote}
                      </blockquote>
                      {content.details.solution.s2.text}
                    </span>
                  </div>
                </li>
                <li className={`${styles.iconListItem} ${expandedItems['sol3'] ? styles.active : ''}`}>
                  <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                  <div className={styles.listText}>
                    <strong onClick={() => toggleItem('sol3')}>
                      {content.details.solution.s3.title}
                      <Plus className={styles.toggleIconInner} size={16} />
                    </strong>
                    <span className={expandedItems['sol3'] ? styles.expanded : ''}>
                      {content.details.solution.s3.text}
                    </span>
                  </div>
                </li>
              </ul>
              <div className={styles.imagePair}>
                <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68db1980b6ba9dc316c8be9e_Frame%201.png" alt="Cell after dynamization" />
                <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1c2bb9d316188c73a11a_Cell%20mouth%20Micro%20clusters.png" alt="Water cluster after dynamization" />
              </div>
            </div>

          </div>

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

        {/* 4. INSTALLATION SECTION */}
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

        {/* 5. MAINTENANCE SECTION */}
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

        {/* 6. SCIENCE SECTION */}
        <section id="sciences" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['sciences'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.science.title}</h2></div>
          <div className={styles.reportGrid}>
            <button
              className={styles.reportLink}
              onClick={() => {
                setModalUrl("https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/ISO.pdf");
                setIsLoadingPdf(true);
              }}
            >
              <FileText className={styles.reportIcon} /> {content.science.btnCert}
            </button>
          </div>
        </section>

      </main>
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