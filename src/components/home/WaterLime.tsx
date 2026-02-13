'use client';

import React from 'react';
import { 
  TriangleAlert, XCircle, MinusCircle, ShieldCheck, 
  CheckCircle, Infinity as InfinityIcon, Wrench 
} from 'lucide-react';
import styles from './WaterLime.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  headline: "Water LIME",
  highlight: "Anti-Scale Solution: Effective, durable, and effortless.",
  
  // Problem Block
  problemTitle: "The Limescale Challenge",
  problemText: "Calcite, the hard form of limescale, builds up in your pipes and appliances, causing technical failures and dull surfaces.",
  
  limitsTitle: "The Limits of Softeners",
  limits: [
    { bold: "Alters water:", text: " Sodium replaces essential minerals and changes the taste." },
    { bold: "Bacterial risk:", text: " Can promote the development of bacteria." },
    { bold: "High maintenance:", text: " Requires salt, regeneration, and wastes water." }
  ],

  galleryCalcite: "Calcite (incrusting)",
  galleryAragonite: "Aragonite (non-adhesive)",

  // Solution Block
  solutionTitle: "Our Solution: Physical Conversion",
  solutionTextPrefix: " Water LIME doesn’t remove limescale, ",
  solutionTextBold1: "it transforms its structure",
  solutionTextMiddle: ". Using permanent magnets, incrusting calcite is converted into ",
  solutionTextBold2: "aragonite",
  solutionTextSuffix: ", a non-adhesive form.",

  features: [
    { bold: "Active protection:", text: " Protects pipes, water heaters, and appliances." },
    { bold: "Preserved water:", text: " Taste, minerals, and trace elements remain naturally present in the water." }
  ],

  benefitCapTitle: "Unlimited Capacity",
  benefitCapDesc: "Sustainable and ecological operation.",
  benefitMaintTitle: "Zero Maintenance",
  benefitMaintDesc: "No salt, no cartridges, no energy, no waste."
};

const CONTENT_FR = {
  headline: "Water LIME",
  highlight: "Solution Anti-Calcaire : Efficace, durable et sans effort.",
  
  // Problem Block
  problemTitle: "Le défi du calcaire",
  problemText: "La calcite, forme dure du calcaire, s'accumule dans vos tuyaux et appareils, provoquant des pannes et ternissant les surfaces.",
  
  limitsTitle: "Les limites des adoucisseurs",
  limits: [
    { bold: "Altère l'eau :", text: " Le sodium remplace les minéraux essentiels et change le goût." },
    { bold: "Risque bactérien :", text: " Peut favoriser le développement de bactéries." },
    { bold: "Entretien élevé :", text: " Nécessite du sel, une régénération et gaspille de l'eau." }
  ],

  galleryCalcite: "Calcite (incrustante)",
  galleryAragonite: "Aragonite (non incrustante)",

  // Solution Block
  solutionTitle: "Notre Solution : Conversion Physique",
  solutionTextPrefix: " Water LIME n'élimine pas le calcaire, ",
  solutionTextBold1: "il transforme sa structure",
  solutionTextMiddle: ". Grâce à des aimants permanents, la calcite incrustante est convertie en ",
  solutionTextBold2: "aragonite",
  solutionTextSuffix: ", une forme non adhésive.",

  features: [
    { bold: "Protection active :", text: " Protège les tuyaux, chauffe-eaux et appareils électroménagers." },
    { bold: "Eau préservée :", text: " Le goût, les minéraux et les oligo-éléments restent naturellement présents." }
  ],

  benefitCapTitle: "Capacité Illimitée",
  benefitCapDesc: "Fonctionnement durable et écologique.",
  benefitMaintTitle: "Zéro Entretien",
  benefitMaintDesc: "Pas de sel, pas de cartouches, pas d'énergie, pas de déchets."
};

export default function WaterLime() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div data-aos="fade-up">
          <h2 className={styles.sectionHeadline}>
            {content.headline}
            <span className={styles.highlight}>{content.highlight}</span>
          </h2>
        </div>
        
        <div className={styles.sectionGrid}>

          {/* BLOCK 1: PROBLEM */}
          <div className={`${styles.contentBlock} ${styles.problemBlock}`} data-aos="fade-up" data-aos-delay="100">
            <h3 className={styles.blockTitle}>
              <TriangleAlert size={24} />
              {content.problemTitle}
            </h3>
            <p className={styles.blockText}>
              <strong>Calcite</strong>, {content.problemText.replace('Calcite, ', '')}
            </p>
            
            <h4 className={styles.blockTitle} style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
              <XCircle size={20} />
              {content.limitsTitle}
            </h4>
            <ul className={styles.featureList}>
              {content.limits.map((limit, idx) => (
                <li key={idx}>
                  <MinusCircle className={styles.listIcon} size={18} />
                  <span><strong>{limit.bold}</strong>{limit.text}</span>
                </li>
              ))}
            </ul>

            <div className={styles.imageGallery}>
              <div className={styles.galleryGrid}>
                <div className={styles.galleryItem}>
                  <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dbae748da3ed0a5310c2ce_calcite%201.png" alt="Calcite 1" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryCalcite}</p>
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dbae747ac7a1a3fc3cd09e_calcite%202.png" alt="Calcite 2" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryCalcite}</p>
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dbae7463b61f8563dc0488_Aragonite%201.png" alt="Aragonite 1" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryAragonite}</p>
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dbae7431433fe844408d14_Aragonite%202.png" alt="Aragonite 2" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryAragonite}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 2: IMAGE */}
          <div className={styles.productImageBlock} data-aos="fade-up" data-aos-delay="50">
            <img 
              src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20vertical.png" 
              alt="Mam Nature Swiss Water Lime" 
              className={styles.desktopLimeImg} 
              loading="lazy"
            />
            <img 
              src="https://cdn.prod.website-files.com/681dc50d091bbb9d3bec573c/68dd1be17bacce53693d2621_MNS%20Water%20LIME.png" 
              alt="Mam Nature Swiss Water Lime Mobile" 
              className={styles.mobileLimeImg} 
              loading="lazy"
            />
          </div>

          {/* BLOCK 3: SOLUTION */}
          <div className={`${styles.contentBlock} ${styles.solutionBlock}`} data-aos="fade-up" data-aos-delay="200">
            <h3 className={styles.blockTitle}>
              <ShieldCheck size={24} />
              {content.solutionTitle}
            </h3>
            <p className={styles.blockText}>
              <span className={styles.redText}>Mam Nature Swiss®</span> 
              {content.solutionTextPrefix}
              <strong>{content.solutionTextBold1}</strong>
              {content.solutionTextMiddle}
              <strong>{content.solutionTextBold2}</strong>
              {content.solutionTextSuffix}
            </p>
            
            <ul className={styles.featureList}>
              {content.features.map((feature, idx) => (
                <li key={idx}>
                  <CheckCircle className={styles.listIcon} size={20} />
                  <span><strong>{feature.bold}</strong>{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className={styles.limeBenefitsGrid}>
              <div className={styles.limeBenefitItem}>
                <InfinityIcon className={styles.benefitIcon} size={24} />
                <strong>{content.benefitCapTitle}</strong>
                <p>{content.benefitCapDesc}</p>
              </div>
              <div className={styles.limeBenefitItem}>
                <Wrench className={styles.benefitIcon} size={24} />
                <strong>{content.benefitMaintTitle}</strong>
                <p>{content.benefitMaintDesc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}