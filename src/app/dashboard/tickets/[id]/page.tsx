'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/styles/Dashboard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send, User, ShieldCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

const CONTENT_EN = {
  back: "Back to Dashboard",
  loading: "Loading conversation...",
  placeholder: "Type your reply...",
  send: "Send Reply",
  status: "Status",
  category: "Category",
  roles: { user: "You", admin: "Support Team" },
  closedMsg: "This ticket is closed. You can no longer reply."
};

const CONTENT_FR = {
  back: "Retour au tableau de bord",
  loading: "Chargement de la conversation...",
  placeholder: "Écrivez votre réponse...",
  send: "Envoyer",
  status: "Statut",
  category: "Catégorie",
  roles: { user: "Vous", admin: "Équipe Support" },
  closedMsg: "Ce ticket est fermé. Vous ne pouvez plus répondre."
};

export default function TicketChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUserId(session.user.id);
      fetchTicketData();
    };
    init();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchTicketData = async () => {
    if (!id) return;

    // 1. Fetch Ticket Header
    const { data: ticketData } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (ticketData) setTicket(ticketData);

    // 2. Fetch Messages
    const { data: msgData } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', id)
      .order('created_at', { ascending: true });

    if (msgData) setMessages(msgData);
    setLoading(false);
  };

const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newMessage.trim() || !userId) return;

  const isOwner = ticket.user_id === userId;
  const role = isOwner ? 'user' : 'admin';

  // 1. Insert Message to DB
  const { error } = await supabase.from('ticket_messages').insert([{
    ticket_id: id,
    sender_id: userId,
    sender_role: role,
    message: newMessage
  }]);

  if (!error) {
    // 2. TRIGGER EMAIL NOTIFICATION
    // If I am User -> Send to Admin. If I am Admin -> Send to User (ticket.user_email)
    await fetch('/api/send-ticket-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticketId: id,
        subject: ticket.subject,
        ticketCategory: ticket.category,
        message: newMessage,
        senderRole: role, 
        recipientEmail: ticket.user_email 
      })
    });

    setNewMessage('');
    fetchTicketData(); // Refresh UI
    
    // Re-open ticket if user replies
    if (role === 'user' && ticket.status === 'closed') {
       await supabase.from('tickets').update({ status: 'open' }).eq('id', id);
    }
  }
};

  if (loading) return <div style={{padding:50, textAlign:'center'}}>{content.loading}</div>;
  if (!ticket) return <div style={{padding:50, textAlign:'center'}}>Ticket not found</div>;

  const isClosed = ticket.status === 'closed';

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.btn} style={{background:'none', color:'#64748b', padding:0, marginBottom:20}}>
        <ArrowLeft size={18} /> {content.back}
      </button>

      {/* HEADER */}
      <div className={styles.card} style={{borderLeft: '5px solid #0f172a'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <h1 className={styles.title} style={{fontSize:'1.5rem', marginBottom:5}}>{ticket.subject}</h1>
            <p style={{color:'#64748b', margin:0}}>
              <strong>{content.category}:</strong> {ticket.category} • 
              <span style={{marginLeft:10}}>{new Date(ticket.created_at).toLocaleDateString()}</span>
            </p>
          </div>
          <span className={`${styles.statusBadge} ${isClosed ? styles.statusGray : styles.statusGreen}`}>
             {isClosed ? <XCircle size={16}/> : <CheckCircle size={16}/>} 
             <span style={{marginLeft:5, textTransform:'capitalize'}}>{ticket.status}</span>
          </span>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className={styles.card} style={{background:'#f8fafc', minHeight:'400px', display:'flex', flexDirection:'column'}}>
        <div style={{flex:1, display:'flex', flexDirection:'column', gap:15, marginBottom:20, maxHeight:'600px', overflowY:'auto', paddingRight:5}}>
          {messages.length === 0 && <p style={{textAlign:'center', color:'#94a3b8', fontStyle:'italic'}}>No messages yet.</p>}
          
          {messages.map((msg) => {
            const isMe = msg.sender_id === userId;
            const isAdmin = msg.sender_role === 'admin';
            
            return (
              <div key={msg.id} style={{
                display:'flex', 
                flexDirection:'column', 
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                maxWidth:'70%'
              }}>
                <div style={{
                  display:'flex', 
                  alignItems:'center', 
                  gap:6, 
                  marginBottom:4,
                  flexDirection: isMe ? 'row-reverse' : 'row',
                  fontSize:'0.8rem', color:'#64748b'
                }}>
                   {isAdmin ? <ShieldCheck size={14} color="#D52D25"/> : <User size={14}/>}
                   <span>{isAdmin ? content.roles.admin : content.roles.user}</span>
                   <span>• {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div style={{
                  background: isMe ? '#0f172a' : '#ffffff',
                  color: isMe ? 'white' : '#1e293b',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  borderTopRightRadius: isMe ? '2px' : '12px',
                  borderTopLeftRadius: isMe ? '12px' : '2px',
                  border: isMe ? 'none' : '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  {msg.message}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        {isClosed ? (
           <div style={{padding:15, background:'#f1f5f9', borderRadius:8, textAlign:'center', color:'#64748b'}}>
             {content.closedMsg}
           </div>
        ) : (
          <form onSubmit={handleSendMessage} style={{display:'flex', gap:10, borderTop:'1px solid #e2e8f0', paddingTop:20}}>
            <input 
              className={styles.input} 
              placeholder={content.placeholder}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{flex:1}}
            />
            <button type="submit" className={styles.btn}>
              <Send size={18} /> {content.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}