import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

const calculateOrderAmount = (items: any[]) => {
  const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  return Math.round(total * 100); 
};

export async function POST(request: Request) {
  try {
    const { items, currency, shippingCost, payment_intent_id } = await request.json();

    // 1. Calculate Amount
    let amount = calculateOrderAmount(items);
    if (shippingCost) {
      amount += Math.round(shippingCost * 100);
    }

    // 2. Normalize Currency (Stripe requires 'mad' for Dhs)
    const validCurrency = (currency === 'Dhs' || currency === 'MAD') ? 'mad' : currency.toLowerCase();

    let paymentIntent;

    if (payment_intent_id) {
      // === OPTION A: UPDATE EXISTING INTENT ===
      // This prevents the "Duplicate / Incomplete" logs in Stripe
      paymentIntent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: amount,
        currency: validCurrency,
      });
    } else {
      // === OPTION B: CREATE NEW INTENT ===
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: validCurrency,
        automatic_payment_methods: { enabled: true },
        metadata: { currency_used: currency }
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id // We return the ID so the frontend can save it
    });

  } catch (error: any) {
    console.error('Internal Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}