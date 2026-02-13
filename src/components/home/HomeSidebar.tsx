'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '@/styles/HomeSidebar.module.css';

const LINKS = [
  { id: 'comparison', label: 'Perfect System' },
  { id: 'water-lime', label: 'Cartridge' },
  { id: 'dynamizer', label: 'Dynamiser' },
  { id: 'shower', label: 'Water Lime' },
  { id: 'particles-filter', label: 'Particles Filter' },
  { id: 'products', label: 'Products' },
];

export default function HomeSidebar() {
  const [activeId, setActiveId] = useState('');
  const [status, setStatus] = useState<'hidden' | 'fixed' | 'absolute'>('hidden');
  const [absoluteTop, setAbsoluteTop] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. SELECTORS
      const hero = document.getElementById('hero-section');
      // Try to find footer by ID first, then tag
      const footer = document.getElementById('footer') || document.querySelector('footer'); 
      const navbarHeight = 80; // Your top navbar height
      
      if (!hero || !footer || !sidebarRef.current) return;

      // 2. DIMENSIONS
      const heroBottom = hero.getBoundingClientRect().bottom; // Distance from top of viewport
      const footerTop = footer.getBoundingClientRect().top;   // Distance from top of viewport
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // 3. LOGIC

      // A. HIDE: If Hero is still visible (hero bottom is below navbar)
      if (heroBottom > navbarHeight) {
        setStatus('hidden');
        return;
      }

      // B. STOP (ABSOLUTE): If Footer hits the Sidebar
      // We check if the Footer's top edge is moving up past where the sidebar ends
      // Sidebar Bottom Edge = Navbar Height + Sidebar Height + Some Buffer (50px)
      const sidebarBottomEdge = navbarHeight + sidebarHeight + 50;

      if (footerTop < sidebarBottomEdge) {
        setStatus('absolute');
        // Calculate where to freeze it relative to the document
        // Footer Offset Top - Sidebar Height - Buffer
        const stopPosition = footer.offsetTop - sidebarHeight - 50; 
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

    LINKS.forEach(link => {
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

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const containerStyle: React.CSSProperties = {
    top: status === 'absolute' ? `${absoluteTop}px` : '100px', // 100px = Navbar + padding
    position: status === 'absolute' ? 'absolute' : 'fixed',
    // If hidden, we don't display none, just hide opacity via CSS class, 
    // but ensure pointer events are off
  };

  return (
    <div 
      ref={sidebarRef}
      className={`${styles.sidebarContainer} ${status !== 'hidden' ? styles.visible : ''}`}
      style={containerStyle}
    >
      <nav className={styles.nav}>
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