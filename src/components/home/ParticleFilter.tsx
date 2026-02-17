'use client';

import React from 'react';
import { CheckCircle, Infinity as InfinityIcon, Wrench } from 'lucide-react';
import styles from './ParticleFilter.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  headline: "Mam Nature Swiss « Water PARTICLE FILTER »",
  subheadline: "Particle filter with automatic backwash, pressure regulator, and 360° connector.",
  description: "Compact & fully integrated solution made from medical-grade materials (316L stainless steel).",
  capacity: "Capacity: unlimited",
  maintenanceTitle: "Maintenance: none",
  maintenanceDesc: "Fully automated solution."
};

const CONTENT_FR = {
  headline: "Mam Nature Swiss « Water PARTICLE FILTER »",
  subheadline: "Filtre à particules avec retro-lavage automatique, régulateur de pression et orientation à 360°.",
  description: "Solution compacte et entièrement intégrée, matériaux de qualité médicale (parties métalliques en acier inoxydable 316L).",
  capacity: "Capacité : illimitée",
  maintenanceTitle: "Zéro Entretien",
  maintenanceDesc: "Solution totalement automatisée."
};

export default function ParticleFilter() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Left Column: Image */}
          <div className={styles.imageBlock} data-aos="fade-up">
            <img
              src="/images/products/PARTICLE FILTER/PARTICLE FILTER NO BACKWASH Aqmos AQ1 Particle Filter 1.webp"
              alt="Mam Nature Swiss Water Particles Filter"
              loading="lazy"
            />
          </div>

          {/* Right Column: Text */}
          <div className={styles.textBlock} data-aos="fade-up" data-aos-delay="100">
            <h2 className={styles.headline}>
              {content.headline}
            </h2>
            <p className={styles.subheadline}>
              {content.subheadline}
            </p>

            <div className={styles.description}>
              <CheckCircle className={styles.descriptionIcon} />
              <p style={{ margin: 0 }}>
                {content.description}
              </p>
            </div>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <InfinityIcon className={styles.featureIcon} />
                <strong>{content.capacity}</strong>
              </div>
              <div className={styles.featureCard}>
                <Wrench className={styles.featureIcon} />
                <strong>{content.maintenanceTitle}</strong>
                <p>{content.maintenanceDesc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}