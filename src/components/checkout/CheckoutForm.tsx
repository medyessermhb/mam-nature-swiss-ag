'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { usePricing } from '@/context/PricingContext';
import styles from '@/styles/Checkout.module.css';
import { supabase } from '@/lib/supabase';
import {
  CreditCard, Building2, Lock, User, MapPin, Truck,
  CheckCircle, ExternalLink, Copy, Check
} from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import { useLanguage } from '@/context/LanguageContext';
import { generateOrderNumber } from '@/utils/orderId';
import { EU_COUNTRIES } from '@/lib/euCountries';

// ==========================================
// HELPER STYLES
// ==========================================
const tabBtnStyle = (active: boolean): React.CSSProperties => ({
  flex: 1,
  padding: '10px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  borderBottom: active ? '2px solid #0f172a' : '1px solid #e2e8f0',
  fontWeight: active ? 700 : 400,
  color: active ? '#0f172a' : '#64748b'
});

// ==========================================
// PRODUCT-BASED SHIPPING RATES
// ==========================================
const calculateShipping = (items: any[]) => {
  return items.reduce((total, item) => {
    let rate = 20; // Default for all other components
    const id = item.id;

    if (id === 'mam-nature-water-treatment-complete-set-plus' || id === 'complete-set-plus') {
      rate = 80;
    } else if (id === 'mam-nature-water-treatment-complete-set' || id === 'complete-set') {
      rate = 50;
    } else if (id === 'mam-nature-eco-set-plus' || id === 'eco-set-plus') {
      rate = 50;
    } else if (id === 'mam-nature-eco-set' || id === 'eco-set') {
      rate = 40;
    } else if (id === 'mam-nature-essential-plus' || id === 'essential-plus') {
      rate = 35;
    } else if (id === 'mam-nature-essential-set' || id === 'essential') {
      rate = 35;
    }

    return total + (rate * item.quantity);
  }, 0);
};

// --- CONTENT TRANSLATIONS ---
const CONTENT_EN = {
  header: "Secure Checkout",
  auth: {
    title: "How would you like to order?",
    tabs: { guest: "Guest", login: "Login", register: "Register" },
    guestDesc: "No account required. Fast and easy.",
    loginDesc: "Access your saved details.",
    regDesc: "Track your order and save time.",
    welcome: "Welcome back,",
    switch: "Not you? Logout"
  },
  contact: { title: "Contact Details", email: "Email Address", phone: "Phone Number" },
  shipping: { title: "Shipping Address", first: "First Name", last: "Last Name", address: "Street Address", city: "City", zip: "ZIP / Postal Code", country: "Country", select: "Select Country..." },
  billing: { title: "Billing Address", sameLabel: "Billing address is same as shipping" },
  payment: {
    title: "Payment Method",
    card: "Credit Card",
    cardDesc: "Visa, Mastercard, Amex & All Major Cards",
    bank: "Bank Transfer",
    payWithWise: "Pay with Wise",
    ssl: "SSL Secure Payment",
    redirectNote: "You will be redirected to Stripe to securely complete your payment."
  },
  summary: {
    title: "Order Summary",
    sub: "Subtotal",
    ship: "Shipping",
    free: "Free",
    contested: "To be determined (Contact us)",
    total: "Total Due",
    payBtn: "Pay",
    placeBtn: "Place Order",
    process: "Processing..."
  },
  bank: { bene: "Beneficiary", addr: "Address", iban: "IBAN", swift: "SWIFT/BIC", ref: "Reference", bankName: "Bank Name", rib: "RIB (24 digits)" },
  errors: { unexpected: "An unexpected error occurred.", country: "Please select a country." }
};

