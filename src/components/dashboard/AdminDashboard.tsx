'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '@/styles/Dashboard.module.css';
import { Package, MessageSquare, RefreshCw, LogOut, Eye, Download, DollarSign, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateInvoicePDF } from '@/utils/generateInvoice';
import ClientDate from '@/components/ui/ClientDate';
import StatusBadge from './StatusBadge';
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
    prices: "Manage Prices",
    users: "Registered Users"
  },
  users: {
    name: "Name",
    contact: "Contact",
    role: "Role",
    address: "Address",
    joined: "Joined",
    empty: "No users found."
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
    prices: "Gérer les Prix",
    users: "Utilisateurs Inscrits"
  },
  users: {
    name: "Nom",
    contact: "Contact",
    role: "Rôle",
    address: "Adresse",
    joined: "Inscrit le",
    empty: "Aucun utilisateur trouvé."
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

  const [activeTab, setActiveTab] = useState<'orders' | 'tickets' | 'prices' | 'users'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchTickets();
    fetchUsers();
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

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
  };

  // --- UPDATE USER ROLE ---
  const updateUserRole = async (id: string, newRole: string) => {
    // 1. Optimistic Update
    const previousRole = users.find(u => u.id === id)?.role;
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));

    try {
      // 2. Update Database via API
      const response = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id, newRole }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update role');
      }
    } catch (error: any) {
      console.error("Failed to update role:", error);
      alert(`Failed to update user role: ${error.message}`);
      // Revert optimism
      setUsers(users.map(u => u.id === id ? { ...u, role: previousRole } : u));
    }
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



  // CALCULATE KPIS
  const totalRevenue = orders && orders.length > 0 ? orders.reduce((acc, o) => acc + (o.status === 'paid' || o.status === 'delivered' || o.status === 'shipped' ? (Number(o.total_amount) || 0) : 0), 0) : 0;
  const pendingOrders = orders ? orders.filter(o => o.status === 'processing' || o.status === 'payment_pending').length : 0;
  const openTickets = tickets ? tickets.filter(t => t.status === 'open').length : 0;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{content.header.title}</h1>
          <p className={styles.subtitle}>{content.header.subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => { fetchOrders(); fetchTickets(); fetchUsers(); }} className={styles.actionBtn}>
            <RefreshCw size={18} className={loading ? 'spin' : ''} /> {language === 'fr' ? 'Actualiser' : 'Refresh'}
          </button>
          <button
            onClick={handleLogout}
            className={styles.btn}
            style={{ background: '#ef4444', color: 'white', padding: '10px 20px' }}
          >
            <LogOut size={16} /> {content.header.logout}
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><DollarSign size={16} /> Total Revenue (Est.)</div>
          <div className={styles.statValue}>€ {totalRevenue.toLocaleString()}</div>
          <div className={styles.statTrend} style={{ color: '#166534' }}>+ Paid Orders</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><Package size={16} /> Pending Actions</div>
          <div className={styles.statValue}>{pendingOrders}</div>
          <div className={styles.statTrend} style={{ color: pendingOrders > 0 ? '#eab308' : '#64748b' }}>Orders to Process</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><MessageSquare size={16} /> Needs Reply</div>
          <div className={styles.statValue}>{openTickets}</div>
          <div className={styles.statTrend} style={{ color: openTickets > 0 ? '#D52D25' : '#64748b' }}>Open Tickets</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}><Users size={16} /> Total Users</div>
          <div className={styles.statValue}>{users?.length || 0}</div>
          <div className={styles.statTrend} style={{ color: '#3b82f6' }}>Registered Accounts</div>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <button className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
          <Package size={18} /> {content.tabs.orders}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'tickets' ? styles.active : ''}`} onClick={() => setActiveTab('tickets')}>
          <MessageSquare size={18} /> {content.tabs.tickets}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'users' ? styles.active : ''}`} onClick={() => setActiveTab('users')}>
          <Users size={18} /> {content.tabs.users}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'prices' ? styles.active : ''}`} onClick={() => setActiveTab('prices')}>
          <DollarSign size={18} /> {content.tabs.prices}
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
                      <StatusBadge status={order.status} labels={content.orders.statuses} />
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
                    {ticket.user_email} • <ClientDate date={ticket.created_at} />
                  </small>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4 }}>
                      {ticket.category || 'General'}
                    </span>
                  </div>
                </div>
                <StatusBadge status={ticket.status} labels={{ open: content.tickets.statusOpen, closed: content.tickets.statusClosed }} />
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

      {/* USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className={styles.tableWrapper}>
          {users.length === 0 ? (
            <p>{content.users.empty}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{content.users.name}</th>
                  <th>{content.users.contact}</th>
                  <th>{content.users.role}</th>
                  <th>{content.users.address}</th>
                  <th>{content.users.joined}</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.first_name} {user.last_name}</strong>
                    </td>
                    <td>
                      <div>{user.phone || '-'}</div>
                      <small style={{ color: '#64748b' }}>{user.email || ''}</small>
                    </td>
                    <td>
                      <select
                        className={styles.input}
                        value={user.role || 'user'}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        style={{ padding: '6px', fontSize: '0.85rem', width: '100px' }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.9rem' }}>{user.address}</div>
                      <small style={{ color: '#64748b' }}>
                        {user.city && user.zip ? `${user.city}, ${user.zip}` : user.city}
                      </small>
                      {user.country && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.country}</div>}
                    </td>
                    <td>
                      <ClientDate date={user.created_at} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* PRICE MANAGEMENT */}
      {activeTab === 'prices' && (
        <PriceManagement />
      )}
    </div>
  );
}