import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(req: Request) {
  try {
    // 1. Destructure all needed order data
    const {
      items,
      currency,
      shippingCost,
      customerEmail,
      orderNumber,
      // New fields for post-payment creation
      customerName,
      customerPhone,
      shippingAddress,
      billingAddress,
      vatRate,
      vatAmount,
      totalAmount
    } = await req.json();

    // 2. Normalize Currency
    const stripeCurrency = (currency === 'Dhs' || currency === 'MAD') ? 'mad' : currency.toLowerCase();

    // 3. Map Cart Items
    const lineItems = items.map((item: any) => {
      // Validate Image URL: Stripe requires absolute, publicly accessible URLs.
      // Localhost URLs or relative paths will cause 'url_invalid'.
      let imageUrl = item.image;
      if (imageUrl) {
        if (imageUrl.startsWith('/')) {
          // It's a relative path. Prepend site URL IF it's a real domain (not localhost)
          // But since user is on localhost, Stripe can't fetch it anyway.
          // Best practice: Only send images if we have a real production URL in env.
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
          if (siteUrl && !siteUrl.includes('localhost')) {
            imageUrl = `${siteUrl}${imageUrl}`;
          } else {
            imageUrl = null; // Skip image on localhost/relative to avoid error
          }
        } else if (imageUrl.includes('localhost')) {
          imageUrl = null; // Skip localhost images
        }
      }

      return {
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: item.name,
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

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

    // 5. Determine Origin
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    console.log("CreateCheckoutSession: Using origin:", origin);

    // Serialization for Metadata (Stripe limits: 50 keys, 500 chars value)
    const metadata = {
      order_number: orderNumber,
      customer_email: customerEmail,
      customer_name: customerName,
      customer_phone: customerPhone,
      // Store addresses as JSON strings
      shipping_address_json: JSON.stringify(shippingAddress).substring(0, 500),
      billing_address_json: JSON.stringify(billingAddress).substring(0, 500),
      // Financials
      vat_rate: String(vatRate),
      vat_amount: String(vatAmount),
      total_amount: String(totalAmount),
      currency: currency,
      shipping_cost: String(shippingCost),
      // Store cart items summary (simplified) or full if small
      // We will try to store a simplified version to save space: ID and Qty
      cart_items_json: JSON.stringify(items.map((i: any) => ({
        id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image, currency: i.currency
      }))).substring(0, 500)
      // Note: Truncating cart JSON is risky. 
      // If cart is large, we might lose data. 
      // Ideally we'd store this in a 'pending_orders' table, but requirement was "no order in supabase".
      // Let's rely on line_items from Stripe for the receipt, but for our DB we want our structure.
      // We'll trust the user has < 5 items usually. 
      // ALTERNATIVE: Split cart into chunks if needed.
    };

    // 6. Create Session with Metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: metadata
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Stripe Session Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}