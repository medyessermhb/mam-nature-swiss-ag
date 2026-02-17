'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/CartSidebar.module.css';
import { X, Minus, Plus, Trash2, ArrowRight, Tag, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePricing } from '@/context/PricingContext'; // Import usePricing

// --- CONTENT DEFINITION ---
const CONTENT_EN = {
  title: "Your Cart",
  empty: "Your cart is empty.",
  total: "Total",
  subtotal: "Subtotal", // Added
  checkout: "Proceed to Checkout",
  viewCart: "View Cart",
  promoTitle: "Exclusive Cart Offer"
};

const CONTENT_FR = {
  title: "Votre Panier",
  empty: "Votre panier est vide.",
  total: "Total",
  subtotal: "Sous-total", // Added
  checkout: "Procéder au paiement",
  viewCart: "Voir le panier",
  promoTitle: "Offre Exclusive"
};

export default function CartSidebar() {
  // Added addToCart here so we can add the promo items
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal, cartCount, addToCart } = useCart();
  const { language } = useLanguage();

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  const handleViewCart = () => {
    toggleCart();
    window.location.href = '/cart';
  };

  const handleProceedToCheckout = () => {
    toggleCart();
    window.location.href = '/checkout';
  };

  // Safe currency check
  const rawCurrency = cart[0]?.currency || 'EUR';
  const isMad = rawCurrency === 'Dhs' || rawCurrency === 'MAD';
  const isChf = rawCurrency === 'CHF';
  const currencySymbol = isMad ? 'Dhs' : isChf ? 'CHF' : '€';

  // Helper to determine active region based on currency if not explicitly available
  // But ideally we should use the 'region' from usePricing context to be sure, 
  // however cart might have items from a previous session.
  // Best to infer VAT rate from the currency/region context.

  // Get region from PricingContext
  const { region } = usePricing();

  // VAT RATES
  // CH: 8.1% (Included)
  // MA: 20% (Included)
  // EU: 19% (Included)
  // ROW: 0% (Export) -> If currency is EUR but region is ROW.

  let taxRate = 0;
  let taxLabel = "0%";

  if (isMad) {
    taxRate = 0.20;
    taxLabel = "20%"; // Morocco
  } else if (isChf) {
    taxRate = 0.081;
    taxLabel = "8.1%"; // Switzerland
  } else {
    // EUR
    if (region === 'RestOfWorld') {
      taxRate = 0;
      taxLabel = "0% (Export)";
    } else {
      taxRate = 0.19;
      taxLabel = "19%";
    }
  }

  // Calculate VAT amount (inclusive)
  const vatAmount = cartTotal - (cartTotal / (1 + taxRate));

  // ==========================================
  // CROSS-SELL LOGIC
  // ==========================================
  const hasEssential = cart.some(item => item.id === 'mam-nature-essential-set');
  const hasEssentialPlus = cart.some(item => item.id === 'mam-nature-essential-plus');

  // Check if promos are ALREADY in the cart
  const hasPromo1 = cart.some(item => item.id === 'promo-particle-lime-set');
  const hasPromo2 = cart.some(item => item.id === 'promo-water-lime');

  let offer: any = null;

  // 1. Offer for Essential Set (Upgrades them to Eco Set total)
  if (hasEssential && !hasPromo1) {
    // Exact Math: Eco Set (12299 MAD / 1070 CHF / 1150 EUR) - Essential (8580 MAD / 760 CHF / 820 EUR)
    const promoPrice = isMad ? 3719 : isChf ? 310 : 330;
    const originalPrice = isMad ? 4750 : isChf ? 428 : 452; // (Standard combined price)

    offer = {
      id: 'promo-particle-lime-set',
      name: isFrench ? 'Filtre à Particules + Water LIME' : 'Particle Filter + Water LIME',
      desc: isFrench
        ? `Complétez votre installation pour seulement ${promoPrice} ${currencySymbol} (au lieu de ${originalPrice} ${currencySymbol}) !`
        : `Complete your setup for only ${currencySymbol} ${promoPrice} (instead of ${currencySymbol} ${originalPrice})!`,
      price: promoPrice,
      image: '/images/WEBSITE-P/products/particle_+_water_lime.webp'
    };
  }
  // 2. Offer for Essential Plus Set (Upgrades them to Eco Set total)
  else if (hasEssentialPlus && !hasPromo2) {
    // Exact Math: Eco Set (12299 MAD / 1070 CHF / 1150 EUR) - Essential Plus (10250 MAD / 910 CHF / 980 EUR)
    const promoPrice = isMad ? 2049 : isChf ? 160 : 170;
    const originalPrice = isMad ? 2270 : isChf ? 210 : 217; // (Water Lime standard price)

    offer = {
      id: 'promo-water-lime',
      name: isFrench ? 'Filtre Water LIME' : 'Water LIME Filter',
      desc: isFrench
        ? `Ajoutez la protection anti-calcaire pour seulement ${promoPrice} ${currencySymbol} (au lieu de ${originalPrice} ${currencySymbol}) !`
        : `Add anti-limescale protection for only ${currencySymbol} ${promoPrice} (instead of ${currencySymbol} ${originalPrice})!`,
      price: promoPrice,
      image: '/images/WEBSITE-P/products/water_lime_vertical.webp'
    };
  }

  const handleAcceptOffer = () => {
    if (offer) {
      addToCart({
        id: offer.id,
        name: offer.name,
        price: offer.price,
        currency: rawCurrency,
        image: offer.image
      });
    }
  };

  return (
    <>
      <div className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`} onClick={toggleCart} />
      <div className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>

        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>{content.title} ({cartCount})</h2>
          <button className={styles.closeBtn} onClick={toggleCart}><X size={24} /></button>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>{content.empty}</div>
          ) : (
            <>
              {/* CART ITEMS */}
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <div className={styles.itemPrice}>{currencySymbol} {item.price.toLocaleString()}</div>
                    <div className={styles.quantityControls}>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}

              {/* CROSS-SELL OFFER BANNER */}
              {offer && (
                <div style={{
                  marginTop: '20px', padding: '15px', background: '#fffbeb',
                  border: '1px dashed #f59e0b', borderRadius: '8px',
                  display: 'flex', flexDirection: 'column', gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <Tag size={16} /> <span>{content.promoTitle}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={offer.image} alt={offer.name} style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'white', borderRadius: '6px', border: '1px solid #fcd34d' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1e293b' }}>{offer.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>{offer.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleAcceptOffer}
                    style={{
                      width: '100%', padding: '10px', background: '#f59e0b', color: 'white',
                      border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                  >
                    <PlusCircle size={18} /> {isFrench ? 'Ajouter à la commande' : 'Add to Order'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className={styles.footer} style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>

            {/* Summary Details */}
            <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

              {/* Subtotal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#444' }}>
                <span>{content.subtotal}</span>
                <span style={{ fontWeight: 500 }}>{currencySymbol} {cartTotal.toLocaleString()}</span>
              </div>

              {/* VAT Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8' }}>
                <span>{isFrench ? `Dont TVA (${taxLabel})` : `Includes VAT (${taxLabel})`}</span>
                <span>{currencySymbol} {vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '12px 0' }} />

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              <span>{content.total}</span>
              <span>{currencySymbol} {cartTotal.toLocaleString()}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'grid', gap: '12px' }}>
              <button className={styles.checkoutBtn} onClick={handleProceedToCheckout}>
                {content.checkout} <ArrowRight size={18} />
              </button>
              <button className={styles.viewCartBtn} onClick={handleViewCart}>
                {content.viewCart}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}