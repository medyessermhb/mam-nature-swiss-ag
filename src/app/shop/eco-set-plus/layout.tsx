import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Eco Set Plus | Premium Whole House Filtration',
  description: 'Advanced whole-house water treatment. Enhanced filtration performance protecting pipes and appliances from scale without electricity or chemicals.',
  openGraph: {
    title: 'Eco Set Plus | Mam Nature Swiss',
    description: 'Superior whole-house water purification and scale protection.',
    url: '/shop/eco-set-plus',
    images: ['/images/WEBSITE-P/products/ECO_SET_PLUS.webp']
  }
};

export default function EcoSetPlusLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Eco Set Plus',
    description: 'Systeme de traitement avance pour toute la maison. Performance de filtration accrue. Protege les tuyaux et appareils du calcaire.',
    image: '/images/WEBSITE-P/products/ECO_SET_PLUS.webp',
    slug: 'eco-set-plus',
    priceKey: 'mam-nature-eco-set-plus',
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