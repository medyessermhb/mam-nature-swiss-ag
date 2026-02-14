import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PricingProvider } from '@/context/PricingContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/shop/CartSidebar';

const inter = Inter({ subsets: ["latin"] });

// --- UPDATED GLOBAL METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com'),
  title: {
    template: '%s | Mam Nature',
    default: 'Mam Nature | Advanced Swiss Water Filtration Systems',
  },
  description: "Discover cutting-edge Swiss-engineered water filtration, revitalization, and anti-limescale solutions for pure and healthy water at home.",
  keywords: ['water filter', 'anti-limescale', 'water revitalizer', 'Swiss water treatment', 'Mam Nature', 'hydrogen booster'],
  icons: {
    icon: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo.svg',
    shortcut: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo.svg',
    apple: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo.svg',
  },
  openGraph: {
    title: 'Mam Nature | Advanced Water Treatment',
    description: 'Swiss-engineered solutions for pure and healthy water at home.',
    url: '/',
    siteName: 'Mam Nature',
    images: [
      {
        // Using main logo or specific sharing image
        url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website%20details/mam-nature%20full%20logo.svg',
        width: 1200,
        height: 630,
        alt: 'Mam Nature Swiss Water Treatment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <PricingProvider>
            <CartProvider>
              <Navbar />
              <CartSidebar />
              {children}
              <Footer />
            </CartProvider>
          </PricingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}