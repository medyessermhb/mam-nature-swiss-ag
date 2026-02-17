import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

const STATUS_MESSAGES = {
  processing: {
    en: { subject: "We're processing your order!", title: "Order Processing", desc: "Great news! We have started processing your order and are getting it ready for shipment." },
    fr: { subject: "Nous préparons votre commande !", title: "Commande en cours de traitement", desc: "Bonne nouvelle ! Nous avons commencé à préparer votre commande pour l'expédition." }
  },
  shipped: {
    en: { subject: "Your order has shipped! 🚚", title: "Order Shipped", desc: "Your package is on its way! It has been handed over to our shipping partner." },
    fr: { subject: "Votre commande a été expédiée ! 🚚", title: "Commande expédiée", desc: "Votre colis est en route ! Il a été remis à notre partenaire de livraison." }
  },
  delivered: {
    en: { subject: "Your order has been delivered! 🎉", title: "Order Delivered", desc: "Your package has been marked as delivered. We hope you enjoy your Mam Nature products!" },
    fr: { subject: "Votre commande a été livrée ! 🎉", title: "Commande Livrée", desc: "Votre colis a été marqué comme livré. Nous espérons que vous apprécierez vos produits Mam Nature !" }
  },
  cancelled: {
    en: { subject: "Update regarding your order", title: "Order Cancelled", desc: "Your order has been cancelled. If you have any questions, please contact our support team." },
    fr: { subject: "Mise à jour concernant votre commande", title: "Commande Annulée", desc: "Votre commande a été annulée. Si vous avez des questions, veuillez contacter notre équipe d'assistance." }
  }
};

export async function POST(req: Request) {
  try {
    const { email, firstName, orderNumber, newStatus, language = 'en' } = await req.json();

    // 1. Validate status
    const statusInfo = STATUS_MESSAGES[newStatus as keyof typeof STATUS_MESSAGES];
    if (!statusInfo) {
      return NextResponse.json({ message: "No email needed for this status." });
    }

    const langContent = language === 'fr' ? statusInfo.fr : statusInfo.en;
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';
    const colors = { primary: '#D52D25', text: '#2C3E50', bg: '#F8FAFC', white: '#FFFFFF' };

    // 2. Generate HTML
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; background-color: ${colors.bg}; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: ${colors.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: ${colors.white}; padding: 30px; text-align: center; border-bottom: 3px solid ${colors.primary};">
            <img src="${process.env.NEXT_PUBLIC_SITE_URL}/images/website_details/mam-nature_full_logo_website.png" alt="Mam Nature" style="width: 150px;">
          </div>
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: ${colors.text}; margin-top: 0;">${langContent.title}</h2>
            <p style="color: #64748B; font-size: 16px;">Hello ${firstName},</p>
            <p style="color: #64748B; font-size: 16px; line-height: 1.5;">${langContent.desc}</p>
            
            <div style="background-color: #F1F5F9; padding: 15px; border-radius: 6px; margin: 25px 0; font-family: monospace; font-size: 18px; color: ${colors.text}; font-weight: bold;">
              Order Ref: ${orderNumber}
            </div>

            <a href="${SITE_URL}/dashboard" style="background-color: ${colors.primary}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
               ${language === 'fr' ? 'Voir ma commande' : 'View My Order'}
            </a>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Send Email
    await sendEmail(email, langContent.subject, html);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Status Email Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}