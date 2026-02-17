import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Water Lime | Anti-Limescale Solution',
  description: 'Physical limescale protection for your home. Converts hard Calcite to soft Aragonite without salt, chemicals, or electricity.',
  openGraph: {
    title: 'Water Lime | Mam Nature Swiss',
    description: 'Eco-friendly anti-limescale solution. Zero salt, zero maintenance.',
    url: '/shop/water-lime',
    images: ['/images/WEBSITE-P/products/water_lime_vertical.webp']
  }
};

export default function WaterLimeLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Water Lime',
    description: 'Physical conversion of limescale. Protects household appliances. Retains healthy calcium and magnesium. Zero salt, zero electricity, zero chemicals.',
    image: '/images/WEBSITE-P/products/water_lime_vertical.webp',
    slug: 'water-lime',
    priceKey: 'mam-nature-water-lime',
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