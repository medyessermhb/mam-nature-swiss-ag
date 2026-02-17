import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, topic, message } = body;

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('contact_messages').insert([
      { first_name: firstName, last_name: lastName, email, phone, topic, message }
    ]);
    if (dbError) throw dbError;

    // --- STYLES ---
    const colors = { primary: '#D52D25', text: '#2C3E50', bg: '#F8FAFC', white: '#FFFFFF' };

    // --- USER AUTO-REPLY TEMPLATE ---
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ${colors.white}; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
        <div style="background: ${colors.white}; padding: 25px; text-align: center; border-bottom: 3px solid ${colors.primary};">
           <img src="${process.env.NEXT_PUBLIC_SITE_URL}/images/website_details/mam-nature_full_logo_website.png" alt="Mam Nature" style="width: 140px;">
        </div>
        <div style="padding: 30px;">
          <h2 style="color: ${colors.text}; margin-top: 0;">Hello ${firstName},</h2>
          <p style="color: #64748B; line-height: 1.6;">
            Thank you for reaching out to Mam Nature. We have received your message regarding "<strong>${topic}</strong>".
          </p>
          <p style="color: #64748B; line-height: 1.6;">
            Our team will review your inquiry and get back to you within 24-48 hours.
          </p>
          <div style="background: #F1F5F9; padding: 15px; border-radius: 5px; margin: 20px 0; color: #64748B; font-style: italic;">
            "${message}"
          </div>
          <p style="color: ${colors.text}; font-weight: bold;">Best Regards,<br>The Mam Nature Team</p>
        </div>
      </div>
    `;

    await sendEmail(email, 'We received your message - Mam Nature', userHtml);

    // --- ADMIN NOTIFICATION TEMPLATE ---
    const adminHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: ${colors.primary};">📩 New Contact Message</h2>
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <tr><td style="padding: 5px; font-weight: bold;">Name:</td><td>${firstName} ${lastName}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Phone:</td><td>${phone}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Topic:</td><td>${topic}</td></tr>
        </table>
        <br>
        <div style="background: #FFF5F5; border-left: 4px solid ${colors.primary}; padding: 15px; color: ${colors.text};">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
    `;

    await sendEmail(process.env.ADMIN_EMAIL!, `[Contact] ${topic} - ${firstName} ${lastName}`, adminHtml);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}