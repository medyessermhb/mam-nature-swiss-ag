'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/styles/Dashboard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { generateInvoicePDF } from '@/utils/generateInvoice'; 
import { 
  ArrowLeft, MapPin, CreditCard, Package, User, 
  CheckCircle, Clock, Truck, XCircle, Download, FileText
} from 'lucide-react';

// --- COMPREHENSIVE CONTENT DICTIONARIES ---
const CONTENT_EN = {
  back: "Back to Dashboard",
  title: "Order Details",
  orderId: "Order Ref",
  downloadInvoice: "Download Official Invoice", 
  loading: "Retrieving comprehensive order details from our secure servers...",
  notFound: "We could not locate the requested order. It may have been removed or the reference number is incorrect.",
  summary: {
    title: "Order Summary",
    date: "Date of Purchase",
    status: "Current Status",
    payment: "Payment Method",
    total: "Total Amount Due"
  },
  customer: {
    shipping: "Shipping Destination",
    billing: "Billing Information",
    contact: "Customer Contact Details",
    email: "Email Address",
    phone: "Phone Number" // Added phone label
  },
  items: {
    title: "Purchased Items",
    prod: "Product Description",
    price: "Unit Price",
    qty: "Quantity",
    subtotal: "Line Total"
  },
  statuses: {
    paid: "Payment Confirmed",
    processing: "Processing Order",
    shipped: "In Transit",
    delivered: "Successfully Delivered",
    cancelled: "Order Cancelled",
    awaiting_payment: "Awaiting Payment",
    pending_transfer: "Pending Bank Transfer"
  },
  paymentMethods: {
    card: "Credit / Debit Card (Stripe)",
    bank: "Direct Bank Transfer",
    paypal: "PayPal Express Checkout"
  }
};