const CONTENT_FR = {
  header: "Paiement Sécurisé",
  auth: {
    title: "Comment souhaitez-vous commander ?",
    tabs: { guest: "Invité", login: "Se connecter", register: "S'inscrire" },
    guestDesc: "Pas de compte requis. Rapide et simple.",
    loginDesc: "Accédez à vos infos sauvegardées.",
    regDesc: "Suivez votre commande et gagnez du temps.",
    welcome: "Bon retour,",
    switch: "Pas vous ? Déconnexion"
  },
  contact: { title: "Coordonnées", email: "Adresse Email", phone: "Numéro de téléphone" },
  shipping: { title: "Adresse de Livraison", first: "Prénom", last: "Nom", address: "Adresse", city: "Ville", zip: "Code Postal", country: "Pays", select: "Sélectionner..." },
  billing: { title: "Adresse de Facturation", sameLabel: "Identique à la livraison" },
  payment: {
    title: "Moyen de Paiement",
    card: "Carte Bancaire",
    cardDesc: "Visa, Mastercard, Amex et cartes majeures",
    bank: "Virement Bancaire",
    payWithWise: "Payer avec Wise",
    ssl: "Paiement Sécurisé",
    redirectNote: "Vous serez redirigé vers Stripe pour finaliser le paiement en toute sécurité."
  },
  summary: {
    title: "Résumé",
    sub: "Sous-total",
    ship: "Livraison",
    free: "Gratuite",
    contested: "À déterminer (Contactez-nous)",
    total: "Total à payer",
    payBtn: "Payer",
    placeBtn: "Confirmer la commande",
    process: "Traitement..."
  },
  bank: { bene: "Bénéficiaire", addr: "Adresse", iban: "IBAN", swift: "SWIFT/BIC", ref: "Référence", bankName: "Nom de la Banque", rib: "RIB (24 chiffres)" },
  errors: { unexpected: "Erreur inattendue.", country: "Veuillez sélectionner un pays." }
};

