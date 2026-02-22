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
      s2: { title: '2. Limescale Transformation', text: 'Through a combination of magnetic fields with precise intensity and orientation, limescale (hard Calcite) is converted into soft Aragonite.', quote: 'Note: Limescale is nothing more than calcium and magnesium... A responsible treatment doesn\'t eliminate them but softens them...' },
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
      s2: { title: '2. Transformation du calcaire', text: 'Grâce à des champs magnétiques, le calcaire (Calcite dure) est converti en Aragonite douce.', quote: "Note : Le calcaire n'est rien d'autre que du calcium et du magnésium... Un traitement responsable ne les élimine pas mais les adoucit..." },
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

const CONTENT_DE = {
  nav: {
    product: 'Produkt',
    benefits: 'Vorteile',
    details: 'Technische Details',
    science: 'Wissenschaft',
    install: 'Installation',
    maint: 'Wartung'
  },
  product: {
    title: PRODUCT_NAME,
    tagline: 'Die Intelligenz der Natur im Dienste Ihres Wohlbefindens.',
    descBold: 'Geben Sie Ihrem Wasser seine ursprüngliche Vitalität zurück mit The Swiss Water Dynamizer.',
    desc: "The Swiss Water Dynamizer wirkt rein physikalisch, um die vorteilhaften Eigenschaften des Wassers wiederherzustellen. Er filtert nicht – er revitalisiert.",
    btnAdd: 'In den Warenkorb'
  },
  benefits: {
    title: 'Vorteile für Sie und Ihre Familie',
    cards: [
      { title: 'Außergewöhnlicher Geschmack', text: 'Entdecken Sie weiches, bemerkenswert bekömmliches und angenehmes Wasser zum Trinken.' },
      { title: 'Optimale zelluläre Hydratation', text: 'Unterstützt die richtige Körperfunktion.' },
      { title: 'Reduzierung von Kalkablagerungen', text: 'Schützt Ihre Geräte und Oberflächen auf natürliche Weise ohne Salz oder Chemikalien.' },
      { title: 'Unerreichte Leistung', text: 'Mit einer Verarbeitungskapazität von 5.000 Litern/Stunde erfüllt er die Bedürfnisse des ganzen Hauses.' }
    ]
  },
  details: {
    title: 'Das Problem & Die Lösung',
    intro: 'Wasser ist Leben. Dennoch verliert modernes Trinkwasser, auch wenn es behandelt ist, oft seine natürliche Fähigkeit, unsere Zellen tiefgreifend zu hydratisieren. Es ist daher essenziell, Wasser zu konsumieren, das nicht nur rein und mineralisiert, sondern auch lebendig und strukturiert ist.',
    problem: {
      title: 'Das Problem mit modernem Wasser',
      p1: { title: 'Geringe zelluläre Bioverfügbarkeit', text: 'Industrielle Behandlungen und Demineralisierung verändern die molekulare Struktur des Wassers und erzeugen "große Wassermolekül-Cluster", die von unseren Zellen kaum aufgenommen werden.' },
      p2: { title: 'Destrukturiertes Wasser', text: 'Im Naturzustand hat hochwertiges Wasser eine perfekte hexagonale Struktur, der Schlüssel zu optimaler Hydratation. Diese für unseren Körper lebenswichtige Struktur wird auf ihrem Weg zu unserem Wasserhahn leider zerstört.' }
    },
    solution: {
      title: 'Die Lösung: Ihre dreifache Wirkung',
      s1: { title: '1. Umstrukturierung und Revitalisierung', text: 'Bricht große Wassermolekül-Cluster in Mikro-Cluster auf, wodurch Wasser für Ihre Zellen hochgradig bioverfügbar wird. Gleichzeitig überträgt er natürliche Frequenzen und harmonische Schwingungen auf das Wasser und stellt seine natürliche hexagonale Struktur wieder her.' },
      s2: { title: '2. Kalkumwandlung', text: 'Durch eine Kombination von Magnetfeldern mit präziser Intensität und Ausrichtung wird Kalk (harter Calcit) in weichen Aragonit umgewandelt.', quote: 'Hinweis: Kalk ist nichts anderes als Kalzium und Magnesium... Eine verantwortungsvolle Behandlung eliminiert sie nicht, sondern erweicht sie...' },
      s3: { title: '3. Langzeitstabilisierung', text: 'Dynamisiertes Wasser erhält eine biologisch stabile Struktur, die über die Zeit anhält.' }
    },
    specs: {
      flow: { title: 'Durchflussrate', val: '5.000 L/Stunde' },
      cap: { title: 'Kapazität', val: 'Unbegrenzt' },
      maint: { title: 'Wartung', val: 'Keine' }
    }
  },
  install: {
    title: 'Installation',
    cardTitle: 'Professionelle Installation',
    cardText: 'Der Dynamizer wird von einem qualifizierten Klempner an Ihre Hauptwasserleitung angeschlossen. Sein kompaktes Design ermöglicht eine einfache Integration in Ihr bestehendes System.'
  },
  maint: {
    title: 'Wartung & Garantie',
    maintTitle: 'Keine Wartung',
    maintText: 'The Swiss Water Dynamizer ist für einen jahrzehntelangen Betrieb ganz ohne Wartung ausgelegt. Nach der Installation müssen Sie sich um nichts mehr kümmern.',
    warrantyTitle: 'Exzellenz-Garantie',
    warrantyYears: '10 JAHRE',
    warrantyText: 'Ihr Dynamizer besteht aus langlebigem medizinischem Edelstahl und ist durch eine 10-jährige Herstellergarantie abgedeckt.'
  },
  science: {
    title: 'Wissenschaft & Nützliche Links',
    btnCert: 'ISO Zertifikat'
  }
};

