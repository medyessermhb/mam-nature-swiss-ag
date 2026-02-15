import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Eco Set | Whole House Water Filtration',
  description: 'Complete water treatment solution for your entire home. Filters particles and contaminants while protecting against limescale. Medical-grade stainless steel.',
  openGraph: {
    title: 'Eco Set | Mam Nature Swiss',
    description: 'Protect your home and health with our complete whole-house filtration system.',
    url: '/shop/eco-set',
    images: ['https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET.webp']
  }
};

export default function EcoSetLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Eco Set',
    description: 'Complete whole-house solution. Treats particles, limescale, and contaminants. Medical-grade stainless steel with 10-year warranty.',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/ECO%20SET.webp',
    slug: 'eco-set',
    priceKey: 'mam-nature-eco-set',
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