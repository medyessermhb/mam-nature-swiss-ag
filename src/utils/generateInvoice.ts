import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const LOGO_URL = "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo%20website.png";

export const generateInvoicePDF = (order: any) => {
  if (!order) return;

  const doc = new jsPDF();
  const currency = order.currency === 'EUR' ? '€' : order.currency === 'CHF' ? 'CHF' : 'Dhs';

  // --- 1. PREFER READABLE ORDER NUMBER ---
  // If order_number exists (MNS-XXXX), use it. Otherwise fallback to UUID.
  const displayId = order.order_number || order.id.slice(0, 8).toUpperCase();

  // --- 2. LOGO & HEADER ---
  const img = new Image();
  img.src = LOGO_URL;
  img.crossOrigin = "Anonymous"; 
  
  try {
      doc.addImage(img, 'PNG', 15, 15, 50, 15); 
  } catch (e) {
      console.warn("Logo load failed", e);
  }

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Mam Nature Swiss AG", 200, 20, { align: "right" });
  doc.text("Spinnereistr. 16", 200, 25, { align: "right" });
  doc.text("CH-8645 Jona", 200, 30, { align: "right" });
  doc.text("Switzerland", 200, 35, { align: "right" });

  // --- 3. INVOICE TITLE & INFO ---
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("INVOICE", 15, 50);

  doc.setFontSize(10);
  doc.setTextColor(50);
  doc.text(`Invoice #: ${displayId}`, 15, 60); 
  doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 15, 65);
  doc.text(`Status: ${order.status.toUpperCase()}`, 15, 70);

  // --- 4. ADDRESSES ---
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text("Bill To:", 15, 85);
  doc.text("Ship To:", 110, 85);

  doc.setFontSize(10);
  doc.setTextColor(80);
  
  const billing = order.billing_address || order.address || {};
  const shipping = order.address || {};

  // Billing (Now includes Phone)
  doc.text(`${billing.firstName || ''} ${billing.lastName || ''}`, 15, 91);
  doc.text(billing.address || '', 15, 96);
  doc.text(`${billing.city || ''}, ${billing.zip || ''}`, 15, 101);
  doc.text(billing.country || '', 15, 106);
  doc.text(order.customer_email || '', 15, 111);
  if (order.customer_phone || billing.phone) {
    doc.text(`Phone: ${order.customer_phone || billing.phone}`, 15, 116);
  }

  // Shipping (Now includes Phone)
  doc.text(`${shipping.firstName || ''} ${shipping.lastName || ''}`, 110, 91);
  doc.text(shipping.address || '', 110, 96);
  doc.text(`${shipping.city || ''}, ${shipping.zip || ''}`, 110, 101);
  doc.text(shipping.country || '', 110, 106);
  if (shipping.phone || order.customer_phone) {
    doc.text(`Phone: ${shipping.phone || order.customer_phone}`, 110, 111);
  }

  // --- 5. ITEMS TABLE ---
  const tableRows = (order.cart_items || []).map((item: any) => [
      item.name,
      item.quantity,
      `${currency} ${item.price.toLocaleString()}`,
      `${currency} ${(item.price * item.quantity).toLocaleString()}`
  ]);

  autoTable(doc, {
      startY: 125, // Shifted down slightly to make room for phone numbers
      head: [['Item Description', 'Qty', 'Unit Price', 'Total']],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 10 },
  });

  // --- 6. TOTALS ---
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  
  const subtotal = (order.cart_items || []).reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  
  // Handle Shipping string vs number (For Morocco "Contested")
  let displayShipping = 'Free';
  if (typeof order.shipping_cost === 'string' && order.shipping_cost === 'Contested') {
      displayShipping = 'To be determined';
  } else if (typeof order.shipping_cost === 'number' && order.shipping_cost > 0) {
      displayShipping = `${currency} ${order.shipping_cost.toLocaleString()}`;
  } else if (!order.shipping_cost && order.total_amount > subtotal) {
      // Fallback calculation if shipping_cost isn't saved directly
      const diff = order.total_amount - subtotal;
      if (diff > 0.5) displayShipping = `${currency} ${diff.toLocaleString()}`;
  }

  doc.text(`Subtotal:`, 140, finalY + 10);
  doc.text(`${currency} ${subtotal.toLocaleString()}`, 195, finalY + 10, { align: 'right' });

  doc.text(`Shipping:`, 140, finalY + 16);
  doc.text(displayShipping, 195, finalY + 16, { align: 'right' });

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text(`Total:`, 140, finalY + 25);
  doc.text(`${currency} ${order.total_amount.toLocaleString()}`, 195, finalY + 25, { align: 'right' });

  // --- 7. FOOTER ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text("Thank you for your business!", 105, 280, { align: "center" });
  doc.text("www.mam-nature.com", 105, 285, { align: "center" });

  doc.save(`Invoice_${displayId}.pdf`); // Save with readable ID
};