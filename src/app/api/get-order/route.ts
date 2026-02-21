import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { orderNumber } = await req.json();

        if (!orderNumber) {
            return NextResponse.json({ error: 'Order number required' }, { status: 400 });
        }

        const { data: order, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('order_number', orderNumber)
            .single();

        if (error || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
