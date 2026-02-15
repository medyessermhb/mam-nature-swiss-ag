import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Swiss Hydrogen Booster | Molecular Hydrogen Water',
  description: 'Enrich your water with molecular hydrogen on the go. Portable Class 1 Medical Device for optimal cellular hydration and antioxidant benefits.',
  openGraph: {
    title: 'Swiss Hydrogen Booster | Mam Nature Swiss',
    description: 'Boost your antioxidant intake with hydrogen-rich water. Portable and efficient.',
    url: '/shop/hydrogen-booster',
    images: ['https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/HYDROGEEN%20BOOSTER.webp']
  }
};

export default function HydrogenBoosterLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Swiss Hydrogen Booster',
    description: 'Enrich your water with molecular hydrogen. Fast recharge and ultra-fine bubbles. Portable and easy to use. Rechargeable battery.',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/HYDROGEEN%20BOOSTER.webp',
    slug: 'hydrogen-booster',
    priceKey: 'swiss-hydrogen-booster',
    brand: 'Mam Nature Swiss'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}