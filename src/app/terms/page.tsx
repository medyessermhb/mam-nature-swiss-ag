'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft } from 'lucide-react';
import styles from '@/styles/Legal.module.css';
import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
  seoTitle: 'General Sales Terms and Conditions | Mam Nature Swiss AG',
  seoDesc: 'Full legal terms and conditions governing the relationship between Mam Nature Swiss AG and its clients.',
  backBtn: 'Return to Homepage',
  title: 'General Sales Terms and Conditions',
  noticeTitle: 'PRIOR NOTICE:',
  noticeText: 'The present general terms and conditions of sale are also available on request in other languages (French, German, Spanish & Italian). In the event of differences in interpretation, the English language will be considered as the reference language. Failing to demand those other languages, the present general conditions of sale in English are considered accepted.',
  company: {
    reg: 'Commercial Register:',
    vat: 'VAT No (CH):',
    eori: 'EORI No:',
    dir: 'Director:',
    support: 'Support:'
  },
  articles: [
    {
      title: 'Article 1: Applicability',
      content: [
        '1.1. Unless expressly agreed otherwise, the acceptance of the purchase order or the payment of the ordered devices or the invoice by the client entails its adherence to the present general terms and conditions.',
        '1.2. These terms and conditions govern the relationship between the seller and the client. Only written modifications signed by both parties, in the purchase order, invoice or any other document, will derogate from these general conditions.',
        '1.3. The conditions of the client\'s order cannot be opposed to the seller.'
      ]
    },
    {
      title: 'Article 2: Prices',
      content: [
        '2.1. The prices communicated for each product on the Mam Nature website (www.mam-nature.com) and on the invoices are in <strong>CHF</strong> (if ordered in Switzerland) or <strong>EUR</strong> (if ordered outside Switzerland). Prices must comply with Swiss & EU tax and excise legislation.',
        'If products from Mam Nature Swiss AG are to be exported, they must comply with local legislation in terms of customs clearance and local taxes. Prices on the website include corresponding VAT (for CH/EU). Transport costs are indicated separately. Installation costs are not included and will be invoiced by the sanitary installer chosen by the client.',
        '2.2. Prices can be changed at any time. Mam Nature Swiss AG can offer its distributors & clients discounts. The order is made by encoding the order form on the website or by e-mail to info@mam-nature.com.',
        '2.3. <strong>VAT Application:</strong>',
        '<ul><li><strong>Private Person (CH/EU):</strong> Net sale price + VAT of delivery address country.</li><li><strong>Professional (EU - Intra-community):</strong> Sale without VAT (Reverse Charge - Art. 39bis), provided a valid EU-VAT-Number is supplied.</li><li><strong>Export (Outside EU):</strong> Net sale price excluding VAT. Exemption according to EU export law. The carrier/customs will invoice import charges + local VAT to the client.</li></ul>',
        '2.4. Transport costs will be communicated prior to payment and invoiced at the best price of the carrier.'
      ]
    },
    {
      title: 'Article 3: Offer & Acceptance',
      content: [
        '3.1. The offer & order generated on the order site is valid for 15 days. Payment implies acceptance of these general conditions.',
        '3.2. Data appearing on illustrations, plans, and leaflets are provided for information only. Pictures are not contractual. The client cannot hold the seller liable for this information.',
        '3.3. In bigger projects, the cost of studies and research shall be borne by the client after approval of estimates.',
        '3.5. Installation is carried out by the client or their subcontractor under their responsibility. Installation costs are borne by the client.'
      ]
    },
    {
      title: 'Article 4: Payment',
      content: [
        '4.1. <strong>Online Orders:</strong>',
        '<ul><li>Encoding of order on webshop.</li><li>Automatic calculation of price including taxes (CH/EU) and transport (EU).</li><li>Validation via online payment.</li><li>Automatic invoice generation sent by email.</li><li>Dispatch within 15 working days. Transport risk depends on the carrier unless insurance is purchased.</li></ul>',
        '4.2. <strong>Email Orders:</strong> Invoicing and delivery follow the same 15-day dispatch timeline upon receipt of payment.'
      ]
    },
    {
      title: 'Article 5: Transfer of Ownership & Risks',
      content: [
        '5.1. Ownership transfers only after full payment.',
        '5.2. Risk transfers to the customer upon delivery.',
        '5.3. <strong>Important:</strong> The client must verify the parcel immediately. To protect rights against the carrier, write on the delivery note: <em>“Accepted subject to hidden transport damages to the goods delivered”</em>.'
      ]
    },
    {
      title: 'Article 6: Delivery Terms',
      content: [
        '6.1. Delivery terms are indicative and never mandatory.',
        '6.3. Mam Nature Swiss AG attempts to group shipments, but separate parcels may arrive at different dates due to logistics.'
      ]
    },
    {
      title: 'Article 7: Modification & Withdrawal',
      content: [
        '7.4. <strong>Right of withdrawal (14 Days):</strong> Clients have a right of withdrawal for 14 calendar days from receipt. To exercise this, email info@mam-nature.com.',
        '<strong>Returns:</strong> The customer must return goods to <strong>Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona</strong> at their own expense within 14 days of notification. Goods must be in original packaging and undamaged.',
        '<strong>Exclusion:</strong> If devices have been unpacked or connected to the sanitary network, the right of withdrawal is lost for hygiene/health reasons.'
      ]
    },
    {
      title: 'Article 8: Guarantee',
      content: [
        '8.1. Complaints regarding external defects must be made within 8 calendar days of receipt.',
        '8.2. <strong>Installation Requirements:</strong> The client must comply with Installation Instructions. A pressure reducer (set to 4-5 bar max) is imperative. Pipes must not be lead. Devices cannot be preceded by a softener.',
        '8.5. <strong>Water Quality:</strong> The customer must ensure water pH > 6.5 and hardness > 15 °f to prevent corrosion, even with 316L stainless steel parts.',
        '8.10. <strong>Transport Damage:</strong> In event of damage, send the following to info@mam-nature.com within 7 days:',
        '<ul><li>Photo of the damage.</li><li>Photos of the entire package (exterior/interior).</li><li>Photo of the carrier\'s barcode.</li></ul>',
        '8.11. <strong>Legal Guarantee:</strong><br />• Metal parts (Water LIME, DYNAMIZER): <strong>10 Years Guarantee.</strong><br />• Non-metal parts (Filters): <strong>2 Years Legal Guarantee.</strong>'
      ]
    },
    {
      title: 'Article 9: Claims',
      content: [
        '9.1. Invoice complaints must be addressed within 8 calendar days.',
        '9.4. <strong>Online Dispute Resolution:</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">European ODR Platform</a>.'
      ]
    },
    {
      title: 'Article 10: Data Confidentiality',
      content: [
        'Mam Nature Swiss AG records client details for order management. We do not sell or lease data to third parties. Clients have the right to access and amend data by emailing info@mam-nature.com.',
        '<strong>Cookies:</strong> Our site uses cookies for navigation and technical management. No banking information is stored online.'
      ]
    },
    {
      title: 'Article 11: Liability',
      content: [
        'Mam Nature Swiss AG cannot be held liable for disruptions inherent to the Internet, stock shortages, or force majeure events. Photographs and graphics are not contractual.'
      ]
    },
    {
      title: 'Article 12: Applicable Law',
      content: [
        '12.1. The relationship is subject to <strong>Swiss Law</strong>.',
        '12.3. Any action falls under the exclusive jurisdiction of the courts of <strong>Jona, Switzerland</strong>.'
      ]
    }
  ]
};

