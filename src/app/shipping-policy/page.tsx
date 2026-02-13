import React from 'react';
import styles from '@/styles/Policy.module.css';
import { Truck, AlertTriangle, Globe } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className={styles.container}>
      <h1>Shipping & Delivery</h1>
      <section className={styles.section}>
        <div className={styles.iconHeader}><Truck /> <h2>Dispatch Timeline</h2></div>
        <p>Orders are dispatched within 15 working days following receipt of payment. Delivery dates are indicative and not mandatory.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.iconHeader}><Globe /> <h2>International & Morocco</h2></div>
        <p>Exports outside the EU are net of VAT. Local customs clearance, taxes, and import charges are invoiced directly to the client by the carrier.</p>
        <p>For Morocco, transport costs are communicated prior to payment to ensure the best carrier price.</p>
      </section>

      <section className={styles.warningBox}>
        <div className={styles.iconHeader}><AlertTriangle /> <h2>Mandatory Verification</h2></div>
        <p>Verify your parcel immediately upon arrival. To protect your rights against the carrier, you must write <strong>“Accepted subject to hidden transport damages to the goods delivered”</strong> on the delivery note.</p>
      </section>
    </div>
  );
}