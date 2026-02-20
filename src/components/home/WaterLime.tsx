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
  highlight: "Scale conversion solution: Effective, durable, and maintenance free.",

  // Problem Block
  problemTitle: "The Limescale Challenge",
  problemText: "Calcite, the hard form of limescale, builds up in your pipes and appliances, causing technical failures and dull surfaces.",

  limitsTitle: "The Limits of WaterSofteners",
  limits: [
    { bold: "Alters water:", text: " Sodium replaces essential minerals and deteriorates the taste." },
    { bold: "Bacterial risk:", text: " Can promote the development of bacteria." },
    { bold: "High maintenance:", text: " Requires salt for regeneration, wastes water and pollutes the environment" }
  ],

  galleryCalcite: "Calcite (incrusting)",
  galleryAragonite: "Aragonite (non-adhesive)",

  // Solution Block
  solutionTitle: "Our Solution: Physical Conversion",
  solutionTextPrefix: " Water LIME doesn’t remove limescale, ",
  solutionTextBold1: "it transforms its structure",
  solutionTextMiddle: ". Using permanent magnets, incrusting Calcite is converted into ",
  solutionTextBold2: "Aragonite",
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
  problemText: "La Calcite, forme dure du calcaire, s'accumule dans vos tuyaux et appareils, provoquant des pannes et ternissant les surfaces.",

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
  solutionTextMiddle: ". Grâce à des aimants permanents, la Calcite incrustante est convertie en ",
  solutionTextBold2: "Aragonite",
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

const CONTENT_DE = {
  headline: "Wasser LIME",
  highlight: "Anti-Kalk-Lösung: Effektiv, langlebig und wartungsfrei.",
  problemTitle: "Das Kalkproblem",
  problemText: "Calcit, die harte Form des Kalks, lagert sich in Ihren Rohren und Geräten ab, verursacht Ausfälle und trübt Oberflächen.",
  limitsTitle: "Die Grenzen von Wasserenthärtern",
  limits: [
    { bold: "Verändert das Wasser:", text: " Natrium ersetzt essentielle Mineralien und verändert den Geschmack." },
    { bold: "Bakterienrisiko:", text: " Kann das Bakterienwachstum fördern." },
    { bold: "Hoher Wartungsaufwand:", text: " Benötigt Salz, Regeneration und verschwendet Wasser." }
  ],
  galleryCalcite: "Calcit (verkrustend)",
  galleryAragonite: "Aragonit (nicht haftend)",
  solutionTitle: "Unsere Lösung: Physikalische Umwandlung",
  solutionTextPrefix: " Wasser LIME entfernt den Kalk nicht, ",
  solutionTextBold1: "es verändert seine Struktur",
  solutionTextMiddle: ". Dank Permanentmagneten wird verkrustender Calcit in ",
  solutionTextBold2: "Aragonit",
  solutionTextSuffix: " umgewandelt, eine nicht haftende Form.",
  features: [
    { bold: "Aktiver Schutz:", text: " Schützt Rohre, Warmwasserbereiter und Haushaltsgeräte." },
    { bold: "Wasser bleibt erhalten:", text: " Geschmack, Mineralien und Spurenelemente bleiben natürlich vorhanden." }
  ],
  benefitCapTitle: "Unbegrenzte Kapazität",
  benefitCapDesc: "Nachhaltiger und umweltfreundlicher Betrieb.",
  benefitMaintTitle: "Null Wartung",
  benefitMaintDesc: "Kein Salz, keine Kartuschen, keine Energie, kein Abfall."
};

const CONTENT_ES = {
  headline: "Water LIME",
  highlight: "Solución de conversión de cal: Efectiva, duradera y sin mantenimiento.",

  // Problem Block
  problemTitle: "El Desafío de la Cal",
  problemText: "La calcita, la forma dura de la cal, se acumula en sus tuberías y electrodomésticos, causando fallos técnicos y superficies opacas.",

  limitsTitle: "Los Límites de los Descalcificadores",
  limits: [
    { bold: "Altera el agua:", text: " El sodio reemplaza minerales esenciales y deteriora el sabor." },
    { bold: "Riesgo bacteriano:", text: " Puede promover el desarrollo de bacterias." },
    { bold: "Alto mantenimiento:", text: " Requiere sal para la regeneración, desperdicia agua y contamina el medio ambiente." }
  ],

  galleryCalcite: "Calcita (incrustante)",
  galleryAragonite: "Aragonito (no adhesivo)",

  // Solution Block
  solutionTitle: "Nuestra Solución: Conversión Física",
  solutionTextPrefix: " Water LIME no elimina la cal, ",
  solutionTextBold1: "transforma su estructura",
  solutionTextMiddle: ". Mediante imanes permanentes, la calcita incrustante se convierte en ",
  solutionTextBold2: "Aragonito",
  solutionTextSuffix: ", una forma no adhesiva.",

  features: [
    { bold: "Protección activa:", text: " Protege tuberías, calentadores de agua y electrodomésticos." },
    { bold: "Agua preservada:", text: " El sabor, los minerales y los oligoelementos permanecen presentes de forma natural." }
  ],

  benefitCapTitle: "Capacidad Ilimitada",
  benefitCapDesc: "Funcionamiento sostenible y ecológico.",
  benefitMaintTitle: "Cero Mantenimiento",
  benefitMaintDesc: "Sin sal, sin cartuchos, sin energía, sin residuos."
};

export default function WaterLime() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : language === 'de' ? CONTENT_DE : language === 'es' ? CONTENT_ES : CONTENT_EN;

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
                  <img src="/images/WEBSITE-P/water_lime/calcite 1.webp" alt="Calcite 1" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryCalcite}</p>
                </div>
                <div className={styles.galleryItem}>
                  <img src="/images/WEBSITE-P/water_lime/calcite 2.webp" alt="Calcite 2" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryCalcite}</p>
                </div>
                <div className={styles.galleryItem}>
                  <img src="/images/WEBSITE-P/water_lime/Aragonite_1.webp" alt="Aragonite 1" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryAragonite}</p>
                </div>
                <div className={styles.galleryItem}>
                  <img src="/images/WEBSITE-P/water_lime/Aragonite_2.webp" alt="Aragonite 2" loading="lazy" />
                  <p className={styles.galleryLabel}>{content.galleryAragonite}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 2: IMAGE */}
          <div className={styles.productImageBlock} data-aos="fade-up" data-aos-delay="50">
            <img
              src="/images/WEBSITE-P/products/water_lime_vertical.webp"
              alt="Mam Nature Swiss Water Lime"
              className={styles.desktopLimeImg}
              loading="lazy"
            />
            <img
              src="/images/WEBSITE-P/products/water_lime_horizontal.webp"
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