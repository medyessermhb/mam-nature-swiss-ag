import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PricingProvider } from '@/context/PricingContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/shop/CartSidebar';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

// --- UPDATED GLOBAL METADATA ---
import { getOrganizationJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com'),
  title: {
    template: '%s | Mam Nature',
    default: 'Mam Nature | Advanced Swiss Water Filtration Systems',
  },
  description: "Discover cutting-edge Swiss-engineered water filtration, revitalization, and anti-limescale solutions for pure and healthy water at home.",
  keywords: ['water filter', 'anti-limescale', 'water revitalizer', 'Swiss water treatment', 'Mam Nature', 'hydrogen booster'],
  icons: {
    icon: '/images/website_details/mam-nature_full_logo.svg',
    shortcut: '/images/website_details/mam-nature_full_logo.svg',
    apple: '/images/website_details/mam-nature_full_logo.svg',
  },
  openGraph: {
    title: 'Mam Nature | Advanced Water Treatment',
    description: 'Swiss-engineered solutions for pure and healthy water at home.',
    url: '/',
    siteName: 'Mam Nature',
    images: [
      {
        url: '/images/website_details/mam-nature_full_logo.svg',
        width: 1200,
        height: 630,
        alt: 'Mam Nature Swiss Water Treatment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mam Nature | Advanced Water Treatment',
    description: 'Swiss-engineered solutions for pure and healthy water at home.',
    images: ['/images/website_details/mam-nature_full_logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KWXLWH88');
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VZFQDN0KZX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VZFQDN0KZX');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1192118279521945');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWXLWH88" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1192118279521945&ev=PageView&noscript=1" alt="" />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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