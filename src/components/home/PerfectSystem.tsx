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
    "Conversion of limestone (Calcite) into Aragonite (softer)",
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
    "Conversion du calcaire (Calcite) en Aragonite (plus douce)",
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

const CONTENT_DE = {
  headline: "Was ist das perfekte Wasseraufbereitungssystem?",
  features: [
    "Schadstofffreies Wasser",
    "Dynamisiertes Wasser",
    "Umwandlung von Kalkstein (Calcit) in Aragonit (weicher)",
    "Weiches Wasser mit natürlicher Mineralisierung",
    "Lösung für das ganze Haus (Trinkwasser, Dusche, Küche, etc.)",
    "Keine Wasserverschwendung, im Gegensatz zur Umkehrosmose",
    "Fast keine Wartung erforderlich",
    "Verhindert die Einleitung von entfernten Schadstoffen in die Natur",
    "Gebaut für ein ganzes Leben",
    "Ein einzigartiges Geschmackserlebnis"
  ],
  summaryTitle: "Mam Nature Swiss® – Wir ermöglichen das Unmögliche",
  summaryDesc: "Perfekt gefiltertes, natürlich mineralisiertes & dynamisiertes Wasser.",
  btnShop: "Zum Shop",
  btnCert: "Zertifikat von Swiss Safety System"
};

const PDF_URL = "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf";

export default function PerfectSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const { language } = useLanguage();

  // Determine content based on language
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : language === 'de' ? CONTENT_DE : CONTENT_EN;

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
                src="/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp"
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
                onClick={() => { setIsModalOpen(true); setIsLoadingPdf(true); }}
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
          onClick={() => { setIsModalOpen(false); setIsLoadingPdf(false); }}
          onContextMenu={(e) => e.preventDefault()} // Anti-save context menu
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 600 }}>Certificate Preview</span>
              <button className={styles.closeButton} onClick={() => { setIsModalOpen(false); setIsLoadingPdf(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 55px)' }}>
              {isLoadingPdf && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #D52D25', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading PDF...</p>
                  </div>
                </div>
              )}
              <object
                data={PDF_URL}
                type="application/pdf"
                style={{ width: '100%', height: '100%', border: 'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
                title="Certificate Preview"
                onLoad={() => setIsLoadingPdf(false)}
              >
                <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                  <p>Preview not available.</p>
                  <a href={PDF_URL} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                    Download PDF
                  </a>
                </div>
              </object>
            </div>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
}