'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { usePricing } from '@/context/PricingContext';
import { PlusCircle, Tag } from 'lucide-react';

export default function CrossSellOffer() {
  const { cart, addToCart } = useCart();
  const { currency } = usePricing(); // To get current currency

  // 1. Check what is in the cart
  const hasEssential = cart.some(item => item.id === 'mam-nature-essential-set');
  const hasEssentialPlus = cart.some(item => item.id === 'mam-nature-essential-plus');

  // 2. Check if promos are ALREADY in the cart
  const hasPromo1 = cart.some(item => item.id === 'promo-particle-lime-set');
  const hasPromo2 = cart.some(item => item.id === 'promo-water-lime');

  // Determine current regional raw prices for the addToCart function
  const isMad = currency === 'MAD';
  const isChf = currency === 'CHF';
  const currencySymbol = isMad ? 'Dhs' : isChf ? 'CHF' : '€';

  // Logic to determine which offer to show
  let offer = null;

  if (hasEssential && !hasPromo1) {
    offer = {
      id: 'promo-particle-lime-set',
      name: 'Special Offer: Particle Filter + Water Lime',
      desc: 'Complete your setup for only 330€ (instead of 452€)!',
      price: isMad ? 3450 : isChf ? 310 : 330,
      image: '/images/WEBSITE-P/products/particle_+_water_lime.webp' // Replace with actual combo image
    };
  } else if (hasEssentialPlus && !hasPromo2) {
    offer = {
      id: 'promo-water-lime',
      name: 'Special Offer: Water LIME Filter',
      desc: 'Add anti-limescale protection for only 170€ (instead of 217€)!',
      price: isMad ? 1800 : isChf ? 160 : 170,
      image: '/images/WEBSITE-P/products/water_lime_vertical.webp' // Replace with actual Water Lime image
    };
  }

  // If no offer applies, don't render anything
  if (!offer) return null;

  const handleAcceptOffer = () => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      currency: currencySymbol === '€' ? 'EUR' : currencySymbol,
      image: offer.image
    });
  };

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      background: '#fffbeb', // Light yellow warning/promo background
      border: '1px dashed #f59e0b',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: 'bold' }}>
        <Tag size={18} />
        <span>Exclusive Cart Offer</span>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <img
          src={offer.image}
          alt={offer.name}
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #fcd34d' }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#1e293b' }}>{offer.name}</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{offer.desc}</p>
          <div style={{ fontWeight: 'bold', color: '#b45309', marginTop: '4px' }}>
            {currencySymbol} {offer.price}
          </div>
        </div>
      </div>

      <button
        onClick={handleAcceptOffer}
        style={{
          width: '100%',
          padding: '10px',
          background: '#f59e0b',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#d97706'}
        onMouseOut={(e) => e.currentTarget.style.background = '#f59e0b'}
      >
        <PlusCircle size={18} /> Add to Order
      </button>
    </div>
  );
}