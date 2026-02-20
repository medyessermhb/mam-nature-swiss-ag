'use client';

import React from 'react';
import styles from '@/styles/Policy.module.css';
import { Lock, Eye } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
  title: 'Data Privacy',
  info: {
    title: 'Your Information',
    desc: 'Mam Nature Swiss AG records client details strictly for order management. We do not sell or lease your data to third parties.'
  },
  cookies: {
    title: 'Cookies & Navigation',
    desc: 'We use cookies for technical site management and navigation. No banking information is stored online.'
  },
  contact: 'For data access or amendments, contact <strong>info@mam-nature.com</strong>.'
};

const CONTENT_FR = {
  title: 'Confidentialité des Données',
  info: {
    title: 'Vos Informations',
    desc: 'Mam Nature Swiss AG enregistre les détails des clients strictement pour la gestion des commandes. Nous ne vendons ni ne louons vos données à des tiers.'
  },
  cookies: {
    title: 'Cookies & Navigation',
    desc: 'Nous utilisons des cookies pour la gestion technique du site et la navigation. Aucune information bancaire n\'est stockée en ligne.'
  },
  contact: 'Pour l\'accès aux données ou les modifications, contactez <strong>info@mam-nature.com</strong>.'
};

const CONTENT_DE = {
  title: 'Datenschutz',
  info: {
    title: 'Ihre Informationen',
    desc: 'Die Mam Nature Swiss AG erfasst Kundendaten ausschließlich zur Bestellverwaltung. Wir verkaufen oder vermieten Ihre Daten nicht an Dritte.'
  },
  cookies: {
    title: 'Cookies & Navigation',
    desc: 'Wir verwenden Cookies für die technische Verwaltung der Website und die Navigation. Es werden keine Bankdaten online gespeichert.'
  },
  contact: 'Für Datenzugriff oder Änderungen kontaktieren Sie <strong>info@mam-nature.com</strong>.'
};

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  return (
    <div className={styles.container}>
      <h1>{content.title}</h1>
      <section className={styles.section}>
        <div className={styles.iconHeader}><Lock /> <h2>{content.info.title}</h2></div>
        <p>{content.info.desc}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.iconHeader}><Eye /> <h2>{content.cookies.title}</h2></div>
        <p>{content.cookies.desc}</p>
      </section>

      <p dangerouslySetInnerHTML={{ __html: content.contact }}></p>
    </div>
  );
}