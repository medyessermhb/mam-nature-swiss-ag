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
  desc1: "Our 100% natural, Mam Nature Swiss® exclusive & world first filtration technology combines natural protein fibers with activated carbon to achieve perfect filtration.",
  desc2: "Whole house solution (POE):It eliminates contaminants while preserving minerals and trace elements being naturally present in water.",
  desc3Part1: "Owing to its selective filtration system by full adsorption, this patented Swiss invention is the world unique universal solution, 100% natural, capable of eliminating ",
  desc3Bold: "PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium, etc. - and even radioactive substances found in nuclear water.",
  specFlowTitle: "Flow Rate",
  specFlowValue: "2,000+ liters/hour",
  specCapTitle: "Filter Cartridge Capacity",
  specCapValue: "Min. 100 m3 per cartridge",
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

const CONTENT_DE = {
  title: "Die Swiss Water Kartusche",
  subtitle: "Weit mehr als ein Filter – ein echter Schutzschild.",
  tagline: "UNÜBERTROFFENE SICHERHEIT & REINHEIT",
  desc1: "Unsere 100% natürliche Technologie, exklusiv von Mam Nature Swiss®, kombiniert natürliche Proteinfasern mit Aktivkohle zu einer vollständigen Adsorption – eine Weltneuheit.",
  desc2: "Ganzhauslösung (POE): Entfernt Schadstoffe, während im Wasser natürlich vorkommende Mineralien und Spurenelemente erhalten bleiben.",
  desc3Part1: "Dank ihres selektiven Adsorptionssystems ist diese patentierte Schweizer Erfindung die weltweit einzige zu 100% natürliche Lösung zur Eliminierung von ",
  desc3Bold: "PFAS, Schwermetallen, Aluminium, Chlor, Fluorid, Pestiziden, Medikamentenrückständen, Industriechemikalien – bis hin zu radioaktiven Substanzen.",
  specFlowTitle: "Durchflussrate",
  specFlowValue: "2.000+ Liter/Stunde",
  specCapTitle: "Kartuschenkapazität",
  specCapValue: "Mind. 100 m³ pro Kartusche",
  specMaintTitle: "Wartung",
  specMaintValue: "10 Min. / Jahr (ohne Werkzeug)",
  reportsTitle: "Berichte & Zertifizierungen",
  reportName: "Leistungsbericht",
  viewPreview: "Vorschau ansehen"
};

const CONTENT_ES = {
  title: "El Cartucho Swiss Water",
  subtitle: "Más allá de la filtración, un verdadero escudo.",
  tagline: "SEGURIDAD Y PUREZA INIGUALABLES",
  desc1: "Nuestra tecnología de filtración 100% natural, exclusiva de Mam Nature Swiss® y primicia mundial, combina fibras de proteínas naturales con carbón activado para lograr una filtración perfecta.",
  desc2: "Solución para toda la casa (POE): Elimina contaminantes mientras mantiene los minerales y oligoelementos presentes de forma natural en el agua.",
  desc3Part1: "Gracias a su sistema de filtración selectiva por adsorción total, esta invención suiza patentada es la única solución universal en el mundo, 100% natural, capaz de eliminar ",
  desc3Bold: "PFAS, metales pesados, aluminio, cloro, flúor, pesticidas, residuos farmacéuticos, productos químicos industriales, arsénico, cadmio, cromo, etc. - e incluso sustancias radiactivas.",
  specFlowTitle: "Caudal",
  specFlowValue: "2.000+ litros/hora",
  specCapTitle: "Capacidad de la cartucho",
  specCapValue: "Mín. 100 m³ por cartucho",
  specMaintTitle: "Mantenimiento",
  specMaintValue: "10 min / año (sin herramientas)",
  reportsTitle: "Informes y Certificaciones",
  reportName: "Informe de Rendimiento",
  viewPreview: "Ver Vista Previa"
};

const REPORT_URL = "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf";

export default function WaterCartridge() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const { language } = useLanguage();

  // Determine content based on language
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : language === 'de' ? CONTENT_DE : language === 'es' ? CONTENT_ES : CONTENT_EN;

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
                src="/images/WEBSITE-P/products/cartridge.webp"
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
                    onClick={() => { setIsModalOpen(true); setIsLoadingPdf(true); }}
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
          onClick={() => { setIsModalOpen(false); setIsLoadingPdf(false); }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 600 }}>Document Preview</span>
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
                data={REPORT_URL}
                type="application/pdf"
                style={{ width: '100%', height: '100%', border: 'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
                title="Document Preview"
                onLoad={() => setIsLoadingPdf(false)}
              >
                <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                  <p>Preview not available.</p>
                  <a href={REPORT_URL} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
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