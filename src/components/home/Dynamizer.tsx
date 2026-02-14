'use client';

import React, { useState } from 'react';
import { 
  TriangleAlert, XCircle, Plus, ArrowRight, ShieldCheck, 
  CheckCircle, Star, Droplets, Shield, Gauge, Infinity as InfinityIcon, Wrench 
} from 'lucide-react';
import styles from './Dynamizer.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  headerTitle: "THE SWISS WATER DYNAMIZER",
  tagline1: "Restore water’s original vitality.",
  tagline2: "Nature’s intelligence at the service of your well-being.",
  
  // Problem Section
  problemTitle: "The Problem with Modern Water",
  problemDesc: "Water is life. Modern drinking water, though treated, often loses its natural ability to deeply hydrate cells and facilitate waste elimination.",
  problems: [
    {
      title: "Low cellular bioavailability",
      desc: "Industrial treatments alter the molecular structure of water, creating “large water molecule clusters” that cells hardly absorb."
    },
    {
      title: "Destructured water",
      desc: "In its natural state, high-quality water has a perfect hexagonal structure. This is destroyed in straight water pipes."
    }
  ],

  // Solution Section
  solutionTitle: "Our Solution: The Swiss Water Dynamizer",
  solutionDesc: "It works entirely physically to restore water’s beneficial properties. It doesn’t filter – it revitalizes.",
  solutions: [
    {
      title: "Restructuring & Revitalization",
      desc: "Breaks large clusters into micro-clusters, making water highly bioavailable. Restores natural hexagonal structure."
    },
    {
      title: "Limestone Transformation",
      desc: "Converts hard calcite into soft aragonite using magnets and turbulence. Protects appliances."
    },
    {
      title: "Long-Term stabilization",
      desc: "Dynamized water gains a biologically stable structure that lasts over time."
    }
  ],

  // Conclusion Section
  conclusionTitle: "THE SWISS WATER DYNAMIZER",
  conclusionText: "That’s why it’s essential to drink water that is not only pure and mineralized, but also living and structured.",
  pipeStraightTitle: "Straight water pipe:",
  pipeStraightDesc: "Water clusters and loses its biophysical power.",
  pipeSpiralTitle: "Spiral water pipe:",
  pipeSpiralDesc: "Molecular clusters are dissolved and water regains power.",

  // Benefits Section
  benefitsTitle: "Daily benefits",
  benefit1Title: "Exceptional taste",
  benefit1Desc: "Discover an incredibly soft, remarkably digestible and pleasant water.",
  benefit2Title: "Optimal cellular hydration",
  benefit2Desc: "Supports proper body function and helps reduce acidity.",
  benefit3Title: "Natural Limescale Protection",
  benefit3Desc: "Protects your appliances and surfaces without salt or chemicals.",
  benefit4Title: "Unmatched performance",
  benefit4Desc: "With a capacity of 5,000 liters/hour, it serves the whole house.",
  
  specCapacityTitle: "Capacity",
  specCapacityValue: "Unlimited",
  specMaintTitle: "Maintenance",
  specMaintValue: "None"
};

