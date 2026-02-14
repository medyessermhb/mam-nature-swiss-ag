'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '@/styles/Dashboard.module.css';
import { Package, MessageSquare, RefreshCw, LogOut, Eye, Download, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateInvoicePDF } from '@/utils/generateInvoice';
import PriceManagement from './PriceManagement';

const CONTENT_EN = {
  header: {
    title: "Admin Panel",
    subtitle: "Manage orders and support tickets.",
    logout: "Sign Out"
  },
  tabs: {
    orders: "Manage Orders",
    tickets: "Support Tickets",
    prices: "Manage Prices"
  },
  orders: {
    customer: "Customer",
    total: "Total",
    payment: "Payment",
    status: "Status",
    action: "Action",
    empty: "No orders found.",
    statuses: {
      paid: "Paid",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      awaiting_payment: "Awaiting Payment",
      pending_transfer: "Pending Transfer",
      payment_pending: "Payment Pending"
    }
  },
  tickets: {
    empty: "No support tickets found.",
    viewChat: "Open Chat & Reply",
    statusOpen: "Open",
    statusClosed: "Closed"
  }
};

const CONTENT_FR = {
  header: {
    title: "Panneau Admin",
    subtitle: "Gérez les commandes et les tickets de support.",
    logout: "Se déconnecter"
  },
  tabs: {
    orders: "Gérer les Commandes",
    tickets: "Tickets de Support",
    prices: "Gérer les Prix"
  },
  orders: {
    customer: "Client",
    total: "Total",
    payment: "Paiement",
    status: "Statut",
    action: "Action",
    empty: "Aucune commande trouvée.",
    statuses: {
      paid: "Payé",
      processing: "Traitement",
      shipped: "Expédié",
      delivered: "Livré",
      cancelled: "Annulé",
      awaiting_payment: "En attente de paiement", // Payment manually sent
      pending_transfer: "Virement en attente", // Legacy
      payment_pending: "Paiement en attente" // Stripe Redirect
    }
  },
  tickets: {
    empty: "Aucun ticket de support trouvé.",
    viewChat: "Ouvrir le Chat & Répondre",
    statusOpen: "Ouvert",
    statusClosed: "Fermé"
  }
};

