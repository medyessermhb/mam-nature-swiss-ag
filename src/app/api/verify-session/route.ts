import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase'; // OR import { createClient } ... if using server client
// Note: Depending on your setup, you might need a Server-side Supabase Client to bypass RLS if you didn't fix RLS for public.
// But we fixed RLS to allow public INSERT. So standard client or just a new client is fine.
// Better to use a Service Role client for this to ensure it ALWAYS works server-side regardless of RLS.
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
});

// Create a Service Role client for Admin access (Safe on server)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
        }

        // 1. Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Payment not paid' }, { status: 400 });
        }

        const { metadata, payment_intent } = session;

        if (!metadata || !metadata.order_number) {
            // Maybe it was already created or missing data?
            return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
        }

        // 2. Check if Order already exists
        const { data: existingOrder } = await supabaseAdmin
            .from('orders')
            .select('*') // Select ALL fields to return to client
            .eq('order_number', metadata.order_number)
            .single();

        if (existingOrder) {
            // Order already created (maybe webhook handled it or user refreshed page)
            // Return the existing order so client can display it
            return NextResponse.json({ success: true, order: existingOrder });
        }

        // 3. Parse Metadata
        const shippingAddress = JSON.parse(metadata.shipping_address_json || '{}');
        const billingAddress = JSON.parse(metadata.billing_address_json || '{}');
        const cartItems = JSON.parse(metadata.cart_items_json || '[]');

        // 4. Create Order Object
        let userId = null;

        // Try to find user by email to associate order
        // Note: 'profiles' table usually has email. If not, we can't easily link without auth id.
        // But since we use Service Role we can query profiles.
        const { data: userProfile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', metadata.customer_email)
            .single();

        if (userProfile) {
            userId = userProfile.id;
        }

        const orderData = {
            order_number: metadata.order_number,
            customer_email: metadata.customer_email,
            customer_name: metadata.customer_name,
            customer_phone: metadata.customer_phone,
            address: shippingAddress,
            billing_address: billingAddress,
            cart_items: cartItems,
            shipping_cost: parseFloat(metadata.shipping_cost || '0'),
            total_amount: parseFloat(metadata.total_amount || '0'),
            currency: metadata.currency,
            vat_rate: parseFloat(metadata.vat_rate || '0'),
            vat_amount: parseFloat(metadata.vat_amount || '0'),
            status: 'paid', // Explicitly set to 'paid' (or mapped to 'paid' in DB enum if needed)
            payment_method: 'card',
            stripe_payment_id: typeof payment_intent === 'string' ? payment_intent : session.id,
            created_at: new Date().toISOString(),
            user_id: userId // Associate if found
        };

        // 5. Insert into Supabase
        const { error, data: newOrder } = await supabaseAdmin
            .from('orders')
            .insert(orderData)
            .select() // Return the inserted data incase TS needs id
            .single();

        if (error) {
            console.error("Supabase Insert Error:", error);
            throw error;
        }

        // Return the full order data
        return NextResponse.json({ success: true, order: newOrder });

    } catch (err: any) {
        console.error("Verify Session Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
