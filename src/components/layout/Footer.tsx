'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  tagline: "Pure, healthy and revitalized water throughout the house, for your health.",
  headers: {
    company: "Company",
    solutions: "Solutions",
    support: "Support"
  },
  links: {
    home: "Home",
    solutions: "Solutions",
    shop: "Shop",
    contact: "Contact Factory",
    complete: "Complete System",
    lime: "Water LIME",
    particle: "Particles Filter",
    fine: "Fine Filter",
    dynamizer: "Dynamizer",
    hydrogen: "Hydrogen Booster",
    faq: "FAQ",
    guide: "Installation Guide",
    warranty: "Warranty"
  },
  legal: {
    rights: "All rights reserved.",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    shipping: "Shipping Policy",
    returns: "Returns & Guarantee"
  }
};

const CONTENT_FR = {
  tagline: "Une eau pure, saine et revitalisée dans toute la maison, pour votre santé.",
  headers: {
    company: "Entreprise",
    solutions: "Solutions",
    support: "Support"
  },
  links: {
    home: "Accueil",
    solutions: "Solutions",
    shop: "Boutique",
    contact: "Contacter l'usine",
    complete: "Système Complet",
    lime: "Water LIME",
    particle: "Filtre à Particules",
    fine: "Filtre Fin",
    dynamizer: "Dynamiseur",
    hydrogen: "Booster Hydrogène",
    faq: "FAQ",
    guide: "Guide d'installation",
    warranty: "Garantie"
  },
  legal: {
    rights: "Tous droits réservés.",
    terms: "Conditions Générales",
    privacy: "Politique de Confidentialité",
    shipping: "Politique de Livraison",
    returns: "Retours & Garantie"
  }
};

export default function Footer() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  return (
    <footer className="footer-container">
      <div className="footer-grid">
        
        {/* LOGO COLUMN */}
        <div className="footer-col-logo">
          <Link href="/" className="footer-logo-link">
            <img loading="lazy" src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo%20website.png" alt="Mam Nature Swiss AG" className="footer-logo" />
          </Link>
          <p className="footer-tagline">
            {content.tagline}
          </p>
          <div className="footer-social-list">
            <a href="#" className="footer-social-link" aria-label="Instagram Mam Nature"><Instagram size={18} /></a>
            <a href="https://www.instagram.com/mam_nature_hydrogen/" className="footer-social-link" aria-label="Instagram Mam Nature Hydrogen"><Instagram size={18} /></a>
          </div>
        </div>
        
        {/* COMPANY LINKS */}
        <div className="footer-col">
          <h3>{content.headers.company}</h3>
          <div className="footer-link-list">
            <Link href="/" className="footer-link">{content.links.home}</Link>
            <Link href="/solutions" className="footer-link">{content.links.solutions}</Link>
            <Link href="/shop" className="footer-link">{content.links.shop}</Link>
            <Link href="/contact" className="footer-link">{content.links.contact}</Link>
          </div>
        </div>

        {/* SOLUTIONS LINKS */}
        <div className="footer-col">
          <h3>{content.headers.solutions}</h3>
          <div className="footer-link-list">
            <Link href="/shop/complete-set-plus" className="footer-link">{content.links.complete}</Link>
            <Link href="/shop/water-lime" className="footer-link">{content.links.lime}</Link>
            <Link href="/shop/particles-filter" className="footer-link">{content.links.particle}</Link>
            <Link href="/shop/fine-filter" className="footer-link">{content.links.fine}</Link>
            <Link href="/shop/the-swiss-water-dynamizer" className="footer-link">{content.links.dynamizer}</Link>
            <Link href="/shop/hydrogen-booster" className="footer-link">{content.links.hydrogen}</Link>
          </div>
        </div>

        {/* SUPPORT & LEGAL */}
        <div className="footer-col">
          <h3>{content.headers.support}</h3>
          <div className="footer-link-list">
            <Link href="/shipping-policy" className="footer-link">{content.legal.shipping}</Link>
            <Link href="/returns" className="footer-link">{content.legal.returns}</Link>
            <Link href="/privacy-policy" className="footer-link">{content.legal.privacy}</Link>
            <Link href="/terms" className="footer-link">{content.legal.terms}</Link>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom-bar" style={{borderTop: '1px solid #e2e8f0', marginTop: '40px', paddingTop: '20px'}}>
        <div className="footer-copyright" style={{fontSize: '0.85rem', color: '#64748b'}}>
          © 2026 Mam Nature Swiss AG. {content.legal.rights}
        </div>
      </div>
    </footer>
  );
}