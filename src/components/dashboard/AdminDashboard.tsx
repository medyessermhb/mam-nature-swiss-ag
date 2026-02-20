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
import { PRICES } from '@/data/prices';

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

const CONTENT_DE = {
  header: {
    title: "Admin-Panel",
    subtitle: "Bestellungen und Support-Tickets verwalten.",
    logout: "Abmelden"
  },
  tabs: {
    orders: "Bestellungen",
    tickets: "Support-Tickets",
    prices: "Preise verwalten",
    users: "Registrierte Benutzer"
  },
  users: {
    name: "Name",
    contact: "Kontakt",
    role: "Rolle",
    address: "Adresse",
    joined: "Beigetreten am",
    empty: "Keine Benutzer gefunden."
  },
  orders: {
    customer: "Kunde",
    total: "Gesamt",
    payment: "Zahlung",
    status: "Status",
    action: "Aktion",
    empty: "Keine Bestellungen gefunden.",
    statuses: {
      paid: "Bezahlt",
      processing: "In Bearbeitung",
      shipped: "Versandt",
      delivered: "Zugestellt",
      cancelled: "Storniert",
      awaiting_payment: "Warten auf Zahlung",
      pending_transfer: "Überweisung ausstehend",
      payment_pending: "Zahlung ausstehend"
    }
  },
  tickets: {
    empty: "Keine Support-Tickets gefunden.",
    viewChat: "Chat öffnen & antworten",
    statusOpen: "Offen",
    statusClosed: "Geschlossen"
  }
};

const CONTENT_ES = {
  header: {
    title: "Panel de Administración",
    subtitle: "Gestionar pedidos y tickets de soporte.",
    logout: "Cerrar Sesión"
  },
  tabs: {
    orders: "Gestionar Pedidos",
    tickets: "Tickets de Soporte",
    prices: "Gestionar Precios",
    users: "Usuarios Registrados"
  },
  users: {
    name: "Nombre",
    contact: "Contacto",
    role: "Rol",
    address: "Dirección",
    joined: "Registrado",
    empty: "No se encontraron usuarios."
  },
  orders: {
    customer: "Cliente",
    total: "Total",
    payment: "Pago",
    status: "Estado",
    action: "Acción",
    empty: "No se encontraron pedidos.",
    statuses: {
      paid: "Pagado",
      processing: "Procesando",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
      awaiting_payment: "Esperando Pago",
      pending_transfer: "Transferencia Pendiente",
      payment_pending: "Pago Pendiente"
    }
  },
  tickets: {
    empty: "No se encontraron tickets de soporte.",
    viewChat: "Abrir Chat y Responder",
    statusOpen: "Abierto",
    statusClosed: "Cerrado"
  }
};

