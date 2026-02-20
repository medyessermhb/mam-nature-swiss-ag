'use client';

import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
  currency: "EUR",
  intent: "capture"
};

const CONTENT_EN = { empty: "Your cart is empty." };
const CONTENT_FR = { empty: "Votre panier est vide." };
const CONTENT_DE = { empty: "Ihr Warenkorb ist leer." };
const CONTENT_ES = { empty: "Su carrito está vacío." };

export default function CheckoutPage() {
  const { cart } = useCart();
  const { language } = useLanguage();

  const content = language === 'fr' ? CONTENT_FR : language === 'de' ? CONTENT_DE : language === 'es' ? CONTENT_ES : CONTENT_EN;

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        color: '#64748b'
      }}>
        {content.empty}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <PayPalScriptProvider options={paypalOptions}>
        {/* No Stripe Elements wrapper needed here anymore */}
        <CheckoutForm />
      </PayPalScriptProvider>
    </div>
  );
}