const CONTENT_FR = {
  back: "Retour au tableau de bord",
  title: "Détails de la commande",
  orderId: "Réf. Commande",
  downloadInvoice: "Télécharger la Facture Officielle", 
  loading: "Récupération des détails complets de la commande depuis nos serveurs sécurisés...",
  notFound: "Nous n'avons pas pu localiser la commande demandée. Elle a peut-être été supprimée ou le numéro de référence est incorrect.",
  summary: {
    title: "Résumé de la commande",
    date: "Date d'achat",
    status: "Statut actuel",
    payment: "Méthode de paiement",
    total: "Montant Total Dû"
  },
  customer: {
    shipping: "Destination de livraison",
    billing: "Informations de facturation",
    contact: "Coordonnées du client",
    email: "Adresse Email",
    phone: "Numéro de téléphone" // Added phone label
  },
  items: {
    title: "Articles Achetés",
    prod: "Description du produit",
    price: "Prix Unitaire",
    qty: "Quantité",
    subtotal: "Total Ligne"
  },
  statuses: {
    paid: "Paiement Confirmé",
    processing: "En cours de traitement",
    shipped: "En transit",
    delivered: "Livré avec succès",
    cancelled: "Commande Annulée",
    awaiting_payment: "En attente de paiement",
    pending_transfer: "Virement bancaire en attente"
  },
  paymentMethods: {
    card: "Carte de Crédit / Débit (Stripe)",
    bank: "Virement Bancaire Direct",
    paypal: "Paiement Express PayPal"
  }
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCH ORDER DATA
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching comprehensive order details:", error);
          // Potential error handling state could be added here
        } else {
          setOrder(data);
        }
      } catch (err) {
         console.error("Unexpected error during order fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // LOADING & NOT FOUND STATES
  if (loading) {
      return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 50, textAlign: 'center' }}>
              <div className="loader" style={{ marginBottom: 20, width: 40, height: 40, border: '3px solid #f3f3f3', borderTop: '3px solid #D52D25', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{content.loading}</p>
          </div>
      );
  }
  
  if (!order) {
      return (
          <div style={{ padding: 50, textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <XCircle size={64} color="#cbd5e1" style={{ marginBottom: 20 }} />
              <h2 style={{ color: '#0f172a', marginBottom: 10 }}>Order Not Found</h2>
              <p style={{ color: '#64748b', maxWidth: 400 }}>{content.notFound}</p>
              <button onClick={() => router.push('/dashboard')} style={{ marginTop: 20, padding: '10px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                  {content.back}
              </button>
          </div>
      );
  }

  // DATA PREPARATION & SAFE ACCESS
  const shipping = order.address || {};
  const billing = order.billing_address || {};
  const displayId = order.order_number || order.id.slice(0, 8).toUpperCase();
  const rawCurrency = order.currency || 'EUR';
  const currencySymbol = rawCurrency === 'EUR' ? '€' : rawCurrency === 'CHF' ? 'CHF' : 'Dhs';
  
  // Format Payment Method String
  const getFormattedPaymentMethod = (method: string) => {
      const key = method as keyof typeof content.paymentMethods;
      return content.paymentMethods[key] || method.toUpperCase();
  };

  // ADVANCED STATUS BADGE GENERATOR
  const getStatusBadge = (status: string) => {
    let colorClass = styles.statusGray;
    let icon = <Clock size={16} />;
    
    // Determine visual style based on status string
    switch (status.toLowerCase()) {
        case 'paid':
        case 'delivered':
            colorClass = styles.statusGreen; 
            icon = <CheckCircle size={16} />; 
            break;
        case 'shipped':
            colorClass = styles.statusBlue; 
            icon = <Truck size={16} />; 
            break;
        case 'cancelled':
            colorClass = styles.statusRed; 
            icon = <XCircle size={16} />; 
            break;
        case 'awaiting_payment':
        case 'pending_transfer':
            colorClass = styles.statusOrange || styles.statusGray; // Assuming orange exists, fallback to gray
            icon = <Clock size={16} />;
            break;
        case 'processing':
            colorClass = styles.statusBlue;
            icon = <Package size={16} />;
            break;
        default:
            colorClass = styles.statusGray; 
            icon = <Clock size={16} />;
    }

    const statusText = content.statuses[status as keyof typeof content.statuses] || status.replace('_', ' ').toUpperCase();

    return (
      <span className={`${styles.statusBadge} ${colorClass}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 20, fontWeight: 600, fontSize: '0.85rem' }}>
        {icon} {statusText}
      </span>
    );
  };

  return (
    <div className={styles.container} style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      
      {/* --- TOP NAVIGATION BAR --- */}
      <div style={{ marginBottom: 30, display: 'flex', alignItems: 'center' }}>
          <button 
              onClick={() => router.back()} 
              className={styles.btn} 
              style={{ background: 'transparent', color: '#475569', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #cbd5e1', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={18} /> {content.back}
          </button>
      </div>

      {/* --- HEADER SECTION --- */}
      <div className={styles.header} style={{ 
          borderBottom: 'none', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          gap: 20,
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          marginBottom: '30px'
      }}>
        <div>
          <h1 className={styles.title} style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              {content.title} 
              <span style={{ 
                  backgroundColor: '#f1f5f9', 
                  color: '#475569', 
                  fontSize: '1rem', 
                  padding: '4px 12px', 
                  borderRadius: '6px', 
                  fontFamily: 'monospace',
                  fontWeight: 600
              }}>
                  {displayId}
              </span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginTop: 15 }}>
              {getStatusBadge(order.status)}
              <span style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={14}/> {new Date(order.created_at).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
          </div>
        </div>

        {/* DOWNLOAD INVOICE BUTTON */}
        <button 
          onClick={() => generateInvoicePDF(order)}
          className={styles.btn} 
          style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 10, 
              height: 'fit-content',
              backgroundColor: '#0f172a',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'transform 0.1s ease-in-out, box-shadow 0.2s',
              boxShadow: '0 4px 6px rgba(15, 23, 42, 0.2)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <FileText size={20} /> {content.downloadInvoice}
        </button>
      </div>

      {/* --- DETAILED INFO GRID --- */}
      <div className={styles.grid} style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          marginBottom: '40px' 
      }}>
        
        {/* SHIPPING INFORMATION CARD */}
        <div className={styles.card} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.2rem', color: '#0f172a', margin: '0 0 20px 0', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '8px' }}>
                <Truck size={22} color="#3b82f6"/> 
            </div>
            {content.customer.shipping}
          </h3>
          <div style={{ lineHeight: 1.8, color: '#475569', fontSize: '0.95rem' }}>
            <strong style={{ color: '#0f172a', fontSize: '1.05rem', display: 'block', marginBottom: '8px' }}>
                {shipping.firstName || ''} {shipping.lastName || ''}
            </strong>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                <MapPin size={16} style={{ marginTop: 4, color: '#94a3b8', flexShrink: 0 }}/>
                <span>
                    {shipping.address || 'No Address Provided'}<br/>
                    {shipping.zip || ''} {shipping.city || ''}<br/>
                    <strong style={{ color: '#64748b' }}>{shipping.country || ''}</strong>
                </span>
            </div>
          </div>
        </div>

        {/* CONTACT & BILLING CARD */}
        <div className={styles.card} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.2rem', color: '#0f172a', margin: '0 0 20px 0', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ backgroundColor: '#fdf4ff', padding: '8px', borderRadius: '8px' }}>
                <User size={22} color="#d946ef"/> 
            </div>
            {content.customer.contact}
          </h3>
          
          <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{content.customer.email}:</span>
                      <a href={`mailto:${order.customer_email}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 500 }}>{order.customer_email}</a>
                  </div>
                  {/* DISPLAY PHONE NUMBER */}
                  {(order.customer_phone || shipping.phone || billing.phone) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{content.customer.phone}:</span>
                          <span style={{ color: '#0f172a', fontWeight: 500 }}>{order.customer_phone || shipping.phone || billing.phone}</span>
                      </div>
                  )}
              </div>
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: 20 }}>
             <h4 style={{ fontSize: '1rem', color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                 <FileText size={16} color="#64748b"/> {content.customer.billing}
             </h4>
             <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0, paddingLeft: 24 }}>
               {billing.address ? (
                   <>
                    {billing.firstName} {billing.lastName}<br/>
                    {billing.address}<br/>
                    {billing.zip} {billing.city}, {billing.country}
                   </>
               ) : (
                   <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>Same as shipping address</span>
               )}
             </p>
          </div>
        </div>

        {/* FINANCIAL SUMMARY CARD */}
        <div className={styles.card} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.2rem', color: '#0f172a', margin: '0 0 20px 0', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ backgroundColor: '#ecfdf5', padding: '8px', borderRadius: '8px' }}>
                <CreditCard size={22} color="#10b981"/> 
            </div>
            {content.summary.title}
          </h3>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b' }}>{content.summary.date}</span> 
              <strong style={{ color: '#0f172a' }}>{new Date(order.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b' }}>{content.summary.payment}</span> 
              <strong style={{ color: '#0f172a' }}>{getFormattedPaymentMethod(order.payment_method)}</strong>
            </li>
            
            {/* Break down subtotal and shipping if shipping_cost is available */}
            {order.shipping_cost !== undefined && (
                <>
                    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                      <span style={{ color: '#64748b' }}>Subtotal</span> 
                      <strong style={{ color: '#0f172a' }}>
                          {currencySymbol} {(order.total_amount - (typeof order.shipping_cost === 'number' ? order.shipping_cost : 0)).toLocaleString()}
                      </strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b' }}>Shipping</span> 
                      <strong style={{ color: typeof order.shipping_cost === 'string' ? '#D52D25' : '#0f172a' }}>
                          {typeof order.shipping_cost === 'number' 
                              ? order.shipping_cost === 0 ? 'Free' : `${currencySymbol} ${order.shipping_cost.toLocaleString()}`
                              : order.shipping_cost}
                      </strong>
                    </li>
                </>
            )}

            <li style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderTop: '2px dashed #e2e8f0', 
                marginTop: 8, 
                paddingTop: 16, 
                fontSize: '1.2rem' 
            }}>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{content.summary.total}</span> 
              <strong style={{ color: '#D52D25', fontSize: '1.4rem', fontWeight: 800 }}>
                  {currencySymbol} {order.total_amount?.toLocaleString() || '0'}
              </strong>
            </li>
          </ul>
        </div>
      </div>

      {/* --- ITEMS TABLE SECTION --- */}
      <div className={styles.card} style={{ 
          padding: 0, 
          overflow: 'hidden', 
          backgroundColor: '#ffffff', 
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ 
            padding: '20px 24px', 
            background: '#f8fafc', 
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 12
        }}>
          <div style={{ backgroundColor: '#fef3c7', padding: '8px', borderRadius: '8px' }}>
              <Package size={22} color="#d97706"/>
          </div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>{content.items.title}</h3>
        </div>
        
        <div className={styles.tableWrapper} style={{ overflowX: 'auto' }}>
          <table className={styles.table} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #f1f5f9' }}>
              <tr>
                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{content.items.prod}</th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{content.items.price}</th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>{content.items.qty}</th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>{content.items.subtotal}</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#ffffff' }}>
              {(order.cart_items || []).map((item: any, i: number) => (
                <tr key={i} style={{ borderBottom: i !== order.cart_items.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background-color 0.15s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      {item.image ? (
                        <div style={{ width: 64, height: 64, borderRadius: 8, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                        </div>
                      ) : (
                        <div style={{ width: 64, height: 64, borderRadius: 8, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Package size={24} color="#94a3b8" />
                        </div>
                      )}
                      <div>
                          <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '1.05rem', display: 'block', marginBottom: 4 }}>{item.name}</span>
                          {/* Optional: Add a subtitle or SKU here if available in your item data */}
                          {item.id && <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>SKU: {item.id}</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#475569', fontWeight: 500 }}>
                      {currencySymbol} {item.price?.toLocaleString()}
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: 20, fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
                          x{item.quantity}
                      </span>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right', fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>
                    {currencySymbol} {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* FOOTER OF ITEMS TABLE - Optional Totals Reiteration */}
        <div style={{ padding: '20px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
             <div style={{ textAlign: 'right', minWidth: '200px' }}>
                 <p style={{ margin: '0 0 8px 0', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                     <span>Total Items:</span> 
                     <span style={{ fontWeight: 600, color: '#0f172a' }}>{order.cart_items?.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0)}</span>
                 </p>
                 <p style={{ margin: 0, fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ color: '#0f172a', fontWeight: 600 }}>Grand Total:</span>
                     <span style={{ color: '#D52D25', fontWeight: 800 }}>{currencySymbol} {order.total_amount?.toLocaleString()}</span>
                 </p>
             </div>
        </div>

      </div>

    </div>
  );
}