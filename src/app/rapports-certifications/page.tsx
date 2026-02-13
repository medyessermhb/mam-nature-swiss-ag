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
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/The%20Swiss%20Water%20Cartridge_Retention%20Rates_Certificated%20ETH%20Zurich.pdf"
    },
    {
      title: "Swiss Safety System Certificate",
      desc: "Verifies the structural integrity and safety of our system housing under high pressure.",
      icon: ShieldCheck,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf"
    },
    {
      title: "ISO Certificate",
      desc: "Confirms our adherence to international standards for quality management systems.",
      icon: Award,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/ISO.pdf"
    },
    {
      title: "H2 Booster Certificate",
      desc: "Official CE-Certificate for our advanced Hydrogen Booster technology.",
      icon: Atom,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Mam%20Nature%20Swiss%20Hydrogen%20Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf"
    },
    {
      title: "H2 Conformity Assessment",
      desc: "Official assessment confirming regulatory compliance for the Hydrogen Booster.",
      icon: ClipboardCheck,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Mam%20Nature%20Swiss%20Hydrogen%20Booster_CE-Conformity%20Assessment_2025-005-CR-01_signed.pdf"
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
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/The%20Swiss%20Water%20Cartridge_Retention%20Rates_Certificated%20ETH%20Zurich.pdf"
    },
    {
      title: "Certificat Swiss Safety System",
      desc: "Vérifie l'intégrité structurelle et la sécurité de notre système sous haute pression.",
      icon: ShieldCheck,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure%20Test_MNS-CS.pdf"
    },
    {
      title: "Certificat ISO",
      desc: "Confirme notre adhésion aux normes internationales pour les systèmes de management de la qualité.",
      icon: Award,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/ISO.pdf"
    },
    {
      title: "Certificat H2 Booster",
      desc: "Certificat CE officiel pour notre technologie avancée de Hydrogen Booster.",
      icon: Atom,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Mam%20Nature%20Swiss%20Hydrogen%20Booster_CE-Certificate_2025-005-DOC_sign_2025.04.29.pdf"
    },
    {
      title: "Évaluation de Conformité H2",
      desc: "Évaluation officielle confirmant la conformité réglementaire du Hydrogen Booster.",
      icon: ClipboardCheck,
      url: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/certificates/Mam%20Nature%20Swiss%20Hydrogen%20Booster_CE-Conformity%20Assessment_2025-005-CR-01_signed.pdf"
    }
  ]
};

export default function ReportsPage() {
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

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
                 <iframe 
                   src={`https://docs.google.com/gview?url=${encodeURIComponent(modalUrl)}&embedded=true`} 
                   className={styles.iframe}
                   onLoad={() => setLoading(false)}
                 />
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