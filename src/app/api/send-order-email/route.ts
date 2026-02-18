import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { orderDetails, cartItems, total, currency, vatRate, vatAmount } = await req.json();

    // BACKWARD COMPAT: If vat info is inside orderDetails (passed from CheckoutForm)
    if (orderDetails.vatRate === undefined && vatRate !== undefined) {
      orderDetails.vatRate = vatRate;
      orderDetails.vatAmount = vatAmount;
    }

    const currencySymbol = currency === 'EUR' ? '€' : currency === 'CHF' ? 'CHF' : 'Dhs';
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // CHANGE THIS TO YOUR REAL DOMAIN
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';

    // --- HTML STYLES (Brand Colors) ---
    const colors = {
      primary: '#D52D25',
      text: '#2C3E50',
      bg: '#F8FAFC',
      white: '#FFFFFF',
      border: '#E2E8F0'
    };

    // --- GENERATE ITEMS TABLE ROWS ---
    const itemsHtml = cartItems.map((item: any) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border}; color: ${colors.text};">
          <div style="font-weight: bold;">${item.name}</div>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border}; text-align: center; color: ${colors.text};">
          x${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border}; text-align: right; font-weight: bold; color: ${colors.text};">
          ${currencySymbol} ${(item.price * item.quantity).toLocaleString()}
        </td>
      </tr>
    `).join('');

    // --- CUSTOMER EMAIL TEMPLATE ---
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${colors.bg}; margin: 0; padding: 20px;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: ${colors.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <div style="background-color: ${colors.white}; padding: 30px; text-align: center; border-bottom: 3px solid ${colors.primary};">
            <img src="https://mam-nature.com/images/website_details/mam-nature_full_logo_website.png" alt="Mam Nature" style="width: 150px; height: auto;">
          </div>

          <div style="padding: 30px;">
            <h2 style="color: ${colors.text}; margin-top: 0;">Thank you for your order, ${orderDetails.firstName}!</h2>
            <p style="color: #64748B; line-height: 1.6;">We have received your order and are getting it ready for shipment. Below is a summary of your purchase.</p>

            <div style="background-color: #F8FAFC; border-radius: 6px; padding: 20px; margin: 25px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="text-align: left; padding-bottom: 10px; color: #64748B; font-size: 12px; text-transform: uppercase;">Item</th>
                    <th style="text-align: center; padding-bottom: 10px; color: #64748B; font-size: 12px; text-transform: uppercase;">Qty</th>
                    <th style="text-align: right; padding-bottom: 10px; color: #64748B; font-size: 12px; text-transform: uppercase;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
     <div style="border-top: 2px solid ${colors.text}; margin-top: 15px; padding-top: 15px;">
                 ${orderDetails.vatAmount > 0 ? `
                   <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; color: #64748B;">
                     <span style="font-size: 14px;">Includes VAT (${(orderDetails.vatRate * 100).toFixed(1)}%)</span>
                     <span style="font-size: 14px;">${currencySymbol} ${orderDetails.vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                   </div>
                 ` : `
                   <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; color: #64748B;">
                     <span style="font-size: 14px;">VAT (Export)</span>
                     <span style="font-size: 14px;">${currencySymbol} 0.00</span>
                   </div>
                 `}
                 
                 <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 16px; font-weight: bold; color: ${colors.text};">Total</span>
                    <span style="font-size: 20px; font-weight: 800; color: ${colors.primary};">${currencySymbol} ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                 </div>
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
               <a href="${SITE_URL}/dashboard" style="background-color: ${colors.primary}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                 View Order & Download Invoice
               </a>
               <p style="font-size: 12px; color: #94A3B8; margin-top: 10px;">Login to your dashboard to download the official PDF invoice.</p>
            </div>

            <div style="display: flex; margin-bottom: 20px; border-top: 1px solid ${colors.border}; padding-top: 20px;">
              <div style="flex: 1; padding-right: 10px;">
                <h4 style="color: ${colors.text}; margin: 0 0 8px 0;">Shipping & Contact</h4>
                <p style="color: #64748B; font-size: 14px; line-height: 1.5; margin: 0;">
                  ${orderDetails.firstName} ${orderDetails.lastName}<br>
                  ${orderDetails.address}<br>
                  ${orderDetails.city}, ${orderDetails.zip}<br>
                  ${orderDetails.country}<br><br>
                  <strong>Phone:</strong> ${orderDetails.phone}
                </p>
              </div>
              <div style="flex: 1; padding-left: 10px;">
                <h4 style="color: ${colors.text}; margin: 0 0 8px 0;">Payment Details</h4>
                <p style="color: #64748B; font-size: 14px; line-height: 1.5; margin: 0;">
                  <strong>Method:</strong> ${orderDetails.paymentMethod.toUpperCase()}<br>
                  <strong>Date:</strong> ${date}<br>
                  <strong>Order Ref:</strong> ${orderDetails.orderNumber}
                </p>
              </div>
            </div>

            <p style="color: #64748B; font-size: 14px;">You will receive another email once your order has been shipped.</p>
          </div>

          <div style="background-color: #F1F5F9; padding: 20px; text-align: center; font-size: 12px; color: #94A3B8;">
            <p style="margin: 0;">Mam Nature Swiss AG | Spinnereistr. 16, CH-8645 Jona</p>
            <p style="margin: 5px 0 0 0;"><a href="https://mam-nature.com" style="color: ${colors.primary}; text-decoration: none;">Visit Website</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(orderDetails.email, 'Order Confirmation - Mam Nature', customerHtml);

    // --- ADMIN NOTIFICATION TEMPLATE ---
    const adminHtml = `
      <h2>🔔 New Order Alert</h2>
      <p><strong>Order Ref:</strong> ${orderDetails.orderNumber}</p>
      <p><strong>Customer:</strong> ${orderDetails.firstName} ${orderDetails.lastName}</p>
      <p><strong>Email:</strong> ${orderDetails.email}</p>
      <p><strong>Phone:</strong> ${orderDetails.phone}</p>
      <p><strong>Total:</strong> ${currencySymbol} ${total.toLocaleString()}</p>
      <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
      <hr>
      <h3>Shipping Address:</h3>
      <p>
        ${orderDetails.address}<br>
        ${orderDetails.city}, ${orderDetails.zip}<br>
        ${orderDetails.country}
      </p>
      <hr>
      <h3>Items:</h3>
      <ul>
        ${cartItems.map((i: any) => `<li>${i.name} (x${i.quantity})</li>`).join('')}
      </ul>
      <p><a href="${SITE_URL}/dashboard" style="color: #D52D25; font-weight: bold;">Login to Admin Dashboard to Process</a></p>
    `;

    await sendEmail(process.env.ADMIN_EMAIL!, `New Order: ${currencySymbol} ${total}`, adminHtml);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Order Email Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}