'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/styles/Dashboard.module.css';
import { Package, MessageSquare, Plus, Clock, LogOut, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateInvoicePDF } from '@/utils/generateInvoice'; // Import the generator

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
    }
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
    }
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

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('paid')) return <span className={`${styles.statusBadge} ${styles.statusBlue}`}>{content.status.paid}</span>;
    if (s.includes('ship')) return <span className={`${styles.statusBadge} ${styles.statusYellow}`}>{content.status.shipped}</span>;
    if (s.includes('deliver')) return <span className={`${styles.statusBadge} ${styles.statusGreen}`}>{content.status.delivered}</span>;
    if (s === 'open') return <span className={`${styles.statusBadge} ${styles.statusBlue}`}>{content.status.open}</span>;
    return <span className={`${styles.statusBadge} ${styles.statusGray}`}>{status}</span>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p>{session.user.email}</p>
          </div>
          <button 
            onClick={handleLogout} 
            className={styles.btn} 
            style={{background: '#ef4444', color: 'white', border: 'none'}}
          >
            <LogOut size={18} /> {content.logout}
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>
          <Package size={18} style={{marginRight:8}} /> {content.tabs.orders}
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'support' ? styles.active : ''}`} onClick={() => setActiveTab('support')}>
          <MessageSquare size={18} style={{marginRight:8}} /> {content.tabs.support}
        </button>
      </div>

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className={styles.grid}>
          {orders.length === 0 ? <p>{content.orders.empty}</p> : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{content.orders.id}</th>
                    <th>{content.orders.date}</th>
                    <th>{content.orders.total}</th>
                    <th>{content.orders.status}</th>
                    <th>{content.orders.invoice}</th> 
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <Link 
                          href={`/dashboard/orders/${order.id}`} 
                          style={{color:'#2563eb', textDecoration:'underline', fontWeight:600}}
                        >
                          #{order.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>{order.total_amount.toLocaleString()} {order.currency}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <button 
                          onClick={() => generateInvoicePDF(order)}
                          title={content.orders.invoice}
                          style={{background:'none', border:'none', cursor:'pointer', color:'#64748b', display:'flex', alignItems:'center', gap:5}}
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
        </div>
      )}

      {/* SUPPORT TAB */}
      {activeTab === 'support' && (
        <div>
          <button className={styles.btn} onClick={() => setIsTicketModalOpen(true)} style={{marginBottom: 20}}>
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
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  >
                    <option value="General Question">{content.tickets.categories.general}</option>
                    <option value="Warranty Claim">{content.tickets.categories.warranty}</option>
                    <option value="Technical Support">{content.tickets.categories.technical}</option>
                    <option value="Shipping Issue">{content.tickets.categories.shipping}</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.tickets.formSubject}</label>
                  <input className={styles.input} required value={newTicket.subject} onChange={e => setNewTicket({...newTicket, subject: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{content.tickets.formMessage}</label>
                  <textarea className={styles.textarea} rows={4} required value={newTicket.message} onChange={e => setNewTicket({...newTicket, message: e.target.value})} />
                </div>
                <div style={{display:'flex', gap:10}}>
                  <button type="submit" className={styles.btn}>{content.tickets.submit}</button>
                  <button type="button" className={`${styles.btn}`} style={{background:'#94a3b8'}} onClick={() => setIsTicketModalOpen(false)}>{content.tickets.cancel}</button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.grid}>
            {tickets.length === 0 ? <p>{content.tickets.empty}</p> : tickets.map(ticket => (
              <div key={ticket.id} className={styles.card}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom: 10}}>
                  <div>
                    <h4 style={{margin:0, fontSize:'1.1rem'}}>{ticket.subject}</h4>
                    <span style={{fontSize:'0.8rem', color:'#64748b', background:'#f1f5f9', padding:'2px 8px', borderRadius:4, marginTop:4, display:'inline-block'}}>
                      {ticket.category || 'General'}
                    </span>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                  <small style={{color:'#94a3b8'}}>
                    <Clock size={14} style={{verticalAlign:'middle'}} /> {new Date(ticket.created_at).toLocaleDateString()}
                  </small>
                  
                  <Link 
                    href={`/dashboard/tickets/${ticket.id}`}
                    className={styles.btn}
                    style={{padding:'6px 12px', fontSize:'0.85rem', textDecoration:'none'}}
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