export default function AdminDashboard() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const isSpanish = language === 'es';
  const router = useRouter();
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : isSpanish ? CONTENT_ES : CONTENT_EN;

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

  // --- SHIPPING MODAL STATE ---
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [shippingData, setShippingData] = useState({ orderId: '', trackingNumber: '', trackingLink: '' });

  // --- UPDATED: UPDATE STATUS AND SEND EMAIL ---
  const handleStatusChange = (id: string, newStatus: string, orderData: any) => {
    if (newStatus === 'shipped') {
      setShippingData({ orderId: id, trackingNumber: orderData.tracking_number || '', trackingLink: orderData.tracking_link || '' });
      setIsShippingModalOpen(true);
      return;
    }
    updateOrderStatus(id, newStatus, orderData);
  };

  const confirmShipping = async () => {
    if (!shippingData.trackingNumber) {
      alert("Please enter a tracking number.");
      return;
    }
    await updateOrderStatus(shippingData.orderId, 'shipped', null, shippingData.trackingNumber, shippingData.trackingLink);
    setIsShippingModalOpen(false);
  };

  const updateOrderStatus = async (id: string, newStatus: string, orderData: any | null, trackingNumber?: string, trackingLink?: string) => {
    // 1. Optimistic UI update
    const prevOrders = [...orders];
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus, tracking_number: trackingNumber, tracking_link: trackingLink } : o));

    // 2. Update Database (via API to bypass RLS)
    try {
      const response = await fetch('/api/admin/update-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: id,
          newStatus,
          trackingNumber,
          trackingLink
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update status');
      }
    } catch (error: any) {
      console.error("Failed to update status in DB:", error);
      alert(`Failed to update status: ${error.message}`);
      // Revert optimism if failed
      setOrders(prevOrders);
      return;
    }

    // 3. Trigger Email Notification
    const notableStatuses = ['paid', 'processing', 'shipped', 'delivered', 'cancelled'];

    // Retrieve fresh order data if not passed (e.g. from modal)
    const currentOrder = orderData || orders.find(o => o.id === id);

    if (notableStatuses.includes(newStatus)) {
      try {
        await fetch('/api/send-status-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: currentOrder.customer_email,
            firstName: currentOrder.customer_name.split(' ')[0],
            orderNumber: currentOrder.order_number || currentOrder.id.slice(0, 8).toUpperCase(),
            newStatus: newStatus,
            language: language,
            trackingNumber: trackingNumber,
            trackingLink: trackingLink
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



  // --- PRICE MAPPING ---
  const ID_TO_PRICE_KEY: Record<string, string> = {
    'eco-set': 'mam-nature-eco-set',
    'eco-set-plus': 'mam-nature-eco-set-plus',
    'complete-set': 'mam-nature-water-treatment-complete-set',
    'complete-set-plus': 'mam-nature-water-treatment-complete-set-plus',
    'particle-filter': 'water-particle-filter',
    'water-lime': 'mam-nature-water-lime',
    'dynamizer': 'the-swiss-water-dynamizer',
    'particle-lime-set': 'mam-nature-particle-lime-set',
    'hydrogen-booster': 'swiss-hydrogen-booster',
    'cartridge': 'water-fine-filter-cartridge',
    // Matches
    'mam-nature-essential-set': 'mam-nature-essential-set',
    'mam-nature-essential-plus': 'mam-nature-essential-plus',
    // French IDs (if different) - usually same IDs used in code
  };

  const getBaseEuroPrice = (id: string): number => {
    const key = ID_TO_PRICE_KEY[id] || id; // Fallback to ID if no map
    // Import PRICES from data/prices (we need to move this outside or import)
    // For now, hardcoding or importing is tricky inside a function if not imported.
    // I will use the imported PRICES if I add the import.
    // Assuming PRICES is imported below.
    const priceGroup = PRICES[key];
    if (priceGroup) return priceGroup.Europe;
    return 0;
  };

  // CALCULATE KPIS
  // CALCULATE KPIS
  const totalRevenue = orders && orders.length > 0 ? orders.reduce((acc, o) => {
    // Filter valid statuses
    if (o.status === 'paid' || o.status === 'delivered' || o.status === 'shipped') {
      // Use actual order total converted to EUR
      let orderTotal = Number(o.total_amount) || 0;
      const currency = o.currency ? o.currency.toUpperCase() : 'EUR';

      // Conversion Rates (Approximate, can be refined)
      if (currency === 'CHF') {
        orderTotal = orderTotal / 1.07; // Assuming 1 EUR = ~1.07 CHF (inverse of 1.07 markup?) 
        // Actually, previous logic multiplied by 1.07 to go TO EUR? No, usually CHF is stronger/similar.
        // Let's stick to a standard rate. 
        // If 1 EUR = 0.94 CHF. 
        // Standard in code was: shipping * 1.07. That implies CHF -> EUR is * 1.07? No, CHF is usually ~1 EUR.
        // Let's check the prices. eco-set: CHF 1070, EUR 1150. 
        // 1070 * 1.075 = 1150. So CHF * 1.075 = EUR.
        orderTotal = orderTotal * (1150 / 1070); // ~1.075
      } else if (currency === 'MAD' || currency === 'DHS') {
        // eco-set: MAD 12299, EUR 1150.
        // Rate: 12299 / 1150 = 10.695.
        // So MAD / 10.7 = EUR.
        orderTotal = orderTotal / 10.7;
      }

      return acc + orderTotal;
    }
    return acc;
  }, 0) : 0;
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
            <RefreshCw size={18} className={loading ? 'spin' : ''} /> {isFrench ? 'Actualiser' : isGerman ? 'Aktualisieren' : 'Refresh'}
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
          <div className={styles.statValue}>€ {Math.floor(totalRevenue).toLocaleString()}</div>
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
                          onChange={(e) => handleStatusChange(order.id, e.target.value, order)}
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

      {/* SHIPPING INFO MODAL */}
      {isShippingModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
            <h3 style={{ marginTop: 0 }}>Shipping Information</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Enter tracking details for this order.</p>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Tracking Number *</label>
              <input
                type="text"
                className={styles.input}
                style={{ width: '100%' }}
                value={shippingData.trackingNumber}
                onChange={(e) => setShippingData({ ...shippingData, trackingNumber: e.target.value })}
                placeholder="e.g. 1Z9999999999999999"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Tracking Link</label>
              <input
                type="text"
                className={styles.input}
                style={{ width: '100%' }}
                value={shippingData.trackingLink}
                onChange={(e) => setShippingData({ ...shippingData, trackingLink: e.target.value })}
                placeholder="https://ups.com/track?..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsShippingModalOpen(false)}
                className={styles.btn}
                style={{ background: '#e2e8f0', color: '#0f172a' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmShipping}
                className={styles.btn}
                style={{ background: '#2563eb', color: 'white' }}
              >
                Confirm & Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}