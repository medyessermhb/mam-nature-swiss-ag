import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'The Essential Plus | Advanced Water Filtration',
  description: 'Double protection with fine filtration and sediment pre-filter. Removes sand, rust, chlorine, and heavy metals while protecting your plumbing.',
  openGraph: {
    title: 'The Essential Plus | Mam Nature Swiss',
    description: 'Advanced dual-stage filtration for superior water quality and plumbing protection.',
    url: '/shop/essential-plus',
    images: ['https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ESSENTIAL%20PLUS%20(1).webp']
  }
};

export default function EssentialPlusLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'The Essential Plus',
    description: 'Double protection with fine filtration and sediment pre-filter. Removes sand, rust, chlorine, and heavy metals while protecting your plumbing.',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ESSENTIAL%20PLUS%20(1).webp',
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