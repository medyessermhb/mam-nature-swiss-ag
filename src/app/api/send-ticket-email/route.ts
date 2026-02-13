import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { ticketId, subject, message, senderRole, recipientEmail, ticketCategory } = await req.json();

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-admin-email@example.com';

    // --- HTML STYLES (Brand Colors) ---
    const colors = {
      primary: '#D52D25',
      text: '#2C3E50',
      bg: '#F8FAFC',
      white: '#FFFFFF',
      border: '#E2E8F0',
      messageBg: '#F1F5F9'
    };

    // --- LOGIC: WHO IS RECEIVING? ---
    let toEmail = '';
    let emailSubject = '';
    let headline = '';
    let subtext = '';
    let buttonLink = '';
    let buttonText = '';

    if (senderRole === 'user') {
      // Client -> Admin
      toEmail = ADMIN_EMAIL;
      emailSubject = `[Support] New Reply: ${subject}`;
      headline = `New Message from Client`;
      subtext = `A client has replied to a support ticket.`;
      buttonLink = `${SITE_URL}/dashboard`; // Admin Dashboard
      buttonText = "View in Admin Panel";
    } else {
      // Admin -> Client
      toEmail = recipientEmail;
      emailSubject = `Update on your ticket: ${subject}`;
      headline = `Support Team Replied`;
      subtext = `Our support team has replied to your ticket.`;
      buttonLink = `${SITE_URL}/dashboard/tickets/${ticketId}`; // Client Ticket Page
      buttonText = "View & Reply";
    }

    // --- EMAIL HTML TEMPLATE ---
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${colors.bg}; margin: 0; padding: 20px;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: ${colors.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <div style="background-color: ${colors.white}; padding: 30px; text-align: center; border-bottom: 3px solid ${colors.primary};">
            <img src="https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo%20website.png" alt="Mam Nature" style="width: 150px; height: auto;">
          </div>

          <div style="padding: 30px;">
            <h2 style="color: ${colors.text}; margin-top: 0;">${headline}</h2>
            <p style="color: #64748B; line-height: 1.6; margin-bottom: 20px;">${subtext}</p>

            <div style="background-color: ${colors.messageBg}; border-radius: 6px; padding: 20px; border-left: 4px solid ${colors.primary};">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #94A3B8; text-transform: uppercase; font-weight: bold;">
                Ticket: ${subject} <span style="font-weight: normal;">(${ticketCategory || 'General'})</span>
              </p>
              <p style="margin: 0; color: ${colors.text}; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">"${message}"</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
               <a href="${buttonLink}" style="background-color: ${colors.primary}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                 ${buttonText}
               </a>
            </div>

            <p style="color: #94A3B8; font-size: 13px; text-align: center;">
              Please do not reply directly to this email. Click the button above to respond via the dashboard.
            </p>
          </div>

          <div style="background-color: #F1F5F9; padding: 20px; text-align: center; font-size: 12px; color: #94A3B8;">
            <p style="margin: 0;">Mam Nature Swiss AG | Spinnereistr. 16, CH-8645 Jona</p>
            <p style="margin: 5px 0 0 0;"><a href="https://mam-nature.com" style="color: ${colors.primary}; text-decoration: none;">Visit Website</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // --- SEND EMAIL ---
    await sendEmail(toEmail, emailSubject, html);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Ticket Email Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}