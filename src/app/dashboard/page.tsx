'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      // 1. Get Session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      setSession(session);

      // 2. Fetch User Role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile && profile.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

    checkUserRole();
  }, [router]);

  if (loading) return <div style={{padding:50, textAlign:'center'}}>Loading...</div>;
  if (!session) return null;

  return (
    <>
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <ClientDashboard session={session} />
      )}
    </>
  );
}