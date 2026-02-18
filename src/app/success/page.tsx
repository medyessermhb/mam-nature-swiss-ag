'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Home, Mail, Check, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

const LOGO_URL = "/images/website_details/mam-nature_full_logo_website.png";

const CONTENT_EN = {
  title: "Order Confirmed!",
  subtitle: "Thank you for your purchase. Your order has been received.",
  emailNote: "A confirmation email has been sent to",
  downloadBtn: "Download Invoice",
  homeBtn: "Return to Home",
  loading: "Finalizing your order... Please wait.",
  resendBtn: "Resend Confirmation Email",
  resending: "Sending...",
  resendSuccess: "Email sent successfully!",
  error: "Something went wrong verifying your order. Please contact support."
};

const CONTENT_FR = {
  title: "Commande Confirmée !",
  subtitle: "Merci pour votre achat. Votre commande a bien été reçue.",
  emailNote: "Un email de confirmation a été envoyé à",
  downloadBtn: "Télécharger la Facture",
  homeBtn: "Retour à l'accueil",
  loading: "Finalisation de votre commande... Veuillez patienter.",
  resendBtn: "Renvoyer l'email de confirmation",
  resending: "Envoi en cours...",
  resendSuccess: "Email envoyé avec succès !",
  error: "Une erreur est survenue lors de la vérification. Veuillez contacter le support."
};

