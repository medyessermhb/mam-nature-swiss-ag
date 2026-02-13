'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCT_PRICES, Region } from '@/lib/prices';

interface PricingContextType {
  region: Region;
  currency: string; // <--- Added this
  getPrice: (slug: string) => string;
  isLoading: boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>('Europe'); // Default
  const [isLoading, setIsLoading] = useState(true);

  // Derive currency code from region
  const currency = region === 'Morocco' ? 'MAD' : region === 'Switzerland' ? 'CHF' : 'EUR';

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://ipinfo.io?token=83b16d0d538156`);
        const data = await response.json();
        const country = data.country || "FR";

        if (country === "MA") {
          setRegion("Morocco");
        } else if (country === "CH") {
          setRegion("Switzerland");
        } else {
          setRegion("Europe");
        }
      } catch (error) {
        console.error("Failed to fetch location, defaulting to Europe:", error);
        setRegion("Europe");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Helper function to get formatted price string
  const getPrice = (slug: string) => {
    const cleanSlug = slug.replace(/^\/product\//, '').replace(/^\//, '');
    const productKey = Object.keys(PRODUCT_PRICES).find(key => key === cleanSlug);
    
    if (productKey && PRODUCT_PRICES[productKey]) {
      return PRODUCT_PRICES[productKey][region];
    }
    return "Price Unavailable";
  };

  return (
    <PricingContext.Provider value={{ 
      region,
      currency, // <--- Now accessible globally
      getPrice, 
      isLoading 
    }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}