const CONTENT_FR = {
  seoTitle: 'Conditions Générales de Vente | Mam Nature Swiss AG',
  seoDesc: 'Conditions générales complètes régissant la relation entre Mam Nature Swiss AG et ses clients.',
  backBtn: 'Retour à l\'Accueil',
  title: 'Conditions Générales de Vente',
  noticeTitle: 'AVIS PRÉALABLE :',
  noticeText: 'Les présentes conditions générales de vente sont également disponibles sur demande dans d\'autres langues (français, allemand, espagnol et italien). En cas de différences d\'interprétation, la langue anglaise sera considérée comme la langue de référence. À défaut de demander ces autres langues, les présentes conditions générales de vente en anglais sont considérées comme acceptées.',
  company: {
    reg: 'Registre du Commerce :',
    vat: 'N° TVA (CH) :',
    eori: 'N° EORI :',
    dir: 'Directeur :',
    support: 'Support :'
  },
  articles: [
    {
      title: 'Article 1 : Applicabilité',
      content: [
        '1.1. Sauf accord exprès contraire, l\'acceptation du bon de commande ou le paiement des appareils commandés ou de la facture par le client entraîne son adhésion aux présentes conditions générales.',
        '1.2. Ces conditions générales régissent la relation entre le vendeur et le client. Seules des modifications écrites et signées par les deux parties, sur le bon de commande, la facture ou tout autre document, dérogeront à ces conditions générales.',
        '1.3. Les conditions de la commande du client ne peuvent être opposées au vendeur.'
      ]
    },
    {
      title: 'Article 2 : Prix',
      content: [
        '2.1. Les prix communiqués pour chaque produit sur le site web Mam Nature (www.mam-nature.com) et sur les factures sont en <strong>CHF</strong> (si commandé en Suisse) ou <strong>EUR</strong> (si commandé hors Suisse). Les prix doivent être conformes à la législation suisse et européenne sur les impôts et les accises.',
        'Si les produits de Mam Nature Swiss AG doivent être exportés, ils doivent se conformer à la législation locale en matière de dédouanement et de taxes locales. Les prix sur le site web incluent la TVA correspondante (pour la Suisse / l\'UE). Les frais de transport sont indiqués séparément. Les frais d\'installation ne sont pas inclus et seront facturés par l\'installateur sanitaire choisi par le client.',
        '2.2. Les prix peuvent être modifiés à tout moment. Mam Nature Swiss AG peut offrir des remises à ses distributeurs et clients. La commande est effectuée en encodant le formulaire de commande sur le site web ou par e-mail à info@mam-nature.com.',
        '2.3. <strong>Application de la TVA :</strong>',
        '<ul><li><strong>Personne Privée (CH/UE) :</strong> Prix de vente net + TVA du pays d\'adresse de livraison.</li><li><strong>Professionnel (UE - Intracommunautaire) :</strong> Vente sans TVA (Autoliquidation - Art. 39bis), à condition de fournir un numéro de TVA européen valide.</li><li><strong>Exportation (Hors UE) :</strong> Prix de vente net hors TVA. Exonération selon la législation de l\'UE sur l\'exportation. Le transporteur/les douanes factureront les frais d\'importation + la TVA locale au client.</li></ul>',
        '2.4. Les frais de transport seront communiqués avant le paiement et facturés au meilleur prix du transporteur.'
      ]
    },
    {
      title: 'Article 3 : Offre et Acceptation',
      content: [
        '3.1. L\'offre et la commande générées sur le site de commande sont valables pendant 15 jours. Le paiement implique l\'acceptation de ces conditions générales.',
        '3.2. Les données figurant sur les illustrations, les plans et les dépliants sont fournies à titre indicatif uniquement. Les photos ne sont pas contractuelles. Le client ne peut tenir le vendeur responsable de ces informations.',
        '3.3. Dans les projets plus importants, les frais d\'études et de recherche sont à la charge du client après approbation des devis.',
        '3.5. L\'installation est effectuée par le client ou son sous-traitant sous leur responsabilité. Les frais d\'installation sont à la charge du client.'
      ]
    },
    {
      title: 'Article 4 : Paiement',
      content: [
        '4.1. <strong>Commandes en ligne :</strong>',
        '<ul><li>Encodage de la commande sur la boutique en ligne.</li><li>Calcul automatique du prix comprenant les taxes (CH/UE) et le transport (UE).</li><li>Validation via paiement en ligne.</li><li>Génération automatique de facture envoyée par e-mail.</li><li>Expédition dans les 15 jours ouvrables. Le risque de transport dépend du transporteur sauf si une assurance est souscrite.</li></ul>',
        '4.2. <strong>Commandes par e-mail :</strong> La facturation et la livraison suivent le même délai d\'expédition de 15 jours dès réception du paiement.'
      ]
    },
    {
      title: 'Article 5 : Transfert de Propriété et Risques',
      content: [
        '5.1. La propriété n\'est transférée qu\'après paiement complet.',
        '5.2. Les risques sont transférés au client lors de la livraison.',
        '5.3. <strong>Important :</strong> Le client doit vérifier le colis immédiatement. Pour protéger ses droits contre le transporteur, il doit inscrire sur le bon de livraison : <em>"Accepté sous réserve de dommages de transport cachés aux marchandises livrées"</em>.'
      ]
    },
    {
      title: 'Article 6 : Conditions de Livraison',
      content: [
        '6.1. Les délais de livraison sont indicatifs et jamais obligatoires.',
        '6.3. Mam Nature Swiss AG s\'efforce de grouper les expéditions, mais des colis séparés peuvent arriver à des dates différentes pour des raisons logistiques.'
      ]
    },
    {
      title: 'Article 7 : Modification et Rétractation',
      content: [
        '7.4. <strong>Droit de Rétractation (14 Jours) :</strong> Les clients disposent d\'un droit de rétractation de 14 jours civils à compter de la réception. Pour l\'exercer, envoyez un e-mail à info@mam-nature.com.',
        '<strong>Retours :</strong> Le client doit retourner les marchandises à <strong>Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona</strong> à ses propres frais dans les 14 jours suivant la notification. Les marchandises doivent être dans leur emballage d\'origine et non endommagées.',
        '<strong>Exclusion :</strong> Si les appareils ont été déballés ou raccordés au réseau sanitaire, le droit de rétractation est perdu pour des raisons d\'hygiène / de santé.'
      ]
    },
    {
      title: 'Article 8 : Garantie',
      content: [
        '8.1. Les plaintes concernant des défauts externes doivent être formulées dans les 8 jours civils suivant la réception.',
        '8.2. <strong>Exigences d\'Installation :</strong> Le client doit se conformer aux instructions d\'installation. Un réducteur de pression (réglé à 4-5 bars max) est impératif. Les tuyaux ne doivent pas être en plomb. Les appareils ne peuvent pas être précédés d\'un adoucisseur.',
        '8.5. <strong>Qualité de l\'Eau :</strong> Le client doit s\'assurer d\'un pH de l\'eau > 6.5 et d\'une dureté > 15 °f pour prévenir la corrosion, même avec des pièces en acier inoxydable 316L.',
        '8.10. <strong>Dommages de Transport :</strong> En cas de dommage, envoyez ce qui suit à info@mam-nature.com dans les 7 jours :',
        '<ul><li>Photo du dommage.</li><li>Photos de l\'ensemble du colis (extérieur/intérieur).</li><li>Photo du code-barres du transporteur.</li></ul>',
        '8.11. <strong>Garantie Légale :</strong><br />• Pièces métalliques (Water LIME, DYNAMIZER) : <strong>Garantie de 10 ans.</strong><br />• Pièces non métalliques (Filtres) : <strong>Garantie Légale de 2 ans.</strong>'
      ]
    },
    {
      title: 'Article 9 : Réclamations',
      content: [
        '9.1. Les réclamations relatives à la facture doivent être formulées dans les 8 jours civils.',
        '9.4. <strong>Règlement des litiges en ligne :</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">Plateforme européenne de RLL</a>.'
      ]
    },
    {
      title: 'Article 10 : Confidentialité des Données',
      content: [
        'Mam Nature Swiss AG enregistre les détails des clients pour la gestion des commandes. Nous ne vendons ni ne louons de données à des tiers. Les clients ont le droit d\'accéder aux données et de les modifier en envoyant un e-mail à info@mam-nature.com.',
        '<strong>Cookies :</strong> Notre site utilise des cookies pour la navigation et la gestion technique. Aucune information bancaire n\'est stockée en ligne.'
      ]
    },
    {
      title: 'Article 11 : Responsabilité',
      content: [
        'Mam Nature Swiss AG ne peut être tenue responsable des perturbations inhérentes à Internet, des ruptures de stock ou des événements de force majeure. Les photographies et graphiques ne sont pas contractuels.'
      ]
    },
    {
      title: 'Article 12 : Loi Applicable',
      content: [
        '12.1. La relation est soumise au <strong>Droit Suisse</strong>.',
        '12.3. Toute action relève de la compétence exclusive des tribunaux de <strong>Jona, Suisse</strong>.'
      ]
    }
  ]
};

