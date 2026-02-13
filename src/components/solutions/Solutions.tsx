'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, Magnet, ShieldCheck, Wrench, Plug, Gauge, Infinity as InfinityIcon, 
  Euro, Filter, FlaskConical 
} from 'lucide-react';
import styles from './Solutions.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA DEFINITION ---

const CONTENT_EN = {
  nav: {
    complete: 'COMPLETE SYSTEM',
    lime: 'WATER LIME',
    particle: 'PARTICLE FILTER',
    fine: 'FINE FILTER',
    dynamizer: 'The Swiss Water DYNAMIZER'
  },
  btnLearn: 'Learn More',
  sections: [
    {
      id: 'complete-system',
      title: 'COMPLETE SYSTEM',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/COMPLETE%20SET%20PLUS.png',
      desc: 'Our complete solution for pure, healthy, and revitalized water throughout your entire home. The Complete System combines our four advanced technologies.',
      link: '/solutions/mam-nature-complete-system',
      specs: [
        { label: 'WATER LIME:', text: 'Anti-Limestone - purely physical Lime Treatment', icon: CheckCircle },
        { label: 'WATER PARTICLE FILTER:', text: '40 μm + Backwash + lead free', icon: CheckCircle },
        { label: 'WATER FINE FILTER:', text: 'Treatment of Chlorine + Heavy metals + Pesticides', icon: CheckCircle },
        { label: 'WATER DYNAMIZER:', text: 'Unique taste & incredible soft skin', icon: CheckCircle }
      ]
    },
    {
      id: 'water-lime',
      title: 'WATER LIME',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20vertical.png',
      desc: 'A proven alternative for water softening systems on purely physical basis. « Water LIME » converts the hard form of lime (Calcite) into a soft form (Aragonite).',
      link: '/solutions/water-lime',
      specs: [
        { text: 'Based on Neodyme Permanent Magnets', icon: Magnet },
        { text: 'Housing in 316L Stainless Steel', icon: ShieldCheck },
        { text: 'No maintenance required', icon: Wrench },
        { text: 'Connections: 1 inch (variant 3/4 available)', icon: Plug },
        { text: 'Flow capacity: 1.5 m3 / h', icon: Gauge },
        { text: 'Lifetime: unlimited', icon: InfinityIcon }
      ]
    },
    {
      id: 'particle-filter',
      title: 'PARTICLE FILTER',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLES%20FILTER.png',
      desc: 'Mam Nature Swiss proudly presents the world’s first Swiss Made LEAD-free Particle Filter, made from premium 316L stainless steel.',
      link: '/solutions/particle-filter',
      specs: [
        { text: 'All metal parts in 316L Stainless Steel', icon: ShieldCheck },
        { text: 'All non-metal parts are food safe', icon: CheckCircle },
        { text: 'No maintenance costs', icon: Euro },
        { text: 'Maintenance: Backwash 1x/month', icon: Wrench },
        { text: 'Connections: 1 inch (3/4 adaptors included)', icon: Plug },
        { text: 'Flow capacity: 4.2 m3 / h (at 4 bar)', icon: Gauge },
        { text: 'Lifetime: unlimited', icon: InfinityIcon }
      ]
    },
    {
      id: 'fine-filter',
      title: 'FINE FILTER',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/fine%20filter%20with%20cartridge.png',
      desc: 'A unique quadruple filtration system that reduces chlorine, heavy metals, pesticides, and microplastics, while preserving essential minerals.',
      link: '/solutions/fine-filter',
      specs: [
        { text: 'Physical: Membrane filter (20 µm & 5 µm)', icon: Filter },
        { text: 'Activated carbon: filtration by adsorption', icon: CheckCircle },
        { text: 'AqualenTM: Adsorptive fibers for heavy metals', icon: FlaskConical },
        { text: 'Ionized silver: for sterility in the cartridge', icon: ShieldCheck },
        { text: 'Maintenance: Change cartridge (150 m3 / 1x year)', icon: Wrench },
        { text: 'Cartridge Capacity: 150 m3', icon: InfinityIcon }
      ]
    },
    {
      id: 'dynamizer',
      title: 'The Swiss Water DYNAMIZER',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/DYNAMIZER.png',
      desc: 'Water is moved as worldwide standard in straight water tubes which doesn\'t correspond to the natural movement of water. As a result, water quality suffers.',
      link: '/solutions/the-swiss-water-dynamizer',
      specs: [
        { text: 'Water carrying part in 316L Stainless Steel', icon: ShieldCheck },
        { text: 'Maintenance: completely free of maintenance', icon: Wrench },
        { text: 'Connections: 1 inch', icon: Plug },
        { text: 'Flow capacity: 5 m3 / h (at 4 bar)', icon: Gauge },
        { text: 'Lifetime: unlimited', icon: InfinityIcon }
      ]
    }
  ]
};

