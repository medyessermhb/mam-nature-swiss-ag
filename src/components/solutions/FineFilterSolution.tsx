'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  CheckCircle, Shield, Wrench, Plug, Gauge, Infinity as InfinityIcon, Filter, FlaskConical
} from 'lucide-react';
import styles from './FineFilterSolution.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    overview: 'OVERVIEW',
    technical: 'TECHNICAL DATA',
    other: 'OTHER SOLUTIONS'
  },
  overview: {
    title: 'WATER FINE FILTER',
    desc: 'A unique quadruple filtration system:',
    features: [
      { label: 'Physical:', text: 'Membrane filter with 20 µm & 5 µm', icon: Filter },
      { label: 'Activated carbon:', text: 'filtration by adsorption', icon: CheckCircle },
      { label: 'AqualenTM:', text: 'Adsorptive fibers for effective filtration of heavy metals', icon: FlaskConical },
      { label: 'Ionized silver:', text: 'sterility in the filter cartridge without silver getting into the drinking water.', icon: Shield }
    ],
    btnOrder: 'Order Cartridge'
  },
  technical: {
    title: 'Technical Data',
    specs: {
      materials: { label: 'Materials:', text: 'Housing & connector in 316L Stainless Steel (no lead-containing brass parts)' },
      quality: { label: 'Quality:', text: 'All non-metal parts are food safe' },
      maintenance: { label: 'Maintenance:', text: 'Change filter cartridge every 150 m3 (average 1 x per year)' },
      connections: { label: 'Connections:', text: '1 inch (2 x 3/4 inch adaptors included)' },
      flow: { label: 'Flow capacity:', text: '1.5 m3 / h (at 4 bar water pressure)' },
      capacity: { label: 'Cartridge Capacity:', text: '150 m3' }
    }
  },
  otherSolutions: {
    title: 'Discover our other solutions',
    btnLearn: 'Learn More',
    items: [
      {
        title: 'WATER LIME',
        desc: 'A proven alternative for water softening systems on purely physical basis. Prevents hard limescale deposits.',
        link: '/solutions/water-lime',
        img: '/images/WEBSITE-P/products/water_lime_vertical.webp'
      },
      {
        title: 'PARTICLE FILTER',
        desc: 'Swiss Made LEAD-free Particle Filter (316L stainless steel) with self-cleaning Backwash Technology.',
        link: '/solutions/particle-filter',
        img: '/images/WEBSITE-P/products/PARTICLES_FILTER.webp'
      },
      {
        title: 'The Swiss Water DYNAMIZER',
        desc: 'Restructures and revitalizes water, which can improve taste, digestion, and skin softness.',
        link: '/solutions/dynamizer',
        img: '/images/WEBSITE-P/products/DYNAMIZER.webp'
      },
      {
        title: 'COMPLETE SYSTEM',
        desc: 'Our complete solution for pure, healthy, and revitalized water throughout your entire home.',
        link: '/solutions/mam-nature-complete-system',
        img: '/images/WEBSITE-P/products/COMPLETE_SET_PLUS.webp'
      }
    ]
  }
};

