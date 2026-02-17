import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Complete Set Plus | The Ultimate Water Solution',
  description: 'Our most advanced system. Maximum contaminant removal combined with Swiss revitalization technology. Perfect for high-demand households.',
  openGraph: {
    title: 'Complete Set Plus | Mam Nature Swiss',
    description: 'The ultimate shield and revitalizer for your water. Unmatched purity and energy.',
    url: '/shop/complete-set-plus',
    images: ['/images/WEBSITE-P/products/COMPLETE_SET_PLUS.webp']
  }
};

export default function CompleteSetPlusLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Complete Set Plus',
    description: 'The most advanced water treatment solution. Full revitalizing and restructure technology. Maximum removal of all contaminants. Perfect for high-demand households.',
    image: '/images/WEBSITE-P/products/COMPLETE_SET_PLUS.webp',
    slug: 'complete-set-plus',
    priceKey: 'mam-nature-water-treatment-complete-set-plus',
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