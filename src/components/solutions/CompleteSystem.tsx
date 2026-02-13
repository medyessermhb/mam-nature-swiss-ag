'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, Plug, Shield, Infinity as InfinityIcon, Gauge, Euro, 
  Ruler, Weight, Filter, FlaskConical, Award 
} from 'lucide-react';
import styles from './CompleteSystem.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    overview: 'OVERVIEW',
    technical: 'TECHNICAL DATA',
    components: 'COMPONENTS'
  },
  overview: {
    title: 'Mam Nature Complete System',
    desc: 'Our advanced filtration technology ensures that you enjoy clean, safe drinking water every day. Experience the difference with our eco-friendly solutions designed for health-conscious consumers.',
    benefits: [
      'Removes 99% of contaminants for pure hydration.',
      'User-friendly design for effortless installation and maintenance.',
      'Eco-conscious materials promote sustainability and health.'
    ],
    subtitle: 'Mam Nature Swiss - our solution for the water in your whole house:',
    components: [
      { bold: 'WATER LIME:', text: 'Anti-Limestone - purely physical Lime Treatment' },
      { bold: 'WATER PARTICLE FILTER:', text: '40 μm + Backwash + lead free' },
      { bold: 'WATER FINE FILTER:', text: 'Treatment of Chlorine + Heavy metals + Pesticides' },
      { bold: 'WATER DYNAMIZER:', text: 'Unique taste & incredible soft skin' }
    ]
  },
  technical: {
    title: 'Technical Data',
    specs: [
      { label: 'Installation:', text: 'Connection after the water meter - cold water max. 38°C', icon: Plug },
      { label: 'Materials:', text: 'All water carrying parts of the whole system in premium 316L Stainless Steel. All non-metal parts are in food safe quality.', icon: Shield },
      { label: 'Capacity:', text: 'Unlimited for the units LIME, PARTICLE FILTER & DYNAMIZER; 150 m3 resp. 1 year per filter cartridge for FINE FILTER', icon: InfinityIcon },
      { label: 'Flow capacity:', text: '1,5 m3 / h (at 4 bar of water pressure)', icon: Gauge },
      { label: 'Maintenance costs:', text: 'Zero for the units LIME, PARTICLE FILTER & DYNAMIZER. FINE FILTER: Each 150 m3/1 year (price see current price list) with easy to change filter cartridge', icon: Euro },
      { label: 'Dimensions (HxWxD):', text: '850 mm x 850 mm x 180 mm', icon: Ruler },
      { label: 'Weight:', text: '27.8 kg', icon: Weight },
      { label: 'Unique 5-fold filtration system:', text: 'PARTICLE FILTER: Physical filter with 40 μm. FINE FILTER: Physical: Membrane filter with 20 µm & 5 µm, Activated carbon, AqualenTM, Ionized silver.', icon: Filter },
      { label: 'Selective filtration:', text: 'Reduces chlorine, chloroform, pesticides, petrochemicals, phenol, Microplastics, heavy metals up to 97-99%. Preserves minerals.', icon: FlaskConical },
      { label: 'Operating pressure:', text: 'Max. 6,5 bar; 0,1 bar pressure loss only if pressure from arriving water 1,5 < 6 bar', icon: Gauge },
      { label: 'Warranty:', text: '10 years (Certified by Swiss Safety Center for: Pressure resistance: 16 bar)', icon: Award }
    ],
    btnShop: 'View in Shop'
  },
  components: {
    title: 'Components Included',
    items: [
      { 
        title: 'WATER LIME', 
        desc: 'A proven alternative for water softening systems on purely physical basis. Prevents hard limescale deposits.', 
        link: '/solutions/water-lime',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20vertical.png'
      },
      { 
        title: 'PARTICLE FILTER', 
        desc: 'Swiss Made LEAD-free Particle Filter (316L stainless steel) with self-cleaning Backwash Technology.', 
        link: '/solutions/particle-filter',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLES%20FILTER.png'
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
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/DYNAMIZER.png'
      }
    ],
    btnLearn: 'Learn More'
  }
};