const CONTENT_ES = {
  nav: {
    product: 'Producto',
    benefits: 'Beneficios',
    details: 'Detalles Técnicos',
    science: 'Ciencia',
    install: 'Instalación',
    maint: 'Mantenimiento'
  },
  product: {
    title: PRODUCT_NAME,
    tagline: 'La inteligencia de la naturaleza al servicio de su bienestar.',
    descBold: 'Devuelva a su agua su vitalidad original con The Swiss Water Dynamizer.',
    desc: "The Swiss Water Dynamizer funciona de forma puramente física para restaurar las propiedades beneficiosas del agua. No filtra, revitaliza.",
    btnAdd: 'Añadir al carrito'
  },
  benefits: {
    title: 'Beneficios para usted y su familia',
    cards: [
      { title: 'Sabor excepcional', text: 'Descubra un agua suave, notablemente digerible y agradable de beber.' },
      { title: 'Hidratación celular óptima', text: 'Favorece el buen funcionamiento del organismo.' },
      { title: 'Reducción de depósitos de cal', text: 'Protege de forma natural sus electrodomésticos y superficies sin usar sal ni productos químicos.' },
      { title: 'Rendimiento inigualable', text: 'Con una capacidad de tratamiento de 5.000 litros/hora, satisface las necesidades de toda la casa.' }
    ]
  },
  details: {
    title: 'El Problema y La Solución',
    intro: 'El agua es fuente de vida. Sin embargo, el agua potable moderna, aunque esté tratada, a menudo pierde su capacidad natural para hidratar profundamente nuestras células. Por lo tanto, es esencial consumir agua que no solo sea pura y mineralizada, sino también viva y estructurada.',
    problem: {
      title: 'El problema del agua moderna',
      p1: { title: 'Baja biodisponibilidad celular', text: 'Los tratamientos industriales alteran la estructura molecular del agua, creando "grandes racimos" que nuestras células apenas absorben.' },
      p2: { title: 'Agua desestructurada', text: 'En su estado natural, un agua de calidad tiene una estructura hexagonal perfecta. Desgraciadamente, esta estructura se destruye durante su transporte.' }
    },
    solution: {
      title: 'La Solución: Su triple acción',
      s1: { title: '1. Reestructuración y revitalización', text: 'Rompe los grandes racimos en micro-racimos, haciendo que el agua sea altamente biodisponible. Restaura su estructura hexagonal natural.' },
      s2: { title: '2. Transformación de la cal', text: 'Gracias a los campos magnéticos, la cal (Calcita dura) se convierte en Aragonito blando.', quote: 'Nota: La cal no es más que calcio y magnesio... Un tratamiento responsable no los elimina, sino que los suaviza...' },
      s3: { title: '3. Estabilización duradera', text: 'El agua dinamizada adquiere una estructura biológicamente estable que perdura en el tiempo.' }
    },
    specs: {
      flow: { title: 'Caudal', val: '5.000 L/hora' },
      cap: { title: 'Capacidad', val: 'Ilimitada' },
      maint: { title: 'Mantenimiento', val: 'Cero mantenimiento' }
    }
  },
  install: {
    title: 'Instalación',
    cardTitle: 'Instalación Profesional',
    cardText: 'El Dinamizador se instala en su toma de agua principal por un fontanero cualificado. Su diseño compacto permite una fácil integración en su sistema existente.'
  },
  maint: {
    title: 'Mantenimiento y Garantía',
    maintTitle: 'Mantenimiento Cero',
    maintText: 'The Swiss Water Dynamizer está diseñado para funcionar durante décadas sin ningún tipo de mantenimiento. Una vez instalado, no tiene que preocuparse por él.',
    warrantyTitle: 'Garantía de Excelencia',
    warrantyYears: '10 AÑOS',
    warrantyText: 'Fabricado en acero inoxidable médico duradero, su dinamizador está cubierto por una garantía del fabricante de 10 años para su total tranquilidad.'
  },
  science: {
    title: 'Certificados',
    btnCert: 'Certificado ISO 13485'
  }
};

