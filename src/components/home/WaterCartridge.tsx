'use client';

import React, { useState, useEffect } from 'react';
import { Gauge, Infinity as InfinityIcon, Wrench, FileText, X } from 'lucide-react';
import styles from './WaterCartridge.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  title: "The Swiss Water Cartridge",
  subtitle: "Beyond filtration, a true shield.",
  tagline: "UNMATCHED SAFETY & PURITY",
  desc1: "Our 100% natural filtration technology, exclusive to Mam Nature Swiss®, combines natural protein fibers with activated carbon to achieve total adsorption, a world first.",
  desc2: "It eliminates contaminants while preserving minerals and trace elements being naturally present in water.",
  desc3Part1: "Owing to its selective filtration system by full adsorption, this patented Swiss invention is the world unique universal solution, 100% natural, capable of eliminating ",
  desc3Bold: "PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium, etc. - and even radioactive substances found in nuclear water.",
  specFlowTitle: "Flow Rate",
  specFlowValue: "2,000+ liters/hour",
  specCapTitle: "Filter Cartridge Capacity",
  specCapValue: "150m³ per cartridge",
  specMaintTitle: "Maintenance",
  specMaintValue: "10 min / year (no tools)",
  reportsTitle: "Reports & Certifications",
  reportName: "Performance Report",
  viewPreview: "View Preview"
};

const CONTENT_FR = {
  title: "La Cartouche Swiss Water",
  subtitle: "Au-delà de la filtration, un véritable bouclier.",
  tagline: "SÉCURITÉ & PURETÉ INÉGALÉES",
  desc1: "Notre technologie de filtration 100% naturelle, exclusive à Mam Nature Swiss®, combine des fibres de protéines naturelles avec du charbon actif pour obtenir une adsorption totale, une première mondiale.",
  desc2: "Elle élimine les contaminants tout en préservant les minéraux et oligo-éléments naturellement présents dans l'eau.",
  desc3Part1: "Grâce à son système de filtration sélectif par adsorption complète, cette invention suisse brevetée est l'unique solution universelle au monde, 100% naturelle, capable d'éliminer les ",
  desc3Bold: "PFAS, métaux lourds, aluminium, chlore, fluorure, pesticides, résidus pharmaceutiques, produits chimiques industriels, arsenic, cadmium, chrome, etc. - et même les substances radioactives présentes dans l'eau nucléaire.",
  specFlowTitle: "Débit",
  specFlowValue: "2 000+ litres/heure",
  specCapTitle: "Capacité de la cartouche",
  specCapValue: "150m³ par cartouche",
  specMaintTitle: "Entretien",
  specMaintValue: "10 min / an (sans outils)",
  reportsTitle: "Rapports & Certifications",
  reportName: "Rapport de Performance",
  viewPreview: "Voir l'aperçu"
};

const REPORT_URL = "https://docs.google.com/gview?url=https://cdn.prod.website-files.com/6772955ff9646840f29d1d3d/68fe15932c0ff59fbb05dd09_The%20Swiss%20Water%20Cartridge_Retention%20Rates_Certificated%20ETH%20Zurich.pdf&embedded=true";

export default function WaterCartridge() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  // Determine content based on language
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  // Helper to handle body scroll lock
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          
          <div className={styles.header} data-aos="fade-up">
            <h2 className={styles.title}>{content.title}</h2>
            <h3 className={styles.subtitle}>{content.subtitle}</h3>
            <h3 className={styles.tagline}>{content.tagline}</h3>
          </div>

          <div className={styles.grid}>
            {/* Left Image */}
            <div className={styles.imagePanel} data-aos="fade-up">
              <img 
                src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/CARTRIDGE.png" 
                alt="The Mam Nature Swiss water cartridge" 
                loading="lazy"
              />
            </div>

            {/* Right Content */}
            <div className={styles.content} data-aos="fade-up" data-aos-delay="200">
              <div className={styles.description}>
                <p>{content.desc1}</p>
                <p>{content.desc2}</p>
                <p>
                  {content.desc3Part1}
                  <strong>{content.desc3Bold}</strong>
                </p>
              </div>

              {/* Specs Grid */}
              <div className={styles.specsGrid}>
                <div className={styles.specCard}>
                  <Gauge className={styles.specIcon} />
                  <h4>{content.specFlowTitle}</h4>
                  <p>{content.specFlowValue}</p>
                </div>
                <div className={styles.specCard}>
                  <InfinityIcon className={styles.specIcon} />
                  <h4>{content.specCapTitle}</h4>
                  <p>{content.specCapValue}</p>
                </div>
                <div className={styles.specCard}>
                  <Wrench className={styles.specIcon} />
                  <h4>{content.specMaintTitle}</h4>
                  <p>{content.specMaintValue}</p>
                </div>
              </div>

              {/* Reports Section */}
              <div className={styles.reportsSection}>
                <h3 className={styles.reportsTitle}>{content.reportsTitle}</h3>
                <div className={styles.reportsGrid}>
                  <div 
                    className={styles.reportCard} 
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FileText className={styles.reportIcon} size={24} />
                    <h4>{content.reportName}</h4>
                    <p>{content.viewPreview}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setIsModalOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            <iframe 
              src={REPORT_URL} 
              className={styles.modalFrame} 
              sandbox="allow-scripts allow-same-origin"
              title="Report Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}