export default function AdminDashboard() {
  const { language } = useLanguage();
  const router = useRouter();
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const [activeTab, setActiveTab] = useState<'orders' | 'tickets' | 'prices'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchTickets();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  const fetchTickets = async () => {
    const { data } = await supabase.from('tickets').select('*').order('created_at', { ascending: false });
    if (data) setTickets(data);
  };

  // --- UPDATED: UPDATE STATUS AND SEND EMAIL ---
  const updateOrderStatus = async (id: string, newStatus: string, orderData: any) => {
    // 1. Optimistic UI update
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

    // 2. Update Database
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);

    if (error) {
      console.error("Failed to update status in DB:", error);
      alert("Failed to update status in database.");
      return;
    }

    // 3. Trigger Email Notification
    // We only send emails for major status changes that the customer needs to know about.
    const notableStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

    if (notableStatuses.includes(newStatus)) {
      try {
        await fetch('/api/send-status-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: orderData.customer_email,
            firstName: orderData.customer_name.split(' ')[0],
            orderNumber: orderData.order_number || orderData.id.slice(0, 8).toUpperCase(),
            newStatus: newStatus,
            language: language // Sends in the admin's current language, or you could read from a user pref if saved
          })
        });
        console.log(`Email triggered for status: ${newStatus}`);
      } catch (emailError) {
        console.error("Failed to trigger status email:", emailError);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const getStatusColor = (status: string) => {
    if (status === 'paid' || status === 'delivered') return styles.statusGreen;
    if (status === 'shipped' || status === 'processing') return styles.statusBlue;
    if (status === 'cancelled') return styles.statusRed;
    return styles.statusGray; // For awaiting_payment, pending_transfer, etc.
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className={styles.title}>{content.header.title}</h1>
            <p>{content.header.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={activeTab === 'orders' ? fetchOrders : fetchTickets} className={styles.actionBtn}>
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
            <button
              onClick={handleLogout}
              className={styles.btn}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <LogOut size={16} /> {content.header.logout}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
          <Package size={18} style={{ marginRight: 8 }} /> {content.tabs.orders}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'tickets' ? styles.active : ''}`} onClick={() => setActiveTab('tickets')}>
          <MessageSquare size={18} style={{ marginRight: 8 }} /> {content.tabs.tickets}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'prices' ? styles.active : ''}`} onClick={() => setActiveTab('prices')}>
          <DollarSign size={18} style={{ marginRight: 8 }} /> {content.tabs.prices}
        </button>
      </div>

      {/* ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className={styles.tableWrapper}>
          {orders.length === 0 ? (
            <p>{content.orders.empty}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{content.orders.customer}</th>
                  <th>{content.orders.total}</th>
                  <th>{content.orders.payment}</th>
                  <th>{content.orders.status}</th>
                  <th>{content.orders.action}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.customer_name}</strong><br />
                      <small style={{ color: '#64748b' }}>{order.customer_email}</small><br />
                      <small style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{order.order_number || `#${order.id.slice(0, 8)}`}</small>
                    </td>
                    <td>{order.total_amount.toLocaleString()} {order.currency}</td>
                    <td style={{ textTransform: 'capitalize' }}>{order.payment_method}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusColor(order.status)}`}>
                        {content.orders.statuses[order.status as keyof typeof content.orders.statuses] || order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {/* UPDATE STATUS DROPDOWN */}
                        <select
                          className={styles.input}
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value, order)}
                          style={{ padding: '6px', fontSize: '0.85rem', width: '140px' }}
                        >
                          <option value="awaiting_payment">{content.orders.statuses.awaiting_payment}</option>
                          <option value="pending_transfer">{content.orders.statuses.pending_transfer}</option>
                          <option value="paid">{content.orders.statuses.paid}</option>
                          <option value="processing">{content.orders.statuses.processing}</option>
                          <option value="shipped">{content.orders.statuses.shipped}</option>
                          <option value="delivered">{content.orders.statuses.delivered}</option>
                          <option value="cancelled">{content.orders.statuses.cancelled}</option>
                        </select>

                        {/* View Order */}
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className={styles.actionBtn}
                          title="View Details"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Eye size={18} />
                        </Link>

                        {/* Download Invoice */}
                        <button
                          onClick={() => generateInvoicePDF(order)}
                          className={styles.actionBtn}
                          title="Download Invoice"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TICKETS MANAGEMENT */}
      {activeTab === 'tickets' && (
        <div className={styles.grid}>
          {tickets.length === 0 ? <p>{content.tickets.empty}</p> : tickets.map(ticket => (
            <div key={ticket.id} className={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <h4 style={{ margin: 0 }}>{ticket.subject}</h4>
                  <small style={{ color: '#64748b' }}>
                    {ticket.user_email} • {new Date(ticket.created_at).toLocaleDateString()}
                  </small>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4 }}>
                      {ticket.category || 'General'}
                    </span>
                  </div>
                </div>
                <span className={`${styles.statusBadge} ${ticket.status === 'open' ? styles.statusYellow : styles.statusGreen}`}>
                  {ticket.status === 'open' ? content.tickets.statusOpen : content.tickets.statusClosed}
                </span>
              </div>

              <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Link
                  href={`/dashboard/tickets/${ticket.id}`}
                  className={styles.btn}
                  style={{ padding: '8px 16px', fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  <MessageSquare size={16} /> {content.tickets.viewChat}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PRICE MANAGEMENT */}
      {activeTab === 'prices' && (
        <PriceManagement />
      )}
    </div>
  );
}