const CONTENT_FR = {
  nav: {
    overview: 'APERÇU',
    technical: 'DONNÉES TECHNIQUES',
    components: 'COMPOSANTS'
  },
  overview: {
    title: 'SYSTÈME COMPLET',
    desc: 'Notre solution intégrale pour une eau pure, saine et revitalisée dans toute votre maison. Le Système Complet combine nos quatre technologies de pointe pour une performance inégalée.',
    benefits: [
      'Élimine 99% des contaminants pour une hydratation pure.',
      'Conception conviviale pour une installation et un entretien sans effort.',
      'Matériaux écologiques favorisant la durabilité et la santé.'
    ],
    subtitle: 'Mam Nature Swiss - notre solution pour l\'eau de toute votre maison :',
    components: [
      { bold: 'WATER LIME:', text: 'Anti-Calcaire - Traitement physique' },
      { bold: 'PARTICLE FILTER:', text: 'Filtre à particules (40 μm) + Backwash' },
      { bold: 'FINE FILTER:', text: 'Filtre fin (Chlore, Métaux lourds, Pesticides)' },
      { bold: 'DYNAMIZER:', text: "Dynamiseur d'Eau (Goût et douceur)" }
    ]
  },
  technical: {
    title: 'Données Techniques',
    specs: [
      { label: 'Installation :', text: 'Raccordement après le compteur d\'eau - eau froide max. 38°C', icon: Plug },
      { label: 'Matériaux :', text: 'Acier inoxydable 316L de qualité premium. Pièces non métalliques de qualité alimentaire.', icon: Shield },
      { label: 'Capacité :', text: 'Illimitée (LIME, PARTICLE, DYNAMIZER) ; 150 m3 / 1 an (FINE FILTER)', icon: InfinityIcon },
      { label: 'Capacité de débit :', text: '1,5 m3 /h (à 4 bars)', icon: Gauge },
      { label: 'Frais de maintenance :', text: 'Zéro (LIME, PARTICLE, DYNAMIZER) ; Changement cartouche (FINE FILTER)', icon: Euro },
      { label: 'Dimensions (HxLxP) :', text: '850 mm x 850 mm x 180 mm', icon: Ruler },
      { label: 'Poids :', text: '27.8 kg', icon: Weight },
      { label: 'Filtration (5 niveaux) :', text: '40 μm, 20 μm, 5 μm, Charbon actif, Aqualen™, Argent ionisé', icon: Filter },
      { label: 'Filtration sélective :', text: 'Réduit 97-99% des contaminants, préserve les minéraux.', icon: FlaskConical },
      { label: 'Pression max :', text: 'Max. 6,5 bars (Perte de 0,1 bar)', icon: Gauge },
      { label: 'Garantie :', text: '10 ans (Certifié Swiss Safety Center)', icon: Award }
    ],
    btnShop: 'Voir dans la boutique'
  },
  components: {
    title: 'Composants Inclus',
    items: [
      { 
        title: 'WATER LIME', 
        desc: 'Alternative physique aux adoucisseurs, convertit la calcite en aragonite non-adhérente.', 
        link: '/solutions/water-lime',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20vertical.png'
      },
      { 
        title: 'PARTICLE FILTER', 
        desc: 'Filtre à particules sans PLOMB (Inox 316L) avec technologie de lavage à contre-courant.', 
        link: '/solutions/particle-filter',
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLES%20FILTER.png'
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
        img: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/DYNAMIZER.png'
      }
    ],
    btnLearn: 'En savoir plus'
  }
};

export default function CompleteSystem() {
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
              { id: 'components', label: content.nav.components }
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
            <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/COMPLETE%20SET%20PLUS.png" alt="Mam Nature Complete System" loading="lazy" />
            <div className={styles.componentTextContent}>
              <p>{content.overview.desc}</p>
              
              <ul className={`${styles.componentSpecs} ${styles.transparentSpecs}`}>
                {content.overview.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <CheckCircle className={styles.specIcon} size={20} />
                    <div className={styles.specContent}><p>{benefit}</p></div>
                  </li>
                ))}
              </ul>

              <p style={{ marginTop: '1.5rem' }}><strong>{content.overview.subtitle}</strong></p>
              
              <ul className={`${styles.componentSpecs} ${styles.transparentSpecs}`}>
                {content.overview.components.map((comp, idx) => (
                  <li key={idx}>
                    <CheckCircle className={styles.specIcon} size={20} />
                    <div className={styles.specContent}>
                      <strong>{comp.bold}</strong> <p style={{display:'inline', margin:0}}>{comp.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TECHNICAL DATA */}
        <section id="technical-data" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['technical-data'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.technical.title}</h2></div>
          <div className={styles.componentSpecsGrid}>
            <ul className={styles.componentSpecs}>
              {content.technical.specs.slice(0, 5).map((spec, idx) => (
                <li key={idx}>
                  <spec.icon className={styles.specIcon} />
                  <div className={styles.specContent}>
                    <strong>{spec.label}</strong> <p>{spec.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className={styles.componentSpecs}>
              {content.technical.specs.slice(5).map((spec, idx) => (
                <li key={idx}>
                  <spec.icon className={styles.specIcon} />
                  <div className={styles.specContent}>
                    <strong>{spec.label}</strong> <p>{spec.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/shop/complete-set-plus" className={`${styles.btn} ${styles.btnPrimary}`}>
              {content.technical.btnShop}
            </Link>
          </div>
        </section>

        {/* COMPONENTS */}
        <section id="components" className={styles.contentSection} ref={el => { if(el) sectionRefs.current['components'] = el }}>
          <div className={styles.sectionHeader}><h2>{content.components.title}</h2></div>
          <div className={styles.solutionsGrid}>
            
            {content.components.items.map((item, idx) => (
              <div key={idx} className={styles.solutionCard}>
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link href={item.link} className={`${styles.btn} ${styles.btnSecondary}`}>
                  {content.components.btnLearn}
                </Link>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}