'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type Language = 'en' | 'fr' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en']; // Helper to get current translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage on mount or auto-detect based on location
  useEffect(() => {
    const saved = localStorage.getItem('mam-nature-lang') as Language;
    if (saved) {
      setLanguage(saved);
      return;
    }

    const fetchLocationForLanguage = async () => {
      try {
        const response = await fetch(`https://ipinfo.io?token=83b16d0d538156`);
        const data = await response.json();
        const country = data.country || "FR";

        const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR'];
        const germanCountries = ['DE', 'AT', 'CH', 'LI'];
        const frenchCountries = ['FR', 'BE', 'LU', 'MC', 'MA', 'DZ', 'TN', 'SN', 'CI', 'CM', 'CD', 'CG', 'MG', 'ML', 'NE', 'BF', 'GN', 'TD', 'BI', 'BJ', 'CF', 'TG', 'GA', 'DJ', 'KM', 'HT'];

        if (spanishCountries.includes(country)) {
          setLanguage('es');
        } else if (germanCountries.includes(country)) {
          setLanguage('de');
        } else if (frenchCountries.includes(country)) {
          setLanguage('fr');
        } else {
          setLanguage('en'); // Default for everywhere else
        }
      } catch (error) {
        console.error("Failed to fetch location for language:", error);
      }
    };

    fetchLocationForLanguage();
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('mam-nature-lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}