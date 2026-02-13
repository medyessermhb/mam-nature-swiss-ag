import React from 'react';
import styles from '@/styles/Policy.module.css';
import { Lock, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1>Data Privacy</h1>
      <section className={styles.section}>
        <div className={styles.iconHeader}><Lock /> <h2>Your Information</h2></div>
        <p>Mam Nature Swiss AG records client details strictly for order management. We do not sell or lease your data to third parties.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.iconHeader}><Eye /> <h2>Cookies & Navigation</h2></div>
        <p>We use cookies for technical site management and navigation. No banking information is stored online.</p>
      </section>

      <p>For data access or amendments, contact <strong>info@mam-nature.com</strong>.</p>
    </div>
  );
}