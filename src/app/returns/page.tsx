"use client";

import React from 'react';
import styles from '@/styles/Policy.module.css';
import { RotateCcw, ShieldCheck, XOctagon } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
  title: 'Returns & Withdrawal',
  right: {
    title: '14-Day Right',
    desc: 'You have 14 calendar days from receipt to withdraw from your purchase. Notify us at <strong>info@mam-nature.com</strong> and return the goods in original, undamaged packaging.'
  },
  exclusion: {
    title: 'Hygiene Exclusion',
    desc: 'For health and hygiene protection, the right of withdrawal is lost if the devices have been unpacked or connected to the sanitary network.'
  },
  guarantees: {
    title: 'Guarantees',
    desc1: 'Metal parts (Water LIME, Dynamizer) carry a 10-year guarantee. Filters and non-metal parts have a 2-year guarantee.',
    desc2: '<strong>Note:</strong> Installation must include a pressure reducer set to max 4-5 bar.'
  }
};

const CONTENT_FR = {
  title: 'Retours & Rétractation',
  right: {
    title: 'Droit de 14 Jours',
    desc: 'Vous disposez de 14 jours civils à compter de la réception pour vous rétracter de votre achat. Informez-nous à <strong>info@mam-nature.com</strong> et retournez les marchandises dans leur emballage d\'origine non endommagé.'
  },
  exclusion: {
    title: 'Exclusion pour Hygiène',
    desc: 'Pour la protection de la santé et de l\'hygiène, le droit de rétractation est perdu si les appareils ont été déballés ou connectés au réseau sanitaire.'
  },
  guarantees: {
    title: 'Garanties',
    desc1: 'Les parties métalliques (Water LIME, Dynamizer) bénéficient d\'une garantie de 10 ans. Les filtres et les pièces non métalliques ont une garantie de 2 ans.',
    desc2: '<strong>Remarque :</strong> L\'installation doit inclure un réducteur de pression réglé à 4-5 bars maximum.'
  }
};

const CONTENT_DE = {
  title: 'Rücksendungen & Widerruf',
  right: {
    title: '14-Tage-Recht',
    desc: 'Sie haben ab Erhalt 14 Kalendertage Zeit, vom Kaufvertrag zurückzutreten. Benachrichtigen Sie uns unter <strong>info@mam-nature.com</strong> und senden Sie die Ware in der unbeschädigten Originalverpackung zurück.'
  },
  exclusion: {
    title: 'Ausschluss aus Hygienegründen',
    desc: 'Aus Gesundheits- und Hygienegründen erlischt das Widerrufsrecht, wenn die Geräte ausgepackt oder an das Sanitärnetz angeschlossen wurden.'
  },
  guarantees: {
    title: 'Garantien',
    desc1: 'Metallteile (Water LIME, Dynamizer) haben eine 10-Jahres-Garantie. Filter und Nicht-Metallteile haben eine 2-Jahres-Garantie.',
    desc2: '<strong>Hinweis:</strong> Bei der Installation muss ein Druckminderer auf max. 4-5 bar eingestellt sein.'
  }
};

export default function ReturnsPolicy() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  return (
    <div className={styles.container}>
      <h1>{content.title}</h1>
      <section className={styles.section}>
        <div className={styles.iconHeader}><ShieldCheck /> <h2>{content.right.title}</h2></div>
        <p dangerouslySetInnerHTML={{ __html: content.right.desc }}></p>
      </section>

      <section className={styles.errorBox}>
        <div className={styles.iconHeader}><XOctagon /> <h2>{content.exclusion.title}</h2></div>
        <p>{content.exclusion.desc}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.iconHeader}><RotateCcw /> <h2>{content.guarantees.title}</h2></div>
        <p>{content.guarantees.desc1}</p>
        <p dangerouslySetInnerHTML={{ __html: content.guarantees.desc2 }}></p>
      </section>
    </div>
  );
}