import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'The Essential Plus | Advanced Water Filtration',
  description: 'Double protection with fine filtration and sediment pre-filter. Removes sand, rust, chlorine, and heavy metals while protecting your plumbing.',
  openGraph: {
    title: 'The Essential Plus | Mam Nature Swiss',
    description: 'Advanced dual-stage filtration for superior water quality and plumbing protection.',
    url: '/shop/essential-plus',
    images: ['/images/WEBSITE-P/products/ESSENTIAL_PLUS.webp']
  }
};

export default function EssentialPlusLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'The Essential Plus',
    description: 'Double protection with fine filtration and sediment pre-filter. Removes sand, rust, chlorine, and heavy metals while protecting your plumbing.',
    image: '/images/WEBSITE-P/products/ESSENTIAL_PLUS.webp',
    slug: 'essential-plus',
    priceKey: 'mam-nature-essential-plus',
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