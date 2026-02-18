import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    try {
        const { orderId, newStatus, trackingNumber, trackingLink } = await req.json();

        if (!orderId || !newStatus) {
            return NextResponse.json({ error: 'Missing orderId or newStatus' }, { status: 400 });
        }

        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!serviceRoleKey) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
            return NextResponse.json({ error: 'Server Authorization Error: Missing Service Role Key' }, { status: 500 });
        }

        // Initialize Supabase with Service Role Key to bypass RLS
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // Prepare update object
        const updateData: any = { status: newStatus };
        if (trackingNumber !== undefined) updateData.tracking_number = trackingNumber;
        if (trackingLink !== undefined) updateData.tracking_link = trackingLink;

        // Update the order status
        const { error } = await supabaseAdmin
            .from('orders')
            .update(updateData)
            .eq('id', orderId);

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
