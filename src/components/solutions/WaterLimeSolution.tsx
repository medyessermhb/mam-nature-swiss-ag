'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Magnet, Shield, Wrench, Plug, Gauge, Infinity as InfinityIcon, 
} from 'lucide-react';
import styles from './WaterLimeSolution.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    overview: 'OVERVIEW',
    technical: 'TECHNICAL DATA',
    other: 'OTHER SOLUTIONS'
  },
  overview: {
    title: 'WATER LIME',
    desc: "A proven alternative for water softening systems on purely physical basis. « Water LIME » converts the hard form of lime (Calcite) into a soft form (Aragonite), which prevents hard limescale deposits."
  },
  technical: {
    title: 'Technical Data',
    specs: {
      technology: { label: 'Technology:', text: 'Based on Neodyme Permanent Magnets' },
      materials: { label: 'Materials:', text: 'Housing in 316L Stainless Steel' },
      maintenance: { label: 'Maintenance:', text: 'No maintenance required' },
      connections: { label: 'Connections:', text: '1 inch (variant in 3/4 inch also available)' },
      flow: { label: 'Flow capacity:', text: '1.5 m3 / h' },
      lifetime: { label: 'Lifetime / Capacity:', text: 'Unlimited' }
    }
  },
  otherSolutions: {
    title: 'Discover our other solutions',
    btnLearn: 'Learn More',
    items: [
      {
        title: 'PARTICLE FILTER',
        desc: 'Swiss Made LEAD-free Particle Filter (316L stainless steel) with self-cleaning Backwash Technology.',
        link: '/solutions/particle-filter',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp'
      },
      {
        title: 'WATER FINE FILTER',
        desc: 'A unique quadruple filtration system: Physical (20 µm & 5 µm), Activated carbon, AqualenTM, and Ionized silver.',
        link: '/solutions/fine-filter',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/fine%20filter%20with%20cartridge.png'
      },
      {
        title: 'The Swiss Water DYNAMIZER',
        desc: 'Restructures and revitalizes water, which can improve taste, digestion, and skin softness.',
        link: '/solutions/the-swiss-water-dynamizer',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp'
      },
      {
        title: 'COMPLETE SYSTEM',
        desc: 'Our complete solution for pure, healthy, and revitalized water throughout your entire home.',
        link: '/solutions/mam-nature-complete-system',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET%20PLUS.webp'
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
    title: 'WATER LIME',
    desc: "Une alternative éprouvée aux systèmes d'adoucissement de l'eau sur une base purement physique. WATER LIME convertit la forme dure de la chaux (Calcite) en une forme molle (Aragonite), ce qui évite les dépôts de calcaire dur."
  },
  technical: {
    title: 'Données Techniques',
    specs: {
      technology: { label: 'Technologie :', text: 'Basé sur des aimants permanents en néodyme' },
      materials: { label: 'Matériaux :', text: 'Boîtier en acier inoxydable 316L' },
      maintenance: { label: 'Maintenance :', text: 'Aucun entretien requis' },
      connections: { label: 'Connexions :', text: '1 pouce (variante en 3/4 pouce également disponible)' },
      flow: { label: 'Capacité de débit :', text: '1,5 m3/h' },
      lifetime: { label: 'Durée de vie / Capacité :', text: 'Illimitée' }
    }
  },
  otherSolutions: {
    title: 'Découvrez nos autres solutions',
    btnLearn: 'En savoir plus',
    items: [
      {
        title: 'PARTICLE FILTER',
        desc: 'Filtre à particules sans PLOMB (Inox 316L) avec technologie de lavage à contre-courant.',
        link: '/solutions/particle-filter',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp'
      },
      {
        title: 'FINE FILTER',
        desc: 'Réduit chlore, pesticides, métaux lourds (97-99%) tout en préservant les minéraux.',
        link: '/solutions/fine-filter',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/fine%20filter%20with%20cartridge.png'
      },
      {
        title: 'The Swiss Water DYNAMIZER',
        desc: 'Tourbillonne, restructure et revitalise l\'eau pour un goût unique et une peau douce.',
        link: '/solutions/the-swiss-water-dynamizer',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp'
      },
      {
        title: 'SYSTÈME COMPLET',
        desc: 'Notre solution intégrale pour une eau pure, saine et revitalisée dans toute votre maison.',
        link: '/solutions/mam-nature-complete-system',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET%20PLUS.webp'
      }
    ]
  }
};

export default function WaterLimeSolution() {
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
        <section id="presentation" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['presentation'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.overview.title}</h2></div>
          <div className={styles.componentLayout}>
            <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/water%20lime%20vertical.webp" alt="WATER LIME" loading="lazy" />
            <div className={styles.componentTextContent}>
              <p>{content.overview.desc}</p>
            </div>
          </div>
        </section>

        {/* TECHNICAL DATA */}
        <section id="technical-data" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['technical-data'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.technical.title}</h2></div>
          <ul className={styles.componentSpecs} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <li>
              <Magnet className={styles.specIcon} /> 
              <div className={styles.specContent}>
                <strong>{content.technical.specs.technology.label}</strong> 
                <p>{content.technical.specs.technology.text}</p>
              </div>
            </li>
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
        <section id="other-solutions" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['other-solutions'] = el }}>
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