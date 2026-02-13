import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover', // Use the latest API version you have
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Determine currency from the first item (assuming all items match context)
    // Default to eur if missing
    const currencyCode = items[0].currency ? items[0].currency.toLowerCase() : 'eur';

    // Map cart items to Stripe Line Items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currencyCode,
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        // Stripe expects amounts in cents (e.g. 10.00 becomes 1000)
        // Ensure your price in context is the raw number (e.g. 2998)
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity,
    }));

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}