'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Home, Mail, Check, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { generateInvoicePDF } from '@/utils/generateInvoice';

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

function SuccessContent() {
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

          const { data: { session } } = await supabase.auth.getSession();

          // If we have an order ref in session storage (from Bank transfer flow)
          const localRef = sessionStorage.getItem('mns_order_ref');

          let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(1);

          if (localRef) {
            query = query.eq('order_number', localRef);
          } else if (session?.user) {
            query = query.eq('user_id', session.user.id);
          } else {
            // Guest with no ref and no session_id
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
      setTimeout(() => setEmailSentMsg(''), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to resend email.");
    } finally {
      setIsResending(false);
    }
  };

  const generatePDF = () => {
    if (order) {
      generateInvoicePDF(order);
    }
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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader" style={{ marginBottom: 20 }}></div>
        <p style={{ color: '#64748b' }}>Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}