const CONTENT_DE = {
  seoTitle: 'Allgemeine Verkaufsbedingungen | Mam Nature Swiss AG',
  seoDesc: 'Vollständige rechtliche Bedingungen, die die Beziehung zwischen der Mam Nature Swiss AG und ihren Kunden regeln.',
  backBtn: 'Zurück zur Startseite',
  title: 'Allgemeine Verkaufsbedingungen',
  noticeTitle: 'VORHERIGER HINWEIS:',
  noticeText: 'Die vorliegenden allgemeinen Verkaufsbedingungen sind auf Anfrage auch in anderen Sprachen (Französisch, Deutsch, Spanisch & Italienisch) erhältlich. Im Falle von Auslegungsunterschieden gilt die englische Sprache als Referenzsprache. Wenn diese anderen Sprachen nicht angefordert werden, gelten die vorliegenden allgemeinen Verkaufsbedingungen in englischer Sprache als akzeptiert.',
  company: {
    reg: 'Handelsregister:',
    vat: 'MwSt.-Nr. (CH):',
    eori: 'EORI Nr.:',
    dir: 'Direktor:',
    support: 'Support:'
  },
  articles: [
    {
      title: 'Artikel 1: Anwendbarkeit',
      content: [
        '1.1. Sofern nicht ausdrücklich etwas anderes vereinbart wurde, zieht die Annahme der Bestellung oder die Bezahlung der bestellten Geräte oder der Rechnung durch den Kunden dessen Zustimmung zu den vorliegenden allgemeinen Bedingungen nach sich.',
        '1.2. Diese Bedingungen regeln die Beziehung zwischen dem Verkäufer und dem Kunden. Nur schriftliche, von beiden Parteien unterzeichnete Änderungen auf dem Bestellformular, der Rechnung oder einem anderen Dokument stellen eine Abweichung von diesen allgemeinen Bedingungen dar.',
        '1.3. Die Bedingungen der Bestellung des Kunden können dem Verkäufer nicht entgegengehalten werden.'
      ]
    },
    {
      title: 'Artikel 2: Preise',
      content: [
        '2.1. Die für jedes Produkt auf der Website von Mam Nature (www.mam-nature.com) und auf den Rechnungen mitgeteilten Preise verstehen sich in <strong>CHF</strong> (bei Bestellung in die Schweiz) oder <strong>EUR</strong> (bei Bestellung ausserhalb der Schweiz). Die Preise müssen den schweizerischen und europäischen Steuer- und Verbrauchssteuergesetzen entsprechen.',
        'Wenn Produkte der Mam Nature Swiss AG exportiert werden sollen, müssen sie hinsichtlich der Zollabfertigung und lokaler Steuern der lokalen Gesetzgebung entsprechen. Die Preise auf der Website enthalten die entsprechende Mehrwertsteuer (für CH/EU). Die Transportkosten werden gesondert ausgewiesen. Installationskosten sind nicht enthalten und werden von dem vom Kunden gewählten Sanitärinstallateur in Rechnung gestellt.',
        '2.2. Die Preise können jederzeit geändert werden. Die Mam Nature Swiss AG kann ihren Vertriebspartnern und Kunden Rabatte gewähren. Die Bestellung erfolgt durch Eingabe in das Bestellformular auf der Website oder per E-Mail an info@mam-nature.com.',
        '2.3. <strong>Anwendung der Mehrwertsteuer:</strong>',
        '<ul><li><strong>Privatperson (CH/EU):</strong> Nettoverkaufspreis + MwSt. des Lieferlandes.</li><li><strong>Gewerblich (EU - innergemeinschaftlich):</strong> Verkauf ohne MwSt. (Reverse Charge - Art. 39bis), sofern eine gültige EU-MwSt.-Nummer angegeben wird.</li><li><strong>Export (außerhalb EU):</strong> Nettoverkaufspreis ohne MwSt. Steuerbefreiung nach EU-Exportrecht. Der Spediteur/Zoll stellt dem Kunden Einfuhrgebühren + lokale MwSt. in Rechnung.</li></ul>',
        '2.4. Die Transportkosten werden vor der Zahlung mitgeteilt und zum besten Preis des Spediteurs in Rechnung gestellt.'
      ]
    },
    {
      title: 'Artikel 3: Angebot & Annahme',
      content: [
        '3.1. Das auf der Bestellseite generierte Angebot & die Bestellung sind 15 Tage gültig. Die Bezahlung impliziert die Annahme dieser allgemeinen Bedingungen.',
        '3.2. Daten, die auf Abbildungen, Plänen und Broschüren erscheinen, dienen nur zur Information. Fotos sind nicht vertraglich bindend. Der Kunde kann den Verkäufer für diese Informationen nicht haftbar machen.',
        '3.3. Bei größeren Projekten trägt der Kunde die Kosten für Studien und Recherchen nach Genehmigung von Kostenvoranschlägen.',
        '3.5. Die Installation wird vom Kunden oder seinem Subunternehmer unter dessen Verantwortung durchgeführt. Installationskosten trägt der Kunde.'
      ]
    },
    {
      title: 'Artikel 4: Zahlung',
      content: [
        '4.1. <strong>Online-Bestellungen:</strong>',
        '<ul><li>Erfassung der Bestellung im Webshop.</li><li>Automatische Berechnung des Preises inklusive Steuern (CH/EU) und Transport (EU).</li><li>Bestätigung durch Online-Zahlung.</li><li>Automatische Rechnungserstellung per E-Mail.</li><li>Versand innerhalb von 15 Werktagen. Das Transportrisiko hängt vom Spediteur ab, sofern keine Versicherung abgeschlossen wurde.</li></ul>',
        '4.2. <strong>E-Mail-Bestellungen:</strong> Rechnungsstellung und Lieferung folgen demselben Versandzeitraum von 15 Tagen nach Zahlungseingang.'
      ]
    },
    {
      title: 'Artikel 5: Eigentumsübergang & Risiken',
      content: [
        '5.1. Das Eigentum geht erst nach vollständiger Bezahlung über.',
        '5.2. Das Risiko geht mit der Lieferung auf den Kunden über.',
        '5.3. <strong>Wichtig:</strong> Der Kunde muss das Paket sofort überprüfen. Um Rechte gegenüber dem Spediteur zu wahren, vermerken Sie auf dem Lieferschein: <em>"Unter Vorbehalt versteckter Transportschäden an der gelieferten Ware angenommen"</em>.'
      ]
    },
    {
      title: 'Artikel 6: Lieferbedingungen',
      content: [
        '6.1. Lieferfristen sind Richtwerte und niemals bindend.',
        '6.3. Die Mam Nature Swiss AG versucht, Sendungen zu bündeln, aber aus logistischen Gründen können separate Pakete an unterschiedlichen Daten ankommen.'
      ]
    },
    {
      title: 'Artikel 7: Änderung & Widerruf',
      content: [
        '7.4. <strong>Widerrufsrecht (14 Tage):</strong> Kunden haben ab Erhalt ein gesetzliches Widerrufsrecht von 14 Kalendertagen. Um dies auszuüben, senden Sie eine E-Mail an info@mam-nature.com.',
        '<strong>Rücksendungen:</strong> Der Kunde muss die Ware innerhalb von 14 Tagen nach Mitteilung auf eigene Kosten an die <strong>Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona</strong> zurücksenden. Die Ware muss in der Originalverpackung und unbeschädigt sein.',
        '<strong>Ausschluss:</strong> Wenn die Geräte ausgepackt oder an das Sanitärnetz angeschlossen wurden, erlischt das Widerrufsrecht aus Hygiene-/Gesundheitsgründen.'
      ]
    },
    {
      title: 'Artikel 8: Garantie',
      content: [
        '8.1. Reklamationen wegen äußerer Mängel müssen innerhalb von 8 Kalendertagen nach Erhalt erfolgen.',
        '8.2. <strong>Installationsanforderungen:</strong> Der Kunde muss sich an die Installationsanweisungen halten. Ein Druckminderer (eingestellt auf max. 4-5 bar) ist zwingend erforderlich. Rohre dürfen nicht aus Blei sein. Geräten darf kein Wasserenthärter vorgeschaltet sein.',
        '8.5. <strong>Wasserqualität:</strong> Der Kunde muss sicherstellen, dass der Wasser-pH-Wert > 6.5 und die Härte > 15 °f beträgt, um Korrosion zu vermeiden, selbst bei V4A-Edelstahlteilen (316L).',
        '8.10. <strong>Transportschäden:</strong> Im Falle von Schäden senden Sie innerhalb von 7 Tagen Folgendes an info@mam-nature.com:',
        '<ul><li>Foto des Schadens.</li><li>Fotos des gesamten Pakets (außen/innen).</li><li>Foto des Barcodes des Spediteurs.</li></ul>',
        '8.11. <strong>Gesetzliche Garantie:</strong><br />• Metallteile (Water LIME, DYNAMIZER): <strong>10 Jahre Garantie.</strong><br />• Nicht-Metallteile (Filter): <strong>2 Jahre gesetzliche Garantie.</strong>'
      ]
    },
    {
      title: 'Artikel 9: Reklamationen',
      content: [
        '9.1. Rechnungsklamationen müssen innerhalb von 8 Kalendertagen eingereicht werden.',
        '9.4. <strong>Online-Streitbeilegung:</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">Europäische OS-Plattform</a>.'
      ]
    },
    {
      title: 'Artikel 10: Datenvertraulichkeit',
      content: [
        'Die Mam Nature Swiss AG erfasst Kundendaten zur Bestellverwaltung. Wir verkaufen oder vermieten keine Daten an Dritte. Kunden haben das Recht, Daten einzusehen und zu ändern, indem sie eine E-Mail an info@mam-nature.com senden.',
        '<strong>Cookies:</strong> Unsere Website verwendet Cookies für die Navigation und technische Verwaltung. Es werden keine Bankdaten online gespeichert.'
      ]
    },
    {
      title: 'Artikel 11: Haftung',
      content: [
        'Die Mam Nature Swiss AG haftet nicht für internetbedingte Störungen, Lieferengpässe oder Ereignisse höherer Gewalt. Fotografien und Grafiken sind nicht vertraglich bindend.'
      ]
    },
    {
      title: 'Artikel 12: Anwendbares Recht',
      content: [
        '12.1. Die Beziehung unterliegt <strong>Schweizer Recht</strong>.',
        '12.3. Jeder Rechtsstreit fällt in die ausschließliche Zuständigkeit der Gerichte in <strong>Jona, Schweiz</strong>.'
      ]
    }
  ]
};