const CONTENT_FR = {
  nav: {
    overview: 'APERÇU',
    technical: 'DONNÉES TECHNIQUES',
    other: 'AUTRES SOLUTIONS'
  },
  overview: {
    title: 'FINE FILTER',
    desc: "Réduit : le chlore, le chloroforme, les pesticides, les produits pétrochimiques, le phénol, les microplastiques, les métaux lourds jusqu'à 97 - 99 %. Filtration sélective : préserve la structure de l'eau et sa composition (comme les minéraux).",
    features: [
      { label: 'Physique :', text: 'Filtre à membrane avec 20 µm & 5 µm', icon: Filter },
      { label: 'Charbon actif :', text: 'Filtration par adsorption', icon: CheckCircle },
      { label: 'AqualenTM :', text: 'Fibres adsorbantes pour la filtration efficace des métaux lourds', icon: FlaskConical },
      { label: 'Argent ionisé :', text: "Stérilité dans la cartouche filtrante sans que l'argent ne pénètre dans l'eau potable.", icon: Shield }
    ],
    btnOrder: 'Commander une cartouche'
  },
  technical: {
    title: 'Données Techniques',
    specs: {
      materials: { label: 'Matériaux :', text: 'Boîtier & connecteur en Inox 316L - c\'est-à-dire aucune pièce en laiton contenant du plomb' },
      quality: { label: 'Qualité :', text: 'Toutes les pièces non métalliques sont de qualité alimentaire' },
      maintenance: { label: 'Entretien requis :', text: 'Changement de cartouche filtrante tous les 150 m3 (en moyenne 1 x par an)' },
      connections: { label: 'Connexions :', text: '1 pouce (2 adaptateurs 3/4 pouces inclus dans la livraison)' },
      flow: { label: 'Débit :', text: '1,5 m3/h (à 4 bar de pression d\'eau)' },
      capacity: { label: 'Capacité cartouche :', text: '150 m3' }
    }
  },
  otherSolutions: {
    title: 'Découvrez nos autres solutions',
    btnLearn: 'En savoir plus',
    items: [
      {
        title: 'WATER LIME',
        desc: 'Alternative physique aux adoucisseurs, convertit la Calcite en Aragonite non-adhérente.',
        link: '/solutions/water-lime',
        img: '/images/WEBSITE-P/products/water_lime_vertical.webp'
      },
      {
        title: 'PARTICLE FILTER',
        desc: 'Filtre à particules sans PLOMB (Inox 316L) avec technologie de lavage à contre-courant.',
        link: '/solutions/particle-filter',
        img: '/images/WEBSITE-P/products/PARTICLES_FILTER.webp'
      },
      {
        title: 'The Swiss Water DYNAMIZER',
        desc: 'Tourbillonne, restructure et revitalise l\'eau pour un goût unique et une peau douce.',
        link: '/solutions/dynamizer',
        img: '/images/WEBSITE-P/products/DYNAMIZER.webp'
      },
      {
        title: 'SYSTÈME COMPLET',
        desc: 'Notre solution intégrale pour une eau pure, saine et revitalisée dans toute votre maison.',
        link: '/solutions/mam-nature-complete-system',
        img: '/images/WEBSITE-P/products/COMPLETE_SET_PLUS.webp'
      }
    ]
  }
};

const CONTENT_DE = {
  nav: {
    overview: 'ÜBERSICHT',
    technical: 'TECHNISCHE DATEN',
    other: 'WEITERE LÖSUNGEN'
  },
  overview: {
    title: 'FEINFILTER',
    desc: 'Einzigartiges 4-Stufen-Filtrationssystem:',
    features: [
      { label: 'Physikalisch:', text: 'Membranfilter mit 20 µm & 5 µm', icon: Filter },
      { label: 'Aktivkohle:', text: 'Filterung durch Adsorption', icon: CheckCircle },
      { label: 'AqualenTM:', text: 'Adsorbierende Fasern für effektive Filterung von Schwermetallen', icon: FlaskConical },
      { label: 'Ionisiertes Silber:', text: 'Sterilität in der Kartusche, ohne dass Silber ins Trinkwasser gelangt.', icon: Shield }
    ],
    btnOrder: 'Kartusche bestellen'
  },
  technical: {
    title: 'Technische Daten',
    specs: {
      materials: { label: 'Materialien:', text: 'Gehäuse & Anschluss aus 316L Edelstahl (keine bleihaltigen Messingteile)' },
      quality: { label: 'Qualität:', text: 'Alle nichtmetallischen Teile sind lebensmittelecht' },
      maintenance: { label: 'Wartung:', text: 'Kartuschenwechsel alle 150 m³ (durchschnittlich 1x pro Jahr)' },
      connections: { label: 'Anschlüsse:', text: '1 Zoll (2 x 3/4 Zoll Adapter im Lieferumfang enthalten)' },
      flow: { label: 'Durchflusskapazität:', text: '1,5 m³ / h (bei 4 bar Wasserdruck)' },
      capacity: { label: 'Kartuschenkapazität:', text: '150 m³' }
    }
  },
  otherSolutions: {
    title: 'Entdecken Sie unsere anderen Lösungen',
    btnLearn: 'Mehr erfahren',
    items: [
      {
        title: 'WATER LIME',
        desc: 'Auf physikalischer Basis: eine bewährte Alternative zur Wasserenthärtung. Verhindert harte Kalkablagerungen.',
        link: '/solutions/water-lime',
        img: '/images/WEBSITE-P/products/water_lime_vertical.webp'
      },
      {
        title: 'PARTIKELFILTER',
        desc: 'Der Swiss Made bleifreie Partikelfilter (316L Edelstahl) mit selbstreinigender Backwash-Technologie.',
        link: '/solutions/particle-filter',
        img: '/images/WEBSITE-P/products/PARTICLES_FILTER.webp'
      },
      {
        title: 'Der Swiss Water DYNAMIZER',
        desc: 'Strukturiert und revitalisiert das Wasser. Führt zu weichen Geschmack und besserer Zellhydratation.',
        link: '/solutions/dynamizer',
        img: '/images/WEBSITE-P/products/DYNAMIZER.webp'
      },
      {
        title: 'KOMPLETTSET',
        desc: 'Unsere Komplettlösung für reines, gesundes und revitalisiertes Wasser im ganzen Haus.',
        link: '/solutions/mam-nature-complete-system',
        img: '/images/WEBSITE-P/products/COMPLETE_SET_PLUS.webp'
      }
    ]
  }
};

