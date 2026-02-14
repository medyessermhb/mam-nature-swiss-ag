'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePricing } from './PricingContext'; // Import usePricing

// Define the shape of a Cart Item
export interface CartItem {
  id: string;        // Product Slug or ID
  name: string;
  price: number;     // Numeric price (e.g., 220)
  currency: string;  // 'EUR', 'CHF', 'MAD'
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
  addToCartWithDynamicPrice?: (id: string, name: string, image: string) => void; // Optional helper
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get dynamic pricing info
  const { getRawPrice, currency, region, isLoading: isPricingLoading } = usePricing();

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mam-nature-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('mam-nature-cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // --- NEW: SYNC CART PRICES WITH LIVE DATA ---
  useEffect(() => {
    if (!isInitialized || isPricingLoading) return;

    setCart(prevCart => {
      let hasChanges = false;
      const currentCurrencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

      const newCart = prevCart.map(item => {
        const livePrice = getRawPrice(item.id);

        // If we found a valid price and it differs from cart, OR currency differs
        // NOTE: We only update if livePrice > 0 to avoid setting 0 if data missing
        if (livePrice > 0 && (item.price !== livePrice || item.currency !== currentCurrencyCode)) {
          hasChanges = true;
          return {
            ...item,
            price: livePrice,
            currency: currentCurrencyCode
          };
        }
        return item;
      });

      return hasChanges ? newCart : prevCart;
    });
  }, [isInitialized, isPricingLoading, currency, getRawPrice]); // Re-run when pricing info changes

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true); // Open sidebar on add
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};