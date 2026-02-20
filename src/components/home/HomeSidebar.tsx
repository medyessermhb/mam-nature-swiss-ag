'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '@/styles/HomeSidebar.module.css';
import { useLanguage } from '@/context/LanguageContext';

const LINKS_EN = [
  { id: 'comparison', label: 'Perfect System' },
  { id: 'water-lime', label: 'Cartridge' },
  { id: 'dynamizer', label: 'Dynamiser' },
  { id: 'shower', label: 'Water Lime' },
  { id: 'particles-filter', label: 'Particles Filter' },
  { id: 'products', label: 'Products' },
];

const LINKS_FR = [
  { id: 'comparison', label: 'Système Parfait' },
  { id: 'water-lime', label: 'Cartouche' },
  { id: 'dynamizer', label: 'Dynamiseur' },
  { id: 'shower', label: 'Water Lime' },
  { id: 'particles-filter', label: 'Filtre Particules' },
  { id: 'products', label: 'Produits' },
];

const LINKS_DE = [
  { id: 'comparison', label: 'Perfektes System' },
  { id: 'water-lime', label: 'Kartusche' },
  { id: 'dynamizer', label: 'Dynamisierer' },
  { id: 'shower', label: 'Wasser Lime' },
  { id: 'particles-filter', label: 'Partikelfilter' },
  { id: 'products', label: 'Produkte' },
];

const LINKS_ES = [
  { id: 'comparison', label: 'Sistema Perfecto' },
  { id: 'water-lime', label: 'Cartucho' },
  { id: 'dynamizer', label: 'Dinamizador' },
  { id: 'shower', label: 'Water Lime' },
  { id: 'particles-filter', label: 'Filtro Partículas' },
  { id: 'products', label: 'Productos' },
];

export default function HomeSidebar() {
  const { language } = useLanguage();
  const LINKS = language === 'fr' ? LINKS_FR : language === 'de' ? LINKS_DE : language === 'es' ? LINKS_ES : LINKS_EN;

  const [activeId, setActiveId] = useState('');
  const [status, setStatus] = useState<'hidden' | 'fixed' | 'absolute'>('hidden');
  const [absoluteTop, setAbsoluteTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Check if we're on client and get mobile status
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 1. SELECTORS
      const hero = document.getElementById('hero-section');
      // Try to find footer by ID first, then tag
      const footer = document.getElementById('footer') || document.querySelector('footer');
      const navbarHeight = 90; // Your top navbar height
      const isMobile = window.innerWidth <= 1024;

      if (!hero || !footer || !sidebarRef.current) return;

      // 2. DIMENSIONS
      const heroBottom = hero.getBoundingClientRect().bottom; // Distance from top of viewport
      const footerTop = footer.getBoundingClientRect().top;   // Distance from top of viewport
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // 3. LOGIC

      // On mobile: show sidebar only AFTER hero section scrolls past
      if (isMobile) {
        // Mobile: Show sidebar when hero is scrolled past
        if (heroBottom <= navbarHeight) {
          // Hero scrolled past - show the sidebar
          setStatus('fixed');
        } else {
          // Hero still visible - hide the sidebar
          setStatus('hidden');
        }
        return;
      }

      // Desktop logic (original)
      // A. HIDE: If Hero is still visible (hero bottom is below navbar)
      if (heroBottom > navbarHeight) {
        setStatus('hidden');
        return;
      }

      // B. STOP (ABSOLUTE): If Footer hits the Sidebar
      // Sidebar is now FULL HEIGHT (windowHeight)
      // const sidebarHeight = windowHeight; // Removed duplicate
      const buffer = 0; // Stop just before footer

      if (footerTop < windowHeight + buffer) {
        setStatus('absolute');
        // Stop Position: The top of the sidebar should be positioned such that its bottom aligns with footer top
        // Top = FooterOffsetTop - WindowHeight - Buffer
        const stopPosition = footer.offsetTop - windowHeight - buffer;
        setAbsoluteTop(stopPosition);
      }
      // C. SHOW (FIXED): Default state between Hero and Footer
      else {
        setStatus('fixed');
      }
    };

    // --- INTERSECTION OBSERVER FOR HIGHLIGHTING ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    LINKS_EN.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Recalculate on resize
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Auto-scroll horizontal nav on mobile when active changes
  useEffect(() => {
    if (!navRef.current || !activeId) return;

    const isMobile = window.innerWidth <= 1024;
    if (!isMobile) return;

    // Find the active link element
    const activeLink = navRef.current.querySelector(
      `a[href="#${activeId}"]`
    ) as HTMLElement;

    if (activeLink && navRef.current) {
      // Scroll the active link into view horizontally with smooth behavior
      activeLink.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeId]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Only apply positioning styles after client-side hydration
  const containerStyle: React.CSSProperties = !isClient
    ? {} // Server-side and initial render: no positioning
    : isMobile
      ? {} // Mobile: let CSS handle sticky positioning
      : {
        top: status === 'absolute' ? `${absoluteTop}px` : '50%',
        position: status === 'absolute' ? 'absolute' : 'fixed',
      };

  return (
    <div
      ref={sidebarRef}
      className={`${styles.sidebarContainer} ${status !== 'hidden' ? styles.visible : ''}`}
      style={containerStyle}
    >
      <nav className={styles.nav} ref={navRef}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => scrollToSection(e, link.id)}
            className={`${styles.link} ${activeId === link.id ? styles.active : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}