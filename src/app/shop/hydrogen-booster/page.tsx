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

const CONTENT_DE = {
  hero: {
    badge: 'Medizinprodukt Klasse 1',
    title: 'SWISS HYDROGEN',
    titleSpan: 'BOOSTER',
    features: [
      "7500 PPB reiner Wasserstoff — Weltrekord",
      "Akkulaufzeit: bis zu 15 Anwendungen",
      "Physikalisches Verfahren (PEM-Elektrolyse + 10 bar Druck)",
      "Kompakt, wiederaufladbar, kein Nachgeschmack",
      "+1000 wissenschaftliche Studien zu den Vorteilen von H₂",
      "Schweizer Innovation, zertifizierte Materialien",
      "Kapazität: 280ml, Garantie: 2 Jahre"
    ],
    certText: 'CE-zertifiziert\nISO 13485 Medizinprodukt Klasse 1',
    btnAdd: 'In den Warenkorb',
    badges: {
      concTitle: 'Weltrekord',
      concLabel: 'KONZENTRATION',
      concVal: '7500 PPB',
      battLabel: 'AKKU',
      battVal: '15 Anwendungen',
      chargeLabel: 'SCHNELLLADUNG',
      chargeVal: '0-100% in 1h',
      capLabel: 'KAPAZITÄT',
      capVal: '280ml',
      warLabel: 'GARANTIE',
      warVal: '2 Jahre'
    }
  },
  nav: {
    benefits: 'Gesundheitliche Vorteile',
    usage: 'Anwendung',
    details: 'Wartung & Garantie',
    science: 'Berichte & Zertifikate'
  },
  benefits: {
    title: 'Ein Gesundheitsinstrument für Ihren Alltag',
    cards: [
      { title: '7500 PPB Konzentration', text: 'Weltrekord-Sättigung durch 10-bar Hochdruck-PEM-Elektrolyse. Ein wahrer Durchbruch in der Wasserstoff-Wasser-Technologie.' },
      { title: 'Zerebral & Athletisch', text: 'Molekularer Wasserstoff hilft, Gehirnzellen vor oxidativem Stress zu schützen, während er gleichzeitig die Erholung verbessert und Muskelermüdung verringert.' },
      { title: 'Antioxidans', text: 'Bekämpft freie Radikale und unterstützt das natürliche Abwehrsystem Ihres Körpers.' },
      { title: 'Tägliche Gesundheit', text: 'Integrieren Sie ganz einfach einen kraftvollen Gesundheits-Boost in Ihre Hydratationsroutine.' },
      { title: 'Lange Akkulaufzeit', text: 'Akkulaufzeit für bis zu 15 Anwendungen pro Ladung. Vollständige Aufladung von 0% auf 100% in nur 1 Stunde über USB.' },
      { title: 'SPE-Technologie', text: 'Die Feststoffpolymer-Elektrolyt-Technologie garantiert 99,9 % reinen Wasserstoff.' },
      { title: '280ml Kapazität', text: 'Perfekte Größe für unterwegs. Hergestellt aus hochwertigen, zertifizierten Materialien.' }
    ]
  },
  usage: {
    title: 'Einfache Anwendung in 3 Schritten',
    steps: [
      { title: 'Füllen', text: 'Öffnen Sie Ihren Booster und füllen Sie ihn bis zur angezeigten Markierung mit Trinkwasser.' },
      { title: 'Aktivieren', text: 'Drücken Sie die Taste, um den Elektrolyseprozess zu starten. Warten Sie ein paar Minuten.' },
      { title: 'Trinken', text: 'Ihr wasserstoffangereichertes Wasser ist fertig. Genießen Sie die Vorteile über den ganzen Tag.' }
    ]
  },
  details: {
    title: 'Wartung & Garantie',
    maintTitle: 'Einfache Wartung',
    maintText: 'Reinigen Sie die Flasche regelmäßig mit Wasser und milder Seife. Laden Sie den Akku bei Bedarf über USB auf (Akkulaufzeit bis zu 15 Zyklen).',
    warrantyTitle: 'Herstellergarantie',
    warrantyYears: '2 JAHRE',
    warrantyText: 'Ihr SWISS HYDROGEN BOOSTER ist mit einer 2-jährigen Garantie für absolute Sorgenfreiheit abgedeckt.'
  },
  science: {
    title: 'Berichte & Zertifikate',
    items: [
      { id: 'ce', title: 'CE-Zertifikat', btn: 'Zertifikat ansehen', icon: 'FlaskConical', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf', type: 'pdf' },
      { id: 'manual', title: 'Benutzerhandbuch', btn: 'Handbuch ansehen (9 Seiten)', icon: 'Book', url: '/images/website-assets/certificates/manual/page_1.jpg,/images/website-assets/certificates/manual/page_2.jpg,/images/website-assets/certificates/manual/page_3.jpg,/images/website-assets/certificates/manual/page_4.jpg,/images/website-assets/certificates/manual/page_5.jpg,/images/website-assets/certificates/manual/page_6.jpg,/images/website-assets/certificates/manual/page_7.jpg,/images/website-assets/certificates/manual/page_8.jpg,/images/website-assets/certificates/manual/page_9.jpg', type: 'image' },
      { id: 'iso', title: 'ISO 13485 Zertifikat', btn: 'Zertifikat ansehen', icon: 'Award', url: '/images/website-assets/certificates/ISO.pdf', type: 'pdf' },
      { id: 'conformity', title: 'CE-Konformitätsbewertung', btn: 'Dokument ansehen (PDF)', icon: 'FileText', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf', type: 'pdf' }
    ]
  }
};

const CONTENT_ES = {
  hero: {
    badge: 'Dispositivo Médico de Clase 1',
    title: 'SWISS HYDROGEN',
    titleSpan: 'BOOSTER',
    features: [
      "7500 PPB de hidrógeno puro — récord mundial",
      "Batería: hasta 15 usos",
      "Proceso físico (Electrólisis PEM + 10 bares de presión)",
      "Compacto, recargable, sin retrogusto",
      "+1000 estudios científicos sobre los beneficios del H₂",
      "Innovación suiza, materiales certificados",
      "Capacidad: 280ml, Garantía: 2 años"
    ],
    certText: 'Certificado CE\nDispositivo Médico Certificado ISO 13485',
    btnAdd: 'Añadir al carrito',
    badges: {
      concTitle: 'Récord Mundial',
      concLabel: 'Concentración',
      concVal: '7500 PPB',
      battLabel: 'Batería',
      battVal: '15 Usos',
      chargeLabel: 'Carga Rápida',
      chargeVal: '0-100% en 1h',
      capLabel: 'Capacidad',
      capVal: '280ml',
      warLabel: 'Garantía',
      warVal: '2 Años'
    }
  },
  nav: {
    benefits: 'Beneficios',
    usage: 'Uso',
    details: 'Mantenimiento y Garantía',
    science: 'Informes y Certificados'
  },
  benefits: {
    title: 'Una herramienta de salud para tu día a día',
    cards: [
      { title: 'Concentración de 7500 PPB', text: 'Saturación récord mundial utilizando electrólisis PEM de alta presión (10 bares). Un verdadero avance en la tecnología del agua hidrogenada.' },
      { title: 'Cerebral y Atlético', text: 'El hidrógeno molecular ayuda a proteger las células cerebrales contra el estrés oxidativo y, al mismo tiempo, mejora la recuperación y reduce la fatiga muscular.' },
      { title: 'Antioxidante', text: 'Combate los radicales libres y apoya el sistema de defensa natural de su cuerpo.' },
      { title: 'Salud Diaria', text: 'Incorpore fácilmente un poderoso impulso de salud a su rutina de hidratación diaria.' },
      { title: 'Larga Duración', text: 'Capacidad de la batería para hasta 15 usos por carga. Carga completa del 0% al 100% en solo 1 hora mediante USB.' },
      { title: 'Tecnología SPE', text: 'La tecnología de Electrolito de Polímero Sólido garantiza hidrógeno puro al 99,9%.' },
      { title: 'Capacidad de 280ml', text: 'Tamaño perfecto para su portabilidad. Construido con materiales certificados de alta calidad.' }
    ]
  },
  usage: {
    title: 'Uso sencillo en 3 pasos',
    steps: [
      { title: 'Llenar', text: 'Abra su booster y llénelo de agua potable hasta la marca indicada.' },
      { title: 'Activar', text: 'Pulse el botón para iniciar el proceso de electrólisis. Espere unos minutos.' },
      { title: 'Beber', text: 'Su agua enriquecida con hidrógeno está lista. Disfrute de sus beneficios durante todo el día.' }
    ]
  },
  details: {
    title: 'Mantenimiento y Garantía',
    maintTitle: 'Mantenimiento Fácil',
    maintText: 'Limpie regularmente la botella con agua y jabón suave. Recargue la batería a través de USB cuando sea necesario (vida útil de la batería hasta 15 ciclos).',
    warrantyTitle: 'Garantía del Fabricante',
    warrantyYears: '2 AÑOS',
    warrantyText: 'Su SWISS HYDROGEN BOOSTER está cubierto por una garantía de 2 años para su total tranquilidad.'
  },
  science: {
    title: 'Informes y Certificados',
    items: [
      { id: 'ce', title: 'Certificado CE', btn: 'Ver Certificado', icon: 'FlaskConical', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf', type: 'pdf' },
      { id: 'manual', title: 'Manual de Usuario', btn: 'Ver Manual (9 Páginas)', icon: 'Book', url: '/images/website-assets/certificates/manual/page_1.jpg,/images/website-assets/certificates/manual/page_2.jpg,/images/website-assets/certificates/manual/page_3.jpg,/images/website-assets/certificates/manual/page_4.jpg,/images/website-assets/certificates/manual/page_5.jpg,/images/website-assets/certificates/manual/page_6.jpg,/images/website-assets/certificates/manual/page_7.jpg,/images/website-assets/certificates/manual/page_8.jpg,/images/website-assets/certificates/manual/page_9.jpg', type: 'image' },
      { id: 'iso', title: 'Certificado ISO 13485', btn: 'Ver Certificado', icon: 'Award', url: '/images/website-assets/certificates/ISO.pdf', type: 'pdf' },
      { id: 'conformity', title: 'Evaluación de Conformidad CE', btn: 'Ver Documento (PDF)', icon: 'FileText', url: '/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf', type: 'pdf' }
    ]
  }
};

export default function HydrogenBoosterPage() {
  const { getPrice, getRawPrice, isLoading, currency } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const isSpanish = language === 'es';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : isSpanish ? CONTENT_ES : CONTENT_EN;

  const [activeSection, setActiveSection] = useState('benefits');
  const [modalUrls, setModalUrls] = useState<string[] | null>(null);
  const [modalIsPdf, setModalIsPdf] = useState(false);
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
              <div className={styles.stepItem} style={{ backgroundImage: `url('/images/products/hydrogen_booster/hydrogen_booster_3.webp')` }}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}><h3><Droplet /> {content.usage.steps[0].title}</h3><p>{content.usage.steps[0].text}</p></div>
              </div>
              <div className={styles.stepItem} style={{ backgroundImage: `url('/images/products/hydrogen_booster/hydrogen_booster_8.webp')` }}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}><h3><Zap /> {content.usage.steps[1].title}</h3><p>{content.usage.steps[1].text}</p></div>
              </div>
              <div className={styles.stepItem} style={{ backgroundImage: `url('/images/products/hydrogen_booster/hydrogen_booster_5.webp')` }}>
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
                  } else {
                    setModalIsPdf(false);
                    setModalUrls(item.url.split(','));
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
        <div className={styles.modalOverlay} onClick={() => { setModalUrls(null); }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span style={{ fontWeight: 700 }}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => { setModalUrls(null); }}><X /></button>
            </div>

            <div className={styles.modalBody}>

              {modalIsPdf && modalUrls[0] ? (
                <iframe
                  src={modalUrls[0]}
                  
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Document Preview"

                >
                  <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                    <p>Preview not available.</p>
                    <a href={modalUrls[0]} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                      Download PDF
                    </a>
                  </div>
                </iframe>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
                  {modalUrls.map((url, idx) => (
                    <img key={idx} src={url.trim()} alt={`Document Page ${idx + 1}`} className={styles.modalPageImage} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}