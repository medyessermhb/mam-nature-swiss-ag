'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/Reports.module.css';
import { FileText, Award, ShieldCheck, Atom, ClipboardCheck, X, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  title: "Reports & Certifications",
  subtitle: "Transparency and quality assurance: consult our official documents.",
  viewPreview: "View Preview",
  reports: [
    {
      title: "Filtration Performance Report",
      desc: "Certified by ETH Zurich, detailing the retention rates of our patented filtration technology.",
      icon: FileText,
      url: "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf"
    },
    {
      title: "Swiss Safety System Certificate",
      desc: "Verifies the structural integrity and safety of our system housing under high pressure.",
      icon: ShieldCheck,
      url: "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf"
    },
    {
      title: "ISO Certificate",
      desc: "Confirms our adherence to international standards for quality management systems.",
      icon: Award,
      url: "/images/website-assets/certificates/ISO.pdf"
    },
    {
      title: "H2 Booster Certificate",
      desc: "Official CE-Certificate for our advanced Hydrogen Booster technology.",
      icon: Atom,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf"
    },
    {
      title: "H2 Conformity Assessment",
      desc: "Official assessment confirming regulatory compliance for the Hydrogen Booster.",
      icon: ClipboardCheck,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf"
    }
  ]
};

const CONTENT_FR = {
  title: "Rapports & Certifications",
  subtitle: "Transparence et assurance qualité : consultez nos documents officiels.",
  viewPreview: "Voir l'aperçu",
  reports: [
    {
      title: "Rapport de Performance de Filtration",
      desc: "Certifié par l'ETH Zurich, détaillant les taux de rétention de notre technologie de filtration brevetée.",
      icon: FileText,
      url: "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf"
    },
    {
      title: "Certificat Swiss Safety System",
      desc: "Vérifie l'intégrité structurelle et la sécurité de notre système sous haute pression.",
      icon: ShieldCheck,
      url: "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf"
    },
    {
      title: "Certificat ISO",
      desc: "Confirme notre adhésion aux normes internationales pour les systèmes de management de la qualité.",
      icon: Award,
      url: "/images/website-assets/certificates/ISO.pdf"
    },
    {
      title: "Certificat H2 Booster",
      desc: "Certificat CE officiel pour notre technologie avancée de Hydrogen Booster.",
      icon: Atom,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf"
    },
    {
      title: "Évaluation de Conformité H2",
      desc: "Évaluation officielle confirmant la conformité réglementaire du Hydrogen Booster.",
      icon: ClipboardCheck,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf"
    }
  ]
};

const CONTENT_DE = {
  title: "Berichte & Zertifizierungen",
  subtitle: "Transparenz und Qualitätssicherung: Konsultieren Sie unsere offiziellen Dokumente.",
  viewPreview: "Vorschau ansehen",
  reports: [
    {
      title: "Filtrationsleistungsbericht",
      desc: "Zertifiziert von der ETH Zürich, detailliert die Rückhalteraten unserer patentierten Filtrationstechnologie.",
      icon: FileText,
      url: "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf"
    },
    {
      title: "Zertifikat Schweizer Sicherheitssystem",
      desc: "Bestätigt die strukturelle Integrität und Sicherheit unseres Systemgehäuses unter hohem Druck.",
      icon: ShieldCheck,
      url: "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf"
    },
    {
      title: "ISO-Zertifikat",
      desc: "Bestätigt die Einhaltung internationaler Standards für Qualitätsmanagementsysteme.",
      icon: Award,
      url: "/images/website-assets/certificates/ISO.pdf"
    },
    {
      title: "H2 Booster Zertifikat",
      desc: "Offizielles CE-Zertifikat für unsere fortschrittliche Hydrogen Booster Technologie.",
      icon: Atom,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf"
    },
    {
      title: "H2 Konformitätsbewertung",
      desc: "Offizielle Bewertung zur Bestätigung der Einhaltung gesetzlicher Vorschriften für den Hydrogen Booster.",
      icon: ClipboardCheck,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf"
    }
  ]
};

const CONTENT_ES = {
  title: "Informes y Certificaciones",
  subtitle: "Transparencia y garantía de calidad: consulte nuestros documentos oficiales.",
  viewPreview: "Ver vista previa",
  reports: [
    {
      title: "Informe de Rendimiento de Filtración",
      desc: "Certificado por ETH Zurich, detallando las tasas de retención de nuestra tecnología de filtración patentada.",
      icon: FileText,
      url: "/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf"
    },
    {
      title: "Certificado del Sistema de Seguridad Suizo",
      desc: "Verifica la integridad estructural y la seguridad de la carcasa de nuestro sistema bajo alta presión.",
      icon: ShieldCheck,
      url: "/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf"
    },
    {
      title: "Certificado ISO",
      desc: "Confirma nuestra adhesión a las normas internacionales para los sistemas de gestión de calidad.",
      icon: Award,
      url: "/images/website-assets/certificates/ISO.pdf"
    },
    {
      title: "Certificado del H2 Booster",
      desc: "Certificado CE oficial para nuestra avanzada tecnología Hydrogen Booster.",
      icon: Atom,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf"
    },
    {
      title: "Evaluación de Conformidad H2",
      desc: "Evaluación oficial que confirma el cumplimiento normativo del Hydrogen Booster.",
      icon: ClipboardCheck,
      url: "/images/website-assets/certificates/Mam_Nature_Swiss_Hydrogen_Booster_CE-Conformity_Assessment_2025-005-CR-01_signed.pdf"
    }
  ]
};

export default function ReportsPage() {
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const isSpanish = language === 'es';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : isSpanish ? CONTENT_ES : CONTENT_EN;

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openReport = (url: string) => {
    setLoading(true);
    setModalUrl(url);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeReport = () => {
    setModalUrl(null);
    setLoading(false);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>

        <div className={styles.grid}>
          {content.reports.map((report, idx) => (
            <div
              key={idx}
              className={styles.card}
              onClick={() => openReport(report.url)}
            >
              <div className={styles.iconWrapper}>
                <report.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{report.title}</h3>
              <p className={styles.cardDesc}>{report.desc}</p>
              <span className={styles.cardCta}>
                <Eye size={18} /> {content.viewPreview}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* PDF MODAL */}
      {modalUrl && (
        <div
          className={styles.modalOverlay}
          onClick={closeReport}
          onContextMenu={(e) => e.preventDefault()} // Disable Right Click
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeReport}>
              <X size={24} />
            </button>

            <div className={styles.pdfContainer}>
              {loading && <div className={styles.loader}></div>}

              {isMobile ? (
                // Mobile: Google Viewer (Prevents download)
                <object
                  data={modalUrl}
                  type="application/pdf"
                  className={styles.iframe}
                  onLoad={() => setLoading(false)}
                >
                  <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
                    <p>Preview not available.</p>
                    <a href={modalUrl} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                      Download PDF
                    </a>
                  </div>
                </object>
              ) : (
                // Desktop: Embed with Toolbar Hiding
                <embed
                  src={`${modalUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  type="application/pdf"
                  className={styles.pdfObject}
                  onLoad={() => setLoading(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}