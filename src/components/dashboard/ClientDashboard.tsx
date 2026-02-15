'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/styles/Dashboard.module.css';
import { Package, MessageSquare, Plus, Clock, LogOut, Download, LayoutGrid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateInvoicePDF } from '@/utils/generateInvoice';
import ClientDate from '@/components/ui/ClientDate';
import StatusBadge from './StatusBadge';

const CONTENT_EN = {
  logout: "Sign Out",
  tabs: { orders: "My Orders", support: "Support Tickets" },
  orders: {
    title: "Order History",
    id: "Order ID",
    date: "Date",
    total: "Total",
    status: "Status",
    invoice: "Invoice",
    empty: "No orders found."
  },
  tickets: {
    title: "Support Tickets",
    newBtn: "New Ticket",
    formTitle: "Create New Ticket",
    formCategory: "Category",
    formSubject: "Subject",
    formMessage: "Message",
    submit: "Submit Ticket",
    cancel: "Cancel",
    empty: "No tickets found.",
    viewChat: "Open Chat",
    categories: {
      general: "General Question",
      warranty: "Warranty Claim",
      technical: "Technical Support",
      shipping: "Shipping Issue"
    },
    statusOpen: "Open",
    statusClosed: "Closed"
  },
  status: {
    paid: "Paid",
    shipped: "Shipped",
    delivered: "Delivered",
    open: "Open",
    closed: "Closed"
  }
};

const CONTENT_FR = {
  logout: "Se déconnecter",
  tabs: { orders: "Mes Commandes", support: "Support Client" },
  orders: {
    title: "Historique des Commandes",
    id: "Réf Commande",
    date: "Date",
    total: "Total",
    status: "Statut",
    invoice: "Facture",
    empty: "Aucune commande trouvée."
  },
  tickets: {
    title: "Tickets de Support",
    newBtn: "Nouveau Ticket",
    formTitle: "Créer un Nouveau Ticket",
    formCategory: "Catégorie",
    formSubject: "Sujet",
    formMessage: "Message",
    submit: "Envoyer",
    cancel: "Annuler",
    empty: "Aucun ticket trouvé.",
    viewChat: "Ouvrir le Chat",
    categories: {
      general: "Question Générale",
      warranty: "Réclamation Garantie",
      technical: "Support Technique",
      shipping: "Problème de Livraison"
    },
    statusOpen: "Ouvert",
    statusClosed: "Fermé"
  },
  status: {
    paid: "Payé",
    shipped: "Expédié",
    delivered: "Livré",
    open: "Ouvert",
    closed: "Fermé"
  }
};

