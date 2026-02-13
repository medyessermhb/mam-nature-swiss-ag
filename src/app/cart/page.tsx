'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/CartPage.module.css';
import { Minus, Plus, Trash2, ArrowRight, Tag, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// --- CONTENT DEFINITION ---
const CONTENT_EN = {
  title: "Shopping Cart",
  empty: "Your cart is currently empty.",
  continue: "Continue Shopping",
  summaryTitle: "Order Summary",
  subtotal: "Subtotal",
  shipping: "Shipping",
  shippingCalc: "Calculated at checkout",
  total: "Total",
  checkout: "Proceed to Checkout",
  promoTitle: "Exclusive Cart Offer"
};

const CONTENT_FR = {
  title: "Panier d'achat",
  empty: "Votre panier est actuellement vide.",
  continue: "Continuer vos achats",
  summaryTitle: "Résumé de la commande",
  subtotal: "Sous-total",
  shipping: "Expédition",
  shippingCalc: "Calculé à la caisse",
  total: "Total",
  checkout: "Procéder au paiement",
  promoTitle: "Offre Exclusive"
};

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  
  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : CONTENT_EN;

  // Route to your custom Checkout page instead of direct Stripe redirect
  const handleCheckout = () => {
    setLoading(true);
    window.location.href = '/checkout'; 
  };

  const rawCurrency = cart[0]?.currency || 'EUR';
  const isMad = rawCurrency === 'Dhs' || rawCurrency === 'MAD';
  const isChf = rawCurrency === 'CHF';
  const currencySymbol = isMad ? 'Dhs' : isChf ? 'CHF' : '€';

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
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLE%20FILTER.png'
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
      image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/FINE%20FILTER.png'
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
    <div className={styles.container}>
      <h1 className={styles.title}>{content.title}</h1>
      
      <div className={styles.cartGrid}>
        {/* Left: Items */}
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.itemPrice}>{currencySymbol} {item.price.toLocaleString()}</div>
              </div>
              <div className={styles.controls}>
                <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                <span style={{width: '30px', textAlign: 'center', fontWeight: '600'}}>{item.quantity}</span>
                <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}

          {/* CROSS-SELL OFFER BANNER */}
          {offer && (
            <div style={{
              marginTop: '20px', padding: '20px', background: '#fffbeb', 
              border: '1px dashed #f59e0b', borderRadius: '12px', 
              display: 'flex', flexDirection: 'column', gap: '15px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: 'bold', fontSize: '1rem' }}>
                <Tag size={18} /> <span>{content.promoTitle}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img src={offer.image} alt={offer.name} style={{ width: '70px', height: '70px', objectFit: 'contain', background: 'white', borderRadius: '8px', border: '1px solid #fcd34d' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#1e293b' }}>{offer.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', lineHeight: 1.4 }}>{offer.desc}</p>
                </div>
              </div>

              <button 
                onClick={handleAcceptOffer}
                style={{
                  width: 'fit-content', padding: '12px 24px', background: '#f59e0b', color: 'white',
                  border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  alignSelf: 'flex-start', marginTop: '5px'
                }}
              >
                <PlusCircle size={20} /> {isFrench ? 'Ajouter à la commande' : 'Add to Order'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>{content.summaryTitle}</h3>
          <div className={styles.summaryRow}>
            <span>{content.subtotal}</span>
            <span>{currencySymbol} {cartTotal.toLocaleString()}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>{content.shipping}</span>
            <span>{content.shippingCalc}</span>
          </div>
          <div className={styles.totalRow}>
            <span>{content.total}</span>
            <span>{currencySymbol} {cartTotal.toLocaleString()}</span>
          </div>
          <button className={styles.checkoutBtn} onClick={handleCheckout} disabled={loading}>
            {loading ? 'Processing...' : content.checkout} <ArrowRight size={18} style={{marginLeft:'10px', display:'inline-block', verticalAlign:'middle'}}/>
          </button>
        </div>
      </div>
    </div>
  );
}