export default function SuccessPage() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [emailSentMsg, setEmailSentMsg] = useState('');

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();

  const { language } = useLanguage();
  const { clearCart } = useCart();
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verifyAndFetchOrder = async () => {
      try {
        // SCENARIO A: STRIPE REDIRECT (Has session_id)
        if (sessionId) {
          console.log("Verifying session:", sessionId);

          // 1. Call Verify API
          const res = await fetch('/api/verify-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || 'Verification failed');
          }

          // 2. Use the returned order data directly
          // This avoids RLS issues since the API (admin) already fetched/created it.
          if (data.order) {
            setOrder(data.order);
            await triggerEmail(data.order);
          } else {
            throw new Error("API verified session but returned no order data.");
          }

        } else {
          // SCENARIO B: MANUAL/BANK (No session_id, logic handled in CheckoutForm)
          // Fallback to finding latest order for this user/browser?
          // Or just rely on sessionStorage 'mns_order_ref' if we want to show something?
          // CheckoutForm saved order and redirected here.
          // We can try to fetch the latest order for the user.

          const { data: { session } } = await supabase.auth.getSession();

          // If we have an order ref in session storage (from Bank transfer flow)
          const localRef = sessionStorage.getItem('mns_order_ref');

          let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(1);

          if (localRef) {
            query = query.eq('order_number', localRef);
          } else if (session?.user) {
            query = query.eq('user_id', session.user.id);
          } else {
            // Guest with no ref and no session_id? 
            // Maybe just show generic "Success" without details if we can't find it.
            setLoading(false);
            return;
          }

          const { data: orderData } = await query.single();
          if (orderData) {
            setOrder(orderData);
          }
        }
      } catch (err: any) {
        console.error("Success Page Error:", err);
        setErrorMsg(err.message || content.error);
      } finally {
        clearCart();
        sessionStorage.removeItem('mns_order_ref');
        setLoading(false);
      }
    };

    verifyAndFetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const triggerEmail = async (orderData: any) => {
    // Logic from previous implementation
    const emailLockKey = `auto_email_sent_${orderData.id}`;
    if (sessionStorage.getItem(emailLockKey)) return;
    sessionStorage.setItem(emailLockKey, 'true');

    try {
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDetails: {
            firstName: orderData.customer_name.split(' ')[0],
            lastName: orderData.customer_name.split(' ').slice(1).join(' '),
            email: orderData.customer_email,
            address: orderData.address.address,
            city: orderData.address.city,
            zip: orderData.address.zip,
            country: orderData.address.country,
            paymentMethod: orderData.payment_method,
            orderNumber: orderData.order_number
          },
          cartItems: orderData.cart_items,
          total: orderData.total_amount,
          currency: orderData.currency,
          vatRate: orderData.vat_rate,
          vatAmount: orderData.vat_amount
        })
      });
    } catch (e) { console.error("Email send failed", e); }
  };

  // --- MANUAL RESEND EMAIL HANDLER ---
  const handleResendEmail = async () => {
    if (!order) return;
    setIsResending(true);
    setEmailSentMsg('');

    try {
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDetails: {
            firstName: order.customer_name.split(' ')[0],
            lastName: order.customer_name.split(' ').slice(1).join(' '),
            email: order.customer_email,
            address: order.address.address,
            city: order.address.city,
            zip: order.address.zip,
            country: order.address.country,
            paymentMethod: order.payment_method,
            orderNumber: order.order_number
          },
          cartItems: order.cart_items,
          total: order.total_amount,
          currency: order.currency,
          vatRate: order.vat_rate,
          vatAmount: order.vat_amount
        })
      });

      setEmailSentMsg(content.resendSuccess);
      setTimeout(() => setEmailSentMsg(''), 5000); // Hide message after 5 seconds
    } catch (err) {
      console.error(err);
      alert("Failed to resend email.");
    } finally {
      setIsResending(false);
    }
  };

  const generatePDF = () => {
    if (!order) return;

    const doc = new jsPDF();
    const currency = order.currency === 'EUR' ? '€' : order.currency === 'CHF' ? 'CHF' : 'Dhs';
    const displayId = order.order_number || order.id.slice(0, 8).toUpperCase();

    // --- 1. LOGO & HEADER ---
    const img = new Image();
    img.src = LOGO_URL;
    img.crossOrigin = "Anonymous";
    try {
      doc.addImage(img, 'PNG', 15, 15, 50, 15);
    } catch (e) {
      console.warn("Logo load failed", e);
    }

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Mam Nature Swiss AG", 200, 20, { align: "right" });
    doc.text("Spinnereistr. 16", 200, 25, { align: "right" });
    doc.text("CH-8645 Jona", 200, 30, { align: "right" });
    doc.text("Switzerland", 200, 35, { align: "right" });

    // --- 2. INVOICE TITLE & INFO ---
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text("INVOICE", 15, 50);

    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(`Invoice #: ${displayId}`, 15, 60);
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 15, 65);
    doc.text(`Status: Paid`, 15, 70);

    // --- 3. BILL TO / SHIP TO ---
    const billing = order.billing_address || order.address;
    const isSameAddress = (
      billing.firstName === order.address.firstName &&
      billing.lastName === order.address.lastName &&
      billing.address === order.address.address &&
      billing.city === order.address.city &&
      billing.zip === order.address.zip &&
      billing.country === order.address.country
    );

    doc.setFontSize(11);
    doc.setTextColor(0);

    if (!isSameAddress) {
      doc.text("Bill To:", 15, 85);
    }
    doc.text("Ship To:", 110, 85);

    doc.setFontSize(10);
    doc.setTextColor(80);

    // Billing Info (Only if different)
    if (!isSameAddress) {
      doc.text(billing.firstName + " " + billing.lastName, 15, 91);
      doc.text(billing.address, 15, 96);
      doc.text(`${billing.city}, ${billing.zip}`, 15, 101);
      doc.text(billing.country, 15, 106);
      doc.text(order.customer_email, 15, 111);
    }

    // Shipping Info
    doc.text(order.address.firstName + " " + order.address.lastName, 110, 91);
    doc.text(order.address.address, 110, 96);
    doc.text(`${order.address.city}, ${order.address.zip}`, 110, 101);
    doc.text(order.address.country, 110, 106);
    if (!isSameAddress) {
      // Maybe show email under shipping too if billing is hidden?
      // Usually email is under billing.
      // If billing is hidden, email is hidden. 
      // Start showing email under shipping if billing is hidden?
    } else {
      // Show email under shipping if billing is hidden
      doc.text(order.customer_email, 110, 111);
    }

    // --- 4. ITEMS TABLE ---
    const tableRows = order.cart_items.map((item: any) => [
      item.name,
      item.quantity,
      `${currency} ${item.price.toLocaleString()}`,
      `${currency} ${(item.price * item.quantity).toLocaleString()}`
    ]);

    autoTable(doc, {
      startY: 120,
      head: [['Item Description', 'Qty', 'Unit Price', 'Total']],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 10 },
    });

    // --- 5. TOTALS ---
    const finalY = (doc as any).lastAutoTable.finalY || 150;

    const subtotal = order.cart_items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    // Use stored total amount to ensure we respect what was paid (incl shipping)
    const paidTotal = order.total_amount;
    const shippingCost = paidTotal - subtotal;
    // Approx calculation, might differ slightly if VAT deduction logic was used differently, 
    // but total_amount is the source of truth for payment.

    doc.text(`Subtotal:`, 140, finalY + 10);
    doc.text(`${currency} ${subtotal.toLocaleString()}`, 195, finalY + 10, { align: 'right' });

    doc.text(`Shipping:`, 140, finalY + 16);
    // If shipping is negative (math error due to VAT deduction), show 0 or handle gracefullly
    doc.text(shippingCost > 0.01 ? `${currency} ${shippingCost.toLocaleString()}` : 'Free/Included', 195, finalY + 16, { align: 'right' });

    // --- VAT DISPLAY ---
    if (order.vat_amount > 0) {
      doc.text(`VAT (${(order.vat_rate * 100).toFixed(1)}%):`, 140, finalY + 22);
      doc.text(`${currency} ${order.vat_amount.toLocaleString()}`, 195, finalY + 22, { align: 'right' });
    } else {
      doc.text(`VAT (Export):`, 140, finalY + 22);
      doc.text(`${currency} 0.00`, 195, finalY + 22, { align: 'right' });
    }

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total:`, 140, finalY + 31);
    doc.text(`${currency} ${order.total_amount.toLocaleString()}`, 195, finalY + 31, { align: 'right' });

    // --- 6. FOOTER ---
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Thank you for your business!", 105, 280, { align: "center" });
    doc.text("www.mam-nature.com", 105, 285, { align: "center" });

    // Save
    doc.save(`Invoice_${displayId}.pdf`);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader" style={{ marginBottom: 20 }}></div>
        <p style={{ color: '#64748b' }}>{content.loading}</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
        <div style={{ color: '#ef4444', marginBottom: 20 }}><AlertTriangle size={48} /></div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Error</h2>
        <p style={{ color: '#64748b' }}>{errorMsg}</p>
        <Link href="/" style={{ marginTop: 20, color: '#0f172a', textDecoration: 'underline' }}>{content.homeBtn}</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        maxWidth: '500px', width: '100%',
        background: 'white', padding: '40px',
        borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        textAlign: 'center'
      }}>
        <div style={{
          width: 80, height: 80, background: '#dcfce7', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', color: '#166534'
        }}>
          <CheckCircle size={40} />
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#0f172a' }}>{content.title}</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
          {content.subtitle}
          {order && (
            <span style={{ display: 'block', marginTop: 10, fontSize: '0.9rem' }}>
              {content.emailNote} <strong>{order.customer_email}</strong>
            </span>
          )}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* RESEND EMAIL BUTTON */}
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '14px', borderRadius: '12px',
              background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0',
              fontSize: '1rem', fontWeight: 600, cursor: isResending ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => { if (!isResending) e.currentTarget.style.background = '#f1f5f9' }}
            onMouseOut={(e) => { if (!isResending) e.currentTarget.style.background = '#f8fafc' }}
          >
            {isResending ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="loader" style={{ width: 16, height: 16, borderWidth: 2 }}></div> {content.resending}
              </span>
            ) : (
              <>
                <Mail size={20} /> {content.resendBtn}
              </>
            )}
          </button>

          {/* SUCCESS MESSAGE FOR RESEND */}
          {emailSentMsg && (
            <div style={{ color: '#16a34a', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Check size={16} /> {emailSentMsg}
            </div>
          )}

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={generatePDF}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '14px', borderRadius: '12px',
              background: '#0f172a', color: 'white', border: 'none',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              transition: 'transform 0.2s',
              marginTop: '10px'
            }}
          >
            <Download size={20} /> {content.downloadBtn}
          </button>

          {/* HOME BUTTON */}
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '14px', borderRadius: '12px',
              background: 'transparent', color: '#475569', textDecoration: 'none',
              fontSize: '1rem', fontWeight: 600
            }}
          >
            <Home size={20} /> {content.homeBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}