export default function ClientDashboard({ session }: { session: any }) {
  const { language } = useLanguage();
  const router = useRouter();
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const [activeTab, setActiveTab] = useState<'orders' | 'support'>('orders');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    category: 'General Question'
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user) return;

      // 1. Fetch Orders
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', session.user.email)
        .order('created_at', { ascending: false });

      if (orderData) setOrders(orderData);

      // 2. Fetch Tickets
      const { data: ticketData } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (ticketData) setTickets(ticketData);
    };

    fetchData();
  }, [session, isTicketModalOpen]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    // 1. Create Ticket in DB
    const { data: ticketData, error } = await supabase
      .from('tickets')
      .insert([{
        user_id: session.user.id,
        user_email: session.user.email,
        subject: newTicket.subject,
        category: newTicket.category,
        status: 'open',
        message: newTicket.message // Fallback for old schema
      }])
      .select()
      .single();

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    // 2. Create Initial Message in DB
    await supabase.from('ticket_messages').insert([{
      ticket_id: ticketData.id,
      sender_id: session.user.id,
      sender_role: 'user',
      message: newTicket.message
    }]);

    // 3. TRIGGER EMAIL NOTIFICATION (Notify Admin)
    await fetch('/api/send-ticket-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticketId: ticketData.id,
        subject: newTicket.subject,
        ticketCategory: newTicket.category,
        message: newTicket.message,
        senderRole: 'user',
        recipientEmail: 'admin' // Logic handled in API
      })
    });

    // 4. Cleanup
    setNewTicket({ subject: '', message: '', category: 'General Question' });
    setIsTicketModalOpen(false);
    // Re-fetch logic here or force router refresh
    router.refresh();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const openTicketsCount = tickets ? tickets.filter(t => t.status === 'open').length : 0;

  return (
    <div className={styles.container}>
      {/* HEADER SECTION */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{language === 'fr' ? 'Mon Espace' : 'Client Dashboard'}</h1>
          <p className={styles.subtitle}>{session?.user?.email} • {language === 'fr' ? 'Membre depuis 2024' : 'Member since 2024'}</p>
        </div>
        <button
          onClick={handleLogout}
          className={styles.actionBtn}
          style={{ color: '#ef4444', borderColor: '#fee2e2', background: '#fef2f2' }}
        >
          <LogOut size={18} /> {content.logout}
        </button>
      </div>

      {/* KPI STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><Package size={16} /> {content.tabs.orders}</div>
          <div className={styles.statValue}>{orders ? orders.length : 0}</div>
          <div className={styles.statTrend}>{language === 'fr' ? 'Commandes totales' : 'Total Orders Placed'}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><Clock size={16} /> {language === 'fr' ? 'Dernière commande' : 'Last Order'}</div>
          <div className={styles.statValue} style={{ fontSize: '1.5rem' }}>
            {orders && orders.length > 0 ? (
              <ClientDate date={orders[0].created_at} fallback="-" />
            ) : '-'}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><MessageSquare size={16} /> {content.tabs.support}</div>
          <div className={styles.statValue}>{openTicketsCount}</div>
          <div className={styles.statTrend} style={{ color: openTicketsCount > 0 ? '#eab308' : '#64748b' }}>
            {language === 'fr' ? 'Tickets ouverts' : 'Open Tickets'}
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className={styles.tabs}>
        <button className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
          <Package size={18} /> {content.tabs.orders}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'support' ? styles.active : ''}`} onClick={() => setActiveTab('support')}>
          <MessageSquare size={18} /> {content.tabs.support}
        </button>
        <Link href="/dashboard/settings" className={styles.tabBtn} style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '18px' }}>⚙️</span> {language === 'fr' ? 'Paramètres' : 'Settings'}
        </Link>

        {activeTab === 'orders' && (
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'table' ? styles.active : ''}`}
              onClick={() => setViewMode('table')}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        )}
      </div>

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className={styles.grid}>
          {orders.length === 0 ? <p>{content.orders.empty}</p> : (
            <>
              {viewMode === 'grid' ? (
                <div className={styles.grid}>
                  {orders.map(order => (
                    <div key={order.id} className={styles.card} style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Card Header: ID and Status */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                          <small style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {content.orders.id}
                          </small>
                          <div style={{ marginTop: '4px' }}>
                            <Link
                              href={`/dashboard/orders/${order.id}`}
                              style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}
                            >
                              #{order.id.slice(0, 8)}
                            </Link>
                          </div>
                        </div>
                        <StatusBadge status={order.status} labels={content.status} />
                      </div>

                      {/* Card Body: Details */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{content.orders.date}</span>
                        <span style={{ color: '#334155', fontWeight: 500 }}>
                          <ClientDate date={order.created_at} />
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{content.orders.total}</span>
                        <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem' }}>
                          {order.total_amount.toLocaleString()} {order.currency}
                        </span>
                      </div>

                      {/* Card Footer: Actions */}
                      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                        <button
                          onClick={() => generateInvoicePDF(order)}
                          className={styles.btn}
                          style={{
                            width: '100%',
                            background: '#f8fafc',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            justifyContent: 'center',
                            fontSize: '0.9rem'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.color = '#0f172a';
                            e.currentTarget.style.borderColor = '#cbd5e1';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = '#f8fafc';
                            e.currentTarget.style.color = '#475569';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                          }}
                        >
                          <Download size={16} /> {content.orders.invoice}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>{content.orders.id}</th>
                        <th>{content.orders.date}</th>
                        <th style={{ textAlign: 'right' }}>{content.orders.total}</th>
                        <th>{content.orders.status}</th>
                        <th style={{ textAlign: 'center' }}>{content.orders.invoice}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>
                            <Link
                              href={`/dashboard/orders/${order.id}`}
                              style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}
                            >
                              #{order.id.slice(0, 8)}
                            </Link>
                          </td>
                          <td><ClientDate date={order.created_at} /></td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>
                            {order.total_amount.toLocaleString()} {order.currency}
                          </td>
                          <td><StatusBadge status={order.status} labels={content.status} /></td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              onClick={() => generateInvoicePDF(order)}
                              title={content.orders.invoice}
                              style={{
                                background: '#f1f5f9',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer',
                                color: '#64748b',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px',
                                borderRadius: '8px',
                                transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                              onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                            >
                              <Download size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* SUPPORT TAB */}
      {activeTab === 'support' && (
        <div>
          <button className={styles.btn} onClick={() => setIsTicketModalOpen(true)} style={{ marginBottom: 20 }}>
            <Plus size={18} /> {content.tickets.newBtn}
          </button>

          {isTicketModalOpen && (
            <div className={styles.card}>
              <h3>{content.tickets.formTitle}</h3>
              <form onSubmit={handleCreateTicket}>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.tickets.formCategory}</label>
                  <select
                    className={styles.input}
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  >
                    <option value="General Question">{content.tickets.categories.general}</option>
                    <option value="Warranty Claim">{content.tickets.categories.warranty}</option>
                    <option value="Technical Support">{content.tickets.categories.technical}</option>
                    <option value="Shipping Issue">{content.tickets.categories.shipping}</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.tickets.formSubject}</label>
                  <input className={styles.input} required value={newTicket.subject} onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.tickets.formMessage}</label>
                  <textarea className={styles.textarea} rows={4} required value={newTicket.message} onChange={e => setNewTicket({ ...newTicket, message: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="submit" className={styles.btn}>{content.tickets.submit}</button>
                  <button type="button" className={`${styles.btn}`} style={{ background: '#94a3b8' }} onClick={() => setIsTicketModalOpen(false)}>{content.tickets.cancel}</button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.grid}>
            {tickets.length === 0 ? <p>{content.tickets.empty}</p> : tickets.map(ticket => (
              <div key={ticket.id} className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{ticket.subject}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, marginTop: 4, display: 'inline-block' }}>
                      {ticket.category || 'General'}
                    </span>
                  </div>
                  <StatusBadge status={ticket.status} labels={{ open: content.tickets.statusOpen, closed: content.tickets.statusClosed }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <small style={{ color: '#94a3b8' }}>
                    <Clock size={14} style={{ verticalAlign: 'middle' }} /> <ClientDate date={ticket.created_at} />
                  </small>

                  <Link
                    href={`/dashboard/tickets/${ticket.id}`}
                    className={styles.btn}
                    style={{ padding: '6px 12px', fontSize: '0.85rem', textDecoration: 'none' }}
                  >
                    <MessageSquare size={16} /> {content.tickets.viewChat}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}