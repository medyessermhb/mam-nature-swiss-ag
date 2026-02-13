import React from 'react';
import styles from '@/styles/Policy.module.css';
import { RotateCcw, ShieldCheck, XOctagon } from 'lucide-react';

export default function ReturnsPolicy() {
  return (
    <div className={styles.container}>
      <h1>Returns & Withdrawal</h1>
      <section className={styles.section}>
        <div className={styles.iconHeader}><ShieldCheck /> <h2>14-Day Right</h2></div>
        <p>You have 14 calendar days from receipt to withdraw from your purchase. Notify us at <strong>info@mam-nature.com</strong> and return the goods in original, undamaged packaging.</p>
      </section>

      <section className={styles.errorBox}>
        <div className={styles.iconHeader}><XOctagon /> <h2>Hygiene Exclusion</h2></div>
        <p>For health and hygiene protection, the right of withdrawal is lost if the devices have been unpacked or connected to the sanitary network.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.iconHeader}><RotateCcw /> <h2>Guarantees</h2></div>
        <p>Metal parts (Water LIME, Dynamizer) carry a 10-year guarantee. Filters and non-metal parts have a 2-year guarantee.</p>
        <p><strong>Note:</strong> Installation must include a pressure reducer set to max 4-5 bar.</p>
      </section>
    </div>
  );
}