const CONTENT_ES = {
  nav: {
    overview: 'RESUMEN',
    technical: 'DATOS TÉCNICOS',
    other: 'OTRAS SOLUCIONES'
  },
  overview: {
    title: 'FILTRO FINO DE AGUA',
    desc: 'Un sistema de filtración cuádruple único:',
    features: [
      { label: 'Físico:', text: 'Filtro de membrana con 20 µm y 5 µm', icon: Filter },
      { label: 'Carbón activo:', text: 'filtración por adsorción', icon: CheckCircle },
      { label: 'AqualenTM:', text: 'Fibras adsortivas para la filtración efectiva de metales pesados', icon: FlaskConical },
      { label: 'Plata ionizada:', text: 'Esterilidad en el cartucho del filtro sin que la plata penetre en el agua potable.', icon: Shield }
    ],
    btnOrder: 'Pedir Cartucho'
  },
  technical: {
    title: 'Datos Técnicos',
    specs: {
      materials: { label: 'Materiales:', text: 'Carcasa y conector de Acero Inoxidable 316L (sin piezas de latón que contengan plomo)' },
      quality: { label: 'Calidad:', text: 'Todas las partes no metálicas son seguras para alimentos' },
      maintenance: { label: 'Mantenimiento:', text: 'Cambiar cartucho cada 150 m3 (promedio 1x al año)' },
      connections: { label: 'Conexiones:', text: '1 pulgada (incluye 2 adaptadores de 3/4 de pulgada)' },
      flow: { label: 'Caudal:', text: '1.5 m3 / h (a 4 bares de presión de agua)' },
      capacity: { label: 'Capacidad del cartucho:', text: '150 m3' }
    }
  },
  otherSolutions: {
    title: 'Descubra nuestras otras soluciones',
    btnLearn: 'Saber Más',
    items: [
      {
        title: 'WATER LIME',
        desc: 'Una alternativa comprobada sobre una base puramente física. Evita los depósitos duros de cal.',
        link: '/solutions/water-lime',
        img: '/images/WEBSITE-P/products/water_lime_vertical.webp'
      },
      {
        title: 'PARTICLE FILTER',
        desc: 'Filtro de Partículas sin plomo (acero inoxidable 316L) con tecnología de retrolavado automático.',
        link: '/solutions/particle-filter',
        img: '/images/WEBSITE-P/products/PARTICLES_FILTER.webp'
      },
      {
        title: 'The Swiss Water DYNAMIZER',
        desc: 'Reestructura y revitaliza el agua. Conduce a un sabor suave y mejor hidratación celular.',
        link: '/solutions/dynamizer',
        img: '/images/WEBSITE-P/products/DYNAMIZER.webp'
      },
      {
        title: 'SISTEMA COMPLETO',
        desc: 'Nuestra solución completa para agua pura, saludable y revitalizada en toda su casa.',
        link: '/solutions/mam-nature-complete-system',
        img: '/images/WEBSITE-P/products/COMPLETE_SET_PLUS.webp'
      }
    ]
  }
};

