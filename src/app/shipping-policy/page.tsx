'use client';

import React from 'react';
import styles from '@/styles/Policy.module.css';
import { Truck, AlertTriangle, Globe } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
  title: 'Shipping & Delivery',
  dispatch: {
    title: 'Dispatch Timeline',
    desc: 'Orders are dispatched within 15 working days following receipt of payment. Delivery dates are indicative and not mandatory.'
  },
  international: {
    title: 'International & Morocco',
    desc1: 'Exports outside the EU are net of VAT. Local customs clearance, taxes, and import charges are invoiced directly to the client by the carrier.',
    desc2: 'For Morocco, transport costs are communicated prior to payment to ensure the best carrier price.'
  },
  verification: {
    title: 'Mandatory Verification',
    desc: 'Verify your parcel immediately upon arrival. To protect your rights against the carrier, you must write <strong>“Accepted subject to hidden transport damages to the goods delivered”</strong> on the delivery note.'
  }
};

const CONTENT_FR = {
  title: 'Expédition & Livraison',
  dispatch: {
    title: 'Délai d\'expédition',
    desc: 'Les commandes sont expédiées dans les 15 jours ouvrables suivant la réception du paiement. Les dates de livraison sont indicatives et non obligatoires.'
  },
  international: {
    title: 'International & Maroc',
    desc1: 'Les exportations hors UE sont exemptées de TVA. Le dédouanement local, les taxes et les frais d\'importation sont facturés directement au client par le transporteur.',
    desc2: 'Pour le Maroc, les frais de transport sont communiqués avant le paiement pour garantir le meilleur prix du transporteur.'
  },
  verification: {
    title: 'Vérification Obligatoire',
    desc: 'Vérifiez votre colis immédiatement à l\'arrivée. Pour protéger vos droits contre le transporteur, vous devez écrire <strong>"Accepté sous réserve de dommages de transport cachés aux marchandises livrées"</strong> sur le bon de livraison.'
  }
};

const CONTENT_DE = {
  title: 'Versand & Lieferung',
  dispatch: {
    title: 'Versandzeitpunkt',
    desc: 'Bestellungen werden innerhalb von 15 Werktagen nach Zahlungseingang versandt. Liefertermine sind unverbindlich und nicht bindend.'
  },
  international: {
    title: 'International & Marokko',
    desc1: 'Exporte außerhalb der EU verstehen sich exklusive Mehrwertsteuer. Lokale Zollabfertigung, Steuern und Einfuhrgebühren werden dem Kunden direkt vom Spediteur in Rechnung gestellt.',
    desc2: 'Für Marokko werden die Transportkosten vor der Zahlung mitgeteilt, um den besten Spediteurpreis zu gewährleisten.'
  },
  verification: {
    title: 'Obligatorische Überprüfung',
    desc: 'Überprüfen Sie Ihr Paket sofort nach der Ankunft. Um Ihre Rechte gegenüber dem Spediteur zu wahren, müssen Sie <strong>"Unter Vorbehalt versteckter Transportschäden an der gelieferten Ware angenommen"</strong> auf dem Lieferschein vermerken.'
  }
};

export default function ShippingPolicy() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  return (
    <div className={styles.container}>
      <h1>{content.title}</h1>
      <section className={styles.section}>
        <div className={styles.iconHeader}><Truck /> <h2>{content.dispatch.title}</h2></div>
        <p>{content.dispatch.desc}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.iconHeader}><Globe /> <h2>{content.international.title}</h2></div>
        <p>{content.international.desc1}</p>
        <p>{content.international.desc2}</p>
      </section>

      <section className={styles.warningBox}>
        <div className={styles.iconHeader}><AlertTriangle /> <h2>{content.verification.title}</h2></div>
        <p dangerouslySetInnerHTML={{ __html: content.verification.desc }}></p>
      </section>
    </div>
  );
}