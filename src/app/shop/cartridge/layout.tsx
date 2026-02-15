import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Swiss Water Cartridge | Annual Replacement Filter',
  description: 'Official replacement cartridge for your Mam Nature Fine Filter. Ensures optimal filtration performance. Unique Swiss-engineered fiber technology.',
  openGraph: {
    title: 'Swiss Water Cartridge | Mam Nature Swiss',
    description: 'Keep your water pure. Easy tool-free replacement.',
    url: '/shop/cartridge',
    images: ['https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/cartridge%20(1).webp']
  }
};

export default function CartridgeLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Swiss Water Cartridge',
    description: 'Annual replacement cartridge for Fine Filter. Maintains optimal filtration performance. Unique Swiss-engineered filtration fibers.',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/cartridge%20(1).webp',
    slug: 'cartridge',
    priceKey: 'water-fine-filter-cartridge',
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