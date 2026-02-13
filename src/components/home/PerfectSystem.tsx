'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Check, FileText, X } from 'lucide-react';
import styles from './PerfectSystem.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  headline: "What is The Perfect Water Treatment System?",
  features: [
    "Contaminants-free water",
    "Dynamized water",
    "Conversion of limestone (calcite) into aragonite (softer)",
    "Soft water with natural mineralization",
    "Whole-house solution (drinking water, shower, kitchen, etc.)",
    "No water waste, unlike reverse osmosis",
    "Almost no maintenance required",
    "Prevent the introduction of removed contaminants into nature",
    "Built to last a lifetime",
    "A unique taste experience"
  ],
  summaryTitle: "Mam Nature Swiss® – Solving the impossible",
  summaryDesc: "Perfectly filtered, naturally mineralized & dynamized water.",
  btnShop: "Visit the Shop",
  btnCert: "Swiss Safety System Certificate"
};

const CONTENT_FR = {
  headline: "Définition du système parfait de traitement d’eau",
  features: [
    "Eau exempte de tout contaminant",
    "Eau dynamisée",
    "Conversion du calcaire (calcite) en aragonite (plus douce)",
    "Eau adoucie tout en gardant sa minéralisation naturelle",
    "Global, chaque goute dans toute la maison est soigneusement traitée (eau potable, douche, cuisine, etc.)",
    "Aucun gaspillage d’eaux contrairement à l’osmose inverse",
    "Presque aucun entretien n’est nécessaire",
    "Respect de l’environnement, pas de rejet de contaminants retenus dans la nature",
    "Conçu pour durer toute une vie",
    "Une expérience gustative unique"
  ],
  summaryTitle: "Mam-Nature Swiss® Là où l’impossible devient réalité :",
  summaryDesc: "Une eau parfaitement filtrée, douce et naturellement minéralisée.",
  btnShop: "Visiter la boutique",
  btnCert: "Certificat de Swiss Safety System"
};

const PDF_URL = "https://docs.google.com/gview?url=https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf&embedded=true";

export default function PerfectSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  // Determine content based on language
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
      easing: 'ease-out-quad',
      offset: 100,
    });
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          
          <h1 className={styles.headline} data-aos="fade-up">
            {content.headline}
          </h1>

          <div className={styles.columnsWrapper}>
            
            {/* Left Column: Image */}
            <div className={styles.imagePanel} data-aos="fade-up" data-aos-delay="100">
              <img 
                src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/COMPLETE%20SET.png" 
                alt="Complete Mam Nature water treatment system" 
                loading="lazy"
              />
            </div>

            {/* Right Column: Content */}
            <div className={styles.content} data-aos="fade-up" data-aos-delay="200">
              <ul className={styles.featuresList}>
                {content.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <Check className={styles.featureIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.summaryWrapper} data-aos="fade-up" data-aos-delay="250">
            <p className={styles.summary}>
              {content.summaryTitle}<br />
              {content.summaryDesc}
            </p>

            <div className={styles.buttonsWrapper}>
              <Link href="/shop" className={styles.ctaButton}>
                {content.btnShop}
              </Link>

              <button 
                className={styles.secondaryButton}
                onClick={() => setIsModalOpen(true)}
              >
                <FileText size={18} /> {content.btnCert}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Certificate Modal */}
      {isModalOpen && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setIsModalOpen(false)}
          onContextMenu={(e) => e.preventDefault()} // Anti-save context menu
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            <iframe 
              src={PDF_URL} 
              className={styles.modalFrame} 
              sandbox="allow-scripts allow-same-origin"
              title="Certificate Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}