export default function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useCart();
  const { region } = usePricing();
  const { language } = useLanguage();

  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;
  const rawCurrency = cart[0]?.currency || 'EUR';
  const isoCurrency = rawCurrency === 'Dhs' ? 'MAD' : rawCurrency;
  const currencySymbol = isoCurrency === 'EUR' ? '€' : isoCurrency === 'CHF' ? 'CHF' : 'Dhs';

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [billingSame, setBillingSame] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState(0);

  const [orderNumber, setOrderNumber] = useState('Generating...');

  const [user, setUser] = useState<any>(null);
  const [authTab, setAuthTab] = useState<'guest' | 'login' | 'register'>('guest');
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authName, setAuthName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', address: '', city: '', zip: '', country: '' });
  const [billing, setBilling] = useState({ firstName: '', lastName: '', address: '', city: '', zip: '', country: '' });

  // 0. FETCH ORDER NUMBER
  useEffect(() => {
    const fetchOrderNumber = async () => {
      const savedOrderRef = typeof window !== 'undefined' ? sessionStorage.getItem('mns_order_ref') : null;
      if (savedOrderRef) {
        setOrderNumber(savedOrderRef);
        return;
      }
      try {
        const { data, error } = await supabase.rpc('get_next_order_number');
        if (error) throw error;
        setOrderNumber(data);
        sessionStorage.setItem('mns_order_ref', data);
      } catch (err) {
        console.error("Failed to get order number", err);
        const fallback = generateOrderNumber();
        setOrderNumber(fallback);
        sessionStorage.setItem('mns_order_ref', fallback);
      }
    };
    fetchOrderNumber();
  }, []);

  // 1. DYNAMIC SHIPPING & VAT CALCULATION
  const [vatRate, setVatRate] = useState(0);
  const [isExport, setIsExport] = useState(false);
  const [finalProductTotal, setFinalProductTotal] = useState(cartTotal);

  useEffect(() => {
    // A. Shipping Cost
    if (!shipping.country) {
      setShippingCost(0);
      setFinalProductTotal(cartTotal); // Reset to cartTotal if no country
      return;
    }

    // MOROCCO LOGIC: Contested shipping
    if (shipping.country === 'MA') {
      setShippingCost(0);
      // Removed forced bank transfer to allow Stripe testing/usage
    } else {
      // EUROPE / ROW LOGIC: Product-based calculation
      const baseRateEUR = calculateShipping(cart);
      let finalCost = baseRateEUR;

      // Convert shipping cost if using a different currency locally
      if (isoCurrency === 'MAD') finalCost = baseRateEUR * 10;
      else if (isoCurrency === 'CHF') finalCost = baseRateEUR * 1;

      setShippingCost(finalCost);
    }

    // B. VAT Logic
    // Implied tax in the CURRENT price
    let impliedTaxRate = 0.19; // Default EUR
    if (isoCurrency === 'MAD') impliedTaxRate = 0.20;
    if (isoCurrency === 'CHF') impliedTaxRate = 0.081;

    let currentVatRate = 0;
    let currentIsExport = false;

    if (shipping.country === 'CH') {
      currentVatRate = 0.081;
      currentIsExport = false;
      if (isoCurrency !== 'CHF') currentIsExport = true;
    }
    else if (shipping.country === 'MA') {
      currentVatRate = 0.20;
      currentIsExport = false;
      if (isoCurrency !== 'MAD') currentIsExport = true;
    }
    else if (EU_COUNTRIES.includes(shipping.country)) {
      currentVatRate = 0.19;
      currentIsExport = false;
      if (isoCurrency === 'MAD') currentIsExport = true;
      if (isoCurrency === 'CHF') currentIsExport = true;
    }
    else {
      // ROW
      currentVatRate = 0;
      currentIsExport = true;
    }

    setVatRate(currentVatRate);
    setIsExport(currentIsExport);

    // Calculate Final Product Total
    if (currentIsExport) {
      // Check if we are already in RestOfWorld region (prices are already ex-VAT)
      // If region is 'RestOfWorld' and currency is likely EUR (default for RoW), 
      // the price in cart is already tax-free.
      if (region === 'RestOfWorld' && isoCurrency !== 'CHF' && isoCurrency !== 'MAD') {
        setFinalProductTotal(cartTotal);
      } else {
        // Remove implied tax (e.g. European using site shipping to US)
        setFinalProductTotal(cartTotal / (1 + impliedTaxRate));
      }
    } else {
      setFinalProductTotal(cartTotal);
    }

  }, [shipping.country, isoCurrency, cart, cartTotal, region]);

  const grandTotal = finalProductTotal + shippingCost;

  const wiseUrl = `https://wise.com/pay/business/mamnatureswissag?amount=${grandTotal.toFixed(2)}&currency=${isoCurrency}&reference=${orderNumber}`;

  // ==========================================
  // DYNAMIC BANK DETAILS (MOROCCO VS GLOBAL)
  // ==========================================
  const BANK_DETAILS_GLOBAL = [
    { label: content.bank.bene, value: "Mam Nature Swiss AG" },
    { label: content.bank.addr, value: "Spinnereistr. 16, CH-8645 Jona" },
    { label: content.bank.iban, value: "BE49 9672 5200 6871" },
    { label: content.bank.swift, value: "TRWIBEB1XXX" },
    { label: content.bank.ref, value: orderNumber, highlight: true }
  ];

  const BANK_DETAILS_MOROCCO = [
    { label: content.bank.bene, value: "MAM NATURE" },
    { label: content.bank.addr, value: "56 BD MLY YOUSSEF ETG 3 APT 14, 20040 CASABLANCA MAROC" },
    { label: content.bank.bankName, value: "BMCE (AGENCE FAR PART PRO)" },
    { label: content.bank.rib, value: "011 780 0000 162100 011578 59" },
    { label: content.bank.iban, value: "MA64 0117 8000 0016 2100 0115 7859" },
    { label: content.bank.swift, value: "BMCEMAMC" },
    { label: content.bank.ref, value: orderNumber, highlight: true }
  ];

  const ACTIVE_BANK_DETAILS = shipping.country === 'MA' ? BANK_DETAILS_MOROCCO : BANK_DETAILS_GLOBAL;

  const [savedProfile, setSavedProfile] = useState<any>(null);
  const [useSavedAddress, setUseSavedAddress] = useState(false);

  // 2. Check User Session & Fetch Profile
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setEmail(session.user.email || '');

        // Fetch Profile Data
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone, address, city, zip, country')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setSavedProfile(profile);
          // If profile has address data, default to using it
          if (profile.address && profile.city) {
            setUseSavedAddress(true);
            setShipping({
              firstName: profile.first_name || '',
              lastName: profile.last_name || '',
              address: profile.address || '',
              city: profile.city || '',
              zip: profile.zip || '',
              country: profile.country || ''
            });
            setPhone(profile.phone || '');
          }
        }
      }
    };
    checkUser();
  }, []);

  // Toggle Handler
  const handleUseSavedAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setUseSavedAddress(checked);

    if (checked && savedProfile) {
      setShipping({
        firstName: savedProfile.first_name || '',
        lastName: savedProfile.last_name || '',
        address: savedProfile.address || '',
        city: savedProfile.city || '',
        zip: savedProfile.zip || '',
        country: savedProfile.country || ''
      });
      setPhone(savedProfile.phone || '');
    } else {
      // Clear fields if unchecked? Or keep them? Usually better UX to keep them editable.
      // But user wanted "option to write a new one", implying clearing or just editing.
      // Let's just leave them as is, so they can edit. 
      // Actually, if they uncheck "Use Saved", maybe they want to clear?
      // Let's just let them edit the current values.
    }
  };

  // 3. Auth Handlers
  const handleLogin = async () => {
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPass });
    if (!error && data.session) {
      setUser(data.session.user);
      setEmail(data.session.user.email || authEmail);
      setAuthTab('guest');
    } else {
      alert(error?.message || "Login failed");
    }
    setAuthLoading(false);
  };

  const handleRegister = async () => {
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPass,
      options: { data: { full_name: authName } }
    });
    if (!error && data.user) {
      setUser(data.user);
      setEmail(authEmail);
      const names = authName.split(' ');
      setShipping(prev => ({ ...prev, firstName: names[0], lastName: names.slice(1).join(' ') || '' }));
      setAuthTab('guest');
    } else {
      alert(error?.message || "Registration failed");
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEmail('');
  };

  // 4. Save Order
  const saveOrder = async (status: string, paymentId: string) => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    const userId = currentUser ? currentUser.id : null;
    const billingDetails = billingSame ? shipping : billing;

    const finalShippingCost = shipping.country === 'MA' ? 'Contested' : shippingCost;

    // Calculate VAT Amount for the record
    let vatAmount = 0;
    if (!isExport) {
      // Included in price: Price - (Price / (1 + Rate))
      vatAmount = grandTotal - (grandTotal / (1 + vatRate));
    }

    // Use INSERT instead of UPSERT to avoid RLS complexities with guest updates.
    // Check for duplicate key errors and regenerate order number if needed.
    const orderData = {
      user_id: userId,
      order_number: orderNumber,
      customer_email: email,
      customer_phone: phone,
      customer_name: `${shipping.firstName} ${shipping.lastName}`,
      address: shipping,
      billing_address: billingDetails,
      cart_items: cart,
      shipping_cost: finalShippingCost,
      total_amount: grandTotal,
      currency: isoCurrency,
      stripe_payment_id: paymentId,
      status: status,
      payment_method: paymentMethod,
      vat_rate: vatRate,
      vat_amount: vatAmount,
      created_at: new Date().toISOString()
    };

    let { error } = await supabase.from('orders').insert(orderData);

    // Handle Duplicate Key Error (Unique Constraint Violation)
    if (error && error.code === '23505') {
      // 23505 = unique_violation in Postgres
      console.warn("Duplicate order number detected. Regenerating...");

      const newOrderNum = generateOrderNumber(); // Generate new fallback ID
      setOrderNumber(newOrderNum); // Update state for UI
      sessionStorage.setItem('mns_order_ref', newOrderNum); // Update session

      // Retry with new number
      const retryData = { ...orderData, order_number: newOrderNum };
      const { error: retryError } = await supabase.from('orders').insert(retryData);

      if (retryError) throw retryError;
    } else if (error) {
      throw error;
    }

    if (error) throw error;
  };

  // 5. Trigger Email
  const triggerEmail = async () => {
    try {
      // Calculate VAT Amount for email
      let vatAmount = 0;
      if (!isExport) {
        vatAmount = grandTotal - (grandTotal / (1 + vatRate));
      }

      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDetails: {
            firstName: shipping.firstName,
            lastName: shipping.lastName,
            email: email,
            phone: phone,
            address: shipping.address,
            city: shipping.city,
            zip: shipping.zip,
            country: shipping.country,
            paymentMethod,
            orderNumber
          },
          cartItems: cart,
          total: grandTotal,
          currency: isoCurrency,
          vatRate: vatRate,     // NEW
          vatAmount: vatAmount // NEW
        })
      });
    } catch (e) {
      console.error("Email send failed:", e);
    }
  };

  // 6. Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping.country) {
      setErrorMsg(content.errors.country);
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      // Status Logic: 
      // Card -> 'payment_pending' (User is redirected to Stripe)
      // Bank -> 'awaiting_payment' (User needs to send money manually)

      // FOR STRIPE (CARD): DO NOT SAVE ORDER YET. Pass info to Metadata.
      // FOR BANK: SAVE ORDER NOW (Status: awaiting_payment)

      if (paymentMethod === 'bank') {
        await saveOrder('awaiting_payment', 'WISE_PENDING');
      }
      // Note: for card, we skip saveOrder() here. We'll do it in verify-session.

      if (paymentMethod === 'card') {

        // Calculate VAT Amount for metadata
        let vatAmount = 0;
        if (!isExport) {
          vatAmount = grandTotal - (grandTotal / (1 + vatRate));
        }

        const billingDetails = billingSame ? shipping : billing;

        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.map(item => {
              // ---------------------------------------------------------
              // RE-DERIVE EXPORT STATUS TO ENSURE SAFETY
              // ---------------------------------------------------------
              let isItemExport = false;
              if (shipping.country !== 'CH' && shipping.country !== 'MA' && !EU_COUNTRIES.includes(shipping.country)) {
                isItemExport = true;
              }
              // Override/Refine based on currency match (like in useEffect)
              if (shipping.country === 'CH' && isoCurrency !== 'CHF') isItemExport = true;
              if (shipping.country === 'MA' && isoCurrency !== 'MAD') isItemExport = true;
              if (EU_COUNTRIES.includes(shipping.country) && (isoCurrency === 'MAD' || isoCurrency === 'CHF')) isItemExport = true;

              // Logic to handle VAT deduction for Exports
              let finalPrice = item.price;

              // Only deduct VAT if it is explicitly an EXPORT scenario
              if (isItemExport) {
                // If we are already in RestOfWorld, price is already Net. Don't deduct again.
                if (region === 'RestOfWorld' && isoCurrency !== 'CHF' && isoCurrency !== 'MAD') {
                  // Keeps original price (which is ex-VAT)
                  finalPrice = item.price;
                } else {
                  // We are in EU/CH/MA mode but shipping to Export -> Deduct VAT
                  const divisor = isoCurrency === 'CHF' ? 1.081 : isoCurrency === 'MAD' ? 1.20 : 1.19;
                  finalPrice = item.price / divisor;
                }
              }

              // DOUBLE CHECK: If shipping to Morocco and paying in MAD, FORCE raw price (10 Dhs)
              // This acts as a safety against 'isExport' being incorrectly true
              if (shipping.country === 'MA' && isoCurrency === 'MAD') {
                finalPrice = item.price;
              }

              return {
                ...item,
                price: finalPrice
              };
            }),
            currency: isoCurrency,
            shippingCost: shippingCost,
            customerEmail: email,
            orderNumber: orderNumber,
            // Extra Data for Post-Payment Creation
            customerName: `${shipping.firstName} ${shipping.lastName}`,
            customerPhone: phone,
            shippingAddress: shipping,
            billingAddress: billingDetails,
            vatRate: vatRate,
            vatAmount: vatAmount,
            totalAmount: grandTotal
          }),
        });

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.error || 'Failed to create checkout session');
        }
      }
      else if (paymentMethod === 'bank') {
        await triggerEmail();
        // Only open Wise link if it's NOT Morocco
        if (shipping.country !== 'MA') {
          window.open(wiseUrl, '_blank');
        }
        sessionStorage.removeItem('mns_order_ref');
        clearCart();
        window.location.href = '/success';
      }
    } catch (err: any) {
      setErrorMsg(err.message || content.errors.unexpected);
      setLoading(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.checkoutContainer}>

        {/* LEFT: FORM */}
        <div className={styles.formCard}>
          <div className={styles.mainHeader}>
            <Lock size={28} color="#D52D25" />
            <h2>{content.header}</h2>
          </div>

          {/* ================= AUTH SECTION ================= */}
          <div style={{ marginBottom: 30, background: '#f8fafc', borderRadius: 8, padding: 20, border: '1px solid #e2e8f0' }}>
            {user ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ background: '#dcfce7', padding: 8, borderRadius: '50%', color: '#166534' }}><CheckCircle size={20} /></div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{content.auth.welcome}</span>
                    <div style={{ fontWeight: 600 }}>{user.email}</div>
                  </div>
                </div>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#D52D25', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>
                  {content.auth.switch}
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '1rem', marginBottom: 15 }}>{content.auth.title}</h3>
                <div style={{ display: 'flex', marginBottom: 20 }}>
                  <button type="button" onClick={() => setAuthTab('guest')} style={tabBtnStyle(authTab === 'guest')}>{content.auth.tabs.guest}</button>
                  <button type="button" onClick={() => setAuthTab('login')} style={tabBtnStyle(authTab === 'login')}>{content.auth.tabs.login}</button>
                  <button type="button" onClick={() => setAuthTab('register')} style={tabBtnStyle(authTab === 'register')}>{content.auth.tabs.register}</button>
                </div>
                {authTab === 'guest' && <div style={{ color: '#64748b', fontSize: '0.9rem', padding: '10px 0' }}>{content.auth.guestDesc}</div>}
                {authTab === 'login' && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <input className={styles.input} type="email" placeholder={content.contact.email} value={authEmail} onChange={e => setAuthEmail(e.target.value)} style={{ flex: 1 }} />
                    <input className={styles.input} type="password" placeholder="Password" value={authPass} onChange={e => setAuthPass(e.target.value)} style={{ flex: 1 }} />
                    <button type="button" onClick={handleLogin} className={styles.payButton} disabled={authLoading} style={{ marginTop: 0, padding: '10px 20px', width: 'auto' }}>{authLoading ? '...' : content.auth.tabs.login}</button>
                  </div>
                )}
                {authTab === 'register' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input className={styles.input} type="text" placeholder="Full Name" value={authName} onChange={e => setAuthName(e.target.value)} />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input className={styles.input} type="email" placeholder={content.contact.email} value={authEmail} onChange={e => setAuthEmail(e.target.value)} style={{ flex: 1 }} />
                      <input className={styles.input} type="password" placeholder="Password" value={authPass} onChange={e => setAuthPass(e.target.value)} style={{ flex: 1 }} />
                    </div>
                    <button type="button" onClick={handleRegister} className={styles.payButton} disabled={authLoading} style={{ marginTop: 0 }}>{authLoading ? '...' : content.auth.tabs.register}</button>
                  </div>
                )}
              </>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/* CONTACT */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}><User size={20} className={styles.headerIcon} /> <h3>{content.contact.title}</h3></div>
              <div className={styles.formGroup}>
                <label className={styles.label}>{content.contact.email}</label>
                <input type="email" required className={styles.input} value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>{content.contact.phone}</label>
                <input type="tel" required className={styles.input} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" />
              </div>
            </div>

            {/* SHIPPING */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Truck size={20} className={styles.headerIcon} />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <h3>{content.shipping.title}</h3>
                  {savedProfile && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer', color: '#0f172a' }}>
                      <input
                        type="checkbox"
                        checked={useSavedAddress}
                        onChange={handleUseSavedAddress}
                        style={{ accentColor: '#D52D25', width: 16, height: 16 }}
                      />
                      {language === 'fr' ? 'Utiliser mon adresse enregistrée' : 'Use my saved address'}
                    </label>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.formGroup}><label className={styles.label}>{content.shipping.first}</label><input type="text" name="firstName" required className={styles.input} value={shipping.firstName} onChange={handleShippingChange} /></div>
                <div className={styles.formGroup}><label className={styles.label}>{content.shipping.last}</label><input type="text" name="lastName" required className={styles.input} value={shipping.lastName} onChange={handleShippingChange} /></div>
              </div>
              <div className={styles.formGroup}><label className={styles.label}>{content.shipping.address}</label><input type="text" name="address" required className={styles.input} value={shipping.address} onChange={handleShippingChange} placeholder="123 Main St" /></div>
              <div className={styles.row}>
                <div className={styles.formGroup}><label className={styles.label}>{content.shipping.city}</label><input type="text" name="city" required className={styles.input} value={shipping.city} onChange={handleShippingChange} /></div>
                <div className={styles.formGroup}><label className={styles.label}>{content.shipping.zip}</label><input type="text" name="zip" required className={styles.input} value={shipping.zip} onChange={handleShippingChange} /></div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>{content.shipping.country}</label>
                <select name="country" required className={styles.select} value={shipping.country} onChange={handleShippingChange}>
                  <option value="" disabled>{content.shipping.select}</option>
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {/* BILLING TOGGLE */}
            <div className={styles.checkboxWrapper} onClick={() => setBillingSame(!billingSame)}>
              <input type="checkbox" checked={billingSame} readOnly />
              <label className={styles.checkboxLabel}>{content.billing.sameLabel}</label>
            </div>

            {!billingSame && (
              <div className={styles.section} style={{ marginTop: 20, padding: 25, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div className={styles.sectionHeader}><MapPin size={20} className={styles.headerIcon} /> <h3>{content.billing.title}</h3></div>
                <div className={styles.row}>
                  <div className={styles.formGroup}><label className={styles.label}>{content.shipping.first}</label><input type="text" name="firstName" required className={styles.input} value={billing.firstName} onChange={handleBillingChange} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>{content.shipping.last}</label><input type="text" name="lastName" required className={styles.input} value={billing.lastName} onChange={handleBillingChange} /></div>
                </div>
                <div className={styles.formGroup}><label className={styles.label}>{content.shipping.address}</label><input type="text" name="address" required className={styles.input} value={billing.address} onChange={handleBillingChange} /></div>
                <div className={styles.row}>
                  <div className={styles.formGroup}><label className={styles.label}>{content.shipping.city}</label><input type="text" name="city" required className={styles.input} value={billing.city} onChange={handleBillingChange} /></div>
                  <div className={styles.formGroup}><label className={styles.label}>{content.shipping.zip}</label><input type="text" name="zip" required className={styles.input} value={billing.zip} onChange={handleBillingChange} /></div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.shipping.country}</label>
                  <select name="country" required className={styles.select} value={billing.country} onChange={handleBillingChange}>
                    <option value="" disabled>{content.shipping.select}</option>
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* PAYMENT */}
            <div className={styles.section} style={{ marginTop: 40 }}>
              <div className={styles.sectionHeader}><CreditCard size={20} className={styles.headerIcon} /> <h3>{content.payment.title}</h3></div>

              {/* Dynamic Tabs Grid: 1 column if Morocco, 2 columns otherwise (Card + Bank) */}
              <div className={styles.paymentTabs} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>

                {/* Allow Card for everyone now */}
                <div className={`${styles.paymentTab} ${paymentMethod === 'card' ? styles.active : ''}`} onClick={() => setPaymentMethod('card')}>
                  <CreditCard size={24} className={styles.tabIcon} />
                  <span className={styles.tabLabel}>{content.payment.card}</span>
                </div>

                <div className={`${styles.paymentTab} ${paymentMethod === 'bank' ? styles.active : ''}`} onClick={() => setPaymentMethod('bank')}>
                  <Building2 size={24} className={styles.tabIcon} />
                  <span className={styles.tabLabel}>{content.payment.bank}</span>
                </div>
              </div>

              <div className={styles.paymentContent}>
                {paymentMethod === 'card' && (
                  <div style={{ textAlign: 'center', padding: '30px 20px', background: '#F8FAFC', borderRadius: '8px' }}>
                    <div style={{ marginBottom: 15 }}><CreditCard size={48} color="#D52D25" /></div>
                    <p style={{ fontSize: '1rem', color: '#334155', fontWeight: 600, lineHeight: 1.5 }}>
                      {content.payment.cardDesc}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: 5 }}>
                      {content.payment.redirectNote}
                    </p>
                    <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Lock size={14} /> {content.payment.ssl}
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {ACTIVE_BANK_DETAILS.map((i, idx) => (
                        <div key={idx} style={{
                          display: 'flex', justifyContent: 'space-between', background: i.highlight ? '#fffbeb' : 'white',
                          padding: 12, border: i.highlight ? '1px solid #fcd34d' : '1px solid #e2e8f0',
                          borderRadius: 8
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: i.highlight ? '#92400e' : 'inherit' }}>
                            {i.label}<br />
                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{i.value}</span>
                          </div>
                          <button type="button" onClick={() => handleCopy(i.value, i.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedField === i.label ? '#10b981' : '#94a3b8' }}>{copiedField === i.label ? <Check size={18} /> : <Copy size={18} />}</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 15, fontSize: '0.85rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
                      {language === 'fr' ? "Veuillez indiquer la référence lors du virement." : "Please include the reference number in your transfer."}
                    </div>

                    {/* ONLY SHOW WISE IF NOT MOROCCO */}
                    {shipping.country !== 'MA' && (
                      <div style={{ marginTop: 25, textAlign: 'center' }}>
                        <a href={wiseUrl} target="_blank" rel="noopener noreferrer" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          background: '#9fe870',
                          color: '#163300',
                          padding: '12px 24px',
                          borderRadius: 8,
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                          {content.payment.payWithWise} <ExternalLink size={16} />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
          </form>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className={styles.summarySection}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryHeader}><h2>{content.summary.title}</h2></div>

            {/* === ORDER REF DISPLAY === */}
            <div style={{
              background: '#f1f5f9',
              padding: '10px 15px',
              borderRadius: '6px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px dashed #cbd5e1'
            }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Order Ref:</span>
              <span style={{ fontWeight: '700', color: '#0f172a', fontFamily: 'monospace', fontSize: '1rem' }}>
                {orderNumber}
              </span>
            </div>

            {/* Summary Items */}
            {cart.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div><span className={styles.itemName}>{item.name}</span><span className={styles.itemQty}>x{item.quantity}</span></div>
                <span className={styles.itemPrice}>{currencySymbol} {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}

            <div className={`${styles.summaryItem} ${styles.subtotalRow}`}>
              <span>{content.summary.sub}</span>
              {isExport ? (
                <span className={styles.itemPrice}>{currencySymbol} {finalProductTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              ) : (
                <span className={styles.itemPrice}>{currencySymbol} {cartTotal.toLocaleString()}</span>
              )}
            </div>

            <div className={styles.summaryItem} style={{ color: '#64748b', fontSize: '0.85rem' }}>
              <span>{isExport ? `VAT (0% Export)` : `Includes VAT (${(vatRate * 100).toFixed(1)}%)`}</span>
              {isExport ? (
                <span>{currencySymbol} 0.00</span>
              ) : (
                <span>{currencySymbol} {(cartTotal - (cartTotal / (1 + vatRate))).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              )}
            </div>

            <div className={styles.summaryItem}>
              <span>{content.summary.ship}</span>
              {shipping.country === 'MA' ? (
                <span style={{ color: '#D52D25', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>{content.summary.contested}</span>
              ) : shippingCost > 0 ? (
                <span style={{ fontWeight: 600 }}>{currencySymbol} {shippingCost.toLocaleString()}</span>
              ) : (
                <span style={{ color: '#10b981', fontWeight: 700 }}>{content.summary.free}</span>
              )}
            </div>

            <div className={styles.summaryTotal}>
              <span className={styles.totalLabel}>{content.summary.total}</span>
              <span className={styles.totalAmount}>{currencySymbol} {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {isExport && (
              <div style={{
                marginTop: 15,
                marginBottom: 15,
                padding: '10px',
                background: '#fff7ed',
                border: '1px solid #ffedd5',
                borderRadius: 6,
                fontSize: '0.85rem',
                color: '#9a3412',
                textAlign: 'left'
              }}>
                <strong>Note:</strong> {language === 'fr'
                  ? "Des droits de douane et taxes peuvent s'appliquer à l'arrivée dans votre pays."
                  : "Import duties and taxes may apply upon arrival in your destination country."}
              </div>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.payButton}
              disabled={loading}
            >
              {loading
                ? content.summary.process
                : paymentMethod === 'card'
                  ? `${content.summary.payBtn} ${currencySymbol} ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : content.summary.placeBtn}
            </button>

            <div className={styles.secureBadge}><Lock size={16} /> {content.payment.ssl}</div>
          </div>
        </div>
      </div>
    </div>
  );
}