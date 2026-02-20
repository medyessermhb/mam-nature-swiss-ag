'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, ChevronDown, User } from 'lucide-react'; // <--- Added User Icon
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase'; // <--- Import Supabase to check auth

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangSwitcherOpen, setIsLangSwitcherOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // <--- State for User

  const { language, setLanguage, t } = useLanguage();
  const { toggleCart, cartCount } = useCart();

  // Check Auth Status on Mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const langLabels: Record<string, string> = {
    en: "🇺🇸 English",
    fr: "🇫🇷 Français",
    de: "🇩🇪 Deutsch",
  };

  const handleLangChange = (lang: string) => {
    if (lang === 'ma') {
      setLanguage('fr');
    } else if (lang === 'en' || lang === 'fr' || lang === 'de') {
      setLanguage(lang as 'en' | 'fr' | 'de');
    } else {
      setLanguage('en');
    }
    setIsLangSwitcherOpen(false);
  };

  return (
    <div className="navbar2_container-2">
      {/* LEFT: Toggle + Logo + ISO */}
      <div className="nav-left-group">
        <button
          className="mobile-menu-toggle"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className="navbar2_logo-link" aria-label="home">
          <img loading="lazy" src="/images/website_details/mam-nature_full_logo.svg" alt="Mam Nature" className="navbar2_logo-2" />
        </Link>

        <Link href="/rapports-certifications" className="iso-container">
          <img loading="lazy" src="https://cdn.prod.website-files.com/6772955ff9646840f29d1d3d/69047fc369c29116f3447f3c_ISO-13485-2016.svg" alt="ISO Certification" className="image-8" />
          <span className="iso-text">ISO 13485<br />Medical Devices<br />Quality Management</span>
        </Link>
      </div>

      {/* CENTER: Links (Desktop) */}
      <nav role="navigation" className="navbar2_menu-2">
        <Link href="/" className="navbar2_link-2">{t.nav.home}</Link>
        <Link href="/rapports-certifications" className="navbar2_link-2">{t.nav.reports}</Link>

        <div className="navbar2_menu-dropdown">
          <div className="navbar2_dropdwn-toggle-2">
            <Link href="/solutions" className="link-10">{t.nav.solutions}</Link>
            <div className="dropdown-chevron">
              <ChevronDown size={12} />
            </div>
          </div>
          <nav className="navbar2_dropdown-list-2">
            <Link href="/solutions/mam-nature-complete-system" className="navbar2_dropdown-link-2">Complete System</Link>
            <Link href="/solutions/water-lime" className="navbar2_dropdown-link-2">Water Lime</Link>
            <Link href="/solutions/particle-filter" className="navbar2_dropdown-link-2">Water Particle Filter</Link>
            <Link href="/solutions/fine-filter" className="navbar2_dropdown-link-2">Water Fine Filter</Link>
            <Link href="/solutions/dynamizer" className="navbar2_dropdown-link-2">The Swiss Water Dynamizer</Link>
          </nav>
        </div>

        <Link href="/shop/hydrogen-booster" className="navbar2_link-2" dangerouslySetInnerHTML={{ __html: t.nav.hydrogen_booster.replace(' ', '<br/>') }}></Link>
        <Link href="/shop" className="navbar2_link-2">{t.nav.shop}</Link>
        <Link href="/contact-us" className="navbar2_link-2">{t.nav.contact}</Link>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          {/* Mobile Account Button */}
          <Link href={user ? "/dashboard" : "/login"} className="mobile-link" style={{ color: '#0f172a', fontWeight: 700, margin: 0, padding: 0, border: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
            <User size={18} style={{ marginRight: '8px' }} />
            {user ? (language === 'fr' ? 'Tableau de bord' : 'Dashboard') : (language === 'fr' ? 'Se Connecter' : 'Login')}
          </Link>

          {/* Mobile Language Switcher - Short Labels */}
          <div className="mobile-lang-buttons">
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => handleLangChange('en')}
              title="English"
            >
              🇺🇸 EN
            </button>
            <button
              className={language === 'fr' ? 'active' : ''}
              onClick={() => handleLangChange('fr')}
              title="Français"
            >
              🇫🇷 FR
            </button>
            <button
              className={language === 'de' ? 'active' : ''}
              onClick={() => handleLangChange('de')}
              title="Deutsch"
            >
              🇩🇪 DE
            </button>
          </div>
        </div>

        <Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.home}</Link>
        <Link href="/rapports-certifications" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.reports}</Link>

        <Link href="/solutions" className="mobile-link" style={{ color: '#1a1a1a', background: '#f8fafc', fontWeight: 700 }} onClick={() => setIsMobileMenuOpen(false)}>{t.nav.solutions}</Link>

        <Link href="/solutions/mam-nature-complete-system" className="mobile-link sub-link" onClick={() => setIsMobileMenuOpen(false)}>Complete System</Link>
        <Link href="/solutions/water-lime" className="mobile-link sub-link" onClick={() => setIsMobileMenuOpen(false)}>Water Lime</Link>
        <Link href="/solutions/particle-filter" className="mobile-link sub-link" onClick={() => setIsMobileMenuOpen(false)}>Particle Filter</Link>
        <Link href="/solutions/fine-filter" className="mobile-link sub-link" onClick={() => setIsMobileMenuOpen(false)}>Fine Filter</Link>
        <Link href="/solutions/dynamizer" className="mobile-link sub-link" onClick={() => setIsMobileMenuOpen(false)}>Water Dynamizer</Link>

        <Link href="/shop/hydrogen-booster" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.hydrogen_booster}</Link>
        <Link href="/shop" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.shop}</Link>
        <Link href="/contact-us" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</Link>
      </div>

      {/* RIGHT: Actions */}
      <div className="nav-right-group">

        {/* Language Switcher - Desktop Only */}
        <div id="nav-lang-switcher-wrapper" className="desktop-only">
          <div id="nav-lang-switcher-btn" onClick={() => setIsLangSwitcherOpen(!isLangSwitcherOpen)}>
            <span>{langLabels[language] || "🇺🇸 English"}</span>
          </div>
          <div id="nav-lang-switcher-popup" style={{ display: isLangSwitcherOpen ? 'block' : 'none' }}>
            <div style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Choose Language</div>
            {Object.entries(langLabels).map(([code, label]) => (
              <button key={code} className="nav-lang-option-btn" onClick={() => handleLangChange(code)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Account Button - Desktop Only */}
        <Link href={user ? "/dashboard" : "/login"} className="cart-button-2 desktop-only" style={{ marginRight: '10px' }} aria-label="Account">
          <User size={18} />
        </Link>

        {/* Cart Button */}
        <button className="cart-button-2" onClick={toggleCart}>
          <ShoppingBag size={18} />
          <div className="text-block-41">{t.nav.cart}</div>
          <div className="w-commerce-commercecartopenlinkcount">{cartCount}</div>
        </button>
      </div>
    </div>
  );
}