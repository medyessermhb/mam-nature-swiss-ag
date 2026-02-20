'use client';

import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Kept for reference, though API handles it now
import styles from '@/styles/Contact.module.css';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  subLabel: "Connect",
  title: "Get in Touch",
  subtitle: "We’re here to help with your water filtration needs.",

  form: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    topicLabel: "Select a Topic",
    topicPlaceholder: "Choose one...",
    topics: {
      general: "General request",
      product: "Product request",
      service: "Service request"
    },
    message: "Message",
    btnSubmit: "Send Message",
    btnSending: "Sending...",
    success: "Thank you! Your message has been sent successfully.",
    error: "Something went wrong. Please try again later."
  },

  info: {
    emailTitle: "Email",
    emailText: "Contact us anytime for support or inquiries.",
    factoryTitle: "Factory",
    factoryText: "Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona / Switzerland",
    directions: "Get Directions"
  }
};

const CONTENT_FR = {
  subLabel: "Contact",
  title: "Contactez-nous",
  subtitle: "Nous sommes là pour répondre à vos besoins en filtration d'eau.",

  form: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse Email",
    phone: "Numéro de téléphone",
    topicLabel: "Sélectionnez un sujet",
    topicPlaceholder: "Choisissez une option...",
    topics: {
      general: "Demande générale",
      product: "Demande sur un produit",
      service: "Demande de service / SAV"
    },
    message: "Message",
    btnSubmit: "Envoyer le message",
    btnSending: "Envoi en cours...",
    success: "Merci ! Votre message a été envoyé avec succès.",
    error: "Une erreur s'est produite. Veuillez réessayer plus tard."
  },

  info: {
    emailTitle: "Email",
    emailText: "Contactez-nous à tout moment pour toute question.",
    factoryTitle: "Usine",
    factoryText: "Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona / Suisse",
    directions: "Obtenir l'itinéraire"
  }
};

const CONTENT_DE = {
  subLabel: "Kontakt",
  title: "Kontaktieren Sie uns",
  subtitle: "Wir sind hier, um Ihnen bei Ihren Wasserfiltrationsbedürfnissen zu helfen.",

  form: {
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    topicLabel: "Thema wählen",
    topicPlaceholder: "Bitte auswählen...",
    topics: {
      general: "Allgemeine Anfrage",
      product: "Produktanfrage",
      service: "Serviceanfrage"
    },
    message: "Nachricht",
    btnSubmit: "Nachricht senden",
    btnSending: "Wird gesendet...",
    success: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
    error: "Etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal."
  },

  info: {
    emailTitle: "E-Mail",
    emailText: "Kontaktieren Sie uns jederzeit für Support oder Anfragen.",
    factoryTitle: "Fabrik",
    factoryText: "Mam Nature Swiss AG, Spinnereistr. 16, CH-8645 Jona / Schweiz",
    directions: "Wegbeschreibung"
  }
};

export default function ContactPage() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Call API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to send message');

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', topic: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.headerSection}>
          <span className={styles.subLabel}>{content.subLabel}</span>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </div>

        <div className={styles.grid}>

          {/* LEFT: FORM */}
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.form.firstName}</label>
                  <input
                    type="text" name="firstName" required
                    className={styles.input}
                    value={formData.firstName} onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.form.lastName}</label>
                  <input
                    type="text" name="lastName" required
                    className={styles.input}
                    value={formData.lastName} onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.form.email}</label>
                  <input
                    type="email" name="email" required
                    className={styles.input}
                    value={formData.email} onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.form.phone}</label>
                  <input
                    type="tel" name="phone"
                    className={styles.input}
                    value={formData.phone} onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{content.form.topicLabel}</label>
                <select
                  name="topic" className={styles.select} required
                  value={formData.topic} onChange={handleChange}
                >
                  <option value="" disabled>{content.form.topicPlaceholder}</option>
                  <option value="General request">{content.form.topics.general}</option>
                  <option value="Product request">{content.form.topics.product}</option>
                  <option value="Service request">{content.form.topics.service}</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{content.form.message}</label>
                <textarea
                  name="message" required
                  className={styles.textarea}
                  value={formData.message} onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                {status === 'submitting' ? content.form.btnSending : content.form.btnSubmit}
              </button>

              {status === 'success' && (
                <div className={styles.successMessage}>
                  <CheckCircle size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                  {content.form.success}
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                  {content.form.error}
                </div>
              )}
            </form>
          </div>

          {/* RIGHT: INFO */}
          <div className={styles.infoColumn}>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <h3 className={styles.infoTitle}>{content.info.emailTitle}</h3>
              <p className={styles.infoText}>{content.info.emailText}</p>
              <a href="mailto:info@mam-nature.com" className={styles.infoLink}>info@mam-nature.com</a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <MapPin size={24} />
              </div>
              <h3 className={styles.infoTitle}>{content.info.factoryTitle}</h3>
              <p className={styles.infoText}>
                {isFrench ? (
                  <>Mam Nature Swiss AG,<br />Spinnereistr. 16, CH-8645 Jona / Suisse</>
                ) : isGerman ? (
                  <>Mam Nature Swiss AG,<br />Spinnereistr. 16, CH-8645 Jona / Schweiz</>
                ) : (
                  <>Mam Nature Swiss AG,<br />Spinnereistr. 16, CH-8645 Jona / Switzerland</>
                )}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Mam+Nature+Swiss+AG+Spinnereistr+16+CH-8645+Jona"
                target="_blank" rel="noopener noreferrer"
                className={styles.directionBtn}
              >
                {content.info.directions} <ArrowRight size={16} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}