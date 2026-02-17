import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Swiss Water Cartridge | Annual Replacement Filter',
  description: 'Official replacement cartridge for your Mam Nature Fine Filter. Ensures optimal filtration performance. Unique Swiss-engineered fiber technology.',
  openGraph: {
    title: 'Swiss Water Cartridge | Mam Nature Swiss',
    description: 'Keep your water pure. Easy tool-free replacement.',
    url: '/shop/cartridge',
    images: ['/images/WEBSITE-P/products/cartridge.webp']
  }
};

export default function CartridgeLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Swiss Water Cartridge',
    description: 'Replacement Cartridge for your Water Fine Filter after max. 150 m3 resp. 1 year. Eliminates chlorine, PFAS, PFOS, heavy metals, aluminium, pesticides & radioactive substances.',
    image: '/images/WEBSITE-P/products/cartridge.webp',
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