const CONTENT_FR = {
  headerTitle: "THE SWISS WATER DYNAMIZER",
  tagline1: "Redonne à l'eau sa vitalité originelle.",
  tagline2: "L'intelligence de la nature au service de votre bien-être.",
  
  // Problem Section
  problemTitle: "Problème de l'eau moderne",
  problemDesc: "L'eau c'est la vie. L'eau potable moderne, bien que traitée, perd souvent sa capacité naturelle à hydrater profondément les cellules.",
  problems: [
    {
      title: "Une faible biodisponibilité cellulaire",
      desc: "Les traitements industriels et la déminéralisation altèrent la structure moléculaire de l'eau, créant de 'gros clusters' que nos cellules absorbent difficilement."
    },
    {
      title: "Une eau déstructurée",
      desc: "À l'état naturel, une eau de qualité possède une structure hexagonale parfaite, garante d'une hydratation optimale. Cette structure est malheureusement détruite par son parcours jusqu'à notre robinet."
    }
  ],

  // Solution Section
  solutionTitle: "La Solution",
  solutionDesc: "Agit de manière 100% physique pour restituer à l'eau toutes ses propriétés bénéfiques. Il ne filtre pas, il revitalise.",
  solutions: [
    {
      title: "Restructuration et revitalisation",
      desc: "Fragmente les gros clusters moléculaires en micro-clusters, rendant l'eau hautement biodisponible. Simultanément, il lui redonne sa structure hexagonale naturelle."
    },
    {
      title: "Transformation du calcaire",
      desc: "Grâce à une combinaison d'aimants permanents et de turbulence, il convertit le calcaire (calcite dure) en aragonite douce. Protège vos appareils."
    },
    {
      title: "Stabilisation durable",
      desc: "L'eau dynamisée acquiert une structure biologiquement stable qui se maintient dans le temps."
    }
  ],

  // Conclusion Section
  conclusionTitle: "THE SWISS WATER DYNAMIZER",
  conclusionText: "Il est donc essentiel de consommer une eau non seulement pure et minéralisée, mais aussi vivante et structurée.",
  pipeStraightTitle: "Straight water pipe:",
  pipeStraightDesc: "L'eau s'agglutine et perd sa puissance biophysique.",
  pipeSpiralTitle: "Spiral water pipe:",
  pipeSpiralDesc: "Les amas moléculaires sont dissous et l'eau retrouve sa puissance biophysique.",

  // Benefits Section
  benefitsTitle: "Les bénéfices au quotidien",
  benefit1Title: "Une eau au goût exceptionnel",
  benefit1Desc: "Découvrez une eau douce, remarquablement digeste et agréable à boire.",
  benefit2Title: "Une hydratation cellulaire optimale",
  benefit2Desc: "Favorise le bon fonctionnement de l’organisme et aide à réduire l'acidité.",
  benefit3Title: "Réduction des dépôts de calcaire",
  benefit3Desc: "Protège naturellement vos électroménagers et vos surfaces sans utiliser de sel ou de produits chimiques.",
  benefit4Title: "Une performance inégalée",
  benefit4Desc: "Avec une capacité de traitement de 5 000 litres/heure, le dynamiseur répond aux besoins de toute la maison.",
  
  specCapacityTitle: "Capacité",
  specCapacityValue: "Illimitée",
  specMaintTitle: "Entretien",
  specMaintValue: "Zéro entretien"
};

