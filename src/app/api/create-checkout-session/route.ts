import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(req: Request) {
  try {
    // 1. Destructure orderNumber from request
    const { items, currency, shippingCost, customerEmail, orderNumber } = await req.json();

    // 2. Normalize Currency
    const stripeCurrency = (currency === 'Dhs' || currency === 'MAD') ? 'mad' : currency.toLowerCase();

    // 3. Map Cart Items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: stripeCurrency,
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // 4. Add Shipping
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: 'Shipping Cost',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // 5. Create Session with Metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata: {
        customer_email: customerEmail,
        order_number: orderNumber // <--- SAVED IN STRIPE DASHBOARD
      }
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}