export default function DynamizerPage() {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const isSpanish = language === 'es';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : isSpanish ? CONTENT_ES : CONTENT_EN;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('produit');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const IMAGES = [
    "/images/WEBSITE-P/products/DYNAMIZER.webp",
    "/images/WEBSITE-P/products/DYNAMIZER.webp"
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
            <div className={styles.usageCard} style={{ backgroundImage: `url('/images/WEBSITE-P/coffee_big.webp')` }}>
              <div className={styles.usageContent}>
                <Star className={styles.usageIcon} />
                <h3>{content.benefits.cards[0].title}</h3>
                <p>{content.benefits.cards[0].text}</p>
              </div>
            </div>
            <div className={styles.usageCard} style={{ backgroundImage: `url('/images/WEBSITE-P/drinking_big.webp')` }}>
              <div className={styles.usageContent}>
                <Droplet className={styles.usageIcon} />
                <h3>{content.benefits.cards[1].title}</h3>
                <p>{content.benefits.cards[1].text}</p>
              </div>
            </div>
            <div className={styles.usageCard} style={{ backgroundImage: `url('/images/WEBSITE-P/shower_big.webp')` }}>
              <div className={styles.usageContent}>
                <Shield className={styles.usageIcon} />
                <h3>{content.benefits.cards[2].title}</h3>
                <p>{content.benefits.cards[2].text}</p>
              </div>
            </div>
            <div className={styles.usageCard} style={{ backgroundImage: `url('/images/WEBSITE-P/washing_big.webp')` }}>
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
              onClick={() => setModalUrl("/images/website-assets/certificates/ISO.pdf")}
            >
              <FileText className={styles.reportIcon} /> {content.science.btnCert}
            </button>
          </div>
        </section>

      </main>
      {modalUrl && (
        <div className={styles.modalOverlay} onClick={() => setModalUrl(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Document Preview</span>
              <button className={styles.modalCloseBtn} onClick={() => setModalUrl(null)}><X /></button>
            </div>
            <div className={styles.modalBody}>
              
              <iframe
                src={modalUrl}
                
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Document Preview"
                
              >
                <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                  <p>Preview not available.</p>
                  <a href={modalUrl} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                    Download PDF
                  </a>
                </div>
              </iframe>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}