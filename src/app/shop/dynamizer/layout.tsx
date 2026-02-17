import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'The Swiss Water Dynamizer | Water Revitalization',
  description: 'Restore the natural vitality of your water. The Swiss Water Dynamizer structures and revitalizes water for better hydration and lime protection.',
  openGraph: {
    title: 'The Swiss Water Dynamizer | Mam Nature Swiss',
    description: 'Structure and revitalize your water naturally. No electricity, no maintenance.',
    url: '/shop/dynamizer',
    images: ['/images/WEBSITE-P/products/DYNAMIZER.webp']
  }
};

export default function DynamizerLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'The Swiss Water Dynamizer',
    description: 'The Swiss Water Dynamizer works entirely physically to restore water\'s beneficial properties. It structures and revitalizes water for better hydration capabilities.',
    image: '/images/WEBSITE-P/products/DYNAMIZER.webp',
    slug: 'dynamizer',
    priceKey: 'the-swiss-water-dynamizer',
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