export default function Dynamizer() {
  const [activeProblem, setActiveProblem] = useState<number | null>(null);
  const [activeSolution, setActiveSolution] = useState<number | null>(null);
  
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const toggleProblem = (idx: number) => setActiveProblem(activeProblem === idx ? null : idx);
  const toggleSolution = (idx: number) => setActiveSolution(activeSolution === idx ? null : idx);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <header className={styles.header} data-aos="fade-up">
          <h2 className={styles.mainTitle}>{content.headerTitle}</h2>
          <p className={styles.tagline}>{content.tagline1}</p>
          <p className={`${styles.tagline} ${styles.taglineRed}`}>{content.tagline2}</p>
        </header>

        <div className={styles.visualFlowGrid}>
          
          {/* COLUMN 1: PROBLEM */}
          <div className={styles.flowColumn} data-aos="fade-up">
            <h3>
              <TriangleAlert className={`${styles.columnIcon} ${styles.iconProblem}`} size={24} />
              {content.problemTitle}
            </h3>
            <p>{content.problemDesc}</p>
            
            <ul className={styles.iconList}>
              {content.problems.map((item, idx) => (
                <li key={idx} className={`${styles.iconListItem} ${activeProblem === idx ? styles.active : ''}`} onClick={() => toggleProblem(idx)}>
                  <XCircle className={`${styles.listIcon} ${styles.iconProblem}`} size={20} />
                  <div className={styles.listText}>
                    <strong>
                      {item.title}
                      <Plus className={styles.toggleIcon} size={16} />
                    </strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.imagePair}>
              <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68db19801650b6d08333f5d3_cell%20before.png" alt="Cell before dynamization" loading="lazy" />
              <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1c2bbf5b4fe2f0c82ee3_Cell%20mouth%20Big%20clusters.png" alt="Water cluster before" loading="lazy" />
            </div>
          </div>

          {/* COLUMN 2: CENTER IMAGE */}
          <div className={styles.productImageContainer} data-aos="fade-up" data-aos-delay="200">
            <ArrowRight className={styles.flowArrow} />
            <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/DYNAMIZER.webp" alt="The Swiss Water Dynamizer" loading="lazy" />
            <ArrowRight className={styles.flowArrow} />
          </div>

          {/* COLUMN 3: SOLUTION */}
          <div className={styles.flowColumn} data-aos="fade-up">
            <h3>
              <ShieldCheck className={`${styles.columnIcon} ${styles.iconSolution}`} size={24} />
              {content.solutionTitle}
            </h3>
            <p>{content.solutionDesc}</p>
            
            <ul className={styles.iconList}>
              {content.solutions.map((item, idx) => (
                <li key={idx} className={`${styles.iconListItem} ${activeSolution === idx ? styles.active : ''}`} onClick={() => toggleSolution(idx)}>
                  <CheckCircle className={`${styles.listIcon} ${styles.iconSolution}`} size={20} />
                  <div className={styles.listText}>
                    <strong>
                      {item.title}
                      <Plus className={styles.toggleIcon} size={16} />
                    </strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.imagePair}>
              <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68db1980b6ba9dc316c8be9e_Frame%201.png" alt="Cell after dynamization" loading="lazy" />
              <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1c2bb9d316188c73a11a_Cell%20mouth%20Micro%20clusters.png" alt="Water cluster after" loading="lazy" />
            </div>
          </div>

        </div>

        {/* Conclusion Section */}
        <div className={styles.conclusionSection} data-aos="fade-up">
          <h4>{content.conclusionTitle}</h4>
          <p className={styles.conclusionP}>{content.conclusionText}</p>
          <div className={styles.pipeComparisonInline}>
            <div className={styles.pipeItemInline} data-aos="fade-up">
              <h5>{content.pipeStraightTitle}</h5>
              <p>{content.pipeStraightDesc}</p>
              <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1a7c91c3165fbe2f7354_Straight%20Water%20Pipe.png" alt="Straight water pipe" loading="lazy" />
            </div>
            <div className={styles.pipeItemInline} data-aos="fade-up">
              <h5>{content.pipeSpiralTitle}</h5>
              <p>{content.pipeSpiralDesc}</p>
              <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1a7c0f9a2706c32f43c9_Spiral%20Water%20Pipe.png" alt="Spiral water pipe" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={styles.benefitsSection}>
          <h3 className={styles.benefitsTitle} data-aos="fade-up">{content.benefitsTitle}</h3>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard} data-aos="fade-up" data-aos-delay="100">
              <div className={styles.benefitIcon}><Star size={32} /></div>
              <h4>{content.benefit1Title}</h4>
              <p>{content.benefit1Desc}</p>
            </div>
            <div className={styles.benefitCard} data-aos="fade-up" data-aos-delay="200">
              <div className={styles.benefitIcon}><Droplets size={32} /></div>
              <h4>{content.benefit2Title}</h4>
              <p>{content.benefit2Desc}</p>
            </div>
            <div className={styles.benefitCard} data-aos="fade-up" data-aos-delay="300">
              <div className={styles.benefitIcon}><Shield size={32} /></div>
              <h4>{content.benefit3Title}</h4>
              <p>{content.benefit3Desc}</p>
            </div>
            <div className={styles.benefitCard} data-aos="fade-up" data-aos-delay="400">
              <div className={styles.benefitIcon}><Gauge size={32} /></div>
              <h4>{content.benefit4Title}</h4>
              <p>{content.benefit4Desc}</p>
            </div>
          </div>

          <div className={styles.specGrid} data-aos="fade-up">
            <div className={styles.specCard}>
              <div className={styles.specIcon}><InfinityIcon size={40} /></div>
              <div>
                <h4>{content.specCapacityTitle}</h4>
                <p>{content.specCapacityValue}</p>
              </div>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specIcon}><Wrench size={40} /></div>
              <div>
                <h4>{content.specMaintTitle}</h4>
                <p>{content.specMaintValue}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}