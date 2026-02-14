'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRICES, Region } from '@/data/prices';
import { supabase } from '@/lib/supabase';
import { EU_COUNTRIES } from '@/lib/euCountries';

interface PricingContextType {
  region: Region;
  currency: string;
  getPrice: (slug: string) => string;
  getRawPrice: (slug: string) => number;
  isLoading: boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>('Europe'); // Default
  const [isLoading, setIsLoading] = useState(true);

  // Local state for prices, initialized with static data as fallback
  const [prices, setPrices] = useState<Record<string, Record<Region, number>>>(PRICES);

  // Derive currency code from region
  const currency = region === 'Morocco' ? 'MAD' : region === 'Switzerland' ? 'CHF' : 'EUR';

  useEffect(() => {
    // 1. Fetch User Location
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://ipinfo.io?token=83b16d0d538156`);
        const data = await response.json();
        const country = data.country || "FR";

        if (country === "MA") {
          setRegion("Morocco");
        } else if (country === "CH") {
          setRegion("Switzerland");
        } else if (EU_COUNTRIES.includes(country)) {
          setRegion("Europe");
        } else {
          setRegion("RestOfWorld");
        }
      } catch (error) {
        console.error("Failed to fetch location, defaulting to RestOfWorld:", error);
        setRegion("RestOfWorld");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();

    // 2. Fetch Prices from Supabase (product_prices table)
    const fetchPrices = async () => {
      try {
        const { data, error } = await supabase
          .from('product_prices')
          .select('*');

        if (error) {
          console.error('Error fetching prices from Supabase:', error);
          return;
        }

        if (data && data.length > 0) {
          // Transform array back to record object
          const newPrices: Record<string, Record<Region, number>> = { ...PRICES };

          data.forEach((product: any) => {
            // Map Supabase columns to our Region structure
            if (product.id) {
              const priceEU = Number(product.price_eu);

              newPrices[product.id] = {
                Morocco: Number(product.price_ma),
                Switzerland: Number(product.price_ch),
                Europe: priceEU,
                // Calculate RestOfWorld dynamic price if not present in DB
                RestOfWorld: Number((priceEU / 1.19).toFixed(2))
              };
            }
          });

          setPrices(newPrices);
          console.log('Prices updated from Supabase');
        }
      } catch (err) {
        console.error('Unexpected error fetching prices:', err);
      }
    };

    fetchPrices();
  }, []);

  // Format price helper
  const formatPrice = (price: number, region: Region) => {
    // Use en-US for comma separators (e.g. 1,000.00)
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(price);

    switch (region) {
      case 'Morocco':
        return `${formattedNumber} Dhs`;
      case 'Switzerland':
        return `CHF ${formattedNumber}`;
      case 'Europe':
        return `€ ${formattedNumber} EUR`;
      case 'RestOfWorld':
        return `€ ${formattedNumber} EUR`;
      default:
        return `€ ${formattedNumber} EUR`;
    }
  };

  // Helper function to get formatted price string
  const getPrice = (slug: string) => {
    const cleanSlug = slug.replace(/^\/product\//, '').replace(/^\//, '');
    let productKey = Object.keys(prices).find(key => key === cleanSlug);

    if (!productKey && prices[cleanSlug]) {
      productKey = cleanSlug;
    }

    if (productKey && prices[productKey]) {
      return formatPrice(prices[productKey][region], region);
    }
    return "Price Unavailable";
  };

  // Helper function to get raw numeric price
  const getRawPrice = (slug: string): number => {
    const cleanSlug = slug.replace(/^\/product\//, '').replace(/^\//, '');
    let productKey = Object.keys(prices).find(key => key === cleanSlug);

    if (!productKey && prices[cleanSlug]) {
      productKey = cleanSlug;
    }

    if (productKey && prices[productKey]) {
      return prices[productKey][region];
    }
    return 0;
  };

  return (
    <PricingContext.Provider value={{
      region,
      currency,
      getPrice,
      getRawPrice,
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