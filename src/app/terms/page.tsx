import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft } from 'lucide-react';
import styles from '@/styles/Legal.module.css';

export const metadata = {
  title: 'General Sales Terms and Conditions | Mam Nature Swiss AG',
  description: 'Full legal terms and conditions governing the relationship between Mam Nature Swiss AG and its clients.',
};

export default function TermsAndConditions() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mam Nature Swiss AG",
    "alternateName": "Mam Nature",
    "url": "https://www.mam-nature.com/",
    "logo": "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo%20website.png",
    "email": "info@mam-nature.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Spinnereistr. 16",
      "addressLocality": "Jona",
      "postalCode": "8645",
      "addressCountry": "CH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "info@mam-nature.com"
    }
  };

  return (
    <div className={styles.pageBg}>
      <Script
        id="legal-org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.legalContainer}>
        <nav className={styles.backNav}>
          <Link href="/"><ArrowLeft size={16} /> Return to Homepage</Link>
        </nav>

        <header className={styles.header}>
          <h1>General Sales Terms and Conditions</h1>
          
          <div className={styles.companyMeta}>
            <div>
              <p><strong>Mam Nature Swiss AG</strong></p>
              <p>Spinnereistr. 16</p>
              <p>CH-8645 Jona / Switzerland</p>
              <div style={{ marginTop: '15px' }}>
                <p><strong>Commercial Register:</strong> CHE-268.127.531</p>
                <p><strong>VAT No (CH):</strong> CHE-268.127.531</p>
                <p><strong>EORI No:</strong> DE854131970745997</p>
              </div>
            </div>
            <div>
              <p><strong>Director:</strong> Christof Braun</p>
              <p><strong>Email:</strong> <a href="mailto:c.braun@mam-nature.com">c.braun@mam-nature.com</a></p>
              <p><strong>Support:</strong> <a href="mailto:info@mam-nature.com">info@mam-nature.com</a></p>
            </div>
          </div>

          <div className={styles.noticeBox}>
            <strong>PRIOR NOTICE:</strong> The present general terms and conditions of sale are also available on request in other languages (French, German, Spanish & Italian). In the event of differences in interpretation, the English language will be considered as the reference language. Failing to demand those other languages, the present general conditions of sale in English are considered accepted.
          </div>
        </header>

        <main className={styles.mainContent}>
          <article>
            <h2>Article 1: Applicability</h2>
            <p>1.1. Unless expressly agreed otherwise, the acceptance of the purchase order or the payment of the ordered devices or the invoice by the client entails its adherence to the present general terms and conditions.</p>
            <p>1.2. These terms and conditions govern the relationship between the seller and the client. Only written modifications signed by both parties, in the purchase order, invoice or any other document, will derogate from these general conditions.</p>
            <p>1.3. The conditions of the client&apos;s order cannot be opposed to the seller.</p>
          </article>

          <article>
            <h2>Article 2: Prices</h2>
            <p>2.1. The prices communicated for each product on the Mam Nature website (www.mam-nature.com) and on the invoices are in <strong>CHF</strong> (if ordered in Switzerland) or <strong>EUR</strong> (if ordered outside Switzerland). Prices must comply with Swiss &amp; EU tax and excise legislation.</p>
            <p>If products from Mam Nature Swiss AG are to be exported, they must comply with local legislation in terms of customs clearance and local taxes. Prices on the website include corresponding VAT (for CH/EU). Transport costs are indicated separately. Installation costs are not included and will be invoiced by the sanitary installer chosen by the client.</p>
            <p>2.2. Prices can be changed at any time. Mam Nature Swiss AG can offer its distributors &amp; clients discounts. The order is made by encoding the order form on the website or by e-mail to info@mam-nature.com.</p>
            <p>2.3. <strong>VAT Application:</strong></p>
            <ul>
              <li><strong>Private Person (CH/EU):</strong> Net sale price + VAT of delivery address country.</li>
              <li><strong>Professional (EU - Intra-community):</strong> Sale without VAT (Reverse Charge - Art. 39bis), provided a valid EU-VAT-Number is supplied.</li>
              <li><strong>Export (Outside EU):</strong> Net sale price excluding VAT. Exemption according to EU export law. The carrier/customs will invoice import charges + local VAT to the client.</li>
            </ul>
            <p>2.4. Transport costs will be communicated prior to payment and invoiced at the best price of the carrier.</p>
          </article>

          <article>
            <h2>Article 3: Offer &amp; Acceptance</h2>
            <p>3.1. The offer &amp; order generated on the order site is valid for 15 days. Payment implies acceptance of these general conditions.</p>
            <p>3.2. Data appearing on illustrations, plans, and leaflets are provided for information only. Pictures are not contractual. The client cannot hold the seller liable for this information.</p>
            <p>3.3. In bigger projects, the cost of studies and research shall be borne by the client after approval of estimates.</p>
            <p>3.5. Installation is carried out by the client or their subcontractor under their responsibility. Installation costs are borne by the client.</p>
          </article>

          <article>
            <h2>Article 4: Payment</h2>
            <p>4.1. <strong>Online Orders:</strong></p>
            <ul>
              <li>Encoding of order on webshop.</li>
              <li>Automatic calculation of price including taxes (CH/EU) and transport (EU).</li>
              <li>Validation via online payment.</li>
              <li>Automatic invoice generation sent by email.</li>
              <li>Dispatch within 15 working days. Transport risk depends on the carrier unless insurance is purchased.</li>
            </ul>
            <p>4.2. <strong>Email Orders:</strong> Invoicing and delivery follow the same 15-day dispatch timeline upon receipt of payment.</p>
          </article>

          <article>
            <h2>Article 5: Transfer of Ownership &amp; Risks</h2>
            <p>5.1. Ownership transfers only after full payment.</p>
            <p>5.2. Risk transfers to the customer upon delivery.</p>
            <p>5.3. <strong>Important:</strong> The client must verify the parcel immediately. To protect rights against the carrier, write on the delivery note: <em>“Accepted subject to hidden transport damages to the goods delivered”</em>.</p>
          </article>

          <article>
            <h2>Article 6: Delivery Terms</h2>
            <p>6.1. Delivery terms are indicative and never mandatory.</p>
            <p>6.3. Mam Nature Swiss AG attempts to group shipments, but separate parcels may arrive at different dates due to logistics.</p>
          </article>

          <article>
            <h2>Article 7: Modification &amp; Withdrawal</h2>
            <p>7.4. <strong>Right of withdrawal (14 Days):</strong> Clients have a right of withdrawal for 14 calendar days from receipt. To exercise this, email info@mam-nature.com.</p>
            <p><strong>Returns:</strong> The customer must return goods to <strong>Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona</strong> at their own expense within 14 days of notification. Goods must be in original packaging and undamaged.</p>
            <p><strong>Exclusion:</strong> If devices have been unpacked or connected to the sanitary network, the right of withdrawal is lost for hygiene/health reasons.</p>
          </article>

          <article>
            <h2>Article 8: Guarantee</h2>
            <p>8.1. Complaints regarding external defects must be made within 8 calendar days of receipt.</p>
            <p>8.2. <strong>Installation Requirements:</strong> The client must comply with Installation Instructions. A pressure reducer (set to 4-5 bar max) is imperative. Pipes must not be lead. Devices cannot be preceded by a softener.</p>
            <p>8.5. <strong>Water Quality:</strong> The customer must ensure water pH &gt; 6.5 and hardness &gt; 15 °f to prevent corrosion, even with 316L stainless steel parts.</p>
            <p>8.10. <strong>Transport Damage:</strong> In event of damage, send the following to info@mam-nature.com within 7 days:</p>
            <ul>
              <li>Photo of the damage.</li>
              <li>Photos of the entire package (exterior/interior).</li>
              <li>Photo of the carrier&apos;s barcode.</li>
            </ul>
            <p>8.11. <strong>Legal Guarantee:</strong>
                <br />• Metal parts (Water LIME, DYNAMIZER): <strong>10 Years Guarantee.</strong>
                <br />• Non-metal parts (Filters): <strong>2 Years Legal Guarantee.</strong>
            </p>
          </article>

          <article>
            <h2>Article 9: Claims</h2>
            <p>9.1. Invoice complaints must be addressed within 8 calendar days.</p>
            <p>9.4. <strong>Online Dispute Resolution:</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">European ODR Platform</a>.</p>
          </article>

          <article>
            <h2>Article 10: Data Confidentiality</h2>
            <p>Mam Nature Swiss AG records client details for order management. We do not sell or lease data to third parties. Clients have the right to access and amend data by emailing info@mam-nature.com.</p>
            <p><strong>Cookies:</strong> Our site uses cookies for navigation and technical management. No banking information is stored online.</p>
          </article>

          <article>
            <h2>Article 11: Liability</h2>
            <p>Mam Nature Swiss AG cannot be held liable for disruptions inherent to the Internet, stock shortages, or force majeure events. Photographs and graphics are not contractual.</p>
          </article>

          <article>
            <h2>Article 12: Applicable Law</h2>
            <p>12.1. The relationship is subject to <strong>Swiss Law</strong>.</p>
            <p>12.3. Any action falls under the exclusive jurisdiction of the courts of <strong>Jona, Switzerland</strong>.</p>
          </article>
        </main>
        
        <footer className={styles.footer}>
          <p>© 2026 Mam Nature Swiss AG. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}