const CONTENT_FR = {
  nav: {
    complete: 'SYSTÈME COMPLET',
    lime: 'WATER LIME',
    particle: 'FILTRE À PARTICULES',
    fine: 'FILTRE FIN',
    dynamizer: 'The Swiss Water DYNAMIZER'
  },
  btnLearn: 'En savoir plus',
  sections: [
    {
      id: 'complete-system',
      title: 'SYSTÈME COMPLET',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/COMPLETE%20SET%20PLUS.png',
      desc: 'Notre solution intégrale pour une eau pure, saine et revitalisée dans toute votre maison. Le Système Complet combine nos quatre technologies de pointe.',
      link: '/solutions/mam-nature-complete-system',
      specs: [
        { label: 'Water LIME:', text: 'Anti-Calcaire - Traitement physique', icon: CheckCircle },
        { label: 'Water PARTICLE FILTER:', text: 'Filtre à particules (40 μm) + Backwash', icon: CheckCircle },
        { label: 'Water FINE FILTER:', text: 'Filtre fin (Chlore, Métaux lourds, Pesticides)', icon: CheckCircle },
        { label: 'Water DYNAMIZER:', text: "Dynamiseur d'Eau (Goût et douceur)", icon: CheckCircle }
      ]
    },
    {
      id: 'water-lime',
      title: 'WATER LIME',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20vertical.png',
      desc: 'Une alternative éprouvée aux systèmes d\'adoucissement de l\'eau sur une base purement physique. Water LIME convertit la forme dure de la chaux (Calcite) en une forme molle (Aragonite).',
      link: '/solutions/water-lime',
      specs: [
        { text: 'Basé sur des aimants permanents en néodyme', icon: Magnet },
        { text: 'Boîtier en acier inoxydable 316L', icon: ShieldCheck },
        { text: 'Aucun entretien requis', icon: Wrench },
        { text: 'Connexions : 1 pouce (variante 3/4 dispo.)', icon: Plug },
        { text: 'Capacité de débit : 1,5 m3/h', icon: Gauge },
        { text: 'Durée de vie : illimitée', icon: InfinityIcon }
      ]
    },
    {
      id: 'particle-filter',
      title: 'PARTICLE FILTER',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLES%20FILTER.png',
      desc: 'Mam Nature Swiss présente fièrement le premier filtre à particules sans PLOMB Swiss made, fabriqué en INOX 316L de qualité premium.',
      link: '/solutions/particle-filter',
      specs: [
        { text: 'Toutes les parties métalliques en Inox 316L', icon: ShieldCheck },
        { text: 'Pièces non métalliques de qualité alimentaire', icon: CheckCircle },
        { text: 'Aucun frais de maintenance', icon: Euro },
        { text: 'Entretien : Lavage 1x/mois', icon: Wrench },
        { text: 'Connexions : 1 pouce (adapt. 3/4 inclus)', icon: Plug },
        { text: 'Débit : 4,2 m3/h (à 4 bars)', icon: Gauge },
        { text: 'Durée de vie : illimitée', icon: InfinityIcon }
      ]
    },
    {
      id: 'fine-filter',
      title: 'FINE FILTER',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/fine%20filter%20with%20cartridge.png',
      desc: 'Réduit : le chlore, les pesticides, les microplastiques, les métaux lourds jusqu\'à 97-99%. Filtration sélective : préserve la structure et les minéraux de l\'eau.',
      link: '/solutions/fine-filter',
      specs: [
        { text: 'Boîtier & connecteur en Inox 316L (sans plomb)', icon: ShieldCheck },
        { text: 'Pièces non métalliques de qualité alimentaire', icon: CheckCircle },
        { text: 'Entretien : Changement cartouche (150 m3 / 1x an)', icon: Wrench },
        { text: 'Connexions : 1 pouce (adapt. 3/4 inclus)', icon: Plug },
        { text: 'Débit : 1,5 m3/h (à 4 bar)', icon: Gauge },
        { text: 'Capacité cartouche : 150 m3', icon: InfinityIcon }
      ]
    },
    {
      id: 'dynamizer',
      title: 'The Swiss Water DYNAMIZER',
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/DYNAMIZER.png',
      desc: 'L\'eau est transportée dans des tubes rectilignes, ce qui ne correspond pas à son mouvement naturel. Le dynamiseur restructure et revitalise l\'eau.',
      link: '/solutions/the-swiss-water-dynamizer',
      specs: [
        { text: 'Part aquifère en Inox 316L', icon: ShieldCheck },
        { text: 'Maintenance : entièrement sans maintenance', icon: Wrench },
        { text: 'Connexions : 1 pouce', icon: Plug },
        { text: 'Débit : 5 m3 / h (à 4 bars)', icon: Gauge },
        { text: 'Durée de vie : illimité', icon: InfinityIcon }
      ]
    }
  ]
};

export default function Solutions() {
  const [activeSection, setActiveSection] = useState('complete-system');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  // Scrollspy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
              { id: 'complete-system', label: content.nav.complete },
              { id: 'water-lime', label: content.nav.lime },
              { id: 'particle-filter', label: content.nav.particle },
              { id: 'fine-filter', label: content.nav.fine },
              { id: 'dynamizer', label: content.nav.dynamizer }
            ].map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.contentArea}>
        
        {content.sections.map((section) => (
          <section 
            key={section.id}
            id={section.id} 
            className={styles.contentSection}
            ref={(el) => { if (el) sectionRefs.current[section.id] = el; }}
          >
            <div className={styles.sectionHeader}><h2>{section.title}</h2></div>
            <div className={styles.componentLayout}>
              <img src={section.image} alt={section.title} loading="lazy" />
              <div className={styles.componentTextContent}>
                <p>{section.desc}</p>
                <ul className={`${styles.componentSpecs} ${section.id === 'complete-system' ? styles.transparentSpecs : ''}`}>
                  {section.specs.map((spec: any, idx) => (
                      <li key={idx}>
                      <spec.icon className={styles.specIcon} />
                      <div className={styles.specContent}>
                        {spec.label && <strong>{spec.label} </strong>}
                        {spec.label ? <p style={{display:'inline', margin:0}}>{spec.text}</p> : spec.text}
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href={section.link} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {content.btnLearn}
                </Link>
              </div>
            </div>
          </section>
        ))}

      </main>
    </div>
  );
}