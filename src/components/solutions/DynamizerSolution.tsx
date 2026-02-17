'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Shield, Wrench, Plug, Gauge, Infinity as InfinityIcon
} from 'lucide-react';
import styles from './DynamizerSolution.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    overview: 'OVERVIEW',
    technical: 'TECHNICAL DATA',
    other: 'OTHER SOLUTIONS'
  },
  presentation: {
    title: 'The Swiss Water DYNAMIZER',
    desc: "Water is moved as worldwide standard in straight water tubes which doesn't correspond to the natural movement of water. As a result, water quality suffers which has impacts in taste, a sluggish digestion, a dry skin and susceptability of bacterial charge."
  },
  technical: {
    title: 'Technical Data',
    specs: {
      materials: { label: 'Materials:', text: 'Water carrying part in 316L Stainless Steel' },
      maintenance: { label: 'Maintenance:', text: 'Completely free of maintenance' },
      connections: { label: 'Connections:', text: '1 inch' },
      flow: { label: 'Flow capacity:', text: '5 m3 / h (at 4 bar of water pressure)' },
      lifetime: { label: 'Lifetime / Capacity:', text: 'Unlimited' }
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
        title: 'WATER FINE FILTER',
        desc: 'A unique quadruple filtration system: Physical (20 µm & 5 µm), Activated carbon, AqualenTM, and Ionized silver.',
        link: '/solutions/fine-filter',
        img: '/images/website-assets/PRODUCT/fine_filter_with_cartridge.png'
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
  presentation: {
    title: 'The Swiss Water DYNAMIZER',
    desc: "L'eau est transportée en règle générale dans des tubes d'eau rectilignes ce qui ne correspond pas au mouvement naturel de l'eau. Par conséquent, la qualité de l'eau en souffre, ce qui a des conséquences sur le goût, une digestion lente, une peau sèche et une sensibilité à la charge bactérienne."
  },
  technical: {
    title: 'Données Techniques',
    specs: {
      materials: { label: 'Matériaux :', text: 'Part aquifère en Inox 316L' },
      maintenance: { label: 'Maintenance :', text: 'Entièrement sans maintenance' },
      connections: { label: 'Connexions :', text: '1 pouce' },
      flow: { label: 'Débit :', text: "5 m3 / h (à 4 bars de pression d'eau)" },
      lifetime: { label: 'Durée de vie / Capacité :', text: 'Illimité' }
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
        title: 'FINE FILTER',
        desc: 'Réduit chlore, pesticides, métaux lourds (97-99%) tout en préservant les minéraux.',
        link: '/solutions/fine-filter',
        img: '/images/website-assets/PRODUCT/fine_filter_with_cartridge.png'
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

export default function DynamizerSolution() {
  const [activeSection, setActiveSection] = useState('presentation');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

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
          <div className={styles.sectionHeader}><h2>{content.presentation.title}</h2></div>
          <div className={styles.componentLayout}>
            <img src="/images/WEBSITE-P/products/DYNAMIZER.webp" alt="The Swiss Water DYNAMIZER" loading="lazy" />
            <div className={styles.componentTextContent}>
              <p>{content.presentation.desc}</p>
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
                <strong>{content.technical.specs.lifetime.label}</strong>
                <p>{content.technical.specs.lifetime.text}</p>
              </div>
            </li>
          </ul>
        </section>

        {/* OTHER SOLUTIONS */}
        <section id="other-solutions" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['other-solutions'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.otherSolutions.title}</h2></div>
          <div className={styles.solutionsGrid}>

            {content.otherSolutions.items.map((item, idx) => (
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