export default function FineFilterSolution() {
  const [activeSection, setActiveSection] = useState('presentation');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : language === 'de' ? CONTENT_DE : language === 'es' ? CONTENT_ES : CONTENT_EN;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 150;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageWrapper}>

      {/* Sticky Navigation */}
      <aside className={styles.stickyNav}>
        <nav>
          <ul className={styles.navList}>
            {[
              { id: 'presentation', label: content.nav.overview },
              { id: 'technical-data', label: content.nav.technical },
              { id: 'other-solutions', label: content.nav.other }
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => scrollTo(item.id)}
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.contentArea}>

        {/* OVERVIEW */}
        <section id="presentation" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['presentation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.overview.title}</h2></div>
          <div className={styles.componentLayout}>
            <img src="/images/website-assets/PRODUCT/fine_filter_with_cartridge.png" alt="WATER FINE FILTER" loading="lazy" />
            <div className={styles.componentTextContent}>
              <p>{content.overview.desc}</p>

              <ul className={`${styles.componentSpecs} ${styles.transparentSpecs}`}>
                {content.overview.features.map((feature: any, idx: number) => (
                  <li key={idx}>
                    <feature.icon className={styles.specIcon} />
                    <div className={styles.specContent}>
                      <p><strong>{feature.label}</strong> {feature.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '1.5rem' }}>
                <Link href="/shop/cartridge" className={`${styles.btn} ${styles.btnPrimary}`}>
                  {content.overview.btnOrder}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL DATA */}
        <section id="technical-data" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['technical-data'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.technical.title}</h2></div>
          <ul className={styles.componentSpecs} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <li>
              <Shield className={styles.specIcon} />
              <div className={styles.specContent}>
                <strong>{content.technical.specs.materials.label}</strong>
                <p>{content.technical.specs.materials.text}</p>
              </div>
            </li>
            <li>
              <CheckCircle className={styles.specIcon} />
              <div className={styles.specContent}>
                <strong>{content.technical.specs.quality.label}</strong>
                <p>{content.technical.specs.quality.text}</p>
              </div>
            </li>
            <li>
              <Wrench className={styles.specIcon} />
              <div className={styles.specContent}>
                <strong>{content.technical.specs.maintenance.label}</strong>
                <p>{content.technical.specs.maintenance.text}</p>
              </div>
            </li>
            <li>
              <Plug className={styles.specIcon} />
              <div className={styles.specContent}>
                <strong>{content.technical.specs.connections.label}</strong>
                <p>{content.technical.specs.connections.text}</p>
              </div>
            </li>
            <li>
              <Gauge className={styles.specIcon} />
              <div className={styles.specContent}>
                <strong>{content.technical.specs.flow.label}</strong>
                <p>{content.technical.specs.flow.text}</p>
              </div>
            </li>
            <li>
              <InfinityIcon className={styles.specIcon} />
              <div className={styles.specContent}>
                <strong>{content.technical.specs.capacity.label}</strong>
                <p>{content.technical.specs.capacity.text}</p>
              </div>
            </li>
          </ul>
        </section>

        {/* OTHER SOLUTIONS */}
        <section id="other-solutions" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['other-solutions'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.otherSolutions.title}</h2></div>
          <div className={styles.solutionsGrid}>

            {content.otherSolutions.items.map((item: any, idx: number) => (
              <div key={idx} className={styles.solutionCard}>
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link href={item.link} className={`${styles.btn} ${styles.btnSecondary}`}>
                  {content.otherSolutions.btnLearn}
                </Link>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}