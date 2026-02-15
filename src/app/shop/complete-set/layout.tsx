import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Complete Set | Revitalized & Filtered Water for Whole House',
  description: 'The complete solution combining filtration and revitalization (Dynamizer). Restores water structure, improves taste, and protects against limescale.',
  openGraph: {
    title: 'Complete Set | Mam Nature Swiss',
    description: 'Experience water as nature intended: filtered and revitalized for your entire home.',
    url: '/shop/complete-set',
    images: ['https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET.webp']
  }
};

export default function CompleteSetLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Complete Set',
    description: 'Includes the Dynamizer for revitalized water. Restructures water at a molecular level. Exceptional taste and easy to digest. Protects the entire home from scale and rust.',
    image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET.webp',
    slug: 'complete-set',
    priceKey: 'mam-nature-water-treatment-complete-set',
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