'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, Home, Mail, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

const LOGO_URL = "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo%20website.png";

const CONTENT_EN = {
  title: "Order Confirmed!",
  subtitle: "Thank you for your purchase. Your order has been received.",
  emailNote: "A confirmation email has been sent to",
  downloadBtn: "Download Invoice",
  homeBtn: "Return to Home",
  loading: "Finalizing your order...",
  resendBtn: "Resend Confirmation Email",
  resending: "Sending...",
  resendSuccess: "Email sent successfully!"
};

const CONTENT_FR = {
  title: "Commande Confirmée !",
  subtitle: "Merci pour votre achat. Votre commande a bien été reçue.",
  emailNote: "Un email de confirmation a été envoyé à",
  downloadBtn: "Télécharger la Facture",
  homeBtn: "Retour à l'accueil",
  loading: "Finalisation de votre commande...",
  resendBtn: "Renvoyer l'email de confirmation",
  resending: "Envoi en cours...",
  resendSuccess: "Email envoyé avec succès !"
};

export default function SuccessPage() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [emailSentMsg, setEmailSentMsg] = useState('');
  
  const { language } = useLanguage();
  const { clearCart } = useCart(); 
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const hasInitialized = useRef(false);

  useEffect(() => {
    // 1. ABSOLUTE LOCK: Prevent any re-runs caused by React StrictMode or state changes
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeSuccessPage = async () => {
      // Fetch the order
      const { data: { session } } = await supabase.auth.getSession();
      
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (session?.user) {
        query = query.eq('user_id', session.user.id);
      }

      const { data } = await query.single();
      
      if (data) {
        setOrder(data);

        // 2. SESSION STORAGE LOCK: The ultimate guard against infinite loops
        const emailLockKey = `auto_email_sent_${data.id}`;
        const hasSentAutoEmail = sessionStorage.getItem(emailLockKey);

        if (data.payment_method === 'card' && data.status === 'awaiting_payment' && !hasSentAutoEmail) {
          
          // Lock it BEFORE doing the fetch
          sessionStorage.setItem(emailLockKey, 'true');

          try {
            await fetch('/api/send-order-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderDetails: {
                  firstName: data.customer_name.split(' ')[0], 
                  lastName: data.customer_name.split(' ').slice(1).join(' '), 
                  email: data.customer_email,
                  address: data.address.address, 
                  city: data.address.city, 
                  zip: data.address.zip, 
                  country: data.address.country,
                  paymentMethod: 'card', 
                  orderNumber: data.order_number
                },
                cartItems: data.cart_items, 
                total: data.total_amount, 
                currency: data.currency
              })
            });

            // Update status (ignoring errors if Guest RLS blocks it)
            supabase.from('orders').update({ status: 'paid' }).eq('id', data.id).then();
          } catch (err) {
            console.error("Auto email failed", err);
          }
        }
      }

      // 3. Clear cart and session storage securely
      clearCart();
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('mns_order_ref');
      }

      setLoading(false);
    };

    initializeSuccessPage();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures it fires strictly once

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
          currency: order.currency
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
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("Bill To:", 15, 85);
    doc.text("Ship To:", 110, 85);

    doc.setFontSize(10);
    doc.setTextColor(80);
    
    // Billing Info
    const billing = order.billing_address || order.address;
    doc.text(billing.firstName + " " + billing.lastName, 15, 91);
    doc.text(billing.address, 15, 96);
    doc.text(`${billing.city}, ${billing.zip}`, 15, 101);
    doc.text(billing.country, 15, 106);
    doc.text(order.customer_email, 15, 111);

    // Shipping Info
    doc.text(order.address.firstName + " " + order.address.lastName, 110, 91);
    doc.text(order.address.address, 110, 96);
    doc.text(`${order.address.city}, ${order.address.zip}`, 110, 101);
    doc.text(order.address.country, 110, 106);

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
    const shippingCost = order.total_amount - subtotal;

    doc.text(`Subtotal:`, 140, finalY + 10);
    doc.text(`${currency} ${subtotal.toLocaleString()}`, 195, finalY + 10, { align: 'right' });

    doc.text(`Shipping:`, 140, finalY + 16);
    doc.text(shippingCost > 0 ? `${currency} ${shippingCost.toLocaleString()}` : 'Free', 195, finalY + 16, { align: 'right' });

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total:`, 140, finalY + 25);
    doc.text(`${currency} ${order.total_amount.toLocaleString()}`, 195, finalY + 25, { align: 'right' });

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
      <div style={{minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div className="loader" style={{marginBottom: 20}}></div>
        <p style={{color: '#64748b'}}>{content.loading}</p>
      </div>
    );
  }

  return (
    <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
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

        <h1 style={{fontSize: '2rem', marginBottom: '10px', color: '#0f172a'}}>{content.title}</h1>
        <p style={{color: '#64748b', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6'}}>
          {content.subtitle}
          {order && (
            <span style={{display:'block', marginTop: 10, fontSize:'0.9rem'}}>
              {content.emailNote} <strong>{order.customer_email}</strong>
            </span>
          )}
        </p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          
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
              <span style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <div className="loader" style={{width: 16, height: 16, borderWidth: 2}}></div> {content.resending}
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