export default function TermsAndConditions() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mam Nature Swiss AG",
    "alternateName": "Mam Nature",
    "url": "https://www.mam-nature.com/",
    "logo": "/images/website_details/mam-nature_full_logo_website.png",
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
          <Link href="/"><ArrowLeft size={16} /> {content.backBtn}</Link>
        </nav>

        <header className={styles.header}>
          <h1>{content.title}</h1>

          <div className={styles.companyMeta}>
            <div>
              <p><strong>Mam Nature Swiss AG</strong></p>
              <p>Spinnereistr. 16</p>
              <p>CH-8645 Jona / Switzerland</p>
              <div style={{ marginTop: '15px' }}>
                <p><strong>{content.company.reg}</strong> CHE-268.127.531</p>
                <p><strong>{content.company.vat}</strong> CHE-268.127.531</p>
                <p><strong>{content.company.eori}</strong> DE854131970745997</p>
              </div>
            </div>
            <div>
              <p><strong>{content.company.dir}</strong> Christof Braun</p>
              <p><strong>Email:</strong> <a href="mailto:c.braun@mam-nature.com">c.braun@mam-nature.com</a></p>
              <p><strong>{content.company.support}</strong> <a href="mailto:info@mam-nature.com">info@mam-nature.com</a></p>
            </div>
          </div>

          <div className={styles.noticeBox}>
            <strong>{content.noticeTitle}</strong> {content.noticeText}
          </div>
        </header>

        <main className={styles.mainContent}>
          {content.articles.map((article, index) => (
            <article key={index}>
              <h2>{article.title}</h2>
              {article.content.map((pText, pIdx) => (
                <p key={pIdx} dangerouslySetInnerHTML={{ __html: pText }}></p>
              ))}
            </article>
          ))}
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Mam Nature Swiss AG. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}